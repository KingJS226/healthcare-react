import React from "react";
import { Switch, Route } from "react-router-dom";
import EdgeHeaderPage from "./pages/EdgeHeaderPage"
import Patients from "./pages/patient/Patients";
import PatientCreate from "./pages/patient/Patient-create";
import PatientEdit from "./pages/patient/Patient-edit";
import PatientView from "./pages/patient/Patient-view";
import Anamnesis from "./pages/anamnesis/Anamnesis";
import AnamnesisCreate from "./pages/anamnesis/Anamnesis-create";
import AnamnesisEdit from "./pages/anamnesis/Anamnesis-edit";
import AnamnesisView from "./pages/anamnesis/Anamnesis-view";
import DetailView from "./pages/patient/DetailView";




class Routes extends React.Component {
  render() {
    return (
          <Switch>
            <Route exact path="/patients" component={Patients} />
              <Route exact path="/patients/create" component={PatientCreate} />
              <Route exact path="/patients/edit" component={PatientEdit} />
              <Route exact path="/patients/view" component={PatientView} />
              <Route exact path="/patients/view-anamnesis" component={DetailView} />
            <Route exact path="/anamnesis" component={Anamnesis}/>
              <Route exact path="/anamnesis/create" component={AnamnesisCreate}/>
              <Route exact path="/anamnesis/edit" component={AnamnesisEdit}/>
              <Route exact path="/anamnesis/view" component={AnamnesisView}/>
            <Route exact path="/addons/edge-header" component={EdgeHeaderPage} />
            <Route component={Patients}/>
          </Switch>
    );
  }
}

export default Routes;
