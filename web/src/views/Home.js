import React from 'react'
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import Button from '@material-ui/core/Button';

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
    topTitle: {
        marginTop:'15vh',
        fontFamily: 'NotoSansCJKkr',
        fontWeight: 'bold',
        fontSize:'27px',
        color:'#fff',
        textAlign: 'center',
    },
    mainTitle:{
        fontFamily: 'NotoSansCJKkr',
        fontWeight: 'bold',
        fontSize:'81px',
        color:'#fff',
        textAlign: 'center',
        textShadow: '0 5px 6px rgba(0, 0, 0, 0.4)',
        display:'inline',
    },
    subTitle:{
        fontFamily: 'NotoSansCJKkr',
        fontWeight: '500',
        fontSize:'20px',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#fff',
        display:'inline'
    },
    loginbtn:{
        width:'240px',
        height:'76px',
        borderRadius:'8px',
        color:'#fff',
        fontFamily: 'NotoSansCJKkr',
        fontWeight: 'bold',
        fontSize:'20px',
        textShadow: '0 5px 6px rgba(0, 0, 0, 0.4)',
        border:'2px solid #fff',
        display:'inline'
 
    },
});

@inject('currentStepStore')
@observer
class Home extends React.Component {
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
            <div className={classes.mainContainer} style={{backgroundImage: 'url(/images/mainbanner1.png)', width:'100%',height:'90vh' , backgroundSize:'cover'}}>
                <div className={classes.appBarSpacer} />
                    <Grid item xs={12}>
                        <div style={{textAlign:'center'}} >
                            <Typography className={classes.topTitle}>
                                NIA 인공지능 학습용 데이터 구축
                            </Typography>
                        </div>
                        <div  style={{textAlign:'center',marginTop:10,}}>
                        <Typography className={classes.mainTitle}>
                                <span style={{color:'#5ded9a'}}>K-FASHION AI</span> 데이터 구축
                            </Typography>
                        </div>
                        <div style={{textAlign:'center',marginTop:10,}}>
                            <Typography className={classes.subTitle} >
                            패션 요소에 대한 인공지능 인식 기술개발 및 성능 강화에 필요한<br />
                            국내 생산 및 유통 중인 패션 아이템 이미지 데이터 작업
                            </Typography>
                        </div>
                        <div style={{textAlign:'center',marginTop:48,}}>
                            <Button variant="outlined" className={classes.loginbtn}>로그인하기</Button>
                        </div>
                    </Grid>
            </div>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Home)));