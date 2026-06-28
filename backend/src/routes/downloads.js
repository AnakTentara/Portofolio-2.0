const express = require('express');
const router = express.Router();
const db = require('../db/database');

// ─── GET /api/downloads/stats ─────────────────────────────────────────────────
router.get('/stats', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM download_stats ORDER BY download_count DESC').all();
    return res.json({ success: true, data: rows });
  } catch (err) {
    console.error('[downloads] Error fetching stats:', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ─── GET /api/downloads/stats/:filePath(*) ────────────────────────────────────
router.get('/stats/:filePath(*)', (req, res) => {
  try {
    const filePath = req.params.filePath;
    const row = db.prepare('SELECT * FROM download_stats WHERE file_path = ?').get(filePath);

    if (!row) {
      return res.status(404).json({ success: false, message: 'No stats found for this file.' });
    }

    return res.json({ success: true, data: row });
  } catch (err) {
    console.error('[downloads] Error fetching file stats:', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ─── POST /api/downloads/stats/track ─────────────────────────────────────────
router.post('/stats/track', (req, res) => {
  try {
    const { filePath, fileName, category } = req.body;

    if (!filePath || !fileName) {
      return res.status(400).json({ success: false, message: 'filePath and fileName are required.' });
    }

    db.prepare(`
      INSERT INTO download_stats (file_path, file_name, category, download_count, last_downloaded)
      VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP)
      ON CONFLICT(file_path) DO UPDATE SET
        download_count  = download_count + 1,
        last_downloaded = CURRENT_TIMESTAMP
    `).run(filePath, fileName, category || null);

    const updated = db.prepare('SELECT * FROM download_stats WHERE file_path = ?').get(filePath);
    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error('[downloads] Error tracking download:', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
