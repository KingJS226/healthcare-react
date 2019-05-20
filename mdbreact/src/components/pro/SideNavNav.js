import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

class SideNavNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: null
    };
  }

  onClick = number => () => {
    let state = "";
    if (this.state.accordion !== number) {
      state = number;
    } else {
      state = null;
    }
    this.setState({
      accordion: state
    });
  };

  render() {
    const { tag: Tag, children, className, ...attributes } = this.props;

    const { accordion } = this.state;

    const classes = classNames(
      "collapsible",
      "collapsible-accordion",
      className
    );

    const modified = React.Children.map(this.props.children, (child, i) => {
      if (child.type.displayName === "SideNavCat") {
        return React.cloneElement(child, {
          onClick: this.onClick(i),
          isOpen: accordion === i
        });
      } else {
        return child;
      }
    });

    return (
      <li>
        <Tag {...attributes} className={classes}>
          {modified}
        </Tag>
      </li>
    );
  }
}

SideNavNav.propTypes = {
  children: PropTypes.node,
  tag: PropTypes.string,
  className: PropTypes.string
};

SideNavNav.defaultProps = {
  tag: "ul"
};

export default SideNavNav;
export { SideNavNav as MDBSideNavNav };
