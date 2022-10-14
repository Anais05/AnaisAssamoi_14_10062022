import { createSlice } from "@reduxjs/toolkit"

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLogged: false,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        isLogged: true,
        token: action.payload.token
      }
    },
    logout : (state) => {
      return {
        ...state,
        isLogged: false,
        token: null
      }
    },
  }
})

export const { login, logout } = loginSlice.actions 
export default loginSlice.reducer;