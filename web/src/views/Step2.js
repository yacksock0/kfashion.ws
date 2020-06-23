import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Button, Container, Grid, ListItemIcon, Typography} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Gender from "./Step2/Gender";
import Color from "./Step2/Color";
import ClothLength from "./Step2/ClothLength";
import ColorTest from "./Step2/ColorTest";
import Category from "./Step2/Category";
import Print from "./Step2/Print";
import SleeveLength from "./Step2/SleeveLength";
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        marginTop: theme.spacing(3),
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

class Step2 extends React.Component {
    componentDidMount() {
        this.props.enqueueSnackbar("Step2", {
            variant: 'info'
        });
    }
    render() {
        const { classes } = this.props;

        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                        <Typography variant="h4" component="h2">
                            기본정보 입력
                        </Typography>
                 <Grid container spacing={3}>
                     <Grid item xs={6}>
                         <img src="https://placeimg.com/450/650/any" alt={""}></img>
                     </Grid>
                     <Grid item xs={6}>

                         <div className={classes.content}>
                             <div style={{display:"inline-flex"}}>
                             <Typography variant="h4" component="h2">
                                 색상
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
                             <Color />
                         </div>
                         <div className={classes.content}>
                             <div style={{display:"inline-flex"}}>
                                 <Typography variant="h4" component="h2">
                                     소매 길이
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
                     >
                    Next
                </Button>
                <Button
                    type="submit"
                    className={classes.buttonType2}
                    color="primary"
                    variant="outlined"
                    >
                    Save and Next
                </Button>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Step2)));