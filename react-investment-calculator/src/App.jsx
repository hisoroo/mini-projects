import './App.css'
import "./components/Header.jsx"
import Header from './components/Header.jsx'
import Input from './components/Input.jsx'
import Table from './components/Table.jsx'
import { useState } from 'react'


function App() {
  const [values, setValues] = useState({
    "Initial investment": 0,
    "Annual investment": 0,
    "Expected return": 0,
    "Duration": 0,
  })

  const handleChange = (e) => {
      const previousElement = e.target.previousElementSibling;
      if (previousElement) {
          const key = previousElement.innerText;
          const value = e.target.value;
          setValues((prevValues) => ({
              ...prevValues,
              [key]: value
          }));
      }
  };

  const inputs = [
    { label: "Initial investment", handleChange: handleChange },
    { label: "Annual investment", handleChange: handleChange },
    { label: "Expected return",  handleChange: handleChange },
    { label: "Duration", handleChange: handleChange },
  ];

  return (
    <div>
      <Header />
      <div className='inputContainer'>
        {inputs.map((input, index) => (
          <Input key={index} label={input.label} handleChange={input.handleChange} />
        ))}
      </div>
      <div>
        <Table data={values}/>
      </div>
    </div>
  )
}

export default App
