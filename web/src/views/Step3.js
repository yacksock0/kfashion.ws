import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Container, Grid, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CategoryComponent from "./step3/CategoryComponent";

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
        marginRight: 15,
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
    test:{
        border: '1px solid black'
    }
});

@inject('professionalLabelStore','authStore', 'imageStore')
@observer
class Step3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:0,
            createdId: '',
        }
    }
    componentDidMount() {
        this.props.authStore.checkLogin();
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

    handleTabChange = (event, newValue) => {
        this.setState({ value: newValue });
    }
    render() {
        const {classes} = this.props;

            return (
                <Container component="main" className={classes.mainContainer}>
                    <div className={classes.appBarSpacer} />
                    <div className={classes.mainContent}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={6} style={{margin:"auto"}}>
                                <img src={this.state.imgData} alt="" style={{display:"inline-block" , width:'100%', height:'77vh'}}></img>
                            </Grid>
                            <Grid item xs={12} lg={6} >
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
                                <Grid container item xs={12} lg={12}>
                                    <CategoryComponent />
                                </Grid>
                                </TabPanel>
                                <TabPanel value={this.state.value} index={1}>
                                    <Grid container item xs={12} lg={12}>
                                        <CategoryComponent />
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={this.state.value} index={2}>
                                    <Grid container item xs={12} lg={12}>
                                        <CategoryComponent />
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={this.state.value} index={3}>
                                    <Grid container item xs={12} lg={12}>
                                        <CategoryComponent />
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={this.state.value} index={4}>
                                    <Grid container item xs={12} lg={12}>
                                        <CategoryComponent />
                                    </Grid>
                                </TabPanel>
                                </Grid>
                            </Grid>
                    </div>
                    <hr></hr>
                    <Button
                        type="submit"
                        className={classes.buttonType1}
                        variant="outlined"
                        onClick={this.handleSubmitForm}>
                        Previous
                    </Button>
                    <Button
                        type="submit"
                        className={classes.buttonType1}
                        variant="outlined"
                        onClick={this.handleClickSubmit}>
                        Next
                    </Button>
                    <Button
                        type="submit"
                        className={classes.buttonType2}
                        color="primary"
                        variant="outlined"
                        onClick={this.handleClickSubmit}>
                        Next Step
                    </Button>
                </Container>
            );
        }

    };
export default withSnackbar(withRouter(withStyles(styles) (Step3)));