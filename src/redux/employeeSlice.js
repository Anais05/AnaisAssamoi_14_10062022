import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: null,
  error: null,
}

const { actions, reducer } = createSlice({
  name: 'employee',
  initialState,
  reducers: {
  }
})

export default reducer;