import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Container, Grid, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import CategoryComponent1 from "./step3/CategoryComponent1";
import CategoryComponent2 from "./step3/CategoryComponent2";
import CategoryComponent3 from "./step3/CategoryComponent3";
import CategoryComponent4 from "./step3/CategoryComponent4";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {fabric} from "fabric";
import Style from "../views/step3/Style";
import ProImageList from "../views/step3/ProImageList";
import {toJS} from "mobx";
import ErrorIcon from "@material-ui/icons/Error";
import WorkedImg from "./step3/WorkedImg";
import ImagePopupModal from "../components/ImagePopupModal"



const styles = theme => ({   root: {
    [theme.breakpoints.up('xl')]: {
        width: "80%",
    },
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
},
    table: {
        minWidth: 500,
    },
    mainContainer: {
        [theme.breakpoints.up('xl')]: {
            maxWidth:'80%',
        },
        flexGrow: 1,
        marginTop:20,
        maxWidth:'100%',
    },
    ErrorIcon: {
        dispaly : 'inline-block',
        verticalAlign : 'middle',
        fontSize : 26,
        marginBottom : 3
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
        color:'#00943b',
        border : '1px solid rgba(0,148,59,1)',
        width:'135px',
        height:'46px',
        border:'1px solid #000',
        fontFamily:'NotoSansCJKkr',
        fontSize:'15px',
        color:'#000',
        marginRight:10,

        "&:hover": {
            backgroundColor: 'rgba(69,206,124,0.15)',
            border : '1px solid rgba(0,148,59,1)'
            }
    },
    buttonType3:{
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
        paddingRight: theme.spacing(2),
        textAlign: 'left'
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
        width: '20%',
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

@inject('professionalLabelStore','authStore', 'imageStore', 'currentStepStore','polygonStore','workStore')
@observer
class Step3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNo:0,
            selectedName:'',
            selectedSubNo:0,
            selectedSubName:'',
            tabIndex1: 1,
            tabIndex2:0,
            createdId: '',
            workNo : 0,
            polyInfo : [],
            selected: [],
            height: window.innerHeight,
            width: window.innerWidth,
            count: 1,
            canvasWidth: 0,
            canvasHeight : 0,
            total : 0,
            complete : 0,
        }
    }

    componentDidMount() {
        this.props.currentStepStore.setStep(3);
        this.canvas = new fabric.Canvas('c');
        const id = this.props.authStore.loginUser.id;
        const authorityNo = this.props.authStore.loginUser.authorityNo;
        this.props.professionalLabelStore.doProfessionalCompleteUp(id,authorityNo);
        this.props.professionalLabelStore.selectedItemReset();
        this.setState({createdId : id});
        this.props.enqueueSnackbar("전문 레이블링", {
            variant: 'success',
            anchorOrigin:{
                vertical: 'bottom',
                horizontal: 'left',
            }
        });
    }

    changeWorkNo = (workNo) => {
        this.setState({ workNo : workNo});
    }

    handleSubmit = () => {
        if(this.state.workNo !== 0){
            // let finalCheck = window.confirm("이미지에 필요한 탭의 정보를 입력하셨습니까?");
            // if(finalCheck){
                if(this.props.professionalLabelStore.styleReviewLabel.style === ''){
                    alert("스타일은 필수 항목입니다.");
                    return;
                }
                const createdId = this.props.authStore.isUserId;
                this.props.professionalLabelStore.changeNewProfessionalLabelCreatedId(createdId);
                this.props.professionalLabelStore.changeNewProfessionalLabelWorkNo(this.state.workNo);
                const selected = toJS(this.props.professionalLabelStore.selectedItem);
                if(selected.length > 0 && selected !== null) {
                    this.props.professionalLabelStore.doSelectedProfessionalLabelUp(selected);
                }
                else {
                    this.props.professionalLabelStore.doProfessionalLabelUp(this.changeWorkNo);
                }
                this.setState({
                    tabIndex1 : 1,
                    workNo : 0,
                });
                this.canvas.backgroundImage = 0;
                this.canvas.setWidth(0);
                this.canvas.setHeight(0);
                this.canvas.renderAll();
                this.deleteAll();
            // }
        }else{
            alert("작업을 먼저 선택해 주세요.");
            this.setState({
                tabIndex1: 1,
            });
        }

    }

    handleClickItem = (workNo, imageData, polyNo,comment) => {
        let check = true;
        if(this.state.workNo !== 0){
            check = window.confirm("작업을 변경하면 입력한 값이 초기화 됩니다. 변경하시겠습니까?");
        }
        if(check){
            this.deleteAll();
            this.canvas.setWidth(0);
            this.canvas.setHeight(0);
            this.setState({ comment:comment});
            this.props.professionalLabelStore.cleanLabel();
            this.props.polygonStore.changeNewPolygonLocationWorkNo(workNo);
            this.onImgLoad(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`);
            this.props.polygonStore.LoadPolygonLocation(workNo, this.handleClickCallback);
        }
    }
    handleClickCallback= (polyInfo, workNo)=>{
        this.setState({ polyInfo : polyInfo, workNo : workNo});
        this.setState({tabIndex1 : 0, tabIndex2 : 0});
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${this.state.workNo}`
            , this.canvas.renderAll.bind(this.canvas),{
            width: this.canvas.width,
            height: this.canvas.height,
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
        this.canvas.setWidth(this.state.canvasWidth);
        this.canvas.setHeight(this.state.canvasHeight);
    }

    handleClickStyle=(selectedMainNo, selectedMainName, selectedSubNo,selectedSubName)=>{
        this.setState({
            selectedMainNo:selectedMainNo,
            selectedMainName:selectedMainName,
            selectedSubNo:selectedSubNo,
            selectedSubName:selectedSubName,
        })
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
    onSelectTab1(tabIndex1) {
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
                this.deleteAll();
                this.props.professionalLabelStore.selectedItemReset();
            }
            this.setState({
                tabIndex1: tabIndex1,
            });
        }else{
            alert("이미지 리스트 탭에서 작업할 이미지를 선택해주세요.");
        }

    }
    onSelectTab2(tabIndex2) {
        let polyNo = tabIndex2;
        const {locationPolygonList} = this.props.polygonStore;
        if (locationPolygonList.length > 0 ) {
            const selectedPoly = (toJS(locationPolygonList).filter(poly => poly.polyNo === polyNo));
            if (selectedPoly.length !== 0) {
                this.deleteAll();
                for (let i = 0; i < selectedPoly.length; i++) {
                    this.lineTwoPoint = [this.x, this.y, selectedPoly[i].locationX, selectedPoly[i].locationY];
                    this.x = selectedPoly[i].locationX;
                    this.y = selectedPoly[i].locationY;

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
            } else if (tabIndex2 === 0) {
                this.deleteAll();
                this.setState({
                    tabIndex2: tabIndex2,
                })
            } else {
                alert("poly정보가 존재하지 않습니다.")
            }
        }else{
            this.setState({
                tabIndex2: tabIndex2,
            })
        }
    };
    handleChange=(polyLast)=>{
        if(this.props.onChange){
            this.props.onChange(polyLast)
        }
    }
    // handleDeleteImg(){
    //         const workNo = this.props.workNo;
    //         const createdId = this.props.authStore.loginUser.id;
    //         const deleteConfirm = window.confirm("정말 삭제하시겠습니까?");
    //         if (deleteConfirm) {
    //             this.props.professionalLabelStore.deleteImg(workNo, createdId);
    //         }
    //     }
    // }
    handleLabel=(item)=>{
        if(this.state.workNo !== 0){
            this.props.professionalLabelStore.cleanLabel();
            this.props.professionalLabelStore.LoadLabelList(this.state.workNo);
            this.props.professionalLabelStore.changeNewProfessionalLabelWorkNo(this.state.workNo);
        }else{
            alert("이미지 리스트 탭에서 작업할 이미지를 선택해주세요.");
            this.setState({
                tabIndex1: 1,
            });
        }
    }
    onClickDel(tabIndex1){
        this.setState({
            tabIndex1:tabIndex1
        })
        this.canvas.backgroundImage = 0;
        this.canvas.setWidth(0);
        this.canvas.setHeight(0);
        this.canvas.renderAll();
        this.deleteAll();
    }

    handleDeleteImg = () => {
        const deleteConfirm = window.confirm("정말 삭제하시겠습니까?");
        const createdId = this.props.authStore.loginUser.id;
        if (deleteConfirm) {
                   const selected =toJS(this.props.professionalLabelStore.selectedItem);
                    this.props.professionalLabelStore.deleteImg(selected,createdId);
            }
    }

    render() {
            setTimeout(() => document.body.style.zoom = "100%", 100);
        const {classes} = this.props;
        const polyLast = this.props.polygonStore;
            return (
                <Container component="main" className={classes.mainContainer}>
                    <div className={classes.appBarSpacer} />
                    <div className={classes.mainContent}>
                            <Grid item xs={12} style={{padding:3, textAlign:'center'}}>
                                <WorkedImg onClick={this.handleLabel} />
                            </Grid>
                        <Grid container >
                            <Grid item xs={12} lg={5} xl={5} style={{marginTop:10}}>
                                <div className={classes.canvas}>
                                    <canvas id="c" width={this.state.canvasWidth} height={this.state.canvasHeight}>  </canvas>
                                </div>
                            </Grid>
                            <Grid item xs={12} lg={6} xl={6} style={{marginLeft:"auto"}}>
                                    <Tabs selectedIndex={this.state.tabIndex1} onSelect={tabIndex1 => this.onSelectTab1(tabIndex1)}>
                                        <TabList >
                                            <Tab tabIndex={0} style={{width: '50%', height:50,textAlign:'center'}}><h3>레이블링</h3></Tab>
                                            <Tab tabIndex={1} style={{width: '50%', height:50,textAlign:'center'}}><h3>이미지 리스트 ( <b style={{color:"red"}}>{this.props.professionalLabelStore.complete}</b> / <b>{this.props.professionalLabelStore.total}</b> )</h3></Tab>
                                        </TabList>

                                        <TabPanel>
                                            <Tabs selectedIndex={this.state.tabIndex2} onSelect={tabIndex2 => this.onSelectTab2(tabIndex2)} style={{boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.45)',background:'#fff',height:'500px'}}>
                                                <TabList className={classes.tabliststyle}>
                                                    <Tab className={classes.btnstyle}
                                                    ><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>스타일</h3></Tab>
                                                    <Tab className={classes.btnstyle}
                                                          disabled={"" === String(this.state.polyInfo.filter((poly=> poly === 1))) && this.state.polyInfo.length > 0}
                                                    ><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>아우터</h3></Tab>
                                                    <Tab className={classes.btnstyle}
                                                          disabled={"" === String(this.state.polyInfo.filter((poly=> poly === 2))) && this.state.polyInfo.length > 0}
                                                    ><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>상의</h3></Tab>
                                                    <Tab className={classes.btnstyle}
                                                          disabled={"" === String(this.state.polyInfo.filter((poly=> poly === 3))) && this.state.polyInfo.length > 0}
                                                    ><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>하의</h3></Tab>
                                                    <Tab className={classes.btnstyle}
                                                          disabled={"" === String(this.state.polyInfo.filter((poly=> poly === 4))) && this.state.polyInfo.length > 0}
                                                    ><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>원피스</h3></Tab>
                                                </TabList>
                                        <TabPanel style={{padding:'0 30px'}}>
                                            <Grid items xs={12} lg={12}>
                                                <Style onClick={this.handleClickStyle} onClickDel={()=>this.onClickDel(1)}workNo={this.state.workNo}/>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel style={{padding:'0 30px'}}>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent1 polyLast={polyLast} tabIndex2={this.state.tabIndex2} onClick={()=>this.handleSubmit()}/>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel style={{padding:'0 30px'}}>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent2 polyLast={polyLast} tabIndex2={this.state.tabIndex2} onClick={()=>this.handleSubmit()}/>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel style={{padding:'0 30px'}}>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent3 polyLast={polyLast} tabIndex2={this.state.tabIndex2} onClick={()=>this.handleSubmit()}/>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel style={{padding:'0 30px'}}>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent4 polyLast={polyLast} tabIndex2={this.state.tabIndex2} onClick={()=>this.handleSubmit()}/>
                                            </Grid>
                                        </TabPanel>

                                    </Tabs>
                                        </TabPanel>

                                     <TabPanel>

                                    <ProImageList onClick={this.handleClickItem} onImageDoubleClick={image => this.props.imageStore.onImageDoubleClick(image) } />
                                    </TabPanel>
                                    </Tabs>
                                </Grid>
                        </Grid>
                    </div>
                        {/* <div>
                            <hr></hr>
                        </div> */}
                        {/* <Grid item xs={6} lg={3} style={{marginLeft:'auto'}}> */}
                        <div style={{textAlign:'right',marginTop:15,marginBottom:30}}>
                            <Button
                                    type="button"
                                    className={classes.buttonType2}
                                    disabled={this.state.tabIndex1 === 1 ? true : false}
                                    variant="outlined"
                                    onClick={()=>this.handleSubmit()}
                                    
                            >
                                저장
                            </Button>
                            <Button variant="outlined" color="secondary"
                                    className={classes.buttonType2}
                                    disabled={this.state.tabIndex1 === 0 || this.props.professionalLabelStore.selectedItem.length === 0 ? true : false}
                                    // style={{display:'inline', marginRight:5}} 
                                    onClick={this.handleDeleteImg}>
                                이미지 삭제
                            </Button>
                        </div>
                        {/* </Grid> */}

                    {/* <Typography variant="h6" component="h6" style={{display:'inline'}}>
                        <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/> 우측 상단에 이미지리스트에서 작업 할 이미지 선택 / 체크박스 클릭후 대표 이미지 선택하여 작업시 체크한 이미지 전부 동일한 값으로 입력됩니다. </p>
                        <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/> 스타일 선택 완료 후 영역정보가 존재하는 탭(아우터, 상의, 하의, 원피스)에서 세부항목 선택 </p>
                        <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/> 이미지에 해당되는 모든 탭의 정보를 입력한 후 저장버튼을 눌러주세요.</p>
                        <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/> 전체선택 후 페이지이동시 이전 선택은 무효 처리 됩니다.</p>
                        <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/> 체크박스는 삭제, 저장 일괄적으로 사용가능</p>
                    </Typography> */}
                    <ImagePopupModal store={this.props.imageStore} />
                </Container>
            );
        }
    };
export default withSnackbar(withRouter(withStyles(styles) (Step3)));