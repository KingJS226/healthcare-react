import React from "react";
import { Manager, Target, Popper, Arrow } from "react-popper";
import PropTypes from "prop-types";
import classNames from "classnames";

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.setVisibility = this.setVisibility.bind(this);
  }

  show() {
    this.setVisibility(true);
  }

  hide() {
    this.setVisibility(false);
  }

  setVisibility(visible) {
    this.setState(
      Object.assign({}, this.state, {
        visible
      })
    );
  }

  render() {
    const {
      placement,
      component,
      componentStyle,
      className,
      children,
      tooltipContent,
      tooltipClass,
      arrowClass,
      componentTooltip,
      componentClass,
      wrapperStyle,
      tag
    } = this.props;

    const classes = classNames(className);

    const componentClasses = classNames(componentClass);

    const tooltipClasses = classNames(
      "tooltip fade",
      placement ? "bs-tooltip-" + placement : "",
      this.state.visible ? "show" : "",
      tooltipClass
    );

    const wrapperStyles = wrapperStyle ? wrapperStyle: {};

    const arrowClasses = classNames("arrow", arrowClass);
    return (
      <Manager tag={tag} className={classes} style={wrapperStyles}>
        <Target
          component={component}
          style={componentStyle}
          className={componentClasses}
          onMouseEnter={this.show}
          onMouseLeave={this.hide}
          onTouchStart={this.show}
          onTouchEnd={this.hide}
        >
          {children}
        </Target>
        {
          this.state.visible &&
          <Popper placement={placement} component={componentTooltip}>
            {({ popperProps }) => (
              <div {...popperProps} className={tooltipClasses}>
                <div className="tooltip-inner">{tooltipContent}</div>
                <Arrow>
                  {({ arrowProps }) => (
                    <span {...arrowProps} className={arrowClasses} />
                  )}
                </Arrow>
              </div>
            )}
          </Popper>
        }
      </Manager>
    );
  }
}

Tooltip.propTypes = {
  placement: PropTypes.string,
  component: PropTypes.string,
  componentStyle: PropTypes.string,
  tooltipContent: PropTypes.string,
  tooltipClass: PropTypes.string,
  arrowClass: PropTypes.string,
  componentTooltip: PropTypes.string,
  componentClass: PropTypes.string,
  children: PropTypes.node,
  tag: PropTypes.string,
  className: PropTypes.string,
  wrapperStyle: PropTypes.object
};
export default Tooltip;
export { Tooltip as MDBTooltip };
