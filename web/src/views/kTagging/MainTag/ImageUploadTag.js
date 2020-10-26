import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import MaterialTable from 'material-table';
import {Paper, Typography, Box, LinearProgress} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {STATE} from '../../../common/state';

const style = theme => ({
    root: {
        width: '100%',
        "& .MuiTable-root" : {
            minHeight : '282px',
         }

    },
    LinearProgress: {
        width: '100%',
        color: '#526af2',
    },
    colorPrimary: {
        backgroundColor: "#fff",
        width: '100%'
    },
    barColorPrimary: {
        backgroundColor: "#526af2",
        width: '100%'
    },
});

@inject('tImageStore')
@observer
class ImageUploadTag extends Component {


    render() {
        const {classes} = this.props;
        const {progress, State, table} = this.props.tImageStore;
        return (
            <Paper elevation={0}>
                {/* progress bar 영역 2020.10.20 */}
                <Box height='24px'>
                    {State === STATE.PENDING &&
                    <div className={classes.LinearProgress}>
                        <Box display="flex" alignItems="center">
                            <LinearProgress value={progress} variant='determinate'
                                            classes={{
                                                colorPrimary: classes.colorPrimary,
                                                barColorPrimary: classes.barColorPrimary
                                            }}/>
                            <Typography>
                                {`${progress.toFixed(0)}%`}
                            </Typography>
                        </Box>
                    </div>
                    }
                </Box>
                <div className={classes.root}>
                    <MaterialTable
                        columns={[
                            //MaterialTable에서 제공한 value가아닌 type : 'text' 라고하여 오류발생하였음.
                            {
                                title: '사진',
                                field: 'imgData',
                                type: 'string',
                                width: '102px',
                                align: "center",
                                sorting: false,
                                render: rowData => <img src={'data:image/jpeg;base64,' + rowData.imgData}
                                                        alt={rowData.imgData}
                                                        style={{width: 70, height: 70, borderRadius: '20%'}}/>
                            },
                            {title: '파일명', field: 'fileName', type: 'string', sorting: true, align: "center"},
                            {title: '확장자명', field: 'fileType', type: 'string', sorting: true, align: "center"},
                        ]}
                        data={
                            this.props.tImageStore.boundaryList.map((item) => {
                                return {
                                    imgData: item.imgData,
                                    fileName: item.fileName,
                                    fileType : item.fileType,
                                }
                            })
                        }
                        key = {table}
                        options={{
                            toolbar: false, //툴바(테이블위 테이블이름 등 버튼있는공간)X 있으면 너무 테이블이 작아보여 사용자가 답답할거같음.
                            showTitle: false,
                            pageSize:  3,
                            paging : false,
                        }}
                        localization={{
                            //자료없을때 메세지
                            body: {emptyDataSourceMessage: `태깅완료된 이미지가 없습니다`},
                            toolbar: {},
                        }}
                    />
                    <br/>
                </div>
            </Paper>

        );
    }
}

export default withStyles(style)(ImageUploadTag);