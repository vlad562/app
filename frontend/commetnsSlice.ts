// import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { ICommentsInitialState, ICommentsPayload } from '../storeInterface/commentsInterface'
// import axios from '../../../axios'

// export const fetchComments = createAsyncThunk(
// 	'comments/fetchComments',
// 	async () => {
// 		const { data } = await axios.get('/comments/all')
// 		return data
// 	}
// )

// export const fetchCreateComment = createAsyncThunk(
// 	'createComments/fetchCreateComments',
// 	async params => {
// 		const { data } = await axios.post('comments/create', params)
// 		return data
// 	}
// )

// const initialState: ICommentsInitialState = {
// 	comments: [],
// 	status: '',
// 	error: '',
// }

// const commentsSlice = createSlice({
// 	name: 'comments',
// 	initialState,
// 	reducers: {},
// 	extraReducers: {
// 		[fetchComments.pending.type]: state => {
// 			state.comments = []
// 			state.status = 'loading'
// 			state.error = ''
// 		},
// 		[fetchComments.fulfilled.type]: (state, action: PayloadAction<ICommentsPayload[]>) => {
// 			state.comments = action.payload
// 			state.status = 'loaded'
// 			state.error = ''
// 		},
// 		[fetchComments.rejected.type]: state => {
// 			state.comments = []
// 			state.status = 'loaded'
// 			state.error = 'Error'
// 		},
// 		// [fetchCreateComment.pending.type]: state => {
// 		// 	state.comments = []
// 		// 	state.status = 'loading'
// 		// 	state.error = ''
// 		// },
// 		// [fetchCreateComment.fulfilled.type]: (state, action:PayloadAction<ICommentsPayload[]>) => {
// 		// 	state.comments = action.payload
// 		// 	state.status = 'loaded'
// 		// 	state.error = ''
// 		// },
// 		// [fetchCreateComment.rejected.type]: state => {
// 		// 	state.comments = []
// 		// 	state.status = 'loaded'
// 		// 	state.error = 'Error'
// 		// },
// 	},
// })

// export const commentReducer = commentsSlice.reducer




