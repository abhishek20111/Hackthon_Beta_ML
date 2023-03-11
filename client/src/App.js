
import './App.css';
import Navbar from './components/navbar/Navbar.jsx'
import Profile from './components/Profile';
import Login from './components/Login.jsx'
import { Route, Routes } from 'react-router-dom';
import Logout from './components/Logout.jsx'
import Home from './components/Home.jsx'
import Comment from './components/CommentCard.jsx'
import History from './components/History';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/logout' element={<Logout/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/comment' element={<Comment/>}/>
        <Route path='/history' element={<History/>}/>
      </Routes>
    </>
  );
}

export default App;
