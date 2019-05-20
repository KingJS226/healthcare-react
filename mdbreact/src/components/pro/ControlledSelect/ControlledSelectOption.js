import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const ControlledSelectOption = ({ checked, disabled, icon, multiple, selectOption, text, value }) => {
  const classes = classNames(disabled && "disabled", checked && "active");

  return (
    <li
      data-multiple={multiple}
      className={classes}
      onClick={() => selectOption(value)}
    >
      {icon && <img src={icon} alt="" className="rounded-circle" />}
      <span data-multiple={multiple} className="filtrable">
        {multiple && (
          <React.Fragment>
            <input
              type="checkbox"
              value={value}
              className="form-check-input"
              checked={checked}
              disabled={disabled}
              onChange={() => {}}
            />
            <label style={{ height: "10px" }} data-multiple={multiple} />
          </React.Fragment>
        )}
        {text ? text : value}
      </span>
    </li>
  );
}

ControlledSelectOption.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  multiple: PropTypes.bool,
  selectOption: PropTypes.func,
  text: PropTypes.string,
  value: PropTypes.string
};

export default ControlledSelectOption;
