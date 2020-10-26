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
        padding:0,
        "& .MuiDivider-root": {
            height:0,
        }
    },

    link: {
        textDecoration: 'none',
        color: 'inherit',
        textAlign:'center',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    title: {
       textAlign:'center',
        flexGrow: 1,
    },
    link1: {
        textDecoration: 'none',
        color: 'white',
    },
    menutext:{
        textAlign:'center',
        "& .MuiTypography-body1":{
            fontFamily: 'NotoSansCJKkr',
            fontSize: '17px',
            fontWeight: '600',
        },

    },
    test:{
        "& .MuiListSubheader-root":{
            padding:0
        }
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
            <List className={classes.test}>
                {loginUser.isAdmin ==='Y' ? (
                <ListSubheader style={{textAlign: 'center'}}><h3>마스터 관리자</h3><hr style={{border:'none',height:'1px',background:'#707070'}} /></ListSubheader>):''}
                {loginUser.groupAdmin === 1 && loginUser.authorityNo !== 4 && loginUser.authorityNo !== 1? (
                    <ListSubheader style={{textAlign: 'center'}}><h3>그룹 관리자</h3><hr style={{border:'none',height:'1px',background:'#707070'}} /></ListSubheader>):''}
                {loginUser.authorityNo === 1 && loginUser.groupAdmin === 1 ? (
                    <ListSubheader style={{textAlign: 'center'}}><h3>업로드 작업자</h3><hr style={{border:'none',height:'1px',background:'#707070'}} /></ListSubheader>):''}
                {loginUser.authorityNo === 2 && loginUser.groupAdmin === 0? (
                    <ListSubheader style={{textAlign: 'center'}}><h3>기초 작업자</h3><hr style={{border:'none',height:'1px',background:'#707070'}} /></ListSubheader>):''}
                {loginUser.authorityNo === 3 && loginUser.groupAdmin === 0? (
                    <ListSubheader inset style={{textAlign: 'center'}}><h3>전문 작업자</h3><hr style={{border:'none',height:'1px',background:'#707070'}} /></ListSubheader>):''}
                {loginUser.groupAdmin === 1 && loginUser.authorityNo === 4? (
                    <ListSubheader style={{textAlign: 'center'}}><h3>읽기 전용</h3><hr style={{border:'none',height:'1px',background:'#707070'}} /></ListSubheader>):''}
                {/* {loginUser.isAdmin ==='Y' ? (
                <ListSubheader style={{textAlign: 'center'}}><h3><AssignmentIndIcon style={{fontSize:30 , display: 'inline-block', verticalAlign: 'middle', marginBottom: 4}} />마스터 관리자</h3></ListSubheader>):''}
                {loginUser.groupAdmin === 1 && loginUser.authorityNo !== 4 && loginUser.authorityNo !== 1? (
                    <ListSubheader style={{textAlign: 'center'}}><h3><AssignmentIndIcon style={{fontSize:30 , display: 'inline-block', verticalAlign: 'middle', marginBottom: 4}} />그룹 관리자</h3></ListSubheader>):''}
                {loginUser.authorityNo === 1 && loginUser.groupAdmin === 1 ? (
                    <ListSubheader style={{textAlign: 'center'}}><h3><AssignmentIndIcon style={{fontSize:30 , display: 'inline-block', verticalAlign: 'middle', marginBottom: 4}} />업로드 작업자</h3></ListSubheader>):''}
                {loginUser.authorityNo === 2 && loginUser.groupAdmin === 0? (
                    <ListSubheader style={{textAlign: 'center'}}><h3><AssignmentIndIcon style={{fontSize:30 , display: 'inline-block', verticalAlign: 'middle', marginBottom: 4}}/>기초 작업자</h3></ListSubheader>):''}
                {loginUser.authorityNo === 3 && loginUser.groupAdmin === 0? (
                    <ListSubheader inset><h3>전문 작업자</h3></ListSubheader>):''}
                {loginUser.groupAdmin === 1 && loginUser.authorityNo === 4? (
                    <ListSubheader style={{textAlign: 'center'}}><h3><AssignmentIndIcon style={{fontSize:30 , display: 'inline-block', verticalAlign: 'middle', marginBottom: 4}} />읽기 전용</h3></ListSubheader>):''} */}
                {/* <Link to="/home" className={classes.link}>
                    <ListItem type="button">
                        <ListItemIcon><ComputerIcon /></ListItemIcon>
                        <ListItemText primary="홈"></ListItemText>
                    </ListItem>
                </Link> */}





                {/* {loginUser.authorityNo <  3 && loginUser.groupAdmin !== 1? (
                    <ListItem button>
                        <ListItemIcon><WallpaperIcon /></ListItemIcon>
                        <ListItemText type="button" onClick={handleClick} primary="영역지정"></ListItemText>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    ):''}
                {loginUser.authorityNo ===  1 && loginUser.groupAdmin === 1? (
                        <ListItem button>
                            <ListItemIcon><WallpaperIcon /></ListItemIcon>
                            <ListItemText type="button" onClick={handleClick} primary="영역지정"></ListItemText>
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                ):''} */}
                {loginUser.authorityNo === 1 || loginUser.isAdmin === 'Y' ? (
                    <Link to="/step/imageUpload" className={classes.link}>
                        <ListItem type="button">
                            <ListItemText className={classes.menutext} primary="이미지 등록"></ListItemText>
                        </ListItem>
                    </Link>
                // <Link to="/step/imageUpload" className={classes.link}>
                //     <Collapse in={open} timeout="auto" unmountOnExit>
                //         <List component="div" disablePadding>
                //             <ListItem type="button" className={classes.nested}>
                //                 <ListItemIcon>
                //                     <AspectRatioIcon />
                //                 </ListItemIcon>
                //                 <ListItemText primary="이미지 등록" />
                //             </ListItem>
                //         </List>
                //     </Collapse>
                // </Link>
                    ):''}
                {/*<Link to="/Step/boundaryBox" className={classes.link}>*/}
                {/*    <Collapse in={open} timeout="auto" unmountOnExit>*/}
                {/*        <List component="div" disablePadding>*/}
                {/*            <ListItem type="button" className={classes.nested}>*/}
                {/*                <ListItemIcon>*/}
                {/*                    <AspectRatioIcon />*/}
                {/*                </ListItemIcon>*/}
                {/*                <ListItemText primary="사각형 지정" />*/}
                {/*            </ListItem>*/}
                {/*        </List>*/}
                {/*    </Collapse>*/}
                {/*</Link>*/}
                {loginUser.authorityNo === 2 && loginUser.groupAdmin === 0? (
                    <Link to="/step/polygon" className={classes.link}>
                        <ListItem type="button">
                            <ListItemText className={classes.menutext} primary="다각형 지정"></ListItemText>
                        </ListItem>
                    </Link>

                    // <Link to="/step/polygon" className={classes.link}>
                    //     <Collapse in={open} timeout="auto" unmountOnExit>
                    //         <List component="div" disablePadding>
                    //             <ListItem type="button" className={classes.nested}>
                    //                 <ListItemIcon>
                    //                     <FormatShapesIcon />
                    //                 </ListItemIcon>
                    //                 <ListItemText primary="다각형 지정" />
                    //             </ListItem>
                    //         </List>
                    //     </Collapse>
                    // </Link>
                ):''}

                {loginUser.isAdmin === 'Y'? (

                    <Link to="/step/polygon" className={classes.link}>
                        <ListItem type="button">
                            <ListItemText className={classes.menutext} primary="다각형 지정"></ListItemText>
                        </ListItem>
                    </Link>
                    // <Link to="/step/polygon" className={classes.link}>
                    //     <Collapse in={open} timeout="auto" unmountOnExit>
                    //         <List component="div" disablePadding>
                    //             <ListItem type="button" className={classes.nested}>
                    //                 <ListItemIcon>
                    //                     <FormatShapesIcon />
                    //                 </ListItemIcon>
                    //                 <ListItemText primary="다각형 지정" />
                    //             </ListItem>
                    //         </List>
                    //     </Collapse>
                    // </Link>

                ):''}
                {/* { loginUser.isAdmin === 'Y'?  (
                        <ListItem button>
                            <ListItemIcon><WallpaperIcon /></ListItemIcon>
                            <ListItemText type="button" onClick={handleClick2} primary="레이블링"></ListItemText>
                            {open2 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                ):''} */}
                {/* {loginUser.authorityNo > 1 ? (
                    <ListItem button>
                        <ListItemIcon><WallpaperIcon /></ListItemIcon>
                        <ListItemText type="button" onClick={handleClick2} primary="레이블링"></ListItemText>
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                ):''} */}
                {loginUser.isAdmin === 'Y'? (
                    <Link to="/step2" className={classes.link}>
                        <ListItem type="button">
                            <ListItemText className={classes.menutext} primary="기본 레이블링"></ListItemText>
                        </ListItem>
                    </Link>

                    // <Link to="/step2" className={classes.link}>
                    //     <Collapse in={open2} timeout="auto" unmountOnExit>
                    //         <List component="div" disablePadding>
                    //             <ListItem type="button" className={classes.nested}>
                    //                 <ListItemIcon>
                    //                     <FormatListBulletedIcon />
                    //                 </ListItemIcon>
                    //                 <ListItemText primary="기본 레이블링" />
                    //             </ListItem>
                    //         </List>
                    //     </Collapse>
                    // </Link>
                ):''}

                {loginUser.authorityNo === 1 && loginUser.groupAdmin !== 1? (

                    <Link to="/step2" className={classes.link}>
                        <ListItem type="button">
                            <ListItemText className={classes.menutext} primary="기본 레이블링"></ListItemText>
                        </ListItem>
                    </Link>
                // <Link to="/step2" className={classes.link}>
                //     <Collapse in={open2} timeout="auto" unmountOnExit>
                //         <List component="div" disablePadding>
                //             <ListItem type="button" className={classes.nested}>
                //                 <ListItemIcon>
                //                     <FormatListBulletedIcon />
                //                 </ListItemIcon>
                //                 <ListItemText primary="기본 레이블링" />
                //             </ListItem>
                //         </List>
                //     </Collapse>
                // </Link>
                    ):''}
                {loginUser.authorityNo === 2 && loginUser.groupAdmin !== 1? (

                    <Link to="/step2" className={classes.link}>
                        <ListItem type="button">
                            <ListItemText className={classes.menutext} primary="기본 레이블링"></ListItemText>
                        </ListItem>
                    </Link>
                    // <Link to="/step2" className={classes.link}>
                    //     <Collapse in={open2} timeout="auto" unmountOnExit>
                    //         <List component="div" disablePadding>
                    //             <ListItem type="button" className={classes.nested}>
                    //                 <ListItemIcon>
                    //                     <FormatListBulletedIcon />
                    //                 </ListItemIcon>
                    //                 <ListItemText primary="기본 레이블링" />
                    //             </ListItem>
                    //         </List>
                    //     </Collapse>
                    // </Link>
                ):''}

                {loginUser.authorityNo === 3 &&  loginUser.groupAdmin !== 1 ? (
                    <Link to="/step3" className={classes.link}>
                        <ListItem type="button">
                            <ListItemText className={classes.menutext} primary="전문 레이블링"></ListItemText>
                        </ListItem>
                    </Link>
                // <Link to="/step3" className={classes.link}>
                //     <Collapse in={open2} timeout="auto" unmountOnExit>
                //         <List component="div" disablePadding>
                //             <ListItem type="button" className={classes.nested}>
                //                 <ListItemIcon>
                //                     <PlaylistAddCheckIcon />
                //                 </ListItemIcon>
                //                 <ListItemText primary="전문 레이블링" />
                //             </ListItem>
                //         </List>
                //     </Collapse>
                // </Link>
                ):''}
                {loginUser.isAdmin === 'Y'? (
                    <Link to="/step3" className={classes.link}>
                        <ListItem type="button">
                            <ListItemText className={classes.menutext} primary="전문 레이블링"></ListItemText>
                        </ListItem>
                    </Link>
                // <Link to="/step3" className={classes.link}>
                //     <Collapse in={open2} timeout="auto" unmountOnExit>
                //         <List component="div" disablePadding>
                //             <ListItem type="button" className={classes.nested}>
                //                 <ListItemIcon>
                //                     <PlaylistAddCheckIcon />
                //                 </ListItemIcon>
                //                 <ListItemText primary="전문 레이블링" />
                //             </ListItem>
                //         </List>
                //     </Collapse>
                // </Link>
                ):''}
                {loginUser.isAdmin === 'Y' ? (
                    <Link to="/Step2/FinalCheckList" className={classes.link}>
                        <ListItem type="button">
                            <ListItemText className={classes.menutext} primary="검수"></ListItemText>
                        </ListItem>
                    </Link>
                // <Link to="/Step2/FinalCheckList" className={classes.link}>
                //     <Collapse in={open2} timeout="auto" unmountOnExit>
                //         <List component="div" disablePadding>
                //             <ListItem type="button" className={classes.nested}>
                //                 <ListItemIcon>
                //                     <PlaylistAddCheckIcon />
                //                 </ListItemIcon>
                //                 <ListItemText primary="검수" />
                //             </ListItem>
                //         </List>
                //     </Collapse>
                // </Link>
                    ):''}
                {loginUser.groupAdmin === 1 &&  loginUser.authorityNo > 1 ? (
                    <div>
                        <Link to="/SuccessList" className={classes.link}>
                            <ListItem type="button">
                                <ListItemText className={classes.menutext} primary="완료된 이미지"></ListItemText>
                            </ListItem>
                        </Link>
                        <Link to="/ProfessionalCheckList" className={classes.link}>
                            <ListItem type="button">
                                <ListItemText className={classes.menutext} primary="전문가 작업내용"></ListItemText>
                            </ListItem>
                        </Link>
                        <Link to="/Step2/HighCheckList" className={classes.link}>
                            <ListItem type="button">
                                <ListItemText className={classes.menutext} primary="기본 작업 내용"></ListItemText>
                            </ListItem>
                        </Link>
                    {/* <Link to="/SuccessList" className={classes.link}>
                        <Collapse in={open2} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem type="button" className={classes.nested}>
                                    <ListItemIcon>
                                        <PlaylistAddCheckIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="완료된 이미지"/>
                                </ListItem>
                            </List>
                        </Collapse>
                    </Link>
                        <Link to="/ProfessionalCheckList" className={classes.link}>
                            <Collapse in={open2} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem type="button" className={classes.nested}>
                                        <ListItemIcon>
                                            <PlaylistAddCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="전문가 작업내용" />
                                    </ListItem>
                                </List>
                            </Collapse>
                        </Link>
                        <Link to="/Step2/HighCheckList" className={classes.link}>
                            <Collapse in={open2} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem type="button" className={classes.nested}>
                                        <ListItemIcon>
                                            <PlaylistAddCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="기본 작업 내용" />
                                    </ListItem>
                                </List>
                            </Collapse>
                        </Link> */}
                    </div>
                ):''}
                {loginUser.groupAdmin !== 1 &&  loginUser.authorityNo === 3 ? (
                    <div>
                        <Link to="/Step2/HighCheckList" className={classes.link}>
                            <ListItem type="button">
                                <ListItemText className={classes.menutext} primary="기본작업 검수"></ListItemText>
                            </ListItem>
                        </Link>
                        <Link to="/Step2/FinalCheckList" className={classes.link}>
                            <ListItem type="button">
                                <ListItemText className={classes.menutext} primary="작업내용 체크"></ListItemText>
                            </ListItem>
                        </Link>
                        {/* <Link to="/Step2/HighCheckList" className={classes.link}>
                            <Collapse in={open2} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem type="button" className={classes.nested}>
                                        <ListItemIcon>
                                            <PlaylistAddCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="기본작업 검수" />
                                    </ListItem>
                                </List>
                            </Collapse>
                        </Link>
                        <Link to="/Step2/FinalCheckList" className={classes.link}>
                            <Collapse in={open2} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem type="button" className={classes.nested}>
                                        <ListItemIcon>
                                            <PlaylistAddCheckIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="작업내용 체크" />
                                    </ListItem>
                                </List>
                            </Collapse>
                        </Link> */}
                        {/*<Link to="/Step2/Test" className={classes.link}>*/}
                        {/*    <Collapse in={open2} timeout="auto" unmountOnExit>*/}
                        {/*        <List component="div" disablePadding>*/}
                        {/*            <ListItem type="button" className={classes.nested}>*/}
                        {/*                <ListItemIcon>*/}
                        {/*                    <PlaylistAddCheckIcon />*/}
                        {/*                </ListItemIcon>*/}
                        {/*                <ListItemText primary="Test" />*/}
                        {/*            </ListItem>*/}
                        {/*        </List>*/}
                        {/*    </Collapse>*/}
                        {/*</Link>*/}
                    </div>
                ):''}
                    </List>
            <Divider />
            {loginUser.isAdmin === 'Y' ? (
                <div>
                        <ListItem type="button">
                            <ListItemIcon><WallpaperIcon /></ListItemIcon>
                            <ListItemText type="button" onClick={handleClickAdmin} primary="관리자 메뉴"></ListItemText>
                            {open1 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                    <Link to="/SignUpTag" className={classes.link}>
                        <Collapse in={open1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem type="button" className={classes.nested}>
                                    <ListItemIcon>
                                        <AspectRatioIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="관리자 추가" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </Link>
                    <Link to="/admin/createGroup" className={classes.link}>
                        <Collapse in={open1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem type="button" className={classes.nested}>
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
                                <ListItem type="button" className={classes.nested}>
                                    <ListItemIcon>
                                        <AspectRatioIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="작업자 등록" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </Link>
                    <Link to="/admin/userWork" className={classes.link}>
                        <Collapse in={open1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem type="button" className={classes.nested}>
                                    <ListItemIcon>
                                        <AspectRatioIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="작업 지정" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </Link>
                    </div>):''}
            {loginUser.groupAdmin === 1 && loginUser.authorityNo !== 1 && loginUser.authorityNo !== 4?(
                <div>
                    <Link to="/admin/userList" className={classes.link}>
                        <ListItem type="button">
                            <ListItemText className={classes.menutext} primary="작업자 등록"></ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/admin/userWork" className={classes.link}>
                        <ListItem type="button">
                            <ListItemText className={classes.menutext} primary="작업 지정"></ListItemText>
                        </ListItem>
                    </Link>
                        {/* <ListItem type="button">
                            <ListItemIcon><WallpaperIcon /></ListItemIcon>
                            <ListItemText type="button" onClick={handleClickAdmin} primary="관리자 메뉴"></ListItemText>
                            {open1 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                    <Link to="/admin/userList" className={classes.link}>
                        <Collapse in={open1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem type="button" className={classes.nested}>
                                    <ListItemIcon>
                                        <AspectRatioIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="작업자 등록" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </Link>
                    <Link to="/admin/userWork" className={classes.link}>
                        <Collapse in={open1} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem type="button" className={classes.nested}>
                                    <ListItemIcon>
                                        <AspectRatioIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="작업 지정" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </Link> */}
                </div>
            ):''}
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