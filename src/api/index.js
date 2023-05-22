import axios from "axios";

export const BASE_URL = 'http://localhost:5066/'

export const ENDPOINTS = {
    answer: 'answer',
    question: 'question',
    optional: 'question/optional',
    survey: 'survey',
    lesson: 'lesson',
    user: 'user',
    sms: 'Sms',

    ForGrade: 'user/forgrade',

    training: 'survey/training',
    truth: 'answer/truth',
    Login: 'User/login',
    Register: 'User/Register',
    Assign: 'User/Assign',
    Unassign: 'User/Unassign',
    Change: 'User/change',
    Response: 'Response',
    Grade: 'Response/Grade',
    NextQuestion: 'Answer/NextQuestion',


}
export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url,  { headers: {'Content-Type': 'application/json'}}),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord, { headers: {'Content-Type': 'application/json'}}),
        patch: (id, updatedRecord) => axios.patch(url + id, updatedRecord, { headers: {'Content-Type': 'application/json'}}),

        delete: id => axios.delete(url + id),
    }
}