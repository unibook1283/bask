import {
    GET_FAVORITES
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case GET_FAVORITES:
            return { ...state, data: action.payload }
        default:
            return state
    }
}