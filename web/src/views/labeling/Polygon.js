import React, { Component, ReactDOM } from 'react';
import {fabric} from 'fabric';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

import {Container, Toolbar, Typography, Button, Grid} from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import SaveIcon from '@material-ui/icons/Save';
import {inject, observer} from "mobx-react";
import PolygonList from "./PolygonList";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ErrorIcon from "@material-ui/icons/Error";

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
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
        width: 80,
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
    toolBox:{
        border:'1px solid black',
        marginRight: 1,
        height:'100%',
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




@inject('rectStore','imageStore', 'rectStore','authStore','polygonStore', 'currentStepStore')
@observer
class Polygon extends React.Component {
    state = {
        imgData :'',
        workNo:0,
        value:1,
        finishbtn : false,
        savebtn : true,
        buttonDis1 : false,
        buttonDis2 : false,
        buttonDis3 : false,
        buttonDis4 : false,
        buttonDis5 : true,
        buttonDis6 : true,
        buttonDis7 : true,
        tabIndex: 1,
        listIndex:0,
    }
    save1 = false;
    save2 = false;
    save3 = false;
    save4 = false;
    save5 = true;
    save6 = true;
    save7 = true;

    polygonIndex = 0;
    polygon = [{
        polyNo : '',
        points: [{
            x: 0,
            y: 0,
        }]
    }];
    rectangle = [{
        id : '',
        left : '',
        top : '',
        width : '',
        height : '',
        scaleX : '',
        scaleY : '',
    }];

    canvas;
    polyNo;
    polyPointX = [];
    polyPointY = [];

    rectTop;
    rectLeft;
    rectWidth;
    rectHeight;
    rectScaleX;
    rectScaleY;

    x;
    y;
    lineTwoPoint=[];
    lineCounter = 0;
    polyCounter = 0;
    onOff = '';
    onOff2 = 1;
    i=0;




    // Wheel Scale Test
    delta;
    zoom;

    componentDidMount() {
        let radius = 100,
            x = 300,
            y = 300,
            lens,
            img1,
            scale = 2,
            originalWidth = 600,
            originalHeight = 600;



        this.props.currentStepStore.setStep(1);
        this.props.enqueueSnackbar("Polygon Work", {
            variant: 'info'
        });
        this.setState({
            boundaryList: this.props.imageStore.boundaryList,
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })
        // canvas Drawing
        this.canvas = new fabric.Canvas('c');

        // let canvas = this.canvas;
        // canvas.on('mouse:wheel', function(opt) {
        //     let delta = opt.e.deltaY;
        //     let zoom = canvas.getZoom();
        //     zoom *= 0.999 ** delta;
        //     if (zoom > 10) zoom = 10;
        //     if (zoom < 0.1) zoom = 0.1;
        //     canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        //     opt.e.preventDefault();
        //     opt.e.stopPropagation();
        // })
        // this.canvas = canvas;




        this.canvas.on('mouse:down', (e) => {
            if (this.onOff == 'lineUse') {
                this.canvas.selection = false;
                this.polyPointX[this.polyCounter] = this.canvas.getPointer(e, false).x;
                this.polyPointY[this.polyCounter] = this.canvas.getPointer(e, false).y;

                this.lineTwoPoint = [this.x, this.y, this.canvas.getPointer(e, false).x, this.canvas.getPointer(e, false).y];
                this.x = this.canvas.getPointer(e, false).x;
                this.y = this.canvas.getPointer(e, false).y;

                let circle = new fabric.Circle({
                    type: 'circle',
                    id: this.polyCounter,
                    radius: 6,
                    fill: 'green',
                    left: this.canvas.getPointer(e, false).x - 3.5,
                    top: this.canvas.getPointer(e, false).y - 3.5,
                    selectable: false,
                    evented: false,
                });
                this.canvas.add(circle);
                // this.canvas.bringToFront(circle);
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
    }

    changeWorkNo = (workNo) => {
        this.setState({ workNo : workNo});
    }

    startPoly = (polyNo) => {
        // this.zoomAction(this.state.workNo);
        // this.polygonIndex +=1;
        this.onOff = 'lineUse';
        this.state.savebtn = true;
        this.polyNo = polyNo;
        this.setState({
            buttonDis1: true,
            buttonDis2: true,
            buttonDis3: true,
            buttonDis4: true,
        });
        console.log(polyNo);
        switch (polyNo) {
            case 1 : console.log('1'); this.setState({buttonDis1: false}); break;
            case 2 : console.log('2');this.setState({buttonDis2: false}); break;
            case 3 : console.log('3');this.setState({buttonDis3: false}); break;
            case 4 : console.log('4');this.setState({buttonDis4: false}); break;
        }
    }

    deleteOne = () => {
        let j = (this.polyCounter);
        let line = 0;
        let circle = 0;
        this.canvas.getObjects().forEach(function( o) {
            if(o.id == j-2 && o.type == 'line')     line = o;
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

    delete = (b) => {
        let result = window.confirm("모두 지우시겠습니까?");
        if(result){
            this.deleteAll(1);
        }
    }
    deleteAll = (b) =>{
        let objList = [];
        this.canvas.getObjects().forEach(function (o) {
            objList.push(o);
        })
        for (let i = 0; i <= objList.length; i++) {
            this.canvas.remove(objList[i]);
        }
        if( b != -1) {
            console.log(b);
            this.x = 0;
            this.y = 0;
            this.polyCounter =0;
            this.lineCounter =0;
            this.polyPointX.length =0;
            this.polyPointY.length =0;
            this.buttonState();
        }
        this.zoomOFF();
    }

    buttonState = () => {
        this.setState({
            buttonDis1: this.save1,
            buttonDis2: this.save2,
            buttonDis3: this.save3,
            buttonDis4: this.save4,
        });
    }

    finishPath = () => {
        if(this.canvas.getObjects().length !=0) {
            this.canvas.setViewportTransform([1,0,0,1,0,0]);
            console.log("여기는 피니시");
            this.onOff = '';
            let makePath = 'M' + this.polyPointX[0] + ' ' + this.polyPointY[0];
            for (let i = 1; i < this.polyCounter; i++) {
                makePath += ' L ' + this.polyPointX[i] + ' ' + this.polyPointY[i];
            }
            makePath += ' z';
            let path = new fabric.Path(makePath);
            path.opacity = 0.5;
            this.deleteAll(-1);
            this.canvas.add(path);
            this.state.finishbtn = true;

            this.rectTop = path.top;
            this.rectLeft = path.left;
            this.rectHeight = path.height;
            this.rectWidth = path.width;
            this.rectScaleY = path.scaleY;
            this.rectScaleX = path.scaleX;

            const rect = new fabric.Rect({
                id : this.polyNo,
                left: path.left,
                top:  path.top,
                width: path.width,
                height: path.height,
                scaleY: path.scaleY,
                scaleX: path.scaleX,
                opacity: 0.2,
                strokeWidth: 2,
                stroke: "#880E4F",
            });
            this.canvas.add(rect);
        }else{
            alert("입력된 polygon이 존재하지 않습니다.");
        }
    }

    doSave = (newPolyNo) => {
        const newPolygon = {
            polyNo:'',
            points: [{
            }],
        };
        const newRectangle = [{
            id : 0,
            left : 0,
            top : 0,
            width : 0,
            height : 0,
            scaleX : 0,
            scaleY : 0,
        }];
        if(this.state.finishbtn) {
            if (this.canvas.getObjects().length != 0) {
                this.rectangle.push({
                    id: this.polyNo,
                    left: this.rectLeft,
                    top: this.rectTop,
                    width: this.rectWidth,
                    height: this.rectHeight,
                    scaleX:  this.rectScaleX,
                    scaleY:  this.rectScaleY,
                });
                newPolygon.polyNo = newPolyNo;
                for(let i in this.polyPointX) {
                    const x = this.polyPointX[i];
                    const y = this.polyPointY[i];
                    newPolygon.points.push({x: x, y: y});
                }
                this.polygon.push(newPolygon);
                this.state.savebtn = false;
                this.deleteAll(newPolyNo);

                switch (newPolyNo) {
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
                }
                this.buttonState();
            } else {
                alert("입력된 polygon이 존재하지 않습니다.");
            }
            this.state.finishbtn = false;
        }else{
            alert("finish를 눌러 작업을 마무리 하세요.");
        }
    }

    // -- Location Data 저장
    submit = () =>{
        if(this.state.workNo != 0) {
            const check = window.confirm("이미지에 필요한 탭의 정보를 입력하셨습니까?");
            if (check) {
                console.log(this.polygon);
                if (this.onOff != "") {
                    alert("finish를 눌러 작업을 마무리 하세요.");
                } else if (this.state.savebtn) {
                    alert("save 눌러 작업을 마무리 하세요.");
                } else {
                    // -- RectLocation 저장
                    this.props.rectStore.objGet(this.rectangle, this.polygon);
                    this.props.rectStore.changeNewRectLocationCreatedId(this.props.authStore.loginUser.id);
                    this.props.rectStore.changeNewRectLocationWorkNo(this.props.imageStore.isWorkNo);
                    this.props.rectStore.doRectLocationUp(this.changeWorkNo);
                    // -- PolygonLocation 저장
                    // this.props.polygonStore.objGet(this.polygon);
                    // this.props.polygonStore.changeNewPolygonLocationCreatedId(this.props.authStore.isUserId);
                    // this.props.polygonStore.changeNewPolygonLocationWorkNo(this.props.imageStore.isWorkNo);
                    // this.props.polygonStore.doPolygonLocationUp();

                    this.deleteAll(1);
                    this.save1 = false;
                    this.save2 = false;
                    this.save3 = false;
                    this.save4 = false;
                    this.buttonState();
                    // -- Tap Menu List로 전환
                    this.setState({
                        tabIndex: 1,
                        workNo: 0
                    });
                }
            }
        }
    }


    zoomON = () =>{
        this.zoomAction(this.state.workNo);
    }
    zoomOFF = () =>{
        let lens = null;
        this.canvas.getObjects().forEach(function( o) {
            console.log("o : "+ o);
            if(o.id == "lens")     lens = o;
        })
        console.log(lens);
        this.canvas.remove(lens);
        this.canvas.off('mouse:move');
    }

    zoomAction=(workNo)=> {
        let canvas = this.canvas;
        let radius = 100,
            x = 400,
            y = 400,
            lens,
            img1,
            scale = 2,
            originalWidth = 800,
            originalHeight = 800,
            zoomBtn = this.state.zoomBtn;
        fabric.Image.fromURL(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, function(img) {
            img1 = img;
            img.set({
                width: originalWidth,
                height: originalHeight,
                evented: false,
                selectable: false
            });

            lens = fabric.util.object.clone(img);
            lens.set({
                id : "lens",
                top: -225,
                left: 150,
                width: scale * originalWidth,
                height: scale * originalHeight,
                clipTo: function(ctx) {
                    ctx.arc(-this.left + x - this.width / 2, -this.top + y - this.height / 2, radius, 0, Math.PI * 2, true);
                }
            });

            canvas.setBackgroundImage(img);
            canvas.add(lens);
            canvas.centerObject(img);//******* issue no longer here****

        });
        this.canvas = canvas;
        this.canvas.renderAll.bind(canvas);

        this.canvas.on('mouse:move', function(e) {

                x = canvas.getPointer(e, false).x;
                y =  canvas.getPointer(e, false).y;
                if (x > 0 && x < 800) {
                    lens.set('left', -(scale - 1) * x );
                    lens.set('top', -(scale - 1) * y);
                }
                console.log(lens);
                canvas.bringToFront(lens);
                canvas.renderAll();
        });
    }
    handleClickItem = (workNo, imageData) => {
        let check = true;
        if(this.state.workNo != 0){
            check = window.confirm("작업을 변경하면 입력한 값이 초기화 됩니다. 변경하시겠습니까?");
        }
        if(check) {
            this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
            this.setState({tabIndex: 0, workNo: workNo});
            this.props.rectStore.LoadRectLocation(workNo);
            this.props.rectStore.changeNewRectLocationWorkNo(workNo);
            this.props.imageStore.changeWorkNo(workNo);

            this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
                top: 0,
                left: 0,
                width: 800,
                height: 800,
                scaleX: 1,
                scaleY: 1,
                originX: 'left',
                originY: 'top'
            });

            this.setState({
                tadIndex: 1,
            })
            this.polygon.length = 0;
            this.rectangle.length = 0;
            this.deleteAll(1);
            this.save1 = false;
            this.save2 = false;
            this.save3 = false;
            this.save4 = false;
            this.buttonState();
        }
    }

    handleStepView = () =>{
        console.log("stepView");
    }
    handleListChange=(listIndex)=>{
        this.setState({
            listIndex:listIndex,
        })
    }
    // btnReset = () =>{
    //     this.canvas.setViewportTransform([1,0,0,1,0,0]);
    // }

    onSelectTap = (tabIndex) => {
        if(this.state.workNo != 0 ){
            this.setState({tabIndex : tabIndex});
        }else{
            alert("이미지 리스트 탭에서 작업할 이미지를 선택해주세요.");
        }
    }

    render() {
        const { classes,history } = this.props;
        const {isWorkNo} = this.props.imageStore;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer}/>
                <div className={classes.mainContent}>
                    <Grid container>
                        <Grid item xs={12} lg={5} xl={5}>
                            <div>
                                {/*<Button id="btnReset" onClick={this.btnReset}>Zoom reSet</Button>*/}
                                <Button
                                    onClick={this.zoomON}
                                    disabled={this.state.workNo ==0}
                                >
                                    돋보기 켜기
                                </Button>
                                <Button
                                    onClick={this.zoomOFF}
                                    disabled={this.state.workNo ==0}
                                >
                                    돋보기 끄기
                                </Button>
                                <canvas id="c" width={800} height={800}>  </canvas>
                            </div>
                        </Grid>

                        <Grid item xs={12} lg={5} xl={6} style={{marginLeft:'auto'}}>
                            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.onSelectTap( tabIndex )}>
                                <TabList>
                                    <Tab tabIndex={0} style={{width: '50%', height:60,textAlign:'center'}}><h3>영역지정</h3></Tab>
                                    <Tab tabIndex={1} style={{width: '50%', height:60,textAlign:'center'}}><h3>이미지 리스트</h3></Tab>
                                </TabList>

                                <TabPanel value={this.state.value} index={0}>
                                    <Table >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{textAlign:"center"}}>영역</TableCell>
                                                <TableCell style={{textAlign:"center"}}>시작</TableCell>
                                                <TableCell style={{textAlign:"center"}}>종료</TableCell>
                                                <TableCell style={{textAlign:"center"}}>삭제</TableCell>
                                                <TableCell style={{textAlign:"center"}}>전부삭제</TableCell>
                                                <TableCell style={{textAlign:"center"}}>저장</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            <TableRow>
                                                <TableCell style={{textAlign:"center"}}><b>아우터 영역</b></TableCell>
                                                <TableCell style={{textAlign:"center"}}>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Draw Polygon"
                                                        onClick={() => this.startPoly(1) }
                                                        disabled={this.state.buttonDis1}>
                                                        start <AddIcon/>
                                                    </Button>
                                                </TableCell>

                                                <TableCell style={{textAlign:"center"}}>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="finish"
                                                        onClick={() => this.finishPath() }
                                                        disabled={this.state.buttonDis1}>
                                                        finish
                                                    </Button>
                                                </TableCell>

                                                <TableCell style={{textAlign:"center"}}>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteOne()} disabled={this.state.buttonDis1}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>

                                                <TableCell style={{textAlign:"center"}}>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.delete(1) }
                                                        disabled={this.state.buttonDis1}>
                                                        All<DeleteIcon />
                                                    </Button>
                                                </TableCell>

                                                <TableCell style={{textAlign:"center"}}>
                                                    <Tooltip title="Save">
                                                        <IconButton aria-label="save" onClick={() => this.doSave(1)} disabled={this.state.buttonDis1}>
                                                            save <SaveIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>


                                        <TableBody>
                                            <TableRow >
                                                <TableCell style={{textAlign:"center"}}><b>상의 영역</b></TableCell>
                                                <TableCell style={{textAlign:"center"}}>
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
                                                <TableCell style={{textAlign:"center"}}>
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
                                                <TableCell style={{textAlign:"center"}}>
                                                    <Tooltip title="Delete">
                                                        <IconButton  aria-label="delete" onClick={() => this.deleteOne()} disabled={this.state.buttonDis2}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell style={{textAlign:"center"}}>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.delete(2) }
                                                        disabled={this.state.buttonDis2}>
                                                        All<DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell style={{textAlign:"center"}}>
                                                    <Tooltip title="Save">
                                                        <IconButton aria-label="save" onClick={() => this.doSave(2)} disabled={this.state.buttonDis2}>
                                                            save <SaveIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableBody >
                                            <TableRow>
                                                <TableCell style={{textAlign:"center"}}><b>하의 영역</b></TableCell>
                                                <TableCell style={{textAlign:"center"}}>
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
                                                <TableCell style={{textAlign:"center"}}>
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
                                                <TableCell style={{textAlign:"center"}}>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteOne()} disabled={this.state.buttonDis3}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell style={{textAlign:"center"}}>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.delete(3) }
                                                        disabled={this.state.buttonDis3}>
                                                        All<DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell style={{textAlign:"center"}}>
                                                    <Tooltip title="Save">
                                                        <IconButton aria-label="save" onClick={() => this.doSave(3)} disabled={this.state.buttonDis3}>
                                                            save <SaveIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>

                                        <TableBody>
                                            <TableRow >
                                                <TableCell style={{textAlign:"center"}}><b>원피스 영역</b></TableCell>
                                                <TableCell style={{textAlign:"center"}}>
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
                                                <TableCell style={{textAlign:"center"}}>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="finish"
                                                        onClick={() => this.finishPath() }
                                                        disabled={this.state.buttonDis4}>
                                                        finish
                                                    </Button>
                                                </TableCell>
                                                <TableCell style={{textAlign:"center"}}>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteOne()} disabled={this.state.buttonDis4}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell style={{textAlign:"center"}}>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.delete(4) }
                                                        disabled={this.state.buttonDis4}>
                                                        All<DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell style={{textAlign:"center"}}>
                                                    <Tooltip title="Save">
                                                        <IconButton aria-label="save" onClick={() => this.doSave(4)} disabled={this.state.buttonDis4}>
                                                            save <SaveIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        {/*<TableBody>*/}
                                        {/*    <TableRow>*/}
                                        {/*        <TableCell>신발 영역</TableCell>*/}
                                        {/*        <TableCell>*/}
                                        {/*            <Button*/}
                                        {/*                type="submit"*/}
                                        {/*                className={classes.buttonType1}*/}
                                        {/*                variant="outlined"*/}
                                        {/*                title="Draw Polygon"*/}
                                        {/*                onClick={() => this.startPoly(5) }*/}
                                        {/*                disabled={this.state.buttonDis5}>*/}
                                        {/*                start <AddIcon/>*/}
                                        {/*            </Button>*/}
                                        {/*        </TableCell>*/}
                                        {/*        <TableCell>*/}
                                        {/*            <Button*/}
                                        {/*                type="submit"*/}
                                        {/*                className={classes.buttonType1}*/}
                                        {/*                variant="outlined"*/}
                                        {/*                title="finish"*/}
                                        {/*                onClick={() => this.finishPath() }*/}
                                        {/*                disabled={this.state.buttonDis5}>*/}
                                        {/*                finish*/}
                                        {/*            </Button>*/}

                                        {/*        </TableCell>*/}
                                        {/*        <TableCell>*/}
                                        {/*            <Tooltip title="Delete">*/}
                                        {/*                <IconButton aria-label="delete" onClick={() => this.deleteOne()} disabled={this.state.buttonDis5}>*/}
                                        {/*                    <DeleteIcon />*/}
                                        {/*                </IconButton>*/}
                                        {/*            </Tooltip>*/}
                                        {/*        </TableCell>*/}
                                        {/*        <TableCell>*/}
                                        {/*            <Button*/}
                                        {/*                type="submit"*/}
                                        {/*                className={classes.buttonType1}*/}
                                        {/*                variant="outlined"*/}
                                        {/*                title="Delete All"*/}
                                        {/*                onClick={() => this.delete(5) }*/}
                                        {/*                disabled={this.state.buttonDis5} >*/}
                                        {/*                All<DeleteIcon />*/}
                                        {/*            </Button>*/}
                                        {/*        </TableCell>*/}
                                        {/*        <TableCell>*/}
                                        {/*            <Tooltip title="Save">*/}
                                        {/*                <IconButton aria-label="save" onClick={() => this.doSave(5)} disabled={this.state.buttonDis5}>*/}
                                        {/*                    save <SaveIcon />*/}
                                        {/*                </IconButton>*/}
                                        {/*            </Tooltip>*/}
                                        {/*        </TableCell>*/}
                                        {/*    </TableRow>*/}
                                        {/*</TableBody>*/}
                                        {/*<TableBody>*/}
                                        {/*    <TableRow>*/}
                                        {/*        <TableCell>가방 영역</TableCell>*/}
                                        {/*        <TableCell>*/}
                                        {/*            <Button*/}
                                        {/*                type="submit"*/}
                                        {/*                className={classes.buttonType1}*/}
                                        {/*                variant="outlined"*/}
                                        {/*                title="Draw Polygon"*/}
                                        {/*                onClick={() => this.startPoly(6) }*/}
                                        {/*                disabled={this.state.buttonDis6}>*/}
                                        {/*                start <AddIcon/>*/}
                                        {/*            </Button>*/}
                                        {/*        </TableCell>*/}
                                        {/*        <TableCell>*/}
                                        {/*            <Button*/}
                                        {/*                type="submit"*/}
                                        {/*                className={classes.buttonType1}*/}
                                        {/*                variant="outlined"*/}
                                        {/*                title="finish"*/}
                                        {/*                onClick={() => this.finishPath() }*/}
                                        {/*                disabled={this.state.buttonDis6} >*/}
                                        {/*                finish*/}
                                        {/*            </Button>*/}

                                        {/*        </TableCell>*/}
                                        {/*        <TableCell>*/}
                                        {/*            <Tooltip title="Delete">*/}
                                        {/*                <IconButton aria-label="delete" onClick={() => this.deleteOne()} disabled={this.state.buttonDis6}>*/}
                                        {/*                    <DeleteIcon />*/}
                                        {/*                </IconButton>*/}
                                        {/*            </Tooltip>*/}
                                        {/*        </TableCell>*/}
                                        {/*        <TableCell>*/}
                                        {/*            <Button*/}
                                        {/*                type="submit"*/}
                                        {/*                className={classes.buttonType1}*/}
                                        {/*                variant="outlined"*/}
                                        {/*                title="Delete All"*/}
                                        {/*                onClick={() => this.delete(6) }*/}
                                        {/*                disabled={this.state.buttonDis6}>*/}
                                        {/*                All<DeleteIcon />*/}
                                        {/*            </Button>*/}
                                        {/*        </TableCell>*/}
                                        {/*        <TableCell>*/}
                                        {/*            <Tooltip title="Save">*/}
                                        {/*                <IconButton aria-label="save" onClick={() => this.doSave(6)} disabled={this.state.buttonDis6}>*/}
                                        {/*                    save <SaveIcon />*/}
                                        {/*                </IconButton>*/}
                                        {/*            </Tooltip>*/}
                                        {/*        </TableCell>*/}
                                        {/*    </TableRow>*/}
                                        {/*</TableBody>*/}
                                        {/*<TableBody>*/}
                                        {/*    <TableRow >*/}
                                        {/*        <TableCell>악세사리 영역</TableCell>*/}
                                        {/*        <TableCell>*/}
                                        {/*            <Button*/}
                                        {/*                type="submit"*/}
                                        {/*                className={classes.buttonType1}*/}
                                        {/*                variant="outlined"*/}
                                        {/*                title="Draw Polygon"*/}
                                        {/*                onClick={() => this.startPoly(7) }*/}
                                        {/*                disabled={this.state.buttonDis7} >*/}
                                        {/*                start <AddIcon/>*/}
                                        {/*            </Button>*/}
                                        {/*        </TableCell>*/}
                                        {/*        <TableCell>*/}
                                        {/*            <Button*/}
                                        {/*                type="submit"*/}
                                        {/*                className={classes.buttonType1}*/}
                                        {/*                variant="outlined"*/}
                                        {/*                title="finish"*/}
                                        {/*                onClick={() => this.finishPath() }*/}
                                        {/*                disabled={this.state.buttonDis7}>*/}
                                        {/*                finish*/}
                                        {/*            </Button>*/}

                                        {/*        </TableCell>*/}
                                        {/*        <TableCell>*/}
                                        {/*            <Tooltip title="Delete">*/}
                                        {/*                <IconButton aria-label="delete" onClick={() => this.deleteOne()}  disabled={this.state.buttonDis7}>*/}
                                        {/*                    <DeleteIcon />*/}
                                        {/*                </IconButton>*/}
                                        {/*            </Tooltip>*/}
                                        {/*        </TableCell>*/}
                                        {/*        <TableCell>*/}
                                        {/*            <Button*/}
                                        {/*                type="submit"*/}
                                        {/*                className={classes.buttonType1}*/}
                                        {/*                variant="outlined"*/}
                                        {/*                title="Delete All"*/}
                                        {/*                onClick={() => this.delete(7) }*/}
                                        {/*                disabled={this.state.buttonDis7}>*/}
                                        {/*                All<DeleteIcon />*/}
                                        {/*            </Button>*/}
                                        {/*        </TableCell>*/}
                                        {/*        <TableCell>*/}
                                        {/*            <Tooltip title="Save">*/}
                                        {/*                <IconButton aria-label="save" onClick={() => this.doSave(7)} disabled={this.state.buttonDis7}>*/}
                                        {/*                    save <SaveIcon />*/}
                                        {/*                </IconButton>*/}
                                        {/*            </Tooltip>*/}
                                        {/*        </TableCell>*/}
                                        {/*    </TableRow>*/}
                                        {/*</TableBody>*/}
                                    </Table>

                                    <div style={{backgroundColor: 'grey'}}>
                                        <div align="center">
                                            <Button onClick={this.submit}  style={{color:'white', minHeight:70,  fontSize:20, width:'100%', height:'100%' }} >작업 완료 </Button>
                                        </div>
                                    </div>

                                </TabPanel>
                                <TabPanel value={this.state.value} index={1}>
                                    <PolygonList onClick={this.handleClickItem} onChange={this.handleListChange}/>
                                </TabPanel>
                            </Tabs>
                        </Grid>

                    </Grid>

                </div>

                {/*Stepper*/}

                <div>
                    <hr></hr>
                    {/*<Button*/}
                    {/*    type="submit"*/}
                    {/*    className={classes.buttonType1}*/}
                    {/*    variant="outlined"*/}
                    {/*    onClick={this.handleSubmitForm} >*/}
                    {/*    Previous*/}
                    {/*</Button>*/}
                    {/*<Button*/}
                    {/*    type="submit"*/}
                    {/*    className={classes.buttonType1}*/}
                    {/*    variant="outlined"*/}
                    {/*    onClick={this.handleSubmitForm} >*/}
                    {/*    Next*/}
                    {/*</Button>*/}

                    <Button
                        type="button"
                        className={classes.buttonType2}
                        color="primary"
                        variant="outlined"
                        onClick={()=>{this.state.listIndex === 0 ? (history.push('/step2')) :alert('리스트에 남은 작업이 있습니다.')} }
                    >
                        Next Step
                    </Button>
                </div>
                <ErrorIcon/>
                <Typography variant="h6" component="h4" style={{display:'inline'}}>
                    우측 상단에 이미지리스트에서 작업 할 이미지 선택 / 각 영역 별 START버튼을 통해 영역지정 완료 후 FINISH 버튼 클릭 (삭제 버튼을 통해 한 점씩, 또는 전부삭제 버튼을 클릭해 삭제가능) / 필요한 영역의 작업이 모두 완료되면 작업완료 버튼 클릭
                </Typography>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Polygon)));