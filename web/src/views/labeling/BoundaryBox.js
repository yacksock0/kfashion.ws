import
    React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Container, Toolbar, Typography, Button, Grid,} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import DropzoneDialogExample from "../../components/DropzoneDialog";
import DropzoneFuck from "../../components/DropzoneFuck";
const styles = theme => ({
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
        backgroundColor:'black',
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


@inject('fileUploadStore')
@observer
class BoundaryBox extends React.Component {
    componentDidMount() {
        this.props.enqueueSnackbar("BoundaryBox Work", {
            variant: 'info'
        });
    }
    handleChangeUploadFile = (event) => {
        const file = event.target.files[0];

        this.props.fileUploadStore.changeUploadFile(file,this.props.id);
    }
    handleOk = () => {
        this.props.fileUploadStore.addNewImg();
    }

    render() {
        const { classes } = this.props;
        const { uploadFile} = this.props.fileUploadStore;
        return (
            <Container component="main" className={classes.mainContainer}>
                {/*Stepper*/}
                <div style={{marginTop:70}}>
                </div>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Toolbar className={classes.toolbar}>
                        <Grid container>
                            <Grid item xs={1} style={{marginRight:5}}>
                                <DropzoneDialogExample />
                                <div>
                                </div>
                            </Grid>
                            <Grid item xs={1} style={{marginRight:5}}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.toolButton} >
                                    Open DIR
                                </Button>
                            </Grid>
                            <Grid item xs={1} style={{marginRight:5}}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.toolButton} >
                                    Change Save Dir
                                </Button>
                            </Grid>
                            <Grid item xs={1} style={{marginRight:5}}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.toolButton} >
                                    Zoom In
                                </Button>
                            </Grid>
                            <Grid item xs={1} style={{marginRight:5}}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.toolButton} >
                                    Zoom Out
                                </Button>
                        </Grid>
                        </Grid>
                        {/*Img*/}
                    </Toolbar>
                    <hr></hr>
                    <Grid container>
                        <Grid item xs={1}>
                            <div className={classes.toolBox}>
                                Tool Box
                            </div>
                        </Grid>
                        <Grid item xs={8} className={classes.canvas}>
                            <img src="https://placeimg.com/1000/800/any" alt={''} />
                        </Grid>
                        <Grid item xs={3}>
                            <div className={classes.test}>
                            <Typography>
                                작업리스트
                            </Typography>
                                <hr></hr>
                            </div>

                            <div className={classes.test}>
                            <Typography>
                                완료리스트
                            </Typography>
                            <hr></hr>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <hr></hr>
                    <Button
                        type="submit"
                        className={classes.buttonType1}
                        variant="outlined"
                        onClick={this.handleSubmitForm} >
                        Previous
                    </Button>
                    <Button
                        type="submit"
                        className={classes.buttonType1}
                        variant="outlined"
                        onClick={this.handleSubmitForm} >
                        Next
                    </Button>
                    <Button
                        type="submit"
                        className={classes.buttonType2}
                        color="primary"
                        variant="outlined"
                        onClick={this.handleSubmitForm} >
                        Save and Next
                    </Button>
                </div>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (BoundaryBox)));