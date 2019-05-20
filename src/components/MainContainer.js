import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse,   MDBNavItem, MDBFooter, MDBNavLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu,  MDBDropdownItem } from "mdbreact";
import Translator from '../components/translator';
import '../style.css';
import Routes from "../Routes";
import {removeState} from "../storage/storage";
import { withTranslation } from 'react-i18next';
import {Redirect} from 'react-router';
class App extends Component {

  state={
    collapseID: "",
    redirect: false
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  closeCollapse = collapseID => () =>
    this.state.collapseID === collapseID && this.setState({
          collapseID: ""
    });

  removeToken(event) {
      event.preventDefault();
      removeState("token");
      console.log(this.props);
      this.setState({
          redirect: true
      })
  }

  render() {
    const {t} = this.props;
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("mainNavbarCollapse")}
      />
    );

    const { collapseID } = this.state;
    if (this.state.redirect) {
       return <Redirect to="/"/>
    }
    return (
        <div className="flyout">
            <MDBNavbar className="flexible-MDBNavbar" color="info-color" dark expand="md" fixed="top" >
                <MDBNavbarBrand>
                    {/*<img src="linus_logo.png" alt=""/>*/}
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
                    <MDBNavbarNav left>
                        <MDBNavLink
                            exact
                            to="/patients"
                            onClick={this.closeCollapse("mainNavbarCollapse")}
                        >
                            {t('patients')}
                        </MDBNavLink>
                        <MDBNavItem>
                            <MDBNavLink
                                onClick={this.closeCollapse("mainNavbarCollapse")}
                                to="/anamnesis"
                            >
                                {t('anamnesis')}
                            </MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <Translator/>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem className="logout-item" onClick={(event) => this.removeToken(event)}>
                            {t('logout')}
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
          {collapseID && overlay}
          <main style={{ marginTop: "4rem" }}>
            <Routes />
          </main>
          <MDBFooter color="info-color-dark">
            <p className="footer-copyright mb-0 py-3 text-center">
              &copy; {new Date().getFullYear()} Copyright: <a href="https://www.MDBootstrap.com"> Werner </a>
            </p>
          </MDBFooter>
        </div>
    );
  }
}

export default withTranslation('common')(App);
