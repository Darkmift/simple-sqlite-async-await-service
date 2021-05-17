const express = require('express');
const app = express();
const dbConn = require('./services/db.service');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Root path
app.get('/', async (req, res, next) => {
    try {
        const db = await dbConn();
        const result = await db.all('SELECT * FROM test');
        res.json({ result });
    } catch (error) {
        res.send(error);
    }
});

const HTTP_PORT = process.env.PORT || 8000;
// Start server
app.listen(HTTP_PORT, () => console.log(`Server running on port ${HTTP_PORT}`));
