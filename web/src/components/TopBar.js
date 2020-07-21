import React from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Stepper from "./Stepper";

const logoWidth = 120;

const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up('xl')]: {
            width: `calc(100% - ${theme.drawerWidth}px)`,
            marginLeft: theme.drawerWidth,
        },
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
    }
}));
export default function TopBar(props) {
    const classes = useStyles();
    const { mobileOpen, setMobileOpen, isLoggedIn, doLogout, loginUser, setStep } = props;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
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
                <Stepper currentStep = {props.setStep}/>):''}
                { isLoggedIn ? (
                    <IconButton color="inherit" onClick={doLogout}>
                        {loginUser.id}
                        <ExitToAppIcon />
                    </IconButton>
                ) : (
                    <Link to="/SignUp" className={classes.link}>
                        <IconButton color="inherit">
                            <AssignmentIndIcon />
                            <Typography variant="h6" noWrap className={classes.title}>
                                회원가입
                            </Typography>
                        </IconButton>
                    </Link>
                )}
            </Toolbar>
        </AppBar>
    );
}