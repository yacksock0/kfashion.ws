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

const ReviewLabel = {
    styleItemName :'',
    styleSubItemName : '',
    categoryItemName : '',
    detailItemName : '',
    printItemName : '',
    textureItemName : '' ,
    clothLengthItemName : '',
    neckLineItemName : '',
    karaItemName : '',
    fitItemName : '',
}



export default class WorkStore {
    @observable workQuantity= 0;
    @observable addState = AddState.Closed;
    @observable updateState = UpdateState.Closed;
    @observable state = State.Ready;
    @observable authorityNo = 0;
    @observable outerReviewLabel = {...ReviewLabel};
    @observable topReviewLabel = {...ReviewLabel};
    @observable pantsReviewLabel = {...ReviewLabel};
    @observable onePieceReviewLabel = {...ReviewLabel};
    @observable WorkProgressRate = [];

    @action initStore = () => {
        this.professionalList = 0;
    }

    @action changeAuthorityNo = (authorityNo) => {
        this.authorityNo = authorityNo;
    }


    LoadWorkQuantity = flow(function* loadWorkQuantity(authorityNo) {
        this.workQuantity = 0;
        try {
            const response = yield axios.get('/api/v1/kfashion/work/workQuantity?authorityNo='+authorityNo)
            this.workQuantity = response.data.workQuantity;
        } catch (e) {
            console.log('error')
        }
    });

    LoadReviewLabelList = flow(function* loadReviewLabelList(workNo) {
        try {
            const response = yield axios.get('/api/v1/kfashion/label/reviewLabelList?workNo='+workNo)
            console.log(response.data);
            if(response.data.outerReviewLabel != null) {
                this.outerReviewLabel = response.data.outerReviewLabel;
            }else {
                this.outerReviewLabel= [];
            }
            if(response.data.topReviewLabel != null) {
                this.topReviewLabel = response.data.topReviewLabel;
            }else {
                this.topReviewLabel = [];
            }
            if(response.data.pantsReviewLabel != null) {
                this.pantsReviewLabel = response.data.pantsReviewLabel;
            }else {
                this.pantsReviewLabel = [];
            }
            if(response.data.onePieceReviewLabel != null) {
                this.onePieceReviewLabel = response.data.onePieceReviewLabel;
            }else {
                this.onePieceReviewLabel = [];
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