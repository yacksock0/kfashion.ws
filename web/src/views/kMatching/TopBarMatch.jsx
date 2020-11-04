import React, { Component } from 'react'
import { withStyles  } from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";
import { ReactComponent as LogoDailyCody } from '../../images/LogoDailyCody.svg';
import { ReactComponent as LogoutIcon } from '../../images/LogoutIcon.svg';
import { ReactComponent as JoinIcon } from '../../images/JoinIcon.svg';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {inject, observer} from "mobx-react";
import {ReactComponent as LogoTrandSearch} from "../../images/LogoTrandSearch.svg";
import {ReactComponent as AdminIcon} from "../../images/AdminIcon.svg";


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
    logoimg:{
        marginTop:10,
    },
    rightbox:{
        display:'flex',
        cursor:'pointer',
        justifyContent:'flex-end',
        marginBottom:10,
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
        marginLeft:20,
    },
    adminbox:{
        width:'auto',
        height:'38px',
        borderRadius:'19px',
        background:'#f5f5f5',
        padding:'5px 15px',
        display:'flex',
        boxSizing:'border-box',
    },
});


class TopBarMatch extends Component{
    goHome = () => {
        this.props.history.push('/matching/home')
    }
    doJoin = () => {
        this.props.history.push('/matching/agree')
    }
    render() {
        const { classes } = this.props;
        const { isLoggedIn, doLogout, loginUser} = this.props;
        return (
            <div className={classes.root}>
                <React.Fragment>
                    <Container minwidth="xl">
                        <Grid item xs={12} className={classes.gridcontainer}>
                            <LogoDailyCody className={classes.logoimg} onClick={() => this.goHome()} cursor={'pointer'}/>
                            <Paper elevation={0} className={classes.right}>
                                <Paper elevation={0} className={classes.rightbox}>
                                    {isLoggedIn &&
                                    <Paper elevation={0} className={classes.adminbox}>
                                        <AdminIcon/><Typography>{loginUser.id}</Typography>
                                    </Paper>
                                    }
                                    {/* <Typography className={classes.iconstyle} ><JoinIcon /></Typography> */}
                                    {isLoggedIn ?
                                        <Typography className={classes.iconstyle}
                                                    onClick={doLogout}><LogoutIcon/></Typography>:
                                        <Typography className={classes.iconstyle} onClick={this.doJoin}> <JoinIcon/></Typography>
                                    }
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

export default withRouter(withStyles(style)(TopBarMatch));
