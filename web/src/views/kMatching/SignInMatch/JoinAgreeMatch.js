import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {Typography, Paper , Snackbar, IconButton} from "@material-ui/core";
import JoinIdMatch from "./NewSign/JoinIdMatch";
import JoinPwMatch from "./NewSign/JoinPwMatch";
import JoinUserInfoMatch from "./NewSign/JoinUserInfoMatch";
import AgreeListMatch from "./AgreeListMatch";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";

const style = theme => ({
    root: {
        textAlign:'center',
        "& .MuiSnackbarContent-root": {
            backgroundColor: '#d94848',
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
    componentWillUnmount() {
        const {agreeOK, idOK, pwOK, userInfoOK} = this.props.mSignUpStore;
        if(agreeOK !== true || idOK !== true || pwOK !== true || userInfoOK !== true) {
            this.props.mSignUpStore.initialize()
            console.log("initialize")
        }
    }
    handleUserInfoOK = () => {
        this.props.mSignUpStore.handleUserInfoCK(this.props.history);
    }
    handleClose = () => {
        this.props.mSignUpStore.handleSnackIdClose();
    }


    render() {
        const { classes } = this.props;
        const {agreeOK, idOK, pwOK, idSnack, userInfoOK, handleIdOK, handlePwOK} = this.props.mSignUpStore;
        const snackMessage = <div><ErrorIcon style={{fontSize: 30, marginTop: '5px'}}/><span
            style={{fontSize: '17px', position: 'absolute', left: '60px', top: '22px'}}>중복된 아이디입니다.</span></div>
        const snackMessage2 = <div><ErrorIcon style={{fontSize: 30, marginTop: '5px'}}/><span
            style={{fontSize: '17px', position: 'absolute', left: '60px', top: '22px'}}>중복된 닉네임입니다.</span></div>
        let component;
        if(agreeOK === false) component = <AgreeListMatch/>;
        else if(agreeOK === true && idOK === false) component = <JoinIdMatch handleIdOK={handleIdOK}/>;
        else if(idOK === true && pwOK === false)  component = <JoinPwMatch handlePwOK={handlePwOK}/>;
        else if(pwOK === true && userInfoOK === false)  component = <JoinUserInfoMatch  handleUserInfoOK={this.handleUserInfoOK}/>;

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
                                  message={idOK ? snackMessage2 : snackMessage}
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
export default withSnackbar(withRouter(withStyles(style) (JoinAgreeMatch)));

