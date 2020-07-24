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
const OuterReviewHighLabel = {
    color1 : '',
    colorCategoryNo1 : '',
    colorItemName1 :'',

    subColor1 : '',
    subColorCategoryNo1 : '',
    colorSubItemName1 : '',

    sleeveLength1 : '',
    sleeveLengthCategoryNo1 : '',
    sleeveLengthItemName1 : '',
}

const TopReviewHighLabel = {
    color2 : '',
    colorCategoryNo2 : '',
    colorItemName2 :'',

    subColor2 : '',
    subColorCategoryNo2 : '',
    colorSubItemName2 : '',

    sleeveLength2 : '',
    sleeveLengthCategoryNo2 : '',
    sleeveLengthItemName2 : '',
}
const PantsReviewHighLabel = {
    color3 : '',
    colorCategoryNo3 : '',
    colorItemName3 :'',

    subColor3 : '',
    subColorCategoryNo3 : '',
    colorSubItemName3 : '',
}

const OnePieceReviewHighLabel = {
    color4 : '',
    colorCategoryNo4 : '',
    colorItemName4 :'',

    subColor4 : '',
    subColorCategoryNo4 : '',
    colorSubItemName4 : '',

    sleeveLength4 : '',
    sleeveLengthCategoryNo4 : '',
    sleeveLengthItemName4 : '',
}

const ReviewHighLabel = {
    color1 : '',
    color2 : '',
    color3 : '',
    color4 : '',
    colorCategoryNo1 : '',
    colorCategoryNo2 : '',
    colorCategoryNo3 : '',
    colorCategoryNo4 : '',
    colorItemName1 :'',
    colorItemName2 :'',
    colorItemName3 :'',
    colorItemName4 :'',

    subColor1 : '',
    subColor2 : '',
    subColor3 : '',
    subColor4 : '',
    subColorCategoryNo1 : '',
    subColorCategoryNo2 : '',
    subColorCategoryNo3 : '',
    subColorCategoryNo4 : '',
    colorSubItemName1 : '',
    colorSubItemName2 : '',
    colorSubItemName3 : '',
    colorSubItemName4 : '',

    sleeveLength1 : '',
    sleeveLength2 : '',
    sleeveLength4 : '',
    sleeveLengthCategoryNo1 : '',
    sleeveLengthCategoryNo2 : '',
    sleeveLengthCategoryNo4 : '',
    sleeveLengthItemName1 : '',
    sleeveLengthItemName2 : '',
    sleeveLengthItemName4 : '',
}

export default class CheckHighLabelStore {
    @observable addState = AddState.Closed;
    @observable updateState = UpdateState.Closed;
    @observable state = State.Ready;
    @observable authorityNo = 0;
    @observable reviewHighLabel = {...ReviewHighLabel}
    @observable outerReviewHighLabel = {...OuterReviewHighLabel};
    @observable topReviewHighLabel = {...TopReviewHighLabel};
    @observable pantsReviewHighLabel = {...PantsReviewHighLabel};
    @observable onePieceReviewHighLabel = {...OnePieceReviewHighLabel};
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