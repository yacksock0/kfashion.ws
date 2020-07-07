import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Container, Grid, Typography} from "@material-ui/core";
import Color from "./step2/Color";
import SleeveLength from "./step2/SleeveLength";
import {inject, observer} from "mobx-react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BasicImageList from "./step2/BasicImageList";

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Typography>{children}</Typography>
            )}
        </div>
    );
}

const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
        maxWidth:'70%',
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
    },
    content:{
        marginTop: 15,
        display: 'flex',
        flexDirection: 'column',
    },
    buttonType1:{
        width: '100%',
        height: 50,
    },
    buttonType2:{
        width: '100%',
        height: 50,

    },
    insertButton:{
        width:110,
        marginLeft: 'auto',
    },
});

@inject('basicLabelStore','authStore','imageStore')
@observer
class Step2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgData :'',
            workNo:'',
            value: 0,
            number:1,
            createdId: '',
        }
    }
    componentDidMount() {
        this.props.authStore.checkLogin();
        const id = this.props.authStore.loginUser.id;
        this.setState({createdId : id});
        this.props.enqueueSnackbar("Step2", {
            variant: 'info',
        });
        this.setState({
            boundaryList: this.props.imageStore.boundaryList,
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })
    }

    handleClickOK = () => {
        this.props.basicLabelStore.changeNewBasicLabelCreatedId(this.state.createdId);
        this.props.basicLabelStore.doBasicLabelUp();
    }

    handleTabChange = (event, newValue) => {
        this.setState({ value: newValue });
    }
    handleTabChangeTop= (event, newNumber) => {
        this.setState({ number: newNumber });
    }
    handleClickItem = (workNo, imageData) => {
        this.props.imageStore.changeWorkNo(workNo);
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
    render() {
        const { classes,history} = this.props;
        const {isWorkNo} = this.props.imageStore;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                 <Grid container spacing={3}>
                     <Grid item xs={12} lg={6} style={{margin:"auto"}}>
                         <img src={`/api/v1/kfashion/img/getByteImage?workNo=${isWorkNo}`} alt="" style={{display:"inline-block" , width:'100%', height:'77vh'}}></img>
                     </Grid>
                     <Grid item xs={12} lg={6}>
                         <AppBar position="static">
                             <Tabs value={this.state.number} onChange={this.handleTabChangeTop} aria-label="simple tabs example" >
                                 <Tab label="라벨링" number={0}  style={{minWidth:'50%'}}/>
                                 <Tab label="이미지 리스트" number={1} style={{minWidth:'50%'}}/>
                             </Tabs>
                         </AppBar>
                         <TabPanel value={this.state.number} index={0}>
                                 <AppBar position="static">
                                     <Tabs value={this.state.value} onChange={this.handleTabChange} aria-label="simple tabs example">
                                         <Tab label="상의" value={0}  style={{minWidth:'20%'}}/>
                                         <Tab label="하의" value={1} style={{minWidth:'20%'}}/>
                                         <Tab label="신발" value={2} style={{minWidth:'20%'}}/>
                                         <Tab label="가방" value={3} style={{minWidth:'20%'}}/>
                                         <Tab label="악세서리" value={4} style={{minWidth:'20%'}}/>
                                     </Tabs>
                                 </AppBar>
                                 <TabPanel value={this.state.value} index={0}>
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
                                     </div>
                                 </TabPanel>
                                 <TabPanel value={this.state.value} index={2}>
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
                                     </div>
                                 </TabPanel>
                         <TabPanel value={this.state.value} index={3}>
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
                             </div>
                         </TabPanel>
                         <TabPanel value={this.state.value} index={4}>
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
                             </div>
                         </TabPanel>
                         <TabPanel value={this.state.value} index={1}>
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
                             </div>
                         </TabPanel>
                         </TabPanel>
                         <TabPanel value={this.state.number} index={1}>
                            <BasicImageList onClick={this.handleClickItem}/>
                         </TabPanel>
                     </Grid>
                 </Grid>
                </div>
                <hr></hr>
                <Grid container>
                    <Grid item xs={3} lg={1} style={{marginRight:10}}>
                <Button
                    type="submit"
                    className={classes.buttonType1}
                    variant="outlined"
                    onClick={this.handlePrevious.bind(this)}
                >
                    Previous
                </Button>
                    </Grid>
                    <Grid item xs={3} lg={1}>
                <Button
                    type="submit"
                    className={classes.buttonType1}
                    variant="outlined"
                    onClick={this.handleNext.bind(this)}
                >
                    Next
                </Button>
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