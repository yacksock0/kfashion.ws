
import React from 'react'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";


const styles = (theme) => ({
    root: {
        textAlign:'center',
    },
    paper: {
        width:'400px',
        margin:'0 auto',
    },
    titletext: {
        fontFamily:'NotoSansCJKkr',
        width:'390px',
        fontSize:'45px',
        fontWeight:'bold',
        borderBottom: 'solid 4px #526af2',
        paddingBottom: 15,
        margin:'0 auto 25px',
    },
    txtstyle1: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        fontWeight:'bold',
        marginBottom:50,
    },
    txtstyle2: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'14px',
        marginBottom:35,
        color:'#a4a4a4',
    },
    pointcolor: {
        color:'#526af2',
    },
    btnjoinstyle: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        width:'390px',
        boxShadow:'none',
        background:'#526af2',
        color:'#fff',
        borderRadius:0,
        padding:'10px 0',
        fontWeight:'500',

        "&:hover": {
            background:'#526af2',
            color:'#fff',
            borderRadius:0, 
            boxShadow:'none',
        },
    },
});

@inject('tSignUpStore')
@observer
class JoinWelcomeTag extends React.Component {
    handleClickToHome = () => {
        this.props.tSignUpStore.initialize()
        this.props.history.push("/tagging");
    }
    render() {
        const {classes} = this.props;
        const { newMember } = this.props.tSignUpStore;
        return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <Paper elevation={0}>
                    <Typography className={classes.titletext}>환영합니다!</Typography>
                    <Typography className={classes.txtstyle1}>
                        <span className={classes.pointcolor}>{newMember.name}</span>님, 회원가입을 축하합니다.<br />가입하신 아이디는 <span className={classes.pointcolor}>{newMember.id}</span> 입니다.
                    </Typography>

                    <Typography className={classes.txtstyle2}>
                       다양한 패션 아이템정보와 서비스를<br />제공받으실 수 있습니다.
                    </Typography>
                    <Button variant="contained"
                            className={classes.btnjoinstyle}
                            onClick={this.handleClickToHome}
                    >
                        시작하기
                    </Button>
                    </Paper>
                </Paper>
            </div>
        )

    }
};

export default withSnackbar(withRouter(withStyles(styles) (JoinWelcomeTag)));

