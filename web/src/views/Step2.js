import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Container, Grid, Typography} from "@material-ui/core";
import Color1 from "./step2/Color1";
import Color2 from "./step2/Color2";
import Color3 from "./step2/Color3";
import Color4 from "./step2/Color4";
import SleeveLength1 from "./step2/SleeveLength1";
import SleeveLength2 from "./step2/SleeveLength2";
import SleeveLength4 from "./step2/SleeveLength4";
import {inject, observer} from "mobx-react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BasicImageList from "./step2/BasicImageList";
import {fabric} from "fabric";
import {toJS} from "mobx";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import ErrorIcon from "@material-ui/icons/Error";

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
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

@inject('basicLabelStore','authStore','imageStore','polygonStore', 'currentStepStore','basicCategoryStore')
@observer
class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            labelNo1 : 0,
            labelNo2 : 0,
            labelNo3 : 0,
            labelNo4 : 0,
            no4: 0,
            name4: '',
            memo4: '',
            subNo4: 0,
            subName4: '',
            subMemo4: '',
            sleeveNo4: 0,
            sleeveName4: '',
            tabIndex: 1,
            tabIndex1: 0,
            imgData: '',
            workNo: '',
            value: 0,
            number: 1,
            createdId: '',
            no1: 0,
            name1: '',
            memo1: '',
            subNo1: 0,
            subName1: '',
            subMemo1: '',
            sleeveNo1: 0,
            sleeveName1: '',
            no2: 0,
            name2: '',
            memo2: '',
            subNo2: 0,
            subName2: '',
            subMemo2: '',
            sleeveNo2: 0,
            sleeveName2: '',
            no3: 0,
            name3: '',
            memo3: '',
            subNo3: 0,
            subName3: '',
            subMemo3: '',
            colorCategoryNo1:0,
            colorCategoryNo2:0,
            colorCategoryNo3:0,
            colorCategoryNo4:0,
            subColorCategoryNo1:0,
            subColorCategoryNo2:0,
            subColorCategoryNo3:0,
            subColorCategoryNo4:0,
            sleeveLengthCategoryNo1:0,
            sleeveLengthCategoryNo2:0,
            sleeveLengthCategoryNo4:0,
        }

        this.handleDelete1 = this.handleDelete1.bind(this)
        this.colorDelete1 = this.colorDelete1.bind(this)
        this.colorDeleteSub1 = this.colorDeleteSub1.bind(this)

        this.handleDelete2 = this.handleDelete2.bind(this)
        this.colorDelete2 = this.colorDelete2.bind(this)
        this.colorDeleteSub2 = this.colorDeleteSub2.bind(this)

        this.colorDelete3 = this.colorDelete3.bind(this)
        this.colorDeleteSub3 = this.colorDeleteSub3.bind(this)

        this.handleDelete4 = this.handleDelete4.bind(this)
        this.colorDelete4 = this.colorDelete4.bind(this)
        this.colorDeleteSub4 = this.colorDeleteSub4.bind(this)
        this.handleClickItem = this.handleClickItem.bind(this)
    }

    componentDidMount() {
        this.props.currentStepStore.setStep(2);
        const id = this.props.authStore.loginUser.id;
        this.setState({createdId: id});
        this.props.enqueueSnackbar("Step2", {
            variant: 'info',
        });
        this.setState({
            boundaryList: this.props.imageStore.boundaryList,
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })
        this.canvas = new fabric.Canvas('c');

        this.props.basicCategoryStore.LoadColorList();
        this.props.basicCategoryStore.LoadSleeveList();

    }

    handleClickOK = () => {
        this.props.basicLabelStore.changeNewBasicLabelCreatedId(this.state.createdId);
        this.props.basicLabelStore.doBasicLabelUp();
    }

    handleClickItem = (workNo, imageData, polyNo) => {
        this.deleteAll();
        this.props.imageStore.changeWorkNo(workNo);
        this.props.polygonStore.changeNewPolygonLocationWorkNo(workNo);
        this.props.polygonStore.LoadPolygonLocation(workNo);
        this.setState({
            tabIndex1: polyNo,
        })
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
            width: 800,
            height: 800,
            originX: 'left',
            originY: 'top'
        });
        this.setState({
            tabIndex: 0,
            tabIndex1:0,
        })
    }
    handleClickColor1 = (color1) => {
        this.setState({
            no1: color1.no,
            name1: color1.categoryItemName,
            memo1: color1.categoryItemMemo,
            colorCategoryNo1: color1.categoryNo,
            labelNo1 : 1,
        })
    }
    handleClickColor2 = (color2) => {
        this.setState({
            no2: color2.no,
            name2: color2.categoryItemName,
            memo2: color2.categoryItemMemo,
            colorCategoryNo2: color2.categoryNo,
            labelNo2 : 2,
        })
    }
    handleClickColor3 = (color3) => {
        this.setState({
            no3: color3.no,
            name3: color3.categoryItemName,
            memo3: color3.categoryItemMemo,
            colorCategoryNo3: color3.categoryNo,
            labelNo3 : 3,
        })
    }
    handleClickColor4 = (color4) => {
        this.setState({
            no4: color4.no,
            name4: color4.categoryItemName,
            memo4: color4.categoryItemMemo,
            colorCategoryNo4: color4.categoryNo,
            labelNo4 : 4,
        })
    }
    handleClickSubColor1 = (color1) => {
        {
            !this.state.no1 == 0 ?
                this.setState({
                    subNo1: color1.no,
                    subName1: color1.categoryItemName,
                    subMemo1: color1.categoryItemMemo,
                    subColorCategoryNo1: color1.categoryNo,
                })
                : alert('메인 색상을 먼저 선택해 주세요')
        }
    }
    handleClickSubColor2 = (color2) => {
        {
            !this.state.no2 == 0 ?
                this.setState({
                    subNo2: color2.no,
                    subName2: color2.categoryItemName,
                    subMemo2: color2.categoryItemMemo,
                    subColorCategoryNo2: color2.categoryNo,
                })
                : alert('메인 색상을 먼저 선택해 주세요')
        }
    }
    handleClickSubColor3= (color3) => {
        {
            !this.state.no3 == 0 ?
                this.setState({
                    subNo3: color3.no,
                    subName3: color3.categoryItemName,
                    subMemo3: color3.categoryItemMemo,
                    subColorCategoryNo3: color3.categoryNo,
                })
                : alert('메인 색상을 먼저 선택해 주세요')
        }
    }
    handleClickSubColor4 = (color4) => {
        {
            !this.state.no4 == 0 ?
                this.setState({
                    subNo4: color4.no,
                    subName4: color4.categoryItemName,
                    subMemo4: color4.categoryItemMemo,
                    subColorCategoryNo4: color4.categoryNo,
                })
                : alert('메인 색상을 먼저 선택해 주세요')
        }
    }
    handleClickSleeve1 = (sleeve1) => {
        this.setState({
            sleeveNo1: sleeve1.no,
            sleeveName1: sleeve1.categoryItemName,
            sleeveLengthCategoryNo1: sleeve1.categoryNo
        })
    }
    handleClickSleeve2 = (sleeve2) => {
        this.setState({
            sleeveNo2: sleeve2.no,
            sleeveName2: sleeve2.categoryItemName,
            sleeveLengthCategoryNo2: sleeve2.categoryNo
        })
    }
    handleClickSleeve4 = (sleeve4) => {
        this.setState({
            sleeveNo4: sleeve4.no,
            sleeveName4: sleeve4.categoryItemName,
            sleeveLengthCategoryNo4: sleeve4.categoryNo
        })
    }

    handleDelete1() {
        this.setState({
            sleeveNo1: 0,
            sleeveName1: '',
            sleeveLengthCategoryNo1 : 0,
        })
    }

    handleDelete2() {
        this.setState({
            sleeveNo2: 0,
            sleeveName2: '',
            sleeveLengthCategoryNo2 : 0,
        })
    }

    handleDelete4() {
        this.setState({
            sleeveNo4: 0,
            sleeveName4: '',
            sleeveLengthCategoryNo4 : 0,
        })
    }

    colorDelete1() {
        this.setState({
            no1: 0,
            name1: '',
            memo1: '',
            subNo1: 0,
            subName1: '',
            subMemo1: '',
            labelNo1 : 0,
            colorCategoryNo1 : 0,
        })
    }

    colorDelete2() {
        this.setState({
            no2: 0,
            name2: '',
            memo2: '',
            subNo2: 0,
            subName2: '',
            subMemo2: '',
            labelNo2 : 0,
            colorCategoryNo2 : 0,
        })
    }

    colorDelete3() {
        this.setState({
            no3: 0,
            name3: '',
            memo3: '',
            subNo3: 0,
            subName3: '',
            subMemo3: '',
            labelNo3 : 0,
            colorCategoryNo3 : 0,
        })
    }

    colorDelete4() {
        this.setState({
            no4: 0,
            name4: '',
            memo4: '',
            subNo4: 0,
            subName4: '',
            subMemo4: '',
            labelNo4 : 0,
            colorCategoryNo4 : 0,
        })
    }

    colorDeleteSub1() {
        this.setState({
            subNo1: 0,
            subName1: '',
            subMemo1: '',
            subColorCategoryNo1 : 0,
        })
    }

    colorDeleteSub2() {
        this.setState({
            subNo2: 0,
            subName2: '',
            subMemo2: '',
            subColorCategoryNo2 : 0,
        })
    }

    colorDeleteSub3() {
        this.setState({
            subNo3: 0,
            subName3: '',
            subMemo3: '',
            subColorCategoryNo3 : 0,
        })
    }

    colorDeleteSub4() {
        this.setState({
            subNo4: 0,
            subName4: '',
            subMemo4: '',
            subColorCategoryNo4 : 0,
        })
    }

    lineTwoPoint =[];
    x;
    y;

    onSelectTab(tabIndex1) {
        console.log(tabIndex1);
        console.log(this.props.polygonStore.polyLast);


        let polyNo = tabIndex1 + 1;
        const {locationPolygonList} = this.props.polygonStore;
        const selectedPoly = (toJS(locationPolygonList).filter(poly => poly.polyNo === polyNo));

        if (selectedPoly.length !== 0) {
            this.deleteAll();
            for(let i = 0 ; i <selectedPoly.length; i++) {
                console.log( this.lineTwoPoint);
                this.lineTwoPoint = [this.x, this.y, selectedPoly[i].locationX, selectedPoly[i].locationY];
                this.x = selectedPoly[i].locationX;
                this.y = selectedPoly[i].locationY;

                // let circle = new fabric.Circle({
                //     type: 'circle',
                //     id: this.polyCounter,
                //     radius: 6,
                //     fill: 'green',
                //     left: selectedPoly[i].locationX - 3.5,
                //     top: selectedPoly[i].locationY - 3.5,
                //     selectable: false,
                //     evented: false,
                // });
                // this.canvas.add(circle);
                // this.canvas.bringToFront(circle)


                if(i !=0) {
                    let x1 = this.lineTwoPoint[0];
                    let x2 = this.lineTwoPoint[2];
                    let x3 = 0;
                    let y1 = this.lineTwoPoint[1];
                    let y2 = this.lineTwoPoint[3];
                    let y3 = 0;
                    if (x2 < x1) {
                        x3 = x1;
                        x1 = x2;
                        x2 = x3;
                    }
                    if (y2 < y1) {
                        y3 = y1;
                        y1 = y2;
                        y2 = y3;
                    }

                    let polyline = new fabric.Line(
                        [this.lineTwoPoint[0],
                            this.lineTwoPoint[1],
                            this.lineTwoPoint[2],
                            this.lineTwoPoint[3]], {
                            id: this.lineCounter,
                            type: 'line',
                            fill: 'red',
                            stroke: 'red',
                            strokeWidth: 5,
                            padding: 1,
                            // selectable: false,
                            // evented: false,
                            left: x1,
                            top: y1,
                        });
                    this.canvas.add(polyline);
                    this.canvas.sendToBack(polyline);
                }
            }
            let x1 = selectedPoly[selectedPoly.length-1].locationX;
            let x2 = selectedPoly[0].locationX;
            let x3 = 0;
            let y1 = selectedPoly[selectedPoly.length-1].locationY;
            let y2 = selectedPoly[0].locationY;
            let y3 = 0;
            this.lineTwoPoint = [x1, y1, x2, y2];
            if (x2 < x1) {
                x3 = x1;
                x1 = x2;
                x2 = x3;
            }
            if (y2 < y1) {
                y3 = y1;
                y1 = y2;
                y2 = y3;
            }
            let polyline = new fabric.Line(
                [this.lineTwoPoint[0],
                    this.lineTwoPoint[1],
                    this.lineTwoPoint[2],
                    this.lineTwoPoint[3]], {
                    id: this.lineCounter,
                    type: 'line',
                    fill: 'red',
                    stroke: 'red',
                    strokeWidth: 5,
                    padding: 1,
                    selectable: false,
                    evented: false,
                    left: x1,
                    top: y1,
                });
            this.canvas.add(polyline);
            this.canvas.sendToBack(polyline);

            // let makePath = 'M ' + selectedPoly[0].locationX + ' ' + selectedPoly[0].locationY;
            // for (let i = 1; i < selectedPoly.length; i++) {
            //     makePath += ' L ' + selectedPoly[i].locationX + ' ' + selectedPoly[i].locationY;
            // }
            // makePath += ' z';
            // let path = new fabric.Path(makePath);
            // path.opacity = 0.3;
            // console.log(makePath);
            // this.canvas.add(path);

            this.setState({
                tabIndex1: tabIndex1,
            })
        } else {
            alert("poly정보가 존재하지 않습니다.")
        }
    };

    handleSave = () => {
        const {polyInfo} = this.props.polygonStore;
        let savebtn = true;
        console.log(polyInfo);
        for (let i = 0; i < polyInfo.length; i++) {
            console.log("!!!!!!" + polyInfo[i]);
            switch (polyInfo[i]) {
                case 1 :
                    if (this.state.no1 == 0) {
                        alert("아우터의 메인색상을 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    } else if (this.state.sleeveNo1 == "") {
                        alert("아우터의 소매길이를 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    }
                    break;
                case 2 :
                    if (this.state.no2 == 0) {
                        alert("상의의 메인색상을 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    } else if (this.state.sleeveNo2 == "") {
                        alert("상의의 소매길이를 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    }
                    break;
                case 3 :
                    if (this.state.no3 == 0) {
                        alert("하의의 메인색상을 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    }
                    break;
                case 4 :
                    if (this.state.no4 == 0) {
                        alert("원피스의 메인색상을 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    } else if (this.state.sleeveNo4 == "") {
                        alert("원피의 소매길이를 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    }
                    break;
            }
        }
        if (savebtn) {
            console.log(savebtn);
            const param = toJS({
                workNo: this.props.imageStore.isWorkNo,
                workStep: 4,
                labelNo1: this.state.labelNo1,
                labelNo2: this.state.labelNo2,
                labelNo3: this.state.labelNo3,
                labelNo4: this.state.labelNo4,
                color1: this.state.no1,
                color2: this.state.no2,
                color3: this.state.no3,
                color4: this.state.no4,
                colorCategoryNo1: this.state.colorCategoryNo1,
                colorCategoryNo2: this.state.colorCategoryNo2,
                colorCategoryNo3: this.state.colorCategoryNo3,
                colorCategoryNo4: this.state.colorCategoryNo4,
                subColor1: this.state.subNo1,
                subColor2: this.state.subNo2,
                subColor3: this.state.subNo3,
                subColor4: this.state.subNo4,
                subColorCategoryNo1: this.state.subColorCategoryNo1,
                subColorCategoryNo2: this.state.subColorCategoryNo2,
                subColorCategoryNo3: this.state.subColorCategoryNo3,
                subColorCategoryNo4: this.state.subColorCategoryNo4,
                sleeveLength1: this.state.sleeveNo1,
                sleeveLength2: this.state.sleeveNo2,
                sleeveLength4: this.state.sleeveNo4,
                sleeveLengthCategoryNo1: this.state.sleeveLengthCategoryNo1,
                sleeveLengthCategoryNo2: this.state.sleeveLengthCategoryNo2,
                sleeveLengthCategoryNo4: this.state.sleeveLengthCategoryNo4,
                createdId: this.props.authStore.loginUser.id,
            });
            axios.post('/api/v1/kfashion/label/basicLabel', param, {})
                .then(res => {
                    if (res.status === 200) {
                        alert("작업을 저장하였습니다.");
                        this.setState({
                            tabIndex: 1,
                            workNo: 0,
                            no: 0,
                            labelNo1: 0,
                            labelNo2: 0,
                            labelNo3: 0,
                            labelNo4: 0,
                            color1: 0,
                            color2: 0,
                            color3: 0,
                            color4: 0,
                            colorCategoryNo1: 0,
                            colorCategoryNo2: 0,
                            colorCategoryNo3: 0,
                            colorCategoryNo4: 0,
                            subColor1: 0,
                            subColor2: 0,
                            subColor3: 0,
                            subColor4: 0,
                            subColorCategoryNo1: 0,
                            subColorCategoryNo2: 0,
                            subColorCategoryNo3: 0,
                            subColorCategoryNo4: 0,
                            sleeveLength1: 0,
                            sleeveLength2: 0,
                            sleeveLength4: 0,
                            sleeveLengthCategoryNo1: 0,
                            sleeveLengthCategoryNo2: 0,
                            sleeveLengthCategoryNo4: 0,
                        });
                    } else {
                        console.log("error");
                    }
                })
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
    }
    onSelectTab2 =( tabIndex ) => {
        this.setState({tabIndex});
    }
    nextTab =() => {
        const {polyInfo} = this.props.polygonStore;
        const currentTap = this.state.tabIndex1;
        let tabIndex1 =0;
        for(let i=0;i < polyInfo.length; i++){
            if(polyInfo[i] == this.state.tabIndex1+1 ){
                tabIndex1 = (polyInfo[i+1]-1);
                this.setState({tabIndex1 : tabIndex1});
            }
        }this.onSelectTab(tabIndex1);
    }
    render() {
        const {classes,history} = this.props;
        const {authorityNo} = this.props.authStore.loginUser.authorityNo;
        const {isWorkNo} = this.props.imageStore;
        const {polyInfo} = this.props.polygonStore;
        const {polyLast} = this.props.polygonStore;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                 <Grid container>
                     <Grid item xs={12} lg={6}>
                         <div>
                             <canvas id="c" width="800" height="800">  </canvas>
                         </div>
                     </Grid>
                     <Grid item xs={12} lg={6}>
                         <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.onSelectTab2(tabIndex)}>
                             <TabList >
                                 <Tab  style={{width: '50%', height:60,textAlign:'center'}}><h3>기본 레이블링</h3></Tab>
                                 <Tab  style={{width: '50%', height:60,textAlign:'center'}}><h3>이미지 리스트</h3></Tab>
                             </TabList>

                         <TabPanel>
                             <Tabs selectedIndex={this.state.tabIndex1} onSelect={tabIndex1 => this.onSelectTab(tabIndex1)}>
                             <TabList>
                                 <Tab  style={{width: '25%', height:60,textAlign:'center'}}><h3 >아우터</h3></Tab>
                                 <Tab  style={{width: '25%', height:60,textAlign:'center'}}><h3 >상의</h3></Tab>
                                 <Tab  style={{width: '25%', height:60,textAlign:'center'}}><h3 >하의</h3></Tab>
                                 <Tab  style={{width: '25%', height:60,textAlign:'center'}}><h3 >원피스</h3></Tab>
                             </TabList>

                             <TabPanel>
                                     <div className={classes.content} style={{display:'inline'}}>
                                     <Typography variant="h5" component="h2" style={{display:'inline'}}>
                                         색상
                                     </Typography>
                                         &nbsp;&nbsp;{!this.state.no1 == 0 ? <Typography style={{display:'inline-block', color:'red'}}>색상버튼 클릭 시 색상이 삭제 됩니다.</Typography>:''}
                                             <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                 <Color1 onClick={this.handleClickColor1} onClickSub={this.handleClickSubColor1} style={{display:'inline', float:'right'}}/>
                                             </div>
                                     <div>
                                         <hr></hr>
                                     </div>
                                     <div>
                                             <br></br>
                                         {this.state.no1 >0 ?
                                             (<div style={{display:'inline-block',textAlign: 'center',width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${this.state.memo1}`}} onClick={this.colorDelete1}>

                                     </div>) : ''
                                         }
                                         &nbsp;
                                         {this.state.subNo1 >0 ?
                                             (<div style={{display:'inline-block',textAlign: 'center', width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${this.state.subMemo1}`}} onClick={this.colorDeleteSub1}>
                                             </div>) : ''
                                         }
                                     </div>
                                     </div>
                                     <div className={classes.content} style={{display:'inline'}}>
                                             <Typography variant="h5" component="h5" style={{display:'inline'}} >
                                                 소매길이
                                             </Typography>
                                             <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                 <SleeveLength1 onClick={this.handleClickSleeve1} />
                                             </div>
                                         <div>
                                             <hr></hr>
                                         </div>

                                         <br></br>
                                         {this.state.sleeveNo1 >0 ?
                                             (<Button style={{fontSize:20, width:150, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDelete1} endIcon={<DeleteIcon />} > {this.state.sleeveName1} </Button> ) : ''
                                         }
                                         {polyLast === this.state.tabIndex1 ? (
                                         <Button style={{marginTop: 20}}
                                                 type="button"
                                                 className={classes.buttonType2}
                                                 color="primary"
                                                 variant="outlined"
                                                 onClick={()=>(this.handleSave())}
                                         >
                                             저장
                                         </Button>
                                         ):(
                                             <Button style={{marginTop: 20}}
                                                     type="button"
                                                     className={classes.buttonType2}
                                                     color="primary"
                                                     variant="outlined"
                                                     onClick={()=>(this.nextTab())}
                                             >
                                                 다음
                                             </Button>
                                         )}
                                     </div>
                                 </TabPanel>

                                 <TabPanel>
                                     <div className={classes.content} style={{display:'inline'}}>
                                         <Typography variant="h5" component="h2" style={{display:'inline'}}>
                                             색상
                                         </Typography>
                                         &nbsp;&nbsp;{!this.state.no2 == 0 ? <Typography style={{display:'inline-block', color:'red'}}>색상버튼 클릭 시 색상이 삭제 됩니다.</Typography>:''}
                                         <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                             <Color2 onClick={this.handleClickColor2} onClickSub={this.handleClickSubColor2} style={{display:'inline', float:'right'}}/>
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <div>
                                             <br></br>
                                             {this.state.no2>0 ?
                                                 (<div style={{display:'inline-block',textAlign: 'center',width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${this.state.memo2}`}} onClick={this.colorDelete2}>

                                                 </div>) : ''
                                             }
                                             &nbsp;
                                             {this.state.subNo2 >0 ?
                                                 (<div style={{display:'inline-block',textAlign: 'center', width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${this.state.subMemo2}`}} onClick={this.colorDeleteSub2}>
                                                 </div>) : ''
                                             }
                                         </div>
                                     </div>
                                     <div className={classes.content} style={{display:'inline'}}>
                                         <Typography variant="h5" component="h5" style={{display:'inline'}} >
                                             소매길이
                                         </Typography>
                                         <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                             <SleeveLength2 onClick={this.handleClickSleeve2} />
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <br></br>
                                         {this.state.sleeveNo2 >0 ?
                                             (<Button style={{fontSize:20, width:150, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDelete2} endIcon={<DeleteIcon />} > {this.state.sleeveName2} </Button> ) : ''
                                         }
                                         {polyLast === this.state.tabIndex1 ? (
                                             <Button style={{marginTop: 20}}
                                                     type="button"
                                                     className={classes.buttonType2}
                                                     color="primary"
                                                     variant="outlined"
                                                     onClick={()=>(this.handleSave())}
                                             >
                                                 저장
                                             </Button>
                                         ):(
                                             <Button style={{marginTop: 20}}
                                                     type="button"
                                                     className={classes.buttonType2}
                                                     color="primary"
                                                     variant="outlined"
                                                     onClick={()=>(this.nextTab())}
                                             >
                                                 다음
                                             </Button>
                                         )}
                                     </div>
                                 </TabPanel>
                                 <TabPanel>
                                     <div className={classes.content} style={{display:'inline'}}>
                                         <Typography variant="h5" component="h2" style={{display:'inline'}}>
                                             색상
                                         </Typography>
                                         &nbsp;&nbsp;{!this.state.no3 == 0 ? <Typography style={{display:'inline-block', color:'red'}}>색상버튼 클릭 시 색상이 삭제 됩니다.</Typography>:''}
                                         <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                             <Color3 onClick={this.handleClickColor3} onClickSub={this.handleClickSubColor3} style={{display:'inline', float:'right'}}/>
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <div>
                                             {this.state.no3 >0 ?
                                                 (<div style={{display:'inline-block',textAlign: 'center',width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${this.state.memo3}`}} onClick={this.colorDelete3}>

                                                 </div>) : ''
                                             }
                                             &nbsp;
                                             {this.state.subNo3 >0 ?
                                                 (<div style={{display:'inline-block',textAlign: 'center', width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${this.state.subMemo3}`}} onClick={this.colorDeleteSub3}>
                                                 </div>) : ''
                                             }
                                         </div>
                                         {polyLast === this.state.tabIndex1 ? (
                                             <Button style={{marginTop: 20}}
                                                     type="button"
                                                     className={classes.buttonType2}
                                                     color="primary"
                                                     variant="outlined"
                                                     onClick={()=>(this.handleSave())}
                                             >
                                                 저장
                                             </Button>
                                         ):''}
                                     </div>
                                 </TabPanel>
                                 <TabPanel>
                                     <div className={classes.content} style={{display:'inline'}}>
                                         <Typography variant="h5" component="h2" style={{display:'inline'}}>
                                             색상
                                         </Typography>
                                         &nbsp;&nbsp;{!this.state.no4 == 0 ? <Typography style={{display:'inline-block', color:'red'}}>색상버튼 클릭 시 색상이 삭제 됩니다.</Typography>:''}
                                         <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                             <Color4 onClick={this.handleClickColor4} onClickSub={this.handleClickSubColor4} style={{display:'inline', float:'right'}}/>
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <div>
                                             <br></br>
                                             {this.state.no4 >0 ?
                                                 (<div style={{display:'inline-block',textAlign: 'center',width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${this.state.memo4}`}} onClick={this.colorDelete4}>

                                                 </div>) : ''
                                             }
                                             &nbsp;
                                             {this.state.subNo4 >0 ?
                                                 (<div style={{display:'inline-block',textAlign: 'center', width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${this.state.subMemo4}`}} onClick={this.colorDeleteSub4}>
                                                 </div>) : ''
                                             }
                                         </div>
                                     </div>
                                     <div className={classes.content} style={{display:'inline'}}>
                                         <Typography variant="h5" component="h5" style={{display:'inline'}} >
                                             소매길이
                                         </Typography>
                                         <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                             <SleeveLength4 onClick={this.handleClickSleeve4} />
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <br></br>
                                         {this.state.sleeveNo4 >0 ?
                                             (<Button style={{fontSize:20, width:150, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDelete4} endIcon={<DeleteIcon />} > {this.state.sleeveName4} </Button> ) : ''
                                         }
                                         {polyLast === this.state.tabIndex1 ? (
                                             <Button style={{marginTop: 20}}
                                                     type="button"
                                                     className={classes.buttonType2}
                                                     color="primary"
                                                     variant="outlined"
                                                     onClick={()=>(this.handleSave())}
                                             >
                                                 저장
                                             </Button>
                                             ):''}
                                     </div>
                                 </TabPanel>
                             <TabPanel>
                                 <Button style={{marginTop: 20}}
                                         type="button"
                                         className={classes.buttonType2}
                                         color="primary"
                                         variant="outlined"
                                         onClick={()=>(this.handleSave())}
                                 >
                                     저장
                                 </Button>
                             </TabPanel>

                             </Tabs>
                         </TabPanel>
                             <TabPanel>
                            <BasicImageList onClick={this.handleClickItem} />
                          </TabPanel>
                         </Tabs>
                     </Grid>
                 </Grid>
                </div>

                <hr></hr>
                <Grid container>
                    <Grid item xs={3} lg={1} style={{marginRight:10}}>
                {/*<Button*/}
                {/*    type="submit"*/}
                {/*    className={classes.buttonType1}*/}
                {/*    variant="outlined"*/}
                {/*    onClick={this.handlePrevious.bind(this)}*/}
                {/*>*/}
                {/*    Previous*/}
                {/*</Button>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={3} lg={1}>*/}
                {/*<Button*/}
                {/*    type="submit"*/}
                {/*    className={classes.buttonType1}*/}
                {/*    variant="outlined"*/}
                {/*    onClick={this.handleNext.bind(this)}*/}
                {/*>*/}
                {/*    Next*/}
                {/*</Button>*/}
                    </Grid>
                    {authorityNo > 3 ? (
                    <Grid item xs={4} lg={2} style={{marginLeft:'auto'}}>
                        <Button
                            type="button"
                            className={classes.buttonType2}
                            color="primary"
                            variant="outlined"
                            onClick={()=>history.push('/step3')}
                        >
                            Next Step
                        </Button>
                    </Grid>
                        ): ''}
                </Grid>
                <ErrorIcon/>
                <Typography variant="h6" component="h4" style={{display:'inline'}}>
                    우측 상단에 이미지리스트에서 작업 할 이미지 선택 / 영역정보가 존재하는 탭(아우터, 상의, 하의, 원피스)에서 색상 및 소매길이 선택 후 다음 탭으로 이동 / 영역정보가 존재하는 마지막 탭 입력 후 저장버튼 클릭
                </Typography>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Step2)));