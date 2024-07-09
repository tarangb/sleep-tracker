import React, { useState } from 'react';
import { submitSleepData } from '../services/api';
import { SleepData } from '../interfaces';

const Form: React.FC = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [sleepDuration, setSleepDuration] = useState<number>(0);
    const [date, setDate] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data: SleepData = { name, gender, sleepDuration, date };
        await submitSleepData(data);
        setName('');
        setGender('');
        setSleepDuration(0);
        setDate('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>Gender:
                <input type="text" value={gender} onChange={e => setGender(e.target.value)} />
            </label>
            <label>Sleep Duration:
                <input type="number" value={sleepDuration} onChange={e => setSleepDuration(Number(e.target.value))} />
            </label>
            <label>Date:
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </label>
            <button type="submit">
                Submit
            </button>
        </form>
    );
};

export default Form;
