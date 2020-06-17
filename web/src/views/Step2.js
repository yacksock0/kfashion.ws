import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Button, Container, Grid, Typography} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Gender from "./Step2/Gender";
import Item from "./Step2/Item";
import Style from "./Step2/Style";
import Color from "./Step2/Color";
import Pattern from "./Step2/Pattern";

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
                         <img src="https://placeimg.com/500/800/any" alt={""}></img>
                     </Grid>
                     <Grid item xs={6}>
                         <div className={classes.content} >
                         <Typography variant="h4" component="h2">
                             Gender
                         </Typography>
                             <div>
                                 <hr></hr>
                                 <Gender />
                             </div>

                         </div>
                         <div className={classes.content}>
                         <Typography variant="h4" component="h2">
                             Item
                         </Typography>
                             <div>
                         <hr></hr>
                                 <Item />
                             </div>

                         </div>
                         <div className={classes.content}>
                             <Typography variant="h4" component="h2">
                                 Style
                             </Typography>
                             <div>
                                 <hr></hr>
                             </div>
                                <Style />
                         </div>
                         <Grid container spacing={3} row>
                         <Grid item xs={6}>
                             <div className={classes.content}>
                                 <Typography variant="h4" component="h2">
                                     Color
                                 </Typography>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <Color />
                             </div>
                        </Grid>
                         <Grid item xs={6}>
                             <div className={classes.content}>
                                 <Typography variant="h4" component="h2">
                                     Pattern
                                 </Typography>
                                 <div>
                                     <hr></hr>
                                 </div>
                                 <Pattern />
                             </div>
                         </Grid>
                         </Grid>
                         <div className={classes.content}>
                         <FormGroup row >
                             <FormControlLabel
                                 control={<Checkbox name="checkedA" />}
                                 label="Not fashion Image"/>
                         </FormGroup>
                         </div>
                     </Grid>
                 </Grid>
                </div>
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
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Step2)));