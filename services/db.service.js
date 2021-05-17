const sqlite3 = require('sqlite3').verbose();
const util = require('util');
const path = require('path');

const fs = require('fs').promises;

const dbFile = 'main.db';
const dir = path.join(__dirname, '../data');
const dbFilePath = path.join(dir, dbFile);
console.log('🚀 ~ file: db.service.js ~ line 10 ~ dbFilePath', dbFilePath);

async function checkFileExists(file) {
    return fs
        .stat(file)
        .then(() => true)
        .catch(() => false);
}
async function dbConn() {
    try {
        const fileExists = await checkFileExists(dbFilePath);

        if (!fileExists) {
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(dbFilePath, '');
        }

        const db = new sqlite3.Database(dbFilePath, (err) => {
            if (err) return console.error(err.message);
            console.log('Successful connection to the database');
        });

        db.run = util.promisify(db.run);
        db.get = util.promisify(db.get);
        db.all = util.promisify(db.all);
        return db;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = dbConn;
