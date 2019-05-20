import React from "react";
import {  MDBInput, MDBCol, MDBRow, MDBCardBody, MDBCardTitle, MDBBtn, MDBContainer } from "mdbreact";


const EdgeHeaderPage = props => {
  return (
    <MDBContainer className="mt-3 text-center">
      {/*<MDBEdgeHeader color="mdb-color darken-2"></MDBEdgeHeader>*/}
        <MDBRow>
          <MDBCol md="8" lg="7" className="text-left mx-auto float-none white z-depth-1 py-2 px-2" >
            <MDBCardBody>
              <MDBCardTitle>Material Design Edge Headers</MDBCardTitle>
              <p className="pb-4">Example of Material Design Form</p>
              <form>
                <MDBInput
                  label="Your name"
                  group
                  type="text"
                  icon="user"
                />
                <MDBInput
                  label="Your email"
                  group
                  type="email"
                  icon="envelope"
                />
                <MDBInput
                  type="textarea"
                  rows="2"
                  label="Textarea"
                  icon="pencil-alt"
                />
                <MDBBtn color="mdb-color" className="text-xs-left">Submit</MDBBtn>
              </form>
              <div className="my-2">
                <p style={{fontWeight: "300" ,fontSize: "0.75rem"}}>Never submit your passwords here</p>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
    </MDBContainer>
  );
};

export default EdgeHeaderPage;
