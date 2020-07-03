import React, { Component, ReactDOM } from 'react';
import {fabric} from 'fabric';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {Container, Toolbar, Typography, Button, Grid} from "@material-ui/core";
import {green, grey ,red} from "@material-ui/core/colors";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';


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
});


@inject('fileUploadStore','imageStore')
@observer
class BoundaryBox extends React.Component {

    i=0;
    width;
    height;
    canvas;
    text;
    fill;
    x;
    y;

    state = {
        winheight: 0,
        winwidth: 0
    }

    componentDidMount() {
        this.props.enqueueSnackbar("BoundaryBox Work", {
            variant: 'info'
        });

        this.canvas = this.__canvas = new fabric.Canvas('c');
        this.canvas.setBackgroundImage(this.props.imageStore.isImgData);

        // // -- START  < Testing... >
        // this.canvas.on('selection:created', function (e) {
        //     const asd = e.target;
        //     console.log('1. created');
        // });
        // this.canvas.on('selection:cleared', function (e) {
        //     const asd = e.target;
        //     console.log('2. cleared');
        // });
        // this.canvas.on('selection:updated', function (e) {
        //     const asd = e.target;
        //     console.log('3. updated');
        // });
        this.canvas.on('object:moving', function (e) {
            const asd = e.target;
            console.log("name : "+asd.name);

        });
        // this.canvas.on('mouse:over', function (e) {
        //     const asd = e.target;
        //     console.log('5. mouse:over');
        // });
        // this.canvas.on('mouse:out', function (e) {
        //     const asd = e.target;
        //     console.log('6. mouse:out');
        // });
        // // --END  < Testing... >

        // -- START  < rect가 canvas를 못벗어나도록... >
        this.canvas.on('object:moving', function (e) {
            const obj = e.target;
            // if object is too big ignore
            if(obj.height > obj.canvas.height || obj.width > obj.canvas.width){
                return;
            }
            obj.setCoords();
            // top-left  corner
            if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
                obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
                obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
            }
            // bot-right corner
            if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
                obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
                obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
            }
        });

        const left1 = 0;
        const top1 = 0 ;
        const scale1x = 0 ;
        const scale1y = 0 ;
        const width1 = 0 ;
        const height1 = 0 ;
        this.canvas.on('object:scaling', function (e){
            const obj = e.target;
            obj.setCoords();
            const brNew = obj.getBoundingRect();

            if (((brNew.width+brNew.left)>=obj.canvas.width) || ((brNew.height+brNew.top)>=obj.canvas.height) || ((brNew.left<0) || (brNew.top<0))) {
                obj.left = left1;
                obj.top=top1;
                obj.scaleX=scale1x;
                obj.scaleY=scale1y;
                obj.width=width1;
                obj.height=height1;
            }
            else{
                this.left1 =obj.left;
                this.top1 =obj.top;
                this.scale1x = obj.scaleX;
                this.scale1y=obj.scaleY;
                this.width1=obj.width;
                this.height1=obj.height;
            }
        });
        // --END  < rect가 canvas를 못벗어나도록... >
    }

    addRect = (rectNo) => {
        let obj = 0;
        this.canvas.getObjects().forEach(function( o) {
            if(o.id == rectNo) {
                obj = o;
            }
        })
        if(obj==0){
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            width: 200,
            height: 200,
            fill: grey,
            opacity: 0.20
        });
        rect.name = `${rectNo}`;
        rect.id = `${rectNo}`;
        this.canvas.add(rect);
        this.canvas.setActiveObject(rect);
        }else {
            alert('그만!! 제발 그만!!!!');
        }
    }

    deleteObject = (rectNo) => {
        let obj = 0;
        this.canvas.getObjects().forEach(function( o) {
            console.log("o : " +o.id);
            if(o.id == rectNo) {
                obj = o;
            }
        })
        this.canvas.remove(obj);
    }

    SelectObject = (j) => {
        let obj = 0;
        this.canvas.getObjects().forEach(function( o) {
            console.log("o : " +o.id);
            if(o.id === j) {
                obj = o;
            }
        })
        this.canvas.setActiveObject(obj);
        this.canvas.renderAll();
    }

    submit = () => {
        // let b =this.canvas.getObjects().count();
        // console.log(b);
        let a = 0;
        this.canvas.getObjects().forEach(function(o) {
            a+=1;
        })
        for (let j =0; j < a ; j++){
            console.log(this.canvas.item(j).id);
            console.log(this.canvas.item(j).left);
            console.log(this.canvas.item(j).top);
            console.log(this.canvas.item(j).width);
            console.log(this.canvas.item(j).height);
            console.log(this.canvas.item(j).scaleX);
            console.log(this.canvas.item(j).scaleY);
        }
    }

    render() {
        const { classes } = this.props;
        const { uploadFile} = this.props.fileUploadStore;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={5} style={{margin:"auto", display:"block"}}>
                            <div style ={{ backgroundColor : "#13264E"}}>
                                <canvas id="c" width= "600" height= "550"  >  </canvas>
                            </div>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <div className={classes.mainContent}>
                                <Typography variant="h4" component="h2">
                                    영역 지정
                                </Typography>
                                <Paper className={classes.root}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>영역</TableCell>
                                                <TableCell>추가버튼</TableCell>
                                                <TableCell>삭제버튼</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            <TableRow>
                                                <TableCell>상의 영역</TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        onClick={() => this.addRect(1) } >
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteObject(1)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>하의 영역</TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        onClick={() => this.addRect(2) } >
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteObject(2)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
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
                                                        onClick={() => this.addRect(3) } >
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                        <Tooltip title="Delete">
                                                            <IconButton aria-label="delete" onClick={() => this.deleteObject(3)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
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
                                                        onClick={() => this.addRect(4) } >
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteObject(4)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>악세사리 영역</TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        onClick={() => this.addRect(5) } >
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteObject(5)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
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

export default withSnackbar(withRouter(withStyles(styles) (BoundaryBox)));