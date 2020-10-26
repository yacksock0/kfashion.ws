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
        paddingBottom: 15,
        margin:'0 auto 25px',
    },
});

@inject('sSignUpStore')
@observer
class JoinAgreeTag extends React.Component {

    handleClickToSignUp = () => {
        this.props.history.push("/searching/SignUp");
    }

    render() {
        const { classes } = this.props;
        const {isAllSelected} = this.props.sSignUpStore;

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

