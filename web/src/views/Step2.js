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

@inject('basicLabelStore','authStore','imageStore','polygonStore', 'currentStepStore','basicCategoryStore', 'checkHighLabelStore')
@observer
class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment:'',
            workNo : 0,
            imageData:'',
            polyNo:'',
            tabIndex1:1,
            tabIndex2:0,
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

    handleClickItem = (workNo, imageData, polyNo,comment) => {
        let check = true;
        if(this.state.workNo !=0){
            check = window.confirm("작업을 변경하면 입력한 값이 초기화 됩니다. 변경하시겠습니까?");
        }
        if(check){
            this.deleteAll();
            this.props.imageStore.changeWorkNo(workNo);
            this.props.polygonStore.changeNewPolygonLocationWorkNo(workNo);
            this.props.polygonStore.LoadPolygonLocation(workNo);
            this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
                width: 800,
                height: 800,
                originX: 'left',
                originY: 'top'
            });
            this.setState({
                tabIndex2: 0,
                tabIndex1: 0,
                workNo : workNo,
                comment:comment,
            })
        }
    }



    handleClickSubColor1(){
        console.log('main',this.props.checkHighLabelStore.outerReviewHighLabel.colorCategoryNo1)
        if(this.props.checkHighLabelStore.outerReviewHighLabel.colorCategoryNo1 == 0 ){ alert('메인 색상을 먼저 선택해 주세요')}
    }
    handleClickSubColor2(){
        if(this.props.checkHighLabelStore.topReviewHighLabel.colorCategoryNo2 == 0 ){ alert('메인 색상을 먼저 선택해 주세요')}
    }
    handleClickSubColor3(){
        if(this.props.checkHighLabelStore.pantsReviewHighLabel.colorCategoryNo3 == 0 ){ alert('메인 색상을 먼저 선택해 주세요')}
    }
    handleClickSubColor4(){
        if(this.props.checkHighLabelStore.onePieceReviewHighLabel.colorCategoryNo4 == 0 ){ alert('메인 색상을 먼저 선택해 주세요')}
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

    lineTwoPoint =[];
    x;
    y;

    onSelectTab2(tabIndex2) {
        console.log(this.props.polygonStore.polyLast);
        let polyNo = tabIndex2 + 1;
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
                            selectable: false,
                            evented: false,
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
                tabIndex2: tabIndex2,
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
                    if (this.props.checkHighLabelStore.outerReviewHighLabel.colorCategoryNo1 == 0) {
                        alert("아우터의 메인색상을 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    } else if (this.props.checkHighLabelStore.outerReviewHighLabel.sleeveLengthCategoryNo1 == "") {
                        alert("아우터의 소매길이를 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    }
                    break;
                case 2 :
                    if (this.props.checkHighLabelStore.topReviewHighLabel.colorCategoryNo2 == 0) {
                        alert("상의의 메인색상을 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    } else if (this.props.checkHighLabelStore.topReviewHighLabel.sleeveLengthCategoryNo2 == "") {
                        alert("상의의 소매길이를 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    }
                    break;
                case 3 :
                    if (this.props.checkHighLabelStore.pantsReviewHighLabel.colorCategoryNo3 ==0) {
                        alert("하의의 메인색상을 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    }
                    break;
                case 4 :
                    if (this.props.checkHighLabelStore.onePieceReviewHighLabel.colorCategoryNo4 == 0) {
                        alert("원피스의 메인색상을 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    } else if (this.props.checkHighLabelStore.onePieceReviewHighLabel.sleeveLengthCategoryNo4 == "") {
                        alert("원피의 소매길이를 선택해주세요");
                        savebtn = false;
                        i = polyInfo.length;
                        break;
                    }
                    break;
            }
        }
        if (savebtn) {
            if(this.state.workNo != 0){
                const finalCheck = window.confirm("이미지에 필요한 정보를 입력하셨습니까?");
                if(finalCheck){
                    this.props.checkHighLabelStore.DoBasicLabelUp();
                    this.props.polygonStore.LoadPolygonImage(this.props.authStore.loginUser.id);
                    this.setState({
                        tabIndex1 : 1,
                    });
                }
            }else{
                alert("작업을 먼저 선택해 주세요.");
                this.setState({
                    tabIndex1: 1,
                });
            }
        }
    }
    handleUpdate = () => {
            const finalCheck = window.confirm("이미지 수정을 완료하셨습니까?");
            if(finalCheck){
                this.props.checkHighLabelStore.DeleteBasicLabel();
                this.props.polygonStore.LoadPolygonImage(this.props.authStore.loginUser.id);
                this.deleteAll();
                this.setState({
                    tabIndex1 : 1,
                });
        }else{
            this.setState({
                tabIndex1: 1,
            });
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
    onSelectTab1 =( tabIndex1 ) => {
        if(this.state.workNo != 0){
            this.setState({tabIndex1 : tabIndex1 });
        }else{
            alert("이미지 리스트 탭에서 작업할 이미지를 선택해주세요.");
        }

    }
    nextTab =() => {
        const {polyInfo} = this.props.polygonStore;
        const currentTap = this.state.tabIndex2;
        let tabIndex2 =0;
        for(let i=0;i < polyInfo.length; i++){
            if(polyInfo[i] == this.state.tabIndex2+1 ){
                tabIndex2 = (polyInfo[i+1]-1);
                this.setState({tabIndex2 : tabIndex2});
            }
        }this.onSelectTab2(tabIndex2);
    }
    render() {
        const {classes,history} = this.props;
        const {authorityNo} = this.props.authStore.loginUser.authorityNo;
        const {isWorkNo} = this.props.imageStore;
        const {polyLast,polyInfo,polygonList} = this.props.polygonStore;
        const {outerReviewHighLabel, topReviewHighLabel , pantsReviewHighLabel, onepieceReviewHighLabel, }= this.props.checkHighLabelStore;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                 <Grid container>
                     <Grid item xs={12} lg={5} xl={5}>
                         <div>
                             <canvas id="c" width="800" height="800">  </canvas>
                         </div>
                     </Grid>
                     <Grid item xs={12} lg={5} xl={5} style={{marginLeft:'auto'}}>
                         <Tabs selectedIndex={this.state.tabIndex1} onSelect={tabIndex1 => this.onSelectTab1(tabIndex1)}>
                             <TabList >
                                 <Tab  style={{width: '50%', height:60,textAlign:'center'}}><h3>기본 레이블링</h3></Tab>
                                 <Tab  style={{width: '50%', height:60,textAlign:'center'}}><h3>이미지 리스트</h3></Tab>
                             </TabList>

                         <TabPanel>
                             <Tabs selectedIndex={this.state.tabIndex2} onSelect={tabIndex2 => this.onSelectTab2(tabIndex2)}>
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
                                         &nbsp;&nbsp;{!outerReviewHighLabel.colorCategoryNo1 == 0 ? <Typography style={{display:'inline-block', color:'red'}}>색상버튼 클릭 시 색상이 삭제 됩니다.</Typography>:''}
                                             <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                 <Color1 onClickSub={this.handleClickSubColor1} style={{display:'inline', float:'right'}}/>
                                             </div>
                                     <div>
                                         <hr></hr>
                                     </div>
                                     <div>
                                             <br></br>
                                         {outerReviewHighLabel.colorCategoryNo1 >0 ?
                                             (<div style={{display:'inline-block',textAlign: 'center',width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${outerReviewHighLabel.colorItemMemo1}`}} onClick={this.colorDelete1}>

                                     </div>) : ''
                                         }
                                         &nbsp;
                                         {outerReviewHighLabel.subColorCategoryNo1 >0 ?
                                             (<div style={{display:'inline-block',textAlign: 'center', width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${outerReviewHighLabel.subColorItemMemo1}`}} onClick={this.colorDeleteSub1}>
                                             </div>) : ''
                                         }
                                     </div>
                                     </div>
                                     <div className={classes.content} style={{display:'inline'}}>
                                             <Typography variant="h5" component="h5" style={{display:'inline'}} >
                                                 소매길이
                                             </Typography>
                                             <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                 <SleeveLength1 />
                                             </div>
                                         <div>
                                             <hr></hr>
                                         </div>

                                         <br></br>
                                         {outerReviewHighLabel.sleeveLengthCategoryNo1 >0 ?
                                             (<Button style={{fontSize:20, width:150, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDelete1} endIcon={<DeleteIcon />} > {outerReviewHighLabel.sleeveLengthItemName1} </Button> ) : ''
                                         }
                                         {!this.state.comment == '' && polyLast == this.state.tabIndex2 ?
                                             <Button style={{marginTop: 20}}
                                                     type="button"
                                                     className={classes.buttonType2}
                                                     color="primary"
                                                     variant="outlined"
                                                     onClick={() => (this.handleUpdate())}
                                             >
                                                 수정
                                             </Button>
                                             :''
                                         }
                                         {polyLast === this.state.tabIndex2?(
                                             <Button style={{marginTop: 20}}
                                                     type="button"
                                                     className={classes.buttonType2}
                                                     color="primary"
                                                     variant="outlined"
                                                     disabled={!this.state.comment == ''}
                                                     onClick={() => (this.handleSave())}
                                             >
                                                 저장
                                             </Button>
                                         ) : (
                                             <Button style={{marginTop: 20}}
                                                     type="button"
                                                     className={classes.buttonType2}
                                                     color="primary"
                                                     variant="outlined"
                                                     onClick={() => (this.nextTab())}
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
                                         &nbsp;&nbsp;{!this.props.checkHighLabelStore.topReviewHighLabel.colorCategoryNo2 == 0 ? <Typography style={{display:'inline-block', color:'red'}}>색상버튼 클릭 시 색상이 삭제 됩니다.</Typography>:''}
                                         <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                             <Color2 onClickSub={()=>this.handleClickSubColor2()} style={{display:'inline', float:'right'}}/>
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <div>
                                             <br></br>
                                             {this.props.checkHighLabelStore.topReviewHighLabel.colorCategoryNo2>0 ?
                                                 (<div style={{display:'inline-block',textAlign: 'center',width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${this.props.checkHighLabelStore.topReviewHighLabel.colorItemMemo2}`}} onClick={this.colorDelete2}>

                                                 </div>) : ''
                                             }
                                             &nbsp;
                                             {this.props.checkHighLabelStore.topReviewHighLabel.subColorCategoryNo2 >0 ?
                                                 (<div style={{display:'inline-block',textAlign: 'center', width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${this.props.checkHighLabelStore.topReviewHighLabel.subColorItemMemo2}`}} onClick={this.colorDeleteSub2}>
                                                 </div>) : ''
                                             }
                                         </div>
                                     </div>
                                     <div className={classes.content} style={{display:'inline'}}>
                                         <Typography variant="h5" component="h5" style={{display:'inline'}} >
                                             소매길이
                                         </Typography>
                                         <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                             <SleeveLength2 />
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <br></br>
                                         {this.props.checkHighLabelStore.topReviewHighLabel.sleeveLengthCategoryNo2 >0 ?
                                             (<Button style={{fontSize:20, width:150, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDelete2} endIcon={<DeleteIcon />} > {this.props.checkHighLabelStore.topReviewHighLabel.sleeveLengthItemName2} </Button> ) : ''
                                         }
                                         {!this.state.comment == '' && polyLast == this.state.tabIndex2 ?
                                             <Button style={{marginTop: 20}}
                                                     type="button"
                                                     className={classes.buttonType2}
                                                     color="primary"
                                                     variant="outlined"
                                                     onClick={() => (this.handleUpdate())}
                                             >
                                                 수정
                                             </Button>
                                             :''
                                         }
                                         {polyLast === this.state.tabIndex2 ? (
                                             <Button style={{marginTop: 20}}
                                                     type="button"
                                                     className={classes.buttonType2}
                                                     color="primary"
                                                     variant="outlined"
                                                     disabled={!this.state.comment == ''}
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
                                         &nbsp;&nbsp;{!this.props.checkHighLabelStore.pantsReviewHighLabel.colorCategoryNo3 == 0 ? <Typography style={{display:'inline-block', color:'red'}}>색상버튼 클릭 시 색상이 삭제 됩니다.</Typography>:''}
                                         <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                             <Color3 onClickSub={()=>this.handleClickSubColor3()} style={{display:'inline', float:'right'}}/>
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <div>
                                             {this.props.checkHighLabelStore.pantsReviewHighLabel.colorCategoryNo3 >0 ?
                                                 (<div style={{display:'inline-block',textAlign: 'center',width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${this.props.checkHighLabelStore.pantsReviewHighLabel.colorItemMemo3}`}} onClick={this.colorDelete3}>

                                                 </div>) : ''
                                             }
                                             &nbsp;
                                             {this.props.checkHighLabelStore.pantsReviewHighLabel.subColorCategoryNo3 >0 ?
                                                 (<div style={{display:'inline-block',textAlign: 'center', width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${this.props.checkHighLabelStore.pantsReviewHighLabel.subColorItemMemo3}`}} onClick={this.colorDeleteSub3}>
                                                 </div>) : ''
                                             }
                                         </div>
                                         {!this.state.comment == '' && polyLast == this.state.tabIndex2 ?
                                             <Button style={{marginTop: 20}}
                                                     type="button"
                                                     className={classes.buttonType2}
                                                     color="primary"
                                                     variant="outlined"
                                                     onClick={() => (this.handleUpdate())}
                                             >
                                                 수정
                                             </Button>
                                             :''
                                         }
                                         {polyLast === this.state.tabIndex2 ? (
                                             <Button style={{marginTop: 20}}
                                                     type="button"
                                                     className={classes.buttonType2}
                                                     color="primary"
                                                     variant="outlined"
                                                     disabled={! this.state.comment == ''}
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
                                         &nbsp;&nbsp;{!this.props.checkHighLabelStore.onePieceReviewHighLabel.colorCategoryNo4 == 0 ? <Typography style={{display:'inline-block', color:'red'}}>색상버튼 클릭 시 색상이 삭제 됩니다.</Typography>:''}
                                         <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                             <Color4 onClickSub={()=>this.handleClickSubColor4()} style={{display:'inline', float:'right'}}/>
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <div>
                                             <br></br>
                                             {this.props.checkHighLabelStore.onePieceReviewHighLabel.colorCategoryNo4 >0 ?
                                                 (<div style={{display:'inline-block',textAlign: 'center',width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${this.props.checkHighLabelStore.onePieceReviewHighLabel.colorItemMemo4}`}} onClick={this.colorDelete4}>

                                                 </div>) : ''
                                             }
                                             &nbsp;
                                             {this.props.checkHighLabelStore.onePieceReviewHighLabel.subColorCategoryNo4 >0 ?
                                                 (<div style={{display:'inline-block',textAlign: 'center', width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${this.props.checkHighLabelStore.onePieceReviewHighLabel.subColorItemMemo4}`}} onClick={this.colorDeleteSub4}>
                                                 </div>) : ''
                                             }
                                         </div>
                                     </div>
                                     <div className={classes.content} style={{display:'inline'}}>
                                         <Typography variant="h5" component="h5" style={{display:'inline'}} >
                                             소매길이
                                         </Typography>
                                         <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                             <SleeveLength4 />
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <br></br>
                                         {this.props.checkHighLabelStore.onePieceReviewHighLabel.sleeveLengthCategoryNo4 >0 ?
                                             (<Button style={{fontSize:20, width:150, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDelete4} endIcon={<DeleteIcon />} > {this.props.checkHighLabelStore.onePieceReviewHighLabel.sleeveLengthItemName4} </Button> ) : ''
                                         }
                                         {!this.state.comment == '' && polyLast == this.state.tabIndex2 ?
                                             <Button style={{marginTop: 20}}
                                                     type="button"
                                                     className={classes.buttonType2}
                                                     color="primary"
                                                     variant="outlined"
                                                     onClick={() => (this.handleUpdate())}
                                             >
                                                 수정
                                             </Button>
                                             :''
                                         }
                                         {polyLast === this.state.tabIndex2 ? (
                                             <Button style={{marginTop: 20}}
                                                     type="button"
                                                     className={classes.buttonType2}
                                                     color="primary"
                                                     variant="outlined"
                                                     disabled={!this.state.comment == ''}
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