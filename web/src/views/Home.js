import React, { Component } from 'react'
import DropzoneDialogExample from "../components/DropzoneDialog";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

import {Container, Toolbar, Typography} from "@material-ui/core";


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
    test:{
        float: 'left'
    },
});

class Home extends React.Component {
    componentDidMount() {
        this.props.enqueueSnackbar("Welcome", {
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
                            Home 1024 x 720
                        </Typography>
                    </Toolbar>

                </div>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Home)));