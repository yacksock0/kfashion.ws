import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

import {Container, Toolbar, Typography, Button} from "@material-ui/core";


const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
    },
});

class Polygon extends React.Component {
    componentDidMount() {
        this.props.enqueueSnackbar("Polygon Work", {
            variant: 'info'
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h4" component="h2">
                            Polygon Edit
                            <div>
                                <img src="https://placeimg.com/500/800/any" alt={''}></img>
                            </div>
                        </Typography>
                    </Toolbar>
                    <div>
                        <Button
                            type="submit"
                            className={classes.submit}
                            color="primary"
                            variant="contained"
                            onClick={this.handleSubmitForm}
                            fullWidth >Next
                        </Button>
                    </div>
                </div>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Polygon)));