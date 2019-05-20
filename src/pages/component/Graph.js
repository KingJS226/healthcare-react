import React, { Component } from "react";
import { MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import "../../assets/css/graph.css"
import imgUrl from "../../assets/img/body.PNG";
import { withTranslation } from 'react-i18next';
class Graph extends Component {
    constructor(props) {
        super(props);
        this.state={
            arrow:[
                [ 2, 0 ], [ -10, -4 ], [ -10, 4]],
            mode: "",
            canvas: "",
            saveable: true,
            ctx: {},
            drawColor: "#000000",
            isDown: false,
            previousPointX:'',
            previousPointY:''
        };
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentDidMount() {
         this.state.canvas = this.refs.canvas;
         this.state.ctx = this.state.canvas.getContext("2d");
        console.log(this.state.ctx);
       this.loadImage();

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.state.canvas = this.refs.canvas;
            this.state.ctx = this.state.canvas.getContext("2d");
            console.log(this.state.ctx);
            this.loadImage();
        }
    }

    loadImage() {
        const img = this.refs.image;
        console.log("image url", imgUrl);
        img.onload = () => {
            console.log(img);
            this.state.ctx.drawImage(img, 0, 0)
        };
        if (this.props.value) {
            img.src = this.props.value;
        }
    }

    btnClear() {
        const img = this.refs.image;
        this.state.ctx.drawImage(img, 0, 0);
        this.setState({
            saveable: true
        })
    }

    saveImage() {
        const dataURL = this.state.canvas.toDataURL();
        this.props.onChangeAnswer(dataURL);
        console.log(dataURL);
        this.setState({
            saveable: false
        })
    }

    handleChange(event) {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        });
        if (event.target.value === "sharp") {
            this.setState({
                drawColor: "#FF0000"
            })
        } else if (event.target.value === "pulling") {
            this.setState({
                drawColor: "#ADFF2F"
            })
        } else {
            this.setState({
                drawColor: "#00C851"
            })
        }
        console.log("event", event.target.value, event.target.name);
    }

    drawFilledPolygon(shape) {
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(shape[0][0],shape[0][1]);

        for(let p in shape)
            if (p > 0) this.state.ctx.lineTo(shape[p][0],shape[p][1]);

        this.state.ctx.lineTo(shape[0][0],shape[0][1]);
        this.state.ctx.fill();
    };

    translateShape(shape,x,y) {
        var rv = [];
        for(let p in shape)
            rv.push([ shape[p][0] + x, shape[p][1] + y ]);
        return rv;
    };

    rotateShape(shape,ang)
    {
        var rv = [];
        for(let p in shape)
            rv.push(this.rotatePoint(ang,shape[p][0],shape[p][1]));
        return rv;
    };
    rotatePoint(ang,x,y) {
        return [
            (x * Math.cos(ang)) - (y * Math.sin(ang)),
            (x * Math.sin(ang)) + (y * Math.cos(ang))
        ];
    };

    drawLineArrow(x1,y1,x2,y2) {
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(x1,y1);
        this.state.ctx.lineTo(x2,y2);
        this.state.ctx.stroke();
        var ang = Math.atan2(y2-y1,x2-x1);
        this.drawFilledPolygon(this.translateShape(this.rotateShape(this.state.arrow,ang),x2,y2));
        this.state.ctx.closePath();
    };


    handleMouseDown(event){ //added code here
        if (this.state.mode === "") {
            return;
        }
        console.log(event);
        this.setState({
            isDown: true,
            previousPointX:event.offsetX,
            previousPointY:event.offsetY
        },()=>{
            const x = event.offsetX;
            const y = event.offsetY;
            console.log(x,y);
            this.state.ctx.beginPath();
            this.state.ctx.strokeStyle = this.state.drawColor;
            this.state.ctx.moveTo(x,y);
            this.state.ctx.lineTo(x+1,y+1);
            this.state.ctx.stroke();
            this.setState({
                saveable: true
            });
            if (this.state.mode === "cause") {
                this.drawCircle();
            }
            if (this.state.mode === "sharp") {
                this.drawCross();
            }
        })
    }
    handleMouseMove(event){
        if (this.state.mode !== "sharp") {
            return;
        }
        // if (this.state.isDown) {
        //     const x = event.offsetX;
        //     const y = event.offsetY;
        //     console.log(x,y);
        //     this.state.ctx.strokeStyle = this.state.drawColor;
        //     this.state.ctx.moveTo(this.state.previousPointX,this.state.previousPointY);
        //     this.state.ctx.lineTo(x,y);
        //     this.state.ctx.stroke();
        // }

    }
    handleMouseUp(event){
        this.setState({
            isDown: false
        });
        if (this.state.mode !== "pulling") {
            return;
        }

        //if(this.state.isDown){
        this.state.ctx.fillStyle = this.state.drawColor;
        const x = event.offsetX;
        const y = event.offsetY;
        this.drawLineArrow(this.state.previousPointX,this.state.previousPointY,x,y);

        //}
    }

    drawCircle() {
        this.state.ctx.fillStyle = this.state.drawColor;
        this.state.ctx.beginPath();
        this.state.ctx.arc(this.state.previousPointX, this.state.previousPointY, 3, 0, 2 * Math.PI);
        this.state.ctx.fill();
        this.state.ctx.closePath();
    }

    drawCross() {
        this.state.ctx.strokeStyle = this.state.drawColor;
        this.state.ctx.fillStyle = this.state.drawColor;
        this.state.ctx.beginPath();
        this.state.ctx.arc(this.state.previousPointX, this.state.previousPointY, 3, 0, 2 * Math.PI);
        this.state.ctx.fill();
        this.state.ctx.moveTo(this.state.previousPointX-8,this.state.previousPointY);
        this.state.ctx.lineTo(this.state.previousPointX+8,this.state.previousPointY);
        this.state.ctx.stroke();
        this.state.ctx.moveTo(this.state.previousPointX,this.state.previousPointY+8);
        this.state.ctx.lineTo(this.state.previousPointX,this.state.previousPointY-8);
        this.state.ctx.stroke();
        this.state.ctx.closePath();
    }


    render() {

        return(
            <MDBRow>
                <MDBCol lg="3" className="mb-3">
                    <MDBRow className="label1" center>
                        <MDBInput  label="Sharp Pain" name="mode" value="sharp" filled type="checkbox" id="checkbox1" className="check-box"
                                   onChange={(event) => this.handleChange(event)} checked={this.state.mode === "sharp"}/>
                    </MDBRow>

                    <MDBRow className="label2" center>
                        <MDBInput label="Pulling Pain" name="mode" value="pulling" filled type="checkbox" id="checkbox2" className="check-box"
                                  onChange={(event) => this.handleChange(event)} checked={this.state.mode === "pulling"}/>
                    </MDBRow>
                    <MDBRow className="label3" center>
                        <MDBInput label="Cause of Pain" name="mode" value="cause" filled type="checkbox" id="checkbox3" className="check-box"
                                  onChange={(event) => this.handleChange(event)} checked={this.state.mode === "cause"}/>
                    </MDBRow>
                    <MDBBtn color="primary" className="left-button" onClick={() => this.btnClear()}>Clear</MDBBtn>
                    <MDBBtn color="success" className="left-button" onClick={() => this.saveImage()} disabled={!this.state.saveable}>Save</MDBBtn>

                </MDBCol>
                <MDBCol lg="9" className="mb-9">
                    <canvas ref="canvas" width={450} height={450}
                            onMouseDown={
                                e => {
                                    let nativeEvent = e.nativeEvent;
                                    this.handleMouseDown(nativeEvent);
                                }}
                            onMouseMove={
                                e => {
                                    let nativeEvent = e.nativeEvent;
                                    this.handleMouseMove(nativeEvent);
                                }}
                            onMouseUp={
                                e => {
                                    let nativeEvent = e.nativeEvent;
                                    this.handleMouseUp(nativeEvent);
                                }}/>
                    <img ref="image" src={imgUrl}  alt="body image"/>
                </MDBCol>

            </MDBRow>
        )
    }
}
export default withTranslation('common') (Graph);