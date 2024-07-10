import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormPage from './pages/FormPage';
import DataPage from './pages/DataPage';

const App: React.FC = () => {
    return (
        // <div>
        //     <div>
        //         <FormPage />
        //     </div>
        //     <div>
        //         <Router>
        //             <nav>
        //                 <ul>
        //                     <li><Link to="/data">Data</Link></li>
        //                 </ul>
        //             </nav>
        //             <Routes>
        //                 <Route path="/data" Component={DataPage} />
        //             </Routes>
        //         </Router>
        //     </div>
        // </div>

        <Router>
            <Routes>
                <Route path="/form" element={<FormPage />} />
                <Route path="/data" element={<DataPage />} />
            </Routes>
        </Router>
    );
};

export default App;
