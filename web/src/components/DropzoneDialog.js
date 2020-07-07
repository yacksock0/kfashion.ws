import React, { Component } from 'react'
import {DropzoneArea, DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import axios from "axios";
import {inject, observer} from "mobx-react";

const styles = theme => ({
    toolButton:{
        border:'1px solid black',
        height:50,
        width:'100%',
    },
    toolBox:{
        border:'1px solid black',
        marginRight: 1,
        height:'100%',
    },
});
DropzoneDialog.defaultProps = {
    clearOnUnmount: true,
    filesLimit: 20,
    initialFiles: [],
};

@inject('fileUploadStore','authStore','imageStore')
@observer
class DropzoneDialogExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [],
        };
    }
    handleClose() {
        this.setState({
            open: false
        });
    }
    handleSave(file) {
        this.setState({
            open: false,
            files: file
        });
        const userId = this.props.authStore.isUserId;
        this.props.fileUploadStore.fileupload(file, userId);
        this.props.imageStore.LoadImage(userId)
    }

    handleOpen() {
        this.setState({
            open: true,
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button onClick={this.handleOpen.bind(this)} className={classes.toolButton} variant="contained"
                        color="primary">
                    Add Image
                </Button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}
export default withSnackbar(withRouter(withStyles(styles) (DropzoneDialogExample)));