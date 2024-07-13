"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.initializeDb = void 0;
const sqlite_1 = require("sqlite");
const sqlite3_1 = __importDefault(require("sqlite3"));
const initializeDb = async () => {
    const db = await (0, sqlite_1.open)({
        filename: './database.sqlite',
        driver: sqlite3_1.default.Database
    });
    
    // Create the table with the new primary key
    await db.exec(`
        CREATE TABLE IF NOT EXISTS sleep_data (
            name TEXT,
            gender TEXT,
            sleepDuration INTEGER,
            date DATE,
            PRIMARY KEY (name, date, gender)
        )
    `);
    return db;
};
exports.initializeDb = initializeDb;
const getDb = () => (0, sqlite_1.open)({
    filename: './database.sqlite',
    driver: sqlite3_1.default.Database
});
exports.getDb = getDb;
