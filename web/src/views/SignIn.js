import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";

import {Avatar, Button, CircularProgress, Container, TextField, Typography} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import * as store from "../stores/AuthStore";


const style = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    container : {
        margin:'auto',
        marginTop: '150px',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    lockOpenAvatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    lockOutAvatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#000000',
        fontSize : '20px',
    },
});

@inject('authStore')
@observer
class SignIn extends React.Component {

    
    handleChangeId = (e) => {
        this.props.authStore.changeLoginId(e.target.value);
    }

    handleChangePassword = (e) => {
        this.props.authStore.changeLoginPassword(e.target.value);
    }

    handleKeyUpPassword = (e) => {
        if(e.keyCode === 13) {
            this.props.authStore.doLogin();
        }
    }

    handleSubmitForm = (e) => {
        this.props.authStore.doLogin();
        this.props.history.push("/home");
    }

    render() {
        const { classes } = this.props;
        const { loginState, login } = this.props.authStore;

        return (
            <Container component="main" maxWidth="xs" className={classes.container}>
                <div className={classes.appBarSpacer} />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h4">
                            {loginState === store.State.Failed ? '로그인 실패.' : '로그인'}
                        </Typography>
                        <div className={classes.form}>
                            <TextField id="id"
                                       name="id"
                                       label="ID"
                                       variant="outlined"
                                       margin="normal"
                                       value={login.id}
                                       onChange={this.handleChangeId}
                                       required fullWidth />
                            <TextField id="password"
                                       name="password"
                                       label="Password"
                                       type="password"
                                       variant="outlined"
                                       margin="normal"
                                       value={login.password}
                                       onChange={this.handleChangePassword}
                                       onKeyUp={this.handleKeyUpPassword}
                                       required fullWidth />
                            <Button type="submit"
                                    className={classes.submit}
                                    color="primary"
                                    variant="contained"
                                    disabled={loginState === store.State.Pending}
                                    onClick={this.handleSubmitForm}
                                    fullWidth >
                                {loginState === store.State.Pending ? <CircularProgress size={22}/> : '로그인'}
                            </Button>
                        </div>
                    </div>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(style) (SignIn)));