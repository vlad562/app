import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IPosts } from '../../../interface/post/postInterface'
import axios from '../../../axios'
import { IPostInitialState } from '../storeInterface/postInterface'

export const fetchPost = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await axios.get<IPosts[]>('/article/all')
	return data
})

const initialState: IPostInitialState = {
	posts: [],
	status: 'loading',
	error: '',
} 

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchPost.fulfilled.type]: (
			state: IPostInitialState,
			action: PayloadAction<IPosts[]>
		) => {
			state.posts = action.payload
			state.status = 'loaded'
			state.error = ''
		},
		[fetchPost.pending.type]: state => {	
			state.posts = []
			state.status = 'loading'
			state.error = ''
		},
		[fetchPost.rejected.type]: state => {
			state.posts = []
			state.status = 'loaded'
			state.error = 'error'
		},
	},
})

export const postsReducer = postsSlice.reducer
