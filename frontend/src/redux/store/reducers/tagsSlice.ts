import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../../axios'

interface IInitialState {
	tags: string[][]
	status: string
	error: string
}

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
	const { data } = await axios.get('/tags/all')
	return data
})

const initialState: IInitialState = {	
	tags: [],
	status: 'loading',
	error: '',
}

const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchTags.pending.type]: state => {
			state.tags = []
			state.status = 'loading'
		},
		[fetchTags.fulfilled.type]: (state, action) => {
			state.tags = action.payload
			state.status = 'loaded'
      state.error = ''
		},
		[fetchTags.rejected.type]: state => {
			state.tags = []
			state.status = 'loaded'
      state.error = 'error'
		},
	},
})

export const tagsReducer = tagsSlice.reducer
