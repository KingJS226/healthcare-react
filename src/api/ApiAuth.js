import BaseApi from './BaseApi';

const ApiAuth = () => {

    const _api = BaseApi.api;

    const login = (data) => {
        console.log(data, BaseApi.api);
        return _api.post('/api/auth/signin', data);
    };

    const logout = (data) => {
        return _api.get('/api/auth/logout', data);
    };

    const resetRequest = (data) => {
        return _api.post('/api/auth/reset/request', data);
    };

    const checkResetValidation = (data) => {
        return _api.post('/api/auth/reset/checkValidation', data)
    };

    const resetPassword = (data) => {
        return _api.post('/api/auth/reset/password', data);
    };

    return {
        login,
        logout,
        resetPassword,
        resetRequest,
        checkResetValidation,
    }

};

export default ApiAuth();