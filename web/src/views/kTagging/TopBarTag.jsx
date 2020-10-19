import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as Logo } from '../../images/logo.svg';
import { ReactComponent as Logout } from '../../images/logout.svg';
import { ReactComponent as JoinIcon } from '../../images/JoinIcon.svg';
import { ReactComponent as LoginIcon } from '../../images/LoginIcon.svg';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {IconButton} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        margin:'52px auto 30px',
        flexGrow: 1,
    },
    gridcontainer:{
        display:'flex',
        justifyContent:'space-between',
        margin:'0 auto',
    },
    logobox:{
        width:'179px',
        height:'95px',
        background:'#526af2',
        borderRadius:0,
    },
    logoimg:{
        margin:'35px 0 0 -30px',
    },
    rightbox:{
        display:'flex',
        cursor:'pointer',
        height:'30px',
    },
    userstyle:{
        fontFamily:'Montserrat',
        marginRight:20,
    },

}));


export default function TopBarTag(props){
    const classes = useStyles();
    const { mobileOpen, setMobileOpen, isLoggedIn, doLogout, loginUser, goHome} = props;
    return (
        <div className={classes.root}>
            <React.Fragment>
                <Container maxWidth="xl">
                    <Grid item xs={12} className={classes.gridcontainer}>
                        <Paper elevation={0} className={classes.logobox}>
                            <Logo className={classes.logoimg}
                                  onClick={goHome}/>
                        </Paper>
                        <Paper elevation={0} className={classes.rightbox}>
                            <Typography className={classes.userstyle} >  <JoinIcon /></Typography>
                            <Typography className={classes.userstyle} >  <LoginIcon /></Typography>
                            {isLoggedIn &&
                                <Typography className={classes.userstyle}
                                        onClick={doLogout}> <ExitToAppIcon/></Typography>
                            }
                        </Paper>
                    </Grid>
                </Container>
            </React.Fragment>
        </div>
    )

}
