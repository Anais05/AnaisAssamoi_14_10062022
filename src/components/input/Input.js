import React from "react";
import PropTypes from 'prop-types';
import './Input.css';

export default function Input({
  type,
  name,
  label,
  value,
  setInput,
  placeholder,
}) {
  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} value={value} onChange={(e) => {setInput(e.target.value)}} placeholder={placeholder} required/>
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  setInput: PropTypes.func,
  placeholder: PropTypes.string,
};