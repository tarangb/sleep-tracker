import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { SleepData, Stats } from './interfaces';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let sleepData: SleepData[] = [];

app.post('/api/sleep', (req: { body: SleepData; }, res: { sendStatus: (arg0: number) => void; }) => {
    const { name, gender, sleepDuration, date }: SleepData = req.body;
    sleepData.push({ name, gender, sleepDuration, date });
    res.sendStatus(200);
});

app.get('/api/sleep/stats', (req: any, res: { json: (arg0: Stats[]) => void; }) => {
    const stats: Stats[] = Object.values(
        sleepData.reduce((acc: { [key: string]: Stats }, { name, gender }: SleepData) => {
            if (!acc[name]) {
                acc[name] = { name, gender, count: 0 };
            }
            acc[name].count++;
            return acc;
        }, {})
    );
    res.json(stats);
});

app.get('/api/sleep/:name/last7days', (req: { params: { name: any; }; }, res: { json: (arg0: { date: string; sleepDuration: number; }[]) => void; }) => {
    const { name } = req.params;
    const last7DaysData = sleepData
        .filter(entry => entry.name === name)
        .slice(-7)
        .map(({ date, sleepDuration }) => ({ date, sleepDuration }));
    res.json(last7DaysData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
