import React from "react";
import PropTypes from "prop-types";

const ControlledSelectInput = ({ value }) => (
  <input type="text" readOnly value={value} className="select-dropdown" />
);

ControlledSelectInput.propTypes = {
  value: PropTypes.string
};

export default ControlledSelectInput;
