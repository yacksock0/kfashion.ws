import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DropZone from './MainTag/DropZone';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import imgfile from '../Test/images/test1.png';


const useStyles = makeStyles((theme) => ({
    root: {
        margin:'0 auto',
        flexWrap: '1',
        paddingTop: 40,
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
        borderBottom:'solid 4px #526af2',
        marginBottom:26,
    },
    textstyle: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'15px',
        textAlign:'left',
        height:'50px',
    },
    imagebox: {
        display: 'flex',
        flexWrap: '1',
        height: 450,
        justifyContent: 'space-around',
        overflowY:'scroll',
        backgroundColor: theme.palette.background.paper,
        border:'solid 1px rgba(82,106,242,0.5)', 
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
        color:'#526af2'
    },
    btnstyle: {
        width:'120px',
        height:'32px',
        background:'#526af2',
        fontSize:10,
        color:'#fff',
        fontFamily:'NotoSansCJKkr',
        fontWeight:'bold',
        margin:'0 10px 30px 0',

        "&:hover": {
            background:'#526af2', 
        }
    },
    imgboxin: {
        width:'85%',
        margin:'0 auto',
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'center',
        marginBottom:'20px',  
        alignItems: 'center', 
        
    },
    imagefile:{margin:5,width:'210px',height:'225px'}

}));

export default function TopBar(){
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <React.Fragment>
                <Container maxWidth="xl">
                    <Grid item xs={12} className={classes.gridcontainer}>
                        <Hidden smDown>
                            <Paper elevation={0} style={{width:'49%'}}>
                                <Typography className={classes.titletext}>Tagging Service</Typography>
                                <Typography className={classes.textstyle}>패션 이미지 또는 폴더 업로드시 해당 패션 아이템의 분석결과파일을 제공합니다.</Typography>
                                <DropZone  />


                            </Paper>
                            <Paper elevation={0} style={{width:'49%'}}>
                                <Typography className={classes.titletext}>Analysis Result</Typography>
                                <Typography className={classes.textstyle}>업로드한 분석결과를 원하는 파일형식으로 다운로드하세요.</Typography>

                                <div className={classes.imagebox}>
                                    <Paper elevation={0} className={classes.imageboxin}>
                                        <Typography className={classes.imgtext}>
                                            <span className={classes.countcolor}>총 50건</span>의 이미지 태깅 완료
                                        </Typography>
                                        <Button variant="contained" className={classes.btnstyle} >TEXT다운로드</Button>
                                        <Button variant="contained" className={classes.btnstyle}>CSV다운로드</Button>
                                        <Button variant="contained" className={classes.btnstyle}>EXCEL다운로드</Button>
                                        <br />
                                        
                                        {/* 업로드 이미지 들어가는영역 */}
                                        <Paper elevation={0} className={classes.imgboxin}>
                                        
                                            <img src={imgfile} className={classes.imagefile} alt="image01"/>
                                            <img src={imgfile} className={classes.imagefile} alt="image01"/>
                                            <img src={imgfile} className={classes.imagefile} alt="image01"/>
                                            <img src={imgfile} className={classes.imagefile} alt="image01"/>
                                            <img src={imgfile} className={classes.imagefile} alt="image01"/>
                                            {/* <img src={imgfile} className={classes.imagefile}/>  */}
                                            
                                        </Paper>
                                    </Paper>
                                </div>
                            </Paper>
                        </Hidden>

                        <Hidden mdUp>
                            <Paper elevation={0} style={{width:'100%'}}>
                                <Typography className={classes.titletext}>Tagging Service</Typography>
                                <Typography className={classes.textstyle}>패션 이미지 또는 폴더 업로드시 해당 패션 아이템의 분석결과파일을 제공합니다.</Typography>
                                <DropZone  />

                                <Typography className={classes.titletext}>Analysis Result</Typography>
                                <Typography className={classes.textstyle}>업로드한 분석결과를 원하는 파일형식으로 다운로드하세요.</Typography>

                                <div className={classes.imagebox}>
                                    <Paper elevation={0} className={classes.imageboxin}>
                                        <Typography className={classes.imgtext}>
                                            <span className={classes.countcolor}>총 50건</span>의 이미지 태깅 완료
                                        </Typography>
                                        
                                        <Paper elevation={0}>
                                            <Button variant="contained" className={classes.btnstyle} >TEXT다운로드</Button>
                                            <Button variant="contained" className={classes.btnstyle} >CSV다운로드</Button>
                                            <Button variant="contained" className={classes.btnstyle} >EXCEL다운로드</Button>
                                        </Paper>
                                        <br />
                                        {/* 업로드 이미지 들어가는영역 */}
                                        <Paper elevation={0} className={classes.imgboxin}>
                                            <img src={imgfile} className={classes.imagefile} alt="image01"/> 
                                        </Paper>  
                                    </Paper>
                                </div>
                            </Paper>
                            
                        </Hidden>
                    </Grid>
                 </Container>
            </React.Fragment>
        </div>
    )
  
}


