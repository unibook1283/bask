import axios from 'axios'
import {
    GET_FAVORITES
} from './types'

export function getFavorites() {
    const request = axios.get('/api/favorites')
        .then(response => response.data)

    return {
        type: GET_FAVORITES,
        payload: request
    }
}