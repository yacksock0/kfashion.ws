import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles';
import {Typography,Button, TextField,Paper} from '@material-ui/core';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import {inject, observer} from "mobx-react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";


const styles = (theme) => ({
    root: {
        textAlign:'center',
        "& .MuiOutlinedInput-root":{
            padding:'0 5px',
            borderRadius:0,
            height:'39px',
        },
        "& .MuiOutlinedInput-input":{
            padding:'0',
        },
    },
    paper: {
        width:'400px',
        margin:'0 auto',
    },
    txtstyle1: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        fontWeight:'bold',
        marginBottom:40,
        lineHeight: '1.2',
    },
    namebox: {
        width:'100%',
        marginBottom:10,
        //2020.10.28 텍스트필드 BorderColor 변경 [이지현]
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d94848"
        },
    },
    pwtext: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'14px',
        color:'#c9c9c9',
        marginBottom:20,
    },
    btnjoinstyle: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        width:'100%',
        boxShadow:'none',
        marginTop:24,
        background:'#000',
        color:'#fff',
        borderRadius:0,
        padding:'10px 0',

        "&:hover": {
            background:'#000',
            color:'#fff',
            borderRadius:0, 
            boxShadow:'none',
        },
    },
});

@inject('mSignUpStore')
@observer
class JoinPwMatch extends Component {
    handleChangePassword = (event) => {
        this.props.mSignUpStore.changeNewMemberPassword(event.target.value);
    }
    handleChangePasswordConfirm = (event) => {
        this.props.mSignUpStore.changeNewMemberPasswordConfirm(event.target.value);
    }
    handleKeyUpPw = (event) => {
        if(this.props.mSignUpStore.isValidPassword && this.props.mSignUpStore.isPasswordConfirmed && event.keyCode===13){
            this.props.handlePwOK();
        }
    }


    render() {
        const {classes, handlePwOK} = this.props;
        const {
            isValidPassword, isPasswordConfirmed,
             newMember,
        } = this.props.mSignUpStore
        const {password, passwordConfirm} = this.props.mSignUpStore.newMember


        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.txtstyle1}>로그인에 사용할 비밀번호를 입력해주세요</Typography>

                        <form noValidate autoComplete="off">
                            <TextField
                                id="password"
                                placeholder="비밀번호 입력"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                className={classes.namebox}
                                autoComplete={"off"}
                                value={newMember.password}
                                onChange={this.handleChangePassword}
                            />
                            {isValidPassword ?
                                <Paper elevation={0} style={{display: 'flex'}}>
                                    <Typography className={classes.pwtext} style={{color: '#000'}}>영문,숫자포함/8~20자 이내 </Typography>
                                    <CheckRoundedIcon style={{color: '#000', marginTop: -5}}/>
                                </Paper> :
                                <Paper elevation={0} style={{display: 'flex'}}>
                                    <Typography className={classes.pwtext} style={{color: '#c9c9c9'}}>영문,숫자포함/8~20자 이내 </Typography>
                                    <CheckRoundedIcon style={{color: '#c9c9c9', marginTop: -5}}/>
                                </Paper>
                            }
                            <TextField
                                id="password"
                                placeholder="비밀번호 확인"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                className={classes.namebox}
                                autoComplete={"off"}
                                value={newMember.passwordConfirm}
                                onChange={this.handleChangePasswordConfirm}
                                onKeyUp={this.handleKeyUpPw}
                            />
                            {isPasswordConfirmed && (password||passwordConfirm !== '') ?
                                <Paper elevation={0} style={{display: 'flex'}}>
                                    <Typography className={classes.pwtext} style={{color: '#000'}}>비밀번호
                                        일치 </Typography>
                                    <CheckRoundedIcon style={{color: '#000', marginTop: -5}}/>
                                </Paper> :
                                <Paper elevation={0} style={{display: 'flex'}}>
                                    <Typography className={classes.pwtext} style={{color: '#c9c9c9'}}>비밀번호
                                        일치 </Typography>
                                    <CheckRoundedIcon style={{color: '#c9c9c9', marginTop: -5}}/>
                                </Paper>
                            }
                        </form>
                        <Paper elevation={0}>
                            <Button variant="contained"
                                    className={classes.btnjoinstyle}
                                    disabled={!isValidPassword || !isPasswordConfirmed}
                                    onClick={handlePwOK}>다음</Button>
                        </Paper>
                    </Paper>
                </Paper>
            </div>
        )
    }
}

export default withSnackbar(withRouter(withStyles(styles)(JoinPwMatch)));




