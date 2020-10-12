import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {Grid, Button, CircularProgress, Container, TextField, Typography} from "@material-ui/core";

import * as tStore from "../../stores/kTagging/TAuthStore";

const style = theme => ({
    main:{
        textAlign:'center',
        backgroundImage: `url(/images/mainbanner.jpg)`,
        height:'90vh',
        backgroundSize:'cover',
        marginTop: '-90px',
    },
    appBarSpacer: theme.mixins.toolbar,
    container : {
        margin:'auto',
        marginTop: '150px',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '15vh',
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
        color:'white',
        fontFamily:'NotoSansCJKkr',     
    },
});

@inject('tAuthStore')
@observer
class SignIn extends React.Component {
    componentDidMount() {
        setTimeout(() => document.body.style.zoom = "100%", 100);
    }

    handleChangeId = (e) => {
        this.props.tAuthStore.changeLoginId(e.target.value);
    }

    handleChangePassword = (e) => {
        this.props.tAuthStore.changeLoginPassword(e.target.value);
    }

    handleKeyUpPassword = (e) => {
        if(e.keyCode === 13) {
            this.props.tAuthStore.doLogin(this.props.history);
        }
    }

    handleSubmitForm = (e) => {
        this.props.tAuthStore.doLogin(this.props.history);
    }

    render() {
        const { classes } = this.props;
        const { loginState, login } = this.props.tAuthStore;

        return (
            <Grid item xs={12}>
                <div className={classes.main}>
            <Container component="main" maxWidth="xs" className={classes.container}>
                <div className={classes.appBarSpacer} />
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h4" style={{fontFamily:'NotoSansCJKkr', fontWeight:'600'}}>
                            {loginState === tStore.State.Failed ? '로그인 실패.' : 'Tagging'}
                        </Typography>
                        <div className={classes.form}>
                            <TextField id="id"
                                       name="id"
                                       label="ID"
                                       variant="outlined"
                                       margin="normal"
                                       value={login.id}
                                       onChange={this.handleChangeId}
                                       required fullWidth
                                       />
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
                                    variant="contained"
                                    disabled={loginState === tStore.State.Pending}
                                    onClick={this.handleSubmitForm}
                                    fullWidth
                                    // style={{borderRadius:'0'}} 
                                    >
                                {loginState === tStore.State.Pending ? <CircularProgress size={22}/> : '로그인'}
                            </Button>
                        </div>
                    </div>
            </Container>
                </div>
            </Grid>
        );
    }
};

export default withSnackbar(withRouter(withStyles(style) (SignIn)));