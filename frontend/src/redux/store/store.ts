import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { postsReducer } from './reducers/postSlice'
import { tagsReducer } from './reducers/tagsSlice' 
import { isAuthReducer } from './reducers/isAuthSlice'
const rootReducer = combineReducers({
	tagsReducer,
	postsReducer,
	isAuthReducer,
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
