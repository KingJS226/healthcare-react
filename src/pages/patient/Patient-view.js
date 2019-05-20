import React, {Component} from "react";
import {
    MDBRow,
    MDBCardBody,
    MDBCol,
    MDBCard,
    MDBDataTable,
    MDBContainer,
    MDBBtn,
    toast,
    MDBIcon
} from "mdbreact";
import "../../assets/css/patienteditor.css"
import { withTranslation } from 'react-i18next';
import BaseApi from "../../api/BaseApi";
import AnamnesisApi from "../../api/AnamnesisApi";
import AnswerApi from "../../api/AnswerApi";
import {loadState} from "../../storage/storage";
import {Redirect} from 'react-router';
const Link = require("react-router-dom").NavLink;
class PatientView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toDateString(),
            currentItem: 0,
            anamnesis: [],
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


    initData() {
        let anamnesis = [];
        AnamnesisApi.getByDoctor(loadState('doctorName')).then((res) => {
            if (res.data.length>0) {
                res.data.map((anamnes) => {
                    if (anamnes) {
                        anamnes.map(res1 => {
                            if (res1) {
                                anamnesis.push({
                                    title: res1.title,
                                    created_at: res1.updatedAt.split("T")[0],
                                    view: <Link to={{pathname:"/patients/view-anamnesis", anamnesis:res1}}><MDBBtn color="pink" size="sm" rounded><MDBIcon icon="low-vision" className="pr-1"/></MDBBtn></Link>,
                                })
                            }
                        })

                    }

                });
                this.setState({
                    anamnesis: anamnesis
                })
            }
        });

    }

    componentDidMount() {
        console.log(this.props.location.patient);
        this.initData();

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

        const {t}=this.props;
        const data = {
            columns: [
                {
                    label: t('name'),
                    field: 'title',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: t('created-at'),
                    field: 'created_at',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: t('view'),
                    field: 'view'
                }
            ],
            rows: this.state.anamnesis
        };
        if (!this.state.isLogin) {
            return <Redirect to="/"/>
        }
        return (
            <MDBContainer className="mt-3">
                <MDBRow className="py-3">
                    <MDBCol md="12">
                        <MDBCard>
                            <MDBCardBody>
                                <h1 className="font-weight-bold">{t('anamnesis')}</h1>
                                <MDBDataTable
                                    entriesLabel={t("show-entries")}
                                    searchLabel={t("search")}
                                    infoLabel={[t("showing"), t("to"), t("of"), t("entries")]}
                                    paginationLabel={[t("previous"), t("next")]}
                                    hover
                                    data={data}
                                    paging={true}
                                />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>

                </MDBRow>

            </MDBContainer>
        );
    }

}

export default withTranslation('common') (PatientView);