import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Container, Toolbar, Typography, Button, Grid, List,} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import DropzoneDialogExample from "../../components/DropzoneDialog";
import MaterialTable from 'material-table';
import axios from "axios";
import CheckIcon from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error";

const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
        maxWidth:'100%',
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
        padding:0,
    },
    buttonType1:{
        width: '100%',
        height: 50,
    },
    buttonType2:{
        width: '100%',
        height: 50,

    },
    toolButton:{
        border:'1px solid black',
        height:50,
        width:'100%',
    },
    test:{
        border:'1px solid black',
        height: '50%',
    },
    toolBox:{
        border:'1px solid black',
        marginRight: 1,
        height:'100%',
    },
    fileText: {
        paddingTop: 32,
        paddingRight: theme.spacing(2),
        textAlign: 'left'

    },
    fileSelection: {
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        border: 0,
        borderRadius: 12,
    },
    imgLayout:{
        maxWidth: 600,
        maxHeight: 600,
    }
});


@inject('authStore','imageStore', 'currentStepStore')
@observer
class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            text: 'text',
            boundaryList: [],
            imgData : '',
            count: 0,
            data: [],
        }
    }

    componentDidMount() {
        this.props.currentStepStore.setStep(0);
        this.props.enqueueSnackbar("이미지 업로드", {
            variant: 'success',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            }
        })
        this.props.imageStore.LoadImage()

    }
    componentWillUnmount() {
        this.props.imageStore.initStore();
    }

    handlePrevious(){
        this.setState({
            count: this.state.count-1
        });
        {this.state.boundaryList.length - this.state.count >=0 ?this.props.imageStore.changeWorkNo(this.state.boundaryList[this.state.count].workNo)
            : alert("첫번째 이미지 입니다.")
        }
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
            workNo: this.props.imageStore.workNo
        })
    }
    handleNext() {
        this.setState({
            count: this.state.count+1
        });
        {this.state.count < this.props.imageStore.boundaryList.length ?
         this.props.imageStore.changeWorkNo(this.state.boundaryList[this.state.count].isWorkNo)
         :alert("마지막 이미지 입니다.")
        }
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
            workNo: this.props.imageStore.workNo
        })
    }
    handleClick=(workNo, imgData)=>{
        this.setState({
            imgData:imgData,
        })
    }
    render() {
        const {boundaryList} = this.props.imageStore;
        const {classes, history} = this.props;
        const loginUser = this.props.authStore.isUserId;
        return (
            <Container component="main" className={classes.mainContainer} style={{height:'100vh'}}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>

                    <Toolbar className={classes.toolbar}>
                        <Grid container>
                            <Grid item xs={2} style={{marginRight:5}}>
                                <DropzoneDialogExample />
                            </Grid>
                        </Grid>
                    </Toolbar>

                    <Grid container>
                        <Grid item xs={12} lg={5}>
                            <div style={{marginRight:15}}>
                                <img src={this.state.imgData} style={{display:"inline-block" , width:'750', height:'60vh'}}/>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={7}>
                            <div>
                            <MaterialTable
                                columns={[
                                    {title: '번호', field: 'workNo',type: 'button', filterPlaceholder: 'GroupNo filter', tooltip: 'workNo로 정렬', editable:false},
                                    {title: '사진', field: 'fileName',type: 'Image', render : rowData => <img src={rowData.fileName} style={{width: 50, height:50,}}/>, editable:false},
                                    {title: '이름', field: 'workName',type: 'button', filterPlaceholder: 'GroupNo filter'},
                                    {title: '등록자', field: 'createdId', type: 'text', initialEditValue: 'test', tooltip: 'This is tooltip text',editable:false},
                                    {title: '등록일 ', field: 'createdDatetime', type: 'date',editable:false},
                                ]}
                                data={!!this.props.imageStore.boundaryList ?
                                    this.props.imageStore.boundaryList.map((item) => {
                                        return {
                                            workNo: item.workNo,
                                            fileName: item.fileName,
                                            workName: item.workName,
                                            createdId: item.createdId,
                                            createdDatetime: item.createdDatetime,
                                        }
                                    }) : []}
                                title="이미지 리스트"
                                options={{
                                    sorting:false,
                                    actionsColumnIndex: -1,
                                    headerStyle: {
                                        backgroundColor: '#E2E2E2',
                                        color: '#000000',
                                        textAlign:'center',
                                    },
                                    cellStyle: {
                                        textAlign: 'center'
                                    },
                                    pageSizeOptions : [5,10,25,50],
                                }}
                                           actions={[
                                               {
                                                   icon: CheckIcon,
                                                   tooltip: 'Select Image',
                                                   onClick: (event, rowData) => this.handleClick(rowData.workNo, "/api/v1/kfashion/img/getByteImage?workNo="+rowData.workNo)
                                               }
                                           ]}
                                           editable={{
                                               onRowUpdate: rowData =>
                                                   new Promise((resolve, reject) => {
                                                       setTimeout(() => {
                                                           {axios.put(`/api/v1/kfashion/work/updateWorkName`,  {
                                                                   no: rowData.workNo,
                                                                   workName: rowData.workName,
                                                               })
                                                                   .then(res => {
                                                                        if(res.status === 200) {
                                                               const userId = this.props.authStore.isUserId
                                                               this.props.imageStore.LoadImage(userId);
                                                                        }
                                                                       }
                                                                   )
                                                           }
                                                           resolve();
                                                       }, 1000);
                                                   }),
                                               onRowDelete: rowData =>
                                                   new Promise((resolve, reject) => {
                                                       setTimeout(() => {
                                                           {axios.delete(`/api/v1/kfashion/img/deleteImage/${rowData.workNo}`,  {
                                                               data: {
                                                               workNo: rowData.workNo,
                                                               }
                                                           })
                                                               .then(res => {
                                                                       if(res.status === 200) {
                                                                           const userId = this.props.authStore.isUserId
                                                                           this.props.imageStore.LoadImage(userId);
                                                                       }
                                                                   })
                                                           }
                                                           resolve();
                                                       }, 1000);
                                                   })
                                           }
                                         }
                            />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <hr></hr>
                    {loginUser.authorityNo > 1 ? (
                    <Grid container>
                        <Grid item xs={3} lg={1} style={{marginRight:10}}>
                    {/*<Button*/}
                    {/*    type="submit"*/}
                    {/*    className={classes.buttonType1}*/}
                    {/*    variant="outlined"*/}
                    {/*    onClick={this.handlePrevious.bind(this)}*/}
                    {/*     >*/}
                    {/*    Previous*/}
                    {/*</Button>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={3} lg={1}>*/}
                    {/*<Button*/}
                    {/*    type="submit"*/}
                    {/*    className={classes.buttonType1}*/}
                    {/*    variant="outlined"*/}
                    {/*    onClick={this.handleNext.bind(this)}*/}
                    {/*     >*/}
                    {/*    Next*/}
                    {/*</Button>*/}
                        </Grid>

                        <Grid item xs={4} lg={2} style={{marginLeft:'auto'}}>
                    <Button
                        type="button"
                        className={classes.buttonType2}
                        variant="outlined"
                        onClick={()=>history.push('/Step/Polygon')}
                        >
                        Next Step
                    </Button>
                    </Grid>
                    </Grid>
                        ):''}
                </div>
                <div style={{display:'inline'}}>
                <ErrorIcon/>
                <Typography variant="h6" component="h4" style={{display:'inline'}}>
                좌측상단에 ADD IMAGE 버튼을 통해 업로드 진행 / 이미지 리스트의 액션버튼을 통해 이미지 선택, 파일이름 변경, 이미지 삭제
                </Typography>
                </div>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (ImageUpload)));