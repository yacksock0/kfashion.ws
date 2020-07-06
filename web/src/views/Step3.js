import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Container, Grid, Typography} from "@material-ui/core";
import Category from "./step3/Category";
import Style from "./step3/Style";
import Detail from "./step3/Detail";
import Print from "./step3/Print";
import Texture from "./step3/Texture";
import ClothLength from "./step3/ClothLength";
import NeckLine from "./step3/NeckLine";
import ColorKara from "./step3/ColorKara";
import Fit from "./step3/Fit";
import Safe from "./step3/Safe";
import Silhouette from "./step3/Silhouette";
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
                            <Grid container item xs={12} lg={6}>
                                <AppBar position="static">
                                    <Tabs value={this.state.value} onChange={this.handleTabChange} aria-label="simple tabs example" >
                                        <Tab label="상의" value={0}  style={{minWidth:'20%'}}/>
                                        <Tab label="하의" value={1} style={{minWidth:'20%'}}/>
                                        <Tab label="신발" value={2} style={{minWidth:'20%'}}/>
                                        <Tab label="가방" value={3} style={{minWidth:'20%'}}/>
                                        <Tab label="악세서리" value={4} style={{minWidth:'20%'}}/>
                                    </Tabs>
                                </AppBar>
                            <Grid item xs={12} lg={6}>
                                <div className={classes.content}>
                                    <Typography variant="h5" component="h5">
                                        스타일
                                    </Typography>
                                    <div>
                                        <hr></hr>
                                    </div>
                                    <Style />
                                </div>
                            </Grid>
                                <Grid item xs={12} lg={6}>
                                <div className={classes.content}>
                                    <Typography variant="h5" component="h5">
                                        카테고리
                                    </Typography>
                                    <div>
                                        <hr></hr>
                                    </div>
                                    <Category />
                                </div>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                <div className={classes.content}>
                                    <Typography variant="h5" component="h5">
                                        디테일
                                    </Typography>
                                    <div>
                                        <hr></hr>
                                    </div>
                                    <Detail />
                                </div>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                프린트
                                            </Typography>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Print />
                                        </div>
                                    </Grid>
                                <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                              소재감
                                            </Typography>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Texture />
                                        </div>
                                    </Grid>
                                <Grid item xs={12} lg={6}>
                                    <div className={classes.content}>
                                        <Typography variant="h5" component="h5">
                                            기장
                                        </Typography>
                                        <div>
                                            <hr></hr>
                                        </div>
                                        <ClothLength />
                                    </div>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <div className={classes.content}>
                                        <Typography variant="h5" component="h5">
                                            넥라인
                                        </Typography>
                                        <div>
                                            <hr></hr>
                                        </div>
                                        <NeckLine />
                                    </div>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <div className={classes.content}>
                                        <Typography variant="h5" component="h5">
                                            칼라(카라)
                                        </Typography>
                                        <div>
                                            <hr></hr>
                                        </div>
                                        <ColorKara />
                                    </div>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <div className={classes.content}>
                                        <Typography variant="h5" component="h5">
                                            핏
                                        </Typography>
                                        <div>
                                            <hr></hr>
                                        </div>
                                        <Fit />
                                    </div>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <div className={classes.content}>
                                        <Typography variant="h5" component="h5">
                                            세이프
                                        </Typography>
                                        <div>
                                            <hr></hr>
                                        </div>
                                        <Safe />
                                    </div>
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <div className={classes.content}>
                                        <Typography variant="h5" component="h5">
                                            실루엣
                                        </Typography>
                                        <div>
                                            <hr></hr>
                                        </div>
                                        <Silhouette />
                                    </div>

                                </Grid>
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