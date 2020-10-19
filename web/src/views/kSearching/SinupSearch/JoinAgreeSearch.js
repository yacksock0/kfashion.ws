import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";

import {
    Button,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import Paper from "@material-ui/core/Paper";
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
        fontFamily:'Montserrat',
        fontSize:'45px',
        fontWeight:'bold',
        borderBottom: 'solid 4px #526af2',
        paddingBottom: 20,
        margin:'0 auto 25px',
    },
    txtstyle1: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        fontWeight:'bold',
        textAlign:'left',
        paddingLeft:20,
        marginBottom:20,
    },
    btnjoinstyle: {
        width:'390px',
        boxShadow:'none',
        marginTop:44,
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

