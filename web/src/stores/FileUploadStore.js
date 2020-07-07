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
    @observable state = State.Ready;
    @observable boundaryList = [];
/*
    @action fileUploadHandle = () => {
        this.fileUpload();
    }
*/
    @action changeBoundaryList=(boundaryList)=>{
        this.boundaryList = boundaryList;
    }
    @action changeUploadFile = (file) => {
        console.log('changeUploadFile 실행...:',file )
        this.uploadFile = file;
        const uploadFile = this.uploadFile;
        console.log("this.uploadFile:", uploadFile);
    }
    @computed get isBoundaryList(){
        console.log("isBoundaryList", this.boundaryList)
        return this.boundaryList;
    }
    fileUpload = flow(function* fileupload(file,userId) {
        const formData = new FormData();
        for (let i = 0; i < file.length; i++) {
            formData.append("files", file[i]);
            console.log(file[i]);
        }
        formData.append('files', file);
        formData.append("userId", userId);
        console.log("files:", userId);
        yield axios.post('/api/v1/kfashion/img/uploadMultipleFiles', formData, {
            headers: {'Content-Type': 'multipart/form-data'},
            'Authorization': 'JWT ' + sessionStorage.getItem('token')
        })
            .then(flow(function* loadImage(createdId) {
                try {
                    const createdId = 'admin';
                    console.log('createdId',createdId);
                    const res = yield axios.get('/api/v1/kfashion/img/boundaryList?createdId='+createdId);
                    const boundaryList = res.data.boundaryList;
                    this.boundaryList=boundaryList;
                } catch (e) {
                    console.log('error남')
                }
            }))
    })
}
