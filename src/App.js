import React from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import {Route, Switch} from "react-router";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./components/PrivatRoute/PrivatRoute";

const test = () => {
    return (
        <h1>123</h1>
    )
}

function App() {
  return (
      <div>
        <ToastContainer />
        <Navigation/>
        <Switch>
          <Route path='/register' exact component={Register}/>
          <Route path='/login' exact component={Login}/>
          <PrivateRoute component={test} role='admin' exact path='/' />
        </Switch>
      </div>
  );
}

export default App;
