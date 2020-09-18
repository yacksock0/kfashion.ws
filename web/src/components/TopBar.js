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
                        <h1 style={{backgroundImage:'url(/images/logo.png)' , width:'141px', height:'20px', backgroundRepeat:'no-repeat'}}></h1>
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
                                    <h1 style={{backgroundImage:'url(/images/logo.png)' , width:'141px', height:'20px', backgroundRepeat:'no-repeat'}}></h1>
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