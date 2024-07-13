import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { initializeDb, getDb } from './database';
import { SleepData, Stats } from './interfaces';
import { format, parseISO, isValid } from 'date-fns';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

initializeDb();

// POST endpoint to add or update sleep data
app.post('/api/sleep', async (req, res) => {
    const { name, gender, sleepDuration, date }: SleepData = req.body;
    const db = await getDb();

    try {
        const parsedDate = new Date(date);
        if (!isValid(parsedDate)) {
            return res.status(400).send('Invalid date format');
        }
        const formattedDate = format(parsedDate, 'yyyy-MM-dd');

        // Check if the record already exists
        const existingRecord = await db.get('SELECT * FROM sleep_data WHERE name = ? AND gender = ? AND date = ?', [name, gender, formattedDate]);

        if (existingRecord) {
            // Update the existing record
            await db.run('UPDATE sleep_data SET sleepDuration = ? WHERE name = ? AND gender = ? AND date = ?', [sleepDuration, name, gender, formattedDate]);
        } else {
            // Insert a new record
            await db.run('INSERT INTO sleep_data (name, gender, sleepDuration, date) VALUES (?, ?, ?, ?)', [name, gender, sleepDuration, formattedDate]);
        }

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.put('/api/sleep', async (req, res) => {
    const { name, gender, sleepDuration, date }: SleepData = req.body;
    const db = await getDb();

    try {
        const parsedDate = parseISO(date);
        if (!isValid(parsedDate)) {
            return res.status(400).send('Invalid date format');
        }
        const formattedDate = format(parsedDate, 'yyyy-MM-dd');
        const result = await db.run(
            'UPDATE sleep_data SET sleepDuration = ? WHERE name = ? AND gender = ? AND date = ?',
            [sleepDuration, name, gender, formattedDate]
        );

        if (result.changes === 0) {
            return res.status(404).send('Record not found');
        }

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/api/sleep/stats', async (req, res) => {
    const db = await getDb();
    try {
        const rows = await db.all<Stats[]>('SELECT name, gender, COUNT(*) as count FROM sleep_data GROUP BY name, gender');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/api/sleep/:name/:gender/last7days', async (req, res) => {
    const { name, gender } = req.params;
    const db = await getDb();

    try {
        const rows = await db.all<{ date: string; sleepDuration: number; }[]>(
            'SELECT date, sleepDuration FROM sleep_data WHERE name = ? AND gender = ? ORDER BY date DESC LIMIT 7',
            [name, gender]
        );
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;

// Gracefully shutdown
export const shutdownServer = () => {
    server.close(() => {
        console.log('Server gracefully shut down');
    });
};
