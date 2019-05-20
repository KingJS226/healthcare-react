import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import Autosuggest from "react-autosuggest";
import Fa from "../Fa";

const theme = {
  container: "md-form",
  containerOpen: "react-autosuggest__container--open",
  input: "mdb-autocomplete form-control",
  inputOpen: "react-autosuggest__input--open",
  inputFocused: "react-autosuggest__input--focused",
  suggestionsContainer: "react-autosuggest__suggestions-container",
  suggestionsContainerOpen: "react-autosuggest__suggestions-container--open",
  suggestionsList: "mdb-autocomplete-wrap",
  suggestion: "react-autosuggest__suggestion",
  suggestionFirst: "react-autosuggest__suggestion--first",
  suggestionHighlighted: "react-autosuggest__suggestion--highlighted",
  sectionContainer: "react-autosuggest__section-container",
  sectionContainerFirst: "react-autosuggest__section-container--first",
  sectionTitle: "react-autosuggest__section-title"
};

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      suggestions: [],
      isTouched: false
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.blurCallback = this.blurCallback.bind(this);
    this.triggerFocus = this.triggerFocus.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  onSuggestionsFetchRequested = ({ value }) => {
    if (this.props.search) {
      return;
    }
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  getSuggestions = value => {
    const inputValue = value.toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : this.props.data.filter(data => data.toLowerCase().includes(inputValue));
  };

  getSuggestionValue = suggestion => {
    if (this.props.getValue) {
      this.props.getValue(suggestion);
    }
    return suggestion;
  };

  renderSuggestion = suggestion => <div>{suggestion}</div>;

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
    if (this.props.search) {
      this.props.search(
        newValue,
        ReactDOM.findDOMNode(this).parentNode.parentNode.querySelectorAll("li")
      );
    }
  };

  onClick(ev) {
    this.setState({ isTouched: true });
  }

  blurCallback(ev) {
    this.setState({ isTouched: false });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleClear() {
    this.setState({
      value: ""
    });
  }

  triggerFocus() {
    const input = document.getElementById(this.props.id);
    input.focus();
  }

  render() {
    const { value, suggestions } = this.state;

    const {
      className,
      clear,
      clearClass,
      data,
      disabled,
      getValue,
      id,
      label,
      labelClass,
      icon,
      iconBrand,
      iconClass,
      iconLight,
      iconRegular,
      iconSize,
      placeholder,
      search,
      ...attributes
    } = this.props;

    if (disabled) {
      attributes.disabled = true;
    }

    // needed for rendering custom input
    const inputProps = {
      placeholder: placeholder,
      value,
      onChange: this.onChange,
      onBlur: this.blurCallback,
      onClick: this.onClick,
      onFocus: this.onFocus,
      id: this.props.id
    };

    // the main variable for classFixes
    let isNotEmpty =
      Boolean(this.state.value) || placeholder || this.state.isTouched;

    // classFixes:
    const labelClassFix = classNames(
      isNotEmpty && "active",
      disabled && "disabled",
      labelClass
    );

    const iconClassFix = classNames(
      "prefix",
      this.state.isTouched && "active",
      iconClass
    );

    const clearClassFix = classNames(clearClass);

    const isclearVisible = () => {
      let hiddenOrNot = "hidden";
      if (this.state.value) {
        hiddenOrNot = "visible";
      }
      return hiddenOrNot;
    };

    const clearStyleFix = {
      position: "absolute",
      zIndex: 2,
      top: ".85rem",
      right: 0,
      border: "none",
      background: "0 0",
      visibility: isclearVisible()
    };

    const renderInputComponent = inputProps => (
      <div>
        {
          icon &&
          <Fa
            icon={icon}
            size={iconSize}
            brand={iconBrand}
            light={iconLight}
            regular={iconRegular}
            className={iconClassFix}
          />
        }
        <input
          type="text"
          id={id}
          className="form-control"
          {...inputProps}
          {...attributes}
          onFocus={(ev, val) => {
            this.onClick();
            inputProps.onFocus(ev, val);
          }}
        />
        <label
          htmlFor={id}
          id={`label for ${id}`}
          onClick={this.triggerFocus}
          className={labelClassFix}
        >
          {label}
        </label>
        {clear && (
          <Fa
            icon="close"
            onClick={this.handleClear}
            style={clearStyleFix}
            className={clearClassFix}
          />
        )}
      </div>
    );

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestions={this.getSuggestions}
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionSelected={this.blurCallback}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        onChange={this.onChange}
        theme={theme}
        renderInputComponent={renderInputComponent}
        focusInputOnSuggestionClick={false}
        {...attributes}
      />
    );
  }
}

Autocomplete.propTypes = {
  className: PropTypes.string,
  clear: PropTypes.bool,
  clearClass: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string),
  disabled: PropTypes.bool,
  getValue: PropTypes.func,
  id: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  labelClass: PropTypes.string,
  icon: PropTypes.string,
  iconBrand: PropTypes.bool,
  iconClass: PropTypes.string,
  iconLight: PropTypes.bool,
  iconRegular: PropTypes.bool,
  iconSize: PropTypes.string,
  placeholder: PropTypes.string,
  search: PropTypes.func
};

Autocomplete.defaultProps = {
  className: "",
  clear: false,
  clearClass: "",
  data: [],
  disabled: false,
  getValue: () => {},
  id: "",
  label: "",
  labelClass: "",
  icon: "",
  iconBrand: false,
  iconClass: "",
  iconLight: false,
  iconRegular: false,
  iconSize: "",
  placeholder: ""
};

export default Autocomplete;
export { Autocomplete as MDBAutocomplete };
