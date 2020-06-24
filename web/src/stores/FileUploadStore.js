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
        const formData = new FormData();
        formData.append('file', files);
        console.log("fileParam:", formData);
        axios.post('/api/v1/img/uploadFile', formData, {headers: {'Content-Type':'multipart/form-data'}});
    }
/*    @computed get isAdding() {
        return this.addState === AddState.Adding;
    }

    @computed get isAdded() {
        return this.addState === AddState.Added;
    }

    @computed get isAddFailed() {
        return this.addState === AddState.AddFailed;
    }*/
    insertUploadFile(){

    }

 /*   fileUpload = flow(function* fileUpload(e) {
        const formData = new FormData()

        formData.append('file', blob, 'filename.jpg')
        formData.append('subPath', 'shop')

        const res = await axios.post(`/api/v1/img/uploadImgFile`, formData)
        try {
            const formData = new FormData();
            formData.append('file', e.target.file[0]);
            const response = yield axios.post('/api/v1/img/uploadImgFile', formData);
            if(response.status === 200) {
            }
        } catch (e) {
            console.log('error다 이놈아');
        }
    });*/
    fileupload = flow(function* changeUploadFile() {
        const uploadFile = this.uploadFile;
        console.log("this.uploadFile:", uploadFile);
            const formData = new FormData();
            formData.append('file', uploadFile);
            console.log("fileParam:", formData);
            yield axios.post('/api/v1/img/uploadMultipleFiles', formData, {headers: {'Content-Type':'multipart/form-data'}});
    });

}