import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../components/DataTable';
import BarChart from '../components/SleepChart';
import '../dataPage.css';

const DataPage: React.FC = () => {
    const [selectedName, setSelectedName] = useState<string>('');
    const [selectedGender, setSelectedGender] = useState<string>('');

    const handleRowClick = (name: string, gender: string) => {
        setSelectedName(name);
        setSelectedGender(gender);
    };

    return (
        <div className="page-container">
            <div className="content-container">
                <div className="header">
                    <h1>Sleep Data</h1>
                    <Link to="/form" className="enter-data-button">Enter Sleep Data</Link>
                </div>
                <DataTable onRowClick={handleRowClick} />
                {selectedName && (
                    <div className="chart-container">
                        <BarChart userName={selectedName} userGender={selectedGender} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataPage;
