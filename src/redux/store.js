import { combineReducers, createStore } from 'redux'
import notesReducer from './notes-reducer'
import { compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { emptyStrFilter } from './middleware'

let reducers = combineReducers({
  notesReducer,
})

export let store = createStore(reducers, applyMiddleware(thunk, emptyStrFilter))
