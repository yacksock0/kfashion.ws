import React from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {AppBar, IconButton, Toolbar} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Stepper from "./Stepper";
import SideHelp from "./SideHelp";
import Paper from '@material-ui/core/Paper';
import { ReactComponent as Kpoint } from '../images/Kpoint.svg';
import { ReactComponent as UserIcon } from '../images/UserIcon.svg';
import { ReactComponent as Help } from '../images/Help.svg';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

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
    paper:{
        display:'flex',
        background:'transparent',
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
    link1: {
        [theme.breakpoints.up('xl')]: {
            display:'none'
        },
        [theme.breakpoints.down('xs')]: {
            display:'none'
        },
        textDecoration: 'none',
        color: 'inherit',
        marginLeft:'0',
        marginTop:13,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        marginLeft:'5%'
    },
    textpoint:{
        color:'#fff',
    },
    iconbox: {
        marginLeft:17,
        marginRight:8,
    },
    userstyle:{
        fontSize:'16px',
        color:'#fff',
        borderBottom:'3px solid #5ded9a',
        textTransform:'none',
    },
    helpbox: {
        width:'400px',
        padding:'0 18px',
        boxSizing:'border-box',
    },
    helptop: {
        width:'400px',
        height:'65px',
        background:'#000',
        boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.45)',
        borderRadius:0,
        display:'flex',
        justifyContent:'space-between',
      },
      helptoptxt: {
        width:'100%',
        color:'#fff',
        lineHeight:'65px',
        textAlign:'center',
        fontFamily: 'NotoSansCJKkr',
        fontSize: '20px',
        fontWeight: '500',
      },
      usermenubox:{
        width:'105px',
        padding:5,
      },
      usermenu:{
        display:'inline-block',
        fontFamily: 'NotoSansCJKkr',
        fontSize: '13px',
        color:'#707070',
        textAlign:'center',

        "&:hover": {
            background:''
        }
      },
}));

export default function TopBar(props) {
    const classes = useStyles();
    const { mobileOpen, setMobileOpen, isLoggedIn, doLogout, loginUser} = props;
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        right: false,
      });
    
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        }
      }
    
      // return focus to the button when we transitioned from !open -> open
      const prevOpen = React.useRef(open);
      React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
          anchorRef.current.focus();
        }
    
        prevOpen.current = open;
      }, [open]);



      

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };

      const list = (anchor) => (
        <div>
            <div className={classes.helptop}>
                <Typography className={classes.helptoptxt}>도움말</Typography>
                <CloseIcon style={{color:'#fff',margin:'10px 10px 0 0',cursor:'pointer'}} onClick={toggleDrawer(anchor, false)}/>
                {/* <CloseIcon style={{color:'#fff',margin:'10px 10px 0 0',cursor:'pointer'}} onClick={handleClose}></CloseIcon> */}
            </div>
            <Paper elevation={0} className={classes.helpbox}>
                <SideHelp />
            </Paper>
        </div>   
        
      );
    
    
    return (
        <div>
            { isLoggedIn ? (
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar style={{display:'flex',justifyContent:'space-between',}}>
                        {/*  */}
                        <Paper elevation={0} className={classes.paper}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon style={{color:'#fff'}}/>
                            </IconButton>

                            {/*  */}
                            
                            <Link to='/home' className={classes.link1}>
                                <div style={{backgroundImage:'url(/images/logo.png)' , width:'141px', height:'20px', backgroundRepeat:'no-repeat'}}></div>  
                            </Link>
                        </Paper>

                        <Paper elevation={0} className={classes.paper}>
                            
                            {/* 201022 주석처리
                            { isLoggedIn ? (
                            <Stepper currentStep = {props.setStep} />):''} */}


                            <h4 className={classes.textpoint}><Kpoint className={classes.iconbox}/> 다각형 지정</h4>
                            { isLoggedIn ? (
                                // 201022 주석처리
                                // <IconButton color="inherit" onClick={doLogout}>
                                //     <span style={{backgroundImage:'url(/images/exiticon.png)' , width:'28px', height:'28px'}}></span>
                                //     <ExitToAppIcon />
                                // </IconButton>

                                <IconButton color="inherit">
                                    <Button
                                    ref={anchorRef}
                                    aria-controls={open ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                    >
                                        <UserIcon className={classes.iconbox} />
                                        <span className={classes.userstyle}>{loginUser.id} 님</span>
                                        {open != null ? open ? <ExpandLess style={{color:'#fff'}} /> : <ExpandMore style={{color:'#fff'}}/> : null}
                                    </Button>
                                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                            {...TransitionProps}
                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className={classes.usermenubox} >
                                                        <MenuItem onClick={handleClose} className={classes.usermenu} style={{borderBottom:'1px solid #e2e2e2'}}>기초작업자</MenuItem>
                                                        <MenuItem onClick={handleClose} className={classes.usermenu} style={{color:'#1e8247'}} onClick={doLogout}> 로그아웃</MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                            </Grow>
                                        )}
                                        </Popper>

                                    {['right'].map((anchor) => (
                                        <React.Fragment key={anchor}>
                                            <Button onClick={toggleDrawer(anchor, true)}><Help className={classes.iconbox} /></Button>
                                            <Drawer
                                                anchor={anchor}
                                                open={state[anchor]}
                                                onClose={toggleDrawer(anchor, false)}
                                            >
                                                {list(anchor)}
                                            </Drawer>
                                        </React.Fragment>
                                    ))}

                                    
                                </IconButton>

                            ) : ( <Link to='/home' className={classes.link}>
                                    <div style={{backgroundImage:'url(/images/logo.png)' , width:'141px', height:'20px', backgroundRepeat:'no-repeat'}}></div>
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
                        </Paper>
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
                                    {/* <ExitToAppIcon /> */}
                                </IconButton>
                            ) : (

                                <Link to='/home' className={classes.link}>
                                    <div style={{backgroundImage:'url(/images/logo.png)' , width:'141px', height:'20px', backgroundRepeat:'no-repeat'}}></div>
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