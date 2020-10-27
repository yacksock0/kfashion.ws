import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";

import {
    Typography,
    Paper
} from "@material-ui/core";
import AgreeList from "./AgreeListSearch";
import JoinIdSearch from "./NewSign/JoinIdSearch";
import JoinPwSearch from "./NewSign/JoinPwSearch";
import JoinQuestionsSearch from "./NewSign/JoinQuestionsSearch";
import JoinWelcomeSearch from "./NewSign/JoinWelcomeSearch";
import JoinUserInfoSearch from "./NewSign/JoinUserInfoSearch";
import AgreeListSearch from "./AgreeListSearch";


const style = theme => ({
    root: {
        textAlign:'center',
    },
    paper: {
        width:'400px',
        margin:'0 auto',
    },
    titletext: {
        width:'390px',
        fontFamily:'NotoSansCJKkr',
        fontSize:'45px',
        fontWeight:'bold',
        borderBottom: 'solid 4px #38a67e',
        paddingBottom: 20,
        margin:'0 auto 25px',
    },
});

@inject('sSignUpStore')
@observer
class JoinAgreeSearch extends React.Component {
    constructor(props) {
        super(props);

    }
    handleUserInfoOK = () => {
        this.props.sSignUpStore.handleUserInfoOK();
        this.props.history.push("/searching/question");
    }
    render() {
        const { classes } = this.props;
        const {agreeOK, idOK, pwOK, userInfoOK,
            handleAgreeOK, handleIdOK, handlePwOK} = this.props.sSignUpStore;
        let component;
        if(agreeOK === false) component = <AgreeListSearch/>;
        else if(agreeOK === true && idOK === false) component = <JoinIdSearch handleIdOK={handleIdOK}/>;
        else if(idOK === true && pwOK === false)  component = <JoinPwSearch />;
        else if(pwOK === true && userInfoOK === false)  component = <JoinUserInfoSearch  handleUserInfoOK={this.handleUserInfoOK}/>;

        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.titletext}>가입하기</Typography>
                        {component}
                        {/* <JoinId /> */}
                        {/* <JoinPw /> */}

                    </Paper>
                </Paper>
            </div>

        );
    }
};
export default withSnackbar(withRouter(withStyles(style) (JoinAgreeSearch)));

