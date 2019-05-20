import React from "react";
import { Switch, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import MainContainer from './components/MainContainer'
import { withTranslation } from 'react-i18next';

import './style.css';
const App = () => {

    return (
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/pages/login' exact component={Login} />
                <MainContainer/>
            </Switch>
    );
}

export default withTranslation('common')(App);
