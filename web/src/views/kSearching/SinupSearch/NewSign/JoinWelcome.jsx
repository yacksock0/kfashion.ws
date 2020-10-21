
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
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
        borderBottom: 'solid 4px #38a67e',
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
        color:'#38a67e',
    },
    btnjoinstyle: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        width:'390px',
        boxShadow:'none',
        background:'#38a67e',
        color:'#fff',
        borderRadius:0,
        padding:'10px 0',
        fontWeight:'500',

        "&:hover": {
            background:'#38a67e',
            color:'#fff',
            borderRadius:0, 
            boxShadow:'none',
        },
    },
}));


export default function Join(){
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <Paper elevation={0}>
                    <Typography className={classes.titletext}>환영합니다!</Typography>
                    <Typography className={classes.txtstyle1}>
                        <span className={classes.pointcolor}>홍길동</span>님, 회원가입을 축하합니다.<br />가입하신 아이디는 <span className={classes.pointcolor}>admin1234</span> 입니다.
                    </Typography>

                    <Typography className={classes.txtstyle2}>
                       다양한 패션 아이템정보와 서비스를<br />제공받으실 수 있습니다.
                    </Typography>
                    <Button variant="contained" className={classes.btnjoinstyle}>시작하기</Button>
                    
                    
                    
                </Paper>
            </Paper> 
        </div>
    )
  
}

