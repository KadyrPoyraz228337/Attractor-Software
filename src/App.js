import React from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import {Route, Switch} from "react-router";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./HOC/PrivatRoute/PrivatRoute";
import Articles from "./components/Articles/Articles";
import AddArticlePage from "./components/AddArticlePage/AddArticlePage";
import EditArticlePage from "./components/EditArticlePage/EditArticlePage";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import AddCategoryPage from "./components/AddCategoryPage/AddCategoryPage";
import EditCategoryPage from "./components/EditCategoryPage/EditCategoryPage";
import Profile from "./components/Profile/Profile";

function App() {
    return (
        <div>
            <ToastContainer/>
            <Navigation/>
            <Switch>
                <PrivateRoute component={AddArticlePage} role={'admin'} exact path='/add'/>
                <Route path='/register' exact component={Register}/>
                <Route path='/login' exact component={Login}/>
                <PrivateRoute component={Profile} exact path='/users/:id'/>
                <PrivateRoute component={Articles} exact path='/'/>
                <PrivateRoute component={Articles} exact path='/:category'/>
                <PrivateRoute component={EditArticlePage} role={'admin'} exact path='/edit/:id'/>
                <PrivateRoute component={AddCategoryPage} role={'admin'} exact path='/categories/new'/>
                <PrivateRoute component={EditCategoryPage} role={'admin'} exact path='/categories/edit/:id'/>
                <Route component={PageNotFound}/>
            </Switch>
        </div>
    );
}

export default App;
