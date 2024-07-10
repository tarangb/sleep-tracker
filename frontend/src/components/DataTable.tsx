import React, { useEffect, useState } from 'react';
import { getSleepStats } from '../services/api';
import { Stats } from '../interfaces';
import '../dataTable.css';  // Make sure to import your CSS file

interface Props {
    onRowClick: (name: string) => void;
}

const DataTable: React.FC<Props> = ({ onRowClick }) => {
    const [data, setData] = useState<Stats[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getSleepStats();
            setData(result);
        };
        fetchData();
    }, []);

    return (
        <table className="styled-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Submissions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((user, index) => (
                    <tr key={index} onClick={() => onRowClick(user.name)} title="Click to view chart">
                        <td>{user.name}</td>
                        <td>{user.gender}</td>
                        <td>{user.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
