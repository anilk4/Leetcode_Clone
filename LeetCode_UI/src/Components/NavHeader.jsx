
import React from "react";
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import { userEmailState } from '../store/selector/userEmail'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';
import '../index.css'
const Logo = () => (
    <a className="navbar-brand" href='/'>
        <img className="logo" alt='logo' src='https://shorturl.at/flCS0' style={{ maxWidth: '150px', maxHeight: '40px' }} />
    </a>
);


const NavHeader = () => {
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);

    const handleLogout = () => {
        localStorage.clear();
        setUser(null)
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark  bg-dark">

                <div className="container-fluid mx-0">
                    <Logo />
                    <a className="navbar-brand shadow-none fs-5 border-0" click="false" style={{fontFamily:'Comic Sans MS, Comic Sans, cursive',fontSize:'xx-large'}}>TREAT CODE</a>
                    <button className="navbar-toggler ms-auto " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="sidebar offcanvas offcanvas-start" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header text-light border-bottom bg-dark">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                            <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body bg-dark d-flex flex-column p-0">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
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
                                        <a className="nav-link" href='/favorite'>Leader Board</a>
                                    </li>
                                    <li >
                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">

                                        {!userEmail && <Link to={'/login'}>
                                            <Button type="button" className="login-button btn btn-success text-white mx-2" style={{ textDecoration: 'none' }}>Login</Button>
                                        </Link>}
                                        {!userEmail && < Link to={'/register'}>
                                            <Button type="button" className="btn btn-primary text-white " style={{ color: 'rgb(64, 68, 70)', textDecoration: 'none', marginRight: '20px' }} >SignUp</Button>
                                        </Link>}
                                        {userEmail &&
                                            <Button type="button" onClick={handleLogout} className="btn btn-danger text-white" style={{ color: 'rgb(64, 68, 70)', textDecoration: 'none', marginRight: '20px' }} >Logout</Button>
                                        }
                                        </div>
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

export default NavHeader;
