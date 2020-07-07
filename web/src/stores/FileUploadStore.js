import {action, computed, flow, observable} from "mobx";
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

    @action fileUpdateSuccess = (Uploaded) => {
        this.updateState.Uploaded =  Uploaded;
    }

    @action fileUpdateFail = (closed) => {
        this.updateState.Closed =  closed;
    }

    @computed get isFileUpSuccess() {
        return this.updateState.Uploaded;
    }

    @computed get isFileUpFile() {
        return this.updateState.Closed;
    }


    // fileupload (file,userId){
    //         const formData = new FormData();
    //         for(let i=0; i < file.length; i++) {
    //         formData.append("files",file[i]);
    //     }
    //         formData.append('files', file);
    //         formData.append("userId",userId);
    //         const resp = axios.post('/api/v1/kfashion/img/uploadMultipleFiles', formData, {headers: {'Content-Type':'multipart/form-data'},'Authorization': 'JWT ' + sessionStorage.getItem('token') })
    //         .then(res =>{
    //             if(res.status === 200) {
    //                     const response = axios.get('/api/v1/kfashion/img/boundaryList?createdId='+createdId)
    //                     const boundaryList = response.data.boundaryList;
    //                     this.boundaryList=boundaryList;
    //                     const workNo = this.boundaryList[0].workNo;
    //                     this.workNo = workNo;
    //             }else {
    //             }
    //         })
    //
    // };
}