import React, { Component } from 'react'
import { withStyles  } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DropZone from './DropZoneSearch';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import imgfile from '../../../images/test1.png';
import {inject, observer} from "mobx-react";


const style = theme => ({
    root: {
        margin:'0 auto',
        flexWrap: '1',
        paddingTop: 0,
    },
    gridcontainer:{
        display:'flex',
        justifyContent:'space-between', 
        margin:'0 auto', 
    },
    titletext: {
        width:'220px',
        textAlign:'left',
        fontFamily:'Montserrat',
        fontSize:'24px',
        fontWeight:'bold',  
        borderBottom:'solid 4px #5ebf9b',
        marginBottom:26,
    },
    textstyle: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        textAlign:'left',
        height:'30px',
        color: '#26151b',
        fontWeight:'500',
    },
    titlestyle1: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        textAlign:'left',
        marginBottom:50,
        marginLeft:-20,
        color: '#26151b',
        fontWeight:'500',
    },
    imagebox: {
        display: 'flex',
        flexWrap: '1',
        height: 450,
        justifyContent: 'space-around',
        // overflowY:'scroll',
        backgroundColor: theme.palette.background.paper,
        border:'solid 1px rgba(94,191,155,1)', 
    },
    imageboxin:{
        width:'100%',
        height: 'auto',
    },
    imgtext: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'14px',
        fontWeight:'bold',  
        margin:'30px 0 10px',
    },
    countcolor: {
        color:'#5ebf9b'
    },
    btnstyle: {
        width:'120px',
        height:'32px',
        background:'#38a67e',
        fontSize:10,
        color:'#fff',
        fontFamily:'NotoSansCJKkr',
        fontWeight:'bold',
        margin:'0 10px 30px 0',

        "&:hover": {
            background:'#38a67e', 
        }
    },
    imgboxin: {
        width:'100%',
        margin:'0 auto',
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'center',
        marginBottom:'20px',  
        alignItems: 'center',   
    },
    imagefile:{margin:5,width:'60%',height:'auto'},
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

@inject('sImageStore')
@observer
class ImageSearch extends Component{
    render() {
        const { classes } = this.props;
        // const { classes } = this.props.sImageStore;

        return (
            <div className={classes.root}>
                <React.Fragment>
                    <Container minwidth="xl">
                        <Typography className={classes.titlestyle1}>패션 이미지 업로드시<br />해당 패션아이템을 추천받을 수 있습니다</Typography>
                        <Grid item xs={12} className={classes.gridcontainer}>
                        
                            <Hidden smDown>
                                <Paper elevation={0} style={{width:'49%'}}>
                                    <Typography className={classes.titletext}>Tagging Service</Typography>
                                    <Typography className={classes.textstyle}>패션 이미지(1ea) 업로드시 해당 패션 아이템의 분석결과파일을 제공합니다</Typography>
                                    <DropZone  />
                                </Paper>
                                <Paper elevation={0} style={{width:'49%'}}>
                                    <Typography className={classes.titletext}>Analysis Result</Typography>
                                    <Typography className={classes.textstyle}>업로드한 분석결과를 원하는 파일형식으로 다운로드하세요.</Typography>

                                    <div className={classes.imagebox}>
                                        <Paper elevation={0} className={classes.imageboxin}>
                                            <Typography className={classes.imgtext}>
                                                <span className={classes.countcolor}>이미지</span> PREVIEW
                                            </Typography>

                                            {/* 업로드 이미지 들어가는영역 */}
                                            <Paper elevation={0} className={classes.imgboxin}>
                                                <img src={imgfile} className={classes.imagefile} alt="image01"/>
                                            </Paper>
                                        </Paper>
                                    </div>
                                </Paper>
                            </Hidden>

                            <Hidden mdUp>
                                <Paper elevation={0} style={{width:'100%'}}>
                                    <Typography className={classes.titletext}>Tagging Service</Typography>
                                    <Typography className={classes.textstyle}>패션 이미지(1ea) 업로드시 해당 패션 아이템의 분석결과파일을 제공합니다</Typography>
                                    <DropZone  />

                                    <Typography className={classes.titletext}>Analysis Result</Typography>
                                    <Typography className={classes.textstyle}>업로드한 분석결과를 원하는 파일형식으로 다운로드하세요.</Typography>

                                    <div className={classes.imagebox}>
                                        <Paper elevation={0} className={classes.imageboxin}>
                                            <Typography className={classes.imgtext}>
                                                <span className={classes.countcolor}>이미지</span> PREVIEW
                                            </Typography>
                                            
                                            {/* 업로드 이미지 들어가는영역 */}
                                            <Paper elevation={0} className={classes.imgboxin}>
                                                <img src={imgfile} className={classes.imagefile} alt="image01"/> 
                                            </Paper>  
                                        </Paper>
                                    </div>
                                </Paper>
                            </Hidden>
                        </Grid>
                        {/*<Button variant="contained" className={classes.btnsend}>적용하기</Button>*/}
                        <br/>
                    </Container>
                </React.Fragment>
            </div>
        )
    }
}

export default withStyles(style)(ImageSearch);

