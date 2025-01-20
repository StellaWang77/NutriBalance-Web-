import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login.jsx';
import Signup from './component/SignUp.jsx';
import ForgotPassword from './component/ForgotPassword.jsx';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='/forgotPassword' element={<ForgotPassword />} />
            </Routes>
        </Router>
    );
}

export default App;
