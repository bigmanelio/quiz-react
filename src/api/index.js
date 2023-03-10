import axios from "axios";

export const BASE_URL = 'http://localhost:5066/'

export const ENDPOINTS = {
    answer: 'answer',
    question: 'question',
    survey: 'survey',
    Login: 'User/login',
    Register: 'User/Register'

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