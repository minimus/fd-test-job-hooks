import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import home from './modules/home'
import maps from './modules/maps'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

export const reducer = combineReducers({
	home,
	maps,
})

export default initialState => createStoreWithMiddleware(reducer, initialState)
