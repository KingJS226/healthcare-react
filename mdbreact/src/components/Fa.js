import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class Fa extends React.Component {
  render() {
    const {
      border,
      brand,
      className,
      fab,
      fal,
      far,
      fixed,
      flip,
      icon,
      inverse,
      light,
      list,
      pull,
      pulse,
      regular,
      rotate,
      size,
      spin,
      stack,
      ...attributes
    } = this.props;

    const iconPrefix = (brand || fab) ? "fab" : (light || fal) ? "fal" : (regular || far) ? "far" : "fa";

    const classes = classNames(
      iconPrefix,
      list ? "fa-li" : false,
      icon ? `fa-${icon}` : false,
      size ? `fa-${size}` : false,
      fixed ? "fa-fw" : false,
      pull ? `fa-pull-${pull}` : false,
      border ? "fa-border" : false,
      spin ? "fa-spin" : false,
      pulse ? "fa-pulse" : false,
      rotate ? `fa-rotate-${rotate}` : false,
      flip ? `fa-flip-${flip}` : false,
      inverse ? "fa-inverse" : false,
      stack ? `fa-${stack}` : false,
      className
    );

    return <i {...attributes} className={classes} />;
  }
}

Fa.propTypes = {
  icon: PropTypes.string.isRequired,
  border: PropTypes.bool,
  brand: PropTypes.bool,
  className: PropTypes.string,
  fab: PropTypes.bool,
  fal: PropTypes.bool,
  far: PropTypes.bool,
  fixed: PropTypes.bool,
  flip: PropTypes.string,
  inverse: PropTypes.string,
  light: PropTypes.bool,
  list: PropTypes.bool,
  pull: PropTypes.string,
  pulse: PropTypes.bool,
  regular: PropTypes.bool,
  rotate: PropTypes.string,
  spin: PropTypes.bool,
  size: PropTypes.string,
  stack: PropTypes.string
};

Fa.defaultProps = {
  border: false,
  brand: false,
  className: "",
  fab: false,
  fal: false,
  far: false,
  fixed: false,
  flip: "", 
  inverse: "",
  light: false,
  list: false,
  pull: "",
  pulse: false,
  regular: false,
  rotate: "",
  spin: false,
  size: "",
  stack: ""
}

export default Fa;
export { Fa as MDBIcon };
