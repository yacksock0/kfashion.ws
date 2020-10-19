
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AgreeList from './AgreeList';
import JoinId from './JoinId';
import JoinPw from './JoinPw';

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
}));


export default function Join(){
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <Paper elevation={0}>
                    <Typography className={classes.titletext}>가입하기</Typography>
                    
                    {/* <JoinId /> */}
                    {/* <JoinPw /> */}
                    <AgreeList />
                    
                </Paper>
            </Paper> 
        </div>
    )
  
}








