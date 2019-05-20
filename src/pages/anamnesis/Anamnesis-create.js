import React, {Component} from "react";
import {  MDBListGroup, MDBSelect, ToastContainer, toast, MDBInput, MDBListGroupItem, MDBCard, MDBRow, MDBCol, MDBCardHeader, MDBCardBody, MDBBtn, MDBContainer } from "mdbreact";
import { withTranslation } from 'react-i18next';

import {Redirect} from 'react-router';
import BaseApi from "../../api/BaseApi";
import {loadState} from "../../storage/storage";
import QuestionnaireApi from "../../api/QuestionnaireApi";
import QuestionApi from "../../api/QuestionApi";
import PatientApi from "../../api/PatientApi";
import "../../assets/css/anamnesis.css"
import AnamnesisApi from "../../api/AnamnesisApi";
import AnswerApi from "../../api/AnswerApi";
import Relevant from "../component/select-relevant";
import FreeAnswer from "../component/free-answer";
import ScaleAnswer from "../component/scale-answer";
import SelectAnswer from "../component/select-answer";
import Graph from "../component/Graph";
class AnamnesisCreate extends Component{
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toDateString(),
      redirect: false,
      isLogin: true,
      questionnaire: {},
      questions: [],
      patientID: "",
      options: [],
      title: "",
      patients: [],
      answers: []
    };
    this.save = this.save.bind(this);

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
      console.log(this.props);
      QuestionnaireApi.getByDoctor(loadState('doctorName')).then((res) => {
          if (res.data) {
              console.log('questionnaire', res.data)
              this.setState({
                  questionnaire: res.data
              }, this.getQuestions)
          }
      });

      PatientApi.getByDoctor(loadState('doctorName')).then((res) => {
          console.log("patients", res.data);
          if (res.data) {
              let patients = [];
              res.data.map((patient) => {
                      patients.push({
                          checked: false,
                          disabled: false,
                          icon: null,
                          text: patient.firstName+" "+patient.surName,
                          value: patient.firstName+" "+patient.surName+" "+patient.id
                      })
              });

              if (patients.length > 0) {
                  patients[0].checked = true;
              }

              this.setState({
                  options: patients,
                  patients: res.data
              })
          }
      });

  }

  handleSelectDoctor(value) {
        this.setState({
            patientID: value[0]
        });
  }

  getQuestions() {
      QuestionApi.getByQuestionnaireID(this.state.questionnaire.name).then((res) => {
          if (res.data) {

             this.setState({
                 questions: res.data
             }, this.initAnswer)
          }
      })
  }

  initAnswer() {
         let answers = [];
         this.state.questions.map(question => {
             answers.push({
                 responseType: question.type,
                 question: question.sequence,
                 answer: "",
                 relevant: 0
             })
         });
         this.setState({
             answers: answers
         });
         console.log("questions", answers);

  }

  changeAnswer = (index, answer) => {
      console.log("answer >>>>>>>>>>>>>>>>>>>>",answer);
        let tempAnswers = this.state.answers.slice();
        tempAnswers[index].answer = answer;
        this.setState({
            answers: tempAnswers
        })
    };

  changeRelevant = (index, relevant) => {
      console.log(index, relevant);
        let tempAnswers = this.state.answers.slice();
        tempAnswers[index].relevant = relevant;
        this.setState({
            answers: tempAnswers
        })
    };

  handleEvent(event) {
      this.setState({
          [event.target.name]: event.target.value
      })
  }

  saveAnswers(id) {
      let tempAnswers = this.state.answers.slice();
      tempAnswers.map(answer => {
          answer.anamnesiseId = id;
      });
      this.setState({
          answers: tempAnswers
      }, () => {
          AnswerApi.create(this.state.answers).then(res => {
              console.log(res);
              this.setState({
                  redirect: true
              })
          })
      })
    }

  save() {
      let patientID = 1;

      this.state.patients.map(patient => {
          if (this.state.patientID !== undefined && patient.id == this.state.patientID.split(" ")[2])  {
              patientID = patient.id;
          }
      });
      if (this.state.title === "") {
          toast.warn('Please insert anamnesis title');
          return;
      }
      if (!this.state.patientID) {
          toast.warn('You didn\'t select the patient, Select or Create Patient.');
          return;
      } else {
          AnamnesisApi.create({patientId: patientID, title: this.state.title, status: "pending"}).then((res) => {
              console.log('token', res.data.id);
              if (res.data) {
                  this.saveAnswers(res.data.id)
              }

          }).catch(err => {
              console.log(err);
              toast.error('Creating is failed');
          })
      }

  }

  render() {
      const {t}=this.props;
      if(this.state.redirect){
          return(
              <Redirect to={"/anamnesis"} />
          )
      } else if (!this.state.isLogin) {
          return <Redirect to="/"/>
      }
      return <div id="profile-v2" className="mb-5">
          <ToastContainer
              hideProgressBar={true}
              newestOnTop={true}
              autoClose={5000}
          />
          <MDBContainer className="mt-5 text-center" fluid>
              <MDBRow center>
                  <MDBCol lg="6" className="mb-6">
                      <MDBCard narrow>
                          <MDBCardHeader>
                              <h3>{t('anamnesis')}</h3>
                          </MDBCardHeader>
                          <MDBCardBody>
                              <MDBRow className="d-flex align-items-center mb-3 example-parent justify-content-between">
                                  <MDBInput label="Title" type="text" name="title" value={this.state.title} onChange={(event) => this.handleEvent(event)}/>
                                  <MDBSelect
                                      color="primary"
                                      getValue={(value) => this.handleSelectDoctor(value)}
                                      className="w-25 p-3 select-doctor"
                                      options={this.state.options}
                                      selected="Choose Patient"/>
                                  <MDBBtn color="pink" size="md" className="right-button"
                                          onClick={() => this.save()} disabled={this.state.patients < 1}>{t('save')}</MDBBtn>
                              </MDBRow>

                              <MDBListGroup className="scrollbar scrollbar-primary  mt-5">
                                      {this.state.answers.map(answer => {
                                          let index = this.state.answers.indexOf(answer);
                                          return <MDBListGroupItem key={index}>
                                              <MDBRow>
                                                  <MDBCol lg="10" className="mb-10">
                                                      <div>
                                                          <h5 className="w-auto  mx-auto p-3  text-left">{index+1+". "+answer.question}</h5>
                                                      </div>
                                                      {answer.responseType === 1&&<FreeAnswer onChangeAnswer={(answer) => this.changeAnswer(index, answer)}/>}
                                                      {answer.responseType === 2&&<ScaleAnswer onChangeAnswer={(answer) => this.changeAnswer(index, answer)}/>}
                                                      {answer.responseType === 3&&<SelectAnswer keyIndex={index} onChangeAnswer={(answer) => this.changeAnswer(index, answer)}/>}
                                                      {answer.responseType === 4&&<Graph onChangeAnswer={(answer) => this.changeAnswer(index, answer)}/>}
                                                  </MDBCol>
                                                  <MDBCol lg="2" className="mb-2 " >
                                                      {this.state.answers.indexOf(answer)===0&&<small>Relevant</small>}
                                                      <Relevant keyIndex={index} onChangeRelevant={(relevant) => this.changeRelevant(index, relevant)}/>
                                                  </MDBCol>
                                              </MDBRow>
                                          </MDBListGroupItem>
                                      })}
                                  </MDBListGroup>

                          </MDBCardBody>
                        </MDBCard>
                  </MDBCol>
              </MDBRow>
          </MDBContainer>
      </div>;
  }

}

export default withTranslation('common') (AnamnesisCreate);
