import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        border: '1px solid black',
        borderRadius: 15,
        padding:10
    },
    topBox:{
        borderBottom:'1px solid black',
        textAlign:'center',
        width:80,
        display:'block',
        margin:'auto',
        padding:0
    },
    imgBox:{
        width:80,
        height:80,
        display:'block',
        margin:'auto',
        padding:3,
    }
}));

export default function WorkedImg() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid item xs={12}>
                <div className={classes.topBox}>
                    <h2>이전작업</h2>
                </div>
                <Button className={classes.imgBox} onClick={()=>this.handleClick}>
                <img src='https://placeimg.com/80/80/any'  style={{width:'100%', height:'100%'}}/>
                </Button>
                <Button className={classes.imgBox}>
                    <img src='https://placeimg.com/80/80/any'  style={{width:'100%', height:'100%'}}/>
                </Button>
                <Button className={classes.imgBox}>
                    <img src='https://placeimg.com/80/80/any'  style={{width:'100%', height:'100%'}}/>
                </Button>
                <Button className={classes.imgBox}>
                    <img src='https://placeimg.com/80/80/any'  style={{width:'100%', height:'100%'}}/>
                </Button>
                <Button className={classes.imgBox}>
                    <img src='https://placeimg.com/80/80/any'  style={{width:'100%', height:'100%'}}/>
                </Button>
                <Button className={classes.imgBox}>
                    <img src='https://placeimg.com/80/80/any'  style={{width:'100%', height:'100%'}}/>
                </Button>
                <Button className={classes.imgBox}>
                    <img src='https://placeimg.com/80/80/any'  style={{width:'100%', height:'100%'}}/>
                </Button>
                <Button className={classes.imgBox}>
                    <img src='https://placeimg.com/80/80/any'  style={{width:'100%', height:'100%'}}/>
                </Button>
                <Button className={classes.imgBox}>
                    <img src='https://placeimg.com/80/80/any'  style={{width:'100%', height:'100%'}}/>
                </Button>
                <Button className={classes.imgBox}>
                    <img src='https://placeimg.com/80/80/any'  style={{width:'100%', height:'100%'}}/>
                </Button>
            </Grid>
        </div>
    );
}