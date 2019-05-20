import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import ControlledSelectInput from "./ControlledSelect/ControlledSelectInput";
import ControlledSelectOptions from "./ControlledSelect/ControlledSelectOptions";
export const SelectContext = React.createContext();

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: [],
      selectTextContent: "",
      options: this.props.options || []
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.onClick);
    if (this.state.options.length) {
      this.renderPreselectedOptions();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectValue !== this.state.selectValue) {
      if (typeof this.props.getValue === "function") {
        this.props.getValue(this.state.selectValue);
      }

      if (typeof this.props.getTextContent === "function") {
        this.props.getTextContent(this.state.selectTextContent);
      }


    }

    if (this.props.options !== prevProps.options) {
      this.setState(
        {
          options: this.props.options
        },
        this.renderPreselectedOptions
      );
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onClick);
  }

  computeValuesAndText = (options) => {
    let checkedOptions = options
      .filter(option => option.checked)
      .map(option => ({
        value: option.value,
        text: option.text ? option.text : option.value
      }));

    let checkedValues = checkedOptions.map(opt => opt.value);
    let checkedTexts = checkedOptions.map(opt => opt.text ? opt.text : opt.value);

    return {
      selectValue: checkedValues,
      selectTextContent: (checkedTexts.length ? checkedTexts.join(", ") : this.props.selected),
      options
    };
  }

  renderPreselectedOptions = () => this.setState(prevState => this.computeValuesAndText([...prevState.options]));

  triggerOptionChange = (value, text) => {
    Array.isArray(text) && (text = text.join(", "));
    this.setState({
      selectValue: value,
      selectTextContent: text
    });
  };

  // close all select dropdown (unless it has multiple property or search input)
  // open nieghbour ul of clicked input
  onClick = e => {
    if (
      e.target.dataset.multiple === "true" ||
      e.target.dataset.search === "true"
    )
      return;
    this.closeDropdowns();
    e.target.nextElementSibling &&
      e.target.nextElementSibling.classList.add("fadeIn");
  };

  closeDropdowns = () => {
    let dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach(
      dropdown =>
        dropdown.classList.contains("fadeIn") &&
        dropdown.classList.remove("fadeIn")
    );
  };

  selectOneOption = value => {
    this.setState(prevState => {
      let options = [...prevState.options];
      const optionIndex = options.findIndex(option => option.value === value);
      options[optionIndex].checked = true;

      options.forEach(
        (option, index) =>
          index !== optionIndex ? (option.checked = false) : false
      );

      return {
        selectValue: [options[optionIndex].value],
        selectTextContent: options[optionIndex].text ? options[optionIndex].text : options[optionIndex].value,
        options
      };
    });
  };

  selectMultipleOptions = value => {
    this.setState(prevState => {
      let options = [...prevState.options];
      const optionIndex = options.findIndex(option => option.value === value);
      options[optionIndex].checked = !prevState.options[optionIndex].checked;

      return this.computeValuesAndText(options);
    });
  };

  selectOption = value => {
    if (this.props.multiple) {
      this.selectMultipleOptions(value);
    } else {
      this.selectOneOption(value);
    }
  };

  returnComponentContent = () => {
    const {
      className,
      color,
      children,
      getTextContent,
      getValue,
      multiple,
      search,
      searchLabel,
      searchId,
      selected,
      ...attributes
    } = this.props;

    const classes = classNames(
      "select-wrapper md-form",
      this.props.color ? "colorful-select dropdown-" + this.props.color : "",
      className
    );

    if (!this.props.children) {
      return (
        <div
          {...attributes}
          data-color={color}
          data-multiple={multiple}
          className={classes}
        >
          <span className="caret">▼</span>
          <ControlledSelectInput value={this.state.selectTextContent} />
          <ControlledSelectOptions
            multiple={multiple}
            options={this.state.options}
            search={search}
            searchLabel={searchLabel}
            selected={selected}
            selectOption={this.selectOption}
          />
        </div>
      );
    } else {
      return (
        <SelectContext.Provider
          value={{
            state: this.state,
            multiple: this.props.multiple,
            triggerOptionChange: this.triggerOptionChange
          }}
        >
          <div
            {...attributes}
            data-color={color}
            data-multiple={multiple}
            className={classes}
          >
            <span className="caret">▼</span>
            {children}
          </div>
        </SelectContext.Provider>
      );
    }
  };

  render() {
    return this.returnComponentContent();
  }
}

Select.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  getTextContent: PropTypes.func,
  getValue: PropTypes.func,
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
  searchId: PropTypes.string,
  selected: PropTypes.string
};

export default Select;
export { Select as MDBSelect };
