
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {inject, observer} from "mobx-react";





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
        borderBottom: 'solid 4px #38a67e',
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
    pwtext:{
        fontFamily:'NotoSansCJKkr',
        fontSize:'15px',
        fontWeight:'700',
    },
    yeartext: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'12px',
        fontWeight:'600',
        color:'#38a67e',
        paddingTop:3,
    },
    btnjoinstyle: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        fontWeight:'500',
        width:'100%',
        boxShadow:'none',
        marginTop:27,
        background:'#38a67e',
        color:'#fff',
        borderRadius:0,
        padding:'10px 0',

        "&:hover": {
            background:'#38a67e',
            color:'#fff',
            borderRadius:0, 
            boxShadow:'none',
        },
    },
});


@inject('sSignUpStore')
@observer
class PwCompleteSearch extends Component{
    componentWillUnmount() {
        this.props.sSignUpStore.initialize();
    }

    handleClickHome = () => {
        this.props.history.push("/searching");
    }


    render() {
        const { classes } = this.props;
        const { member } = this.props.sSignUpStore;
        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.titletext}>비밀번호 찾기</Typography>
                        {member.password ==undefined || member.password == ""  ? (
                                <Typography className={classes.txtstyle1}>정보를 다시 확인해주세요.</Typography>
                            ):(
                            <Typography className={classes.txtstyle1}>회원님의 비밀번호 찾기가 완료되었습니다.</Typography>

                        )}
                        {member.password ==undefined || member.password == ""  ? (
                            <Paper elevation={0} className={classes.completebox}>
                                <Typography className={classes.pwtext}>찾으시는 정보의 비밀번호가 없습니다.</Typography>
                            </Paper>
                        ):(
                            <Paper elevation={0} className={classes.completebox}>
                                <Typography className={classes.pwtext}>{member.password}</Typography>
                                <Typography className={classes.yeartext}>({member.createdDatetime})</Typography>
                            </Paper>
                            )}

                        <Paper elevation={0}>
                            {member.password ==undefined || member.password == ""  ? (
                                <Button variant="contained"
                                    className={classes.btnjoinstyle}
                                    onClick={this.handleClickHome}>돌아가기</Button>
                                ):(
                                <Button variant="contained"
                                        className={classes.btnjoinstyle}
                                        onClick={this.handleClickHome}>로그인</Button>
                            )}
                        </Paper>
                    </Paper>
                </Paper> 
            </div>
        )
    }
}
export default withStyles(style)(PwCompleteSearch);