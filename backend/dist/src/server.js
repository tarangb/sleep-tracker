"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const date_fns_1 = require("date-fns");
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
(0, database_1.initializeDb)();
// POST endpoint to add or update sleep data
app.post('/api/sleep', async (req, res) => {
    const { name, gender, sleepDuration, date } = req.body;
    const db = await (0, database_1.getDb)();
    try {
        const parsedDate = new Date(date);
        if (!(0, date_fns_1.isValid)(parsedDate)) {
            return res.status(400).send('Invalid date format');
        }
        const formattedDate = (0, date_fns_1.format)(parsedDate, 'yyyy-MM-dd');
        // Check if the record already exists
        const existingRecord = await db.get('SELECT * FROM sleep_data WHERE name = ? AND gender = ? AND date = ?', [name, gender, formattedDate]);
        if (existingRecord) {
            // Update the existing record
            await db.run('UPDATE sleep_data SET sleepDuration = ? WHERE name = ? AND gender = ? AND date = ?', [sleepDuration, name, gender, formattedDate]);
        }
        else {
            // Insert a new record
            await db.run('INSERT INTO sleep_data (name, gender, sleepDuration, date) VALUES (?, ?, ?, ?)', [name, gender, sleepDuration, formattedDate]);
        }
        res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
app.put('/api/sleep', async (req, res) => {
    const { name, gender, sleepDuration, date } = req.body;
    const db = await (0, database_1.getDb)();
    try {
        const parsedDate = (0, date_fns_1.parseISO)(date);
        if (!(0, date_fns_1.isValid)(parsedDate)) {
            return res.status(400).send('Invalid date format');
        }
        const formattedDate = (0, date_fns_1.format)(parsedDate, 'yyyy-MM-dd');
        const result = await db.run('UPDATE sleep_data SET sleepDuration = ? WHERE name = ? AND gender = ? AND date = ?', [sleepDuration, name, gender, formattedDate]);
        if (result.changes === 0) {
            return res.status(404).send('Record not found');
        }
        res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
app.get('/api/sleep/stats', async (req, res) => {
    const db = await (0, database_1.getDb)();
    try {
        const rows = await db.all('SELECT name, gender, COUNT(*) as count FROM sleep_data GROUP BY name, gender');
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
app.get('/api/sleep/:name/:gender/last7days', async (req, res) => {
    const { name, gender } = req.params;
    const db = await (0, database_1.getDb)();
    try {
        const rows = await db.all('SELECT date, sleepDuration FROM sleep_data WHERE name = ? AND gender = ? ORDER BY date DESC LIMIT 7', [name, gender]);
        res.json(rows);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
exports.default = app;
