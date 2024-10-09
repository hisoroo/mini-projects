import { useState } from "react";
import "./App.css";
import Button from "./Components/Button.jsx";
import { evaluate } from "mathjs";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [subdisplay, setSubdisplay] = useState("");
  const [allClear, setAllClear] = useState(false);

  const operators = ["+", "-", "*", "/"];

  const handleClear = () => {
    setDisplay("0");
    setSubdisplay("");
    setAllClear(false);
  };

  const handleSingleClear = () => {
    display === "0" ? setAllClear(false) : setAllClear(true);
    setDisplay("0");
  };

  const handlePlusMinus = () => {
    if (display !== "0") {
      const newDisplay = (parseFloat(display) * -1).toString();
      setDisplay(newDisplay);
      setSubdisplay((prev) => prev.slice(0, -display.length) + newDisplay);
    }
  };

  const handlePercent = () => {
    if (display !== "0") {
      const newDisplay = (parseFloat(display) / 100).toString();
      setDisplay(newDisplay);
      setSubdisplay((prev) => prev.slice(0, -display.length) + newDisplay);
    }
  };

  const handleEquals = () => {
    try {
      const result = evaluate(subdisplay);
      setDisplay(result.toString());
      setSubdisplay(result.toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  const handleClick = (value) => {
    switch (value) {
      case "AC":
        handleClear();
        break;
      case "C":
        handleSingleClear();
        break;
      case "+/-":
        handlePlusMinus();
        break;
      case "%":
        handlePercent();
        break;
      case "=":
        handleEquals();
        break;
      default:
        if (operators.includes(value)) {
          setDisplay(value);
          setSubdisplay(subdisplay + value);
        } else {
          if (display === "0" || operators.includes(display)) {
            setDisplay(value);
          } else {
            setDisplay(display + value);
          }
          setSubdisplay(subdisplay + " " + value + " ");
        }
        break;
    }
  };

  const buttons = [
    { className: "clear", value: allClear ? "AC" : "C", label: allClear ? "AC" : "C" },
    { className: "plus-minus", value: "+/-", label: "+/-" },
    { className: "percent", value: "%", label: "%" },
    { className: "divide", value: "/", label: "÷" },
    { className: "seven", value: "7", label: "7" },
    { className: "eight", value: "8", label: "8" },
    { className: "nine", value: "9", label: "9" },
    { className: "multiply", value: "*", label: "×" },
    { className: "four", value: "4", label: "4" },
    { className: "five", value: "5", label: "5" },
    { className: "six", value: "6", label: "6" },
    { className: "subtract", value: "-", label: "-" },
    { className: "one", value: "1", label: "1" },
    { className: "two", value: "2", label: "2" },
    { className: "three", value: "3", label: "3" },
    { className: "add", value: "+", label: "+" },
    { className: "zero", value: "0", label: "0" },
    { className: "decimal", value: ".", label: "." },
    { className: "equals", value: "=", label: "=" },
  ];

  return (
    <div className="calculator">
      <div className="display">
        <div className="subdisplay">{subdisplay}</div>
        {display}
      </div>
      <div className="buttons">
        {buttons.map((btn) => (
          <Button
            key={btn.value}
            className={btn.className}
            value={btn.value}
            label={btn.label}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}
