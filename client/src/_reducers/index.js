import { combineReducers } from 'redux'
import user from './user_reducer'
import favorite from './favorite_reducer'

const rootReducer = combineReducers({
    user,
    favorite
})

export default rootReducer