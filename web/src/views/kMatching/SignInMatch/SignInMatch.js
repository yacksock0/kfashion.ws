import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {Button, CircularProgress, TextField, Typography, Paper} from "@material-ui/core";

import * as tStore from "../../../stores/kMatching/MAuthStore";

const style = theme => ({
    root: {
        textAlign:'center',

    },
    paper: {
        width:'400px',
        margin:'0 auto',
    },
    titletext: {
        width:'390px',
        fontFamily:'Montserrat',
        fontSize:'45px',
        fontWeight:'bold',
        borderBottom: 'solid 4px #d94848',
        paddingBottom: 20,
        margin:'0 auto 66px',
    },
    txtfieldstyle:{
        width:'390px',
        height:'39px',
        marginBottom:30,
        "& .MuiOutlinedInput-root": {
            borderRadius:0,
        },
        //2020.10.28 텍스트필드 BorderColor 변경 [이지현]
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d94848"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
            color: "#d94848"
        }
    },
    btnloginstyle: {
        width:'390px',
        height:'50px',
        background:'#000',
        color:'#fff',
        fontFamily:'NotoSansCJKkr',
        fontWeight:'bold',
        fontSize:'17px',
        borderRadius:0,

        "&:hover": {
            background:'#000',
        },
    },
    btnjoinstyle:{
        width:'390px',
        height:'50px',
        fontFamily:'NotoSansCJKkr',
        fontWeight:'bold',
        fontSize:'17px',
        borderRadius:50,
        borderColor:'#707070',
        marginBottom:50,
    },
    findbox:{
        display:'flex',
        justifyContent:'flex-end',
        margin:'9px 0 45px',
    },
    findbtn: {
        fontFamily:'NotoSansCJKkr',
        "&:hover": {
            background:'transparent',
            color:'#d94848',
            fontWeight:'bold'
        },
    },
    spanfind:{
        marginTop:5,
    },
});

@inject('mAuthStore')
@observer
class SignInSearch extends React.Component {
    componentDidMount() {
        setTimeout(() => document.body.style.zoom = "100%", 100);
    }
    componentWillUnmount() {
        this.props.mAuthStore.initialize();
    }
    handleChangeId = (e) => {
        this.props.mAuthStore.changeLoginId(e.target.value);
    }

    handleChangePassword = (e) => {
        this.props.mAuthStore.changeLoginPassword(e.target.value);
    }

    handleKeyUpPassword = (e) => {
        if(e.keyCode === 13) {
            this.props.mAuthStore.doLogin(this.props.history);
        }
    }

    handleSubmitForm = (e) => {
        this.props.mAuthStore.doLogin(this.props.history);
    }

    JoinMatch = () => {
        this.props.history.push('/matching/agree');
    }

    handleFindId = () =>{
        this.props.history.push('/matching/findId');
    }
    handleFindPw = () =>{
        this.props.history.push('/matching/findPw');
    }


    render() {
        const { classes } = this.props;
        const { loginState, login } = this.props.mAuthStore;

        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.titletext}>LOGIN</Typography>
                        <form noValidate autoComplete="off">
                            <Paper elevation={0}>
                                <TextField id="outlined-basic"
                                           name="id"
                                           label="아이디"
                                           variant="outlined"
                                           margin="normal"
                                           value={login.id}
                                           onChange={this.handleChangeId}
                                           className={classes.txtfieldstyle}
                                />
                            </Paper>
                            <Paper elevation={0}>
                                <TextField id="outlined-password-input"
                                           name="password"
                                           label="비밀번호"
                                           type="password"
                                           variant="outlined"
                                           autoComplete="current-password"
                                           value={login.password}
                                           onChange={this.handleChangePassword}
                                           onKeyUp={this.handleKeyUpPassword}
                                           className={classes.txtfieldstyle}/>
                            </Paper>
                        </form>
                        <Paper elevation={0}>
                            <Button type="submit"
                                    className={classes.btnloginstyle}
                                    variant="contained"
                                    disabled={loginState === tStore.State.Pending}
                                    onClick={this.handleSubmitForm}
                            >
                                {loginState === tStore.State.Pending ? <CircularProgress size={22}/> : '로그인'}
                            </Button>
                        </Paper>
                        <Paper elevation={0} className={classes.findbox}>
                            <Button className={classes.findbtn}
                                    onClick={this.handleFindId}>
                                아이디찾기
                            </Button>
                            <Typography className={classes.spanfind}>|</Typography>
                            <Button className={classes.findbtn}
                                    onClick={this.handleFindPw}>
                                비밀번호찾기
                            </Button>
                        </Paper>
                        <Paper elevation={0}>
                            <Button type="submit"
                                    className={classes.btnjoinstyle}
                                    variant="outlined"
                                    disabled={loginState === tStore.State.Pending}
                                    onClick={this.JoinMatch}
                            >
                                간편 회원가입
                            </Button>
                        </Paper>
                    </Paper>
                </Paper>
            </div>
        );
    }
};

export default withSnackbar(withRouter(withStyles(style) (SignInSearch)));