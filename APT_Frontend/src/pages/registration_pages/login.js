import React, {useEffect} from 'react';
import {Heading} from '../.././generic components/guestpagecomponents/logincomponents/heading';

import LoginForm from '../.././generic components/guestpagecomponents/mergedtextfields';
import {useSelector} from 'react-redux';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {NewMember} from '../.././generic components/guestpagecomponents/logincomponents/newmember';


const Login = () => {
    const userToken = useSelector((state) => state.user.token);

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    // Redirect user if already logged in
    useEffect(() => {
        if (userToken) {
            const redirectUrl = searchParams.get('url') || '/';
            console.log(redirectUrl);
            navigate(redirectUrl);
        }
    }, [userToken, navigate]);
    /**
     * Takes in token for user and retrieve user info
     * @param {string} token
     * @return {Promise<void>}
     */

    // Function to handle access token received from GoogleButton


    return (
        <div className="fixed left-0 top-0 size-full"
            data-testid="login-page"
        >
            <div className="fixed left-0 top-0 size-full">
                <div
                    style={{float: 'left', height: '100%', width: '10%'}}
                >
                    <img
                        src="https://www.redditstatic.com/accountmanager/bbb584033aa89e39bad69436c504c9bd.png"
                        alt="React Logo"
                        style={{width: '100%', height: '100%'}}
                        data-testid="login-logo"

                    />
                </div>
                <div
                    style={{float: 'right', height: '100%', width: '87%'}}
                    data-testid="login-container"
                >
                    <div style={{marginBottom: '95px'}} />{' '}
                    {/* Spacer above Heading */}
                    <Heading />

                    <div style={{display: 'flex', flexDirection: 'column'}}>


                        {/* Spacer between components */}

                        <LoginForm />
                        <div style={{marginBottom: '1px'}} />{' '}
                        <NewMember />
                        {/* Spacer between components */}

                        <div style={{marginBottom: '10px'}} />{' '}
                        {/* Spacer between components */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export {Login};
