import React, { Component } from "react";
import { MDBFormInline, MDBInput } from "mdbreact";
import { withTranslation } from 'react-i18next';

class SelectAnswer extends Component {
    state = {
        radio: 0
    };

    onClick1 = nr => () =>{
        this.setState({
            radio: nr
        }, () => this.props.onChangeAnswer(this.state.radio));
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
            <MDBFormInline>
                <MDBInput onClick={this.onClick1(1)} checked={this.state.radio == 1} label="Yes"
                          type="radio" id={"answer1"+this.props.keyIndex} />
                <MDBInput onClick={this.onClick1(2)} checked={this.state.radio == 2} label="No"
                          type="radio" id={"answer2"+this.props.keyIndex} />
                <MDBInput onClick={this.onClick1(3)} checked={this.state.radio == 3} label="I don't know"
                          type="radio" id={"answer3"+this.props.keyIndex} />
            </MDBFormInline>
        );
    }
}

export default withTranslation('common') (SelectAnswer);