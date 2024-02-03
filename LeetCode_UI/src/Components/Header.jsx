
import React from "react";
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import { userEmailState } from '../store/selector/userEmail'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';

const Logo = () => (
    <a className="navbar-brand" href='/'>
        <img className="logo" alt='logo' src='https://shorturl.at/flCS0' style={{ maxWidth: '150px', maxHeight: '40px' }} />
    </a>
);

const Header = () => {
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);

    const handleLogout = () => {
        localStorage.clear();
        setUser(null)
    }

    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary bg-tra">

                <div class="container">
                    <Logo />
                    <a class="navbar-brand shadow-none fs-5 border-0" click="false">LeetCode</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="offcanvas offcanvas-start" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header text-light border-bottom bg-dark">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" class="btn-close btn-close-white shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body bg-dark d-flex flex-column p-4">
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <ul className="navbar-nav ml-auto ">
                                    <li className="nav-item mx-2">
                                        <a className="nav-link" href='/'>Problems</a>
                                    </li>
                                    <li className="nav-item mx-2">
                                        <a className="nav-link" href='/discuss'>Discuss</a>
                                    </li>
                                    <li className="nav-item mx-2">
                                        <a className="nav-link" href='/profile'>Profile</a>
                                    </li>
                                    <li className="nav-item mx-2">
                                        <a className="nav-link" href='/favourite'>Leader Board</a>
                                    </li>
                                    <li >
                                        {/* <img src={sun} style={{display:'inline-block', verticalAlign:'middle', marginBottom:'10px', marginRight:'20px',width:'25px', cursor:'pointer'}} onClick={handleClick}></img> */}
                                        {!userEmail && <Link to={'/login'}>
                                            <Button className='login-button' class="btn btn-success text-white mx-2" style={{ textDecoration: 'none' }}>Login</Button>
                                        </Link>}
                                        {!userEmail && < Link to={'/register'}>
                                            <Button className="filled-button" class="btn btn-primary text-white" style={{ color: 'rgb(64, 68, 70)', textDecoration: 'none', marginRight: '20px' }} >Signup</Button>
                                        </Link>}
                                        {userEmail &&
                                            <Button onClick={handleLogout} class="btn btn-danger text-white" className="filled-button" style={{color: 'rgb(64, 68, 70)', textDecoration: 'none', marginRight: '20px' }} >Logout</Button>
                                        }
                                    </li>
                                </ul>
                            </ul>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
