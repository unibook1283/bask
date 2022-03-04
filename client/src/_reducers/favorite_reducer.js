import {
    GET_FAVORITES,
    DELETE_FAVORITE,
    ADD_FAVORITE
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case GET_FAVORITES:
            return { ...state, data: action.payload }
        case DELETE_FAVORITE:
            return { ...state, data: action.payload }
        case ADD_FAVORITE:
            return { ...state, data: action.payload }
        default:
            return state
    }
}