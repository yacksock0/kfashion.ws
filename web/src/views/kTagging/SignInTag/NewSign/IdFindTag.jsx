import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {inject, observer} from "mobx-react";
import JoinUserInfoTag from "./JoinUserInfoTag";
import QuestionsTag from './QuestionsTag';
import {IconButton, Snackbar} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";

const style = theme => ({
    root: {
        textAlign:'center',
        "& .MuiSnackbarContent-root": {
            backgroundColor: '#526af2',
            fontFamily: 'NotoSansCJKkr',
            paddingLeft: '20px',
            fontWeight: "bold",
            minWidth: "380px",
        },
        "& .MuiOutlinedInput-root":{
            borderRadius:0,
            marginTop: theme.spacing(1),
        },
        "& .MuiOutlinedInput-input":{
            padding:10,
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
        borderBottom: 'solid 4px #526af2',
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

@inject('tSignUpStore')
@observer
class IdFindTag extends Component{
    componentWillUnmount() {
        if(this.props.tSignUpStore.questionCK !==true) {
            this.props.tSignUpStore.initialize()
            console.log("initialize")
        }
    }
    handleClose = () => {
        this.props.tSignUpStore.handleSnackIdClose();
    }
    handleClickOK = () => {
        this.props.tSignUpStore.changeQuestionCk()
        this.props.tSignUpStore.doFindUser(this.props.history, "ID");
    }
    handleUserInfoOK = () => {
        this.props.tSignUpStore.handleUserInfoOK2();
    }

    render() {
        const { classes } = this.props;
        const {userInfoOK, member, idSnack} = this.props.tSignUpStore;
        const snackMessage = <div><ErrorIcon style={{fontSize: 30, marginTop: '5px'}}/><span
            style={{fontSize: '17px', position: 'absolute', left: '60px', top: '22px'}}>이름 혹은 닉네임을 다시 확인해주세요.</span></div>


        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.titletext}>아이디 찾기</Typography>

                        {userInfoOK === false &&  <JoinUserInfoTag handleUserInfoOK={this.handleUserInfoOK}/> }
                        {userInfoOK === true && member.name !== undefined && member.name !== "" &&
                        <Typography className={classes.txtstyle1}>회원가입 시 설정한 보안 질문을<br/> 선택하여 답변해주세요.</Typography> &&
                        <QuestionsTag handleClickOK={this.handleClickOK} />
                        }
                        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                                  open={idSnack}
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
export default withStyles(style)(IdFindTag);











