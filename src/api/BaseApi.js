import axios from 'axios';
import ApiConfig from '../config/ApiConfig';

class BaseApi {

    _baseDevURL = ApiConfig.baseDevURL;
    _baseProURL = ApiConfig.baseProURL;
    _api = null;

    constructor() {
        const baseURL = process.env.NODE_ENV === 'production'? this._baseProURL: this._baseDevURL;
        if (!this._api){
            this._api = axios.create({
                baseURL,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'crossDomain': true
                },
                timeout: 6000
            });

            if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
                return;
            }

            this._api.interceptors.response.use(function (response) {
                console.log('%cRESPONSE: ' + response.status + ' %c'+ response.config.url, 'color: blue; font-weight: bold;', 'color: black;font-weight: normal;', response.data);
                return response;
            }, function (error) {
                console.log('%cRESPONSE: '+error , 'color: red; font-weight: bold;');
                return Promise.reject(error);
            })
        }
    }

    get baseUrl() {
        return process.env.NODE_ENV === 'production'? this._baseProURL : this._baseDevURL;
    }

    get api() {
        return this._api;
    }

    get authToken() {
        return this._api.defaults.headers.common['x-access-token'];
    }

    set authToken(token) {
        if (token === null) {
            delete axios.defaults.headers.common['x-access-token'];
            return;
        }

        this._api.defaults.headers.common['x-access-token'] = token
    }

}

export default new BaseApi();