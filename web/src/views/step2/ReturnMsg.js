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
            outer:false,
            top:false,
            pants:false,
            onepiece:false,
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
        if(this.props.messageStore.newMsg.comment == ''){alert('반송 단계 및 사유를 입력해 주세요')}
        else {
            this.props.messageStore.changeWorkNo(this.props.workNo);
            this.props.messageStore.changeSendId(this.props.authStore.loginUser.id);
            this.props.messageStore.sendMsg();
            this.props.messageStore.changeWorkStep('')
            this.props.messageStore.changeWorkStep1('')
            this.props.messageStore.changeComment('')
            this.setState({
                open: false,
            })
            alert('작업이 반송처리 되었습니다')
        }
    }
    handleChangeMsg=(e)=>{
        this.props.messageStore.changeComment(e.target.value)
    }
    handleChange = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
        if(!this.state.poly == true){
        this.props.messageStore.changeWorkStep(event.target.value)
        this.setState({outer:true, top:true, pants:true, onepiece:true})
        }else{
            this.props.messageStore.changeWorkStep('')
            this.setState({outer:false, top:false, pants:false, onepiece:false})
        }
    };
    handleChange1 = (event) => {
        this.setState({...this.state, [event.target.name]: event.target.checked});
        if (!this.state.label == true) {
            this.props.messageStore.changeWorkStep1(event.target.value)
        }else{
            this.props.messageStore.changeWorkStep1('')
        }
    };
    handleChangeType = (event) => {
        this.setState({...this.state, [event.target.name]: event.target.checked});
        this.setState({poly:true})
        {this.state[event.target.name] !== true ? this.props.messageStore.changeWorkType(event.target.name) :this.props.messageStore.changeWorkType('')}

    };
    render() {
        const {poly, outer, top, pants, onepiece} = this.state;
        const comment = this.props.messageStore.newMsg.comment;
        return (
            <div>
                <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
                    반송
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">반송</DialogTitle>
                    <DialogContent style={{width: 600}}>
                        <DialogContentText>
                            작업 반송 단계를 선택하세요 (중복선택 가능)
                        </DialogContentText>
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox checked={poly} value={3} onChange={this.handleChange} name="poly" />}
                                label="영역지정 : "
                            />

                            <FormControlLabel
                                control={<Checkbox checked={outer} onChange={this.handleChangeType} name="outer" />}
                                label="아우터"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={top} onChange={this.handleChangeType} name="top" />}
                                label="상의"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={pants} onChange={this.handleChangeType} name="pants" />}
                                label="하의"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={onepiece}  onChange={this.handleChangeType} name="onepiece" />}
                                label="원피스"
                            />
                        </FormGroup>
                        <FormGroup>
                        <FormControlLabel
                            control={<Checkbox value={4} onChange={this.handleChange1} name="label" />}
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