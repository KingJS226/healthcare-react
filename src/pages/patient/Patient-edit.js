import React, {Component} from "react";
import { MDBCardGroup, MDBDatePicker, MDBCardBody, MDBCardHeader, MDBCard, MDBFormInline, MDBInput, MDBBtn, MDBContainer } from "mdbreact";
import "../../assets/css/patienteditor.css"
import { withTranslation } from 'react-i18next';
import BaseApi from "../../api/BaseApi";
import PatientApi from "../../api/PatientApi";
import {loadState} from "../../storage/storage";
import {Redirect} from 'react-router';
class PatientEdit extends Component{
  constructor(props) {
    super(props);
    this.state = {
        firstname: "",
        surname: "",
        radio: 0,
        date: new Date(this.props.location.patient.birthday),
        redirect: false,
        isLogin: true
    };


  }

  componentWillMount() {
      const token1 = loadState('token');
      if (token1) {
          BaseApi.authToken=token1;
      } else {
          this.setState({
              isLogin: false
          })
      }

  }

  componentDidMount() {
        console.log(new Date(this.props.location.patient.birthday));
        let patient = this.props.location.patient;
        if (patient.gender === "female") {
          this.setState({
              radio: 1
          })
        }
        this.setState({
            firstname: patient.firstName,
            surname: patient.surName,
            date: new Date(patient.birthday)
        })

    }

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
        let gender = "male";
        if (this.state.radio === 1) {
            gender = "female";
        }
        let patient = {
            firstName: this.state.firstname,
            surName: this.state.surname,
            birthday: this.state.date,
            gender: gender,
            doctorID: loadState('doctorID')
        }

        PatientApi.update(patient, this.props.location.patient.id).then((res) => {
            console.log(res.data);
            this.setState({
                redirect: true
            })
        })
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    };

    onClick = nr => () =>{
        this.setState({
            radio: nr
        });
        console.log(nr);
    };

    getPickerValue = (value) => {
        console.log(value);
        this.setState({
            date: value
        })
    }

  render() {
      const {t} = this.props;
      if (this.state.redirect) {
          return <Redirect to="/patients"/>
      } else if(!this.state.isLogin) {
          return <Redirect to="/"/>
      }
      return (
          <MDBContainer className="mt-3 text-center">
              <MDBCardGroup deck className="mt-3">

                  <MDBCard>
                      <MDBCardHeader>
                          <h3>{t('profile')}</h3>
                      </MDBCardHeader>
                      <MDBCardBody>

                          <form  className="needs-validation"
                                 onSubmit={this.submitHandler}
                                 noValidate>
                              <div className="form-group profile-form">
                                  <MDBInput label={t('firstname')} value={this.state.firstname} size="md" name="firstname" onChange={this.changeHandler} required/>
                                  <MDBInput label={t('surname')} value={this.state.surname} name="surname" onChange={this.changeHandler} required/>
                                  <MDBFormInline>
                                      <MDBDatePicker name="date" openToYearSelection format='YYYY-MM-DD'  value={this.state.date} getValue={this.getPickerValue} />

                                      <MDBInput onClick={this.onClick(0)} checked={this.state.radio === 0} label={t('male')}
                                                type="radio" id="radio1" />
                                      <MDBInput onClick={this.onClick(1)} checked={this.state.radio === 1} label={t('female')}
                                                type="radio" id="radio2" />
                                  </MDBFormInline>

                                  <MDBBtn type="submit" color="success" size="md">
                                      {t('submit')}
                                  </MDBBtn>
                              </div>
                          </form>
                      </MDBCardBody>
                  </MDBCard>
              </MDBCardGroup>
          </MDBContainer>
      )
  }

}

export default withTranslation('common') (PatientEdit);
