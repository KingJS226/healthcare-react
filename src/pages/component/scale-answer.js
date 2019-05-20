import React, { Component } from "react";
import MultiSlider, { Progress } from 'react-multi-bar-slider';

class ScaleAnswer extends Component {
    state = {
        progress: 0,
        answer: 0
    }

    handleSlide = newProgress => {this.setState({
        progress: newProgress,
        answer: (newProgress/10).toString()}, () => this.props.onChangeAnswer(this.state.answer));
    };

    componentDidMount() {
        console.log("updated >>>>>>>>>.", this.props.value);
        this.setState({
            answer: this.props.value,
            progress: this.props.value*10
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                answer: this.props.value,
                progress: this.props.value*10
            })
        }
    }

    render() {
        return (
            <div className="form-group">
                <MultiSlider onSlide={this.handleSlide}>
                    <Progress color="green"  progress={this.state.progress}/>
                </MultiSlider>
            </div>
        );
    }
}

export default ScaleAnswer;