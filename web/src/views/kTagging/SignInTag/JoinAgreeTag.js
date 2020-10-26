import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";

import {
    Typography,
    Paper
} from "@material-ui/core";
import AgreeList from "./AgreeList";
import JoinIdTag from "./NewSign/JoinIdTag";
import JoinPwTag from "./NewSign/JoinPwTag";
import JoinQuestionsTag from "./NewSign/JoinQuestionsTag";
import JoinWelcomeTag from "./NewSign/JoinWelcomeTag";
import JoinUserInfoTag from "./NewSign/JoinUserInfoTag";

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
        fontFamily:'Montserrat',
        fontSize:'45px',
        fontWeight:'bold',
        borderBottom: 'solid 4px #526af2',
        paddingBottom: 20,
        margin:'0 auto 25px',
    },
});

@inject('tSignUpStore')
@observer
class JoinAgreeTag extends React.Component {
    constructor(props) {
        super(props);

    }
    handleUserInfoOK = () =>{
        this.props.tSignUpStore.handleUserInfoOK();
        this.props.history.push("/tagging/question");
    }
    render() {
        const { classes } = this.props;
        const {agreeOK, idOK, pwOK, userInfoOK,
            handleAgreeOK, handleIdOK, handlePwOK} = this.props.tSignUpStore;
        let component;
        if(agreeOK === false) component = <AgreeList/>;
        else if(agreeOK === true && idOK === false) component = <JoinIdTag handleIdOK={handleIdOK}/>;
        else if(idOK === true && pwOK === false)  component = <JoinPwTag />;
        else if(pwOK === true && userInfoOK === false)  component = <JoinUserInfoTag  handleUserInfoOK={this.handleUserInfoOK}/>;


        return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <Paper elevation={0}>
                    <Typography className={classes.titletext}>가입하기</Typography>
                    {component}
                    {/*<AgreeList handleClickToSignUp={this.handleClickToSignUp}/>*/}
                    {/*<JoinIdTag/>*/}
                    {/*<JoinPwTag/>*/}
                </Paper>
            </Paper>
        </div>
        );
    }
};
export default withSnackbar(withRouter(withStyles(style) (JoinAgreeTag)));

