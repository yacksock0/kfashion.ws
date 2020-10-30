import React, { Component } from 'react'
import { withStyles  } from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import { ReactComponent as LogoTrandSearch } from '../../images/LogoTrandSearch.svg';
import { ReactComponent as LogoutIcon } from '../../images/LogoutIcon.svg';
import { ReactComponent as AdminIcon } from '../../images/AdminIcon.svg';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {inject, observer} from "mobx-react";


const style = theme => ({
    root: {
        [theme.breakpoints.down('xs')]: {
            marginTop:20
        },
        margin:'52px auto 20px',   
        flexGrow: 1, 
        
    },
    gridcontainer:{
        display:'flex',
        justifyContent:'space-between', 
        margin:'0 auto', 
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
    userstyle:{
        fontFamily:'Montserrat',
        marginRight:20,
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
});

@inject('sAuthStore')
@observer
class TopBarSearch extends Component{
    goHome = () => {
        this.props.history.push('/searching/home')
    }
    render() {
        const { classes } = this.props;
        const { isLoggedIn, doLogout, loginUser} = this.props;
        return (
            <div className={classes.root}>
                <React.Fragment>
                    <Container minwidth="xl">
                        <Grid item xs={12} className={classes.gridcontainer}>
                            <LogoTrandSearch className={classes.logoimg} onClick={() => this.goHome()} cursor={'pointer'}/>
                            <Paper elevation={0} className={classes.right}>
                                <Paper elevation={0} className={classes.rightbox}>
                                    {isLoggedIn &&
                                    <Paper elevation={0} className={classes.adminbox}>
                                        <AdminIcon/><Typography>{loginUser.id}</Typography>
                                    </Paper>
                                    }

                                    {/* <Typography className={classes.iconstyle} ><JoinIcon /></Typography> */}
                                    <Typography className={classes.iconstyle}
                                                onClick={doLogout}><LogoutIcon /></Typography>
                                </Paper>
                                <hr />
                            </Paper>
                        </Grid>
                    </Container>
                </React.Fragment>
            </div>
        )
    }
}

export default withRouter(withStyles(style)(TopBarSearch));
