import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import EmployeeList from './components/EmployeeList';
import AttendanceList from './components/AttendanceList';

import Login from './components/Login';
import './App.css';
import Home from './components/Home';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if the user is authenticated
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };
    return (
        <Router>
            <div className="App">
               
                <header className="App-header">
                    <Navbar position="static">
                        <NavbarBrand>
                            <h1>Employee Management System</h1>
                        </NavbarBrand>
                        <NavbarContent className="hidden sm:flex gap-4 ">
                        
                            {isAuthenticated &&
                                <Link color="foreground" className="navitem" to="/employees">
                                    Employees
                                </Link>}
                            
                            {isAuthenticated && 
                                <Link color="foreground" className="naviteml" to="/attendances">
                                    Attendances
                                </Link>
                            }
                        </NavbarContent>
                        <NavbarContent justify="end">
                            
                            {!isAuthenticated && <Link className="navitem" to="/login">Login</Link>}
                                {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
                           
                        </NavbarContent>
                    </Navbar>
                    
                </header>
                
                <Routes>
                    <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
                    <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/employees" />} />
                    <Route path="/employees" element={isAuthenticated ?<EmployeeList /> : <Navigate to="/" />} />
                    <Route path="/attendances" element={isAuthenticated ? <AttendanceList /> : <Navigate to="/" />} />
                   
                </Routes>
               
            </div>
        </Router>
    );
};

export default App;