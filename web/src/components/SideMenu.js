import React from "react";
import {Link} from "react-router-dom";
import {Divider, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Toolbar} from "@material-ui/core";
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

const logoWidth = 129;
const logoHeight = 22;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
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
        width: theme.drawerWidth,
        backgroundColor: theme.palette.primary.main,
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
}));

export default function SideMenu(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { mobileOpen, setMobileOpen, isLoggedIn, authrity, loginUser} = props;

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
                <ListSubheader inset>Process</ListSubheader>

                <Link to="/home" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><ComputerIcon /></ListItemIcon>
                        <ListItemText primary="홈"></ListItemText>
                    </ListItem>
                </Link>
                <Link to="" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><WallpaperIcon /></ListItemIcon>
                        <ListItemText button onClick={handleClick} primary="Area 레이블"></ListItemText>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                </Link>
                <Link to="/step/imageUpload" className={classes.link}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <AspectRatioIcon />
                                </ListItemIcon>
                                <ListItemText primary="이미지 리스트" />
                            </ListItem>
                        </List>
                    </Collapse>
                </Link>
                <Link to="/Step/boundaryBox" className={classes.link}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <AspectRatioIcon />
                                </ListItemIcon>
                                <ListItemText primary="사각형 지정" />
                            </ListItem>
                        </List>
                    </Collapse>
                </Link>
                <Link to="/step/polygon" className={classes.link}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <FormatShapesIcon />
                                </ListItemIcon>
                                <ListItemText primary="다각형 지정" />
                            </ListItem>
                        </List>
                    </Collapse>
                </Link>


                <Link to="" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon><WallpaperIcon /></ListItemIcon>
                        <ListItemText button onClick={handleClick2} primary="Text 레이블"></ListItemText>
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                </Link>
                <Link to="/step2" className={classes.link}>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <FormatListBulletedIcon />
                                </ListItemIcon>
                                <ListItemText primary="기본 레이블링" />
                            </ListItem>
                        </List>
                    </Collapse>
                </Link>
                {loginUser.authorityNo == 5 ? (
                <Link to="/step3" className={classes.link}>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <PlaylistAddCheckIcon />
                                </ListItemIcon>
                                <ListItemText primary="전문 레이블링" />
                            </ListItem>
                        </List>
                    </Collapse>
                </Link>
                ):''}
                {loginUser.isAdmin == 'Y'? (
                <Link to="/step3" className={classes.link}>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <PlaylistAddCheckIcon />
                                </ListItemIcon>
                                <ListItemText primary="전문 레이블링" />
                            </ListItem>
                        </List>
                    </Collapse>
                </Link>
                ):''}
                <Link to="/step3" className={classes.link}>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <PlaylistAddCheckIcon />
                                </ListItemIcon>
                                <ListItemText primary="최종 검수" />
                            </ListItem>
                        </List>
                    </Collapse>
                </Link>
            </List>
            <Divider />
            {loginUser.isAdmin == 'Y'? (
                <div>
                    <Link to="" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon><WallpaperIcon /></ListItemIcon>
                            <ListItemText button onClick={handleClickAdmin} primary="관리자 메뉴"></ListItemText>
                            {open1 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                    </Link>
                    <Link to="/admin/createGroup" className={classes.link}>
                        <Collapse in={open1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <AspectRatioIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="가입승인 & 그룹생성" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </Link>
                    <Link to="/admin/userList" className={classes.link}>
                        <Collapse in={open1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <AspectRatioIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="회원 리스트" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </Link>
                    <Link to="/admin/userList" className={classes.link}>
                        <Collapse in={open1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <AspectRatioIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="작업 나눠주기" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </Link>
                    </div>):''}
            {loginUser.groupAdmin === 1?(
                <div>
                    <Link to="" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon><WallpaperIcon /></ListItemIcon>
                            <ListItemText button onClick={handleClickAdmin} primary="관리자 메뉴"></ListItemText>
                            {open1 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                    </Link>
                    <Link to="/admin/userList" className={classes.link}>
                        <Collapse in={open1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <AspectRatioIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="회원 리스트" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </Link>
                    <Link to="/admin/userList" className={classes.link}>
                        <Collapse in={open1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <AspectRatioIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="작업 나눠주기" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </Link>
                </div>
            ):''}
        </div>
    );

    return (
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
                        {/*<Link to='/' className={classes.link}>*/}
                        {/*    <img src="/images/aether_white.png" alt="AetherIT" className={classes.logo}/>*/}
                        {/*</Link>*/}
                    </Toolbar>
                    {isLoggedIn ? (
                        drawer
                    ) : (
                        ''
                    )}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}

                        open
                >
                    <Toolbar className={classes.toolbar}>
                        {/*<Link to='/' className={classes.link}>*/}
                        {/*    <img src="/images/aether_white.png" alt="AetherIT" className={classes.logo}/>*/}
                        {/*</Link>*/}
                    </Toolbar>
                    {isLoggedIn ? (
                        drawer
                    ) : (
                        ''
                    )}
                </Drawer>
            </Hidden>
        </nav>
    );
};