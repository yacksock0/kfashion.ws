import React, { Component, ReactDOM } from 'react';
import {fabric} from 'fabric';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

import {Container, Toolbar, Typography, Button} from "@material-ui/core";
import {green, grey ,red} from "@material-ui/core/colors";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


const styles = theme => ({
    // --START Test
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
    // --END Test

    mainContainer: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
    },

    divStyle: {
        display: 'inline',
    },
    canvas: {
        border: '1px',
        borderStyle : 'solid',
        borderColor : 'black',

    }
});

class Test2 extends React.Component {
    canvas;
    x;
    y;
    lineTwoPoint=[];
    polyPointX = [];
    polyPointY = [];
    lineCounter = 0;
    polyCounter = 0;
    onOff = '';
    onOff2 = 1;



    roof = null;
    roofPoints = [];

    // drawingObject = {type: "",
    //
    //     background:"",
    //     border:"",
    // };


        componentDidMount = () => {

            // canvas Drawing
            this.canvas = new fabric.Canvas('c');
            this.canvas.setBackgroundImage('/images/cloth.jpg');

            // document.getElementById().addEventListener("keypress", (e) =>{
            //     console.log('zzzzzzzzzz'); //문자코드값 : a -> 65
            // });
            // fabric.util.addListener(window,'keyPress', ()=> {
            //     this.canvas.clean;
            //     console.log('zzzzzzzzzz');
            // });
            // fabric.util.addListener(window,'dblclick', function(){
            //     this.drawingObject.type = "";
            //     this.lines.forEach(function(value, index, ar){
            //         this.canvas.remove(value);
            //     });
            //     //canvas.remove(lines[lineCounter - 1]);
            //     this.roof = (roofPoints) => this.makeRoof;
            //     console.log(this.roof);
            //     this.canvas.add(this.roof);
            //     this.canvas.renderAll();
            //
            //     console.log("double click");
            //     //clear arrays
            //     this.roofPoints = [];
            //     this.lines = [];
            //     this.lineCounter = 0;
            //
            // });


            this.canvas.on('selection:created', function (e) {
                const asd = e.target;

            });

            this.canvas.on('mouse:move', function (e) {
                const asd = e.x;

            });
            this.canvas.on('mouse:down', (e) => {
                if (this.onOff == 'lineUse') {
                this.canvas.selection = false;
                this.polyPointX[this.polyCounter] = e.pointer.x;
                this.polyPointY[this.polyCounter] = e.pointer.y;


                this.lineTwoPoint = [this.x, this.y, e.pointer.x, e.pointer.y];
                this.x = e.pointer.x;
                this.y = e.pointer.y;

                let circle = new fabric.Circle({
                    type: 'circle',
                    id: this.polyCounter,
                    radius: 8,
                    fill: 'green',
                    left: e.pointer.x - 5,
                    top: e.pointer.y - 5,
                    selectable: false,
                    evented: false,
                });
                this.canvas.add(circle);
                this.canvas.bringToFront(circle)
                this.canvas.renderAll();
                this.polyCounter += 1;
            }

            });

            this.canvas.on('mouse:up', (e) => {
                let x1 = this.lineTwoPoint[0];
                let x2 = this.lineTwoPoint[2];
                let x3 = 0;
                let y1 = this.lineTwoPoint[1];
                let y2 = this.lineTwoPoint[3];
                let y3 = 0;
                if(x2 <x1){
                    x3 = x1;
                    x1 = x2;
                    x2 = x3;
                }
                if(y2 <y1){
                    y3 = y1;
                    y1 = y2;
                    y2 = y3;
                }

                if(this.onOff == 'lineUse'){
                    let polyline = new fabric.Line(
                            [this.lineTwoPoint[0],
                            this.lineTwoPoint[1],
                            this.lineTwoPoint[2],
                            this.lineTwoPoint[3]], {
                                id : this.lineCounter,
                                type : 'line',
                                fill: 'red',
                                stroke: 'red',
                                strokeWidth: 1,
                                padding: 1,
                                selectable : false,
                                evented : false,
                                left: x1,
                                top: y1,
                    });
                    this.canvas.add(polyline);
                    this.canvas.sendToBack(polyline);
                    this.lineCounter +=1;
                }
                this.canvas.selection = true;

            });



            // this.canvas.on('mouse:down', (options) => {
            //
            //     if (this.drawingObject.type === "roof") {
            //         console.log("if?");
            //         this.canvas.selection = false;
            //         this.setStartingPoint(options); // set x,y
            //         this.roofPoints.push(this.Point(this.x, this.y));
            //         let points = [this.x, this.y, this.x, this.y];
            //         this.lines.push(new fabric.Line(points, {
            //             strokeWidth: 3,
            //             selectable: false,
            //             stroke: 'red'
            //         }).set('originX', this.x).set('originY', this.y));
            //             // .setOriginX(this.x).setOriginY(toString(this.y)));
            //
            //
            //         this.canvas.add(this.lines[this.lineCounter]);
            //         this.lineCounter++;
            //         this.canvas.on('mouse:up', (options) =>{
            //             this.canvas.selection = true;
            //             this.canvas.renderAll();
            //         });
            //     }
            // });
            // this.canvas.on('mouse:move', function (options) {
            //     if (this.lines[0] != null && this.lines[0] != undefined && this.drawingObject.type == "roof") {
            //         this.setStartingPoint(options);
            //         this.lines[this.lineCounter - 1].set({
            //             x2: this.x,
            //             y2: this.y
            //         });
            //         this.canvas.renderAll();
            //     }
            // });
        }


