import React from "react";

import "./form-input.styles.css";

const FormInput = ({ dollar, percent, day, ...otherprops }) => {
  return (
    <div className="form-field">
      {percent && (
        <input
          type="number"
          className="nft-pledge-field nft-pledge-field-pad-right"
          {...otherprops}
        />
      )}
      {day && (
        <input
          type="number"
          className="nft-pledge-field nft-pledge-field-pad-right"
          {...otherprops}
        />
      )}
      {dollar && (
        <input
          type="number"
          className="nft-pledge-field nft-pledge-field-pad-left"
          {...otherprops}
        />
      )}
      <div className="form-field-icons">
        {dollar && <div className="form-field-icons-left">$</div>}
        {percent && <div className="form-field-icons-right">%</div>}
        {day && <div className="form-field-icons-right">day</div>}
      </div>
    </div>
  );
};

export default FormInput;
