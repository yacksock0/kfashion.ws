import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Container, Grid, Typography} from "@material-ui/core";
import Color from "./step2/Color";
import SleeveLength from "./step2/SleeveLength";
import {inject, observer} from "mobx-react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BasicImageList from "./step2/BasicImageList";
import {fabric} from "fabric";
import {toJS} from "mobx";
import Chip from '@material-ui/core/Chip';
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import ErrorIcon from "@material-ui/icons/Error";

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
    testBox:{
        border: '1px solid black'
    },
    });

@inject('basicLabelStore','authStore','imageStore','polygonStore', 'currentStepStore')
@observer
class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            no: 0,
            name: '',
            memo: '',
            subNo: 0,
            subName: '',
            subMemo: '',
            sleeveNo: 0,
            sleeveName: '',
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
            sleeveNo3: 0,
            sleeveName3: '',
            colorCategoryNo:0,
            sleeveLengthCategoryNo:0,
        }

        this.handleDelete = this.handleDelete.bind(this)
        this.colorDelete = this.colorDelete.bind(this)
        this.colorDeleteSub = this.colorDeleteSub.bind(this)

        this.handleDelete1 = this.handleDelete1.bind(this)
        this.colorDelete1 = this.colorDelete1.bind(this)
        this.colorDeleteSub1 = this.colorDeleteSub1.bind(this)

        this.handleDelete2 = this.handleDelete2.bind(this)
        this.colorDelete2 = this.colorDelete2.bind(this)
        this.colorDeleteSub2 = this.colorDeleteSub2.bind(this)


        this.handleDelete3 = this.handleDelete3.bind(this)
        this.colorDelete3 = this.colorDelete3.bind(this)
        this.colorDeleteSub3 = this.colorDeleteSub3.bind(this)
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
            width: 750,
            height: 850,
            originX: 'left',
            originY: 'top'
        });
        this.setState({
            tabIndex: 0,
            tabIndex1:0,
        })
    }
    handleClickColor = (color) => {
        this.setState({
            no: color.no,
            name: color.categoryItemName,
            memo: color.categoryItemMemo,
            colorCategoryNo: color.categoryNo,
        })
    }
    handleClickColor1 = (color) => {
        this.setState({
            no1: color.no,
            name1: color.categoryItemName,
            memo1: color.categoryItemMemo,
            colorCategoryNo: color.categoryNo,
        })
    }
    handleClickColor2 = (color) => {
        this.setState({
            no2: color.no,
            name2: color.categoryItemName,
            memo2: color.categoryItemMemo,
            colorCategoryNo: color.categoryNo,
        })
    }
    handleClickColor3 = (color) => {
        this.setState({
            no3: color.no,
            name3: color.categoryItemName,
            memo3: color.categoryItemMemo,
            colorCategoryNo: color.categoryNo,
        })
    }
    handleClickSubColor = (color) => {
        {
            !this.state.no == 0 ?
                this.setState({
                    subNo: color.no,
                    subName: color.categoryItemName,
                    subMemo: color.categoryItemMemo,
                    colorCategoryNo: color.categoryNo,
                })
                : alert('메인 색상을 먼저 선택해 주세요')
        }
    }
    handleClickSubColor1 = (color) => {
        {
            !this.state.no1 == 0 ?
                this.setState({
                    subNo1: color.no,
                    subName1: color.categoryItemName,
                    subMemo1: color.categoryItemMemo,
                    colorCategoryNo: color.categoryNo,
                })
                : alert('메인 색상을 먼저 선택해 주세요')
        }
    }
    handleClickSubColor2 = (color) => {
        {
            !this.state.no2 == 0 ?
                this.setState({
                    subNo2: color.no,
                    subName2: color.categoryItemName,
                    subMemo2: color.categoryItemMemo,
                    colorCategoryNo: color.categoryNo,
                })
                : alert('메인 색상을 먼저 선택해 주세요')
        }
    }
    handleClickSubColor3 = (color) => {
        {
            !this.state.no3 == 0 ?
                this.setState({
                    subNo3: color.no,
                    subName3: color.categoryItemName,
                    subMemo3: color.categoryItemMemo,
                    colorCategoryNo: color.categoryNo,
                })
                : alert('메인 색상을 먼저 선택해 주세요')
        }
    }
    handleClickSleeve = (sleeve) => {
        this.setState({
            sleeveNo: sleeve.no,
            sleeveName: sleeve.categoryItemName,
            sleeveLengthCategoryNo: sleeve.categoryNo
        })
    }
    handleClickSleeve1 = (sleeve) => {
        this.setState({
            sleeveNo1: sleeve.no,
            sleeveName1: sleeve.categoryItemName,
            sleeveLengthCategoryNo: sleeve.categoryNo
        })
    }
    handleClickSleeve2 = (sleeve) => {
        this.setState({
            sleeveNo2: sleeve.no,
            sleeveName2: sleeve.categoryItemName,
            sleeveLengthCategoryNo: sleeve.categoryNo
        })
    }
    handleClickSleeve3 = (sleeve) => {
        this.setState({
            sleeveNo3: sleeve.no,
            sleeveName3: sleeve.categoryItemName,
            sleeveLengthCategoryNo: sleeve.categoryNo
        })
    }

    handleDelete() {
        this.setState({
            sleeveNo: 0,
            sleeveName: '',
        })
    }

    handleDelete1() {
        this.setState({
            sleeveNo1: 0,
            sleeveName1: '',
        })
    }

    handleDelete2() {
        this.setState({
            sleeveNo2: 0,
            sleeveName2: '',
        })
    }

    handleDelete3() {
        this.setState({
            sleeveNo3: 0,
            sleeveName3: '',
        })
    }

    colorDelete() {
        this.setState({
            no: 0,
            name: '',
            memo: '',
            subNo: 0,
            subName: '',
            subMemo: '',
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
        })
    }

    colorDeleteSub() {
        this.setState({
            subNo: 0,
            subName: '',
            subMemo: '',
        })
    }

    colorDeleteSub1() {
        this.setState({
            subNo1: 0,
            subName1: '',
            subMemo1: '',
        })
    }

    colorDeleteSub2() {
        this.setState({
            subNo2: 0,
            subName2: '',
            subMemo2: '',
        })
    }

    colorDeleteSub3() {
        this.setState({
            subNo3: 0,
            subName3: '',
            subMemo3: '',
        })
    }

    onSelectTab(tabIndex1) {
        console.log(tabIndex1);
    console.log(this.props.polygonStore.polyLast);


        let polyNo = tabIndex1 + 1;
        const {locationPolygonList} = this.props.polygonStore;
        const selectedPoly = (toJS(locationPolygonList).filter(poly => poly.polyNo === polyNo));
        if (selectedPoly.length !== 0) {
            this.canvas.remove(this.canvas.item(0));
            let makePath = 'M ' + selectedPoly[0].locationX + ' ' + selectedPoly[0].locationY;
            for (let i = 1; i < selectedPoly.length; i++) {
                makePath += ' L ' + selectedPoly[i].locationX + ' ' + selectedPoly[i].locationY;
            }
            makePath += ' z';
            let path = new fabric.Path(makePath);
            path.opacity = 0.3;
            path.borderColor = 'red';
            console.log(makePath);
            this.canvas.add(path);
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
        for(let i = 0 ; i<polyInfo.length ; i++){
            console.log("!!!!!!" + polyInfo[i]);
            switch (polyInfo[i]) {
                case 1 :
                    if(this.state.no == 0){
                        alert("아우터의 메인색상을 선택해주세요");
                        savebtn = false; i = polyInfo.length;
                        break;
                    }else if(this.state.sleeveNo == ""){
                        alert("아우터의 소매길이를 선택해주세요");
                        savebtn = false; i = polyInfo.length;
                        break;
                    } break;
                case 2 :
                     if(this.state.no1 == 0){
                        alert("상의의 메인색상을 선택해주세요");
                         savebtn = false; i = polyInfo.length;
                         break;
                     }else if(this.state.sleeveNo1 == ""){
                         alert("상의의 소매길이를 선택해주세요");
                         savebtn = false; i = polyInfo.length;
                         break;
                     } break;
                case 3 :
                    if(this.state.no2 == 0){
                        alert("하의의 메인색상을 선택해주세요");
                        savebtn = false; i = polyInfo.length;
                        break;
                    }else if(this.state.sleeveNo2 == ""){
                        alert("하의의 소매길이를 선택해주세요");
                        savebtn = false; i = polyInfo.length;
                        break;
                    } break;
                case 4 :
                    if(this.state.no3 == 0){
                        alert("원피스의 메인색상을 선택해주세요");
                        savebtn = false; i = polyInfo.length;
                        break;
                    }else if(this.state.sleeveNo3 == ""){
                        alert("원피의 소매길이를 선택해주세요");
                        savebtn = false; i = polyInfo.length;
                        break;
                    } break;
            }
        }
     if(savebtn){
         console.log(savebtn);
            // const param = toJS({
            //     workNo: this.props.imageStore.isWorkNo,
            //     workStep:4,
            //     color:this.state.no,
            //     color1:this.state.no1,
            //     color2:this.state.no2,
            //     color3:this.state.no3,
            //     colorCategoryNo: this.state.colorCategoryNo,
            //     subColor:this.state.subNo,
            //     subColor1:this.state.subNo1,
            //     subColor2:this.state.subNo2,
            //     subColor3:this.state.subNo3,
            //     sleeveLength:this.state.sleeveNo,
            //     sleeveLength1:this.state.sleeveNo1,
            //     sleeveLength2:this.state.sleeveNo2,
            //     sleeveLength3:this.state.sleeveNo3,
            //     sleeveLengthCategoryNo:this.state.sleeveLengthCategoryNo,
            //     createdId:this.props.authStore.loginUser.id,});
            // console.log('colorCategoryNo',this.state.colorCategoryNo)
            // console.log('sleeveLengthCategoryNo',this.state.sleeveLengthCategoryNo)
            // const res = axios.post('/api/v1/kfashion/label/basicLabel', param);
            // if(res.status === 200) {
            //     alert("작업을 저장하였습니다.");
            //     this.setState({
            //         tabIndex:1,
            //         workNo: 0,
            //         no:0,
            //         color:0,
            //         color1:0,
            //         color2:0,
            //         color3:0,
            //         subColor:0,
            //         subColor1:0,
            //         subColor2:0,
            //         subColor3:0,
            //         sleeveLength:0,
            //         sleeveLength1:0,
            //         sleeveLength2:0,
            //         sleeveLength3:0,
            //     })
            // }else {
            //     console.log("error");
            // }
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

        }
    }
    render() {
        const { classes,history} = this.props;
        const {authorityNo} = this.props.authStore.loginUser.authorityNo;
        const {isWorkNo} = this.props.imageStore;
        const {polyInfo} = this.props.polygonStore;
        const {polyLast} = this.props.polygonStore;
        console.log('@@@@@@@@'+polyInfo);
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                 <Grid container spacing={3}>
                     {/*<Grid item xs={12} lg={2}>*/}
                     {/*    <WorkedImg />*/}
                     {/*</Grid>*/}
                     <Grid item xs={12} lg={6} style={{margin:"auto", display:"block"}}>
                         <div>
                             <canvas id="c" width="750" height="850">  </canvas>
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
                                         &nbsp;&nbsp;{!this.state.no == 0 ? <Typography style={{display:'inline-block', color:'red'}}>색상버튼 클릭 시 색상이 삭제 됩니다.</Typography>:''}
                                             <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                 <Color onClick={this.handleClickColor} onClickSub={this.handleClickSubColor} style={{display:'inline', float:'right'}}/>
                                             </div>
                                     <div>
                                         <hr></hr>
                                     </div>
                                     <div>
                                             <br></br>
                                         {this.state.no >0 ?
                                             (<div style={{display:'inline-block',textAlign: 'center',width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${this.state.memo}`}} onClick={this.colorDelete}>

                                     </div>) : ''
                                         }
                                         &nbsp;
                                         {this.state.subNo >0 ?
                                             (<div style={{display:'inline-block',textAlign: 'center', width: 85, height: 85,margin:'auto',border:'1px solid black', backgroundColor: `${this.state.subMemo}`}} onClick={this.colorDeleteSub}>
                                             </div>) : ''
                                         }
                                     </div>
                                     </div>
                                     <div className={classes.content} style={{display:'inline'}}>
                                             <Typography variant="h5" component="h5" style={{display:'inline'}} >
                                                 소매길이
                                             </Typography>
                                             <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                 <SleeveLength onClick={this.handleClickSleeve} />
                                             </div>
                                         <div>
                                             <hr></hr>
                                         </div>

                                         <br></br>
                                         {this.state.sleeveNo >0 ?
                                             (<Button style={{fontSize:20, width:150, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDelete} endIcon={<DeleteIcon />} > {this.state.sleeveName} </Button> ) : ''
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
                                         &nbsp;&nbsp;{!this.state.no1 == 0 ? <Typography style={{display:'inline-block', color:'red'}}>색상버튼 클릭 시 색상이 삭제 됩니다.</Typography>:''}
                                         <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                             <Color onClick={this.handleClickColor1} onClickSub={this.handleClickSubColor1} style={{display:'inline', float:'right'}}/>
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
                                             <SleeveLength onClick={this.handleClickSleeve1} />
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
                                             <Color onClick={this.handleClickColor2} onClickSub={this.handleClickSubColor2} style={{display:'inline', float:'right'}}/>
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <div>
                                             <br></br>
                                             {this.state.no2 >0 ?
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
                                             <SleeveLength onClick={this.handleClickSleeve2} />
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
                                             <Color onClick={this.handleClickColor3} onClickSub={this.handleClickSubColor3} style={{display:'inline', float:'right'}}/>
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <div>
                                             <br></br>
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
                                     </div>
                                     <div className={classes.content} style={{display:'inline'}}>
                                         <Typography variant="h5" component="h5" style={{display:'inline'}} >
                                             소매길이
                                         </Typography>
                                         <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                             <SleeveLength onClick={this.handleClickSleeve3} />
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <br></br>
                                         {this.state.sleeveNo3 >0 ?
                                             (<Button style={{fontSize:20, width:150, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDelete3} endIcon={<DeleteIcon />} > {this.state.sleeveName3} </Button> ) : ''
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