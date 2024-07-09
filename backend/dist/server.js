"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
let sleepData = [];
app.post('/api/sleep', (req, res) => {
    const { name, gender, sleepDuration, date } = req.body;
    sleepData.push({ name, gender, sleepDuration, date });
    res.sendStatus(200);
});
app.get('/api/sleep/stats', (req, res) => {
    const stats = Object.values(sleepData.reduce((acc, { name, gender }) => {
        if (!acc[name]) {
            acc[name] = { name, gender, count: 0 };
        }
        acc[name].count++;
        return acc;
    }, {}));
    res.json(stats);
});
app.get('/api/sleep/:name/last7days', (req, res) => {
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
