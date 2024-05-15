import React from 'react';
import {useState} from 'react';

import {HeadingSignUp} from '../.././generic components/guestpagecomponents/signupcomponents/headingsignup';
import EmailLoginForm from '../.././generic components/guestpagecomponents/signupcomponents/emailtextfield';


import {SignUpContinued} from './signupcontinued.js';

/**
 *
 * @return {JSX.Element} App
 */
function SignUp() {
    const [validEmail, setValidEmail] = useState(false);
    const [email, setEmail] = useState('');


    const handleEmailFormSubmit = (isValidEmail, userEmail) => {
        setValidEmail(isValidEmail);
        setEmail(userEmail);
        console.log('Email:', userEmail);
        console.log('Valid Email:', isValidEmail);
    };
    return (

        <>
            {!validEmail && (
                <div className="fixed left-0 top-0 size-full"
                    data-testid="signup-page"
                >
                    <div className="fixed left-0 top-0 size-full">
                        <div style={{float: 'left', height: '100%', width: '10%'}}>
                            <img
                                src="https://www.redditstatic.com/accountmanager/bbb584033aa89e39bad69436c504c9bd.png"
                                alt="React Logo"
                                style={{width: '100%', height: '100%'}}
                                data-testid="signup-logo"
                            />
                        </div>
                        <div style={{float: 'right', height: '100%', width: '87%'}}
                            data-testid="signup-page2"
                        >
                            <div style={{marginBottom: '128px'}} /> {/* Spacer above Heading */}
                            <HeadingSignUp />
                            <div style={{marginBottom: '5px'}} /> {/* Spacer below Heading */}


                            <div style={{display: 'flex', flexDirection: 'column'}}>


                                {/* Spacer between components */}
                                <EmailLoginForm onFormSubmit={handleEmailFormSubmit} />
                                <div style={{marginBottom: '1px'}} />{' '}
                                {/* Spacer between components */}

                                <div style={{marginBottom: '10px'}} />{' '}
                                {/* Spacer between components */}
                            </div>
                        </div>
                    </div>
                </div> )}
            {validEmail && (
                <SignUpContinued email={email} />
            )}


        </>

    );
}

export {SignUp};
