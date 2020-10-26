import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import { ReactComponent as Check } from './images/Check.svg';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';


const useStyles = makeStyles((theme) => ({
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
}));


export default function PwFind(){
    const classes = useStyles();
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
                            />
                            <Paper elevation={0} style={{display:'flex'}}>
                                <Typography className={classes.idtext}>영문,숫자포함/8~20자 이내 </Typography>
                                <CheckRoundedIcon style={{color:'#c9c9c9',marginTop:-5}}/>
                            </Paper>
                            <TextField
                            id="password"
                            placeholder="비밀번호 확인"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            className={classes.namebox}
                            />
                            <Paper elevation={0} style={{display:'flex'}}>
                                <Typography className={classes.idtext} style={{color:'#526af2'}}>비밀번호 일치 </Typography>
                                <CheckRoundedIcon style={{color:'#526af2',marginTop:-5}}/>
                            </Paper>
                        </form>
                    <Paper elevation={0}>
                        <Button variant="contained" className={classes.btnjoinstyle} disabled>다음</Button>
                    </Paper> 
                </Paper>
            </Paper> 
        </div>
    )
}








