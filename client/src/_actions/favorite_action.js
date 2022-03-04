import axios from 'axios'
import {
    GET_FAVORITES,
    DELETE_FAVORITE,
    ADD_FAVORITE
} from './types'

export function getFavorites() {
    const request = axios.get('/api/favorites')
        .then(response => response.data)

    return {
        type: GET_FAVORITES,
        payload: request
    }
}

export function deleteFavorite(dataToSubmit) {
    const request = axios.post('/api/favorites/delete', dataToSubmit)
        .then(response => response.data)

    return {
        type: DELETE_FAVORITE,
        payload: request
    }
}

export function addFavorite(dataToSubmit) {
    const request = axios.post('/api/favorites/add', dataToSubmit)
        .then(response => response.data)

    return {
        type: ADD_FAVORITE,
        payload: request
    }
}