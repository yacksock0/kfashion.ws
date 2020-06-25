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
    @action changeUploadFile = (files) => {
        console.log('changeUploadFile 실행...:',files )
        this.uploadFile = files;
        const uploadFile = this.uploadFile;
        console.log("this.uploadFile:", uploadFile);
    }

    fileupload = flow(function* changeUploadFile(file) {
        let formData = new FormData();
        for(let i=0; i < file.length; i++) {
            formData.append("files", file.files[i], '1.jpg');
        }
        console.log(formData);
        yield axios.post('/api/v1/img/uploadMultipleFiles', formData, {headers: {}});
    });

}