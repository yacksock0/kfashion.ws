import React, { Component, ReactDOM } from 'react';
import {fabric} from 'fabric';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {Container, Toolbar, Typography, Button, Grid} from "@material-ui/core";
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


@inject('fileUploadStore')
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
        // this.canvas.setBackgroundImage('/Users/youngrackchoi/uploadfiles/cloth.jpg');
        this.canvas.setBackgroundImage('https://placeimg.com/550/600/any');

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
    handleChangeUploadFile = (event) => {
        const file = event.target.files[0];

        this.props.fileUploadStore.changeUploadFile(file,this.props.id);
    }
    handleOk = () => {
        this.props.fileUploadStore.addNewImg();
    }

    addRect = () => {
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            width: 200,
            height: 200,
            fill: grey,
            opacity: 0.20
        });
        rect.name =`${this.i}`;
        rect.id =`${this.i}`;
        this.canvas.add(rect);
        this.canvas.setActiveObject(rect);

        const label = document.createElement('Label');
        label.innerText = `rect ${this.i + 1}`;

        const button = document.createElement('Button');
        button.innerText = `지우기`;
        button.id = `${this.i}`;
        button.onclick = () => {this.deleteObject(`${button.id }`)};

        const button2 = document.createElement('Button');
        button2.innerText = `선택`;
        button2.onclick = () => {this.SelectObject(`${button.id }`)};

        const br = document.createElement('br');
        const div = document.createElement('div');
        div.id =  `rect ${this.i + 1}`;

        const labelList = document.getElementById('labelList');
        labelList.append(div);

        const divId = document.getElementById(`rect ${this.i + 1}`);
        divId.append(label, button2, button, br );

        this.i +=1;
    }



    deleteObject = (j) => {
        console.log("j : " + j);
        let obj = 0;
        if(j == -1){
            this.canvas.remove( this.canvas.getActiveObject());
        }
        this.canvas.getObjects().forEach(function( o) {
            console.log("o : " +o.id);
            if(o.id == j) {
                console.log("o????" +o.id);
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
        let a = 0;
        this.canvas.getObjects().forEach(function(o) {
            a+=1;
        })

        for (let j =0; j < a ; j++){
            console.log(j);
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
                    <div className={classes.divStyle}>                                          {/* style={{backgroundColor :'green'}}  */}
                        <Tooltip title="Add" aria-label="add" onClick={ () => this.addRect()} >
                            <Fab color="white" className={classes.fab}>
                                <AddIcon/>
                            </Fab>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton aria-label="delete" onClick={() => this.deleteObject(-1)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>

                        <div style ={{ backgroundColor : "#13264E"}}>
                            <canvas id="c" width= "750" height= "750"  >  </canvas>
                        </div>

                        <div style={{backgroundColor :'grey'}}>
                            <div align = "right">
                                <Button onClick={this.submit} >submit </Button>
                            </div>
                        </div>
                    </div>

                    <div id={"labelList"} className={classes.divStyle}>
                    </div>
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