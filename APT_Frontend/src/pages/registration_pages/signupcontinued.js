
import React from 'react';
import './signup.css';
import {useState, useEffect} from 'react';
import {Passwordfield} from './signup2components/Passwordfield';
import {Headings} from './signup2components/Headings';

import {axiosInstance as axios} from '../../requests/axios.js';
import {API_ROUTES} from '../../requests/routes.js';
import {useNavigate} from 'react-router-dom';
import PropTypes from 'prop-types';


/**
 *
 * @return {JSX.Element} SignUpContinued
 */

/**
 *
 * @param {string} email
 * @return  {JSX.Element} SignUpContinued
 */
function SignUpContinued({email}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [userid, setId] = useState('');


    const [responseunqiue, setresponseunqiue] = useState('');

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    };
    useEffect(() => {
        uniqueusername();
    }, [username]);


    const handleInputChangePassword = (password) => {
        // Here you can access the password data

        // You can also perform any other operations you need with the password data
        setPassword(password);
    };


    const checkImage = 'https://www.redditstatic.com/accountmanager/d489caa9704588f7b7e1d7e1ea7b38b8.svg';


    const exclamImage = 'https://www.redditstatic.com/accountmanager/90a416eeb64d4d6ecd46c53d4ee11975.svg';
    let imageUrl=checkImage;


    const imageStyle = {
        position: 'absolute',
        zIndex: 1,
        right: '14px',
        top: '18px',
        height: '10px',
        width: '12px',
    };


    const [isFocus, setIsFocus] = React.useState(false);
    const [mouseOver, setMouseOver] = React.useState(false);


    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const animDot = `after:ml-[7px] after:inline-block
    after:align-top after:text-xl after:font-medium after:leading-6
    after:text-[#24a0ed] after:content-['•']`;

    const inpClass = `inputAnimation pointer-events-none absolute left-3 top-3.5 inline-block origin-[0_50%] 
    align-middle text-[10px] font-semibold uppercase leading-[23px] tracking-[0.5px] text-[#a5a4a4] 
    transition-all duration-[0.2s] ease-[ease-in-out]`;
    const fieldSetStyles = `relative m-0 w-[350px] border-[none] p-0`;
    const fieldSetStylesRed = `relative m-0 w-[350px]  p-0 border-red border-solid`;

    const fieldClass = fieldSetStyles;
    let usernameBorderColor = '#e2e2e1'; // Default border color
    let borderColor = '#e2e2e1';
    /**
     * Get the border color for the username input field.
     * @param {string} username - The username value
     * @return {string} The border color
     */
    function getUsernameBorderColor(username) {
        // Default border color
        if (username.length!=0) {
            if (username.length < 3 || username.length > 20 || !responseunqiue) {
                borderColor = '#ea0027'; // Red border color when username is less than 3 or more than 20 characters
            } else if (username.length >= 3 && username.length <= 20) {
                borderColor = '#1976d2'; // Blue border color when username is between 3 and 20 characters
            }
        }

        return borderColor;
    }
    if (username.length!=0) {
        if (username.length < 3 || username.length > 20 || !responseunqiue) {
            imageUrl=exclamImage;
        } else {
            imageUrl=checkImage;
        }
    }
    // Usage:
    usernameBorderColor = getUsernameBorderColor(username);
    /**
     *
     * @param {boolean} isFocus - The isFocus value
     * @param {boolean} mouseOver - The mouseOver value
     * @param {string} username - The username value
     * @param {string} inpClass - The inpClass value
     * @param {string} animDot - The animDot value
     * @return  {string} The toPut value
     */
    function getToPutClass(isFocus, mouseOver, username, inpClass, animDot) {
        let toPut = inpClass;
        if (isFocus || mouseOver || username.length != 0) {
            toPut = `${inpClass}`;
        } else {
            toPut = `${inpClass} ${animDot}`;
        }
        return toPut;
    }

    // Usage:
    const toPut = getToPutClass(isFocus, mouseOver, username, inpClass, animDot);
    /**
     *
     * @param {string} username - The username value
     * @param {boolean} isVisible - The isVisible value
     * @param {boolean} setIsVisible - The setIsVisible value
     * @param {string} imageUrl - The imageUrl value
     * @param {string} fieldClass - The field
     * @return {object} The object containing isVisible, imageUrl, and fieldClass
     */
    function updateVisibilityAndStyles(username, isVisible, setIsVisible, imageUrl, fieldClass) {
        if (username.length !== 0) {
            if (!isVisible) {
                setIsVisible(true);
            }
        } else {
            if (isVisible) {
                setIsVisible(false);
            }
        }
        if (username.length < 3 || username.length > 20) {
            imageUrl = exclamImage;
            fieldClass = fieldSetStylesRed;
        } else {
            imageUrl = checkImage;
            fieldClass = fieldSetStyles;
        }
        return {isVisible, imageUrl, fieldClass};
    }
    updateVisibilityAndStyles(username, isVisible, setIsVisible, imageUrl, fieldClass);

    /**
     * Handles the login process.
     */
    async function handleLogin() {
        if (password.length >= 8 && username.length >= 3 && username.length <= 20 && responseunqiue) {
            try {
                // console.log(username);
                // console.log(password);
                // console.log(email);

                const response= await axios.post(API_ROUTES.signupAPT, {
                    username: username,
                    password: password,

                });
                setId(response.data.userId);
                console.log(response.data.id);
                navigate('/home', {state: {userid: response.data.userId}});
                // TODO: remove the need to login request once backend fixed it

                // dispatch userselfinfoaxios


                console.log(response);
            } catch (error) {
                if (error.response) {
                    // console.log(error.response.message);
                    alert('Failed');
                }
            }
        }
    }


    // State to hold the email


    // Set the email from URL when component mounts


    /**
     * Handles the input change event.
     */
    /**
     * Checks if the username is unique.
     */
    async function uniqueusername() {
        try {
            const response= await axios.get(`/users/isUsernameTaken?username=${username}`);
            if (response.data=='Username is available') {
                setresponseunqiue(true);
            } else {
                setresponseunqiue(false);
            }
            console.log(response);
        } catch (error) {
            if (error.response) {
                setresponseunqiue(false);

            // This will log "Username already taken"
            }
        }
    }
    return (
        <div className="relative box-border flex h-screen flex-col
        justify-between text-sm font-medium leading-[18px] text-[#1a1a1b]" data-step="username-and-password"
        data-testid="signup-continued"
        >
            <div className="flex flex-1">
                <div className="flex w-full flex-col self-stretch p-0">
                    <Headings />
                    <div className="flex flex-1 justify-between p-6">
                        <div>
                            <form className="mt-0">
                                <fieldset className={fieldClass}>

                                    <input
                                        id="regUsername"
                                        className="h-12 w-full appearance-none rounded
                                        border border-solid  bg-[#fcfcfb] px-3 pb-2.5
                                        pr-9 pt-[22px] transition-all duration-[0.2s]
                                        ease-[ease-in-out] hover:bg-[#FFFFFF]"


                                        type="text"
                                        name="username"
                                        data-empty="true"
                                        value={username} // Bind the input value to the state
                                        onChange={handleInputChange}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => {
                                            setIsFocus(false); setMouseOver(false);
                                        }}
                                        onMouseOver={() => !isFocus && setMouseOver(true)}
                                        onMouseLeave={() => !isFocus && setMouseOver(false)}
                                        style={{borderColor: usernameBorderColor, outline: 'none'}}
                                        data-testid="username-input-tag123456"
                                    />
                                    {isVisible && <img src={imageUrl} alt="Image" style={imageStyle} />}
                                    <label className={toPut}
                                        htmlFor="regUsername"
                                        style={{fontFamily: '"IBM Plex Sans", sans-serif'}}
                                        data-empty={isFocus || mouseOver|| username.length!=0 ? 'false' : 'true'}
                                        data-testid="username-label123456"
                                    >
                                        {' '}Choose a Username{' '}
                                    </label>

                                    <div className="mt-1 max-h-[1000px] text-xs font-medium leading-4
                                     text-[#ea0027] opacity-100 transition-all duration-[0.2s]
                                      ease-[ease-in-out]" data-for="username"
                                    data-testid="username-error-message100"
                                    >
                                        {((username.length < 3 || username.length > 20) && (username.length != 0)) &&
                                         responseunqiue && (
                                            <>Username must be between 3 and 20 characters</>
                                        )}
                                        {(!responseunqiue && (username.length != 0)) &&(
                                            <>That username is already taken</>
                                        )}
                                    </div>
                                </fieldset>

                                <Passwordfield onPasswordChange={handleInputChangePassword} />
                            </form>
                        </div>
                        <div className="block"
                            data-testid="username-suggestions"
                        >

                            <div >


                            </div>
                        </div>
                    </div>
                    <div className=" flex min-h-[55px] items-center justify-between border-t border-solid
                     border-t-[hsla(195,2%,65%,0.36)] bg-[#fcfcfb] px-4 py-2 hover:bg-[#FFFFFF]"
                    data-testid="signup-continued-footer"
                    >
                        <a href="/register" data-step="username-and-password">Back</a>
                        <span data-step="username-and-password">
                            <span ></span>
                            <span ></span>
                        </span>
                        <button className="relative inline-block min-h-[35px]
                         w-auto min-w-[155px] max-w-[392px] cursor-pointer truncate rounded border-[none]
                          bg-[#0079d3] px-2.5 py-[5px] text-center text-sm
                          font-semibold uppercase leading-[unset] tracking-[0.5px]
                           text-white hover:bg-[#3394dc]"
                        type="submit" data-step="username-and-password" onClick={handleLogin}
                        data-testid="signup-continued-button"
                        >
    Sign Up
                        </button>


                    </div>
                </div>
            </div>
        </div>
    );
}
SignUpContinued.propTypes = {
    email: PropTypes.string.isRequired,
};

export {SignUpContinued};
