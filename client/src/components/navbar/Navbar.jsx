import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../img/ai.png';
import { useAuth0 } from "@auth0/auth0-react";
import './Navbar.css';
import Login from '../Login.jsx'
import Logout from '../Logout.jsx'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const { user, isAuthenticated } = useAuth0();

    return (
        <div className="gpt3__navbar">
            <div className="gpt3__navbar-links">
                <div className="gpt3__navbar-links_logo">
                    <img src={logo} />
                </div>
                <div className="gpt3__navbar-links_container">
                    {isAuthenticated ? (
                        <>
                            <p><NavLink exact to={'/'}>Home</NavLink></p>
                            <p><NavLink exact to={'/Profile'}>Profile</NavLink></p>
                            <p><NavLink exact to={'/comment'}>Feedback</NavLink></p>
                            <p><NavLink exact to={'/history'}>History</NavLink></p>
                            <p><NavLink>Service</NavLink></p>
                            <p><NavLink>About US</NavLink></p>
                        </>
                    ) :
                        (
                            <>
                                <p><NavLink exact to={'/'}>Home</NavLink></p>
                                <p><NavLink>Service</NavLink></p>
                                <p><NavLink>About US</NavLink></p>
                            </>
                        )}

                </div>
            </div>
            <div className="gpt3__navbar-sign">
                {isAuthenticated ? (
                    <p><Logout /></p>
                ) : <p><Login /></p>}
            </div>
            <div className="gpt3__navbar-menu">
                {toggleMenu
                    ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
                    : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
                {toggleMenu && (
                    <div className="gpt3__navbar-menu_container scale-up-center">
                        <div className="gpt3__navbar-menu_container-links">
                        {isAuthenticated ? (
                        <>
                            <p><NavLink exact to={'/'}>Home</NavLink></p>
                            <p><NavLink exact to={'/Profile'}>Profile</NavLink></p>
                            <p><NavLink>Service</NavLink></p>
                            <p><NavLink>About US</NavLink></p>
                        </>
                    ) :
                        (
                            <>
                                <p><NavLink exact to={'/'}>Home</NavLink></p>
                                <p><NavLink>Service</NavLink></p>
                                <p><NavLink>About US</NavLink></p>
                            </>
                        )}
                        </div>
                        <div className="gpt3__navbar-menu_container-links-sign">
                            {isAuthenticated ? (
                                <p><Logout /></p>
                            ) : <p><Login /></p>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;