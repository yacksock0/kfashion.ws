import React from "react";
import {Link} from "react-router-dom";

import {makeStyles} from "@material-ui/core/styles";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

const logoWidth = 120;

const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${theme.drawerWidth}px)`,
            marginLeft: theme.drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
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
    const { mobileOpen, setMobileOpen, isLoggedIn, doLogout } = props;

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
                <Typography variant="h6" noWrap className={classes.title}>
                    <Link to='/' className={classes.link}>
                        K-FASHION
                    </Link>
                </Typography>

                { isLoggedIn ? (
                    <IconButton color="inherit" onClick={doLogout}>
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