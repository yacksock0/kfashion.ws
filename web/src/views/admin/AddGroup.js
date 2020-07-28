import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import {inject, observer} from "mobx-react";

const styles = theme => ({
});


@inject('groupStore')
@observer
class AddGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            authorityNo:'',
            open: false
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleValueChange = this.handleValueChange.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.props.groupStore.changeNewGroupName(this.state.groupName);
        this.props.groupStore.changeNewAuthorityNo(this.state.authorityNo);
        this.props.groupStore.AddGroup();
        this.setState({
            groupName: '',
            authorityNo: '',
            open: false
        })
    }

    handleValueChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClickOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            groupName: '',
            authorityNo:'',
            open: false
        })
    }



    render() {
        return (
            <div>
                <Button variant="outlined" onClick={this.handleClickOpen}>그룹 추가</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>그룹 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="그룹명" type="text" name="groupName" value={this.state.groupName} onChange={this.handleValueChange} />
                        <div style={{display:'inline-block'}}>
                            <FormControl >
                        <InputLabel id="demo-simple-select-label">그룹권한</InputLabel>
                        <Select style={{width: 130, marginLeft:10}}
                            labelId="demo-simple-select-label"
                            onChange={this.handleValueChange}
                            name='authorityNo'
                        >
                            <MenuItem value={1}>ImageUpload</MenuItem>
                            <MenuItem value={2}>Step1</MenuItem>
                            <MenuItem value={3}>Step2</MenuItem>
                        </Select>
                            </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined"  onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined"  onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(AddGroup)