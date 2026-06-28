const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const db = require('../db/database');

// Root of the downloads/images directory (one level up from backend/)
const IMAGES_ROOT = path.resolve(__dirname, '../../../downloads/images');

/**
 * Recursively scan a directory and return a structured array.
 * @param {string} dirPath  - Absolute path to the directory to scan
 * @param {string} relBase  - Relative base used to build the `path` field
 */
function scanDirectory(dirPath, relBase = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const result = [];

  for (const entry of entries) {
    const relPath = relBase ? `${relBase}/${entry.name}` : entry.name;
    const absPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      const items = scanDirectory(absPath, relPath);
      result.push({
        name: entry.name,
        type: 'folder',
        path: relPath,
        items,
      });
    } else {
      const stat = fs.statSync(absPath);
      const ext = path.extname(entry.name).replace('.', '').toLowerCase();
      result.push({
        name: entry.name,
        type: 'file',
        path: relPath,
        size: stat.size,
        extension: ext,
      });
    }
  }

  return result;
}

// ─── GET /api/files ───────────────────────────────────────────────────────────
router.get('/', (req, res) => {
  try {
    if (!fs.existsSync(IMAGES_ROOT)) {
      return res.status(404).json({
        success: false,
        message: `Images directory not found: ${IMAGES_ROOT}`,
      });
    }

    const data = scanDirectory(IMAGES_ROOT);
    return res.json({ success: true, data });
  } catch (err) {
    console.error('[files] Error scanning directory:', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ─── GET /api/files/download/:filePath(*) ────────────────────────────────────
router.get('/download/:filePath(*)', (req, res) => {
  try {
    const requestedPath = req.params.filePath;

    // Safely resolve inside IMAGES_ROOT (prevent path traversal)
    const absFilePath = path.resolve(IMAGES_ROOT, requestedPath);
    if (!absFilePath.startsWith(IMAGES_ROOT)) {
      return res.status(403).json({ success: false, message: 'Forbidden path.' });
    }

    if (!fs.existsSync(absFilePath)) {
      return res.status(404).json({ success: false, message: 'File not found.' });
    }

    const stat = fs.statSync(absFilePath);
    if (!stat.isFile()) {
      return res.status(400).json({ success: false, message: 'Path is not a file.' });
    }

    // Track download in DB (upsert + increment)
    const fileName = path.basename(requestedPath);
    const category = requestedPath.includes('/') ? requestedPath.split('/')[0] : 'root';

    db.prepare(`
      INSERT INTO download_stats (file_path, file_name, category, download_count, last_downloaded)
      VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP)
      ON CONFLICT(file_path) DO UPDATE SET
        download_count  = download_count + 1,
        last_downloaded = CURRENT_TIMESTAMP
    `).run(requestedPath, fileName, category);

    // Stream file as attachment
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', stat.size);
    const stream = fs.createReadStream(absFilePath);
    stream.pipe(res);
  } catch (err) {
    console.error('[files] Download error:', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
