import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import { ReactComponent as Logo } from '../../images/logo.svg';
import { ReactComponent as Logout } from '../../images/logout.svg';
import { ReactComponent as LogoutIcon } from '../../images/LogoutIcon.svg';
import { ReactComponent as JoinIcon } from '../../images/JoinIcon.svg';
import { ReactComponent as LoginIcon } from '../../images/LoginIcon.svg';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {IconButton} from "@material-ui/core";
import { ReactComponent as AdminIcon } from '../../images/AdminIcon.svg';


const style = theme => ({
    root: {
        [theme.breakpoints.down('xs')]: {
            marginTop:20
        },
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
        justifyContent:'flex-end',
        marginBottom:20,
    },
    right: {
        [theme.breakpoints.down('sm')]: {
            [theme.breakpoints.down('xs')]: {
                width:'55%',
            },
            width:'70%',
        },
        width:'80%',
    },
    iconstyle:{
        fontFamily:'Montserrat',
    },
    adminbox:{
        width:'auto',
        height:'38px',
        borderRadius:'19px',
        background:'#f5f5f5',
        padding:'5px 15px',
        display:'flex',
        boxSizing:'border-box',
        marginRight:10,
    },
    userstyle:{
        fontFamily:'Montserrat',
        marginRight:20,
    },

});

class TopBarTag extends Component{
    goHome = () => {
        this.props.history.push('/tagging/home')
    }
    doJoin = () => {
        this.props.history.push('/tagging/agree')
    }
    render() {
        const {classes} = this.props;
        const {mobileOpen, setMobileOpen, isLoggedIn, doLogout, loginUser} = this.props;
        return (
            <div className={classes.root}>
                <React.Fragment>
                    <Container minWidth="xl">
                        <Grid item xs={12} className={classes.gridcontainer}>
                            <Paper elevation={0} className={classes.logobox}>
                                <Logo className={classes.logoimg}
                                      onClick={() => this.goHome()} cursor={'pointer'}
                                />
                            </Paper>
                            <Paper elevation={0} className={classes.right}>

                                <Paper elevation={0} className={classes.rightbox}>

                                    {isLoggedIn &&
                                    <Paper elevation={0} className={classes.adminbox}>

                                        <AdminIcon style={{marginRight:10}}/><Typography>{loginUser.id}</Typography>

                                    </Paper>
                                    }
                                    {isLoggedIn ?
                                        <Typography className={classes.userstyle}
                                                    onClick={doLogout}><LogoutIcon/></Typography>:
                                        <Typography className={classes.userstyle} onClick={this.doJoin}> <JoinIcon/></Typography>
                                    }
                                </Paper>
                                <hr/>
                            </Paper>

                        </Grid>
                    </Container>
                </React.Fragment>
            </div>
        )
    }
}

export default withRouter(withStyles(style)(TopBarTag));

