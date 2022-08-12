import { createSlice } from "@reduxjs/toolkit"

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    list: null,
  },
  reducers: {
    getList: (state, action) => {
      return {
        ...state,
        list: action.payload.list,
      }
    },
  }
})

export const { getList } = employeeSlice.actions 
export default employeeSlice.reducer;