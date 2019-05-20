import React, {Component} from "react";
import {MDBDataTable, MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBBtn, MDBIcon} from "mdbreact";
import AnamnesisApi from "../../api/AnamnesisApi";
import {loadState} from "../../storage/storage";
import { withTranslation } from 'react-i18next';
import BaseApi from "../../api/BaseApi";
import {Redirect} from 'react-router';
const Link = require("react-router-dom").NavLink;

class Anamnesis extends Component{
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toDateString(),
            rows: [],
            isLogin: true
        }

    }

    delete(index) {
        console.log('index', index);
        AnamnesisApi.remove({id: index.id}).then((res) => {
            console.log(res.data);
            this.initData();
        });

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
                                    id: res1.id,
                                    title: res1.title,
                                    patientID: res1.patient.firstName+" "+res1.patient.surName,
                                    status: res1.status,
                                    created_at: res1.updatedAt.split("T")[0],
                                    view: <Link to={{pathname:"/anamnesis/view", anamnesis:res1}}><MDBBtn color="pink" size="sm" rounded><MDBIcon icon="low-vision" className="pr-1"/></MDBBtn></Link>,
                                    edit: <Link to={{pathname:"/anamnesis/edit", anamnesis:res1}}><MDBBtn color="cyan" size="sm" rounded ><MDBIcon far icon="edit" className="pr-1"/></MDBBtn></Link>,
                                    delete: <MDBBtn color="dark-green" size="sm" rounded onClick={()=>this.delete(res1)}><MDBIcon icon="archive" className="pr-1"/></MDBBtn>
                                })
                            }
                        })

                    }

                });
                this.setState({
                    rows: anamnesis
                })
            }
        });

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
        this.initData();
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
                    label: t('name'),
                    field: 'title',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: t('patientid'),
                    field: 'patientID',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: t('status'),
                    field: 'status',
                    sort: 'asc',
                    width: 200
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
                                <h1 className="font-weight-bold">{t('anamnesis')}
                                    <Link to={{pathname:"/anamnesis/create"}} className="float-right"><MDBBtn color="secondary" size="sm" rounded><MDBIcon icon="plus" className="pr-1"/></MDBBtn></Link>
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

export default withTranslation('common') (Anamnesis);
