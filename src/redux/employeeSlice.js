import { createSlice } from "@reduxjs/toolkit"

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employee: null,
  },
  reducers: {
    getEmployee: (state, action) => {
      return {
        ...state,
        employee: action.payload.employee,
        isEdition: true,
      }
    },
  }
})

export const { getEmployee } = employeeSlice.actions 
export default employeeSlice.reducer;