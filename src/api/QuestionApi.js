import BaseApi from './BaseApi';

const QuestionApi = () => {

    const _api = BaseApi.api;

    const getAll = () => {
        return _api.get('/api/question');
    };

    const getByQuestionnaireID = (id) => {
        return _api.get('/api/question/questionnaire/'+id);
    }

    const getOne = (id) => {
        return _api.get('/api/question/'+id);
    };

    const create = (data) => {
        return _api.post('/api/question', data);
    };

    const update = (data, id) => {
        return _api.put('/api/question/update/'+id, data);
    };

    const remove = (id) => {
        return _api.post('/api/question/delete', id);
    };

    return {
        getAll,
        getByQuestionnaireID,
        getOne,
        create,
        update,
        remove
    }

};

export default QuestionApi();
