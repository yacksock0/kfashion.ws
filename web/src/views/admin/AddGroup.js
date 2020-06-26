import React from 'react'
import { post } from 'axios';
import axios from "axios";
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

const styles = theme => ({
});

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
        this.addGroup = this.addGroup.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.addGroup()
            .then((response) => {
                console.log(response.data);
            })
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



    addGroup(){
        const url = '/api/v1/kfashion/group/create';
        const formData = new FormData();
        formData.append('groupName', this.state.groupName)
        formData.append('authorityNo', this.state.authorityNo)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
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
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    그룹 추가
                </Button>
                <Button style={{float:"right"}} variant="outlined" color="primary" onClick={this.handleClose}>
                    닫기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>그룹 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="그룹명" type="text" name="groupName" value={this.state.groupName} onChange={this.handleValueChange} />
                        <div style={{display:'inline-block'}}>
                        <InputLabel id="demo-simple-select-label">그룹권한</InputLabel>
                        <Select style={{width: 130, marginLeft:10}}
                            labelId="그룹권한"
                            onChange={this.handleValueChange}
                             name='authorityNo'
                        >
                            <MenuItem value={1}>ImageUpload</MenuItem>
                            <MenuItem value={2}>BoundaryBox</MenuItem>
                            <MenuItem value={3}>Polygon</MenuItem>
                            <MenuItem value={4}>Basic</MenuItem>
                            <MenuItem value={5}>Professional</MenuItem>
                        </Select>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(AddGroup)