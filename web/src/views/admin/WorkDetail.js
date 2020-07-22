
import React, {forwardRef} from "react";
import MaterialTable from 'material-table';
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
import {inject, observer} from "mobx-react";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {Button, Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

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

@inject('authStore','workStore', 'userListStore')
@observer
class WorkDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            open: false,
            open1: false,
            selectedId:'',
            basicLabelList: [],
            value:'',
            CancelValue:'',
            count: 0,
            data: [],
            columns: [
                {title: '번호', field: 'workNo',type: 'button', filterPlaceholder: 'GroupNo filter', tooltip: 'workNo로 정렬'},
                {title: '사진', field: 'fileName',type: 'Image', render : rowData => <img src={rowData.fileName} style={{width: 50, height:50,}}/> },
                {title: '이름', field: 'workName',type: 'button', filterPlaceholder: 'GroupNo filter',},
            ],
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClickOpen1 = this.handleClickOpen1.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleClose1 = this.handleClose1.bind(this)
        this.handleClickId = this.handleClickId.bind(this)
    }
    componentDidMount() {
        this.setState({
            userId : this.props.rowDataId,
        })


    }

    selectedId=(selectedId)=>{
        this.setState({
            selectedId:selectedId,
        })
    }
    handleClickOpen(){
        const authorityNo = this.props.authStore.loginUser.authorityNo;
        this.props.workStore.LoadWorkQuantity(authorityNo);
        this.setState({
            open: true,
        });
    }
    handleClose() {
        this.setState({
            open: false,
        });
    }
    handleClickOpen1(){
        const authorityNo = this.props.authStore.loginUser.authorityNo;
        const userId = this.state.userId;
        this.props.workStore.LoadWorkUserCancelQuantity(authorityNo,userId);
        this.setState({
            open1: true,
        });
    }
    handleClose1() {
        this.setState({
            open1: false,
        });
    }
    handleClickId(selectedId){
        this.setState({
            selectedId: selectedId,
        })
    }
   handleWorkQuantityChange = (event) => {
        this.setState({value: event.target.value});
    }

    handleWorkUserCancelQuantityChange = (event) => {
        this.setState({CancelValue: event.target.value});
    }
    handleWorkQuantitySubmit=()=>{
        axios.post(`/api/v1/kfashion/work/history/assignment?workId=${this.props.rowDataId}&workCount=${this.state.value}&authorityNo=${this.props.authStore.loginUser.authorityNo}`)
            .then(res =>{
                if (res.status === 200) {
                    this.setState({
                        value:'',
                        open:false,
                    })
                    const groupNo = this.props.authStore.loginUser.groupNo;
                    this.props.userListStore.LoadGroupUserList(groupNo);
                    alert("작업지정이 완료되었습니다.");
                }
            })
    }

    handleWorkUserCancelQuantitySubmit=()=>{
        axios.post(`/api/v1/kfashion/work/history/assignmentCancel?workId=${this.props.rowDataId}&workCount=${this.state.CancelValue}&authorityNo=${this.props.authStore.loginUser.authorityNo}`)
            .then(res =>{
                if (res.status === 200) {
                    this.setState({
                        value:'',
                        open:false,
                    })
                    const groupNo = this.props.authStore.loginUser.groupNo;
                    this.props.userListStore.LoadGroupUserList(groupNo);
                    alert("작업취소가 완료되었습니다.");
                }
            })
    }


    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>작업지정</Button>
                &nbsp;&nbsp;
                <Button variant="contained" color="primary" onClick={this.handleClickOpen1}>작업취소</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}
                        maxWidth={"xs"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
            <DialogContent>
                <Typography variant="h5" component="h2">
                    작업지정  (남은 작업: {this.props.workStore.workQuantity})
                </Typography>
                <hr></hr>
                <form noValidate autoComplete="off">
                    <TextField id="number" label="작업수량 입력" onChange={this.handleWorkQuantityChange}/>
                    <Button variant="contained" color="primary" style={{marginTop:10}} onClick={this.handleWorkQuantitySubmit}>확인 </Button>
                </form>
            </DialogContent>
            </Dialog>
                <Dialog open={this.state.open1} onClose={this.handleClose1}
                        maxWidth={"xs"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                            작업회수  (남은 작업: {this.props.workStore.workUserCancelQuantity})
                        </Typography>
                        <hr></hr>
                        <form noValidate autoComplete="off">
                            <TextField id="number" label="작업수량 입력" onChange={this.handleWorkUserCancelQuantityChange}/>
                            <Button variant="contained" color="primary" style={{marginTop:10}} onClick={this.handleWorkUserCancelQuantitySubmit}>확인 </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
};
export default WorkDetail;