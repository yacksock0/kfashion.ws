
import React from "react";
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
            count: 0,
            data: [],
            columns: [
                {title: '번호', field: 'workNo',type: 'button', filterPlaceholder: 'GroupNo filter', tooltip: 'workNo로 정렬'},
                {title: '사진', field: 'fileName',type: 'Image', render : rowData => <img alt={rowData.workName} src={rowData.fileName} style={{width: 50, height:50,}}/> },
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

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (this.state.userId !== this.props.rowDataId) {
            this.setState({
                userId : this.props.rowDataId,
            })
        }
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
        this.props.userListStore.changeValueReset();
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
        this.props.userListStore.changeCancelValueReset();
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
       this.props.userListStore.changeValue(newValue);
   }
    handleWorkUserCancelQuantityChange = (event) => {
        const curValue = event.target.value;
        const newValue = curValue.replace(/[^0-9]/g, '');
        this.props.userListStore.changeCancelValue(newValue);
    }

    handleWorkQuantitySubmit=(e)=>{
        if(this.props.userListStore.assignment.workCount === '' || this.props.userListStore.assignment.workCount < 0 || this.props.userListStore.assignment.workCount === null) {
            alert("값을 입력해주세요.");
        }else {
            if(this.props.userListStore.assignment.workCount > this.props.workStore.workQuantity) {
                alert("남은작업을 확인해주세요.")
                this.props.userListStore.changeValueReset();
                document.getElementById("workQuantity").focus();
            }else {
                this.props.userListStore.changeAuthorityNo(this.props.authStore.loginUser.authorityNo);
                this.props.userListStore.changeWorkId(this.props.rowDataId);
                this.props.userListStore.changeLoadingUp()
                this.setState({
                    open: false,
                })
                this.props.userListStore.DoAssignment(this.props.authStore.loginUser.groupNo);
                    if(this.props.onChange) {
                        this.props.onChange(this.props.rowDataId);
                }
            }
        }
    }

    handleWorkUserCancelQuantitySubmit=(e)=>{
        if(this.props.userListStore.assignmentCancel.workCount === '' || this.props.userListStore.assignmentCancel.workCount < 0 ||this.props.userListStore.assignmentCancel.workCount === null) {
            alert("값을 입력해주세요.");
        }else {
            if(this.props.userListStore.assignmentCancel.workCount > this.props.workStore.workUserCancelQuantity) {
                alert("남은작업을 확인해주세요.");
                this.props.userListStore.changeCancelValueReset();
                document.getElementById("workUserCancelQuantity").focus();
            }else {
                this.props.userListStore.changeLoadingUp()
                this.setState({
                    open1: false,
                })
                this.props.userListStore.changeCancelAuthorityNo(this.props.authStore.loginUser.authorityNo);
                this.props.userListStore.changeCancelWorkId(this.props.rowDataId);
                this.props.userListStore.DoAssignmentCancel(this.props.authStore.loginUser.groupNo);
                if(this.props.onChange) {
                    this.props.onChange(this.props.rowDataId);
                }
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
                        value={this.props.userListStore.assignment.workCount}
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
                                       value={this.props.userListStore.assignmentCancel.workCount}
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