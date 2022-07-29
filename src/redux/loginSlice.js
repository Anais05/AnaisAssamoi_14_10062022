import { createSlice } from "@reduxjs/toolkit"

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogged: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLogged = true;
      state.token = action.payload.token;
      return state;
    },
    logout : (state) => {
      state.isLogged = false; 
      state.token = null
    },
  }
})

export const { login, logout } = loginSlice.actions 
export default loginSlice.reducer;