    // poly = () => {
    //     console.log('poly');
    //     if (this.drawingObject.type == "roof") {
    //         console.log('if?');
    //         this.drawingObject.type = "";
    //         this.lines.forEach(function(value, index, ar){
    //             this.canvas.remove(value);
    //         });
    //         //canvas.remove(lines[lineCounter - 1]);
    //         this.roof = this.makeRoof(this.roofPoints);
    //         this.canvas.add(this.roof);
    //         this.canvas.renderAll();
    //     } else {
    //         console.log('else?');
    //         this.drawingObject.type = "roof"; // roof type
    //     }
    //     console.log(this.drawingObject.type);
    // };
    //
    // Point = (x, y) => {
    //     console.log("x : " +x);
    //     console.log("y : " +y);
    //     this.x = x;
    //     this.y = y;
    // }

    // setStartingPoint = (options) => {
    //     let offset = this.canvas.offset;
    //     // this.x
    //     //     = options.e.pageX - this.canvas.width;
    //     // this.y
    //     //     = options.e.pageY - this.canvas.height;
    //
    //     this.x
    //         = options.e.pageX - this.canvas.width;
    //     this.y
    //         = options.e.pageY - this.canvas.height;
    //
    //     console.log("left : " +this.canvas.width);
    //     console.log("top " +this.canvas.height);
    //     console.log("x : " +this.x);
    //     console.log("y : " +this.y);
    // }
    //
    // makeRoof = (roofPoints) => {
    //     let left = this.findLeftPaddingForRoof(roofPoints);
    //     let top = this.findTopPaddingForRoof(roofPoints);
    //     roofPoints.push(new this.Point(roofPoints[0].x,roofPoints[0].y))
    //     let roof = new fabric.Polyline(roofPoints, {
    //         fill: 'rgba(0,0,0,0)',
    //         stroke:'#58c'
    //     });
    //     roof.set({
    //         left: left,
    //         top: top,
    //     });
    //     return roof;
    // }
    //
    // findTopPaddingForRoof = (roofPoints) => {
    //     let result = 999999;
    //     for (let f = 0; f < this.lineCounter; f++) {
    //         if (roofPoints[f].y < result) {
    //             result = roofPoints[f].y;
    //         }
    //     }
    //     return Math.abs(result);
    // }
    //
    // findLeftPaddingForRoof = (roofPoints) => {
    //     let result = 999999;
    //     for (let i = 0; i < this.lineCounter; i++) {
    //         if (roofPoints[i].x < result) {
    //             result = roofPoints[i].x;
    //         }
    //     }
    //     return Math.abs(result);
    // }
    startPoly = () => {
            this.onOff = 'lineUse';
        }

    deleteOne = () => {
        let j = (this.polyCounter);
        let line = 0;
        let circle = 0;
        this.canvas.getObjects().forEach(function( o) {
            if(o.id == j-1 && o.type == 'line')     line = o;
            if(o.id == j-1 && o.type == 'circle')   circle = o;
        })
        this.canvas.remove(line);
        this.canvas.remove(circle);

        let x1 =this.polyPointX[this.polyCounter -2];
        let y1 =this.polyPointY[this.polyCounter -2];
        this.x = x1;
        this.y = y1;
        this.polyCounter -=1;
        this.lineCounter -=1;
        this.polyPointX[this.polyCounter] = 0;
        this.polyPointY[this.polyCounter] = 0;
    }

    finishPath = () => {
        this.onOff = '';
        let objList =[];
        this.canvas.getObjects().forEach(function( o) {
            objList.push(o);
        })
        for (let i=0 ; i<=objList.length; i++ ){
            this.canvas.remove(objList[i]);
        }

        let makePath = 'M' + this.polyPointX[0] + ' ' + this.polyPointY[0];
        for(let i=1; i < this.polyCounter; i++){
            makePath +=' L '+ this.polyPointX[i] + ' ' + this.polyPointY[i];
        }
        makePath += ' z';
        let path = new fabric.Path(makePath);
        this.canvas.add(path);
    }

    submit = () => {
        console.log(this.polyPointX);
        console.log(this.polyPointY);
    }

    render() {
            const { classes } = this.props;
            return (
                <Container component="main" className={classes.mainContainer}>
                    <div className={classes.appBarSpacer} />
                    <div className={classes.mainContent}>
                        <div className={classes.divStyle} style={{backgroundColor :'green'}}>
                            <div>
                                <div style={{display : "inline-block"}}>
                                    <Button id="poly"  title="Draw Polygon" onClick={this.startPoly} >start</Button>
                                </div>
                                <div style={{display : "inline-block"}}>
                                    <Button id="poly"  title="Draw Polygon" onClick={this.finishPath} >finish</Button>
                                </div>
                                <div style={{display : "inline-block"}}  align = "right">
                                    <Button id="poly"  title="Draw Polygon" onClick={this.deleteOne} >deleteOne</Button>
                                </div>
                            </div>
                            <div style={{backgroundColor : "#13264E"}}>
                            <canvas id="c" class="canvas" width= "750" height= "750"  className={classes.canvas}/>
                            </div>

                            <div style={{backgroundColor :'grey'}}>
                                <div align = "right">
                                    <Button onClick={this.submit} >submit </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            );
        }
    }

export default withSnackbar(withRouter(withStyles(styles) (Test2)));

