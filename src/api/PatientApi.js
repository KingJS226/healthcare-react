import BaseApi from './BaseApi';

const Anamnesis = () => {

    const _api = BaseApi.api;

    const getAll = () => {
        return _api.get('/api/patient');
    };

    const getByDoctor = (id) => {
        return _api.get('/api/patient/doctor/'+id);
    };

    const getOne = (id) => {
        return _api.get('/api/patient/'+id);
    };

    const create = (data) => {
        return _api.post('/api/patient', data);
    };

    const update = (data, id) => {
        return _api.put('/api/patient/update/'+id, data);
    };

    const remove = (id) => {
        return _api.post('/api/patient/delete', id);
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

export default Anamnesis();
