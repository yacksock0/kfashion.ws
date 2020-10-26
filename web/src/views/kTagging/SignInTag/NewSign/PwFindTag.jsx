
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import QuestionsTag from './QuestionsTag';
import JoinUserInfoTag from "./JoinUserInfoTag";
import {inject, observer} from "mobx-react";
import JoinIdTag from "./JoinIdTag";


const style = theme => ({
    root: {
        textAlign:'center',     
    },
    paper: {
        width:'400px',
        margin:'0 auto',
    },
    titletext: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'40px',
        fontWeight:'bold',
        borderBottom: 'solid 4px #526af2',
        paddingBottom: 10,
        margin:'0 auto 15px',
    },
    txtstyle1: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        fontWeight:'bold',
        margin:'45px 0 40px 0',
        lineHeight: '1.2',
    },

});

@inject('tSignUpStore')
@observer
class PwFindTag extends Component{
    handleClickOK = () => {
        this.props.tSignUpStore.doFindUser(this.props.history, "PW");
    }
    render() {
        const { classes } = this.props;
        const {idOK, handleIdOK2} = this.props.tSignUpStore;
        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.titletext}>비밀번호 찾기</Typography>
                        {idOK === false &&  <JoinIdTag handleIdOK={handleIdOK2}/>}
                        {idOK === true &&
                        <Typography className={classes.txtstyle1}>회원가입 시 설정한 보안 질문을<br/> 선택하여 답변해주세요.</Typography> &&
                        <QuestionsTag handleClickOK={this.handleClickOK}/>
                        }

                    </Paper>
                </Paper> 
            </div>
        )
    }
}
export default withStyles(style)(PwFindTag);













