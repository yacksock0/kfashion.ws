import React from 'react';
import {fabric} from 'fabric';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

import {Container, Typography, Button, Grid} from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
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
import {toJS} from "mobx";
import ImagePopupModal from "../../components/ImagePopupModal";

const styles = theme => ({
    root: {
        [theme.breakpoints.up('xl')]: {
            width: "80%",
        },
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    ErrorIcon: {
        dispaly : 'inline-block',
        verticalAlign : 'middle',
        fontSize : 26,
        marginBottom : 3,
        marginRight: 4
    },
    mainContainer: {
        [theme.breakpoints.up('xl')]: {
            maxWidth:'80%',
        },
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
        width: '118px',
        height:'46px',
        float:'right',
        color:'#00943b',
        border : '1px solid rgba(0,148,59,1)',
        display:'inline',
        marginLeft:15,

        "&:hover": {
            backgroundColor: 'rgba(69,206,124,0.15)',
            border : '1px solid rgba(0,148,59,1)'
            }
    },
    buttonType3:{
        float:'right',
        width: '118px',
        height:'46px',
        border : '1px solid rgba(0,0,0,1)',
        fontFamily: 'NotoSansCJKkr',
        fontSize: '15px',
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
    canvas:{
        [theme.breakpoints.up('xl')]: {
            zoom : "100%",
        },
        overflow:'auto',
        width: 800,
        height: 800,
        zoom : "100%",
        marginLeft:'auto',

    },
});




@inject('rectStore','imageStore','authStore','polygonStore', 'currentStepStore')
@observer
class Polygon extends React.Component {
    state = {
        comment : '',
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
        canvasWidth:0,
        canvasHeight : 0,
        zoom : "100%",
        tableSize : 6,
        eventKey1 : true,
        eventKey2 : true,
        eventKey3 : true,
        eventKey4 : true,
        imgtext: "선택한 이미지가 없습니다."
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
    // delta;
    // zoom;

    componentDidMount() {
        // let radius = 100,
        //     x = 300,
        //     y = 300,
        //     lens,
        //     img1,
        //     scale = 2,
        //     originalWidth = 600,
        //     originalHeight = 600;

        this.props.rectStore.doPolygonCompleteUp(this.props.authStore.isUserId,2);
        this.props.rectStore.selectedItemReset();
        this.props.currentStepStore.setStep(1);
        this.props.enqueueSnackbar("영역지정", {
            variant: 'success',
            anchorOrigin:{
                vertical: 'bottom',
                horizontal: 'left',
            }
        });
        this.setState({
            boundaryList: this.props.imageStore.boundaryList,
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })
        // canvas Drawing
        this.canvas = new fabric.Canvas('c');

        // let canvas = this.canvas;
        // canvas.on(
        //     'mouse:wheel', function(opt) {
        //
        //     let delta = opt.e.deltaY;
        //     let zoom = canvas.getZoom();
        //     zoom *= 0.999 ** delta;
        //     if (zoom > 10) zoom = 10;
        //     if (zoom < 0.1) zoom = 0.1;
        //     canvas.zoomToPoint({ x: 400, y: 400 }, zoom);
        //     opt.e.preventDefault();
        //     opt.e.stopPropagation();
        //
        //
        // })
        // this.canvas = canvas;

        document.addEventListener('keyup', eventKey => {
            if(this.state.workNo === 0 || this.state.tabIndex === 1){
                eventKey.preventDefault();
            }else {
                if (this.state.eventKey1 === false || this.state.eventKey2 === false || this.state.eventKey3 === false || this.state.eventKey4 === false) {
                    if (eventKey.key === "d" || eventKey.key === "ㅇ") {
                        this.deleteOne();
                    }
                }
                if (this.state.eventKey1 === false || this.state.eventKey2 === false
                    || this.state.eventKey3 === false || this.state.eventKey4 === false
                    || this.state.finishbtn === true) {
                    if (eventKey.key === "a" || eventKey.key === "ㅁ") {
                        this.delete(this.polyNo);
                    }
                }

                    if (eventKey.key === "1") {
                        this.setState({
                            eventKey2 : false,
                            eventKey3 : false,
                            eventKey4 : false,
                        })
                        if (this.state.eventKey1 === true) {
                            if (this.polygon.length !== 0 && this.polygon !== null && this.polygon !== undefined) {
                                for (let i = 0; i < this.polygon.length; i++) {
                                    if (this.polygon[i].polyNo === 1) {
                                        let result = window.confirm("이미 작업한 내용이 있습니다 삭제하시겠습니까?");
                                        if (result) {
                                            this.polygon.splice(i, 1);
                                            this.rectangle.splice(i, 1);
                                            this.save1 = false;
                                            this.buttonState();
                                            this.onOff = '';
                                            this.setState({
                                                savebtn: false,
                                                eventKey1: true,
                                                eventKey2: true,
                                                eventKey3: true,
                                                eventKey4: true,
                                            })
                                        }else {
                                            this.setState({
                                                savebtn: false,
                                                eventKey1: true,
                                                eventKey2: true,
                                                eventKey3: true,
                                                eventKey4: true,
                                            })
                                        }
                                    } else {
                                        if (this.state.buttonDis1 === false) {
                                            this.startPoly(1);
                                        }
                                    }
                                }
                            } else {
                                if (this.state.buttonDis1 === false) {
                                    this.startPoly(1);
                                }
                            }
                        }
                    }
                    if (eventKey.key === "2") {
                        this.setState({
                            eventKey1: false,
                            eventKey3: false,
                            eventKey4: false,
                        })
                        if (this.state.eventKey2 === true) {
                            if (this.polygon.length !== 0 && this.polygon !== null && this.polygon !== undefined) {
                                for (let i = 0; i < this.polygon.length; i++) {
                                    if (this.polygon[i].polyNo === 2) {
                                        let result = window.confirm("이미 작업한 내용이 있습니다 삭제하시겠습니까?");
                                        if (result) {
                                            this.polygon.splice(i, 1);
                                            this.rectangle.splice(i, 1);
                                            this.save2 = false;
                                            this.buttonState();
                                            this.onOff = '';
                                            this.setState({
                                                savebtn: false,
                                                eventKey1: true,
                                                eventKey2: true,
                                                eventKey3: true,
                                                eventKey4: true,
                                            })
                                        }else {
                                            this.setState({
                                                savebtn: false,
                                                eventKey1: true,
                                                eventKey2: true,
                                                eventKey3: true,
                                                eventKey4: true,
                                            })
                                        }
                                    } else {
                                        if (this.state.buttonDis2 === false) {
                                            this.startPoly(2);
                                        }
                                    }
                                }
                            } else {
                                if (this.state.buttonDis2 === false) {
                                    this.startPoly(2);
                                }
                            }
                        }
                    }
                    if (eventKey.key === "3") {
                        this.setState({
                            eventKey1: false,
                            eventKey2: false,
                            eventKey4: false,
                        })
                        if (this.state.eventKey3 === true) {
                            if (this.polygon.length !== 0 && this.polygon !== null && this.polygon !== undefined && this.polygon.length > 0) {
                                for (let i = 0; i < this.polygon.length; i++) {
                                    if (this.polygon[i].polyNo === 3) {
                                        let result = window.confirm("이미 작업한 내용이 있습니다 삭제하시겠습니까?");
                                        if (result) {
                                            this.polygon.splice(i, 1);
                                            this.rectangle.splice(i, 1);
                                            this.save3 = false;
                                            this.buttonState();
                                            this.onOff = '';
                                            this.setState({
                                                savebtn: false,
                                                eventKey1: true,
                                                eventKey2: true,
                                                eventKey3: true,
                                                eventKey4: true,
                                            })
                                        }else {
                                            this.setState({
                                                savebtn: false,
                                                eventKey1: true,
                                                eventKey2: true,
                                                eventKey3: true,
                                                eventKey4: true,
                                            })
                                        }
                                    } else {
                                        if (this.state.buttonDis3 === false) {
                                            this.startPoly(3);
                                        }
                                    }
                                }
                            } else {
                                if (this.state.buttonDis3 === false) {
                                    this.startPoly(3);
                                }
                            }
                        }
                    }

                    if (eventKey.key === "4") {
                        this.setState({
                            eventKey1: false,
                            eventKey2: false,
                            eventKey3: false,
                        })
                        if (this.state.eventKey4 === true) {
                            if (this.polygon.length !== 0 && this.polygon !== null && this.polygon !== undefined) {
                                for (let i = 0; i < this.polygon.length; i++) {
                                    if (this.polygon[i].polyNo === 4) {
                                        let result = window.confirm("이미 작업한 내용이 있습니다 삭제하시겠습니까?");
                                        if (result) {
                                            this.polygon.splice(i, 1);
                                            this.rectangle.splice(i, 1);
                                            this.save4 = false;
                                            this.buttonState();
                                            this.onOff = '';
                                            this.setState({
                                                savebtn: false,
                                                eventKey1: true,
                                                eventKey2: true,
                                                eventKey3: true,
                                                eventKey4: true,
                                            })
                                        }else {
                                            this.setState({
                                                savebtn: false,
                                                eventKey1: true,
                                                eventKey2: true,
                                                eventKey3: true,
                                                eventKey4: true,
                                            })
                                        }
                                    } else {
                                        if (this.state.buttonDis4 === false) {
                                            this.startPoly(4);
                                        }
                                    }
                                }
                            } else {
                                if (this.state.buttonDis4 === false) {
                                    this.startPoly(4);
                                }
                            }
                        }
                    }
                if (this.state.eventKey1 === false || this.state.eventKey2 === false
                    || this.state.eventKey3 === false || this.state.eventKey4 === false
                    || this.state.finishbtn === true) {
                    if (eventKey.key === "f" || eventKey.key === "ㄹ") {
                        this.finishPath();
                    }
                }
                if(this.state.finishbtn === true) {
                    if (eventKey.key === "s" || eventKey.key === "ㄴ") {
                        this.doSave(this.polyNo);
                    }
                }

                if (this.state.eventKey1 === false || this.state.eventKey2 === false
                    || this.state.eventKey3 === false || this.state.eventKey4 === false
                    || this.state.finishbtn === true) {
                    if (eventKey.key === "c" || eventKey.key === "ㅊ") {
                        let result = window.confirm("작업이 진행중입니다 취소하시겠습니까?");
                        if (result) {
                            this.handleCancel(this.polyNo);
                        }
                    }
                }

                if(this.polygon.length !== 0) {
                    if(eventKey.key === " "){
                        this.submit();
                    }
                }
            }
        })


        this.canvas.on('mouse:down', (e) => {
            if (this.onOff === 'lineUse') {
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
            if(this.onOff === 'lineUse' && x1 !== 0 ){
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
            // this.state.savebtn = true;
            this.polyNo = polyNo;
            this.setState({
                savebtn : true,
                buttonDis1: true,
                buttonDis2: true,
                buttonDis3: true,
                buttonDis4: true,
            });
            switch (polyNo) {
                case 1 : this.setState({buttonDis1: false,eventKey1: false,}); break;
                case 2 : this.setState({buttonDis2: false,eventKey2: false,}); break;
                case 3 : this.setState({buttonDis3: false,eventKey3: false,}); break;
                case 4 : this.setState({buttonDis4: false,eventKey4: false,}); break;
                default : break;
            }
        // document.getElementById("fname").onkeyup = function(event) {
        //         console.log(event.key);
        // };
    }



    deleteOne = () => {
        let j = (this.polyCounter);
        let line = 0;
        let circle = 0;
        this.canvas.getObjects().forEach(function( o) {
            if(o.id === j-2 && o.type === 'line')     line = o;
            if(o.id === j-1 && o.type === 'circle')   circle = o;
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
            this.deleteAll(b);
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
        if( b !== -1) {
            this.x = 0;
            this.y = 0;
            this.polyCounter =0;
            this.lineCounter =0;
            this.polyPointX.length =0;
            this.polyPointY.length =0;
            // this.buttonState();
        }
        // this.zoomOFF();
        this.onOff = 'lineUse';
        this.setState({
            savebtn : false,
            // finishbtn : false,
            // eventKey1: true,
            // eventKey2: true,
            // eventKey3: true,
            // eventKey4: true,
        })
    }


    handleCancel = (b) =>{
        let objList = [];
        this.canvas.getObjects().forEach(function (o) {
            objList.push(o);
        })
        for (let i = 0; i <= objList.length; i++) {
            this.canvas.remove(objList[i]);
        }
        if( b !== -1) {
            this.x = 0;
            this.y = 0;
            this.polyCounter =0;
            this.lineCounter =0;
            this.polyPointX.length =0;
            this.polyPointY.length =0;
            this.buttonState();
        }
        // this.zoomOFF();
        this.onOff = '';
        this.setState({
            savebtn : false,
            eventKey1: true,
            eventKey2: true,
            eventKey3: true,
            eventKey4: true,
            finishbtn : false,
        })
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
        if(this.canvas.getObjects().length !==0) {
            this.canvas.setViewportTransform([1,0,0,1,0,0]);
            this.onOff = '';
            let makePath = 'M' + this.polyPointX[0] + ' ' + this.polyPointY[0];
            for (let i = 1; i < this.polyCounter; i++) {
                makePath += ' L ' + this.polyPointX[i] + ' ' + this.polyPointY[i];
            }
            makePath += ' z';
            let path = new fabric.Path(makePath);
            path.opacity = 0.5;
            this.handleCancel(-1);
            this.canvas.add(path);
            this.setState({
                finishbtn : true,
            })
            // this.state.finishbtn = true;

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
        // const newRectangle = [{
        //     id : 0,
        //     left : 0,
        //     top : 0,
        //     width : 0,
        //     height : 0,
        //     scaleX : 0,
        //     scaleY : 0,
        // }];
        if(this.state.finishbtn) {
            if (this.canvas.getObjects().length !== 0) {
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
                this.setState({
                    savebtn : false,
                    eventKey1: true,
                    eventKey2: true,
                    eventKey3: true,
                    eventKey4: true,
                })
                this.handleCancel(newPolyNo);

                switch (newPolyNo) {
                    case 1 :
                        this.save1 = true;
                        break;
                    case 2 :
                        this.save2 = true;
                        break;
                    case 3 :
                        this.save3 = true;
                        break;
                    case 4 :
                        this.save4 = true;
                        break;
                    default : break;
                }
                this.buttonState();
            } else {
                alert("입력된 polygon이 존재하지 않습니다.");
            }
            this.setState({
                finishbtn : false,
            })
            // this.state.finishbtn = false;
        }else{
            alert("finish를 눌러 작업을 마무리 하세요.");
        }
    }

    // -- Location Data 저장
    submit = () =>{
        console.log(this.onOff);
        if(this.state.workNo !== 0) {
            const check = window.confirm("이미지에 필요한 탭의 정보를 입력하셨습니까?");
            if (check) {
                if (this.onOff !== "") {
                    alert("finish를 눌러 작업을 마무리 하세요.");
                } else if (this.state.savebtn) {
                    alert("save 눌러 작업을 마무리 하세요.");
                } else if (this.polygon === null || this.polygon.length === 0 || this.polygon === undefined) {
                   alert("폴리곤 입력값이 없습니다.")
                }
             else {
                    if(this.state.comment === null){
                        // -- RectLocation 저장
                        this.props.rectStore.objGet(this.rectangle, this.polygon);
                        this.props.rectStore.changeNewRectLocationCreatedId(this.props.authStore.loginUser.id);
                        this.props.rectStore.changeNewRectLocationWorkNo(this.state.workNo);
                        this.props.rectStore.doRectLocationUp(this.changeWorkNo);
                        // -- PolygonLocation 저장
                        // this.props.polygonStore.objGet(this.polygon);
                        // this.props.polygonStore.changeNewPolygonLocationCreatedId(this.props.authStore.isUserId);
                        // this.props.polygonStore.changeNewPolygonLocationWorkNo(this.props.imageStore.isWorkNo);
                        // this.props.polygonStore.doPolygonLocationUp();
                    }else{
                        // -- RectLocation 수
                        this.props.rectStore.objGet(this.rectangle, this.polygon);
                        this.props.rectStore.changeNewRectLocationCreatedId(this.props.authStore.loginUser.id);
                        this.props.rectStore.changeNewRectLocationWorkNo(this.state.workNo);
                        this.props.rectStore.doRectUpdate(this.changeWorkNo);
                    }
                    this.canvas.setWidth(0)
                    this.canvas.setHeight(0)
                    this.handleCancel(1);
                    this.canvas.backgroundImage = 0;
                    this.canvas.renderAll();
                    this.save1 = false;
                    this.save2 = false;
                    this.save3 = false;
                    this.save4 = false;
                    this.buttonState();
                    // -- Tap Menu List로 전환
                    this.setState({
                        tabIndex: 1,
                        workNo: 0,
                        tableSize : 6
                    });
                }
            }
        }
    }


    // zoomON = () =>{
    //     this.zoomAction(this.state.workNo);
    // }
    // zoomOFF = () =>{
    //     let lens = null;
    //     this.canvas.getObjects().forEach(function( o) {
    //         if(o.id === "lens")     lens = o;
    //     })
    //     this.canvas.remove(lens);
    //     this.canvas.off('mouse:move');
    // }
    //
    // zoomAction=(workNo)=> {
    //     let canvas = this.canvas;
    //     let radius = 100,
    //         x = 400,
    //         y = 400,
    //         lens,
    //         img1,
    //         scale = 2,
    //         originalWidth = 800,
    //         originalHeight = 800,
    //         zoomBtn = this.state.zoomBtn;
    //     fabric.Image.fromURL(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, function(img) {
    //         img1 = img;
    //         img.set({
    //             width: originalWidth,
    //             height: originalHeight,
    //             evented: false,
    //             selectable: false
    //         });
    //
    //         lens = fabric.util.object.clone(img);
    //         lens.set({
    //             id : "lens",
    //             top: -225,
    //             left: 150,
    //             width: scale * originalWidth,
    //             height: scale * originalHeight,
    //             clipTo: function(ctx) {
    //                 ctx.arc(-this.left + x - this.width / 2, -this.top + y - this.height / 2, radius, 0, Math.PI * 2, true);
    //             }
    //         });
    //
    //         canvas.setBackgroundImage(img);
    //         canvas.add(lens);
    //         canvas.centerObject(img);//******* issue no longer here****
    //
    //     });
    //     this.canvas = canvas;
    //     this.canvas.renderAll.bind(canvas);
    //
    //     this.canvas.on('mouse:move', function(e) {
    //
    //             x = canvas.getPointer(e, false).x;
    //             y =  canvas.getPointer(e, false).y;
    //             if (x > 0 && x < 800) {
    //                 lens.set('left', -(scale - 1) * x );
    //                 lens.set('top', -(scale - 1) * y);
    //             }
    //             canvas.bringToFront(lens);
    //             canvas.renderAll();
    //     });
    // }


    handleClickItem = (workNo, imageData,polyNo, comment) => {
        this.setState({comment : comment,tableSize : 5})
        // alert(comment);
        let check = true;
        this.setState({
            workNo :workNo,
        })
        if(this.state.workNo !== 0){
            check = window.confirm("작업을 변경하면 입력한 값이 초기화 됩니다. 변경하시겠습니까?");
        }
        if(check) {
            this.canvas.setWidth(0)
            this.canvas.setHeight(0)
            this.handleCancel(1);
            // this.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
            this.onImgLoad(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`);
            this.polygon.length = 0;
            this.rectangle.length = 0;
            this.props.rectStore.LoadWorkTypeList(workNo, this.handleClickCallback);
            this.props.polygonStore.changeNewPolygonLocationWorkNo(workNo);
            this.props.polygonStore.LoadPolygonLocation(workNo);
        }
        this.setState({imgtext: "",});
    }



    handleClickCallback = (workTypeList, workNo)=>{
        if(workTypeList.length > 0 ){
            this.save1 = true;
            this.save2 = true;
            this.save3 = true;
            this.save4 = true;
            for(let i = 0; i<workTypeList.length ; i++) {
                switch (workTypeList[i]) {
                    case 1 :
                        this.save1 = false;
                        break;
                    case 2 :
                        this.save2 = false;
                        break;
                    case 3 :
                        this.save3 = false;
                        break;
                    case 4 :
                        this.save4 = false;
                        break;
                    default:break;
                }
            }
        }else{
            this.save1 = false;
            this.save2 = false;
            this.save3 = false;
            this.save4 = false;
        }
        this.buttonState();
        this.setState({tabIndex: 0, workNo: workNo});
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
            top: 0,
            left: 0,
            width: this.canvas.width,
            height: this.canvas.height,
            scaleX: 1,
            scaleY: 1,
            originX: 'left',
            originY: 'top',
        });
    }

    onImgLoad = (img) => {
        const image = new Image();
        image.src = img;
        image.onload = this.handleImageLoaded;
    };

    handleImageLoaded = (e) => {
        // alert(e.target.width +"+"+ e.target.height);
        this.setState({
            canvasWidth: e.target.width,
            canvasHeight: e.target.height
        });
        this.canvas.setWidth(this.state.canvasWidth)
        this.canvas.setHeight(this.state.canvasHeight)
    }


    handleStepView = () =>{
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
        if(this.state.workNo !== 0 ){
            if(tabIndex === 1) {
                this.setState({
                    selected : [],
                    workNo : 0,
                    zoom : '100%',
                    tableSize : 6,
                })
                this.canvas.setWidth(0);
                this.canvas.setHeight(0);
                this.canvas.backgroundImage = 0;
                this.canvas.renderAll();
                this.props.rectStore.selectedItemReset();
                this.handleCancel(1);
            }
            this.setState({tabIndex : tabIndex});
        }else{
            alert("이미지 리스트 탭에서 작업할 이미지를 선택해주세요.");
        }
        this.setState({imgtext: "선택한 이미지가 없습니다.",});
    }

    handleDelete =()=>{
        const deleteConfirm = window.confirm("정말 삭제하시겠습니까?");
        const createdId = this.props.authStore.loginUser.id
        if(deleteConfirm) {
            const selected =toJS(this.props.rectStore.selectedItem);
                    this.props.rectStore.deleteImg(selected,createdId);
            this.setState({
                tabIndex : 1,
            })
        }
    }


    render() {
        setTimeout(() => document.body.style.zoom = "100%", 100);
        const { classes,history } = this.props;
        // const {isWorkNo} = this.props.imageStore;
        // const {workTypeList} = this.props.rectStore;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Grid container>
                        <Grid item xs={12} lg={6} xl={6} style={{marginTop:10}}>
                        {/*<div>*/}
                        {/*    /!*<Button id="btnReset" onClick={this.btnReset}>Zoom reSet</Button>*!/*/}
                        {/*    <Button*/}
                        {/*        onClick={this.zoomON}*/}
                        {/*        disabled={this.state.workNo ==0}*/}
                        {/*    >*/}
                        {/*        돋보기 켜기*/}
                        {/*    </Button>*/}
                        {/*    <Button*/}
                        {/*        onClick={this.zoomOFF}*/}
                        {/*        disabled={this.state.workNo ==0}*/}
                        {/*    >*/}
                        {/*        돋보기 끄기*/}
                        {/*    </Button>*/}
                        {/*</div>*/}
                            <div className={classes.canvas} style={{display:"table"}}>
                                    <div style={{width:'700px',height:'500px',background:'#e2e2e2',textAlign:'center',fontSize:'17px',display:'table-cell',verticalAlign:'middle'}}>{this.state.imgtext} </div>
                                    <canvas id="c" width={this.state.canvasWidth} height={this.state.canvasHeight} filltext="ff"> </canvas>  
                                    
                        
                            </div>
                        </Grid>

                        <Grid item xs={12} lg={this.state.tableSize} xl={this.state.tableSize} style={{marginLeft:"auto", zoom:"100%" }} >
                            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.onSelectTap( tabIndex )} >
                                <TabList>
                                    
                                    <Tab tabIndex={0} style={{width: '50%', height:55,textAlign:'center',borderRadius:0}}><h3>영역지정</h3></Tab>
                                    <Tab tabIndex={1} style={{width: '50%', height:55,textAlign:'center',borderRadius:0}}><h3>이미지 리스트 ( <b style={{color:"#1e8247"}}>{this.props.rectStore.complete}</b> / <b>{this.props.rectStore.total}</b> )</h3></Tab>
                                    
                                </TabList>

                                <TabPanel value={this.state.value} index={0} stylye={{borderRadius:0}}>
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
                                                            <SaveIcon />
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
                                                        <IconButton id={"deleteButton"} aria-label="delete" onClick={() => this.deleteOne()} disabled={this.state.buttonDis2}>
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
                                                            <SaveIcon />
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
                                                            <SaveIcon />
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
                                                            <SaveIcon />
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
                                <TabPanel value={this.state.value} index={1} >
                                    <PolygonList onClick={this.handleClickItem} onChange={this.handleListChange} onImageDoubleClick={image => this.props.imageStore.onImageDoubleClick(image)}/>
                                </TabPanel>
                            </Tabs>
                        </Grid>

                    </Grid>

                </div>

                {/*Stepper*/}

                <div>
                    {/* <hr></hr> */}
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
                </div>
                <Grid item xs={6} lg={3} style={{marginLeft:'auto', marginTop:'-100px'}}>
                     <Button variant="outlined" color="secondary"
                            className={classes.buttonType2}
                            onClick={this.handleDelete}
                            disabled={this.state.tabIndex === 0 || this.props.rectStore.selectedItem.length === 0 ? true : false}>
                        이미지 삭제
                    </Button>
                    <Button
                        type="button"
                        className={classes.buttonType3}
                        variant="outlined"
                        onClick={()=>{this.state.listIndex === 0 ? (history.push('/step2')) :alert('리스트에 남은 작업이 있습니다.')} }
                    >
                        다음단계
                    </Button>
                    
                </Grid>
                <p style={{width:'100%',height:40}}/>
                
                {/* <Typography variant="h6" component="h4" style={{display:'inline'}}>
                    <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/>우측 상단에 이미지리스트에서 작업 할 이미지 선택 </p>
                    <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/>각 영역 별 START버튼을 통해 영역지정 완료 후 FINISH 버튼 클릭 (Start -> Finish -> Save)</p>
                    <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/>삭제 버튼을 통해 한 점씩, 또는 전부삭제 버튼을 클릭해 삭제가능</p>
                    <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/>필요한 영역의 작업이 모두 완료되면 작업완료 버튼 클릭</p>
                    <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/>검수 후 반송 된 이미지는 코멘트가 적용되어 확인후 다시 작업하시면 됩니다.(반송된 이미지는 삭제 불가능)</p>
                    <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/>체크박스 활용하여 이미지 일괄삭제 가능</p>
                </Typography> */}
                <ImagePopupModal store={this.props.imageStore} />
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Polygon)));