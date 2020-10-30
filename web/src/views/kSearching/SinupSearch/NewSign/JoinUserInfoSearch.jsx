import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {inject, observer} from "mobx-react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";


const style = (theme) => ({
    root: {
        textAlign: 'center',
        "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            marginTop: theme.spacing(1),
        },
        "& .MuiOutlinedInput-input": {
            padding: 10,
        },
    },
    paper: {
        width: '400px',
        margin: '0 auto',
    },
    txtstyle1: {
        fontFamily: 'NotoSansCJKkr',
        fontSize: '17px',
        fontWeight: 'bold',
        marginBottom: 40,
        lineHeight: '1.2',
    },
    namebox: {
        width: '100%',
        marginBottom: 10,
        //2020.10.28 텍스트필드 BorderColor 변경 [이지현]
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#38a67e"
        },
    },
    idtext: {
        fontFamily: 'NotoSansCJKkr',
        fontSize: '14px',
        color: '#c9c9c9',
        marginBottom: 5,
    },
    btnjoinstyle: {
        fontFamily: 'NotoSansCJKkr',
        fontSize: '17px',
        width: '100%',
        boxShadow: 'none',
        marginTop: 7,
        background: '#38a67e',
        color: '#fff',
        borderRadius: 0,
        padding: '10px 0',

        "&:hover": {
            background: '#38a67e',
            color: '#fff',
            borderRadius: 0,
            boxShadow: 'none',
        },
    },
});

@inject('sSignUpStore')
@observer
class JoinIdSearch extends React.Component {

    handleKeyUpInfo = (event) => {
        if( this.props.sSignUpStore.isValidUserName && this.props.sSignUpStore.isValidNickName && event.keyCode===13){
            this.props.handleUserInfoOK();
        }
    }


    render() {
        const {classes, handleUserInfoOK} = this.props;
        const {
            isPending,
            newMember,
            changeNewMemberUserName,
            changeNewMemberNickName,
            isValidUserName,
            isValidNickName,
        } = this.props.sSignUpStore;

        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.txtstyle1}>이름 및 닉네임을 입력해 주세요.</Typography>

                        <form noValidate autoComplete="off">
                            <TextField
                                id="name"
                                placeholder="이름"
                                variant="outlined"
                                className={classes.namebox}
                                value={newMember.name}
                                onChange={changeNewMemberUserName}
                            />
                            {isValidUserName ?
                                <Paper elevation={0} style={{display: 'flex'}}>
                                    <Typography className={classes.idtext} style={{color: '#38a67e'}}>최소 2글자 이상 입력 </Typography>
                                    <CheckRoundedIcon style={{color: '#38a67e', marginTop: -5}}/>
                                </Paper>:
                                <Paper elevation={0} style={{display: 'flex'}}>
                                    <Typography className={classes.idtext} style={{color: '#c9c9c9'}}>최소 2글자 이상 입력 </Typography>
                                    <CheckRoundedIcon style={{color: '#c9c9c9', marginTop: -5}}/>
                                </Paper>
                            }
                            <TextField
                                id="nickname"
                                placeholder="닉네임"
                                variant="outlined"
                                className={classes.namebox}
                                value={newMember.nickName}
                                onChange={changeNewMemberNickName}
                                onKeyUp={this.handleKeyUpInfo}
                            />
                            {isValidNickName ?
                                <Paper elevation={0} style={{display: 'flex'}}>
                                    <Typography className={classes.idtext} style={{color: '#38a67e'}}>최소 2글자 이상 입력 </Typography>
                                    <CheckRoundedIcon style={{color: '#38a67e', marginTop: -5}}/>
                                </Paper>:
                                <Paper elevation={0} style={{display: 'flex'}}>
                                    <Typography className={classes.idtext} style={{color: '#c9c9c9'}}>최소 2글자 이상 입력 </Typography>
                                    <CheckRoundedIcon style={{color: '#c9c9c9', marginTop: -5}}/>
                                </Paper>
                            }
                        </form>
                        <Paper elevation={0}>
                            <Button variant="contained" className={classes.btnjoinstyle}
                                    disabled={(isValidUserName !== true || isValidNickName !== true || isPending === true)}
                                    onClick={handleUserInfoOK}>다음</Button>
                        </Paper>
                    </Paper>
                </Paper>
            </div>
        )
    }
};
export default withSnackbar(withRouter(withStyles(style)(JoinIdSearch)));