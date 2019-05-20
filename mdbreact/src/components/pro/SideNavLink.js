import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Waves from '../Waves';
import { NavLink as Link } from 'react-router-dom';

class SideNavLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursorPos: {}
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (!this.props.disabled) {
      // Waves - Get Cursor Position
      let cursorPos = {
        top: e.clientY,
        left: e.clientX,
        time: Date.now()
      };
      this.setState({ cursorPos: cursorPos });
      // do the passed in callback:
      if (this.props.onClick) {
        this.props.onClick(e);
      }
      e.stopPropagation();
    }
  }

  render() {
    const {
      tag: Tag,
      children,
      to,
      className,
      innerRef,
      topLevel,
      ...attributes
    } = this.props;

    const classes = classNames(
      'Ripple-parent',
      topLevel && 'collapsible-header',
      className
    );

    const sideNavLink = (
      <Link
        className={classes}
        ref={innerRef}
        onClick={this.handleClick}
        to={to}
        {...attributes}
      >
        {children}
        <Waves cursorPos={this.state.cursorPos} />
      </Link>
    );

    return topLevel ? <li> {sideNavLink}</li> : sideNavLink;
  }
}

SideNavLink.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  tag: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  className: PropTypes.string,
  topLevel: PropTypes.bool
};

SideNavLink.defaultProps = {
  to: '#',
  topLevel: false
};

export default SideNavLink;
export { SideNavLink as MDBSideNavLink };
