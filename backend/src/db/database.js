// Node.js v22.5+ ships with a built-in SQLite module — no native compilation needed.
const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs   = require('fs');

// Ensure data/ directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'portfolio.db');
const db     = new DatabaseSync(dbPath);

// Enable WAL mode for better performance
db.exec('PRAGMA journal_mode = WAL');

// Create download_stats table
db.exec(`
  CREATE TABLE IF NOT EXISTS download_stats (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    file_path      TEXT UNIQUE NOT NULL,
    file_name      TEXT NOT NULL,
    category       TEXT,
    download_count INTEGER DEFAULT 0,
    last_downloaded TIMESTAMP,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create contacts table
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    subject    TEXT NOT NULL,
    message    TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

/**
 * node:sqlite uses a slightly different prepared-statement API vs better-sqlite3.
 * We wrap it so the rest of the code (routes) can call .prepare(...).run(...)
 * and .prepare(...).get(...) / .prepare(...).all()  — same surface as better-sqlite3.
 */
const originalPrepare = db.prepare.bind(db);
db.prepare = (sql) => {
  const stmt = originalPrepare(sql);
  return {
    run:  (...args) => stmt.run(...args),
    get:  (...args) => stmt.get(...args),
    all:  (...args) => stmt.all(...args),
  };
};

console.log(`[DB] SQLite database ready at: ${dbPath}`);

module.exports = db;
