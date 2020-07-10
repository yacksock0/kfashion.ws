import {action, computed, flow, observable, toJS} from "mobx";
import React from "react";
import axios from "axios";
import {formatMs} from "@material-ui/core";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    NotAvailableEmail: 'NotAvailableEmail',
    Success: 'Success',
    Fail: 'Fail',
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
    @observable boundaryList = [];
    @observable files = [];
    @observable uploadFile = '';
    @observable addState = AddState.Closed;
    @observable updateState = UpdateState.Closed;
    @observable state = State.Ready;
    @observable workNo = '';
    @observable count = '';


    @action initStore = () => {
        this.boundaryList = [];
    }

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
        this.boundaryList = [];
        try {
          const response = yield axios.get('/api/v1/kfashion/img/boundaryList?createdId='+createdId)
          this.boundaryList = response.data.boundaryList;
        } catch (e) {
            console.log('error')
        }
    });

    deleteImg = flow(function* (oldData) {
        console.log(oldData);
        const createdId = oldData.createdId;
        try {
            const resp = yield axios.delete(`/api/v1/kfashion/img/deleteImage/${oldData.workNo}`, {
                data:
                    {
                        workNo: oldData.workNo,
                    }
            })
                if(resp.status === 200) {
                    this.LoadImage(createdId);
                }
        } catch (err) {
            console.log(err);
        }
    })
    
    
    fileupload (file,userId){
        console.log(file);
        const formData = new FormData();
        formData.append("userId",userId);
        formData.append("file",file);
        axios.post('/api/v1/kfashion/img/uploadFile', formData, {headers: {'Content-Type':'multipart/form-data'},'Authorization': 'JWT ' + sessionStorage.getItem('token') })
            .then(res =>{
                console.log(res);
                if(res.status === 200) {
                    let count =+ 1
                    console.log(count);
                    formData.delete("file");
                    this.LoadImage(userId);
                }
            })
        // formData.append('files', file);

        // const resp = axios.post('/api/v1/kfashion/img/uploadMultipleFiles', formData, {headers: {'Content-Type':'multipart/form-data'},'Authorization': 'JWT ' + sessionStorage.getItem('token') })
        //     .then(res =>{
        //         if(res.status === 200) {
        //             this.LoadImage(userId);
        //         }else {
        //         }
        //     })
    };
}