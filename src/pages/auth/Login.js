import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBMask,
  MDBInput,
  MDBView,
  MDBBtn,
  MDBNavbarNav,
  MDBNavbar
} from 'mdbreact';
import "../../assets/css/Login.css";
import Translator from '../../components/translator';
import { withTranslation } from 'react-i18next';
import { saveState } from "../../storage/storage";
import {Redirect} from 'react-router';
import ApiAuth from "../../api/ApiAuth";
class Login extends React.Component {
    state = {
        collapseID: "",
        name: "Mark",
        password: "Otto",
        redirect: false

    };


    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
        console.log("params", this.state.name, this.state.password);
        const userData = {
            name: this.state.name,
            password: this.state.password,
            role: 'admin'};
        ApiAuth.login(userData).then((res) => {
            console.log('token', res);
            saveState('token', res.data['accessToken']);
            saveState('doctorID', res.data['id']);
            saveState('doctorName', res.data['name']);
            this.setState({
                redirect: true
            });
        }).catch(err => {
            console.log(err);
        })

    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

    componentDidMount() {
        console.log("path", this.props);
    }

  render() {
      const { t } = this.props;

    if(this.state.redirect){
        return(
            <Redirect to={"/patients"} />
        )
    }
    return (
      <div className="classic-form-page" id="login">
          <MDBNavbar className="flexible-MDBNavbar" light expand="md" scrolling fixed="top" style={{zIndex: 3}}>
              <MDBNavbarNav expand="sm" right style={{flexDirection: 'row'}}>
                  <Translator/>
              </MDBNavbarNav>
          </MDBNavbar>
        <MDBView>

          <MDBMask
            className="d-flex justify-content-center align-items-center"
            overlay="stylish-strong">

         <MDBContainer>
                <form
                    className="needs-validation"
                    onSubmit={this.submitHandler}
                    noValidate>
              <MDBRow>
                <MDBCol md="10" lg="6" xl="5" sm="12"  className="mt-5 mx-auto" >
                  <MDBCard >
                    <MDBCardBody>
                      <MDBInput type="text" label={t('name')} icon="user"
                                value={this.state.fname}
                                name="name"
                                onChange={this.changeHandler}
                                id="defaultFormRegisterNameEx"
                                className="form-control"
                                placeholder={t('name')}
                                required
                                iconClass="white-text" />
                      <MDBInput type="password"
                                label={t('password')}
                                icon="lock"
                                iconClass="white-text"
                                value={this.state.zip}
                                onChange={this.changeHandler}
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="password"
                                required/>
                      <div className="text-center mt-3 black-text">
                       <MDBBtn type="submit" className="purple-gradient" size="lg">{ t('signin') }</MDBBtn>
                        {/*<hr />*/}
                      </div>
                    </MDBCardBody>

                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </form>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    )
  }
}

export default withTranslation('common') (Login);