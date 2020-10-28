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
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BasicImageList from "./step2/BasicImageList";
import {fabric} from "fabric";
import {toJS} from "mobx";
import DeleteIcon from "@material-ui/icons/Delete";
import ErrorIcon from "@material-ui/icons/Error";
import ImagePopupModal from "../components/ImagePopupModal";

const styles = theme => ({
    root: {
        [theme.breakpoints.up('xl')]: {
            width: "80%",
        },
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
    ErrorIcon: {
        dispaly : 'inline-block',
        verticalAlign : 'middle',
        fontSize : 26,
        marginBottom : 3
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
        padding: 0,
    },
    buttonType1: {
        width: 100,
        marginRight: theme.spacing(2),
    },
    buttonType2: {
        width: 150,
        float: 'right',

    },
    toolButton: {
        border: '1px solid black',
        height: 50,
        width: '100%',
    },
    toolBox: {
        border: '1px solid black',
        marginRight: 1,
        height: '100%',
    },
    canvas: {
        width: '100%',
        minWidth: '100%',
        height: '100vh',
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
    canvas1:{
        [theme.breakpoints.up('xl')]: {
            zoom : "100%",
        },
        overflow:'auto',
        width: 800,
        height: 800,
        zoom : "80%",
        marginLeft:'auto'
    },
    tabliststyle:{
        padding:0,
        "& .react-tabs__tab--selected":{
            height:59,
            border:'none',
            background:'#000',
            color:'#fff'
        },
    },
    btnstyle:{
        width: '25%',
        height:60,
        textAlign:'center',
        listStyle: 'none',
        display: 'inline-block',
        border: '1px solid #e2e2e2',
        borderRadius:0,
        bottom: '-1px',
        position: 'relative',
        padding: '6px 12px',
        cursor:'pointer',
        background:'#fff',
    },
    tabletxt:{
        width:'50%',
        fontFamily: 'NotoSansCJKkr',
        fontSize: '15px',
        fontWeight: '500',
        color:'#7d7d7d',
    },
});

@inject('authStore', 'imageStore', 'polygonStore', 'currentStepStore', 'basicCategoryStore', 'checkHighLabelStore')
@observer
class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected : [],
            comment: '',
            workNo: 0,
            imageData: '',
            polyNo: '',
            tabIndex1: 1,
            tabIndex2: 0,
            tabController: [],
            canvasWidth: 0,
            canvasHeight: 0,
            imgtext: "선택한 이미지가 없습니다."
        }
        this.handleClickSubColor1 = this.handleClickSubColor1.bind(this)
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
        this.props.checkHighLabelStore.doBasicLabelCompleteUp(id,2);
        this.props.enqueueSnackbar("기본 레이블링", {
            variant: 'success',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            }
        });
        this.setState({
            boundaryList: this.props.imageStore.boundaryList,
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })
        this.canvas = new fabric.Canvas('c');

        this.props.basicCategoryStore.LoadColorList();
        this.props.basicCategoryStore.LoadSleeveList();

    }

    handleClickItem = (workNo, imageData, polyNo, comment) => {
        // let check = true;
        // if (this.state.workNo != 0) {
        //     check = window.confirm("작업을 변경하면 입력한 값이 초기화 됩니다. 변경하시겠습니까?");
        // }
        // if (check) {
            this.deleteAll();
            this.setState({comment: comment})
            this.props.polygonStore.changeNewPolygonLocationWorkNo(workNo);
            this.canvas.setWidth(0);
            this.canvas.setHeight(0);
            this.onImgLoad(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`);
            if (comment === null) {
                this.props.polygonStore.LoadPolygonLocation(workNo, this.polyListCallback);
            } else {
                this.props.polygonStore.LoadPolygonLocation(workNo,this.polyListCallback);
                this.props.polygonStore.LoadLabelNoList(workNo, this.labelNoListCallback);
            }
            this.setState({imgtext: "",});
    }
    labelNoListCallback = (labelNoList, workNo) => {
        let tabIndex2 = labelNoList[0] - 1;
        this.onSelectTab2(tabIndex2)
        this.setState({tabController: labelNoList, workNo: workNo});
        this.setState({tabIndex1: 0, tabIndex2: tabIndex2});
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
            width: this.canvas.width,
            height: this.canvas.height,
            originX: 'left',
            originY: 'top'
        });
    }

    polyListCallback = (polyInfo, workNo) => {
        let tabIndex2 = polyInfo[0] - 1;
        this.onSelectTab2(tabIndex2);
        this.setState({tabController: polyInfo, workNo: workNo});
        this.setState({tabIndex1: 0, tabIndex2: tabIndex2});
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
            width: this.canvas.width,
            height: this.canvas.height,
            originX: 'left',
            originY: 'top'
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


    handleClickSubColor1() {
        if (this.props.checkHighLabelStore.outerReviewHighLabel.colorCategoryNo1 === 0) {
            alert('메인 색상을 먼저 선택해 주세요');
            this.props.checkHighLabelStore.deleteSubColor1();
        }
    }

    handleClickSubColor2() {
        if (this.props.checkHighLabelStore.topReviewHighLabel.colorCategoryNo2 === 0) {
            alert('메인 색상을 먼저 선택해 주세요');
            this.props.checkHighLabelStore.deleteSubColor2();
        }
    }

    handleClickSubColor3() {
        if (this.props.checkHighLabelStore.pantsReviewHighLabel.colorCategoryNo3 === 0) {
            alert('메인 색상을 먼저 선택해 주세요');
            this.props.checkHighLabelStore.deleteSubColor3();
        }
    }

    handleClickSubColor4() {
        if (this.props.checkHighLabelStore.onePieceReviewHighLabel.colorCategoryNo4 === 0) {
            alert('메인 색상을 먼저 선택해 주세요');
            this.props.checkHighLabelStore.deleteSubColor4();
        }
    }

    handleDelete1() {
        this.props.checkHighLabelStore.deleteSleeveLength1();
    }

    handleDelete2() {
        this.props.checkHighLabelStore.deleteSleeveLength2();
    }

    handleDelete4() {
        this.props.checkHighLabelStore.deleteSleeveLength4();
    }

    colorDelete1() {
        this.props.checkHighLabelStore.deleteColor1();
        this.props.checkHighLabelStore.deleteSubColor1();
    }

    colorDelete2() {
        this.props.checkHighLabelStore.deleteColor2();
        this.props.checkHighLabelStore.deleteSubColor2();
    }

    colorDelete3() {
        this.props.checkHighLabelStore.deleteColor3();
        this.props.checkHighLabelStore.deleteSubColor3();
    }

    colorDelete4() {
        this.props.checkHighLabelStore.deleteColor4();
        this.props.checkHighLabelStore.deleteSubColor4();
    }

    colorDeleteSub1() {
        this.props.checkHighLabelStore.deleteSubColor1();
    }

    colorDeleteSub2() {
        this.props.checkHighLabelStore.deleteSubColor2();
    }

    colorDeleteSub3() {
        this.props.checkHighLabelStore.deleteSubColor3();
    }

    colorDeleteSub4() {
        this.props.checkHighLabelStore.deleteSubColor4();
    }

    lineTwoPoint = [];
    x;
    y;

    onSelectTab2(tabIndex2) {
        let polyNo = tabIndex2 + 1;
        const {locationPolygonList} = this.props.polygonStore;
        const selectedPoly = (toJS(locationPolygonList).filter(poly => poly.polyNo === polyNo));

        if (selectedPoly.length !== 0) {
            this.deleteAll();
            for (let i = 0; i < selectedPoly.length; i++) {
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

                if (i !== 0) {
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
                            selectable: false,
                            evented: false,
                            left: x1,
                            top: y1,
                        });
                    this.canvas.add(polyline);
                    this.canvas.sendToBack(polyline);
                }
            }
            let x1 = selectedPoly[selectedPoly.length - 1].locationX;
            let x2 = selectedPoly[0].locationX;
            let x3 = 0;
            let y1 = selectedPoly[selectedPoly.length - 1].locationY;
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

            this.setState({
                tabIndex2: tabIndex2,
            })
        } else {
            this.setState({
                tabIndex2: tabIndex2,
            })
        }
    };

    handleSave = () => {
        const {polyInfo} = this.props.polygonStore;
        let savebtn = true;
        for (let i = 0; i < polyInfo.length; i++) {
            switch (polyInfo[i]) {
                case 1 :
                    if (this.props.checkHighLabelStore.outerReviewHighLabel.colorCategoryNo1 === 0) {
                        alert("아우터의 메인색상을 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    } else if (this.props.checkHighLabelStore.outerReviewHighLabel.sleeveLengthCategoryNo1 === "") {
                        alert("아우터의 소매길이를 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    }
                    break;
                case 2 :
                    if (this.props.checkHighLabelStore.topReviewHighLabel.colorCategoryNo2 === 0) {
                        alert("상의의 메인색상을 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    } else if (this.props.checkHighLabelStore.topReviewHighLabel.sleeveLengthCategoryNo2 === "") {
                        alert("상의의 소매길이를 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    }
                    break;
                case 3 :
                    if (this.props.checkHighLabelStore.pantsReviewHighLabel.colorCategoryNo3 === 0) {
                        alert("하의의 메인색상을 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    }
                    break;
                case 4 :
                    if (this.props.checkHighLabelStore.onePieceReviewHighLabel.colorCategoryNo4 === 0) {
                        alert("원피스의 메인색상을 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    } else if (this.props.checkHighLabelStore.onePieceReviewHighLabel.sleeveLengthCategoryNo4 === "") {
                        alert("원피의 소매길이를 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    }
                    break;
                default: break;
            }
        }
        if (savebtn) {
            if (this.state.workNo !== 0) {
                const finalCheck = window.confirm("이미지에 필요한 정보를 입력하셨습니까?");
                if (finalCheck) {
                    const selected = toJS(this.props.checkHighLabelStore.selectedItem);
                    if(selected.length > 0 && selected !== null) {
                        this.props.checkHighLabelStore.DoSelectedBasicLabelUp(selected);
                    }
                    else {
                        this.props.checkHighLabelStore.DoBasicLabelUp();
                    }
                    this.setState({
                        tabIndex1: 1,
                        workNo : 0,
                    });
                    this.canvas.backgroundImage = 0;
                    this.canvas.setWidth(0);
                    this.canvas.setHeight(0);
                    this.canvas.renderAll();
                    this.deleteAll();
                }
            } else {
                alert("작업을 먼저 선택해 주세요.");
                this.setState({
                    tabIndex1: 1,
                });
            }
        }

    }
    handleUpdate = () => {
        const finalCheck = window.confirm("이미지 수정을 완료하셨습니까?");
        if (finalCheck) {
            const selected = toJS(this.props.checkHighLabelStore.selectedItem);
            if(selected.length > 0 && selected !== null) {
                this.props.checkHighLabelStore.DeleteSelectedBasicLabel(selected);
            }
            else {
                this.props.checkHighLabelStore.DeleteBasicLabel();
            }
            this.canvas.backgroundImage = 0;
            this.canvas.setWidth(0);
            this.canvas.setHeight(0);
            this.canvas.renderAll();
            this.deleteAll();
            this.setState({
                workNo : 0,
                tabIndex1: 1,
            });
        }
    }

    deleteAll = () => {
        let objList = [];
        this.canvas.getObjects().forEach(function (o) {
            objList.push(o);
        })
        for (let i = 0; i <= objList.length; i++) {
            this.canvas.remove(objList[i]);
        }
    }
    onSelectTab1 = (tabIndex1) => {
        if (this.state.workNo !== 0) {
            if(tabIndex1 === 1) {
                this.setState({
                    selected : [],
                    workNo : 0,
                })
                this.canvas.backgroundImage = 0;
                this.canvas.setWidth(0);
                this.canvas.setHeight(0);
                this.canvas.renderAll();
                this.props.checkHighLabelStore.selectedItemReset();
                this.deleteAll();
            }
            this.setState({tabIndex1: tabIndex1});
        } else {
            alert("이미지 리스트 탭에서 작업할 이미지를 선택해주세요.");
        }
        this.setState({imgtext: "선택한 이미지가 없습니다.",});

    }
    nextTab = () => {
        const {polyInfo} = this.props.polygonStore;
        // const currentTap = this.state.tabIndex2;
        let tabIndex2 = 0;
        for (let i = 0; i < polyInfo.length; i++) {
            if (polyInfo[i] === this.state.tabIndex2 + 1) {
                tabIndex2 = (polyInfo[i + 1] - 1);
                this.setState({tabIndex2: tabIndex2});
            }
        }
        this.onSelectTab2(tabIndex2);
    }

    render() {
        setTimeout(() => document.body.style.zoom = "100%", 100);
        const {classes, history} = this.props;
        const {authorityNo} = this.props.authStore.loginUser.authorityNo;
        const {polyLast} = this.props.polygonStore;
        // const {isWorkNo} = this.props.imageStore;
        const {outerReviewHighLabel} = this.props.checkHighLabelStore;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer}/>
                <div className={classes.mainContent}>
                    <Grid container>
                        <Grid item xs={12} lg={5} xl={5} style={{marginTop:10}}>
                            <div className={classes.canvas1} style={{display:"table"}}>
                                <div style={{width:'800px',height:'650px',background:'#e2e2e2',textAlign:'center',fontSize:'17px',display:'table-cell',verticalAlign:'middle'}}>{this.state.imgtext} </div>
                                <canvas id="c" width={this.state.canvasWidth} height={this.state.canvasHeight}></canvas>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={6} xl={6} style={{marginLeft: 'auto'}}>
                            <Tabs selectedIndex={this.state.tabIndex1}
                                  onSelect={tabIndex1 => this.onSelectTab1(tabIndex1)}>
                                <TabList>
                                    <Tab style={{width: '50%', height: 60, textAlign: 'center'}}><h3>기본 레이블링</h3></Tab>
                                    <Tab style={{width: '50%', height: 60, textAlign: 'center'}}><h3>이미지 리스트 ( <b style={{color:"red"}}>{this.props.checkHighLabelStore.complete}</b> / <b>{this.props.checkHighLabelStore.total}</b> )</h3></Tab>
                                </TabList>

                                <TabPanel>
                                    <Tabs selectedIndex={this.state.tabIndex2} style={{boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.45)',background:'#fff',height:'500px'}}
                                          onSelect={tabIndex2 => this.onSelectTab2(tabIndex2)}>
                                        <TabList className={classes.tabliststyle}>
                                            <Tab className={classes.btnstyle}
                                                 disabled={"" === String(this.state.tabController.filter((poly => poly === 1)))}
                                            ><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>아우터</h3></Tab>
                                            <Tab className={classes.btnstyle}
                                                 disabled={"" === String(this.state.tabController.filter((poly => poly === 2)))}
                                            ><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>상의</h3></Tab>
                                            <Tab className={classes.btnstyle}
                                                 disabled={"" === String(this.state.tabController.filter((poly => poly === 3)))}
                                            ><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>하의</h3></Tab>
                                            <Tab className={classes.btnstyle}
                                                 disabled={"" === String(this.state.tabController.filter((poly => poly === 4)))}
                                            ><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>원피스</h3></Tab>
                                        </TabList>

                                        <TabPanel style={{padding:'0 30px'}}>
                                            <div className={classes.content} style={{display: 'inline'}}>
                                                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                                                    색상
                                                </Typography>
                                                &nbsp;&nbsp;{outerReviewHighLabel.colorCategoryNo1 !== 0 ?
                                                <Typography style={{display: 'inline-block', color: 'red'}}>색상버튼 클릭 시
                                                    색상이 삭제 됩니다.</Typography> : ''}
                                                <div style={{display: 'inline-block', float: 'right', marginTop: -3}}>
                                                    <Color1 onClickSub={this.handleClickSubColor1}
                                                            style={{display: 'inline', float: 'right'}}/>
                                                </div>
                                                <div>
                                                    <hr></hr>
                                                </div>
                                                <div>
                                                    <br></br>
                                                    {outerReviewHighLabel.colorCategoryNo1 > 0 ?
                                                        (<div style={{
                                                            display: 'inline-block',
                                                            textAlign: 'center',
                                                            width: 85,
                                                            height: 85,
                                                            margin: 'auto',
                                                            border: '1px solid black',
                                                            backgroundColor: `${outerReviewHighLabel.colorItemMemo1}`
                                                        }} onClick={this.colorDelete1}>

                                                        </div>) : ''
                                                    }
                                                    &nbsp;
                                                    {outerReviewHighLabel.subColorCategoryNo1 > 0 ?
                                                        (<div style={{
                                                            display: 'inline-block',
                                                            textAlign: 'center',
                                                            width: 85,
                                                            height: 85,
                                                            margin: 'auto',
                                                            border: '1px solid black',
                                                            backgroundColor: `${outerReviewHighLabel.subColorItemMemo1}`
                                                        }} onClick={this.colorDeleteSub1}>
                                                        </div>) : ''
                                                    }
                                                </div>
                                            </div>
                                            <div className={classes.content} style={{display: 'inline'}}>
                                                <Typography variant="h5" component="h5" style={{display: 'inline'}}>
                                                    소매길이
                                                </Typography>
                                                <div style={{display: 'inline-block', float: 'right', marginTop: -3}}>
                                                    <SleeveLength1/>
                                                </div>
                                                <div>
                                                    <hr></hr>
                                                </div>

                                                <br></br>
                                                {outerReviewHighLabel.sleeveLengthCategoryNo1 > 0 ?
                                                    (<Button style={{fontSize: 20, width: 150, borderRadius: 50}}
                                                             variant="outlined" onClick={this.handleDelete1} endIcon={
                                                        <DeleteIcon/>}> {outerReviewHighLabel.sleeveLengthItemName1} </Button>) : ''
                                                }

                                                {polyLast === this.state.tabIndex2 ? (
                                                    <Button style={{marginTop: 20}}
                                                            type="button"
                                                            className={classes.buttonType2}
                                                            variant="outlined"
                                                            disabled={this.state.comment !== null}
                                                            onClick={() => (this.handleSave())}
                                                    >
                                                        저장
                                                    </Button>
                                                ) : (
                                                    <Button style={{marginTop: 20}}
                                                            type="button"
                                                            className={classes.buttonType2}
                                                            variant="outlined"
                                                            onClick={() => (this.nextTab())}
                                                    >
                                                        다음
                                                    </Button>
                                                )}
                                                {this.state.comment !== null && polyLast === this.state.tabIndex2 ?
                                                    <Button style={{marginTop: 20, marginRight: 10}}
                                                            type="button"
                                                            className={classes.buttonType2}
                                                            variant="outlined"
                                                            onClick={() => (this.handleUpdate())}
                                                    >
                                                        수정
                                                    </Button>
                                                    : ''
                                                }
                                            </div>
                                        </TabPanel>

                                        <TabPanel style={{padding:'0 30px'}}>
                                            <div className={classes.content} style={{display: 'inline'}}>
                                                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                                                    색상
                                                </Typography>
                                                &nbsp;&nbsp;{this.props.checkHighLabelStore.topReviewHighLabel.colorCategoryNo2 !== 0 ?
                                                <Typography style={{display: 'inline-block', color: 'red'}}>색상버튼 클릭 시
                                                    색상이 삭제 됩니다.</Typography> : ''}
                                                <div style={{display: 'inline-block', float: 'right', marginTop: -3}}>
                                                    <Color2 onClickSub={() => this.handleClickSubColor2()}
                                                            style={{display: 'inline', float: 'right'}}/>
                                                </div>
                                                <div>
                                                    <hr></hr>
                                                </div>
                                                <div>
                                                    <br></br>
                                                    {this.props.checkHighLabelStore.topReviewHighLabel.colorCategoryNo2 > 0 ?
                                                        (<div style={{
                                                            display: 'inline-block',
                                                            textAlign: 'center',
                                                            width: 85,
                                                            height: 85,
                                                            margin: 'auto',
                                                            border: '1px solid black',
                                                            backgroundColor: `${this.props.checkHighLabelStore.topReviewHighLabel.colorItemMemo2}`
                                                        }} onClick={this.colorDelete2}>

                                                        </div>) : ''
                                                    }
                                                    &nbsp;
                                                    {this.props.checkHighLabelStore.topReviewHighLabel.subColorCategoryNo2 > 0 ?
                                                        (<div style={{
                                                            display: 'inline-block',
                                                            textAlign: 'center',
                                                            width: 85,
                                                            height: 85,
                                                            margin: 'auto',
                                                            border: '1px solid black',
                                                            backgroundColor: `${this.props.checkHighLabelStore.topReviewHighLabel.subColorItemMemo2}`
                                                        }} onClick={this.colorDeleteSub2}>
                                                        </div>) : ''
                                                    }
                                                </div>
                                            </div>
                                            <div className={classes.content} style={{display: 'inline'}}>
                                                <Typography variant="h5" component="h5" style={{display: 'inline'}}>
                                                    소매길이
                                                </Typography>
                                                <div style={{display: 'inline-block', float: 'right', marginTop: -3}}>
                                                    <SleeveLength2/>
                                                </div>
                                                <div>
                                                    <hr></hr>
                                                </div>
                                                <br></br>
                                                {this.props.checkHighLabelStore.topReviewHighLabel.sleeveLengthCategoryNo2 > 0 ?
                                                    (<Button style={{fontSize: 20, width: 150, borderRadius: 50}}
                                                             variant="outlined" onClick={this.handleDelete2} endIcon={
                                                        <DeleteIcon/>}> {this.props.checkHighLabelStore.topReviewHighLabel.sleeveLengthItemName2} </Button>) : ''
                                                }

                                                {polyLast === this.state.tabIndex2 ? (
                                                    <Button style={{marginTop: 20}}
                                                            type="button"
                                                            className={classes.buttonType2}
                                                            variant="outlined"
                                                            disabled={this.state.comment !== null}
                                                            onClick={() => (this.handleSave())}
                                                    >
                                                        저장
                                                    </Button>
                                                ) : (
                                                    <Button style={{marginTop: 20}}
                                                            type="button"
                                                            className={classes.buttonType2}
                                                            variant="outlined"
                                                            onClick={() => (this.nextTab())}
                                                    >
                                                        다음
                                                    </Button>
                                                )}
                                                {this.state.comment !== null && polyLast === this.state.tabIndex2 ?
                                                    <Button style={{marginTop: 20, marginRight: 10}}
                                                            type="button"
                                                            className={classes.buttonType2}
                                                            variant="outlined"
                                                            onClick={() => (this.handleUpdate())}
                                                    >
                                                        수정
                                                    </Button>
                                                    : ''
                                                }
                                            </div>
                                        </TabPanel>
                                        <TabPanel style={{padding:'0 30px'}}>
                                            <div className={classes.content} style={{display: 'inline'}}>
                                                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                                                    색상
                                                </Typography>
                                                &nbsp;&nbsp;{this.props.checkHighLabelStore.pantsReviewHighLabel.colorCategoryNo3 !== 0 ?
                                                <Typography style={{display: 'inline-block', color: 'red'}}>색상버튼 클릭 시
                                                    색상이 삭제 됩니다.</Typography> : ''}
                                                <div style={{display: 'inline-block', float: 'right', marginTop: -3}}>
                                                    <Color3 onClickSub={() => this.handleClickSubColor3()}
                                                            style={{display: 'inline', float: 'right'}}/>
                                                </div>
                                                <div>
                                                    <hr></hr>
                                                </div>
                                                <div>
                                                    {this.props.checkHighLabelStore.pantsReviewHighLabel.colorCategoryNo3 > 0 ?
                                                        (<div style={{
                                                            display: 'inline-block',
                                                            textAlign: 'center',
                                                            width: 85,
                                                            height: 85,
                                                            margin: 'auto',
                                                            border: '1px solid black',
                                                            backgroundColor: `${this.props.checkHighLabelStore.pantsReviewHighLabel.colorItemMemo3}`
                                                        }} onClick={this.colorDelete3}>

                                                        </div>) : ''
                                                    }
                                                    &nbsp;
                                                    {this.props.checkHighLabelStore.pantsReviewHighLabel.subColorCategoryNo3 > 0 ?
                                                        (<div style={{
                                                            display: 'inline-block',
                                                            textAlign: 'center',
                                                            width: 85,
                                                            height: 85,
                                                            margin: 'auto',
                                                            border: '1px solid black',
                                                            backgroundColor: `${this.props.checkHighLabelStore.pantsReviewHighLabel.subColorItemMemo3}`
                                                        }} onClick={this.colorDeleteSub3}>
                                                        </div>) : ''
                                                    }
                                                </div>

                                                {polyLast === this.state.tabIndex2 ? (
                                                    <Button style={{marginTop: 20}}
                                                            type="button"
                                                            className={classes.buttonType2}
                                                            variant="outlined"
                                                            disabled={this.state.comment !== null}
                                                            onClick={() => (this.handleSave())}
                                                    >
                                                        저장
                                                    </Button>
                                                ) : (
                                                    <Button style={{marginTop: 20}}
                                                            type="button"
                                                            className={classes.buttonType2}
                                                            variant="outlined"
                                                            onClick={() => (this.nextTab())}
                                                    >
                                                        다음
                                                    </Button>
                                                )}
                                                {this.state.comment !== null && polyLast === this.state.tabIndex2 ?
                                                    <Button style={{marginTop: 20, marginRight: 10}}
                                                            type="button"
                                                            className={classes.buttonType2}
                                                            variant="outlined"
                                                            onClick={() => (this.handleUpdate())}
                                                    >
                                                        수정
                                                    </Button>
                                                    : ''
                                                }
                                            </div>
                                        </TabPanel>
                                        <TabPanel style={{padding:'0 30px'}}>
                                            <div className={classes.content} style={{display: 'inline'}}>
                                                <Typography variant="h5" component="h2" style={{display: 'inline'}}>
                                                    색상
                                                </Typography>
                                                &nbsp;&nbsp;{this.props.checkHighLabelStore.onePieceReviewHighLabel.colorCategoryNo4 !== 0 ?
                                                <Typography style={{display: 'inline-block', color: 'red'}}>색상버튼 클릭 시
                                                    색상이 삭제 됩니다.</Typography> : ''}
                                                <div style={{display: 'inline-block', float: 'right', marginTop: -3}}>
                                                    <Color4 onClickSub={() => this.handleClickSubColor4()}
                                                            style={{display: 'inline', float: 'right'}}/>
                                                </div>
                                                <div>
                                                    <hr></hr>
                                                </div>
                                                <div>
                                                    <br></br>
                                                    {this.props.checkHighLabelStore.onePieceReviewHighLabel.colorCategoryNo4 > 0 ?
                                                        (<div style={{
                                                            display: 'inline-block',
                                                            textAlign: 'center',
                                                            width: 85,
                                                            height: 85,
                                                            margin: 'auto',
                                                            border: '1px solid black',
                                                            backgroundColor: `${this.props.checkHighLabelStore.onePieceReviewHighLabel.colorItemMemo4}`
                                                        }} onClick={this.colorDelete4}>

                                                        </div>) : ''
                                                    }
                                                    &nbsp;
                                                    {this.props.checkHighLabelStore.onePieceReviewHighLabel.subColorCategoryNo4 > 0 ?
                                                        (<div style={{
                                                            display: 'inline-block',
                                                            textAlign: 'center',
                                                            width: 85,
                                                            height: 85,
                                                            margin: 'auto',
                                                            border: '1px solid black',
                                                            backgroundColor: `${this.props.checkHighLabelStore.onePieceReviewHighLabel.subColorItemMemo4}`
                                                        }} onClick={this.colorDeleteSub4}>
                                                        </div>) : ''
                                                    }
                                                </div>
                                            </div>
                                            <div className={classes.content} style={{display: 'inline'}}>
                                                <Typography variant="h5" component="h5" style={{display: 'inline'}}>
                                                    소매길이
                                                </Typography>
                                                <div style={{display: 'inline-block', float: 'right', marginTop: -3}}>
                                                    <SleeveLength4/>
                                                </div>
                                                <div>
                                                    <hr></hr>
                                                </div>
                                                <br></br>
                                                {this.props.checkHighLabelStore.onePieceReviewHighLabel.sleeveLengthCategoryNo4 > 0 ?
                                                    (<Button style={{fontSize: 20, width: 150, borderRadius: 50}}
                                                             variant="outlined" onClick={this.handleDelete4} endIcon={
                                                        <DeleteIcon/>}> {this.props.checkHighLabelStore.onePieceReviewHighLabel.sleeveLengthItemName4} </Button>) : ''
                                                }

                                                {polyLast === this.state.tabIndex2 ? (
                                                    <Button style={{marginTop: 20}}
                                                            type="button"
                                                            className={classes.buttonType2}
                                                            variant="outlined"
                                                            disabled={this.state.comment !== null}
                                                            onClick={() => (this.handleSave())}
                                                    >
                                                        저장
                                                    </Button>
                                                ) : (
                                                    <Button style={{marginTop: 20}}
                                                            type="button"
                                                            className={classes.buttonType2}
                                                            variant="outlined"
                                                            onClick={() => (this.nextTab())}
                                                    >
                                                        다음
                                                    </Button>
                                                )}
                                                {this.state.comment !== null && polyLast === this.state.tabIndex2 ?
                                                    <Button style={{marginTop: 20, marginRight: 10}}
                                                            type="button"
                                                            className={classes.buttonType2}
                                                            variant="outlined"
                                                            onClick={() => (this.handleUpdate())}
                                                    >
                                                        수정
                                                    </Button>
                                                    : ''
                                                }
                                            </div>
                                        </TabPanel>


                                    </Tabs>
                                </TabPanel>
                                <TabPanel>
                                    <BasicImageList onClick={this.handleClickItem} onImageDoubleClick={image => this.props.imageStore.onImageDoubleClick(image) }/>
                                </TabPanel>
                            </Tabs>
                        </Grid>
                    </Grid>
                </div>

                
                <Grid container>
                    <Grid item xs={3} lg={1} style={{marginRight: 10}}>
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
                        <Grid item xs={4} lg={2} style={{marginLeft: 'auto'}}>
                            <Button
                                type="button"
                                className={classes.buttonType2}
                                variant="outlined"
                                onClick={() => history.push('/step3')}
                            >
                                Next Step
                            </Button>
                        </Grid>
                    ) : ''}
                </Grid>
                {/* <Typography variant="h6" component="h4" style={{display: 'inline'}}>
                    <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/> 우측 상단에 이미지리스트에서 작업 할 이미지 선택 </p>
                    <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/> 영역정보가 존재하는 탭(아우터, 상의, 하의, 원피스)에서 색상 및 소매길이 선택 후 다음 탭으로 이동 </p>
                    <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/> 영역정보가 존재하는 마지막 탭 입력 후 저장버튼 클릭 </p>
                    <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/> 체크박스 클릭후 대표 이미지 선택하여 작업시 체크한 이미지 전부 동일한 값으로 입력됩니다.</p>
                    
                </Typography> */}
                <ImagePopupModal store={this.props.imageStore} />
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles)(Step2)));