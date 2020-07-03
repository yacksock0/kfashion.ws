import React, { Component, ReactDOM } from 'react';
import {fabric} from 'fabric';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

import {Container, Toolbar, Typography, Button, Grid} from "@material-ui/core";
import {green, grey ,red} from "@material-ui/core/colors";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import {KeyboardIcon} from "@material-ui/pickers/_shared/icons/KeyboardIcon";
import {TimeIcon} from "@material-ui/pickers/_shared/icons/TimeIcon";
import {DateRangeIcon} from "@material-ui/pickers/_shared/icons/DateRangeIcon";
import SaveIcon from '@material-ui/icons/Save';
import {inject, observer} from "mobx-react";


const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {
        minWidth: 500,
    },
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
        marginTop:20,
        maxWidth:'100%',
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
        padding:0,
    },
    buttonType1:{
        width: 100,
        marginRight: theme.spacing(2),
    },
    buttonType2:{
        width: 150,
        float:'right',

    },
    toolButton:{
        border:'1px solid black',
        height:50,
        width:'100%',
    },
    test:{
        border:'1px solid black',
        height: '50%',
    },
    toolBox:{
        border:'1px solid black',
        marginRight: 1,
        height:'100%',
    },
    canvas:{
        backgroundColor:'black',
    },
    fileText: {
        paddingTop: 32,
        paddingRight: theme.spacing(2),
        textAlign: 'left'

    },
    filebox: {
        paddingTop: 35,
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    fileSelection: {
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        border: 0,
        borderRadius: 12,
    },

    divStyle: {
        display: 'inline',
    },
});

@inject('fileUploadStore','imageStore')
@observer
class Polygon extends React.Component {
    state = {
        buttonDis1 : false,
        buttonDis2 : false,
        buttonDis3 : false,
        buttonDis4 : false,
        buttonDis5 : false,
    }
    save1 = false;
    save2 = false;
    save3 = false;
    save4 = false;
    save5 = false;

    polyNo;
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

