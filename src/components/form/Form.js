import React, { useState, } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import { Modal } from "simple-react-modal-by-assamoi";
import Input from "../input/Input";
import { departmentOptions, statesOptions, generateId } from "../../utils/utils";
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
      birthDay : birthDay,
      startDate : startDate,
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
        <Input type="text" name="firstname" label="First Name" value={firstName} setInput={setFirstName} placeholder="firstname" />
        <Input type="text" name="lastname" label="Last Name" value={lastName} setInput={setLastName} placeholder="lastname" />
        <div className="date-input-wrapper">
          <div className="input-wrapper">
            <label htmlFor="birthday">Birth Date</label>
            <DatePicker id="birthday" selected={birthDay} dateFormat="dd/MM/yyyy" dropdownMode="select"
              showMonthDropdown useShortMonthInDropdown showYearDropdown onChange={(date) => setBirthDay(date)} 
              placeholderText="select birth date" todayButton="Today" required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="startDate">Start Date</label>
            <DatePicker id="startDate" selected={startDate} dateFormat="dd/MM/yyyy" dropdownMode="select"
              showMonthDropdown useShortMonthInDropdown showYearDropdown onChange={(date) => setStartDate(date)} 
              placeholderText="select start date" todayButton="Today" required
            />
          </div>
        </div>
        <Input type="text" name="street" label="Street" value={street} setInput={setStreet} placeholder="street name" />
        <Input type="text" name="city" label="City" value={city} setInput={setCity} placeholder="city name" />
        <div className="input-wrapper">
          <label htmlFor="state">State</label>
          <Select aria-labelledby="state" id="state" className="select-input" defaultValue={selectedState} onChange={setSelectedState} options={statesOptions} placeholder="select state"/>
        </div>
        <Input type="number" name="zipcode" label="Zip code" value={zipCode} setInput={setZipCode} placeholder="zip code" />
        <div className="input-wrapper">
          <label htmlFor="department">Department</label>
          <Select aria-labelledby="department" id="department" className="select-input" defaultValue={selectedDepartment} setValue = {selectedDepartment} onChange={setSelectedDepartment} options={departmentOptions} placeholder="select department"/>
        </div>
        <div className="btn-container">
          <button type="submit" className="bg-dark">Save</button>
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
