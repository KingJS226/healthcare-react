import React from "react";
import classNames from "classnames";
import Tooltip from "../Tooltip";
import Waves from "../Waves";

class Step extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorPos: {}
    };
  }

  handleClick(e) {
    // Get Cursor Position
    e.preventDefault();
    let cursorPos = {
      top: e.clientY,
      left: e.clientX,
      time: Date.now()
    };
    this.setState({ cursorPos: cursorPos });
  }

  render() {
    const { tag: Tag, form, icon, stepName, vertical } = this.props;

    const iconClass = classNames("fa fa-" + icon, "Ripple-parent");

    const stepClass = classNames(
      form
        ? "steps-step"
        : icon && vertical
          ? "steps-step-3"
          : icon && !vertical
            ? "steps-step-2"
            : null,
      this.props.className
    );

    let step;
    if (form) {
      step = <Tag className={stepClass}>{this.props.children}</Tag>;
    } else if (icon && !vertical) {
      step = (
        <Tag className={stepClass} onClick={this.props.onClick}>
          <Tooltip
            placement="top"
            componentClass="btn btn-circle-2 btn-blue-grey waves-effect"
            tag="a"
            type="button"
            component="div"
            tooltipContent={stepName}
          >
            <i
              className={iconClass}
              onTouchStart={this.handleClick.bind(this)}
              onMouseDown={this.handleClick.bind(this)}
            />
            <Waves cursorPos={this.state.cursorPos} dark />
          </Tooltip>
        </Tag>
      );
    } else if (icon && vertical) {
      step = (
        <Tag className={stepClass} onClick={this.props.onClick}>
          <Tooltip
            placement="top"
            componentClass="btn btn-circle-3 btn-blue-grey waves-effect"
            tag="a"
            type="button"
            component="div"
            tooltipContent={stepName}
          >
            <i
              className={iconClass}
              onTouchStart={this.handleClick.bind(this)}
              onMouseDown={this.handleClick.bind(this)}
            />
            <Waves cursorPos={this.state.cursorPos} dark />
          </Tooltip>
        </Tag>
      );
    } else {
      step = <li className={stepClass}>{this.props.children}</li>;
    }

    return step;
  }
}

Step.defaultProps = {
  tag: "div",
  form: false,
  vertical: false
};

export default Step;
export { Step as MDBStep };
