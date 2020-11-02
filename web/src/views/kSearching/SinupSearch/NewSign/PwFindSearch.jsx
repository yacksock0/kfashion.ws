import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import QuestionsSearch from './QuestionsSearch';
import {inject, observer} from "mobx-react";
import JoinIdSearch from "./JoinIdSearch";
import {IconButton, Snackbar} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";


const style = theme => ({
    root: {
        textAlign: 'center',
        "& .MuiSnackbarContent-root": {
            backgroundColor: '#38a67e',
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
        width: '400px',
        margin: '0 auto',
    },
    titletext: {
        fontFamily: 'NotoSansCJKkr',
        fontSize: '40px',
        fontWeight: 'bold',
        borderBottom: 'solid 4px #38a67e',
        paddingBottom: 10,
        margin: '0 auto 15px',
    },
    txtstyle1: {
        fontFamily: 'NotoSansCJKkr',
        fontSize: '17px',
        fontWeight: 'bold',
        margin: '45px 0 40px 0',
        lineHeight: '1.2',
    },

});

@inject('sSignUpStore')
@observer
class PwFindSearch extends Component {
    handleClose = () => {
        this.props.sSignUpStore.handleSnackPwClose();
    }
    handleClickOK = () => {
        this.props.sSignUpStore.changeQuestionCk();
        this.props.sSignUpStore.doFindUser(this.props.history, "PW");
    }
    componentWillUnmount() {
        if(this.props.sSignUpStore.questionCK !== true){
            this.props.sSignUpStore.initialize()
            console.log("initialize")
        }
    }

    render() {
        const {classes} = this.props;
        const {idOK, handleIdOK2, pwSnack} = this.props.sSignUpStore;
        const snackMessage = <div><ErrorIcon style={{fontSize: 30, marginTop: '5px'}}/><span
            style={{fontSize: '17px', position: 'absolute', left: '60px', top: '22px'}}>아이디를 다시 확인해주세요.</span></div>
        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.titletext}>비밀번호 찾기</Typography>
                        {idOK === false && <JoinIdSearch handleIdOK={handleIdOK2}/>}
                        {idOK === true &&
                        <Typography className={classes.txtstyle1}>회원가입 시 설정한 보안 질문을<br/> 선택하여 답변해주세요.</Typography> &&
                        <QuestionsSearch handleClickOK={this.handleClickOK}/>
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

export default withStyles(style)(PwFindSearch);













