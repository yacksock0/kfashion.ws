import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {Typography, Paper} from "@material-ui/core";
import JoinIdMatch from "./NewSign/JoinIdMatch";
import JoinPwMatch from "./NewSign/JoinPwMatch";
import JoinUserInfoMatch from "./NewSign/JoinUserInfoMatch";
import AgreeListMatch from "./AgreeListMatch";

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
        borderBottom: 'solid 4px #f2ada7',
        paddingBottom: 20,
        margin:'0 auto 25px',
    },
});

@inject('mSignUpStore')
@observer
class JoinAgreeMatch extends React.Component {
    constructor(props) {
        super(props);

    }

    handleUserInfoOK = () => {
        this.props.mSignUpStore.handleUserInfoOK();
        this.props.history.push("/matching/question");
    }
    render() {
        const { classes } = this.props;
        const {agreeOK, idOK, pwOK, userInfoOK, handleIdOK} = this.props.mSignUpStore;
        let component;
        if(agreeOK === false) component = <AgreeListMatch/>;
        else if(agreeOK === true && idOK === false) component = <JoinIdMatch handleIdOK={handleIdOK}/>;
        else if(idOK === true && pwOK === false)  component = <JoinPwMatch />;
        else if(pwOK === true && userInfoOK === false)  component = <JoinUserInfoMatch  handleUserInfoOK={this.handleUserInfoOK}/>;

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
export default withSnackbar(withRouter(withStyles(style) (JoinAgreeMatch)));

