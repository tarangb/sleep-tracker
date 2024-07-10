import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitSleepData } from '../services/api';
import { SleepData } from '../interfaces';
import '../form.css';

const Form: React.FC = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [sleepDuration, setSleepDuration] = useState<number>(0);
    const [date, setDate] = useState('');

    const [errors, setErrors] = useState({
        name: '',
        gender: '',
        sleepDuration: '',
        date: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            name: name ? '' : 'Name is required',
            gender: gender ? '' : 'Gender is required',
            sleepDuration: sleepDuration > 0 ? '' : 'Sleep Duration must be positive',
            date: date ? '' : 'Date is required'
        };

        setErrors(newErrors);

        if (!newErrors.name && !newErrors.gender && !newErrors.sleepDuration && !newErrors.date) {
            const data: SleepData = { name, gender, sleepDuration, date };
            await submitSleepData(data);
            setName('');
            setGender('');
            setSleepDuration(0);
            setDate('');
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Ensure date is in yyyy-mm-dd format for storage
        const formattedDate = e.target.value.split('-').reverse().join('-');
        setDate(formattedDate);
    };

    return (
        <div className="form-page">
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form">
                    <h1 className="form-title">Enter Sleep Data</h1>
                    <label className="label">
                        <span className="label-text">Name:</span>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className={`input ${errors.name ? 'input-error' : ''}`}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </label>
                    <label className="label">
                        <span className="label-text">Gender:</span>
                        <select
                            value={gender}
                            onChange={e => setGender(e.target.value)}
                            className={`input ${errors.gender ? 'input-error' : ''}`}
                        >
                            <option value="">Select Gender</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                            <option value="Others">Others</option>
                        </select>
                        {errors.gender && <span className="error-text">{errors.gender}</span>}
                    </label>
                    <label className="label">
                        <span className="label-text">Sleep Duration:</span>
                        <input
                            type="number"
                            value={sleepDuration}
                            onChange={e => setSleepDuration(Number(e.target.value))}
                            className={`input ${errors.sleepDuration ? 'input-error' : ''}`}
                        />
                        {errors.sleepDuration && <span className="error-text">{errors.sleepDuration}</span>}
                    </label>
                    <label className="label">
                        <span className="label-text">Date:</span>
                        <input
                            type="date"
                            value={date.split('-').reverse().join('-')} // Display in dd/mm/yyyy format
                            onChange={handleDateChange}
                            className={`input ${errors.date ? 'input-error' : ''}`}
                        />
                        {errors.date && <span className="error-text">{errors.date}</span>}
                    </label>
                    <button type="submit" className="button">
                        Submit
                    </button>
                </form>
            </div>
            <Link to="/data" className="data-link">
                View Existing Data
            </Link>
        </div>
    );
};

export default Form;