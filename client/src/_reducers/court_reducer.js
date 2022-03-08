import {
    ADD_COURT
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_COURT:
            return { ...state, data: action.payload }
        default:
            return state
    }
}