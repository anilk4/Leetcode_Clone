import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Discuss from './Components/Discuss';
import { useEffect } from 'react';
import Error from './Components/Error';
import Profile from './Components/Profile';
import Favourites from './Components/Favourites';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Body from './Components/Body';
import Display from './Components/DisplayProblem';
import Login from './Components/Login';
import Register from './Components/Register';
import { userState } from './store/atoms/user';
import {RecoilRoot,useSetRecoilState} from 'recoil';
import { BASE_URL } from './config';
import axios from 'axios';


function App(){
  return (
    <RecoilRoot>
    <Router>
      <Header />
      <InitUser/>
      
      <Routes>
        <Route path='/' element={<Body  />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/discuss' element={<Discuss />} />
        <Route path='/favourite' element={<Favourites />} />
        <Route path='/display/:id' element={<Display />} />
        <Route path='*' element={<Error />} />
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
      <Footer />
    </Router> 
    </RecoilRoot>
  );
};

function InitUser() {
  const setUser=useSetRecoilState(userState);
  const init=async()=>{
    try{
      const res=await axios.get(`${BASE_URL}/account/me`,{
        headers: {
          "authorization": "Bearer " + localStorage.getItem("userToken")
      }
      })
      console.log(res.data);
      if(res.data){
        setUser({
          userEmail: res.data.username,
        });
      } else {
        setUser({
          userEmail: null,
        });
      }
    } catch (e) {
      console.log(e);
      setUser({
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    console.log("Login");
    init();
  }, []);
  return <div></div>;
}
export default App;
