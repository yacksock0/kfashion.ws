import React from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Stepper from "./Stepper";

const logoWidth = 120;

const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up('xl')]: {
            width: `calc(100% - ${theme.drawerWidth}px)`,
            marginLeft: theme.drawerWidth,
            backgroundColor : '#000000',
        },
        backgroundColor : '#000000',
    },
    appBar1: {
        backgroundColor : '#000000',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('xl')]: {
            display:'none'
        },
    },
    title: {
        marginLeft: (theme.sideMenuWidth - logoWidth) / 2,
        paddingLeft: theme.spacing(3),
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        marginLeft:'15%'
    },
}));

export default function TopBar(props) {
    const classes = useStyles();
    const { mobileOpen, setMobileOpen, isLoggedIn, doLogout, loginUser} = props;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div>
            { isLoggedIn ? (
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        { isLoggedIn ? (
                            <Stepper currentStep = {props.setStep} />):''}
                        { isLoggedIn ? (
                            <IconButton color="inherit" onClick={doLogout}>
                                <span style={{fontSize:'16px'}}>{loginUser.id}</span>
                                <span style={{backgroundImage:'url(/images/exiticon.png)' , width:'28px', height:'28px'}}></span>
                                {/* <ExitToAppIcon /> */}
                            </IconButton>
                        ) : ( <Link to='/home' className={classes.link}>
                                <div style={{backgroundImage:'url(/images/logo.png)' , width:'141px', height:'20px', backgroundRepeat:'no-repeat'}}></div>
                                {/* <h1 style={{color:'#5ded9a', display:'inline'}}>K</h1><h1 style={{color:'#fff', display:'inline'}}>-FASHION</h1> */}
                            </Link>
                            // <Link to="/SignUp" className={classes.link}>
                            //     <IconButton color="inherit">
                            //         <AccountCircleSharpIcon />
                            //         <Typography variant="h6" noWrap className={classes.title}>
                            //             회원가입
                            //         </Typography>
                            //     </IconButton>
                            // </Link>
                        )}
                    </Toolbar>
                </AppBar>):(
                <AppBar position="fixed" className={classes.appBar1}>
                    <Toolbar>
                        {/*<IconButton*/}
                        {/*    color="inherit"*/}
                        {/*    aria-label="open drawer"*/}
                        {/*    edge="start"*/}
                        {/*    onClick={handleDrawerToggle}*/}
                        {/*    className={classes.menuButton}*/}
                        {/*>*/}
                        {/*    <MenuIcon />*/}
                        {/*</IconButton>*/}
                        { isLoggedIn ? (
                            <Stepper currentStep = {props.setStep} />):''}
                        { isLoggedIn ? (
                            <IconButton color="inherit" onClick={doLogout}>
                                {loginUser.id}
                                <ExitToAppIcon />
                            </IconButton>
                        ) : (

                            <Link to='/home' className={classes.link}>
                                <div style={{backgroundImage:'url(/images/logo.png)' , width:'141px', height:'20px', backgroundRepeat:'no-repeat'}}></div>
                                {/* <h1 style={{color:'#5ded9a', display:'inline' , fontFamily:'NotoSans'}}>K</h1><h1 style={{color:'#fff', display:'inline' , fontFamily:'NotoSans'}}>-FASHION</h1> */}
                            </Link>
                            // <Link to="/SignUp" className={classes.link}>
                            //     <IconButton color="inherit">
                            //         <AccountCircleSharpIcon />
                            //         <Typography variant="h6" noWrap className={classes.title}>
                            //             회원가입
                            //         </Typography>
                            //     </IconButton>
                            // </Link>
                        )}
                    </Toolbar>
                </AppBar>)}
        </div>
    );
}


// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import { ReactComponent as Logo } from '../Test/images/logo.svg';
// import { ReactComponent as Logout } from '../Test/images/logout.svg';
// import { ReactComponent as JoinIcon } from '../Test/images/JoinIcon.svg';
// import { ReactComponent as LoginIcon } from '../Test/images/LoginIcon.svg';
// import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
// import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import {IconButton} from "@material-ui/core";
//
//
// const useStyles = makeStyles((theme) => ({
//     root: {
//         margin:'52px auto 30px',
//         flexGrow: 1,
//     },
//     gridcontainer:{
//         display:'flex',
//         justifyContent:'space-between',
//         margin:'0 auto',
//     },
//     logobox:{
//         width:'179px',
//         height:'95px',
//         background:'#526af2',
//         borderRadius:0,
//     },
//     logoimg:{
//         margin:'35px 0 0 -30px',
//     },
//     rightbox:{
//         display:'flex',
//         cursor:'pointer',
//         height:'30px',
//     },
//     userstyle:{
//         fontFamily:'Montserrat',
//         marginRight:20,
//     },
//
// }));
//
//
// export default function TopBarTag(){
//     const classes = useStyles();
//     const { mobileOpen, setMobileOpen, isLoggedIn, doLogout, loginUser} = props;
//
//     return (
//         <div className={classes.root}>
//             <React.Fragment>
//                 <Container maxWidth="xl">
//                     <Grid item xs={12} className={classes.gridcontainer}>
//                         <Paper elevation={0} className={classes.logobox}>
//                             <Logo className={classes.logoimg}/>
//                         </Paper>
//                         <Paper elevation={0} className={classes.rightbox}>
//                             <Typography className={classes.userstyle} ><JoinIcon /></Typography>
//                             <Typography className={classes.userstyle} ><LoginIcon /></Typography>
//                             <Typography className={classes.userstyle}
//                                         onClick={doLogout}> <ExitToAppIcon /></Typography>
//                         </Paper>
//                     </Grid>
//                 </Container>
//             </React.Fragment>
//         </div>
//     )
//
// }


