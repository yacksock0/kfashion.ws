import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {Typography,Paper, Snackbar, IconButton} from "@material-ui/core";
import JoinIdTag from "./NewSign/JoinIdTag";
import JoinPwTag from "./NewSign/JoinPwTag";
import JoinUserInfoTag from "./NewSign/JoinUserInfoTag";
import AgreeList from "./AgreeList";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";


const style = theme => ({
    root: {
        textAlign:'center',
        "& .MuiSnackbarContent-root": {
            backgroundColor: '#526af2',
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
        borderBottom: 'solid 4px #526af2',
        paddingBottom: 20,
        margin:'0 auto 25px',
    },
});

@inject('tSignUpStore')
@observer
class JoinAgreeTag extends React.Component {
    componentWillUnmount() {
        const {agreeOK, idOK, pwOK, userInfoOK} = this.props.tSignUpStore;
        if(agreeOK !== true || idOK !== true || pwOK !== true || userInfoOK !== true) {
            this.props.tSignUpStore.initialize()
            console.log("initialize")
        }
    }
    handleUserInfoOK = () =>{
        this.props.tSignUpStore.handleUserInfoCK(this.props.history);
    }
    handleClose = () => {
        this.props.tSignUpStore.handleSnackIdClose();
    }

    render() {
        const { classes } = this.props;
        const {agreeOK, idOK, pwOK, userInfoOK, idSnack, handleIdOK, handlePwOK} = this.props.tSignUpStore;
        const snackMessage = <div><ErrorIcon style={{fontSize: 30, marginTop: '5px'}}/><span
            style={{fontSize: '17px', position: 'absolute', left: '60px', top: '22px'}}>중복된 아이디입니다.</span></div>
        const snackMessage2 = <div><ErrorIcon style={{fontSize: 30, marginTop: '5px'}}/><span
            style={{fontSize: '17px', position: 'absolute', left: '60px', top: '22px'}}>중복된 닉네임입니다.</span></div>
        let component;
        if(agreeOK === false) component = <AgreeList/>;
        else if(agreeOK === true && idOK === false) component = <JoinIdTag handleIdOK={handleIdOK}/>;
        else if(idOK === true && pwOK === false)  component = <JoinPwTag handlePwOK={handlePwOK}/>;
        else if(pwOK === true && userInfoOK === false)  component = <JoinUserInfoTag  handleUserInfoOK={this.handleUserInfoOK}/>;

        return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <Paper elevation={0}>
                    <Typography className={classes.titletext}>가입하기</Typography>
                    {component}
                    {/*<JoinIdTag/>*/}
                    {/*<JoinPwTag/>*/}
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
export default withSnackbar(withRouter(withStyles(style) (JoinAgreeTag)));

