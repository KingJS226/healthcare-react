import React, {Component} from "react";
import { MDBListGroup, MDBRow, MDBCol, MDBDataTable, MDBListGroupItem, MDBCardBody, MDBCardHeader, MDBCard, MDBContainer } from "mdbreact";
import "../../assets/css/patienteditor.css";
import { withTranslation } from 'react-i18next';
import AnswerApi from "../../api/AnswerApi";
import BaseApi from "../../api/BaseApi";
import {loadState} from "../../storage/storage";
import {Redirect} from 'react-router';
class AnamnesisView extends Component{
  constructor(props) {
    super(props)
    this.state = {
      rows: [],
      isLogin: true
    }
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
        const token1 = loadState('token');
        BaseApi.authToken=token1;
        this.getAnswers();
    }

  getAnswers() {
        AnswerApi.getByAnamnesis(this.props.location.anamnesis.id).then((res) => {
            if (res.data) {
                let rows = [];
                res.data.map((answer) => {
                    rows.push({
                        id: answer.id,
                        type: answer.responseType,
                        question: answer.question,
                        answer: answer.responseType == 4?"image": answer.answer,
                        created_at: answer.updatedAt.split("T")[0],
                    });
                })
                this.setState({
                    rows
                })
            }
        })
    }

  render() {

    const {t}=this.props;
    const data = {
          columns: [
              {
                  label: t('id'),
                  field: 'id',
                  sort: 'asc',
                  width: 150
              },
              {
                  label: t('type'),
                  field: 'type',
                  sort: 'asc',
                  width: 150
              },
              {
                  label: t('question'),
                  field: 'question',
                  sort: 'asc',
                  width: 270
              },
              {
                  label: t('answer'),
                  field: 'answer',
                  sort: 'asc',
                  width: 270
              },
              {
                  label: t('created-at'),
                  field: 'created_at',
                  sort: 'asc',
                  width: 100
              }
          ],
          rows: this.state.rows
      };


      if (!this.state.isLogin) {
          return <Redirect to="/"/>
      }

    return (

        <MDBContainer className="mt-3 text-center">
            <MDBRow>
                <MDBCol lg="4" className="mb-4">
                    <MDBCard narrow>
                        <MDBCardBody className="text-center">
                            <h3 className="text-muted"><strong>{t('anamnesis')}</strong>
                            </h3>
                            <MDBListGroup className="my-4 mx-4" >
                                <MDBListGroupItem >{t('id')}: <strong>{this.props.location.anamnesis.id}</strong></MDBListGroupItem>
                                <MDBListGroupItem >{t('patientid')}: <strong>{this.props.location.anamnesis.patient.firstName + this.props.location.anamnesis.patient.surName}</strong></MDBListGroupItem>
                                <MDBListGroupItem >{t('status')}: <strong>{this.props.location.anamnesis.status}</strong></MDBListGroupItem>
                                <MDBListGroupItem >{t('created-at')}: <strong>{this.props.location.anamnesis.createdAt}</strong></MDBListGroupItem>
                            </MDBListGroup>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg="8" className="mb-8">
                    <MDBCard narrow>
                        <MDBCardHeader>
                            <h3>{t('questionandanswer')}</h3>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <h1 className="font-weight-bold">{t('questionandanswer')}
                            </h1>

                            <MDBDataTable
                                entriesLabel={t("show-entries")}
                                searchLabel={t("search")}
                                infoLabel={[t("showing"), t("to"), t("of"), t("entries")]}
                                paginationLabel={[t("previous"), t("next")]}
                                striped
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

export default withTranslation('common') (AnamnesisView);
