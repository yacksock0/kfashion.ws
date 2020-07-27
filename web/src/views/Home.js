import React from 'react'
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";


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

class Home extends React.Component {
    componentDidMount() {
        this.props.enqueueSnackbar("Welcome", {
            variant: 'info'
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.mainContainer} style={{backgroundImage: `url(/images/mainbanner.jpg)`, width:'100%', height:'90vh', backgroundSize:'cover'}}>
                <div className={classes.appBarSpacer} />
                    <Grid items xs={12} >
                    <div className={classes.mainTitle}>
                        <Typography variant="h3" component="h3" style={{display:'inline'}} >
                            K-Fashion AI 데이터 시스템 구성
                        </Typography>
                    </div>
                    <div className={classes.subTitle}>
                        <Typography variant="h4" component="h4" style={{display:'inline'}} >
                           풍부한 경험을 토대로 데이터 저장 및 레이블링<br />
                           저작도구 운영을 위한 시스템구축을 준비하고있습니다.
                        </Typography>
                    </div>
                    </Grid>
            </div>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Home)));