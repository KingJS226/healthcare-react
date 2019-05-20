import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

const DropdownMenuProComponent = props => {
  const {
    isOpen,
    d_tag,
    d_tabIndex,
    d_role,
    d_attributes,
    d_aria,
    d_classes,
    d_key,
    children
  } = props;
  const Tag = d_tag;

  return (
    <CSSTransition
      in={isOpen}
      appear={isOpen}
      classNames="popover"
      unmountOnExit
      timeout={{ enter: 300, exit: 300 }}
    >
      <Tag
        tabIndex={d_tabIndex}
        role={d_role}
        {...d_attributes}
        aria-hidden={d_aria}
        className={d_classes}
        key={d_key}
      >
        {children}
      </Tag>
    </CSSTransition>
  );
};

DropdownMenuProComponent.propTypes = {
  d_aria: PropTypes.bool.isRequired,
  d_attributes: PropTypes.object.isRequired,
  d_key: PropTypes.string.isRequired,
  d_role: PropTypes.string.isRequired,
  d_tabIndex: PropTypes.string.isRequired,
  d_tag: PropTypes.any.isRequired,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  d_classes: PropTypes.string
};

DropdownMenuProComponent.defaultProps = {
  d_classes: ""
};

export default DropdownMenuProComponent;
export { DropdownMenuProComponent as MDBDropdownMenuProComponent };
