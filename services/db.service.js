const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

const fs = require('fs').promises;

async function checkFileExists(file) {
    try {
        return await fs.stat(file);
    } catch (error) {
        return false;
    }
}

async function dbConn() {
    try {
        const dbFile = 'main.db';
        const dir = path.join(__dirname, '../data');
        const dbFilePath = path.join(dir, dbFile);
        const fileExists = await checkFileExists(dbFilePath);

        if (!fileExists) {
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(dbFilePath, '');
        }

        const db = await open({
            filename: dbFilePath,
            driver: sqlite3.Database,
        });

        return db;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = dbConn;
