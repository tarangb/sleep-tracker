import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormPage from './pages/FormPage';
import DataPage from './pages/DataPage';

const App: React.FC = () => {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<FormPage />} />
                <Route path="/form" element={<FormPage />} />
                <Route path="/data" element={<DataPage />} />
            </Routes>
        </Router>
    );
};

export default App;
