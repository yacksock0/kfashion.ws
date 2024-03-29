import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {inject} from "mobx-react";
import {observer} from "mobx-react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import {List, Typography} from "@material-ui/core";
import {toJS} from "mobx";

@inject('authStore', 'messageStore','checkHighLabelStore', 'polygonStore')
@observer
export default class ReturnMsg extends React.Component {
    constructor(props) {
        super(...arguments, props);
        this.state ={
            open:false,
            openBasic : false,
            workNo:'',
            poly:'',
            label:'',
            outer:'',
            top:'',
        }
    }
    componentDidMount() {
        this.props.checkHighLabelStore.workNoReset();
        this.props.checkHighLabelStore.selectedItemReset();
        this.props.messageStore.changeComment('');
        this.props.messageStore.checkBoxReset();
    }

    handleClickOpen = () => {
        this.setState({
            open:true,
        })
        this.props.checkHighLabelStore.selectedItemReset();
    };

    handleBasicOpen = () => {
        this.setState({
            openBasic:true,
        })
        this.props.messageStore.checkLabel(true)
    };

    handleBasicClose = () => {
        this.setState({
            openBasic:false,
        })
    };

    handleClose = () => {
        this.setState({
            open:false,
        })
    };
    handleSubmit = () => {
        if(this.props.onClick){
        if(this.props.messageStore.newMsg.comment == ''){
            alert('반송 단계 및 사유를 입력해 주세요');
            document.getElementById("returnText").focus();
        }
        else {
            if(this.state.open === true) {
                this.props.messageStore.changeWorkNo(this.props.checkHighLabelStore.workNo);
                this.props.messageStore.changeSendId(this.props.authStore.loginUser.id);
                this.props.messageStore.sendMsg();
                this.props.checkHighLabelStore.workNoReset();
                this.setState({
                    open: false,
                })
            }
            if(this.state.openBasic === true) {
                const selected = toJS(this.props.checkHighLabelStore.selectedItem);
                if(this.props.messageStore.checkBox.label === false) {
                    alert("레이블링 체크를 해주세요.")
                    this.props.messageStore.checkLabel(true);
                    document.getElementById("returnText").focus();
                }else {
                    if(selected.length > 0 && selected !== null) {
                        this.props.messageStore.sendSelectMsg(selected,this.props.authStore.loginUser.id);
                    }
                    this.setState({
                        openBasic: false,
                    })
                }
            }
        }
        this.props.onClick();
        }
    }

    handleComplete = () => {
        if(this.props.onClick){
        const basicComplateConfirm = window.confirm("검수를 완료 하시겠습니까?");
        if (basicComplateConfirm) {
        const workNo = this.props.checkHighLabelStore.workNo;
        const createdId = this.props.authStore.loginUser.id;
        const selected = toJS(this.props.checkHighLabelStore.selectedItem);
            if(selected.length > 0 && selected !== null) {
                this.props.messageStore.BasicSelectedCompleteUp(selected,createdId);
            }
            else {
                this.props.messageStore.BasicCompleteUp(workNo, createdId);
            }
        }
        this.props.onClick();
        }
    }
     handleChangeMsg=(e)=>{
        this.props.messageStore.changeComment(e.target.value)
    }


    handleChange = (event) => {
        {this.props.messageStore.checkBox.poly == false? this.props.messageStore.checkPoly(true) : this.props.messageStore.checkPoly(false) }
    };
    handleChange1 = (event) => {
        {this.props.messageStore.checkBox.label == false? this.props.messageStore.checkLabel(true) : this.props.messageStore.checkLabel(false) }
    };
    handleChangeType = (event) => {
        {this.props.messageStore.checkBox[event.target.name] !== true ? this.props.messageStore.changeWorkType(event.target.name) :this.props.messageStore.changeWorkType1(event.target.name)}
    };
    render() {
        const comment = this.props.messageStore.newMsg.comment;
        const {polyInfo} = this.props.polygonStore
        return (
            <div>
                {this.props.authStore.loginUser.authorityNo !== 4? (
                <Button variant="outlined" onClick={this.handleComplete} style={{float:'right' , width:150, marginBottom:10}} disabled={this.props.checkHighLabelStore.successDisabled === true ? true : false }>
                    완료
                </Button>
                ) : ''}
                {this.props.authStore.loginUser.authorityNo !== 4? (
                <Button variant="outlined"
                        color="secondary"
                        onClick={this.handleClickOpen}
                        style={{float:'right' , width:150, marginRight:10, marginBottom:10}}
                        disabled={this.props.checkHighLabelStore.workNo === 0 ? true : false}>
                    영역반송
                </Button>
                    ) : ''}
                {this.props.authStore.loginUser.authorityNo !== 4? (
                <Button variant="outlined"
                        color="secondary"
                        onClick={this.handleBasicOpen}
                        style={{float:'right' , width:150, marginRight:10, marginBottom:10}}
                        disabled={this.props.checkHighLabelStore.workNo === 0
                        && this.props.checkHighLabelStore.selectedItem.length > 0? false : true}>
                    레이블반송
                </Button>
                    ) : ''}

                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">영역지정 반송</DialogTitle>
                    <DialogContent style={{width: 600}}>
                        <DialogContentText>
                            작업 반송 단계를 선택하세요 (중복선택 가능)
                        </DialogContentText>
                        <FormGroup row>
                            <h3>영역지정 : &nbsp;</h3>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.props.messageStore.checkBox.outer}
                                        onChange={this.handleChangeType}
                                        name="outer"
                                        variant="h6"
                                        disabled={ "" == polyInfo.filter(poly => poly == 1) ? true : false}
                                    />}
                                label="아우터"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.props.messageStore.checkBox.top}
                                        onChange={this.handleChangeType}
                                        name="top"
                                        disabled={"" == polyInfo.filter(poly => poly == 2) ? true : false}
                                    />}
                                label="상의"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.props.messageStore.checkBox.pants}
                                        onChange={this.handleChangeType}
                                        name="pants"
                                        disabled={"" == polyInfo.filter(poly => poly == 3) ? true : false}
                                    />}
                                label="하의"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.props.messageStore.checkBox.onepiece}
                                        onChange={this.handleChangeType}
                                        name="onepiece"
                                        disabled={"" == polyInfo.filter(poly => poly == 4) ? true : false}
                                    />}
                                label="원피스"
                            />
                        </FormGroup>
                        {/*<FormGroup>*/}
                        {/*<FormControlLabel*/}
                        {/*    control={<Checkbox checked={this.props.messageStore.checkBox.label} value={4} onChange={this.handleChange1} name="label" />}*/}
                        {/*    label="레이블링"*/}
                        {/*/>*/}
                        {/*</FormGroup>*/}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="returnText"
                            label="반송사유"
                            value={comment}
                            onChange={this.handleChangeMsg}
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            취소
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            확인
                        </Button>
                    </DialogActions>
                </Dialog>


                <Dialog open={this.state.openBasic} onClose={this.handleBasicClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">기본 레이블링 반송</DialogTitle>
                    <DialogContent style={{width: 600}}>
                        <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={this.props.messageStore.checkBox.label} value={4} onChange={this.handleChange1} name="label" />}
                            label="레이블링"
                        />
                        </FormGroup>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="returnText"
                            label="반송사유"
                            value={comment}
                            onChange={this.handleChangeMsg}
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            취소
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                            확인
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}