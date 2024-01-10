import React,{useState} from "react";
import { Button, TextField, Typography } from '@mui/material';
import axios from "axios";
import {userEmailState} from '../store/selector/userEmail.js';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue,useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user.js';
import { BASE_URL } from "../config";
function Login(){
    const navigate=useNavigate();
    const userEmail=useRecoilValue(userEmailState);
    const setUser=useSetRecoilState(userState);
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:''
    })
    const handleSubmit=()=>{
        axios.post(`${BASE_URL}/account/login`,{
            username:formData.email,
            password:formData.password
          }).then(response=>{
            localStorage.setItem('userToken',response.data.token);
            console.log(localStorage.getItem('userToken'));
            setUser({
                userEmail:formData.email,
            });
            navigate('/');
          })
          .catch(error=>{
            console.error('User registration error',error);
          });
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name,value)
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    return (
        <div>
            <div className="container">
                <center>
                    <Typography variant="h4" component={"h2"} style={{ marginTop:'50px',marginBottom:'50px' }}>Login</Typography>
                </center>
                <center>
                <form>
                    <TextField label="Email" variant="outlined" style={{marginTop:'10px',width:300}}name="email" onChange={handleChange}></TextField>
                    <br/>
                    <TextField label="Password" type="Password" name="password" variant="outlined"  onChange={handleChange} style={{marginTop:'10px',width:300}}></TextField>
                    <br></br>
                    <Button variant="contained" style={{marginTop:'10px', width:300 , backgroundColor:"rgb(64, 68, 70)"}} onClick={handleSubmit}>Login</Button>
                    <br></br>
                    <p >Don't have an account? <a style={{color:"#7CB9E8"}} href="/register">Login here</a></p>
                </form>
                </center>
            </div>

        </div>
    )
}
export default Login;