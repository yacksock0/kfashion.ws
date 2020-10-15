
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AgreeList from './AgreeList';

const useStyles = makeStyles((theme) => ({
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
        borderBottom: 'solid 4px #526af2',
        paddingBottom: 20,
        margin:'0 auto 25px',
    },
    txtstyle1: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        fontWeight:'bold',
        textAlign:'left',
        paddingLeft:20,
        marginBottom:20,
    },
    btnjoinstyle: {
        width:'390px',
        boxShadow:'none',
        marginTop:44,
        background:'#526af2',
        color:'#fff',
        borderRadius:0,
        padding:'10px 0',

        "&:hover": {
            background:'#526af2',
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
                    <Typography className={classes.titletext}>가입하기</Typography>
                    <Typography className={classes.txtstyle1}>스타일 태깅 서비스 이용약관을 동의해주세요.</Typography>
                    <AgreeList />
                    <Paper elevation={0}>
                        <Button variant="contained" className={classes.btnjoinstyle} disabled >동의하고 가입하기</Button>
                    </Paper> 
                </Paper>
            </Paper> 
        </div>
    )
  
}








