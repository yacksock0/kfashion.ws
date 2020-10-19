// import React from "react";
// import {withSnackbar} from "notistack";
// import {withRouter} from "react-router-dom";
// import {withStyles} from "@material-ui/core/styles";
// import {inject, observer} from "mobx-react";
// import {Grid, Button, CircularProgress, Container, TextField, Typography} from "@material-ui/core";
//
// import * as sStore from "../../stores/kSearching/SAuthStore";
// import * as tStore from "../../stores/kTagging/TAuthStore";
//
// const style = theme => ({
//     main:{
//         textAlign:'center',
//         backgroundImage: `url(/images/mainbanner.jpg)`,
//         height:'90vh',
//         backgroundSize:'cover',
//         marginTop: '-90px',
//     },
//     appBarSpacer: theme.mixins.toolbar,
//     container : {
//         margin:'auto',
//         marginTop: '150px',
//     },
//     paper: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         marginTop: '15vh',
//     },
//     lockOpenAvatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.primary.main,
//     },
//     lockOutAvatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: '100%',
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//         backgroundColor: '#000000',
//         fontSize : '20px',
//         color:'white',
//         fontFamily:'NotoSansCJKkr',
//     },
// });
//
// @inject('sAuthStore')
// @observer
// class SignInSearch extends React.Component {
//     componentDidMount() {
//         setTimeout(() => document.body.style.zoom = "100%", 100);
//     }
//
//     handleChangeId = (e) => {
//         this.props.sAuthStore.changeLoginId(e.target.value);
//     }
//
//     handleChangePassword = (e) => {
//         this.props.sAuthStore.changeLoginPassword(e.target.value);
//     }
//
//     handleKeyUpPassword = (e) => {
//         if(e.keyCode === 13) {
//             this.props.sAuthStore.doLogin(this.props.history);
//         }
//     }
//
//     handleSubmitForm = (e) => {
//         this.props.sAuthStore.doLogin(this.props.history);
//     }
//
//     JoinSearch = () => {
//         this.props.history.push('/searching/SignUp');
//     }
//
//     render() {
//         const { classes } = this.props;
//         const { loginState, login } = this.props.sAuthStore;
//
//         return (
//             <Grid item xs={12}>
//                 <div className={classes.main}>
//             <Container component="main" maxWidth="xs" className={classes.container}>
//                 <div className={classes.appBarSpacer} />
//                     <div className={classes.paper}>
//                         <Typography component="h1" variant="h4" style={{fontFamily:'NotoSansCJKkr', fontWeight:'600'}}>
//                             {loginState === sStore.State.Failed ? '로그인 실패.' : 'Searching'}
//                         </Typography>
//                         <div className={classes.form}>
//                             <TextField id="id"
//                                        name="id"
//                                        label="ID"
//                                        variant="outlined"
//                                        margin="normal"
//                                        value={login.id}
//                                        onChange={this.handleChangeId}
//                                        required fullWidth
//                                        />
//                             <TextField id="password"
//                                        name="password"
//                                        label="Password"
//                                        type="password"
//                                        variant="outlined"
//                                        margin="normal"
//                                        value={login.password}
//                                        onChange={this.handleChangePassword}
//                                        onKeyUp={this.handleKeyUpPassword}
//                                        required fullWidth />
//                             <Button type="submit"
//                                     className={classes.submit}
//                                     variant="contained"
//                                     disabled={loginState === sStore.State.Pending}
//                                     onClick={this.handleSubmitForm}
//                                     fullWidth
//                                     // style={{borderRadius:'0'}}
//                                     >
//                                 {loginState === sStore.State.Pending ? <CircularProgress size={22}/> : '로그인'}
//                             </Button>
//                             <Button type="submit"
//                                     className={classes.submit}
//                                     variant="contained"
//                                     disabled={loginState === tStore.State.Pending}
//                                     onClick={this.JoinSearch}
//                                     fullWidth
//                             >
//                                 회원가입
//                             </Button>
//                         </div>
//                     </div>
//             </Container>
//                 </div>
//             </Grid>
//         );
//     }
// };
//
// export default withSnackbar(withRouter(withStyles(style) (SignInSearch)));

