import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Container, Grid, Toolbar, Typography} from "@material-ui/core";
import Color from "./step2/Color";
import SleeveLength from "./step2/SleeveLength";
import {inject, observer} from "mobx-react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BasicImageList from "./step2/BasicImageList";
import {fabric} from "fabric";
import {toJS} from "mobx";
import Stepper from "../components/Stepper";

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

@inject('basicLabelStore','authStore','imageStore','polygonStore')
@observer
class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 1,
            imgData :'',
            workNo:'',
            value: 0,
            number:1,
            createdId: '',
        }
    }
    componentDidMount() {
        const id = this.props.authStore.loginUser.id;
        this.setState({createdId : id});
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

    handleTabChange = (event, newValue) => {
        this.setState({ value: newValue });
    }
    handleTabChangeTop= (event, newNumber) => {
        this.setState({ number: newNumber});
    }
    handleClickItem = (workNo, imageData) => {
        this.props.imageStore.changeWorkNo(workNo);
        this.props.polygonStore.changeNewPolygonLocationWorkNo(workNo);
        this.props.polygonStore.LoadPolygonLocation(workNo);
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
            width : 750,
            height : 850,
            originX: 'left',
            originY: 'top'
        });
        this.setState({
            tadIndex:1,
        })
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

    onSelectTab(tabIndex) {

        this.canvas.remove(this.canvas.item(0));
        let polyNo = tabIndex+1;

        const { locationPolygonList } = this.props.polygonStore;
        const selectedPoly=(toJS(locationPolygonList).filter(poly => poly.polyNo === polyNo));
        console.log(selectedPoly);

        if(selectedPoly.length!=0){
            let makePath = 'M ' + selectedPoly[0].locationX + ' ' + selectedPoly[0].locationY;
            for (let i = 1; i < selectedPoly.length; i++) {
                makePath += ' L ' + selectedPoly[i].locationX + ' ' + selectedPoly[i].locationY;
            }
            makePath += ' z';
            let path = new fabric.Path(makePath);
            path.opacity = 0.5;

            console.log(makePath);
            this.canvas.add(path);

        }else{alert("poly정보가 존재하지 않습니다.")}
    };

    handleStepView={

    }


    render() {
        const { classes,history} = this.props;
        const {isWorkNo} = this.props.imageStore;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Grid container>
                        <Grid item xs={12} style={{marginRight:5}}>
                            <Stepper currentStep={3} />
                        </Grid>
                    </Grid>
                 <Grid container spacing={3}>
                     <Grid item xs={12} lg={5} style={{margin:"auto", display:"block"}}>
                         <div>
                             <canvas id="c" width="750" height="850">  </canvas>
                         </div>
                     </Grid>
                     <Grid item xs={12} lg={6}>
                         <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                             <TabList >
                                 <Tab style={{width: '50%', height:60,textAlign:'center'}}><h3>영역지정</h3></Tab>
                                 <Tab style={{width: '50%', height:60,textAlign:'center'}}><h3>이미지 리스트</h3></Tab>
                             </TabList>

                         <TabPanel>
                             <Tabs onSelect={tabIndex => this.onSelectTab(tabIndex)}>
                             <TabList>
                                 <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3 >아우터</h3></Tab>
                                 <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3 >상의</h3></Tab>
                                 <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3 >하의</h3></Tab>
                                 <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3 >원피스</h3></Tab>
                                 {/*<Tab style={{width: '20%', height:60,textAlign:'center'}}><h3 >신발</h3></Tab>*/}
                                 {/*<Tab style={{width: '20%', height:60,textAlign:'center'}}><h3 >가방</h3></Tab>*/}
                                 {/*<Tab style={{width: '20%', height:60,textAlign:'center'}}><h3 >악세서리</h3></Tab>*/}
                             </TabList>

                             <TabPanel>
                                     <div className={classes.content}>
                                     <Typography variant="h5" component="h2">
                                         색상
                                     </Typography>
                                     <div>
                                         <hr></hr>
                                     </div>
                                     <Color />
                                     </div>
                                     <div className={classes.content}>
                                         <div style={{display:"inline-flex"}}>
                                             <Typography variant="h5" component="h2">
                                                 소매 길이
                                             </Typography>
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <SleeveLength />
                                         <Button style={{marginTop: 20}}
                                                 type="button"
                                                 className={classes.buttonType2}
                                                 color="primary"
                                                 variant="outlined"
                                                 onClick={()=>alert('저장 되었습니다.')}
                                         >
                                             저장
                                         </Button>
                                     </div>
                                 </TabPanel>
                                 <TabPanel>
                                     <div className={classes.content}>
                                         <Typography variant="h5" component="h2">
                                             색상
                                         </Typography>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <Color />
                                     </div>
                                     <div className={classes.content}>
                                         <div style={{display:"inline-flex"}}>
                                             <Typography variant="h5" component="h2">
                                                 소매 길이
                                             </Typography>
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <SleeveLength />
                                         <Button style={{marginTop: 20}}
                                                 type="button"
                                                 className={classes.buttonType2}
                                                 color="primary"
                                                 variant="outlined"
                                                 onClick={()=>alert('저장 되었습니다.')}
                                         >
                                             저장
                                         </Button>
                                     </div>
                                 </TabPanel>
                                 <TabPanel>
                             <div className={classes.content}>
                                 <Typography variant="h5" component="h2">
                                     색상
                                 </Typography>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <Color />
                             </div>
                             <div className={classes.content}>
                                 <div style={{display:"inline-flex"}}>
                                     <Typography variant="h5" component="h2">
                                         소매 길이
                                     </Typography>
                                 </div>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <SleeveLength />
                                 <Button style={{marginTop: 20}}
                                         type="button"
                                         className={classes.buttonType2}
                                         color="primary"
                                         variant="outlined"
                                         onClick={()=>alert('저장 되었습니다.')}
                                 >
                                     저장
                                 </Button>
                             </div>
                         </TabPanel>
                                 <TabPanel>
                             <div className={classes.content}>
                                 <Typography variant="h5" component="h2">
                                     색상
                                 </Typography>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <Color />
                             </div>
                             <div className={classes.content}>
                                 <div style={{display:"inline-flex"}}>
                                     <Typography variant="h5" component="h2">
                                         소매 길이
                                     </Typography>
                                 </div>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <SleeveLength />
                                 <Button style={{marginTop: 20}}
                                         type="button"
                                         className={classes.buttonType2}
                                         color="primary"
                                         variant="outlined"
                                         onClick={()=>alert('저장 되었습니다.')}
                                 >
                                     저장
                                 </Button>
                             </div>
                         </TabPanel>
                                 <TabPanel>
                             <div className={classes.content}>
                                 <Typography variant="h5" component="h2">
                                     색상
                                 </Typography>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <Color />
                             </div>
                             <div className={classes.content}>
                                 <div style={{display:"inline-flex"}}>
                                     <Typography variant="h5" component="h2">
                                         소매 길이
                                     </Typography>
                                 </div>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <SleeveLength />
                                 <Button style={{marginTop: 20}}
                                     type="button"
                                     className={classes.buttonType2}
                                     color="primary"
                                     variant="outlined"
                                         onClick={()=>alert('저장 되었습니다.')}
                                 >
                                     저장
                                 </Button>
                             </div>

                                 </TabPanel>
                             </Tabs>
                         </TabPanel>
                             <TabPanel>
                            <BasicImageList onClick={this.handleClickItem}/>
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
                </Grid>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Step2)));