import React from 'react'
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";


const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
        width:'100%',
        marginTop: '5vh'
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        width:'100%',
        objectFit: 'contain',
    },
    toolbar: {
        width: '100%',
    },
    mainTitle:{
            marginTop:'25vh',
            fontFamily: 'NotoSansCJKkr',
            fontWeight: 'bold',
            fontStyle: 'normal',
            textAlign: 'center',
            color: '#000000',
    },
    subTitle:{
        marginTop:'10vh',
        fontFamily: 'NotoSansCJKkr',
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#000000',
    }
});

@inject('currentStepStore')
@observer
class HomeTag extends React.Component {
    componentDidMount() {
        setTimeout(() => document.body.style.zoom = "100%", 100);
        this.props.currentStepStore.setStep(0);
        this.props.enqueueSnackbar("홈", {
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
            <div className={classes.mainContainer} style={{backgroundImage: `url(/images/mainbanner.jpg)`, width:'100%',height:'90vh' , backgroundSize:'cover'}}>
                <div className={classes.appBarSpacer} />
                    <Grid item xs={12}>
                        <div className={classes.mainTitle}>
                            <Typography variant="h3" component="h3" style={{display:'inline'}} >
                                K-Tagging
                            </Typography>
                        </div>
                    </Grid>
            </div>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (HomeTag)));