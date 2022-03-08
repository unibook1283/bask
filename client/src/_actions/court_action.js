import axios from 'axios'
import {
    ADD_COURT
} from './types'

export function addCourt(dataToSubmit) {
    const request = axios.post('/api/courts/add', dataToSubmit)
        .then(response => response.data)

    return {
        type: ADD_COURT,
        payload: request
    }
}