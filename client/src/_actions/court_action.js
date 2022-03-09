import axios from 'axios'
import {
    ADD_COURT,
    GET_COURT,
    DELETE_COURT
} from './types'

export function addCourt(dataToSubmit) {
    const request = axios.post('/api/courts/add', dataToSubmit)
        .then(response => response.data)

    return {
        type: ADD_COURT,
        payload: request
    }
}

export function getUnvalidCourt() {
    const request = axios.get('/api/courts/unvalid')
        .then(response => response.data)

    return {
        type: GET_COURT,
        payload: request
    }
}

export function deleteCourt(dataToSubmit) {
    const request = axios.post('/api/courts/delete', dataToSubmit)
        .then(response => response.data)

    return {
        type: DELETE_COURT,
        payload: request
    }
}