import React, { Component } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import { inject, observer } from "mobx-react";
import CircularProgress from '@material-ui/core/CircularProgress';


@inject('testImageStore')
@observer
class DropzoneDialogExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            fileTotal: 0,
        };
    }
    handleSave(file) {
        alert("@@@@@@@");
        // this.setState({
        //     files: file,
        // });
        
        this.props.testImageStore.changeFileTotal(file.length);
        const uploadfile = file;
        this.props.testImageStore.countReset(0);
        this.props.testImageStore.fileupload(uploadfile, 0, uploadfile.length);
        alert("#######");
    }

    render() {
        const { count, fileTotal, test } = this.props.testImageStore;
        this.total = 'Click or DragAndDrop!!';
        if (`${fileTotal}` >= 1 ) {
        this.total = <CircularProgress/>//`${count} / ${fileTotal}`
            if (`${fileTotal}` === `${count}`) {
                this.total = `총 ${test} 개의 이미지`
            }
        } 
        return (
            <div style={{ display: 'inline', height: '100%' }}  >
                
                <DropzoneArea 
                    acceptedFiles={['image/*']}
                    maxFileSize={50000000000}
                    filesLimit={70000}
                    onDrop={this.handleSave.bind(this)}
                    //onChange={this.handleSave.bind(this)}
                    dropzoneText={this.total}
                    showAlerts={false}
                    showPreviewsInDropzone={false}
                    ></DropzoneArea>
            </div>
        );
    }
    }
export default DropzoneDialogExample;