import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT_USER,
    AUTH_USER
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, data: action.payload }    
        case REGISTER_USER:
            return { ...state, data: action.payload }
        case LOGOUT_USER:
            return { ...state, data: action.payload }
        case AUTH_USER:
            return { ...state, data: action.payload }
        default:
            return state
    }
}