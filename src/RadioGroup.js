import React from "react";
import PropTypes from "prop-types";

const RadioGroup = ({ label, name, options, inputRef }) => {
  return (
    <fieldset >
      <legend>{label}</legend>
      <div style = {{display:'flex',justifyContent: 'space-between' }}>
        {options.map(({ label: optionLabel, value }, index) => {
          return (
            <div key={index}>
              <input
                id={index}
                name={name}
                type="radio"
                value={value}
                ref={inputRef}
              />
              <label htmlFor={index}>
                <span style = {{marginLeft:'7px'}}>{optionLabel}</span>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};

RadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  )
};
export default RadioGroup;
