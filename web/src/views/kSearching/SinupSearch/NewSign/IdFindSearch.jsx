import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {inject, observer} from 'mobx-react';
import JoinUserInfoSearch from "./JoinUserInfoSearch";
import QuestionsSearch from "./QuestionsSearch";
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
            minWidth: "380px",
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            marginTop: theme.spacing(1),
        },
        "& .MuiOutlinedInput-input": {
            padding: 10,
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
class IdFindSearch extends Component {
    componentWillUnmount() {
        if(this.props.sSignUpStore.questionCK !==true) {
            this.props.sSignUpStore.initialize()
            console.log("initialize")
        }
    }
    handleClose = () => {
        this.props.sSignUpStore.handleSnackIdClose();
    }
    handleClickOK = () => {
        this.props.sSignUpStore.changeQuestionCk()
        this.props.sSignUpStore.doFindUser(this.props.history, "ID");
    }
    handleUserInfoOK = () => {
        this.props.sSignUpStore.handleUserInfoOK2();
    }

    render() {
        const {classes} = this.props;
        const {userInfoOK, member, idSnack} = this.props.sSignUpStore;
        const snackMessage = <div><ErrorIcon style={{fontSize: 30, marginTop: '5px'}}/><span
            style={{fontSize: '17px', position: 'absolute', left: '60px', top: '22px'}}>이름 혹은 닉네임을 다시 확인해주세요.</span>
        </div>

        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.titletext}>아이디 찾기</Typography>

                        {userInfoOK === false && <JoinUserInfoSearch handleUserInfoOK={this.handleUserInfoOK}/>}
                        {userInfoOK === true &&
                        <Typography className={classes.txtstyle1}>회원가입 시 설정한 보안 질문을<br/> 선택하여 답변해주세요.</Typography> &&
                        <QuestionsSearch handleClickOK={this.handleClickOK}/>
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
export default withStyles(style)(IdFindSearch);











