import React, {Component} from "react";
import { MDBDataTable, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody,
MDBIcon, MDBBtn} from "mdbreact";
import { withTranslation } from 'react-i18next';
import {loadState} from "../../storage/storage";
import BaseApi from "../../api/BaseApi";
import PatientApi from "../../api/PatientApi";
import {Redirect} from 'react-router';
const Link = require("react-router-dom").NavLink;

class Patients extends Component{
    constructor(props) {
        super(props)
        this.state = {
            date: new Date().toDateString(),
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
        console.log(this.props);
        const token1 = loadState('token');
        BaseApi.authToken=token1;
        this.initData();
    }

    delete(index) {
        console.log('index', index);
        PatientApi.remove({id: index.id}).then((res) => {
            console.log(res.data);
            this.initData();
        });
    }

    initData() {
        let patients = [];
        PatientApi.getByDoctor(loadState('doctorName')).then((res) => {
           if (res.data) {
               res.data.map((patient) => {
                   patients.push({
                       id: patient.id,
                       firstname: patient.firstName,
                       surname: patient.surName,
                       birth: patient.birthday,
                       gender: patient.gender,
                       created_at: patient.updatedAt.split("T")[0],
                       view: <Link to={{pathname:"/patients/view", patient:patient}}><MDBBtn color="pink" size="sm" rounded><MDBIcon icon="low-vision" className="pr-1"/></MDBBtn></Link>,
                       edit: <Link to={{pathname:"/patients/edit", patient:patient}}><MDBBtn color="cyan" size="sm" rounded ><MDBIcon far icon="edit" className="pr-1"/></MDBBtn></Link>,
                       delete: <MDBBtn color="dark-green" size="sm" rounded onClick={()=>this.delete(patient)}><MDBIcon icon="archive" className="pr-1"/></MDBBtn>
                   })
               });
               this.setState({
                   rows: patients
               })
           }
        });

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
                    label: t('firstname'),
                    field: 'firstname',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: t('surname'),
                    field: 'surname',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: t('dateofbirth'),
                    field: 'birth',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: t('gender'),
                    field: 'gender',
                    sort: 'asc',
                    width: 100
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
                },
                {
                    label: t('edit'),
                    field: 'edit'
                },
                {
                    label: t('delete'),
                    field: 'delete'
                }
            ],
            rows: this.state.rows
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
                                <h2 className="h2-responsive pb-2 flex-1">
                                    {t('patient')}
                                    <Link to={{pathname:"/patients/create"}} className="float-right"><MDBBtn color="secondary" size="sm" rounded><MDBIcon icon="plus" className="pr-1"/></MDBBtn></Link>
                                </h2>

                                <MDBDataTable
                                    entriesLabel={t("show-entries")}
                                    searchLabel={t("search")}
                                    infoLabel={[t("showing"), t("to"), t("of"), t("entries")]}
                                    paginationLabel={[t("previous"), t("next")]}
                                    striped
                                    hover
                                    data= {data}
                                />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

        );
    }

}


export default withTranslation('common') (Patients);
