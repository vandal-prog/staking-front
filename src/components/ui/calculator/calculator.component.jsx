import React, { useState } from "react";

import FormInput from "../forminput/form-input.component";

import "./calculator.styles.css";

const Calculator = () => {
  const [formData, setFormData] = useState({
    amountInvested: "",
    yieldPercent: "",
    days: "",
  });

  const [hasSubmitted, sethasSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    sethasSubmitted(false);
  };

  let result;
  const calculateResult = (formData) => {
    const { amountInvested, yieldPercent, days } = formData;
    result =
      Number(amountInvested) +
      ((Number(amountInvested) * Number(yieldPercent)) / 100) * Number(days);
    return result;
  };

  const newResult = result;

  return (
    <div className="calculator">
      <div>
        <span className="calculator-text">AmountInvested</span>
        <FormInput name="amountInvested" onChange={handleChange} dollar />
      </div>
      <div>
        <span className="calculator-text">Yield</span>
        <FormInput name="yieldPercent" onChange={handleChange} percent />
      </div>
      <div>
        <span className="calculator-text">Lasts days</span>
        <FormInput name="days" onChange={handleChange} day />
      </div>
      <button
        type="button"
        className="calculator-btn"
        onClick={() => {
          calculateResult(formData);
          sethasSubmitted(true);
        }}
      >
        Calculate
      </button>
      <div>
        <span className="calculator-text">Total return</span>
        <FormInput
          dollar
          readonly
          name="totalReturn"
          onKeyPress={(e) => {
            e.preventDefault();
          }}
          value={hasSubmitted && calculateResult(formData)}
        />
      </div>
    </div>
  );
};

export default Calculator;
