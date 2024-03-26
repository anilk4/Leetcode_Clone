import React,{useState} from "react";
import { Button, TextField, Typography } from '@mui/material';
import axios from "axios";
import {userEmailState} from '../store/selector/userEmail.js';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue,useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user.js';

import { BASE_URL } from "../config";
import { red } from "@mui/material/colors";
function Register(){
    const navigate=useNavigate();
    const userEmail=useRecoilValue(userEmailState);
    const setUser=useSetRecoilState(userState);
    const [error,setError]=new useState(false);
    const [userAlreadyError,setUserAlreadyError]=new useState(false);
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:''
    })
    const handleSubmit=()=>{
      // console.log(formData)
        axios.post(`${BASE_URL}/account/signup`,{
            username:formData.email,
            password:formData.password,
            name:formData.name
          }).then(response=>{
            // console.log(formData.name);
            localStorage.setItem('userToken',response.data.token);
            console.log(localStorage.getItem('userToken'));
            setUser({
                userEmail:formData.email,
              });
            setError(false);
            setUserAlreadyError(false);
            navigate('/');

          })
          .catch(error=>{
            if(error.response.data.message=='User already exists'){
              setUserAlreadyError(true);
            }
            else if(error.response.data.msg=='Invalid Username or Password'){
              setError(true);
            }
            console.error('User registration error',error.response.data.message);
          });
    }


    const handleChange = (e) => {
        setError(false);
        setUserAlreadyError(false);
        const { name, value } = e.target;
        // console.log(name,value)
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    return (
        <div>
            <div className="container">
                <center>
                    <Typography variant="h4" component={"h2"} style={{ marginTop:'50px',marginBottom:'50px' }}>Register</Typography>
                </center>
                <center>
                <form>
                    <TextField label="Name" variant='outlined' name="name" onChange={handleChange} style={{width:300}}></TextField>
                    <br></br>
                    <TextField label="Email" variant="outlined" style={{marginTop:'10px',width:300}}name="email" onChange={handleChange}></TextField>
                    <br/>
                    <TextField label="Password" type="Password" name="password" variant="outlined"  onChange={handleChange} style={{marginTop:'10px',width:300}}></TextField>
                    <br></br>
                    <Button variant="contained" style={{marginTop:'10px', width:300 , backgroundColor:"rgb(64, 68, 70)"}} onClick={handleSubmit}>Register</Button>
                    <br></br>
                    <p >Already have an account? <a style={{color:"#7CB9E8"}} href="/login">Login here</a></p>
                    {error && <p style={{color:'red'}}>Name and email fields must be filled, and the password must be at least 8 characters long, containing at least one uppercase letter and one special character. </p>}
                    {userAlreadyError && <p style={{color:'red'}}>User Already Exist</p>}
                </form>
                </center>
            </div>

        </div>
    )
}
export default Register;