import React, { Component } from 'react'
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

import {Grid,Typography} from "@material-ui/core";


const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        width: 1920,
        height: 940,
        objectFit: 'contain',
    },
    toolbar: {
        width: '100%',
    },
    mainTitle:{
            position:'absolute',
            fontFamily: 'NotoSansCJKkr',
            fontsize: 47,
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: 1.49,
            letterSpacing: 'normal',
            textAlign: 'center',
            color: '#000000',
    }
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
            <div>
                <div className={classes.appBarSpacer} />
                    <Grid items xs={12} style={{}}>
                    <img src='/images/mainbanner.jpg' style={{width:'100%',objectFit:'contain'}}/>
                    </Grid>
            </div>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Home)));