import React, { useState, } from "react";
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import api from "../../redux/ApiCalls";
import Select from 'react-select'
import { useSelector } from 'react-redux';
import './Form.css'

export default function Form() {
  let edition;
  const employeeToEdit = useSelector((state)=>state.employee.employee);

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(employeeToEdit  ? employeeToEdit.firstName : '');
  const [lastName, setLastName] = useState(employeeToEdit  ? employeeToEdit.lastName : '');
  const [street, setStreet] = useState(employeeToEdit  ? employeeToEdit.street : '');
  const [city, setCity] = useState(employeeToEdit  ? employeeToEdit.city : '');
  const [zipCode, setZipCode] = useState(employeeToEdit  ? employeeToEdit.zipCode : '');
  const [birthDay, setBirthDay] = useState(employeeToEdit  ? new Date(employeeToEdit.birthDay) : null);
  const [startDate, setStartDate] = useState(employeeToEdit  ? new Date(employeeToEdit.startDate) :null);
  const [selectedDepartment, setSelectedDepartment] = useState(employeeToEdit  ? { value: employeeToEdit.department, label: employeeToEdit.department} : '');
  const [selectedState, setSelectedState] = useState(employeeToEdit  ?  { value: employeeToEdit.stateAb, label: employeeToEdit.state } : '');

  if(employeeToEdit) {
    edition = true;
  }

  const departmentOption = [
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Human-resources', label: 'Human Resources' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
  ]

  const statesOption = [
    { value: 'AK', label: 'Alaska'},
    { value: 'TX', label: 'Texas'},
    { value: 'AL', label: 'Alabama'},
    { value: 'AR', label: 'Arkansas'},
    { value: 'AZ', label: 'Arizona'},
    { value: 'CA', label: 'California'},
    { value: 'CO', label: 'Colorado'},
    { value: 'CT', label: 'Connecticut'},
    { value: 'DC', label: 'District of Columbia'},
    { value: 'DE', label: 'Delaware'},
    { value: 'FL', label: 'Florida'},
    { value: 'GA', label: 'Georgia'},
    { value: 'HI', label: 'Hawaii'},
    { value: 'IA', label: 'Iowa'},
    { value: 'ID', label: 'Idaho'},
    { value: 'IL', label: 'Illinois'},
    { value: 'IN', label: 'Indiana'},
    { value: 'KS', label: 'Kansas'},
    { value: 'KY', label: 'Kentucky'},
    { value: 'LA', label: 'Louisiana'},
    { value: 'MA', label: 'Massachusetts'},
    { value: 'MD', label: 'Maryland'},
    { value: 'ME', label: 'Maine'},
    { value: 'MI', label: 'Michigan'},
    { value: 'MN', label: 'Minnesota'},
    { value: 'MO', label: 'Missouri'},
    { value: 'MS', label: 'Mississippi'},
    { value: 'MT', label: 'Montana'},
    { value: 'NC', label: 'North Carolina'},
    { value: 'ND', label: 'North Dakota'},
    { value: 'NE', label: 'Nebraska'},
    { value: 'NH', label: 'New Hampshire'},
    { value: 'NJ', label: 'New Jersey'},
    { value: 'NM', label: 'New Mexico'},
    { value: 'NV', label: 'Nevada'},
    { value: 'NY', label: 'NewYork'},
    { value: 'OH', label: 'Ohio'},
    { value: 'OK', label: 'Oklahoma'},
    { value: 'OR', label: 'Oregon'},
    { value: 'PA', label: 'Pennsylvania'},
    { value: 'RI', label: 'Rhode Island'},
    { value: 'SC', label: 'South Carolina'},
    { value: 'SD', label: 'South Dakota'},
    { value: 'TN', label: 'Tennessee'},
    { value: 'TX', label: 'Texas'},
    { value: 'UT', label: 'Utah'},
    { value: 'VA', label: 'Virginia'},
    { value: 'VT', label: 'Vermont'},
    { value: 'WA', label: 'Washington'},
    { value: 'WI', label: 'Wisconsin'},
    { value: 'WV', label: 'West Virginia'},
    { value: 'WY', label: 'Wyoming'}
  ]

  const handleSubmit = async () => {
    const employee = {
      firstName : firstName,
      lastName : lastName,
      birthDay : birthDay,
      startDate : startDate,
      street : street,
      city : city,
      state : selectedState.label,
      stateAb: selectedState.value,
      zipCode : zipCode,
      department :selectedDepartment.value,
    }
      
    try {
      if (edition) {
        employee.id = employeeToEdit._id
        await api.update(employee);
      } else {
        await api.create(employee)
      }
    } catch (error) {
      console.log(error)
    } 
    finally {
      navigate('/')
    }
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
