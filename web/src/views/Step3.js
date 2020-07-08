import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Container, Grid, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import CategoryComponent from "./step3/CategoryComponent";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {fabric} from "fabric";
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

@inject('professionalLabelStore','authStore', 'imageStore')
@observer
class Step3 extends React.Component {
    constructor(props) {
        super(...arguments);
        this.state = {
            tapIndex: 1,
            createdId: '',
        }
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas('c');
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`, this.canvas.renderAll.bind(this.canvas), {
            width: 750,
            height: 850,
            originX: 'left',
            originY: 'top'
        });

        const id = this.props.authStore.loginUser.id;
        this.setState({createdId : id});
        this.props.enqueueSnackbar("Step3", {
            variant: 'info'
        });
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelWorkNo(this.props.imageStore.isWorkNo);
    }

    handleClickSubmit = () => {
        this.props.professionalLabelStore.changeNewProfessionalLabelCreatedId(this.state.createdId);
        this.props.professionalLabelStore.doProfessionalLabelUp();
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

    handleClickItem = (workNo, imageData) => {
        this.props.rectStore.LoadRectLocation(workNo);
        this.props.rectStore.changeNewRectLocationWorkNo(workNo);
        this.props.imageStore.changeWorkNo(workNo);
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
            width: 750,
            height: 850,
            originX: 'left',
            originY: 'top'
        });
    }
    render() {
        const {classes,history} = this.props;

            return (
                <Container component="main" className={classes.mainContainer}>
                    <div className={classes.appBarSpacer} />
                    <div className={classes.mainContent}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={5} style={{margin:"auto"}}>
                                <div style ={{ backgroundColor : "#13264E"}}>
                                    <canvas id="c" width={750} height={850} className={classes.canvas}>  </canvas>
                                </div>
                            </Grid>
                                <Grid item xs={12} lg={6} >
                                    <Tabs selectedIndex={this.state.tabIndex} >
                                        <TabList>
                                            <Tab  style={{width: '20%', height:60,textAlign:'center'}}><h3>상의</h3></Tab>
                                            <Tab  style={{width: '20%', height:60,textAlign:'center'}}><h3>하의</h3></Tab>
                                            <Tab  style={{width: '20%', height:60,textAlign:'center'}}><h3>신발</h3></Tab>
                                            <Tab  style={{width: '20%', height:60,textAlign:'center'}}><h3>가방</h3></Tab>
                                            <Tab  style={{width: '20%', height:60,textAlign:'center'}}><h3>악세서리</h3></Tab>
                                        </TabList>

                                        <TabPanel>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent />
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent />
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent />
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent />
                                            </Grid>
                                        </TabPanel>
                                        <TabPanel>
                                            <Grid items xs={12} lg={12}>
                                                <CategoryComponent />
                                            </Grid>
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
                    {/*/!*</Button>*!/*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={4} lg={2} style={{marginLeft:'auto'}}>*/}
                    {/*        <Button*/}
                    {/*            type="button"*/}
                    {/*            className={classes.buttonType2}*/}
                    {/*            color="primary"*/}
                    {/*            variant="outlined"*/}
                    {/*            onClick={()=>history.push('/step3')}*/}
                    {/*        >*/}
                    {/*            Next Step*/}
                    {/*        </Button>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </Container>
            );
        }
    };
export default withSnackbar(withRouter(withStyles(styles) (Step3)));