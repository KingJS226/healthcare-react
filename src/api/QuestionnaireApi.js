import BaseApi from './BaseApi';

const Questionnaire = () => {

    const _api = BaseApi.api;

    const getAll = () => {
        return _api.get('/api/questionnaire');
    };

    const getByDoctor = (name) => {
        return _api.get('/api/questionnaire/doctor/' + name);
    };

    const getOne = (id) => {
        return _api.get('/api/questionnaire/'+id);
    };

    const create = (data) => {
        return _api.post('/api/questionnaire', data);
    };

    const update = (data, id) => {
        return _api.put('/api/questionnaire/update/'+id, data);
    };

    const remove = (id) => {
        return _api.post('/api/questionnaire/delete', id);
    };

    return {
        getAll,
        getByDoctor,
        getOne,
        create,
        update,
        remove
    }

};

export default Questionnaire();
