import {action, computed, flow, observable} from "mobx";
import axios from "axios";

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

const ProfessionalComplete = {
    workNo : '',
    createdId : '',
    workStep : 8,
}
export default class ImageStore {
    @observable boundaryList = [];
    @observable files = [];
    @observable uploadFile = '';
    @observable addState = AddState.Closed;
    @observable updateState = UpdateState.Closed;
    @observable state = State.Ready;
    @observable workNo = 0;
    @observable count = 0;
    @observable professionalComplete = {...ProfessionalComplete};
    @observable canvasWidth = 0;
    @observable canvasHeight = 0;
    @observable lastWorkNo = 0;
    @observable fileTotal = 0;

    @action countChange =(count)=>{
        this.count= count;
    }

    @action changeCanvasWidth = (width) => {
        this.canvasWidth = width;
    }

    @action changeCanvasHeight = (height) => {
        this.canvasHeight = height;
    }

    @action changeFileTotal = (fileTotal) => {
        this.fileTotal = fileTotal;
    }



    @action countReset = (num) => {
        this.count = num;
    }

    @action initStore = () => {
        this.boundaryList = [];
    }

    @action changeWorkNo = (workNo) => {
        this.workNo = workNo;
    }

    @action changeBoundaryList=(boundaryList)=>{
        this.boundaryList = boundaryList;
    }

    @action changeRecentlyImg=(recentlyImg)=>{
        this.recentlyImg =  recentlyImg;
    }
    @action clearState = () => {
        this.state = State.Ready;
    }

    @computed get isWorkNo() {
        return this.workNo;
    }
    @computed get isBoundaryList(){
        return this.boundaryList;
    }

    @computed get isCanvasWidth() {
        return this.canvasWidth;
    }
    @computed get isCanvasHeight() {
        return this.canvasHeight;
    }


    LoadImage = flow(function* loadImage() {
        this.boundaryList = [];
        try {
          const response = yield axios.get('/api/v1/kfashion/img/boundaryList')
          this.boundaryList = response.data.boundaryList;
          this.lastWorkNo = this.boundaryList[0].workNo;
            this.changeRecentlyImg(this.boundaryList);
        } catch (e) {
            console.log('error')
        }
    });




    deleteImg = flow(function* (oldData) {
        try {
            const resp = yield axios.delete(`/api/v1/kfashion/img/deleteImage/${oldData.workNo}`, {
                data:
                    {
                        workNo: oldData.workNo,
                    }
            })
                if(resp.status === 200) {
                    this.LoadImage();
                }
        } catch (err) {
            console.log(err);
        }
    })
    
    
    fileupload = flow(function* fileupload (fileList, userId, index, max){
        if(index >= max) {
            this.countReset(0);
            this.changeFileTotal(0);
            this.LoadImage();
        }
        const formData = new FormData();
        formData.append("userId",userId);
        formData.append("file",fileList[index]);
        // new Promise((resolve, reject) => {
        //     setTimeout(() => {
        try {
            const resp = yield axios.post('/api/v1/kfashion/img/uploadFile', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
                'Authorization': 'JWT ' + sessionStorage.getItem('token')
            });
            if (resp.status === 200) {
                this.countChange(index + 1);
                this.fileupload(fileList, userId, index + 1, max)
            }
        } catch (error) {
            console.log(error);
        }
                // resolve();
            // }, 1000)
        // }).then(resp => {
        //     console.log(this.count);
        //     this.fileupload(fileList, userId, index + 1, max)
        //     this.countChange();
        // });
        // formData.append('files', file);
        // const resp = axios.post('/api/v1/kfashion/img/uploadMultipleFiles', formData, {headers: {'Content-Type':'multipart/form-data'},'Authorization': 'JWT ' + sessionStorage.getItem('token') })
        //     .then(res =>{
        //         if(res.status === 200) {
        //             this.LoadImage(userId);
        //         }else {
        //         }
        //     })
    });


    fileuploadAll = flow(function* fileuploadAll (fileList, userId) {
        this.updateState = UpdateState.Loading;
        const formData = new FormData();
        if(fileList.length > 0) {
            for(let i=0; i<fileList.length; i++) {
                formData.append("files", fileList[i]);
            }
        }
        formData.append("userId", userId);
        try {
            const resp = yield axios.post('/api/v1/kfashion/img/uploadFileAll', formData, {
                headers: {'Content-Type': 'multipart/form-data'},
                'Authorization': 'JWT ' + sessionStorage.getItem('token')
            });
            if (resp.status === 200) {
                this.updateState = UpdateState.Uploaded;
                this.LoadImage();
                this.fileTotal = 0;
            }
        } catch (error) {
            console.log(error);
        }
    });


    fileuploadCount = flow(function* fileuploadCount () {
        yield axios.get('/api/v1/kfashion/img/fileuploadCount?workNo='+this.lastWorkNo)
               .then(resp =>{
                    if (resp.status === 200 ) {
                        if(this.fileTotal === resp.data || this.fileTotal === 0) {
                           this.countChange(resp.data);
                        }else {
                            this.fileuploadCount();
                            this.countChange(resp.data);
                        }
                    }
        })
    });
}