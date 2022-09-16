import { createSlice } from "@reduxjs/toolkit"

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employee: {
      firstName: "",
      lastName: "",
      birthDay:"",
      startDate: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      department: "",
    },
  },
  reducers: {
    addEmployee: (state, action) => {
      return {
        ...state,
      firstName : action.payload.firstName,
      lastName : action.payload.lastName,
      birthDay : action.payload.birthDay,
      startDate : action.payload.startDate,
      street : action.payload.street,
      city : action.payload.city,
      state : action.payload.state,
      zipCode : action.payload.zipCode,
      department : action.payload.department,
      
      }
    },
  }
})

export const { addEmployee } = employeeSlice.actions 
export default employeeSlice.reducer;