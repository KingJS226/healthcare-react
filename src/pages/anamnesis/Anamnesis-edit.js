import React, {Component} from "react";
import { MDBRow, MDBCardBody, MDBSelect, MDBCardHeader, MDBInput, ToastContainer, toast, MDBListGroup, MDBCard, MDBCol, MDBListGroupItem, MDBBtn, MDBContainer } from "mdbreact";
import "../../assets/css/patienteditor.css"
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
class AnamnesisEdit extends Component{
  constructor(props) {
    super(props);
      this.state = {
          redirect: false,
          isLogin: true,
          questionnaire: {},
          progress: 0,
          questions: [],
          patientID: "",
          title: "",
          options: [],
          patients: [],
          answers: [],
          tempAnswers: [],
          isSpinner: false
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
        this.setState({
            title: this.props.location.anamnesis.title
        });

        QuestionnaireApi.getByDoctor(loadState('doctorName')).then((res) => {
            if (res.data) {
                console.log('questionnaire', res.data);
                this.setState({
                    questionnaire: res.data
                }, this.getQuestions)
            }
        });

      PatientApi.getByDoctor(loadState('doctorName')).then((res) => {
          if (res.data) {
              let patients = [];
              res.data.map((patient) => {
                  if (!patient.anamnesise) {
                      if (patient.id === this.props.location.anamnesis.patientId) {
                          this.setState({
                              patientID: patient.firstName+" "+patient.surName+" "+patient.id
                          });
                          patients.push({
                              checked: true,
                              disabled: false,
                              icon: null,
                              text: patient.firstName+" "+patient.surName,
                              value: patient.firstName+" "+patient.surName+" "+patient.id
                          })
                      } else {
                          patients.push({
                              checked: false,
                              disabled: false,
                              icon: null,
                              text: patient.firstName+" "+patient.surName,
                              value: patient.firstName+" "+patient.surName+" "+patient.id
                          })
                      }


                  }
              });


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
        AnswerApi.getByAnamnesis(this.props.location.anamnesis.id).then(res => {
            res.data.map(answer => {
               answers.push({
                   id: answer.id,
                   responseType: answer.responseType,
                   question: answer.question,
                   answer: answer.answer,
                   anamnesiseId: answer.anamnesiseId,
                   relevant: answer.relevant
               });
               this.state.tempAnswers.push({
                   id: answer.id,
                   responseType: answer.responseType,
                   question: answer.question,
                   answer: answer.answer,
                   anamnesiseId: answer.anamnesiseId,
                   relevant: answer.relevant
               })
            });
            this.setState({
                answers: answers
            })
        });

    }

    changeAnswer = (index, answer) => {
        console.log(answer);
        let tempAnswers = this.state.answers.slice();
        tempAnswers[index].answer = answer;
        this.setState({
            answers: tempAnswers
        })
    };

    changeRelevant = (index, relevant) => {
        console.log(relevant);
        let tempAnswers1 = this.state.answers.slice();
        tempAnswers1[index].relevant = relevant;
        this.setState({
            answers: tempAnswers1
        })
    };

    saveAnswers() {

        this.state.answers.map(async answer => {
            let index = this.state.answers.indexOf(answer);
            let answer1 = answer;
            console.log("answer", answer1, this.state.patientID);
            if (answer1 !== this.state.tempAnswers[index]) {
                await AnswerApi.update({
                    answer: answer.answer,
                    relevant: answer.relevant
                }, answer.id).then(res => {
                    console.log(res);
                    if (index === this.state.answers.length-1) {
                        this.setState({
                            redirect: true
                        })
                    }

                }).catch(err => {
                    toast.error('Creating is failed');
                })
            }
        });
    }

    save() {

        let patientID = 1;
        this.state.patients.map(patient => {
            if (patient.id == this.state.patientID.split(" ")[2])  {
                patientID = patient.id;
                console.log(patientID);
            }
            console.log(patient.id);
        });

        if (this.state.title === "") {
            toast.warn('Please insert anamnesis title');
            return;
        }

        if (patientID !== this.props.location.anamnesis.patientId) {
            AnamnesisApi.update({patientId: patientID, title: this.state.title,}, this.props.location.anamnesis.id).then((res) => {
                console.log('token', res.data.id);
                    this.saveAnswers()

            }).catch(err => {
                console.log(err);
                toast.error('Updating is failed');
            })
        } else {
            this.saveAnswers();
        }

    }

    handleEvent(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
      const {t}=this.props;
      if(this.state.redirect){
          return(
              <Redirect to={"/anamnesis"} />
          )
      } else if(!this.state.isLogin) {
          return(
              <Redirect to={"/"}/>
          )
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


                                <MDBListGroup className="scrollbar scrollbar-primary  mt-5 mx-auto">
                                    {this.state.answers.map(answer => {
                                        let index = this.state.answers.indexOf(answer);
                                        return <MDBListGroupItem key={index}>
                                            <MDBRow>
                                                <MDBCol lg="10" className="mb-10">
                                                    <div>
                                                        <h5 className="w-auto  mx-auto p-3  text-left">{index+1+". "+answer.question}</h5>
                                                    </div>
                                                    {answer.responseType === 1&&<FreeAnswer value={answer.answer} onChangeAnswer={(answer) => this.changeAnswer(index, answer)}/>}
                                                    {answer.responseType === 2&&<ScaleAnswer value={answer.answer} onChangeAnswer={(answer) => this.changeAnswer(index, answer)}/>}
                                                    {answer.responseType === 3&&<SelectAnswer keyIndex={index} value={answer.answer} onChangeAnswer={(answer) => this.changeAnswer(index, answer)}/>}
                                                    {answer.responseType === 4&&<Graph value={answer.answer} onChangeAnswer={(answer) => this.changeAnswer(index, answer)}/>}
                                                </MDBCol>
                                                <MDBCol lg="2" className="mb-2" >
                                                    {this.state.answers.indexOf(answer)===0&&<small>Relevant</small>}
                                                     <Relevant keyIndex={index} value={answer.relevant} onChangeRelevant={(relevant) => this.changeRelevant(index, relevant)}/>
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

export default withTranslation('common') (AnamnesisEdit);
