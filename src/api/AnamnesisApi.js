import BaseApi from './BaseApi';

const DoctorApi = () => {

    const _api = BaseApi.api;

    const getAll = () => {
        return _api.get('/api/anamnesis');
    };

    const getByPatient = (id) => {
        return _api.get('/api/anamnesis/patient/' + id);
    };

    const getByDoctor = (name) => {
        return _api.get('/api/anamnesis/doctor/' + name);
    };

    const getOne = (id) => {
        return _api.get('/api/anamnesis/'+id);
    };

    const create = (data) => {
        return _api.post('/api/anamnesis', data);
    };

    const update = (data, id) => {
        return _api.put('/api/anamnesis/update/'+id, data);
    };

    const remove = (id) => {
        return _api.post('/api/anamnesis/delete', id);
    };

    return {
        getAll,
        getByPatient,
        getByDoctor,
        getOne,
        create,
        update,
        remove
    }

};

export default DoctorApi();
