import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";

import {
    Typography,
    Paper
} from "@material-ui/core";
import AgreeList from "./AgreeListMatch";

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
class JoinAgreeTag extends React.Component {

    handleClickToSignUp = () => {
        this.props.history.push("/matching/SignUp");
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.titletext}>가입하기</Typography>

                        {/* <JoinId /> */}
                        {/* <JoinPw /> */}
                        <AgreeList handleClickToSignUp={this.handleClickToSignUp}/>

                    </Paper>
                </Paper>
            </div>

        );
    }
};
export default withSnackbar(withRouter(withStyles(style) (JoinAgreeTag)));
