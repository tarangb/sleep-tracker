import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormPage from './pages/FormPage';
import DataPage from './pages/DataPage';

const App: React.FC = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li><Link to="/form">Form</Link></li>
                    <li><Link to="/data">Data</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/form" Component={FormPage} />
                <Route path="/data" Component={DataPage} />
            </Routes>
        </Router>
    );
};

export default App;
