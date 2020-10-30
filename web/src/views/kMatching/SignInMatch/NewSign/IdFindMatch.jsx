import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import QuestionsMatch from './QuestionsMatch';
import JoinUserInfoMatch from "./JoinUserInfoMatch";
import {inject, observer} from 'mobx-react';
import JoinUserInfoSearch from "../../../kSearching/SinupSearch/NewSign/JoinUserInfoSearch";
import QuestionsSearch from "../../../kSearching/SinupSearch/NewSign/QuestionsSearch";


const style = theme => ({
    root: {
        textAlign: 'center',

        "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            marginTop: theme.spacing(1),
        },
        "& .MuiOutlinedInput-input": {
            padding: 10,
        },

    },
    paper: {
        width: '400px',
        margin: '0 auto',
    },
    titletext: {
        fontFamily: 'NotoSansCJKkr',
        fontSize: '40px',
        fontWeight: 'bold',
        borderBottom: 'solid 4px #d94848',
        paddingBottom: 10,
        margin: '0 auto 15px',
    },
    txtstyle1: {
        fontFamily: 'NotoSansCJKkr',
        fontSize: '17px',
        fontWeight: 'bold',
        margin: '45px 0 40px 0',
        lineHeight: '1.2',
    },
});

@inject('mSignUpStore')
@observer
class IdFindMatch extends Component {
    handleClickOK = () => {
        this.props.mSignUpStore.doFindUser(this.props.history, "ID");
    }

    render() {
        const {classes} = this.props;
        const {userInfoOK, handleUserInfoOK} = this.props.mSignUpStore;
        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.titletext}>아이디 찾기</Typography>

                        {userInfoOK === false &&  <JoinUserInfoMatch handleUserInfoOK={handleUserInfoOK}/> }
                        {userInfoOK === true &&
                        <Typography className={classes.txtstyle1}>회원가입 시 설정한 보안 질문을<br/> 선택하여 답변해주세요.</Typography> &&
                        <QuestionsMatch handleClickOK={this.handleClickOK} />
                        }
                    </Paper>
                </Paper>
            </div>
        )
    }
}

export default withStyles(style)(IdFindMatch);