import React from "react";
import {withSnackbar} from "notistack";
import {Link, withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {Grid, Button, CircularProgress, Container, TextField, Typography, Paper} from "@material-ui/core";

import * as tStore from "../../../stores/kTagging/TAuthStore";

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
        margin:'0 auto 66px',
    },
    txtfieldstyle:{
        width:'390px',
        height:'39px',
        marginBottom:30,

        "& .MuiOutlinedInput-root": {
            borderRadius:0,
        }
    },
    btnloginstyle: {
        width:'390px',
        height:'50px',
        background:'#000',
        color:'#fff',
        fontFamily:'Montserrat',
        fontWeight:'bold',
        fontSize:'17px',
        borderRadius:0,

        "&:hover": {
            background:'#526af2',
        },
    },
    btnjoinstyle:{
        width:'390px',
        height:'50px',
        fontFamily:'Montserrat',
        fontWeight:'bold',
        fontSize:'17px',
        borderRadius:50,
        borderColor:'#707070',
        marginBottom:50,
    },
    findbox:{
        display:'flex',
        justifyContent:'flex-end',
        margin:'9px 0 45px',
    },
    findbtn: {
        "&:hover": {
            background:'transparent',
            color:'#526af2',
            fontWeight:'bold'
        },
    }
});

@inject('sAuthStore')
@observer
class SignInSearch extends React.Component {
    componentDidMount() {
        setTimeout(() => document.body.style.zoom = "100%", 100);
    }

    handleChangeId = (e) => {
        this.props.sAuthStore.changeLoginId(e.target.value);
    }

    handleChangePassword = (e) => {
        this.props.sAuthStore.changeLoginPassword(e.target.value);
    }

    handleKeyUpPassword = (e) => {
        if(e.keyCode === 13) {
            this.props.sAuthStore.doLogin(this.props.history);
        }
    }

    handleSubmitForm = (e) => {
        this.props.sAuthStore.doLogin(this.props.history);
    }

    JoinSearch = () => {
        this.props.history.push('/searching/agree');
    }


    render() {
        const { classes } = this.props;
        const { loginState, login } = this.props.sAuthStore;

        return (
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Paper elevation={0}>
                        <Typography className={classes.titletext}>LOGIN</Typography>
                        <form noValidate autoComplete="off">
                            <Paper elevation={0}>
                                <TextField id="outlined-basic"
                                           name="id"
                                           label="아이디"
                                           variant="outlined"
                                           margin="normal"
                                           value={login.id}
                                           onChange={this.handleChangeId}
                                           className={classes.txtfieldstyle}
                                />
                            </Paper>
                            <Paper elevation={0}>
                                <TextField id="outlined-password-input"
                                           name="password"
                                           label="비밀번호"
                                           type="password"
                                           variant="outlined"
                                           autoComplete="current-password"
                                           value={login.password}
                                           onChange={this.handleChangePassword}
                                           onKeyUp={this.handleKeyUpPassword}
                                           className={classes.txtfieldstyle}/>
                            </Paper>
                        </form>
                        <Paper elevation={0}>
                            <Button type="submit"
                                    className={classes.btnloginstyle}
                                    variant="contained"
                                    disabled={loginState === tStore.State.Pending}
                                    onClick={this.handleSubmitForm}
                            >
                                {loginState === tStore.State.Pending ? <CircularProgress size={22}/> : '로그인'}
                            </Button>
                        </Paper>
                        <Paper elevation={0} className={classes.findbox}>
                            {/*<Button className={classes.findbtn}>아이디찾기</Button>*/}
                            {/*<Typography>|</Typography>*/}
                            {/*<Button className={classes.findbtn}>비밀번호찾기</Button>*/}
                        </Paper>
                        <Paper elevation={0}>
                            <Button type="submit"
                                    className={classes.btnjoinstyle}
                                    variant="outlined"
                                    disabled={loginState === tStore.State.Pending}
                                    onClick={this.JoinSearch}
                            >
                                간편 회원가입
                            </Button>
                        </Paper>
                    </Paper>
                </Paper>
            </div>
        );
    }
};

export default withSnackbar(withRouter(withStyles(style) (SignInSearch)));