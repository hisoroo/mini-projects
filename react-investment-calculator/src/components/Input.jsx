/* eslint-disable react/prop-types */
import "./Input.css";

export default function Input({ label, handleChange }) {
  return (
    <div className="input-wrapper">
        <label>{label}</label>
        <input type="number" onChange={handleChange}/>
    </div>
  );
}
