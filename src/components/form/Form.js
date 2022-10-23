import React, { useState, } from "react";
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import { Modal } from "simple-react-modal-by-assamoi";
import api from "../../redux/ApiCalls";
import './Form.css'

export default function Form() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [birthDay, setBirthDay] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [modalOpen, setModalOpen] = useState(false);


  const departmentOption = [
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Human-resources', label: 'Human Resources' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Sales', label: 'Sales' },
  ]

  const statesOption = [
    { value: 'AK', label: 'Alaska'},
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

  const ModalContent = "Successfully created employee !";
  const myTheme = {
    closeBtnColor: "#ffffff",
    closeBtnBgColor: "#2591CE",
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
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
      await api.create(employee)
    } catch (error) {
      console.log(error)
    } 
    setModalOpen(true)
  };

  const onCloseModal = () => {
    setModalOpen(false)
    setFirstName('')
    setLastName('')
    setStreet('')
    setCity('')
    setZipCode('')
    setBirthDay(null)
    setStartDate(null)
    setSelectedState('')
    setSelectedDepartment('')
  };

  const onCancelBtn = () => {
    navigate('/')
  };

  return (
    <div className="form">
      <h1 className="list-title">Create employee</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="firstname">First name</label>
          <input type="text" id="firstname" value={firstName}  onChange={(e) => {setFirstName(e.target.value)}} placeholder="first name" required/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastname">Last name</label>
          <input type="text" id="lastname" value={lastName} onChange={(e) => {setLastName(e.target.value)}} placeholder="last name" required/>
        </div>
        <div className="date-input-wrapper">
          <div className="input-wrapper">
            <label htmlFor="birthday">Birth Date</label>
            <DatePicker 
              id="birthday"
              selected={birthDay}
              dateFormat="dd/MM/yyyy" 
              showMonthDropdown
              useShortMonthInDropdown
              showYearDropdown
              dropdownMode="select" 
              onChange={(date) => setBirthDay(date)} 
              placeholderText="Select birth date"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="startDate">Start Date</label>
            <DatePicker
              id="startDate" 
              selected={startDate} 
              dateFormat="dd/MM/yyyy" 
              showMonthDropdown
              useShortMonthInDropdown
              showYearDropdown
              dropdownMode="select"
              onChange={(date) => setStartDate(date)} 
              placeholderText="Select start date"
              required
            />
          </div>
        </div>
        <div className="input-wrapper">
          <label htmlFor="street">Street</label>
          <input type="text" id="street" value={street} onChange={(e) => {setStreet(e.target.value)}} placeholder="street name" required/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="city">City</label>
          <input type="text" id="city" value={city} onChange={(e) => {setCity(e.target.value)}} placeholder="city name" required/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="state">State</label>
          <Select aria-labelledby="state" id="state" className="select-input" defaultValue={selectedState} onChange={setSelectedState} options={statesOption} placeholder="select state"/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="zipcode">Zip code</label>
          <input type="text" id="zipcode" value={zipCode} onChange={(e) => {setZipCode(e.target.value)}} placeholder="zip code" required/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="department">Department</label>
          <Select aria-labelledby="department" id="department" className="select-input" defaultValue={selectedDepartment} setValue = {selectedDepartment} onChange={setSelectedDepartment} options={departmentOption} placeholder="select department"/>
        </div>
        <div className="btn-container">
          <button type="button" className="cancel-button btn bg-light" onClick={onCancelBtn}>Retour</button>
          <button type="submit" className="create-button btn bg-dark">Create</button>
        </div>

        <Modal open={modalOpen}
          content={ModalContent}
          theme={myTheme}
          onClose={onCloseModal} 
        />
      </form>
    </div>
  );
}
