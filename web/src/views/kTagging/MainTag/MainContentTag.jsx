import React, {Component} from 'react'
import {Hidden, Grid, Container, Button, Typography, Paper} from '@material-ui/core';
import DropZone from './DropZone';
import ImageUpload from './ImageUploadTag'
import {STATE} from '../../../common/state';

//2020.10.15 inject 이지현 추가
import {inject, observer} from "mobx-react";
import {withStyles} from '@material-ui/styles';
//2020.10.21 CSV파일 다운로드 [이지현]
import {CSVLink} from 'react-csv';
import Download from '@axetroy/react-download'
//2020.10.22 EXCEL 다운로드 추가
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


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
    textstyle: {
        fontFamily: 'NotoSansCJKkr',
        fontSize: '15px',
        textAlign: 'left',
        height: '50px',
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
    countcolor: {
        color: '#526af2'
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
        width: '90%',
        margin: '0 auto',
        //disp = flex
        display: '',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        //margin bottom : 20px;
    },
    //20.10.21 스타일 추가(다운로드 관련) [이지현]
    datastyle: {
        textDecoration: 'none',
        display: 'inline',
    },
    imagefile: {margin: 5, width: '210px', height: '225px'}
});


@inject('tImageStore')
@observer
class MainContentTag extends React.Component {
    componentWillUnmount() {
            this.props.tImageStore.initStore();
    }

    render() {
        //20.10.20 버튼 비활성화 && progressbar 비활성화일때 메세지가 먼저 바뀌지않도록....
        const {message, someImage, State, csvData, textData} = this.props.tImageStore;
        //csv데이터 추가 20.10.21 [이지현]
        const {classes} = this.props;
        this.someImage = '태깅';
        this.message = '된 이미지가 없습니다';
        if (State === STATE.PENDING) {
            this.someImage = someImage;
            this.message = message;
        }
        if (State === STATE.DONE) {
            this.someImage = someImage;
            this.message = message;
        }
        return (
            <div className={classes.root}>
                <React.Fragment>
                    <Container minWidth="xl">
                        <Grid item xs={12} className={classes.gridcontainer}>
                            <Hidden smDown>
                                <Paper elevation={0} style={{width: '49%'}}>
                                    <Typography className={classes.titletext}>Tagging Service</Typography>
                                    <Typography className={classes.textstyle}>패션 이미지 또는 폴더 업로드시 해당 패션 아이템의 분석결과파일을
                                        제공합니다.</Typography>
                                    <DropZone/>
                                </Paper>
                                <Paper elevation={0} style={{width: '49%'}}>
                                    <Typography className={classes.titletext}>Analysis Result</Typography>
                                    <Typography className={classes.textstyle}>업로드한 분석결과를 원하는 파일형식으로
                                        다운로드하세요.</Typography>

                                    <div className={classes.imagebox}>
                                        <Paper elevation={0} className={classes.imageboxin}>
                                            <Typography className={classes.imgtext}>
                                                <span
                                                    className={classes.countcolor}>{this.someImage}</span>{this.message}
                                            </Typography>

                                            <Download file="StyleTagging.txt"
                                                      content={'StyleTagging Text Download\n\n' + textData}
                                                      className={classes.datastyle}>
                                                <Button variant="contained"
                                                        className={classes.btnstyle}
                                                        disabled={State === STATE.PENDING}>

                                                    {/*{State !== STATE.PENDING ? "TEXT다운로드" : <CircularProgress size={10}/>}*/}
                                                    TEXT다운로드
                                                </Button>
                                            </Download>
                                            <CSVLink data={csvData} className={classes.datastyle}>
                                                <Button variant="contained"
                                                        className={classes.btnstyle}
                                                        disabled={State === STATE.PENDING}>
                                                    CSV다운로드
                                                </Button>
                                            </CSVLink>
                                            <ExcelFile element={<Button variant="contained"
                                                                        className={classes.btnstyle}
                                                                        disabled={State === STATE.PENDING}>
                                                EXCEL다운로드
                                            </Button>}>
                                                <ExcelSheet data={csvData} name="Employees">
                                                    <ExcelColumn label="fileName" value="fileName"/>
                                                    <ExcelColumn label="fileType" value="fileType"/>
                                                    <ExcelColumn label="fileSize" value="fileSize"/>
                                                </ExcelSheet>
                                            </ExcelFile>
                                            <br/>
                                            {/* 업로드 이미지 들어가는영역 */}
                                            <Paper elevation={0} className={classes.imgboxin}>
                                                {/* 2020.10.15 일단 테이블 삽입 이지현 */}
                                                <ImageUpload/>
                                            </Paper>
                                        </Paper>
                                    </div>
                                </Paper>
                            </Hidden>

                            <Hidden mdUp>
                                <Paper elevation={0} style={{width: '100%'}}>
                                    <Typography className={classes.titletext}>Tagging Service</Typography>
                                    <Typography className={classes.textstyle}>패션 이미지 또는 폴더 업로드시 해당 패션 아이템의 분석결과파일을
                                        제공합니다.</Typography>
                                    <DropZone/>

                                    <Typography className={classes.titletext}>Analysis Result</Typography>
                                    <Typography className={classes.textstyle}>업로드한 분석결과를 원하는 파일형식으로
                                        다운로드하세요.</Typography>

                                    <div className={classes.imagebox}>
                                        <Paper elevation={0} className={classes.imageboxin}>
                                            <Typography className={classes.imgtext}>
                                                <span className={classes.countcolor}>{this.someImage}</span><a>{this.message}</a>
                                            </Typography>

                                            <Paper elevation={0}>
                                                <Download file="StyleTagging.txt"
                                                          content={'StyleTagging Text Download\n\n' + textData}
                                                          className={classes.datastyle}>
                                                    <Button variant="contained"
                                                            className={classes.btnstyle}
                                                            disabled={State === STATE.PENDING}>
                                                        {/*{State !== STATE.PENDING ? "TEXT다운로드" : <CircularProgress size={10}/>}*/}
                                                        TEXT다운로드
                                                    </Button>
                                                </Download>
                                                <CSVLink data={csvData} className={classes.datastyle}>
                                                    <Button variant="contained"
                                                            className={classes.btnstyle}
                                                            disabled={State === STATE.PENDING}>
                                                        CSV다운로드
                                                    </Button>
                                                </CSVLink>
                                                <ExcelFile element={<Button variant="contained"
                                                                            className={classes.btnstyle}
                                                                            disabled={State === STATE.PENDING}>
                                                    EXCEL다운로드
                                                </Button>}>
                                                    <ExcelSheet data={csvData} name="Employees">
                                                        <ExcelColumn label="fileName" value="fileName"/>
                                                        <ExcelColumn label="fileType" value="fileType"/>
                                                        <ExcelColumn label="fileSize" value="fileSize"/>
                                                    </ExcelSheet>
                                                </ExcelFile>
                                            </Paper>
                                            <br/>
                                            {/* 업로드 이미지 들어가는영역 */}
                                            <Paper elevation={0} className={classes.imgboxin}>
                                                {/* 2020.10.15 일단 테이블 삽입 이지현 */}
                                                <ImageUpload/>
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