import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Routes from './utils/routes';
import logo from './logo.svg';
import './App.css';

const App = () => {
    const [message, setMessage] = useState('');

    const fetchMessage = async () => {
        try {
            const response = await axios.get(Routes.INDEX);

            if (response.data.success) {
                setMessage(response.data.data.message);
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        fetchMessage();
    }, []);

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />

                <p>{`${message}`}</p>

                <a
                    className='App-link'
                    href='/api/docs'
                    target='_blank'
                    rel='noopener noreferrer'>
                    API Documentation
                </a>
            </header>
        </div>
    );
};

export default App;
