
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import QuestionsTag from './QuestionsTag';
import {inject, observer} from "mobx-react";


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
class JoinQuestionsTag extends Component{
    handleClickOK = () => {
        this.props.tSignUpStore.doSignUp(this.props.history);
    }
    render() {
        const { classes } = this.props;
        const {agreeOK, idOK, pwOK} = this.props.tSignUpStore;
        if(!agreeOK || !idOK || !pwOK) this.props.history.push('/tagging/agree');


        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.titletext}>보안 질문 설정</Typography>
                        <Typography className={classes.txtstyle1}>보안 질문은 아이디 또는 비밀번호를 잊어버린 경우<br />신원을 확인하고 암호를 복구하는데 사용합니다.</Typography>
                        <QuestionsTag handleClickOK={this.handleClickOK} />
                    </Paper>
                </Paper> 
            </div>
        )
    }
}
export default withStyles(style)(JoinQuestionsTag);










