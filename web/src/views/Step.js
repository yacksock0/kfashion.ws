import React from "react";
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
});

class Step extends React.Component {
    componentDidMount() {
        this.props.enqueueSnackbar("기본 레이블링", {
            variant: 'success',
            anchorOrigin:{
                vertical: 'bottom',
                horizontal: 'left',
            }
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
                            이미지 업로드
                        </Typography>
                    </Toolbar>
                </div>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Step)));