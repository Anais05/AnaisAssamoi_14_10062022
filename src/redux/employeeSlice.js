import { createSlice } from "@reduxjs/toolkit"

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employee: null,
    list: [],
  },
  
  reducers: {
    addEmployee: (state, action) => {
      state.employee = action.payload.employee;
      const employee = state.employee;
      state.list.push(employee)
    }
  }
})

export const { addEmployee } = employeeSlice.actions 
export default employeeSlice.reducer;