import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Grid, Button, Typography} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";

export default class WorkedImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workNo:0,
            text: 'text',
        }
    }
    componentDidMount() {
    }
    render() {
        return (
            <div style={{textAlign:'center'}}>
            <Typography variant="h5" component="h2">
                이전작업
            </Typography>
            <Grid container={12}>
                <Grid item xs={12} lg={6} style={{marginTop:10}}>
                    <img src='http://placeimg.com/100/100/any' />
                </Grid>
                <Grid item xs={12} lg={6} style={{marginTop:10}}>
                    <img src='http://placeimg.com/100/100/any' />
                </Grid>
                <Grid item xs={12} lg={6} style={{marginTop:10}}>
                    <img src='http://placeimg.com/100/100/any' />
                </Grid>
                <Grid item xs={12} lg={6} style={{marginTop:10}}>
                    <img src='http://placeimg.com/100/100/any' />
                </Grid>
                <Grid item xs={12} lg={6} style={{marginTop:10}}>
                    <img src='http://placeimg.com/100/100/any' />
                </Grid>
                <Grid item xs={12} lg={6} style={{marginTop:10}}>
                    <img src='http://placeimg.com/100/100/any' />
                </Grid>
                <Grid item xs={12} lg={6} style={{marginTop:10}}>
                    <img src='http://placeimg.com/100/100/any' />
                </Grid>
                <Grid item xs={12} lg={6} style={{marginTop:10}}>
                    <img src='http://placeimg.com/100/100/any' />
                </Grid>
                <Grid item xs={12} lg={6} style={{marginTop:10}}>
                    <img src='http://placeimg.com/100/100/any' />
                </Grid>
                <Grid item xs={12} lg={6} style={{marginTop:10}}>
                    <img src='http://placeimg.com/100/100/any' />
                </Grid>
                <Grid item xs={12} lg={6} style={{marginTop:10}}>
                    <img src='http://placeimg.com/100/100/any' />
                </Grid>
                <Grid item xs={12} lg={6} style={{marginTop:10}}>
                    <img src='http://placeimg.com/100/100/any' />
                </Grid>
                <Grid item xs={12} lg={6} style={{marginTop:10}}>
                    <img src='http://placeimg.com/100/100/any' />
                </Grid>
                <Grid item xs={12} lg={6} style={{marginTop:10}}>
                    <img src='http://placeimg.com/100/100/any' />
                </Grid>
            </Grid>
            </div>
        );
    }
}