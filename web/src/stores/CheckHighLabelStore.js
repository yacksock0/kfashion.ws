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

const AddState = {
    Closed: 'Closed',
    Opened: 'Opened',
    Adding: 'Adding',
    Added: 'Added',
    AddFailed: 'AddFailed',
    msgDialog: '',
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

const ReviewHighLabel = {
    colorItemName :'',
    colorSubItemName : '',
    sleeveLengthItemName : '',
    color1 : '',
    color2 : '',
    color3 : '',
    color4 : '',
    colorCategoryNo : '',

    subColor1 : '',
    subColor2 : '',
    subColor3 : '',
    subColor4 : '',

    sleeveLength1 : '',
    sleeveLength2 : '',
    sleeveLength3 : '' ,
    sleeveLength4 : '',

    sleeveLengthCategoryNo : '',
}

export default class CheckHighLabelStore {
    @observable addState = AddState.Closed;
    @observable updateState = UpdateState.Closed;
    @observable state = State.Ready;
    @observable authorityNo = 0;
    @observable outerReviewHighLabel = {...ReviewHighLabel};
    @observable topReviewHighLabel = {...ReviewHighLabel};
    @observable pantsReviewHighLabel = {...ReviewHighLabel};
    @observable onePieceReviewHighLabel = {...ReviewHighLabel};
    @observable inspectionHighList = [];
    @observable msgDialog = '';

    @action initStore = () => {
        this.professionalList = 0;
    }
    @action msgDialogOpen = (value) => {
        this.msgDialog = value;
    }
    @action changeAuthorityNo = (authorityNo) => {
        this.authorityNo = authorityNo;
    }

    LoadInspectionHighList = flow(function* loadInspectionHighList() {
        this.inspectionHighList = [];
        try {
            const response = yield axios.get('/api/v1/kfashion/img/inspectionHighList')
            this.inspectionHighList = response.data.inspectionHighList;
        } catch (e) {
            console.log('error')
        }
    });


    LoadReviewHighLabelList = flow(function* loadReviewHighLabelList(workNo) {
        try {
            const response = yield axios.get('/api/v1/kfashion/label/reviewHighLabelList?workNo='+workNo)
            if(response.data.outerReviewHighLabel != null) {
                this.outerReviewHighLabel = response.data.outerReviewHighLabel;
            }else {
                this.outerReviewHighLabel= [];
            }
            if(response.data.topReviewHighLabel != null) {
                this.topReviewHighLabel = response.data.topReviewHighLabel;
            }else {
                this.topReviewHighLabel = [];
            }
            if(response.data.pantsReviewHighLabel != null) {
                this.pantsReviewHighLabel = response.data.pantsReviewHighLabel;
            }else {
                this.pantsReviewHighLabel = [];
            }
            if(response.data.onePieceReviewHighLabel != null) {
                this.onePieceReviewHighLabel = response.data.onePieceReviewHighLabel;
            }else {
                this.onePieceReviewHighLabel = [];
            }
        } catch (e) {
            console.log('error')
        }
    });


    // LoadProgressList = flow(function* loadProgressList(rowDataId) {
    //     this.state = State.Pending;
    //     let authorityNo = this.authorityNo;
    //     try {
    //         const response = yield axios.get('/api/v1/kfashion/work/history/progressRate?createdId=' + rowDataId + '&authorityNo=' + authorityNo)
    //             this.WorkProgressRate = response.data.selectWorkProgressRate;
    //             this.total = this.WorkProgressRate.totalWork;
    //             this.complete = this.WorkProgressRate.finishWork;
    //             this.percent = (this.complete/this.total)*100;
    //
    //             console.log(this.total)
    //             console.log(this.complete)
    //             console.log(this.percent)
    //
    //     }catch (e) {
    //         console.log("error LoadProgressList", e);
    //     }
    // })
}