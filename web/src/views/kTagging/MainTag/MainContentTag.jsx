import React, { Component } from 'react'
import { Hidden, Grid, Container, Button, Typography, CircularProgress, Paper  } from '@material-ui/core';
import DropZone from './DropZone';
import ImageUpload from './ImageUploadTag'
import {STATE} from '../../../common/state';


//2020.10.15 inject 이지현 추가
import { inject, observer } from "mobx-react";
import { withStyles } from '@material-ui/styles';


const style = theme => ({
    root: {
        margin: '0 auto',
        flexWrap: '1',
        paddingTop: 40,
    },
    gridcontainer: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '0 auto',
    },
    titletext: {
        width: '220px',
        textAlign: 'left',
        fontFamily: 'Montserrat',
        fontSize: '24px',
        fontWeight: 'bold',
        borderBottom: 'solid 4px #526af2',
        marginBottom: 26,
    },
    // textstyle: {
    //     fontFamily: 'NotoSansCJKkr',
    //     fontSize: '15px',
    //     textAlign: 'left',
    //     height: '50px',
    // },
    // countcolor: {
    //     color: '#526af2'
    // },
    textstyle: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        textAlign:'left',
        height:'30px',
        fontWeight:'500',
    },
    countcolor: {
        fontFamily:'NotoSansCJKkr',
        color:'#526af2',
    },

    imagebox: {
        display: 'flex',
        flexWrap: '1',
        height: 450,
        justifyContent: 'space-around',
        overflowY: 'scroll',
        backgroundColor: theme.palette.background.paper,
        border: 'solid 1px rgba(82,106,242,0.5)',
    },
    imageboxin: {
        width: '100%',
        height: 'auto',
        display: 'block'
    },
    imgtext: {
        fontFamily: 'NotoSansCJKkr',
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '30px 0 10px',
    },

    btnstyle: {
        width: '120px',
        height: '32px',
        background: '#526af2',
        fontSize: 10,
        color: '#fff',
        fontFamily: 'NotoSansCJKkr',
        fontWeight: '300',
        margin: '0 10px 30px 0',

        "&:hover": {
            background: '#526af2',
        }
    },

    //20.10.16 이지현 변경
    imgboxin: {
        //80%
        width: '100%',
        margin: '0 auto',
        //disp = flex
        display: '',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        //margin bottom : 20px;

    },
    imagefile: { margin: 5, width: '210px', height: '225px' }
});



@inject('tImageStore')
@observer
class MainContentTag extends React.Component {
    render() {
        //20.10.16 이지현 추가
        const { maxValue, fileTotal, count, State } = this.props.tImageStore;
        const { classes } = this.props;
        this.someImage = '태깅';
        this.message = '완료 된 이미지가 없습니다';
        if (maxValue === 0) {
            if (fileTotal >= 1) {
                if (fileTotal === count) {
                    this.someImage = `총${maxValue}건`;
                    this.message = '의 이미지 태깅완료'
                }
            }
        } else {
            if (fileTotal >= 1) {
                this.someImage = `총${maxValue}건`;
                this.message = '의 이미지 태깅완료'
                if (fileTotal === count) {
                    this.someImage = `총${maxValue}건`;
                    this.message = '의 이미지 태깅완료'
                }
            }
        }


        return (
            <div className={classes.root}>
                <React.Fragment>
                    <Container minWidth="xl">
                        <Grid item xs={12} className={classes.gridcontainer}>
                            <Hidden smDown>
                                <Paper elevation={0} style={{ width: '49%' }}>
                                    <Typography className={classes.titletext}>Tagging Service</Typography>
                                    <Typography className={classes.textstyle}>패션 이미지 또는 폴더 업로드시 해당 패션 아이템의 분석결과파일을 제공합니다.</Typography>
                                    <DropZone />
                                </Paper>
                                <Paper elevation={0} style={{ width: '49%' }}>
                                    <Typography className={classes.titletext}>Analysis Result</Typography>
                                    <Typography className={classes.textstyle}>업로드한 분석결과를 원하는 파일형식으로 다운로드하세요.</Typography>

                                    <div className={classes.imagebox}>
                                        <Paper elevation={0} className={classes.imageboxin}>
                                            <Typography className={classes.imgtext}>
                                                <span className={classes.countcolor}>{this.someImage}</span>{this.message}
                                            </Typography>
                                            <Button variant="contained"
                                                    className={classes.btnstyle}
                                                    disabled={State === STATE.PENDING}>
                                                {/*{State !== STATE.PENDING ? "TEXT다운로드" : <CircularProgress size={10}/>}*/}
                                                TEXT다운로드
                                            </Button>
                                            <Button variant="contained"
                                                    className={classes.btnstyle}
                                                    disabled={State === STATE.PENDING}>
                                                CSV다운로드
                                            </Button>
                                            <Button variant="contained"
                                                    className={classes.btnstyle}
                                                    disabled={State === STATE.PENDING}>
                                                EXCEL다운로드
                                            </Button>
                                            <br />

                                            {/* 업로드 이미지 들어가는영역 */}
                                            <Paper elevation={0} className={classes.imgboxin}>
                                                {/* 2020.10.15 일단 테이블 삽입 이지현 */}
                                                <ImageUpload />
                                            </Paper>
                                        </Paper>
                                    </div>
                                </Paper>
                            </Hidden>

                            <Hidden mdUp>
                                <Paper elevation={0} style={{ width: '100%' }}>
                                    <Typography className={classes.titletext}>Tagging Service</Typography>
                                    <Typography className={classes.textstyle}>패션 이미지 또는 폴더 업로드시 해당 패션 아이템의 분석결과파일을 제공합니다.</Typography>
                                    <DropZone />

                                    <Typography className={classes.titletext}>Analysis Result</Typography>
                                    <Typography className={classes.textstyle}>업로드한 분석결과를 원하는 파일형식으로 다운로드하세요.</Typography>

                                    <div className={classes.imagebox}>
                                        <Paper elevation={0} className={classes.imageboxin}>
                                            <Typography className={classes.imgtext}>
                                                <span className={classes.countcolor}>{this.someImage}</span><a>{this.message}</a>
                                            </Typography>

                                            <Paper elevation={0}>
                                                <Button variant="contained"
                                                        className={classes.btnstyle}
                                                        disabled={State === STATE.PENDING}>
                                                    TEXT다운로드
                                                </Button>
                                                <Button variant="contained"
                                                        className={classes.btnstyle}
                                                        disabled={State === STATE.PENDING}>
                                                    CSV다운로드
                                                </Button>
                                                <Button variant="contained"
                                                        className={classes.btnstyle}
                                                        disabled={State === STATE.PENDING}>
                                                    EXCEL다운로드
                                                </Button>
                                            </Paper>
                                            <br />
                                            {/* 업로드 이미지 들어가는영역 */}
                                            <Paper elevation={0} className={classes.imgboxin}>
                                                {/* 2020.10.15 일단 테이블 삽입 이지현 */}
                                                {/*<ImageUpload />*/}
                                            </Paper>
                                        </Paper>
                                    </div>
                                </Paper>

                            </Hidden>
                        </Grid>
                    </Container>
                </React.Fragment>
            </div>
        );
    }
}

export default withStyles(style)(MainContentTag);