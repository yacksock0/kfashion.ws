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
        minWidth: '80%',
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        marginTop: theme.spacing(2),
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
                <div className={classes.mainContent}>
                <Grid item xs={12}>
                    <AdminVerify />
                </Grid>
                <CreateGroupDialog />
                </div>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (AdminGroup)));