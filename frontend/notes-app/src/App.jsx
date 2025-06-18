import React from "react";
import { BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';

import Modal from 'react-modal'; //  Add this line

Modal.setAppElement('#root'); // Add this line just once


const routes = (
  <Router>
    <Routes>
        <Route path="/dashboard"  element = {<Home/>}/>
        <Route path="/login"  element = {<Login />}/>
        <Route path="/"  element = {<Navigate to="/login" />}/>
        <Route path="/signup"  element = {<SignUp />}/>
    </Routes>
  </Router>
);

const App =() =>{
    return(
        <div>{routes}</div>
    )
}

export default App;