import React, {Component} from "react";
import {
    MDBRow,
    MDBCardBody,
    MDBCol,
    MDBCard,
    MDBListGroup,
    MDBListGroupItem,
    MDBContainer,
    MDBBtn,
    ToastContainer, toast,
} from "mdbreact";
import "../../assets/css/patienteditor.css"
import { withTranslation } from 'react-i18next';
import BaseApi from "../../api/BaseApi";
import AnamnesisApi from "../../api/AnamnesisApi";
import AnswerApi from "../../api/AnswerApi";
import {loadState} from "../../storage/storage";
import {Redirect} from 'react-router';
import Relevant from "../component/select-relevant";
import FreeAnswer from "../component/free-answer";
import ScaleAnswer from "../component/scale-answer";
import SelectAnswer from "../component/select-answer";
import Graph from "../component/Graph";
class DetailView extends Component{
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toDateString(),
      currentItem: 0,
      answers: [],
      tempAnswers: [],
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
        console.log(this.props.location.anamnesis);
        if (this.props.location.anamnesis) {
            this.getAnswers(this.props.location.anamnesis.id)
        }

    }

  getAnswers(id) {
        let answers = [];
        this.setState({
            currentItem: id
        });
        AnswerApi.getByAnamnesis(id).then((res) => {
          if (res.data) {
            res.data.map((answer) => {
                answers.push({
                    id: answer.id,
                    responseType: answer.responseType,
                    question: answer.question,
                    answer: answer.answer,
                    anamnesiseId: answer.anamnesiseId,
                    relevant: answer.relevant
                });
                this.state.tempAnswers = [];
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
              });

          }
        })
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

  save() {
      this.saveAnswers();
  }

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
                        let tAnswers = this.state.answers.slice();
                        tAnswers.sort(function(a, b) {
                            console.log(b.relevant, a.relevant);
                            return b.relevant - a.relevant;
                        });
                        this.setState({
                            answers: tAnswers
                        });
                        toast.success('Updating is success');
                    }

                }).catch(err => {
                    toast.error('Updating is failed');
                })
            }
        });
  }

  render() {

      const {t} = this.props;
      if (!this.state.isLogin) {
            return <Redirect to="/"/>
        }
      return (
            <div id="profile-v2" className="mb-5">
                <ToastContainer
                    hideProgressBar={true}
                    newestOnTop={true}
                    autoClose={5000}
                />
                <MDBContainer fluid>
                    <MDBRow center>
                        <MDBCol lg="8" className="mb-r">
                            <MDBCard narrow>
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol sm="6" className="mb-r d-flex justify-content-around">
                                            <span>{t('firstname')}: </span><strong>{this.props.location.anamnesis.patient.firstName}</strong>
                                        </MDBCol>
                                        <MDBCol sm="6" className="mb-r d-flex justify-content-around">
                                            <span>{t('surname')}: </span><strong>{this.props.location.anamnesis.patient.surName}</strong>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBCol sm="6" className="mb-r d-flex justify-content-around">
                                            <span>{t('dateofbirth')}: </span><strong>{this.props.location.anamnesis.patient.birthday}</strong>
                                        </MDBCol>
                                        <MDBCol sm="6" className="mb-r d-flex justify-content-around">
                                            <span>{t('gender')}: </span><strong>{this.props.location.anamnesis.patient.gender}</strong>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBListGroup className="my-4 mx-4 text-left" >
                                        <MDBListGroupItem active key={this.props.location.anamnesis.id} onClick={() => this.getAnswers(this.props.location.anamnesis.id)}><strong>{this.props.location.anamnesis.title}</strong><span className="float-right">{this.props.location.anamnesis.updatedAt.split("T")[0]}</span></MDBListGroupItem>
                                    </MDBListGroup>


                                    <MDBListGroup className="scrollbar scrollbar-primary  mt-5 mx-auto">
                                        {this.state.answers.map(answer => {
                                            console.log("answer", answer);
                                            let index = this.state.answers.indexOf(answer);
                                            return <MDBRow key={index} center>
                                                    <MDBCol lg="6" className="mb-6">
                                                        <div>
                                                            <p className="w-auto  mx-auto  text-left">{index+1+". "+answer.question}</p>
                                                        </div>
                                                    </MDBCol>
                                                    <MDBCol lg="5" >
                                                        <div>
                                                            {
                                                                answer.responseType === 4?<img src={answer.answer} width="450px" height="450px!important"/>:<p className="w-auto  mx-auto text-left">{answer.answer}</p>
                                                            }

                                                        </div>
                                                    </MDBCol>
                                                </MDBRow>
                                        })}
                                    </MDBListGroup>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
      );
  }

}

export default withTranslation('common') (DetailView);
