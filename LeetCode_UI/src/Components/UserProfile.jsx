import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, problem_data } from "../config";
import { Typography } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';

const UserProfile = () => {
    const [profile, setProfile] = useState([]);

    const getData = async () => {
        try {
            const token = localStorage.getItem("userToken");
            if (!token) {
                console.error("User token is not available");
                return;
            }

            const res = await axios.get(`${BASE_URL}/account/profile`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const submissions = res.data.user.submissions;
            const extractedIds = submissions.map(submission => submission.id);
            console.log("real Id'sss", extractedIds);

            if (res.data) {
                setProfile(extractedIds);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div style={{marginLeft:"10px",marginRight:'10px',marginTop:'8px',border:'1px solid black',borderRadius:'0.5rem'}}>
            <div style={{display:'flex', justifyContent:'flex-start'}}>
            <div style={{width:'80px', height:'80px', border:'1px solid black',borderRadius:'0.5rem', marginLeft:"50px",marginTop:'40px', marginBottom:'40px'}}>
            </div>

            <div>
                <Typography style={{fontSize:30, marginLeft:'30px', marginTop:'30px'}}>Name</Typography>
                <div style={{display:'flex'}}>
                    <Typography style={{fontSize:20,marginLeft:'30px',marginTop:'5px'}}> Rank:</Typography>
                    <Typography style={{fontSize:20, marginTop:'5px'}}>3</Typography>
                </div>
            </div>



            <div style={{ marginLeft:'90px', marginTop:'20px'}}>
                <Typography style={{fontSize:25,}}>Solved Problem</Typography>
                <div style={{display:'flex', paddingLeft:'30px'}}>
                    <Typography style={{ display:'flex',fontSize:50, marginLeft:'20px'}}>15<Typography style={{marginTop:'40px'}}>/50</Typography></Typography>
                    
                </div>
            </div>



            <div style={{marginLeft:'30px', padding:'20px', paddingRight:'auto'}}>
                <div style={{padding:'5px'}}>
                    <div style={{display:"flex", justifyContent:'space-between'}}>
                        <Typography style={{color:'green'}}>Easy</Typography>
                        <Typography>0/13</Typography>
                    </div>
                    <LinearProgress style={{width:'250px',background:'gray'}}variant="determinate"  value={0} />
                </div>
                <div style={{padding:'5px'}}>
                    <div style={{display:"flex", justifyContent:'space-between'}}>
                        <Typography style={{color:'yellow'}}>Medium</Typography>
                        <Typography>10/27</Typography>
                    </div>
                    <LinearProgress style={{width:'250px',background:'gray'}}variant="determinate"  value={20} />
                </div>
                <div style={{padding:'5px'}}>
                    <div style={{display:"flex", justifyContent:'space-between'}}>
                        <Typography style={{color:'red'}}>Hard</Typography>
                        <Typography>5/10</Typography>
                    </div>
                    <LinearProgress style={{width:'250px',background:'gray'}}variant="determinate"  value={50} />
                </div>
            </div>


            </div>
        </div>
    );
};

export default UserProfile;
