import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IAuthInitialState } from '../storeInterface/isAuthInterface'
import axios from '../../../axios'

export const fetchIsAuth = createAsyncThunk(
	'isAuth/fetchIsAuth',
	async (params: {email: string, password: string}) => {
		const { data } = await axios.post('auth/login', params)
		return data
	}
)

export const fetchAuthMe = createAsyncThunk('isAuth/fetchAuthMe', async () => {
	const {data} = await axios.get('auth/me')
	return data
})

export const fetchAuthRegister = createAsyncThunk('register/fetchAuthRegister', async (params: {email: string, name: string, password: string}) => {
	const {data} = await axios.post('/auth/register', params)
	return data
})

const initialState: IAuthInitialState = {
	isAuth: null,
	status: '',
	error: '',
}

const isAuthSlice = createSlice({
	name: 'isAuth',
	initialState,
	reducers: {
		logout: (state: IAuthInitialState) => {
			state.isAuth = null
			state.status = 'loaded'
			state.error = ''
		}
	},
	extraReducers: {
		[fetchIsAuth.fulfilled.type]: (
			state: IAuthInitialState,
			action: PayloadAction<{
				_id: string
				name: string
				createdAt: string,
    		updatedAt: string
				email: string
				token: string
				__v: number
			}>
		) => {
			state.isAuth = action.payload
			state.status = 'loaded'
			state.error = ''
		},
		[fetchIsAuth.pending.type]: (state: IAuthInitialState) => {
			state.isAuth = null
      state.status = 'loading'
			state.error = ''
		},
		[fetchIsAuth.rejected.type]: (state: IAuthInitialState) => {
			state.isAuth = null 
      state.status = 'loaded'
			state.error = 'error'
		},
		[fetchAuthMe.fulfilled.type]: (
			state: IAuthInitialState,
			action: PayloadAction<{
				_id: string
				name: string
				createdAt: string,
    		updatedAt: string
				email: string
				token: string
				__v: number
			}>
		) => {
			state.isAuth = action.payload
			state.status = 'loaded'
			state.error = ''
		},
		[fetchAuthMe.pending.type]: (state: IAuthInitialState) => {
			state.isAuth = null
      state.status = 'loading'
			state.error = ''
		},
		[fetchAuthMe.rejected.type]: (state: IAuthInitialState) => {
			state.isAuth = null 
      state.status = 'loaded'
			state.error = 'error'
		},
		[fetchAuthRegister.fulfilled.type]: (
			state: IAuthInitialState,
			action: PayloadAction<{
				_id: string
				name: string
				createdAt: string,
    		updatedAt: string
				email: string
				token: string
				__v: number
			}>
		) => {
			state.isAuth = action.payload
			state.status = 'loaded'
			state.error = ''
		},
		[fetchAuthRegister.pending.type]: (state: IAuthInitialState) => {
			state.isAuth = null
      state.status = 'loading'
			state.error = ''
		},
		[fetchAuthRegister.rejected.type]: (state: IAuthInitialState) => {
			state.isAuth = null 
      state.status = 'loaded'
			state.error = 'error'
		},
	},
})

export const isAuthFunction = (state:any) => Boolean(state.isAuthReducer.isAuth)

export const isAuthReducer = isAuthSlice.reducer
export const {logout} = isAuthSlice.actions
