import React from "react";
import {withSnackbar} from "notistack";
import {Link, withRouter, Router, Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Container, Toolbar, Typography, Button, Grid,} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import DropzoneDialogExample from "../../components/DropzoneDialog";
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from "axios";


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
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


@inject('fileUploadStore','authStore','imageStore')
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
            columns: [
                {title: '번호', field: 'workNo',type: 'button', filterPlaceholder: 'GroupNo filter', tooltip: 'workNo로 정렬'},
                {title: '사진', field: 'fileName',type: 'Image', render : rowData => <img src={rowData.fileName} style={{width: 50, height:50,}}/> },
                {title: '이름', field: 'workName',type: 'button', filterPlaceholder: 'GroupNo filter',},
                {title: '등록자', field: 'createdId', type: 'text', initialEditValue: 'test', tooltip: 'This is tooltip text'},
                {title: '등록일 ', field: 'createdDatetime', type: 'date'},
            ],
        }
    }

    componentDidMount() {
        this.props.enqueueSnackbar("Image Upload", {
            variant: 'info'
        })
        const createdId = this.props.authStore.isUserId;
        this.props.imageStore.LoadImage(createdId)
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.workNo}`,
            workNo: this.props.imageStore.workNo,
        })
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
        {this.state.count < this.state.boundaryList.length ?
         this.props.imageStore.changeWorkNo(this.state.boundaryList[this.state.count].workNo)
         :alert("마지막 이미지 입니다.")
        }
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
            workNo: this.props.imageStore.workNo
        })
    }

    render() {
        const {boundaryList} = this.props.imageStore;
        const {classes, history} = this.props;
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
                        <Grid item xs={12} lg={6}>
                            <div style={{marginRight:15}}>
                                <img src={this.state.imgData} style={{display:"inline-block" , width:'100%', height:'77vh'}}/>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <div>
                            <MaterialTable style={{height:'77vh'}}
                                icons={tableIcons}
                                columns={this.state.columns}
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
                                               actionsColumnIndex: -1,
                                           }}
                                           editable={{
                                               onRowUpdate: rowData =>
                                                   new Promise((resolve, reject) => {
                                                       setTimeout(() => {
                                                           {
                                                               axios.get('/api/v1/kfashion/users/userList')
                                                                   .then(response => response.data)
                                                                   .then(res => {
                                                                       this.setState({ userList : res, loading: false})
                                                                   })
                                                           }
                                                           resolve();
                                                       }, 1000);
                                                   })
                                           }
                                           }
                                actions={[
                                    {
                                        icon: Edit,
                                        tooltip: 'Select Image',
                                        onClick: (event, rowData) => {
                                            this.setState({imgData : "/api/v1/kfashion/img/getByteImage?workNo="+rowData.workNo})
                                            this.props.imageStore.changeWorkNo(rowData.workNo);
                                        }
                                    }
                                ]}
                            />

                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <hr></hr>
                    <Grid container>
                        <Grid item xs={3} lg={1} style={{marginRight:10}}>
                    <Button
                        type="submit"
                        className={classes.buttonType1}
                        variant="outlined"
                        onClick={this.handlePrevious.bind(this)}
                         >
                        Previous
                    </Button>
                        </Grid>
                        <Grid item xs={3} lg={1}>
                    <Button
                        type="submit"
                        className={classes.buttonType1}
                        variant="outlined"
                        onClick={this.handleNext.bind(this)}
                         >
                        Next
                    </Button>
                        </Grid>
                        <Grid item xs={4} lg={2} style={{marginLeft:'auto'}}>
                    <Button
                        type="button"
                        className={classes.buttonType2}
                        color="primary"
                        variant="outlined"
                        onClick={()=>history.push('/step/boundaryBox')}
                        >
                        Next Step
                    </Button>
                    </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (ImageUpload)));