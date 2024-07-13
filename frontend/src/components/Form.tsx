import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitSleepData } from '../services/api';
import { SleepData } from '../interfaces';
import '../form.css';

const Form: React.FC = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [sleepDuration, setSleepDuration] = useState<number>(1); // Set default value to 1
    const [date, setDate] = useState('');

    const sleepOptions = Array.from({ length: 24 }, (_, i) => i + 1); // Creates an array of numbers from 1 to 24
    const handleSleepDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSleepDuration(Number(event.target.value));
    }
        
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
            //this isn't required as sleep duration field has default value of 1 now and is a drop down to have values 1-24.
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
                        <select
                            value={sleepDuration}
                            onChange={handleSleepDurationChange}
                            className={`input ${errors.sleepDuration ? 'input-error' : ''}`}
                        >
                            {sleepOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {errors.sleepDuration && <span className="error-text">{errors.sleepDuration}</span>}
                    </label>
                    <label className="label">
                        <span className="label-text">Date:</span>
                        <input
                            type="date"
                            // value={date.split('-').reverse().join('-')} // Display in dd/mm/yyyy format
                            value={date}
                            // onChange={handleDateChange}
                            onChange={e => setDate(e.target.value)}
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