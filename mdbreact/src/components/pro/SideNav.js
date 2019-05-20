import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import "../Transitions.css";
import Waves from "../Waves";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      showOverlay: false,
      cursorPos: {}
    };
  }

  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.triggerOpening !== this.props.triggerOpening) {
      this.setState({
        isOpen: !this.state.isOpen,
        showOverlay: !this.state.showOverlay
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate = () => {
    if (!this.props.hidden) {
      this.setState({ isOpen: window.innerWidth > this.props.breakWidth });
    }
  };

  handleOverlayClick = () => {
    this.setState({
      isOpen: false,
      showOverlay: false
    });
    if (this.props.onOverlayClick) {
      this.props.onOverlayClick();
    }
  };

  handleClick = e => {
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
    }
    e.stopPropagation();
  };

  render() {
    const {
      bg,
      breakWidth,
      children,
      className,
      hidden,
      href,
      logo,
      mask,
      onOverlayClick,
      right,
      triggerOpening,
      tag: Tag,
      ...attributes
    } = this.props;

    let { isOpen, showOverlay } = this.state;

    const classes = classNames(
      "side-nav",
      right && "right-aligned",
      className
    );

    const overlay = (
      <div
        id="sidenav-overlay"
        onClick={this.handleOverlayClick}
      />
    );

    const sidenav = (
      <Tag
        {...attributes}
        className={classes}
        style={{ backgroundImage: `url(${bg}` }}
      >
        <ul className="custom-scrollbar list-unstyled">
          {logo && (
            <li>
              <div className="logo-wrapper">
                <a
                  href={href}
                  className="Ripple-parent"
                  onClick={this.handleClick}
                >
                  <img
                    src={logo}
                    alt=""
                    className="img-fluid flex-center d-block"
                  />
                  <Waves cursorPos={this.state.cursorPos} />
                </a>
              </div>
            </li>
          )}
          {children}
        </ul>
        {mask && <div className={`sidenav-bg mask-${mask}`} />}
      </Tag>
    );

    return (
      <div>
        <CSSTransition
          timeout={{ enter: 300, exit: 300 }}
          classNames={right ? "right-side-slide" : "side-slide"}
          in={isOpen}
        >
          {sidenav}
        </CSSTransition>
        {showOverlay && isOpen && overlay}
      </div>
    );
  }
}

SideNav.propTypes = {
  bg: PropTypes.string,
  breakWidth: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  hidden: PropTypes.bool,
  href: PropTypes.string,
  logo: PropTypes.string,
  mask: PropTypes.string,
  onOverlayClick: PropTypes.func,
  right: PropTypes.bool,
  triggerOpening: PropTypes.bool,
  tag: PropTypes.string
};

SideNav.defaultProps = {
  bg: '',
  breakWidth: 1400,
  className: '',
  hidden: false,
  href: "#",
  logo: '',
  mask: '',
  onOverlayClick: () => { },
  right: false,
  triggerOpening: false,
  tag: "div"
};

export default SideNav;
export { SideNav as MDBSideNav };
