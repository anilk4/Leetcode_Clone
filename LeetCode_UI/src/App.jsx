import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Discuss from './Components/Discuss';
import Error from './Components/Error';
import Profile from './Components/Profile';
import Favourites from './Components/Favourites';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Body from './Components/Body';
import Display from './Components/DisplayProblem';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Body />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/discuss' element={<Discuss />} />
        <Route path='/favourite' element={<Favourites />} />
        <Route path='/display/:id' element={<Display />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter> 
  );
};

export default App;
