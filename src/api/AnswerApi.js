import BaseApi from './BaseApi';

const AnswerApi = () => {

    const _api = BaseApi.api;

    const getAll = () => {
        return _api.get('/api/answer');
    };

    const getByAnamnesis = (id) => {
        return _api.get('/api/answer/anamnesis/'+id);
    };

    const getOne = (id) => {
        return _api.get('/api/answer/'+id);
    };

    const create = (data) => {
        return _api.post('/api/answer', data);
    };

    const update = (data, id) => {
        console.log("/api/answer", id);
        return _api.put('/api/answer/update/'+id, data);
    };

    const remove = (id) => {
        return _api.post('/api/answer/delete', id);
    };

    return {
        getAll,
        getByAnamnesis,
        getOne,
        create,
        update,
        remove
    }

};

export default AnswerApi();
