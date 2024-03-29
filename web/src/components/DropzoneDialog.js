import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";

const styles = theme => ({
    toolButton:{
        border:'1px solid black',
        height:40,
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
    filesLimit: 70000,
    initialFiles: [],
};

@inject('authStore','imageStore')
@observer
class DropzoneDialogExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [],
            fileTotal: 0,
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
            files: file,
            fileTotal: file.length,
        });


        const collator = new Intl.Collator('en', {numeric: true, sensitivity: 'base'});
        const sortedFile = file.sort((a, b) => collator.compare(a.name, b.name))
        console.log(sortedFile);
        const userId = this.props.authStore.isUserId;
        this.props.imageStore.countReset(0);
        this.props.imageStore.fileupload(sortedFile, userId, 0, sortedFile.length);
        this.props.imageStore.LoadImage();
    }

    handelOnDrop(files) {
        // const collator = new Intl.Collator('en', {numeric: true, sensitivity: 'base'});
        // files = files.sort((a, b) => collator.compare(a.name, b.name));
        console.log(files.length);
    }


    handleOpen() {
        this.setState({
            open: true,
        });
    }

    render() {
        const { classes } = this.props;
        const {count} = this.props.imageStore;
        return (
            <div style={{display:'inline'}}>
                <Button style={{display:'inline'}} onClick={this.handleOpen.bind(this)} className={classes.toolButton} variant="outlined"
                        >
                    Add Image {this.state.fileTotal > 0 ?  `( ${count} / ${this.state.fileTotal} )` :  "" }
                </Button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp','image/jpg','image/tiff']}
                    showPreviews={false}
                    maxFileSize={50000000000}
                    onChange={this.handelOnDrop.bind(this)}
                    onClose={this.handleClose.bind(this)}
                    showAlerts={false}
                    dropzoneText={"여기에 파일을 끌어다 놓거 클릭 하십시오"}
                    cancelButtonText={"취소"}
                    submitButtonText={"저장"}
                />
            </div>
        );
    }
}
export default withSnackbar(withRouter(withStyles(styles) (DropzoneDialogExample)));