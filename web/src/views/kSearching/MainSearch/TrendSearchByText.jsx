import React, { Component } from 'react'
import { withStyles  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextSearch  from './TextSearch ';
import ImageSearch  from './ImageSearch';
import SearchImage from './ImageListSearch';
import ScrollToTop from "react-scroll-to-top";

import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';

const style = theme => ({
    root: {
        margin:'0 auto',
        fontFamily: 'NotoSansCJKkr',
       
        "& .styles_scroll-to-top__2A70v":{
            background:'#000',
            borderRadius:'50px',
            width:'50px',
            height:'50px',
            padding:15,
        },
    },
    txtresultbox: {
        display:'flex',  
    },
    txtline: {
        [theme.breakpoints.down('xs')]: {
            marginTop:15,
        },
        width:'40%',
        height:'1px',
        border:0,
        background:'#707070',
        marginTop:22,
    },
    txtresult: {
        [theme.breakpoints.down('md')]: {
            [theme.breakpoints.down('sm')]: {
                [theme.breakpoints.down('xs')]: {
                    fontSize:'20px',
                },
                fontSize:'25px',
            },
            fontSize:'30px',
        },
        fontFamily:'NotoSansCJKkr', 
        width:'20%',
        fontSize:'34px',
        fontWeight:'300',
    },
    btnmorebox: {
        display:'flex',
        justifyContent:'flex-end',
    },
    btnmore: {
        width:'182px',
        height:'56px',
        borderColor:'#26151b',
        color:'#26151b',
        fontWeight:'bold',
    },
    btnsend: {
        width:'190px',
        height:'56px',
        background:'#26151b',
        color:'#fff', 
        margin:'30px auto 70px',
        fontWeight:'500',
        fontFamily:'NotoSansCJKkr', 

        "&:hover": {
            background:'#26151b',
        },
    },   
});

class TrendSearchByText extends Component{
      
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <ScrollToTop smooth color="#fff" />
                <Container minwidth="xl">
                    
                    <Paper elevation={0} component="form">
                        <TextSearch  />
                        {/* <ImageSearch /> */}
                        <Paper elevation={0} className={classes.txtresultbox}>
                        <hr className={classes.txtline} />
                        <Typography className={classes.txtresult}>검색 결과</Typography>
                        <hr className={classes.txtline} /> 
                        </Paper>
                        <Paper elevation={0} className={classes.btnmorebox}>
                            <Button variant="outlined" className={classes.btnmore}>이미지 더보기 <ArrowForwardRoundedIcon /></Button>  
                        </Paper>
                        <SearchImage />
                        <Button variant="contained" startIcon={<SaveAltRoundedIcon />} className={classes.btnsend}> 검색된 이미지 저장</Button>
                    </Paper>
                </Container>
            </div> 
        )
    }
  
}

export default withStyles(style)(TrendSearchByText);
