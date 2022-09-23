import React, { useState, } from "react";
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import api from "../../redux/ApiCalls";
import Select from 'react-select'
import './Form.css'
import { useSelector } from 'react-redux';


export default function Form() {
  let edition;
  const employeeToEdit = useSelector((state)=>state.employee.employee);

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(employeeToEdit  ? employeeToEdit.firstName : '');
  const [lastName, setLastName] = useState(employeeToEdit  ? employeeToEdit.lastName : '');
  const [street, setStreet] = useState(employeeToEdit  ? employeeToEdit.street : '');
  const [city, setCity] = useState(employeeToEdit  ? employeeToEdit.city : '');
  const [zipCode, setZipCode] = useState(employeeToEdit  ? employeeToEdit.zipCode : '');
  const [birthDay, setBirthDay] = useState(employeeToEdit  ? null : null);
  const [startDate, setStartDate] = useState(employeeToEdit  ? null :null);
  const [selectedDepartment, setSelectedDepartment] = useState(employeeToEdit  ? employeeToEdit.department : '');
  const [selectedState, setSelectedState] = useState(employeeToEdit  ?  { value: employeeToEdit.state, label: employeeToEdit.state } : '');

  if(employeeToEdit) {
    edition = true;
  }

  console.log(selectedState)

  const departmentOption = [
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
  ]

  const statesOption = [
    { label: "Alaska", value: "Alaska" },
    { label: "Alabama", value: "Alabama" },
    { label: "Arkansas", value: "Arkansas" },
    { label: "Arizona", value: "Arizona" },
    { label: "California", value: "California" },
    { label: "Colorado", value: "Colorado" },
    { label: "Connecticut", value: "Connecticut" },
    { label: "District of Columbia", value: "District of Columbia" },
    { label: "Delaware", value: "Delaware" },
    { label: "Florida", value: "Florida" },
    { label: "Georgia", value: "Georgia" },
    { label: "Hawaii", value: "Hawaii" },
    { label: "Iowa", value: "Iowa" },
    { label: "Idaho", value: "Idaho" },
    { label: "Illinois", value: "Illinois" },
    { label: "Indiana", value: "Indiana" },
    { label: "Kansas", value: "Kansas" },
    { label: "Kentucky", value: "Kentucky" },
    { label: "Louisiana", value: "Louisiana" },
    { label: "Massachusetts", value: "Massachusetts" },
    { label: "Maryland", value: "Maryland" },
    { label: "Maine", value: "Maine" },
    { label: "Michigan", value: "Michigan" },
    { label: "Minnesota", value: "Minnesota" },
    { label: "Missouri", value: "Missouri" },
    { label: "Mississippi", value: "Mississippi" },
    { label: "Montana", value: "Montana" },
    { label: "North Carolina", value: "North Carolina" },
    { label: "North Dakota", value: "North Dakota" },
    { label: "Nebraska", value: "Nebraska" },
    { label: "New Hampshire", value: "New Hampshire" },
    { label: "New Jersey", value: "New Jersey" },
    { label: "New Mexico", value: "New Mexico" },
    { label: "Nevada", value: "Nevada" },
    { label: "New York", value: "NewYork" },
    { label: "Ohio", value: "Ohio" },
    { label: "Oklahoma", value: "Oklahoma" },
    { label: "Oregon", value: "Oregon" },
    { label: "Pennsylvania", value: "Pennsylvania" },
    { label: "Rhode Island", value: "Rhode Island" },
    { label: "South Carolina", value: "South Carolina" },
    { label: "South Dakota", value: "South Dakota" },
    { label: "Tennessee", value: "Tennessee" },
    { label: "Texas", value: "Texas" },
    { label: "Utah", value: "Utah" },
    { label: "Virginia", value: "Virginia" },
    { label: "Vermont", value: "Vermont" },
    { label: "Washington", value: "Washington" },
    { label: "Wisconsin", value: "Wisconsin" },
    { label: "West Virginia", value: "West Virginia" },
    { label: "Wyoming", value: "Wyoming" },
  ]

  const formatDate = (date) => {
    const day = (date.getDate()).toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`.toString();
  };

  const handleSubmit = async () => {
    const employee = {
      firstName : firstName,
        lastName : lastName,
        birthDay : formatDate(birthDay),
        startDate : formatDate(startDate),
        street : street,
        city : city,
        state : selectedState.value,
        zipCode : zipCode,
        department :selectedDepartment.value,
    }
      
    try {
      if (edition) {
        console.log('edit')
        await api.update(employee);
      }
      await api.create(employee)
    } catch (error) {
      console.log(error)
    } 
    // finally {
    //   navigate('/')
    // }
    console.log('submit')
  };

  return (
    <div className="form">
      <h1 className="list-title">{edition ? 'Modifier un employé' : 'Créer un employé'}</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" value={firstName}  onChange={(e) => {setFirstName(e.target.value)}} required/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" value={lastName} onChange={(e) => {setLastName(e.target.value)}} required/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="birthday">Birthday</label>
          <DatePicker 
            selected={birthDay}
            dateFormat="dd/MM/yyyy" 
            showMonthDropdown
            useShortMonthInDropdown
            showYearDropdown
            dropdownMode="select" 
            onChange={(date) => setBirthDay(date)} 
            placeholderText="Select birthday"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastname">Start Date</label>
          <DatePicker 
            selected={startDate} 
            dateFormat="dd/MM/yyyy" 
            showMonthDropdown
            useShortMonthInDropdown
            showYearDropdown
            dropdownMode="select"
            onChange={(date) => setStartDate(date)} 
            placeholderText="Select start date"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="street">Street</label>
          <input type="text" id="street" value={street} onChange={(e) => {setStreet(e.target.value)}}/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="city">City</label>
          <input type="text" id="city" value={city} onChange={(e) => {setCity(e.target.value)}}/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="firstname">State</label>
          <Select defaultValue={selectedState} onChange={setSelectedState} options={statesOption} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="zipcode">Zip Code</label>
          <input type="text" id="zipcode" value={zipCode} onChange={(e) => {setZipCode(e.target.value)}}/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="department">Department</label>
          <Select defaultValue={selectedDepartment} setValue = {selectedDepartment} onChange={setSelectedDepartment} options={departmentOption} />
        </div>
        <button className="create-button bg-dark">{edition ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}
