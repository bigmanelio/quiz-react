import axios from "axios";

export const BASE_URL = 'http://localhost:5066/'

export const ENDPOINTS = {
    answer: 'answer',
    question: 'question',
    survey: 'survey',
}
export const createAPIEndpoint = endpoint => {

    let url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        patch: (id, updatedRecord) => axios.patch(url + id, updatedRecord, { headers: {'Content-Type': 'application/json'}}),

        delete: id => axios.delete(url + id),
    }
}