import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {Grid, Button, CircularProgress, Container, TextField, Typography} from "@material-ui/core";

import * as store from "../stores/AuthStore";


const style = theme => ({
    main:{
        textAlign:'center',
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
    form: {
        width: '100%',
        display:'flex',
        justifyContent:'space-between',

    },
    submit: {
        width:'180px',
        height:'95px',
        backgroundColor: '#000000',
        fontSize : '17px',
        color:'#fff',
        fontFamily:'NotoSansCJKkr',   
        borderRadius:0,  
    },
    lblstyle: {
        display:'inline-block',
        width:'60px',
        height:'30px',
        verticalAlign:'middle',
        fontFamily: 'NotoSansCJKkr',
        fontSize: '14px',
        textAlign:'left'
    },
    textstyle:{
        width:'300px',
        height:'39px',
        fontSize:'14px',
        background:'#f2f2f2',
        border:0,
        padding:'0 10px',
        boxSizing:'border-box',
    },
    login: {
        marginTop:-12
    }
});

@inject('authStore')
@observer
class SignIn extends React.Component {
    componentDidMount() {
        setTimeout(() => document.body.style.zoom = "100%", 100);
    }

    handleChangeId = (e) => {
        this.props.authStore.changeLoginId(e.target.value);
    }

    handleChangePassword = (e) => {
        this.props.authStore.changeLoginPassword(e.target.value);
    }

    handleKeyUpPassword = (e) => {
        if(e.keyCode === 13) {
            this.props.authStore.doLogin(this.props.history);
        }
    }

    handleSubmitForm = (e) => {
        this.props.authStore.doLogin(this.props.history);
    }

    render() {
        const { classes } = this.props;
        const { loginState, login } = this.props.authStore;

        return (
            <Grid item xs={12}>
                <div className={classes.main}>
                    <Container component="main" maxWidth="sm" className={classes.container}>
                        <div className={classes.appBarSpacer} />
                            <div className={classes.paper}>
                                <div style={{width:'100%',borderBottom:'4px solid #28282d',marginBottom:60}}>
                                    <Typography component="h1" variant="h4" style={{fontFamily:'SoftElegance',fontSize:'45px',paddingBottom:40}}>
                                        {loginState === store.State.Failed ? '로그인 실패.' : 'LOGIN'}
                                    </Typography>
                                </div>
                                <form className={classes.form}>
                                    <div  className={classes.login}>
                                        <p>		
                                            <label for="id" className={classes.lblstyle}>아이디</label>
                                            <input 
                                            name="id"
                                            type="text" 
                                            id="id" 
                                            placeholder="아이디 입력"
                                            value={login.id}
                                            onChange={this.handleChangeId}
                                            className={classes.textstyle}
                                            />
                                        </p>
                                    
                                        <p>		
                                            <label for="password" className={classes.lblstyle}>비밀번호</label>
                                            <input 
                                            name="password"
                                            type="password" 
                                            id="password" 
                                            placeholder="비밀번호"
                                            value={login.password}
                                            onChange={this.handleChangePassword}
                                            onKeyUp={this.handleKeyUpPassword} 
                                            className={classes.textstyle}
                                            />
                                        </p>
                                    </div>                           
                                    <div  className={classes.btnbox}>
                                        <Button type="submit"
                                                className={classes.submit}
                                                variant="contained"
                                                disabled={loginState === store.State.Pending}
                                                onClick={this.handleSubmitForm}
                                                fullWidth
                                                // style={{borderRadius:'0'}} 
                                                >
                                            {loginState === store.State.Pending ? <CircularProgress size={22}/> : '로그인'}
                                        </Button>

                                    </div>
                                </form>
                            </div>
                    </Container>
                </div>
            </Grid>
        );
    }
};

export default withSnackbar(withRouter(withStyles(style) (SignIn)));

// import React from "react";
// import {withSnackbar} from "notistack";
// import {withRouter} from "react-router-dom";
// import {withStyles} from "@material-ui/core/styles";
// import {inject, observer} from "mobx-react";
// import {Grid, Button, CircularProgress, Container, TextField, Typography} from "@material-ui/core";

// import * as store from "../stores/AuthStore";


// const style = theme => ({
//     main:{
//         textAlign:'center',
//         // backgroundImage: `url(/images/mainbanner.jpg)`,
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

// @inject('authStore')
// @observer
// class SignIn extends React.Component {
//     componentDidMount() {
//         setTimeout(() => document.body.style.zoom = "100%", 100);
//     }

//     handleChangeId = (e) => {
//         this.props.authStore.changeLoginId(e.target.value);
//     }

//     handleChangePassword = (e) => {
//         this.props.authStore.changeLoginPassword(e.target.value);
//     }

//     handleKeyUpPassword = (e) => {
//         if(e.keyCode === 13) {
//             this.props.authStore.doLogin(this.props.history);
//         }
//     }

//     handleSubmitForm = (e) => {
//         this.props.authStore.doLogin(this.props.history);
//     }

//     render() {
//         const { classes } = this.props;
//         const { loginState, login } = this.props.authStore;

//         return (
//             <Grid item xs={12}>
//                 <div className={classes.main}>
//                     <Container component="main" maxWidth="xs" className={classes.container}>
//                         <div className={classes.appBarSpacer} />
//                             <div className={classes.paper}>
//                                 <Typography component="h1" variant="h4" style={{fontFamily:'NotoSansCJKkr', fontWeight:'600'}}>
//                                     {loginState === store.State.Failed ? '로그인 실패.' : 'fashion'}
//                                 </Typography>
//                                 <div className={classes.form}>
//                                     <TextField id="id"
//                                             name="id"
//                                             label="ID"
//                                             variant="outlined"
//                                             margin="normal"
//                                             value={login.id}
//                                             onChange={this.handleChangeId}
//                                             required fullWidth
//                                             />
//                                     <TextField id="password"
//                                             name="password"
//                                             label="Password"
//                                             type="password"
//                                             variant="outlined"
//                                             margin="normal"
//                                             value={login.password}
//                                             onChange={this.handleChangePassword}
//                                             onKeyUp={this.handleKeyUpPassword}
//                                             required fullWidth />
//                                     <Button type="submit"
//                                             className={classes.submit}
//                                             variant="contained"
//                                             disabled={loginState === store.State.Pending}
//                                             onClick={this.handleSubmitForm}
//                                             fullWidth
//                                             // style={{borderRadius:'0'}} 
//                                             >
//                                         {loginState === store.State.Pending ? <CircularProgress size={22}/> : '로그인'}
//                                     </Button>
//                                 </div>
//                             </div>
//                     </Container>
//                 </div>
//             </Grid>
//         );
//     }
// };

// export default withSnackbar(withRouter(withStyles(style) (SignIn)));