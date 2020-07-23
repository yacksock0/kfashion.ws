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

@inject('authStore', 'messageStore')
@observer
export default class ReturnMsg extends React.Component {
    constructor(props) {
        super(...arguments, props);
        this.state ={
            open:false,
            poly:false,
            label:false,
            workNo:'',
        }
    }
    handleClickOpen = () => {
        this.setState({
            open:true,
        })
    };

    handleClose = () => {
        this.setState({
            open:false,
        })
    };
    handleSubmit = () => {
        this.props.messageStore.newMsg.workNo = this.props.workNo
        this.props.messageStore.newMsg.sendId =  this.props.authStore.isUserId()
        this.props.messageStore.sendMsg();
        this.setState({
            open:false,
        })
    }
    handleChangeMsg=(e)=>{
        this.props.messageStore.changeComment(e.target.value)
    }
    handleChange = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
        this.props.messageStore.changeWorkNo(this.state.poly)
        this.props.messageStore.changeWorkNo(this.state.label)
    };
    render() {
        const comment = this.props.messageStore.newMsg.comment;
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Return
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">반송</DialogTitle>
                    <DialogContent style={{width: 600}}>
                        <DialogContentText>
                            작업 반송 단계를 선택하세요(중복선택 가능)
                        </DialogContentText>
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox checked={this.state.poly} onChange={this.handleChange} name="poly" />}
                                label="영역지정"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={this.state.label} onChange={this.handleChange} name="label" />}
                                label="레이블링"
                            />
                        </FormGroup>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
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