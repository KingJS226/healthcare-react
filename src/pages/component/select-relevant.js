import React, { Component } from "react";
import { MDBFormInline, MDBInput } from "mdbreact";

class Relevant extends Component {
    state = {
        radio: 0
    }

    onClick = nr => () =>{
        this.setState({
            radio: nr
        }, () => this.props.onChangeRelevant(this.state.radio));
    };

    componentDidMount() {
        this.setState({
            radio: this.props.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                radio: this.props.value
            })
        }
    }

    render() {
        return (
            <MDBFormInline className="d-flex justify-content-center">
                <MDBInput size="sm" labelClass="label-class" onClick={this.onClick(1)} checked={this.state.radio === 1}  label=" " type="radio" id={"relevant1"+this.props.keyIndex} />
                <MDBInput labelClass="label-class" onClick={this.onClick(2)} checked={this.state.radio === 2}  label=" " type="radio" id={"relevant2"+this.props.keyIndex} />
                <MDBInput labelClass="label-class" onClick={this.onClick(3)} checked={this.state.radio === 3}  label=" " type="radio" id={"relevant3"+this.props.keyIndex} />
                <MDBInput labelClass="label-class" onClick={this.onClick(4)} checked={this.state.radio === 4}  label=" " type="radio" id={"relevant4"+this.props.keyIndex} />
            </MDBFormInline>
        );
    }
}

export default Relevant;