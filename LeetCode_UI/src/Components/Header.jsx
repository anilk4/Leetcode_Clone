
import React from "react";
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import {userEmailState} from '../store/selector/userEmail'
import { useRecoilValue,useSetRecoilState } from 'recoil';
import {userState} from '../store/atoms/user';

const Logo = () => (
    <a className="navbar-brand" href='/'>
        <img className="logo" alt='logo' src='https://shorturl.at/flCS0' style={{ maxWidth: '150px', maxHeight: '40px' }} />
    </a>
);

const Header = () => {
    const userEmail=useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);

    const handleLogout=()=>{
        localStorage.clear();
        setUser(null)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Logo />
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href='/'>Problems</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href='/discuss'>Discuss</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href='/profile'>Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href='/favourite'>Favourite</a>
                        </li>
                    </ul>
                </div>
                <div>
                    {/* <img src={sun} style={{display:'inline-block', verticalAlign:'middle', marginBottom:'10px', marginRight:'20px',width:'25px', cursor:'pointer'}} onClick={handleClick}></img> */}
                    {!userEmail && <Link to={'/login'}>
                        <Button className='login-button' style={{textDecoration:'none'}}>Login</Button>
                    </Link>}
                    {!userEmail && < Link to={'/register'}>
                        <Button className="filled-button" style={{color:'rgb(64, 68, 70)', textDecoration:'none', marginRight:'20px'}} >Signup</Button>
                    </Link>}
                    {userEmail &&
                        <Button onClick={handleLogout} className="filled-button" style={{color:'rgb(64, 68, 70)', textDecoration:'none', marginRight:'20px'}} >Logout</Button>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Header;
