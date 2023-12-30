import React from "react";

const Logo = () => (
    < a href='/'>
        <img className="logo" alt='logo' src='https://shorturl.at/flCS0' />
    </a>
);

const Header = () => {
    return (
        <div className="header">
            <Logo />
            <div className="nav-items">
                <ul>
                    <li>Problems</li>
                    <li>Discuss</li>
                    <li>Profile</li>
                    <li>Favourite</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;