import {action, computed, flow, observable, toJS} from "mobx";
import React from "react";
import axios from "axios";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    NotAvailableEmail: 'NotAvailableEmail',
    Success: 'Success',
    Fail: 'Fail',
}

const WorkNo = {
    workNo : '',
}

const BoundaryList ={
    boundaryList:[],
}

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
export default class ImageStore {
    @observable files = [];
    @observable uploadFile = '';
    @observable addState = AddState.Closed;
    @observable updateState = UpdateState.Closed;
    @observable state = State.Ready;
    @observable workNo = {...WorkNo};


    @action changeWorkNo = (workNo) => {
        this.workNo = workNo;
    }
    @action changeBoundaryList=(boundaryList)=>{
        this.boundaryList = boundaryList;
    }
    @action clearState = () => {
        this.state = State.Ready;
    }

    @computed get isWorkNo() {
        return this.workNo;
    }
    @computed get isBoundaryList(){
        console.log("isBoundaryList", this.boundaryList)
        return this.boundaryList;
    }

    LoadImage = flow(function* loadImage(createdId) {
        try {
          const response = yield axios.get('/api/v1/kfashion/img/boundaryList?createdId='+createdId)
          const boundaryList = response.data.boundaryList;
          this.boundaryList=boundaryList;
          const workNo = this.boundaryList[0].workNo;
          this.workNo = workNo;
        } catch (e) {
            this.loginState = State.Failed;
            this.imageData = Object.assign({}, WorkNo);
        }
    });

    fileupload (file,userId){
        const formData = new FormData();
        for(let i=0; i < file.length; i++) {
            formData.append("files",file[i]);
        }
        formData.append('files', file);
        formData.append("userId",userId);
        const resp = axios.post('/api/v1/kfashion/img/uploadMultipleFiles', formData, {headers: {'Content-Type':'multipart/form-data'},'Authorization': 'JWT ' + sessionStorage.getItem('token') })
            .then(res =>{
                if(res.status === 200) {
                    this.LoadImage(userId);
                }else {
                }
            })
    };
}