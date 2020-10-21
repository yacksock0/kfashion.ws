import React, { Component } from 'react'
import { inject, observer } from "mobx-react";
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
// import {STATE} from '../../../common/state';

const style = theme => ({
    root: {
        width: '100%',
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
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            boundaryList: [],
            imgData: '',
            count: 0,
            data: [],
            pageSize : 3,
        }
    }
    componentDidMount() {
        this.boundaryList = this.props.tImageStore.boundaryList;
    }
    componentWillUnmount() {
        this.props.tImageStore.initStore();
    }
    render() {
        const { classes } = this.props;
        const { count, fileTotal } = this.props.tImageStore;
        //진행바
        this.progress = 0;
        if (fileTotal <= 4 && fileTotal !==0) {
            this.progress = 100
        }
        if (fileTotal >= 5) {
            this.progress = count / fileTotal * 100
            if (fileTotal === count) {
                this.progress = count / fileTotal * 100;
                this.setState({pageSize : 20});
                if (fileTotal !== count) {
                    this.progress = 0;
                }
            }
        }
        return (
            <Paper elevation={0}>
                <div className={classes.root}>
                  <LinearProgress variant="determinate" value={this.progress} />
                </div>
                <MaterialTable
                    columns={[
                        { title: '사진', field: 'imgData', type: 'text', width: '102px', align: "center", sorting: false, render: rowData => <img src={'data:image/jpeg;base64,' + rowData.imgData} alt={rowData.imgData} style={{ width: 70, height: 70, borderRadius: '20%' }} />, editable: false },
                        { title: '파일명', field: 'fileName', sorting: true, align: "center", type: 'text' },
                        { title: '비어보여서..', field: 'fileName', type: 'text', sorting: false, align: "center" },
                    ]}
                    data={
                        this.props.tImageStore.boundaryList.map((item) => {
                            return {
                                fileName: item.fileName,
                                imgData: item.imgData,
                            }
                        })
                    }
                    options={{
                        toolbar: false, //툴바(테이블위 테이블이름 등 버튼있는공간)X 있으면 너무 테이블이 작아보여 사용자가 답답할거같음.
                        showTitle: false,
                        pageSize: 20,
                        //검색창
                        search: false,
                        //데이터 전체 출력 (export)
                        exportAllData: true,
                        //exprotbutton
                        exportButton: true,

                    }}
                    localization={{
                        //자료없을때 메세지
                        body: { emptyDataSourceMessage: '태깅완료 된 이미지가 없습니다' },
                        toolbar: {
                        },
                    }}
                />
            </Paper>

        );
    }
};

export default withStyles(style)(ImageUploadTag);