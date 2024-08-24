import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'


export const fetchUserById = createAsyncThunk(
    'users/fetchServerdata',
    async () => {
      let response = await fetch('http://localhost:3000/')
     let res = await response.json();
     console.log(res)
      return res;
    },
  ) 
const initialState = {
  value: 0,
  servdata : [],
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.servdata.push(action.payload)
    })},
})


export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer