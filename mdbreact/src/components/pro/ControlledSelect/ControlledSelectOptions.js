import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Autocomplete from "../Autocomplete";
import ControlledSelectOption from "./ControlledSelectOption";

class ControlledSelectOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredOptions: this.props.options || [],
      options: this.props.options || [],
      searchValue: ""
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options !== this.props.options) {
      this.setState({
        filteredOptions: this.props.options,
        options: this.props.options
      });
    }
  }

  search = value => {
    const filteredOptions = this.state.options.filter(option =>
      option.value.toLowerCase().match(value.toLowerCase())
    );

    this.setState({ filteredOptions });
  };

  render() {
    const { multiple, options, search, searchLabel, searchId, selected, selectOption } = this.props;

    const classes = classNames(
      "dropdown-content",
      "select-dropdown",
      "fadeElement"
    );

    return (
      <ul className={classes}>
        {search && (
          <Autocomplete
            data={options}
            label={searchLabel}
            id={searchId}
            search={this.search}
            data-search="true"
          />
        )}
        <ControlledSelectOption
          checked={false}
          disabled={true}
          icon={null}
          value={selected}
        />
        {this.state.filteredOptions.map((option, index) => (
          <ControlledSelectOption
            key={`${option.value}-${index}`}
            checked={option.checked}
            disabled={option.disabled}
            multiple={multiple}
            icon={option.icon}
            value={option.value}
            selectOption={selectOption}
          />
        ))}
      </ul>
    );
  }
}

ControlledSelectOptions.propTypes = {
  selected: PropTypes.string.isRequired,
  selectOption: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool,
      disabled: PropTypes.bool,
      icon: PropTypes.string,
      text: PropTypes.string,
      value: PropTypes.string
    })
  ),
  search: PropTypes.bool,
  searchLabel: PropTypes.string,
  searchId: PropTypes.string
};

ControlledSelectOptions.defaultProps = {
  multiple: false,
  options: [],
  search: false,
  searchLabel: "Search",
  searchId: "selectSearchInput"
};

export default ControlledSelectOptions;
