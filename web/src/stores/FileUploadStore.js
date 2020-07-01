import {action, flow, observable} from "mobx";
import axios from "axios";
import {State} from "./AuthStore";

const AddState = {
    Closed: 'Closed',
    Opened: 'Opened',
    Adding: 'Adding',
    Added: 'Added',
    AddFailed: 'AddFailed',
};
const UpdateState = {
    Closed: 'Closed',
    Loading: 'Loading',
    Loaded: 'Loaded',
    LoadFailed: 'LoadFailed',
    Updating: 'Updating',
    Updated: 'Updated',
    UpdateFailed: 'UpdateFailed',
    Uploading: 'Uploading',
    Uploaded: 'Uploaded',
    UploadFailed: 'UploadFailed',
};
export default class FileUploadStore {
    @observable files = [];
    @observable uploadFile = '';
    @observable addState = AddState.Closed;
    @observable updateState = UpdateState.Closed;
    @observable state = State.Ready;
/*
    @action fileUploadHandle = () => {
        this.fileUpload();
    }
*/
    @action changeUploadFile = (file) => {
        console.log('changeUploadFile 실행...:',file )
        this.uploadFile = file;
        const uploadFile = this.uploadFile;
        console.log("this.uploadFile:", uploadFile);
    }

    fileupload (file,userId){
            const uploadFile = file;
            console.log("file:", file);
            console.log("this.uploadFile:", uploadFile);
            const formData = new FormData();
            for(let i=0; i < file.length; i++) {
            formData.append("files",file[i]);
            console.log(file[i]);
        }
            formData.append('files', file);
            formData.append("userId",userId);
            console.log("files:", formData);
            console.log("userId:", userId);
            axios.post('/api/v1/kfashion/img/uploadMultipleFiles', formData, {headers: {'Content-Type':'multipart/form-data'},'Authorization': 'JWT ' + sessionStorage.getItem('token') });
    };

}