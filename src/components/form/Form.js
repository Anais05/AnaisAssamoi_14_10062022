import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import Select from 'react-select'
import './Form.css'

export default function Form({edition}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [birtday, setBirtday] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

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
    { label: "IL", value: "Illinois" },
    { label: "Illinois", value: "Indiana" },
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

  async function handleSubmit() {
    console.log('submit')
  };

  return (
    <div className="form">
      <h1 className="list-title">{edition ? 'Modifier un employé' : 'Créer un employé'}</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" value={firstName}  onChange={(e) => {setFirstName(e.target.value)}}/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lastname" value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="birthday">Birthday</label>
          <DatePicker dateFormat="dd/MM/yyyy" onChange={(date) => setBirtday(date)} setDate={birtday} placeholderText="Select birthday"/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastname">Start Date</label>
          <DatePicker dateFormat="dd/MM/yyyy" onChange={(date) => setStartDate(date)} setDate={startDate} required={true} placeholderText="Select start date"/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="street">Street</label>
          <input type="text" id="street" value={street} onChange={(e) => {setStreet(e.target.value)}}/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="city">City</label>
          <input type="text" id="city"  value={city} onChange={(e) => {setCity(e.target.value)}}/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="firstname">State</label>
          <Select  defaultValue={selectedState} onChange={setSelectedState} options={statesOption} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="zipcode">Zip Code</label>
          <input type="text" id="zipcode"  value={zipCode} onChange={(e) => {setZipCode(e.target.value)}}/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="department">Department</label>
          <Select  defaultValue={selectedDepartment} onChange={setSelectedDepartment} options={departmentOption} />
        </div>
        <button className="create-button bg-dark">Create</button>
      </form>
    </div>
  );
}
