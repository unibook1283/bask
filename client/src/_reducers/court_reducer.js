import {
    ADD_COURT,
    GET_COURT,
    DELETE_COURT
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_COURT:
            return { ...state, data: action.payload }
        case GET_COURT:
            return { ...state, data: action.payload }
        case DELETE_COURT:
            return { ...state, data: action.payload }
        default:
            return state
    }
}