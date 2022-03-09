import { combineReducers } from 'redux'
import user from './user_reducer'
import favorite from './favorite_reducer'
import court from './court_reducer'

const rootReducer = combineReducers({
    user,
    favorite,
    court
})

export default rootReducer