
import React from "react";
import axios from "axios";
import {inject, observer} from "mobx-react";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {Button, Typography} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { CircularProgress } from '@material-ui/core';

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
            loadingIndicator: false,
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
        this.handleWorkQuantityChange = this.handleWorkQuantityChange.bind(this)
        this.handleWorkQuantitySubmit = this.handleWorkQuantitySubmit.bind(this)
        this.handleKeyUpWorkQuantity = this.handleKeyUpWorkQuantity.bind(this)
        this.handleWorkUserCancelQuantityChange = this.handleWorkUserCancelQuantityChange.bind(this)
        this.handleWorkUserCancelQuantitySubmit = this.handleWorkUserCancelQuantitySubmit.bind(this)
        this.handleKeyUpCancel = this.handleKeyUpCancel.bind(this)
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
            value : '',
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
            CancelValue : '',
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
       const curValue = event.target.value;
       const newValue = curValue.replace(/[^0-9]/g, '');
           this.setState({
               value: newValue,
               }
           )
   }
    handleWorkUserCancelQuantityChange = (event) => {
        const curValue = event.target.value;
        const newValue = curValue.replace(/[^0-9]/g, '');
            this.setState({
                CancelValue: newValue,
            })
    }

    handleWorkQuantitySubmit=(e)=>{
        if(this.state.value === '' || this.state.value < 0 || this.state.value === null) {
            alert("값을 입력해주세요.");
        }else {
            if(this.state.value > this.props.workStore.workQuantity) {
                alert("남은작업을 확인해주세요.")
                this.setState({
                    value : '',
                })
                document.getElementById("workQuantity").focus();
            }else {
                this.props.userListStore.changeLoadingUp()
                this.setState({
                    open: false,
                })
                axios.post(`/api/v1/kfashion/work/history/assignment?workId=${this.props.rowDataId}&workCount=${this.state.value}&authorityNo=${this.props.authStore.loginUser.authorityNo}`)
                    .then(res => {
                        if (res.status === 200) {
                            this.setState({
                                value: '',
                            })
                            const groupNo = this.props.authStore.loginUser.groupNo;
                            this.props.userListStore.LoadGroupUserList(groupNo);
                            alert("작업지정이 완료되었습니다.");
                            this.props.userListStore.changeLoadingDown()
                        }
                    })
            }
        }
    }

    handleWorkUserCancelQuantitySubmit=(e)=>{
        if(this.state.CancelValue === '' || this.state.CancelValue < 0 || this.state.CancelValue === null) {
            alert("값을 입력해주세요.");
        }else {
            if(this.state.CancelValue > this.props.workStore.workUserCancelQuantity) {
                alert("남은작업을 확인해주세요.");
                this.setState({
                    CancelValue : '',
                })
                document.getElementById("workUserCancelQuantity").focus();
            }else {
                this.props.userListStore.changeLoadingUp()
                this.setState({
                    open1: false,
                })
                axios.post(`/api/v1/kfashion/work/history/assignmentCancel?workId=${this.props.rowDataId}&workCount=${this.state.CancelValue}&authorityNo=${this.props.authStore.loginUser.authorityNo}`)
                    .then(res => {
                        if (res.status === 200) {
                            this.setState({
                                CancelValue: '',
                            })
                            const groupNo = this.props.authStore.loginUser.groupNo;
                            this.props.userListStore.LoadGroupUserList(groupNo);
                            alert("작업취소가 완료되었습니다.");
                            this.props.userListStore.changeLoadingDown()
                        }
                    })
            }
        }
    }

    handleKeyUpCancel = (e) =>{
        if(e.key === 'Enter') {
            this.handleWorkUserCancelQuantitySubmit();
        }
    }

    handleKeyUpWorkQuantity = (e) => {
        if(e.key === 'Enter') {
            this.handleWorkQuantitySubmit();
        }
    }

    render() {
        return (
            <div>
                {this.state.loadingIndicator === true ? <CircularProgress className="spinner" /> : null}
                <Button variant="outlined" style={{padding:4}} onClick={this.handleClickOpen}>작업지정</Button>
                &nbsp;&nbsp;
                <Button variant="outlined" style={{padding:4}} onClick={this.handleClickOpen1}>작업취소</Button>
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
                <div>
                    <TextField
                        id="workQuantity"
                        label="작업수량 입력"
                        value={this.state.value}
                        onChange={this.handleWorkQuantityChange}
                        onKeyPress={this.handleKeyUpWorkQuantity}
                        autoFocus={true}
                        InputProps={{
                            inputProps: {maxLength: this.props.workStore.workQuantityLength},
                        }}
                    />
                    <Button variant="outlined" style={{marginTop:10}} onClick={this.handleWorkQuantitySubmit}>확인 </Button>
                </div>
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
                        <div>
                            <TextField id="workUserCancelQuantity"
                                       label="작업수량 입력"
                                       value={this.state.CancelValue}
                                       onChange={this.handleWorkUserCancelQuantityChange}
                                       onKeyPress={this.handleKeyUpCancel}
                                       autoFocus={true}
                                       InputProps={{
                                           inputProps: { maxLength: this.props.workStore.workUserCancelQuantityLength},
                                       }}
                            />
                            <Button variant="outlined" style={{marginTop:10}} onClick={this.handleWorkUserCancelQuantitySubmit}>확인 </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
};
export default WorkDetail;