import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import QuestionsMatch from './QuestionsMatch';
import {inject, observer} from "mobx-react";
import JoinIdMatch from "./JoinIdMatch";
import {IconButton, Snackbar} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";


const style = theme => ({
    root: {
        textAlign:'center',
        "& .MuiSnackbarContent-root": {
            backgroundColor: '#d94848',
            fontFamily: 'NotoSansCJKkr',
            paddingLeft: '20px',
            fontWeight: "bold",
            minWidth: "300px",
        },
    },
    close: {
        color: '#fff',
    },
    paper: {
        width:'400px',
        margin:'0 auto',
    },
    titletext: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'40px',
        fontWeight:'bold',
        borderBottom: 'solid 4px #d94848',
        paddingBottom: 10,
        margin:'0 auto 15px',
    },
    txtstyle1: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        fontWeight:'bold',
        margin:'45px 0 40px 0',
        lineHeight: '1.2',
    },

});

@inject('mSignUpStore')
@observer
class PwFindMatch extends Component{
    handleClose = () => {
        this.props.mSignUpStore.handleSnackPwClose();
    }
    handleClickOK = () => {
        this.props.mSignUpStore.changeQuestionCk();
        this.props.mSignUpStore.doFindUser(this.props.history, "PW");
    }
    componentWillUnmount() {
        if(this.props.mSignUpStore.questionCK !== true){
            this.props.mSignUpStore.initialize()
            console.log("initialize")
        }
    }

    render() {
        const { classes } = this.props;
        const {idOK, handleIdOK2, pwSnack} = this.props.mSignUpStore;
        const snackMessage = <div><ErrorIcon style={{fontSize: 30, marginTop: '5px'}}/><span
            style={{fontSize: '17px', position: 'absolute', left: '60px', top: '22px'}}>아이디를 다시 확인해주세요.</span></div>
        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.titletext}>비밀번호 찾기</Typography>
                        {idOK === false &&  <JoinIdMatch handleIdOK={handleIdOK2}/>}
                        {idOK === true &&
                        <Typography className={classes.txtstyle1}>회원가입 시 설정한 보안 질문을<br/> 선택하여 답변해주세요.</Typography> &&
                        <QuestionsMatch handleClickOK={this.handleClickOK}/>
                        }
                        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                                  open={pwSnack}
                                  autoHideDuration={3000}
                                  onClose={this.handleClose}
                                  message={snackMessage}
                                  severity={'info'}
                                  action={[
                                      <IconButton key="close" aria-label="Close" className={classes.close}
                                                  onClick={this.handleClose}>
                                          <CloseIcon/>
                                      </IconButton>,
                                  ]}
                        />
                    </Paper>
                </Paper>
            </div>
        )
    }
}
export default withStyles(style)(PwFindMatch);













