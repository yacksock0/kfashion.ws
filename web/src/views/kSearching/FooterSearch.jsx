import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin:'72px auto 20px',
    },
    footertext: {
        fontFamily:'Montserrat',
        fontSize:'12px',
        color: '#4c4c53',
    },
}));


export default function FooterSearch(){
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <hr/>
            <Typography className={classes.footertext}>COPYRIGHT &copy; 2020 OPINION LIVE ALL RIGHTS RESERVED </Typography>
        </div>
    )
  
}