    componentDidMount() {
        this.props.enqueueSnackbar("Polygon Work", {
            variant: 'info'
        });

        // canvas Drawing
        this.canvas = new fabric.Canvas('c');
        this.canvas.setBackgroundImage(this.props.imageStore.isImgData, this.canvas.renderAll.bind(this.canvas), {
            left: 25,
            top: 25,
            width : 700,
            height : 800,
            originX: 'left',
            originY: 'top'
        });

        this.canvas.on('selection:created', function (e) {
            const asd = e.target;
        });

        this.canvas.on('mouse:move', function (e) {
            const asd = e.x;
        });

        this.canvas.on('mouse:down', (e) => {
            console.log('polyNo : ' + this.polyNo);
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

            console.log(this.polyPointX);
            console.log(this.polyPointY);
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
            if(this.onOff == 'lineUse' && x1 !=0 ){
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


    startPoly = (polyNo) => {
        this.onOff = 'lineUse';
        this.polyNo = polyNo;

        this.setState({
            buttonDis1: true,
            buttonDis2: true,
            buttonDis3: true,
            buttonDis4: true,
            buttonDis5: true,
        });
        console.log(polyNo);
        switch (polyNo) {
            case 1 : console.log('1'); this.setState({buttonDis1: false}); break;
            case 2 : console.log('2');this.setState({buttonDis2: false}); break;
            case 3 : console.log('3');this.setState({buttonDis3: false}); break;
            case 4 : console.log('4');this.setState({buttonDis4: false}); break;
            case 5 : console.log('5');this.setState({buttonDis5: false}); break;
         }
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

    deleteAll = (b) =>{
        let objList =[];
        this.canvas.getObjects().forEach(function( o) {
            objList.push(o);
        })
        for (let i=0 ; i<=objList.length; i++ ){
            this.canvas.remove(objList[i]);
        }



        if( b != -1) {
            this.x = 0;
            this.y = 0;
            this.polyCounter =0;
            this.lineCounter =0;
            this.polyPointX.length =0;
            this.polyPointY.length =0;
           this.buttonState();
        }
    }

    buttonState = () => {
        console.log("왜안나와?");
        this.setState({
            buttonDis1: this.save1,
            buttonDis2: this.save2,
            buttonDis3: this.save3,
            buttonDis4: this.save4,
            buttonDis5: this.save5,
        });
    }
    finishPath = () => {


        if(this.canvas.getObjects().length !=0) {
            console.log("여기는 피니시");
            this.onOff = '';
            let makePath = 'M' + this.polyPointX[0] + ' ' + this.polyPointY[0];
            for (let i = 1; i < this.polyCounter; i++) {
                makePath += ' L ' + this.polyPointX[i] + ' ' + this.polyPointY[i];
            }
            makePath += ' z';
            let path = new fabric.Path(makePath);
            this.deleteAll(-1);
            this.canvas.add(path);
        }else{
            alert("입력된 polygon이 존재하지 않습니다.");
        }
    }

    submit = (polyNo) => {
        console.log(this.polyNo);
        console.log(this.polyPointX);
        console.log(this.polyPointY);
        console.log(this.canvas.getObjects().length);
        console.log(this.canvas.getObjects());


        if(this.canvas.getObjects().length !=0){
            switch (polyNo) {
                case 1 : console.log('1');this.save1 = true; break;
                case 2 : console.log('2');this.save2 = true; break;
                case 3 : console.log('3');this.save3 = true; break;
                case 4 : console.log('4');this.save4 = true; break;
                case 5 : console.log('5');this.save5 = true; break;
            }
            this.buttonState();
        }else{
            alert("입력된 polygon이 존재하지 않습니다.");
        }

    }


    render() {
        const { classes } = this.props;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer}/>
                <div className={classes.mainContent}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} lg={5} style={{margin:"auto"}}>
                            <div style ={{ backgroundColor : "#13264E"}}>
                                <canvas id="c" width= "750" height= "850"  >  </canvas>
                            </div>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <div className={classes.mainContent}>
                                <Typography variant="h4" component="h2">
                                    Polygon 영역 지정
                                </Typography>
                                <Paper className={classes.root}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>영역</TableCell>
                                                <TableCell>poly start</TableCell>
                                                <TableCell>poly finish</TableCell>
                                                <TableCell>delete One</TableCell>
                                                <TableCell>delete All</TableCell>
                                                <TableCell>save</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            <TableRow >
                                                <TableCell>상의 영역</TableCell>
                                                <TableCell>
                                                    <Button
                                                        id="1"
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Draw Polygon"
                                                        onClick={() => this.startPoly(1) }
                                                        disabled={this.state.buttonDis1}>
                                                        start <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        id="2"
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="finish"
                                                        onClick={() => this.finishPath() }
                                                        disabled={this.state.buttonDis1}>
                                                        finish
                                                    </Button>

                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton id="3" aria-label="delete" onClick={() => this.deleteOne()} disabled={this.state.buttonDis1}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        id="4"
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.deleteAll(1) }
                                                        disabled={this.state.buttonDis1}>
                                                        All<DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        id="5"
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.submit(1) }
                                                        startIcon={<SaveIcon />}
                                                        disabled={this.state.buttonDis1}>
                                                        save
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableBody >
                                            <TableRow>
                                                <TableCell>하의 영역</TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Draw Polygon"
                                                        onClick={() => this.startPoly(2) }
                                                        disabled={this.state.buttonDis2}>
                                                        start <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="finish"
                                                        onClick={() => this.finishPath() }
                                                        disabled={this.state.buttonDis2}>
                                                        finish
                                                    </Button>

                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteOne()} disabled={this.state.buttonDis2}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.deleteAll(2) }
                                                        disabled={this.state.buttonDis2}>
                                                        All<DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.submit(2) }
                                                        disabled={this.state.buttonDis2}>
                                                        save
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>신발 영역</TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Draw Polygon"
                                                        onClick={() => this.startPoly(3) }
                                                        disabled={this.state.buttonDis3}>
                                                        start <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="finish"
                                                        onClick={() => this.finishPath() }
                                                        disabled={this.state.buttonDis3}>
                                                        finish
                                                    </Button>

                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteOne()} disabled={this.state.buttonDis3}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.deleteAll(3) }
                                                        disabled={this.state.buttonDis3} >
                                                        All<DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.submit(3) }
                                                        disabled={this.state.buttonDis3} >
                                                        save
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>가방 영역</TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Draw Polygon"
                                                        onClick={() => this.startPoly(4) }
                                                        disabled={this.state.buttonDis4}>
                                                        start <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="finish"
                                                        onClick={() => this.finishPath() }
                                                        disabled={this.state.buttonDis4} >
                                                        finish
                                                    </Button>

                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteOne()} disabled={this.state.buttonDis4}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.deleteAll(4) }
                                                        disabled={this.state.buttonDis4}>
                                                        All<DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.submit(4) }
                                                        disabled={this.state.buttonDis4}>
                                                        save
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableBody>
                                            <TableRow >
                                                <TableCell>악세사리 영역</TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Draw Polygon"
                                                        onClick={() => this.startPoly(5) }
                                                        disabled={this.state.buttonDis5} >
                                                        start <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="finish"
                                                        onClick={() => this.finishPath() }
                                                        disabled={this.state.buttonDis5}>
                                                        finish
                                                    </Button>

                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteOne()}  disabled={this.state.buttonDis5}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.deleteAll(5) }
                                                        disabled={this.state.buttonDis5}>
                                                        All<DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.submit(5) }
                                                        disabled={this.state.buttonDis5}>
                                                        save
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>

                                    </Table>
                                </Paper>
                            </div>

                            <div style={{backgroundColor: 'grey'}}>
                                <div align="center">
                                    <Button onClick={this.submit} color={'#999999'}>submit </Button>
                                </div>
                            </div>

                            {/*<div className={classes.mainContent} >*/}
                            {/*    <div>*/}
                            {/*        <div style={{display: "inline-block"}}>*/}
                            {/*            <Button id="poly" title="Draw Polygon" onClick={this.startPoly}>start</Button>*/}
                            {/*        </div>*/}
                            {/*        <div style={{display: "inline-block"}}>*/}
                            {/*            <Button id="poly" title="Draw Polygon" onClick={this.finishPath}>finish</Button>*/}
                            {/*        </div>*/}
                            {/*        <div style={{display: "inline-block"}} align="right">*/}
                            {/*            <Button id="poly" title="Draw Polygon" onClick={this.deleteOne}>deleteOne</Button>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}


                            {/*    <div style={{backgroundColor: 'grey'}}>*/}
                            {/*        <div align="right">*/}
                            {/*            <Button onClick={this.submit}>submit </Button>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                        </Grid>
                    </Grid>

                </div>

                {/*Stepper*/}
                <div style={{marginTop:70}}>
                </div>
                <div>
                    <hr></hr>
                    <Button
                        type="submit"
                        className={classes.buttonType1}
                        variant="outlined"
                        onClick={this.handleSubmitForm} >
                        Previous
                    </Button>
                    <Button
                        type="submit"
                        className={classes.buttonType1}
                        variant="outlined"
                        onClick={this.handleSubmitForm} >
                        Next
                    </Button>
                    <Button
                        type="submit"
                        className={classes.buttonType2}
                        color="primary"
                        variant="outlined"
                        onClick={this.handleSubmitForm} >
                        Save and Next
                    </Button>
                </div>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Polygon)));