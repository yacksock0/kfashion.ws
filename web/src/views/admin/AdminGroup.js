import React from 'react'
import {Container, Typography, Toolbar, Grid} from "@material-ui/core";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import CreateGroupDialog from "./CreateGroupDialog";
import AdminVerify from "./AdminVerify";

const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
        width: '100%',
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    toolbar: {
        width: '100%',
    },
});

class AdminGroup extends React.Component {
    componentDidMount() {
        this.props.enqueueSnackbar("AdminGroup Work", {
            variant: 'info'
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                    <Toolbar className={classes.toolbar}>
                    </Toolbar>
                <Grid item xs={12} lg={12}>
                    <AdminVerify />
                </Grid>
                <CreateGroupDialog />
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (AdminGroup)));