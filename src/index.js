import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import App from "./App";
import  registerServiceWorker from './registerServiceWorker';
import {Router} from 'react-router-dom';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import common_de from "./assets/translations/de.json";
import common_en from "./assets/translations/en.json";
import {loadState} from "./storage/storage";
let createHistory = require ('history').createHashHistory;
const history = createHistory();

i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: loadState("state")?loadState("state"):"de",                              // language to use
    resources: {
        en: {
            common: common_en               // 'common' is our custom namespace
        },
        de: {
            common: common_de
        },
    },
});
ReactDOM.render(
    <I18nextProvider i18n={i18next}>
        <Router history={history}>
            <App/>
        </Router>
    </I18nextProvider>,
    document.getElementById('root'));

registerServiceWorker();