
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';




const style = theme => ({
    root: {
        textAlign:'center',
        
        "& .MuiOutlinedInput-root":{
            borderRadius:0,
            marginTop: theme.spacing(1),
        },
        "& .MuiOutlinedInput-input":{
            padding:10,
        }, 
        
    },
    paper: {
        width:'400px',
        margin:'0 auto',
    },
    titletext: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'40px',
        fontWeight:'bold',
        borderBottom: 'solid 4px #d94848',
        paddingBottom: 10,
        margin:'0 auto 15px',
    },
    txtstyle1: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        fontWeight:'bold',
        margin:'24px 0 20px 0',
        lineHeight: '1.2',
    },
    completebox: {
        width:'100%',
        height:'78px',
        background:'#f2f2f2',
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'center',
        paddingTop:25,
        boxSizing:'border-box',
        
    },
    idtext:{
        fontFamily:'NotoSansCJKkr',
        fontSize:'15px',
        fontWeight:'700',
    },
    yeartext: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'12px',
        fontWeight:'600',
        color:'#d94848',
        paddingTop:3,
    },
    btnjoinstyle: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        fontWeight:'500',
        width:'100%',
        boxShadow:'none',
        marginTop:27,
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


class IdComplete extends Component{

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.titletext}>아이디 찾기</Typography>
                        <Typography className={classes.txtstyle1}>회원님의 아이디 찾기가 완료되었습니다.</Typography>
                        
                        <Paper elevation={0} className={classes.completebox}>
                            <Typography className={classes.idtext}>admin1234</Typography>
                            <Typography className={classes.yeartext}>(2020년 10월 2일)</Typography>
                        </Paper>
                        
                        <Paper elevation={0}>
                            <Button variant="contained" className={classes.btnjoinstyle}>로그인</Button>
                        </Paper> 
                    </Paper>
                </Paper> 
            </div>
        )
    }
}
export default withStyles(style)(IdComplete);