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
        maxWidth:'100%',
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
        width: 100,
        marginRight: theme.spacing(2),
    },
    buttonType2:{
        width: 150,
        float:'right',

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
            value: 0,
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
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })
        this.props.basicLabelStore.changeNewBasicLabelWorkNo(this.props.imageStore.isWorkNo);
    }

    handleClickOK = () => {
        this.props.basicLabelStore.changeNewBasicLabelCreatedId(this.state.createdId);
        this.props.basicLabelStore.doBasicLabelUp();
    }

    handleTabChange = (event, newValue) => {
        this.setState({ value: newValue });
    }
    render() {
        const { classes } = this.props;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                 <Grid container spacing={3}>
                     <Grid item xs={12} lg={6} style={{margin:"auto"}}>
                         <img src={this.state.imgData} alt="" style={{display:"inline-block" , width:'100%', height:'77vh'}}></img>
                     </Grid>
                     <Grid item xs={12} lg={6}>
                                 <AppBar position="static">
                                     <Tabs value={this.state.value} onChange={this.handleTabChange} aria-label="simple tabs example" >
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
                                     {/* <Button
                                 variant="outlined"
                                 color="primary"
                                 className={classes.insertButton}
                                 startIcon={<AddIcon />}
                             >
                                 항목추가
                             </Button>*/}
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
                                             {/*<Button
                                     variant="outlined"
                                     color="primary"
                                     className={classes.insertButton}
                                     startIcon={<AddIcon />}
                                 >
                                     항목추가
                                 </Button>*/}
                                         </div>
                                         <div>
                                             <hr></hr>
                                         </div>
                                         <SleeveLength />
                                     </div>
                                     {/*<Grid container spacing={3} row>
                         <Grid item xs={6}>
                             <div className={classes.content}>
                                 <div style={{display:"inline-flex"}}>
                                 <Typography variant="h4" component="h2">
                                     의상 길이
                                 </Typography>
                                 <Button
                                     variant="outlined"
                                     color="primary"
                                     className={classes.insertButton}
                                     startIcon={<AddIcon />}
                                 >
                                     항목추가
                                 </Button>
                             </div>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <SleeveLength />
                             </div>
                        </Grid>*/}
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
                     </Grid>
                 </Grid>
                </div>
                <hr></hr>
                <Button
                    type="submit"
                    className={classes.buttonType1}
                    variant="outlined"
                    >
                    Previous
                </Button>
                <Button
                    type="submit"
                    className={classes.buttonType1}
                    variant="outlined"
                    onClick={this.handleClickOK}
                     >
                    Next
                </Button>
                <Button
                    type="submit"
                    className={classes.buttonType2}
                    color="primary"
                    variant="outlined"
                    >
                    Next Step
                </Button>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Step2)));