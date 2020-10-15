import React, { Component } from 'react'
import { DropzoneArea } from 'material-ui-dropzone'
import { inject, observer } from "mobx-react";
import CircularProgress from '@material-ui/core/CircularProgress';


@inject('imageStore')
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
        this.setState({
            files: file,
        });
        
        this.props.imageStore.changeFileTotal(file.length);
        console.log('file.lenght :>> ', file.length);
        console.log('file :>> ', file);
        //const collator = new Intl.Collator('en', {numeric: true, sensitivity: 'base'}); 파일정렬옵션!
        const uploadfile = file;
        this.props.imageStore.countReset(0);
        this.props.imageStore.fileupload(uploadfile, 0, uploadfile.length);
    }

    render() {
        const { count, fileTotal,test } = this.props.imageStore;
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