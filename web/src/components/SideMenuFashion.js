import React from "react";
import {Link} from "react-router-dom";
import {
    Divider,
    Drawer,
    Hidden,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Toolbar,
    Typography
} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import ComputerIcon from '@material-ui/icons/Computer';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import FormatShapesIcon from '@material-ui/icons/FormatShapes';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Button from "@material-ui/core/Button";
import {toJS} from "mobx";

const logoWidth = 129;
const logoHeight = 22;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('xl')]: {
            width: theme.drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        width: theme.drawerWidth,
        paddingLeft: 0,
        paddingRight: 0,
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        width: theme.drawerWidth,
        height: '100%',
        border: 'none',
    },
    toolbar: {
        backgroundColor: '#000000',
        paddingLeft: 0,
        paddingRight: 0,
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
    logo: {
        width: logoWidth,
        height: logoHeight,
        marginLeft: (theme.drawerWidth - logoWidth) / 2,
        marginRight: (theme.drawerWidth - logoWidth) / 2,
    },
    menu: {
        borderRight: '1px solid rgba(0,0,0,0.12)',
        height: '100%',
    },

    link: {
        textDecoration: 'none',
        color: 'inherit',
    },nested: {
        paddingLeft: theme.spacing(4),
    },
    title: {
        textAlign:'center',
        flexGrow: 1,
    },
    link1: {
        textDecoration: 'none',
        color: 'white',
    }
}));

export default function SideMenu(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { mobileOpen, setMobileOpen, isLoggedIn, loginUser} = props;
    // console.log("props : " , toJS(props));
    // console.log("loginUser : " , toJS(loginUser));

    // const windowSet = () => { window.location.href; }
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const [open1, setOpen1] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleClick2 = () => {
        setOpen2(!open2);
    };
    const handleClickAdmin = () => {
        setOpen1(!open1);
    };
    const drawer = (
        <div className={classes.menu}>
            <List>
                <Link to="/asd" className={classes.link}>
                    <ListItem type="button">
                        <ListItemIcon><ComputerIcon /></ListItemIcon>
                        <ListItemText primary="test"></ListItemText>
                    </ListItem>
                </Link>

            </List>
            <Divider />
        </div>
    );

    return (
        <div>
            {isLoggedIn ? (
                <nav className={classes.drawer} aria-label="mailbox folders">
                    <Hidden smUp implementation="css">
                        <Drawer variant="temporary"
                                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                        >
                            <Toolbar className={classes.toolbar}>
                                <Typography variant="h6" noWrap className={classes.title}>
                                    <Link to='/home' className={classes.link1}>
                                        <div style={{backgroundImage:'url(/images/sidelogo.png)' , backgroundSize:'cover' , width:'125px', height:'17px', backgroundRepeat:'no-repeat' , margin:'0 auto'}}></div>
                                        {/* <h4 style={{color:'#5ded9a', display:'inline'}}>K</h4>-FASHION */}
                                    </Link>
                                </Typography>
                            </Toolbar>
                            {isLoggedIn ? (
                                drawer
                            ) : (
                                ''
                            )}
                        </Drawer>
                    </Hidden>
                    <Hidden lgDown implementation="css">
                        <Drawer variant="permanent"
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                open
                        >
                            <Toolbar className={classes.toolbar}>
                                <Typography variant="h6" noWrap className={classes.title}>
                                    <Link to='/home' className={classes.link1}>
                                        <div style={{backgroundImage:'url(/images/sidelogo.png)' , width:'125px', height:'17px', backgroundRepeat:'no-repeat' , margin:'0 auto'}}></div>
                                        {/* <h4 style={{color:'#5ded9a', display:'inline'}}>K</h4>-FASHION */}
                                    </Link>
                                </Typography>
                            </Toolbar>
                            {isLoggedIn ? (
                                drawer
                            ) : (
                                ''
                            )}
                        </Drawer>
                    </Hidden>
                </nav>
            ) : (
                ''
            )}






        </div>
    );
};