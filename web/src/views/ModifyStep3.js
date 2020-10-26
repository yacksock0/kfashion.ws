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
import {toJS} from "mobx";
import ErrorIcon from "@material-ui/icons/Error";


const styles = theme => ({   root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {
        minWidth: 500,
    },
    ErrorIcon : {
        display: 'inline-block',
        verticalAlign : 'middle',
        fontSize : 26,
        marginBottom:3
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
class ModifyStep3 extends React.Component {
    constructor(props) {
        super(...arguments);
        this.state = {
            selectedNo:0,
            selectedName:'',
            selectedSubNo:0,
            selectedSubName:'',
            // tabIndex: 1,
            tabIndex1:0,
            createdId: '',
            workNo : 0 ,
            canvasWidth: 0,
            canvasHeight:0,
        }
    }

    componentDidMount() {
        this.setState({workNo : this.props.professionalLabelStore.workNo});
        this.props.currentStepStore.setStep(5)
        const workNo = this.props.polygonStore.NewPolygonLocation.workNo;
        this.onImgLoad(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`);
        this.setState({createdId : this.props.authStore.loginUser.id});
        this.canvas = new fabric.Canvas('c');
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
            width : this.canvas.width,
            height : this.canvas.height,
            originX: 'left',
            originY: 'top'
        });
    }

    handleSubmit = () => {
        const check = window.confirm("수정하시겠습니까?");
        if (check) {
            if(this.props.professionalLabelStore.styleReviewLabel.style === ''){
                alert("스타일은 필수 항목입니다.");
                return;
            }
            const createdId = this.props.authStore.isUserId;
            this.props.professionalLabelStore.changeNewProfessionalLabelCreatedId(createdId);
            const selected = toJS(this.props.professionalLabelStore.selectedItem);
            if(selected.length > 0 && selected !== null) {
                this.props.professionalLabelStore.deleteSelectedProfessionalLabel(selected);
            }
            else {
                this.props.professionalLabelStore.deleteProfessionalLabel(this.props.polygonStore.NewPolygonLocation.workNo);
            }
            this.props.history.push("/Step2/FinalCheckList");
            this.deleteAll();
        }
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
    onSelectTab(tabIndex1) {
        let polyNo = tabIndex1;
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
                    tabIndex1: tabIndex1,
                })
            } else if (tabIndex1 === 0) {
                this.deleteAll();
                this.setState({
                    tabIndex1: tabIndex1,
                })
            } else {
                alert("poly정보가 존재하지 않습니다.")
            }
        }else{
            this.setState({
                tabIndex1: tabIndex1,
            })
        }
    };

    handleReturn = () => {
        const check = window.confirm("돌아가시면 변경된 값은 저장되지 않습니다.");
        if(check){
            this.props.professionalLabelStore.selectedItemReset();
            this.props.history.push("/Step2/FinalCheckList");
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
                    <Grid container>
                        <Grid item xs={12} lg={5} xl={5} style={{marginTop:10}}>
                            <div style={{overflow:'auto', width: 800,height: 800, zoom : "80%"}}>
                                <canvas id="c" width={this.state.canvasWidth} height={this.state.canvasHeight} className={classes.canvas} style={{display:'contain'}}>  </canvas>
                            </div>
                            </Grid>
                        <Grid item xs={12} lg={5} xl={5} style={{marginLeft:'auto'}}>
                                    <Tabs selectedIndex={this.state.tabIndex1} onSelect={tabIndex1 => this.onSelectTab(tabIndex1)} style={{boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.45)',background:'#fff',height:'500px'}}>
                                        <TabList className={classes.tabliststyle}>
                                            <Tab className={classes.btnstyle}><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>스타일</h3></Tab>
                                            <Tab className={classes.btnstyle}><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>아우터</h3></Tab>
                                            <Tab className={classes.btnstyle}><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>상의</h3></Tab>
                                            <Tab className={classes.btnstyle}><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>하의</h3></Tab>
                                            <Tab className={classes.btnstyle}><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>원피스</h3></Tab>
                                        </TabList>

                                        <TabPanel style={{padding:'0 30px'}}>
                                            <Grid items xs={12} lg={12}>
                                                <Style onClick={this.handleClickStyle} />
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel style={{padding:'0 30px'}}>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent1 polyLast={polyLast} tabIndex1={this.state.tabIndex1} onClick={()=>this.handleSubmit()}/>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel style={{padding:'0 30px'}}>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent2 polyLast={polyLast} tabIndex1={this.state.tabIndex1} onClick={()=>this.handleSubmit()}/>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel style={{padding:'0 30px'}}>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent3 polyLast={polyLast} tabIndex1={this.state.tabIndex1} onClick={()=>this.handleSubmit()}/>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel style={{padding:'0 30px'}}>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent4 polyLast={polyLast} tabIndex1={this.state.tabIndex1} onClick={()=>this.handleSubmit()}/>
                                            </Grid>
                                        </TabPanel>
                                    </Tabs>
                        </Grid>
                    </Grid>

                </div>
                {/* <div>
                    <hr></hr>
                </div> */}
                <Grid item xs={6} lg={3} style={{marginLeft:'auto'}}>
                    <div style={{textAlign:'right',marginTop:-100,marginBottom:30}}>
                        <Button
                            type="button"
                            className={classes.buttonType2}
                            variant="outlined"
                            onClick={()=>this.handleSubmit()}
                        >
                            수정완료
                        </Button>
                        <Button
                            type="button" style={{marginRight:10}}
                            className={classes.buttonType2}
                            variant="outlined"
                            onClick={()=>this.handleReturn()}
                        >
                            돌아가기
                        </Button>
                    </div>
                </Grid>
                <p style={{width:'100%',height:40}}/>
                {/* <Typography variant="h6" component="h4" style={{display:'inline'}}>
                    <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/> 스타일 선택 수정 완료후 영역정보가 존재하는 탭(아우터, 상의, 하의, 원피스)에서 세부항목 선택</p>
                    <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/> 이미지에 해당되는 모든 탭의 정보를 수정</p>
                    <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/> 수정이 끝나면 수정완료 버튼을 눌러주세요</p>
                    <p style={{fontSize:'15px'}}><ErrorIcon className={classes.ErrorIcon}/> 수정할 사항이 없으면 돌아가기 버튼을 눌러주세요</p>
                </Typography> */}
            </Container>
        );
    }
};
export default withSnackbar(withRouter(withStyles(styles) (ModifyStep3)));