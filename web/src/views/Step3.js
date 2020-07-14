import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Container, Grid, Toolbar, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import CategoryComponent from "./step3/CategoryComponent";
import CategoryComponent1 from "./step3/CategoryComponent1";
import CategoryComponent2 from "./step3/CategoryComponent2";
import CategoryComponent3 from "./step3/CategoryComponent3";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {fabric} from "fabric";
import Stepper from "../components/Stepper";
import Style from "../views/step3/Style";
import ProImageList from "../views/step3/ProImageList";
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
});

@inject('professionalLabelStore','authStore', 'imageStore', 'currentStepStore','polygonStore')
@observer
class Step3 extends React.Component {
    constructor(props) {
        super(...arguments);
        this.state = {
            selectedNo:0,
            selectedName:'',
            selectedSubNo:0,
            selectedSubName:'',
            tabIndex: 1,
            tabIndex1:0,
            createdId: '',
        }
    }

    componentDidMount() {
        this.props.currentStepStore.setStep(3);
        this.canvas = new fabric.Canvas('c');
        const id = this.props.authStore.loginUser.id;
        this.setState({createdId : id});
        this.props.enqueueSnackbar("Step3", {
            variant: 'info'
        });
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })
    }

    handleClickSubmit = () => {
        this.props.professionalLabelStore.changeNewProfessionalLabelCreatedId(this.state.createdId);
        this.props.professionalLabelStore.doProfessionalLabelUp();
    }

    handleClickItem = (workNo, imageData) => {
        this.setState({
            tabIndex:1,
        })
        this.props.imageStore.changeWorkNo(workNo);
        this.props.polygonStore.changeNewPolygonLocationWorkNo(workNo);
        this.props.polygonStore.LoadPolygonLocation(workNo);
        console.log(this.props.polygonStore.tabIndex1);
        this.setState({
            tabIndex1:this.props.polygonStore.tabIndex1,
            tabIndex:0,
        })
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
            width : 750,
            height : 850,
            originX: 'left',
            originY: 'top'
        });
    }

    handleClickStyle=(selectedMainNo, selectedMainName, selectedSubNo,selectedSubName)=>{
        this.setState({
            selectedMainNo:selectedMainNo,
            selectedMainName:selectedMainName,
            selectedSubNo:selectedSubNo,
            selectedSubName:selectedSubName,
        })
    }

    onSelectTab(tabIndex1) {
        this.canvas.remove(this.canvas.item(0));
        let polyNo = tabIndex1;
        const { locationPolygonList } = this.props.polygonStore;
        const selectedPoly=(toJS(locationPolygonList).filter(poly => poly.polyNo === polyNo));
        console.log(selectedPoly);

        if(selectedPoly.length!=0){
            this.canvas.remove(this.canvas.item(0));
            let makePath = 'M ' + selectedPoly[0].locationX + ' ' + selectedPoly[0].locationY;
            for (let i = 1; i < selectedPoly.length; i++) {
                makePath += ' L ' + selectedPoly[i].locationX + ' ' + selectedPoly[i].locationY;
            }
            makePath += ' z';
            let path = new fabric.Path(makePath);
            path.opacity = 0.5;

            console.log(makePath);
            this.canvas.add(path);
            this.setState({
                tabIndex1:tabIndex1,
            })
        }else if(tabIndex1 ==0) {
            this.setState({
                tabIndex1:tabIndex1,
            })
        }else{
            alert("poly정보가 존재하지 않습니다.")}
    };
    handleChange=(polyLast)=>{
        if(this.props.onChange){
            this.props.onChange(polyLast)
        }
    }
    render() {
        const {classes,history} = this.props;
        const polyLast = this.props.polygonStore;
            return (
                <Container component="main" className={classes.mainContainer}>
                    <div className={classes.appBarSpacer} />
                    <div className={classes.mainContent}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={5} style={{margin:"auto"}}>
                                <div>
                                    <canvas id="c" width={750} height={850} className={classes.canvas}>  </canvas>
                                </div>
                            </Grid>
                                <Grid item xs={12} lg={6} >
                                    <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                                        <TabList >
                                            <Tab tabIndex={0} style={{width: '50%', height:60,textAlign:'center'}}><h3>레이블링</h3></Tab>
                                            <Tab tabIndex={1} style={{width: '50%', height:60,textAlign:'center'}}><h3>이미지 리스트</h3></Tab>
                                        </TabList>

                                        <TabPanel>

                                            <Tabs selectedIndex={this.state.tabIndex1} onSelect={tabIndex1 => this.onSelectTab(tabIndex1)}>
                                        <TabList>
                                            <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3>스타일</h3></Tab>
                                            <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3>아우터</h3></Tab>
                                            <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3>상의</h3></Tab>
                                            <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3>하의</h3></Tab>
                                            <Tab style={{width: '20%', height:60,textAlign:'center'}}><h3>원피스</h3></Tab>
                                            {/*<Tab  style={{width: '20%', height:60,textAlign:'center'}}><h3>신발</h3></Tab>*/}
                                            {/*<Tab  style={{width: '20%', height:60,textAlign:'center'}}><h3>가방</h3></Tab>*/}
                                            {/*<Tab  style={{width: '20%', height:60,textAlign:'center'}}><h3>악세서리</h3></Tab>*/}
                                        </TabList>

                                        <TabPanel>
                                            <Grid items xs={12} lg={12}>
                                                <Style onClick={this.handleClickStyle} />
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent polyLast={polyLast} tabIndex1={this.state.tabIndex1}/>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent1 polyLast={polyLast} tabIndex1={this.state.tabIndex1}/>
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent2 polyLast={polyLast} tabIndex1={this.state.tabIndex1} />
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent3 polyLast={polyLast} tabIndex1={this.state.tabIndex1}/>
                                            </Grid>
                                        </TabPanel>
                                    </Tabs>
                                        </TabPanel>
                                     <TabPanel>

                                    <ProImageList onClick={this.handleClickItem} />
                                    </TabPanel>
                                    </Tabs>
                                </Grid>
                            </Grid>
                    <hr></hr>
                    </div>
                    <hr></hr>
                    {/*<Grid container>*/}
                    {/*    <Grid item xs={3} lg={1} style={{marginRight:10}}>*/}
                    {/*/!*<Button*!/*/}
                    {/*/!*    type="submit"*!/*/}
                    {/*/!*    className={classes.buttonType1}*!/*/}
                    {/*/!*    variant="outlined"*!/*/}
                    {/*/!*    onClick={this.handlePrevious.bind(this)}*!/*/}
                    {/*/!*>*!/*/}
                    {/*/!*    Previous*!/*/}
                    {/*/!*</Button>*!/*/}
                    {/*/!*    </Grid>*!/*/}
                    {/*/!*    <Grid item xs={3} lg={1}>*!/*/}
                    {/*/!*<Button*!/*/}
                    {/*/!*    type="submit"*!/*/}
                    {/*/!*    className={classes.buttonType1}*!/*/}
                    {/*/!*    variant="outlined"*!/*/}
                    {/*/!*    onClick={this.handleNext.bind(this)}*!/*/}
                    {/*/!*>*!/*/}
                    {/*/!*    Next*!/*/}
                    {/*</Button>*/}
                    {/* </Grid>*/}
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
                    {/*</Grid>*/}
                    <ErrorIcon/>
                    <Typography variant="h6" component="h4" style={{display:'inline'}}>
                        우측 상단에 이미지리스트에서 작업 할 이미지 선택 / 스타일 선택 완료 후 영역정보가 존재하는 탭(아우터, 상의, 하의, 원피스)에서 세부항목 선택 / 영역정보가 존재하는 마지막 탭 입력 후 저장버튼 클릭
                    </Typography>
                </Container>
            );
        }
    };
export default withSnackbar(withRouter(withStyles(styles) (Step3)));