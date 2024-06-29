import  { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials);
        try {

            const response = await axios.post('http://localhost:5203/api/auth/login', credentials);
            console.log(response)
            onLogin(response.data.token);
        } catch (error) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className={"mainContainer"}>
            <div className={'titleContainer'}>
                <h2>Login</h2>
            </div>
            <br />
            <form className={'inputContainer'} onSubmit={handleSubmit} >
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="inputBox"
                    value={credentials.username}
                    onChange={handleInputChange}
                    required
                />
                <br></br>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="inputBox"
                    value={credentials.password}
                    onChange={handleInputChange}
                    required
                />
                <br/>
                <button className={'inputButton'} type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default Login;