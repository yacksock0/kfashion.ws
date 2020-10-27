
import React from 'react'
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ReactComponent as Check } from '../../../../images/Check.svg';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {inject, observer} from "mobx-react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";

const style = (theme) => ({
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
    idtext: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'14px',
        color:'#c9c9c9',
        marginBottom:5,
    },
    btnjoinstyle: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        width:'100%',
        boxShadow:'none',
        marginTop:7,
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
});

@inject('tSignUpStore')
@observer
class JoinIdTag extends React.Component {

    handleChangeId = (event) => {
        this.props.tSignUpStore.changeNewMemberId(event.target.value);
    }
    render() {
        const {classes, handleIdOK} = this.props;
        const {
            isValidId, isPending, newMember,
        } = this.props.tSignUpStore;

        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.txtstyle1}>아이디를 입력해주세요</Typography>

                        <form noValidate autoComplete="off">
                            <TextField
                                id="id"
                                placeholder="아이디"
                                variant="outlined"
                                className={classes.namebox}
                                value={newMember.id}
                                onChange={this.handleChangeId}
                            />
                            <Paper elevation={0} style={{display:'flex'}}>
                                <Typography className={classes.idtext}>영문,숫자포함/8~20자 이내 <Check style={{paddingLeft:10}}/></Typography>
                            </Paper>

                            {/* 아이디중복체크후 가능하면
                        <Paper elevation={0} style={{display:'flex'}}>
                            <Typography className={classes.idtext}>사용가능한 아이디입니다 <Check style={{paddingLeft:10}}/></Typography>
                        </Paper> */}
                            {/* 아이디중복체크후 불가능하면
                        <Paper elevation={0} style={{display:'flex'}}>
                            <Typography className={classes.idtext} style={{color:'red'}}>이미 가입된 아이디입니다.</Typography>
                        </Paper> */}
                        </form>
                        <Paper elevation={0}>
                            <Button variant="contained" className={classes.btnjoinstyle}
                                    disabled={(!isValidId) || (isPending)}
                                    onClick={handleIdOK}>다음</Button>
                        </Paper>
                    </Paper>
                </Paper>
            </div>
        )
    }
};
export default withSnackbar(withRouter(withStyles(style) (JoinIdTag)));



