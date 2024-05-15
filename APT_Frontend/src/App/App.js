/*eslint-disable*/
import React from 'react';
import {Login} from '../pages/registration_pages/login.js';
import {SignUp} from '../pages/registration_pages/signup.js';
import {ForgotPassword} from '../pages/registration_pages/forgotpassword.js';
import {ForgotUsername} from '../pages/registration_pages/forgotusername.js';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



import {ForgotPassword2} from '../pages/registration_pages/passwordcontinued2.js';

import {Home} from '../pages/registration_pages/home.js';
import {Texteditor} from '../pages/registration_pages/texteditor.js';

/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The rendered application component.
 */
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/password" element={<ForgotPassword />} />
                <Route path="/username" element={<ForgotUsername />} />
                <Route path="/resetpassword" element={<ForgotPassword2/>} />
                <Route path="/texteditor" element={<Texteditor/>} />
               
               
            </Routes>
        </Router>
    );
}

export default App;
