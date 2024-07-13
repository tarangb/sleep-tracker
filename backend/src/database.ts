import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export const initializeDb = async () => {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    // Drop the existing table if it exists (optional, for ensuring the primary key change)
    // await db.exec(`
    //     DROP TABLE IF EXISTS sleep_data;
    // `);

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

export const getDb = () => open({
    filename: './database.sqlite',
    driver: sqlite3.Database
});