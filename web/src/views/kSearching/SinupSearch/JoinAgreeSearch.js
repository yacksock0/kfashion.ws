import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import { Typography, Paper, Snackbar, IconButton } from "@material-ui/core";
import JoinIdSearch from "./NewSign/JoinIdSearch";
import JoinPwSearch from "./NewSign/JoinPwSearch";
import JoinUserInfoSearch from "./NewSign/JoinUserInfoSearch";
import AgreeListSearch from "./AgreeListSearch";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";


const style = theme => ({
    root: {
        textAlign:'center',
        "& .MuiSnackbarContent-root": {
            backgroundColor: '#38a67e',
            fontFamily: 'NotoSansCJKkr',
            paddingLeft: '20px',
            fontWeight: "bold",
            minWidth: "300px",
        },
    },
    close: {
        color: '#fff',
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
    handleClose = () => {
        this.props.sSignUpStore.handleSnackIdClose();
    }
    render() {
        const { classes } = this.props;
        const {agreeOK, idOK, pwOK, userInfoOK, idSnack, handleIdOK, handlePwOK} = this.props.sSignUpStore;
        const snackMessage = <div><ErrorIcon style={{fontSize: 30, marginTop: '5px'}}/><span
            style={{fontSize: '17px', position: 'absolute', left: '60px', top: '22px'}}>중복된 아이디입니다.</span></div>
        let component;
        if(agreeOK === false) component = <AgreeListSearch/>;
        else if(agreeOK === true && idOK === false) component = <JoinIdSearch handleIdOK={handleIdOK}/>;
        else if(idOK === true && pwOK === false)  component = <JoinPwSearch handlePwOK={handlePwOK}/>;
        else if(pwOK === true && userInfoOK === false)  component = <JoinUserInfoSearch  handleUserInfoOK={this.handleUserInfoOK}/>;

        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.titletext}>가입하기</Typography>
                        {component}
                        {/* <JoinId /> */}
                        {/* <JoinPw /> */}
                        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                                  open={idSnack}
                                  autoHideDuration={3000}
                                  onClose={this.handleClose}
                                  message={snackMessage}
                                  severity={'info'}
                                  action={[
                                      <IconButton key="close" aria-label="Close" className={classes.close}
                                                  onClick={this.handleClose}>
                                          <CloseIcon/>
                                      </IconButton>,
                                  ]}
                        />
                    </Paper>
                </Paper>
            </div>

        );
    }
};
export default withSnackbar(withRouter(withStyles(style) (JoinAgreeSearch)));

