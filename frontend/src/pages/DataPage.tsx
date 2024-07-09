import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import BarChart from '../components/SleepChart';

const DataPage: React.FC = () => {
    const [selectedName, setSelectedName] = useState<string>('');

    const handleRowClick = (name: string) => {
        setSelectedName(name);
    };

    return (
        <div>
            <h1>Sleep Data</h1>
            <DataTable onRowClick={handleRowClick} />
            {selectedName && <BarChart userName={selectedName} />}
        </div>
    );
};

export default DataPage;
