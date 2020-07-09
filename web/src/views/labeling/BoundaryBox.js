import React, { Component, ReactDOM } from 'react';
import {fabric} from 'fabric';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {Container, Toolbar, Typography, Button, Grid} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import ImageList from "./ImageList";
import SaveIcon from "@material-ui/icons/Save";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const styles = theme => ({
    root: {
        width: "80%",
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
        maxWidth:'80%',
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
        width:'100%',
        minWidth:'100%',
        height:'100vh',
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

@inject('fileUploadStore','imageStore','rectStore','authStore')
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
    id;

    downX;
    downY;
    upX;
    upY;
    onOff = '';

    save1 = false;
    save2 = false;
    save3 = false;
    save4 = false;
    save5 = false;

    objectList = [];
    state = {
        tabIndex: 1,
        imgData :'',
        workNo:'',
        value:1,
        count:0,
        winheight: 0,
        winwidth: 0,
        savebtn : true,
        buttonDis1 : false,
        buttonDis2 : false,
        buttonDis3 : false,
        buttonDis4 : false,
        buttonDis5 : false,
    }
    handleTabChange = (event, newIndex) => {
        this.setState({ tapIndex: newIndex });
    }
    componentDidMount() {
        this.props.enqueueSnackbar("BoundaryBox Work", {
            variant: 'info'
        });
        this.setState({
            boundaryList: this.props.imageStore.boundaryList,
        })

        this.canvas = this.__canvas = new fabric.Canvas('c');
        this.canvas.selection = false;
        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.cornerColor = 'blue';
        fabric.Object.prototype.hasRotatingPoint = false;

        this.canvas.on('mouse:down', function (e) {
            this.downX = e.pointer.x;
            this.downY = e.pointer.y
        });

        this.canvas.on('mouse:up', function(e) {
            if (this.selection) {
                let upX = e.pointer.x;
                let upY = e.pointer.y;
                let width = (upX- this.downX);
                let height = (upY - this.downY);
                let id = this.id;

                const rect = new fabric.Rect({
                    id: id,
                    left: this.downX,
                    top:  this.downY,
                    width: width,
                    height: height,
                    opacity: 0.2,
                    strokeWidth: 2,
                    stroke: "#880E4F",

                });
                // rect.fill = 'yellow';
                this.add(rect);
                this.setActiveObject(rect);
                this.selection = false;
                console.log(rect);
                // this.add(upX, upY, width, height);
            }
        });

        const maxScaleX = 3.2;
        const maxScaleY = 3.2;
        this.canvas.on('object:scaling', function (e) {
            const obj = e.target;
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

            if(obj.scaleX > maxScaleX) {
                obj.scaleX = maxScaleX;
                obj.left = obj.lastGoodLeft;
                obj.top = obj.lastGoodTop;
            }
            if(obj.scaleY > maxScaleY) {
                obj.scaleY = maxScaleY;
                obj.left = obj.lastGoodLeft;
                obj.top = obj.lastGoodTop;
            }
            obj.lastGoodTop = obj.top;
            obj.lastGoodLeft = obj.left;
        });
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
        // --END  < rect가 canvas를 못벗어나도록... >
    }

    addRect = (rectNo) => {
        this.state.savebtn = true;
        let obj = 0;
        this.canvas.getObjects().forEach(function( o) {
            if(o.id == rectNo) {
                obj = o;
            }
        })
        if(obj==0){
            this.canvas.id= rectNo;
            this.onOff = 'rectUse';
            this.id = rectNo;
            this.canvas.selection = true;
        }else {
            alert('이미 존재합니다.');
        }
        this.setState({
            buttonDis1: true,
            buttonDis2: true,
            buttonDis3: true,
            buttonDis4: true,
            buttonDis5: true,
        });
        console.log(rectNo);
        switch (rectNo) {
            case 1 : console.log('1'); this.setState({buttonDis1: false}); break;
            case 2 : console.log('2');this.setState({buttonDis2: false}); break;
            case 3 : console.log('3');this.setState({buttonDis3: false}); break;
            case 4 : console.log('4');this.setState({buttonDis4: false}); break;
            case 5 : console.log('5');this.setState({buttonDis5: false}); break;
        }
    }

    delete = () => {
        let result = window.confirm("삭제하시겠습니까?");
        if(result){
            this.deleteAll();
        }
    }

    deleteAll = () =>{
        let objList = [];
        this.canvas.getObjects().forEach(function (o) {
            objList.push(o);
        })
        for (let i = 0; i <= objList.length; i++) {
            this.canvas.remove(objList[i]);
        }
        this.buttonState();
    }

    doSave = (rectNo) => {
        let objList;
        this.canvas.getObjects().forEach(function (o) {
            if(o.id == rectNo){
                objList = o;
            }
        })
        this.objectList.push(objList);
        this.state.savebtn = false;
        this.deleteAll();
        switch (rectNo) {
            case 1 :
                console.log('1');
                this.save1 = true;
                break;
            case 2 :
                console.log('2');
                this.save2 = true;
                break;
            case 3 :
                console.log('3');
                this.save3 = true;
                break;
            case 4 :
                console.log('4');
                this.save4 = true;
                break;
            case 5 :
                console.log('5');
                this.save5 = true;
                break;
        }
        this.buttonState();
    }

    buttonState = () => {
        this.setState({
            buttonDis1: this.save1,
            buttonDis2: this.save2,
            buttonDis3: this.save3,
            buttonDis4: this.save4,
            buttonDis5: this.save5,
        });
    }

    submit = () => {
        if(this.state.savebtn){
            alert("save 눌러 작업을 마무리 하세요.");
        }else{
            alert("저장되었습니다.");
            this.state.savebtn = false;
            this.props.rectStore.objGet(this.objectList);
            this.props.rectStore.changeNewRectLocationCreatedId(this.props.authStore.loginUser.id);
            this.props.rectStore.changeNewRectLocationWorkNo(this.props.imageStore.isWorkNo);
            this.props.rectStore.doRectLocationUp();
            this.setState({
                tabIndex: 1,
            });
        }


    }

    handlePrevious(){
        this.setState({
            count: this.state.count-1
        });
        {this.state.boundaryList.length - this.state.count >=0 ?this.props.imageStore.changeWorkNo(this.state.boundaryList[this.state.count].workNo)
            : alert("첫번째 이미지 입니다.")
        }
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
            workNo: this.props.imageStore.workNo
        })
    }
    handleNext() {
        this.setState({
            count: this.state.count+1
        });
        {this.state.count < this.state.boundaryList.length ?
            this.props.imageStore.changeWorkNo(this.state.boundaryList[this.state.count].workNo)
            :alert("마지막 이미지 입니다.")
        }
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
            workNo: this.props.imageStore.workNo
        })
    }

    handleClickItem = (workNo, imageData) => {
        this.setState({tabIndex:0,
        });
        this.state.tabIndex=0;
        let result = true;
        if (this.objectList.length != 0 && result) {
            result = window.confirm("다른작업을 하시겠습니까?");
        }
        if (result) {
            this.props.imageStore.changeWorkNo(workNo);
            this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
                width: 750,
                height: 850,
                originX: 'left',
                originY: 'top'
            });
            this.objectList.length =0;
            this.save1 = false;
            this.save2 = false;
            this.save3 = false;
            this.save4 = false;
            this.save5 = false;
        }
    }

    render() {
        const { classes,history } = this.props;
        const {workNo} = this.props.imageStore;

        return (
            <Container component="main" className={classes.mainContainer} style={{height:'97vh'}}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={6} style={{margin:"auto", display:"block"}}>
                            <div>
                                <canvas id="c" width= "750" height= "850"  >  </canvas>
                            </div>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                                <TabList>
                                    <Tab tabIndex={0} style={{width: '50%', height:60,textAlign:'center'}} ><h3>영역지정</h3></Tab>
                                    <Tab tabIndex={1} style={{width: '50%', height:60,textAlign:'center'}} ><h3>이미지 리스트</h3></Tab>
                                </TabList>
                                <TabPanel index={0}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>영역</TableCell>
                                                <TableCell>추가버튼</TableCell>
                                                <TableCell>삭제버튼</TableCell>
                                                <TableCell>저장버튼</TableCell>
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
                                                        onClick={() => this.addRect(1) }
                                                        disabled={this.state.buttonDis1}>
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.delete()} disabled={this.state.buttonDis1}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Save">
                                                        <IconButton aria-label="save" onClick={() => this.doSave(1)} disabled={this.state.buttonDis1}>
                                                            save <SaveIcon />
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
                                                        onClick={() => this.addRect(2) }
                                                        disabled={this.state.buttonDis2}>
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.delete()} disabled={this.state.buttonDis2}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Save">
                                                        <IconButton aria-label="save" onClick={() => this.doSave(2)} disabled={this.state.buttonDis2}>
                                                            save <SaveIcon />
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
                                                        onClick={() => this.addRect(3) } disabled={this.state.buttonDis3}>
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.delete()} disabled={this.state.buttonDis3}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Save">
                                                        <IconButton aria-label="save" onClick={() => this.doSave(3)} disabled={this.state.buttonDis3}>
                                                            save <SaveIcon />
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
                                                        onClick={() => this.addRect(4) } disabled={this.state.buttonDis4}>
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.delete()} disabled={this.state.buttonDis4}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Save">
                                                        <IconButton aria-label="save" onClick={() => this.doSave(4)} disabled={this.state.buttonDis4}>
                                                            save <SaveIcon />
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
                                                        onClick={() => this.addRect(5) } disabled={this.state.buttonDis5}>
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.delete()} disabled={this.state.buttonDis5}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Save">
                                                        <IconButton aria-label="save" onClick={() => this.doSave(5)} disabled={this.state.buttonDis5}>
                                                            save <SaveIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>

                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    <div style={{backgroundColor: 'grey'}}>
                                        <div align="center">
                                            <Button onClick={this.submit}  style={{color:'white', minHeight:70,  fontSize:20, width:'100%', height:'100%' }} >작업 완료 </Button>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel index={1}>
                                    <ImageList onClick={this.handleClickItem} />
                                </TabPanel>
                            </Tabs>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <hr></hr>
                    {/*<Button*/}
                    {/*    type="submit"*/}
                    {/*    className={classes.buttonType1}*/}
                    {/*    variant="outlined"*/}
                    {/*    onClick={this.handlePrevious.bind(this)} >*/}
                    {/*    Previous*/}
                    {/*</Button>*/}
                    {/*<Button*/}
                    {/*    type="submit"*/}
                    {/*    className={classes.buttonType1}*/}
                    {/*    variant="outlined"*/}
                    {/*    onClick={this.handleNext.bind(this)} >*/}
                    {/*    Next*/}
                    {/*</Button>*/}
                    <Button
                        type="button"
                        className={classes.buttonType2}
                        color="primary"
                        variant="outlined"
                        onClick={()=>history.push('/step/polygon')}
                    >
                        Next Step
                    </Button>
                </div>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (BoundaryBox)));