import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import './App.css';
import Home from './Home';
import Login from './Login'
import welcome from './welcome';
import Addrecord from './Addrecord';
import {AuthProvider} from './Auth';


function App() {
  return (

    <AuthProvider>
    <Router>
      <div>
      <Route exact path="/addrecord" component ={Addrecord} />
      <Route exact path="/" component ={welcome} />
        <Route exact path="/home" component ={Home} />
        <Route exact path="/login" component ={Login} />
       

      </div>
    </Router>
    </AuthProvider>
    
  );
}

export default App;
