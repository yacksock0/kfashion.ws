import React, { Component } from 'react'
import {DropzoneDialog, DropzoneArea} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import {inject, observer} from "mobx-react";

@inject('fileUploadStore')
@observer
export default class DropzoneDialogExample extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe =null;
        this.state = {
            open: false,
            files: null,
            progress: 0,
            visible: true
        };
    }
    handleClose() {
        this.setState({
            open: false
        });
    }
    handleChange(files) {
        this.setState({
            files: files,
            open: false
        });
    }
// handleChange = (e) => {
//     if (e.target.files[0]) {
//         const files = e.target.files[0];
//         this.setState(() => ({files}));
//     };
// }
    handleOpen() {
        this.setState({
            open: true,
        });
    }
    handleSave = async () => {
        const { files } = this.state;
        this.props.fileUploadStore.changeUploadFile(files);
    }
    handleSubmit(){
        this.props.fileUploadStore.fileupload();
    }
    render() {
        return (
            <div className="dropzonearea">
                <DropzoneArea
                    onChange={this.handleChange.bind(this)}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp', 'application/pdf']}
                    showPreviews={true}
                    maxFileSize={50000000}
                    showFileNamesInPreview={true}
                    filesLimit={5}
                    fullWidth={false}
                />
                
                <br/>
                <br/>
                <div className="button">
                    { this.state.visible ? <Button variant="contained" color="primary" onClick={this.handleSubmit.bind(this)}>
                        Submit
                    </Button> :null}
                </div>
            </div>
        );
    }
}