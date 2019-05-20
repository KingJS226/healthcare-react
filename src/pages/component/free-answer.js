import React, { Component } from "react";

class FreeAnswer extends Component {
    state = {
        answer: ""
    };

    changeHandler = event => {
        console.log("event value", event.target.value)
        this.setState({ [event.target.name]: event.target.value }, () => this.props.onChangeAnswer(this.state.answer));
    };

    componentDidMount() {
        this.setState({
            answer: this.props.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                answer: this.props.value
            })
        }
    }

    render() {
        return (
            <div className="form-group">
                <input
                    onChange={this.changeHandler}
                    value={this.state.answer || ""}
                    type="text"
                    name="answer"
                    className="form-control"
                />
            </div>
        );
    }
}

export default FreeAnswer;