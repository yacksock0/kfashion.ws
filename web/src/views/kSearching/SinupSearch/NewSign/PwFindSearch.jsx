
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import QuestionsSearch from './QuestionsSearch';
import {inject, observer} from "mobx-react";
import JoinIdSearch from "./JoinIdSearch";




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
        borderBottom: 'solid 4px #38a67e',
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

@inject('sSignUpStore')
@observer
class PwFindSearch extends Component{
    handleClickOK = () => {
        this.props.sSignUpStore.doFindUser(this.props.history, "PW");
    }
    render() {
        const { classes } = this.props;
        const {idOK, handleIdOK2} = this.props.sSignUpStore;
        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.titletext}>비밀번호 찾기</Typography>
                        {idOK === false &&  <JoinIdSearch handleIdOK={handleIdOK2}/>}
                        {idOK === true &&
                        <Typography className={classes.txtstyle1}>회원가입 시 설정한 보안 질문을<br/> 선택하여 답변해주세요.</Typography> &&
                        <QuestionsSearch handleClickOK={this.handleClickOK}/>
                        }
                    </Paper>
                </Paper> 
            </div>
        )
    }
}
export default withStyles(style)(PwFindSearch);













