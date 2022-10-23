import React, { useState, } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import { Modal } from "simple-react-modal-by-assamoi";
import { departmentOptions, statesOptions, generateId, formatDate } from "../../utils/utils";
import { addEmployee } from "../../redux/employeeSlice";
import { useDispatch } from 'react-redux';
import './Form.css'

export default function Form() {
  const dispatch = useDispatch()

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

  const ModalContent = "Successfully created employee !";
  const myTheme = {
    closeBtnColor: "#ffffff",
    closeBtnBgColor: "#2591CE",
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    const employee = {
      id: generateId(),
      firstName : firstName,
      lastName : lastName,
      birthDay : formatDate(birthDay),
      startDate : formatDate(startDate),
      street : street,
      city : city,
      state : selectedState.label,
      stateAb: selectedState.value,
      zipCode : zipCode,
      department :selectedDepartment.value,
    }
    dispatch(addEmployee({employee}))
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


  return (
    <div className="form">
      <h1 className="list-title">Create Employee</h1>

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
          <Select aria-labelledby="state" id="state" className="select-input" defaultValue={selectedState} onChange={setSelectedState} options={statesOptions} placeholder="select state"/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="zipcode">Zip code</label>
          <input type="text" id="zipcode" value={zipCode} onChange={(e) => {setZipCode(e.target.value)}} placeholder="zip code" required/>
        </div>
        <div className="input-wrapper">
          <label htmlFor="department">Department</label>
          <Select aria-labelledby="department" id="department" className="select-input" defaultValue={selectedDepartment} setValue = {selectedDepartment} onChange={setSelectedDepartment} options={departmentOptions} placeholder="select department"/>
        </div>
        <div className="btn-container">
          <button type="submit" className="create-button btn bg-dark">Save</button>
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
