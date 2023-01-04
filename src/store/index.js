import { fetchUserOne } from './userReducer'
import {createStore, combineReducers} from 'redux'
import { reducer } from './cashReducer'
import { find } from './findReducer'


const rootReducer = combineReducers({
    cash: reducer,
    user: fetchUserOne,
    find: find
})

export const store = createStore(rootReducer)