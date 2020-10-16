import React from "react";
import { Container, Toolbar, Button, Grid, } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import DropzoneDialogExample from "./DropzoneDialog";
import MaterialTable from 'material-table';
import CircularProgress from '@material-ui/core/CircularProgress';


@inject('testImageStore')
@observer
class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            boundaryList: [],
            imgData: '',
            count: 0,
            data: [],
        }
    }


    componentDidMount() {
        this.boundaryList = this.props.testImageStore.boundaryList;

    }
    componentWillUnmount() {
        this.props.testImageStore.initStore();
    }

    //뒤로가기 버튼
    close = () => {
        this.props.history.goBack();
    }

    render() {
        const { count, fileTotal } = this.props.testImageStore;
        //상단 글
        this.total = '이미지 테이블';
        if (`${fileTotal}` >= 1) {
            this.total = `${count} / ${fileTotal}`
            //  '1/5'... 이런식
            if (`${fileTotal}` === `${count}`) {
                this.total = `이미지 테이블`
            }
        }

        //테이블 데이터
        this.table = [];
        //테이블 메세지
        this.message = '업로드한 파일이 없습니다.'
        if (`${fileTotal}` >= 1) {
            //로딩중 테이블 데이터 안보이게
            this.message = <CircularProgress />
            if (`${fileTotal}` === `${count}`) {
                this.table = this.props.testImageStore.boundaryList.map((item) => {
                    return {
                        fileName: item.fileName,
                        imgData: item.imgData,
                    }
                })
            }
        }

        return (

            <Container style={{ height: '500vh' }}>
                <div />
                <div >

                    <Toolbar >
                        <Grid container>
                            <Grid item xs={2} style={{ marginRight: 5 }}>
                            </Grid>
                        </Grid>
                    </Toolbar>

                    <Grid container>
                        <Grid item xs={12} lg={6} >
                            <DropzoneDialogExample />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <div >
                                <MaterialTable
                                    columns={[
                                        { title: '사진', field: 'imgData', type: 'text', export: false, render: rowData => <img src={'data:image/jpeg;base64,' + rowData.imgData} alt={'non images'} style={{ width: 70, height: 70, borderRadius: '20%' }} />, editable: false },
                                        { title: '파일명', field: 'fileName', type: 'text' },
                                    ]}
                                    data={this.table}
                                    title={this.total}
                                    options={{
                                        //검색창
                                        search: false,
                                        //데이터 전체 출력 (export)
                                        exportAllData: true,
                                        //exprotbutton
                                        exportButton: true
                                    }}
                                    localization={{
                                        //자료없을때 메세지
                                        body: { emptyDataSourceMessage: <a>{this.message}</a> },
                                        toolbar: {
                                            exportTitle: '정보다운',
                                        },
                                    }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <hr></hr>
                    <Grid container>
                        <Grid item xs={3} lg={1} style={{ marginRight: 10 }}>
                        </Grid>

                        <Grid item xs={4} lg={2} style={{ marginLeft: 'auto' }}>
                            <Button
                                onClick={this.close}
                                type="button"
                                variant="outlined"
                            >
                                close
                              </Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
};

export default ImageUpload;