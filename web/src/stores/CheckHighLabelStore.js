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
    labelNo1 : 0,
    color1 : '',
    colorCategoryNo1 : '',
    colorItemName1 :'',
    colorItemMemo1 :'',

    subColor1 : '',
    subColorCategoryNo1 : '',
    subColorItemName1 : '',
    subColorItemMemo1 : '',

    sleeveLength1 : '',
    sleeveLengthCategoryNo1 : '',
    sleeveLengthItemName1 : '',
}

const TopReviewHighLabel = {
    labelNo2 : 0,
    color2 : '',
    colorCategoryNo2 : '',
    colorItemName2 :'',
    colorItemMemo2 : '',

    subColor2 : '',
    subColorCategoryNo2 : '',
    subColorItemName2 : '',
    subColorItemMemo2 : '',

    sleeveLength2 : '',
    sleeveLengthCategoryNo2 : '',
    sleeveLengthItemName2 : '',
}
const PantsReviewHighLabel = {
    labelNo3 : 0,
    color3 : '',
    colorCategoryNo3 : '',
    colorItemName3 :'',
    colorItemMemo3 : '',

    subColor3 : '',
    subColorCategoryNo3 : '',
    subColorItemName3 : '',
    subColorItemMemo3 : '',
}

const OnePieceReviewHighLabel = {
    labelNo4 : 0,
    color4 : '',
    colorCategoryNo4 : '',
    colorItemName4 :'',
    colorItemMemo4 : '',

    subColor4 : '',
    subColorCategoryNo4 : '',
    subColorItemName4 : '',
    subColorItemMemo4 : '',

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
    colorItemMemo1: '',
    colorItemMemo2: '',
    colorItemMemo3: '',
    colorItemMemo4: '',

    subColor1 : '',
    subColor2 : '',
    subColor3 : '',
    subColor4 : '',
    subColorCategoryNo1 : '',
    subColorCategoryNo2 : '',
    subColorCategoryNo3 : '',
    subColorCategoryNo4 : '',
    subColorSubItemName1 : '',
    subColorSubItemName2 : '',
    subColorSubItemName3 : '',
    subColorSubItemName4 : '',
    subColorSubItemMemo1 : '',
    subColorSubItemMemo2 : '',
    subColorSubItemMemo3 : '',
    subColorSubItemMemo4 : '',

    sleeveLength1 : '',
    sleeveLength2 : '',
    sleeveLength4 : '',
    sleeveLengthCategoryNo1 : '',
    sleeveLengthCategoryNo2 : '',
    sleeveLengthCategoryNo4 : '',
    sleeveLengthItemName1 : '',
    sleeveLengthItemName2 : '',
    sleeveLengthItemName4 : '',

    workNo : '',
    workStep : 4,
    labelNo1 : 0,
    labelNo2 : 0,
    labelNo3 : 0,
    labelNo4 : 0,
    createdId : '',
}

export default class CheckHighLabelStore {
    @observable addState = AddState.Closed;
    @observable updateState = UpdateState.Closed;
    @observable state = State.Ready;
    @observable authorityNo = 0;
    @observable changeNewBasicLabel = {...ReviewHighLabel}
    @observable outerReviewHighLabel = {...OuterReviewHighLabel};
    @observable topReviewHighLabel = {...TopReviewHighLabel};
    @observable pantsReviewHighLabel = {...PantsReviewHighLabel};
    @observable onePieceReviewHighLabel = {...OnePieceReviewHighLabel};
    @observable inspectionHighList = [];
    @observable msgDialog = '';

    @action changeNewBasicLabelNo1 = (labelNo1) => {
        this.outerReviewHighLabel.labelNo1 = labelNo1;
        return this.outerReviewHighLabel;
    }
    @action changeNewBasicLabelNo2 = (labelNo2) => {
        this.topReviewHighLabel.labelNo2 = labelNo2;
        return this.topReviewHighLabel;
    }
    @action changeNewBasicLabelNo3 = (labelNo3) => {
        this.pantsReviewHighLabel.labelNo3 = labelNo3;
        return this.pantsReviewHighLabel;
    }
    @action changeNewBasicLabelNo4 = (labelNo4) => {
        this.onePieceReviewHighLabel.labelNo4 = labelNo4;
        return this.onePieceReviewHighLabel;
    }

    @action changeNewBasicLabelColor1= (color1) => {
        this.changeNewBasicLabelNo1(1);
        this.outerReviewHighLabel.color1 = color1.no;
        this.outerReviewHighLabel.colorCategoryNo1 = color1.categoryNo;
        this.outerReviewHighLabel.colorItemName1 = color1.categoryItemName;
        return this.outerReviewHighLabel
    }
    @action changeNewBasicLabelColor2= (color2) => {
        this.changeNewBasicLabelNo2(2);
        this.topReviewHighLabel.color2 = color2.no;
        this.topReviewHighLabel.colorCategoryNo2 = color2.categoryNo;
        this.topReviewHighLabel.colorItemName2 = color2.categoryItemName;
        return this.topReviewHighLabel
    }
    @action changeNewBasicLabelColor3= (color3) => {
        this.changeNewBasicLabelNo3(3);
        this.pantsReviewHighLabel.color3 = color3.no;
        this.pantsReviewHighLabel.colorCategoryNo3 = color3.categoryNo;
        this.pantsReviewHighLabel.colorItemName3 = color3.categoryItemName;
        return this.pantsReviewHighLabel
    }
    @action changeNewBasicLabelColor4= (color4) => {
        this.changeNewBasicLabelNo4(4);
        this.onePieceReviewHighLabel.color4 = color4.no;
        this.onePieceReviewHighLabel.colorCategoryNo4 = color4.categoryNo;
        this.onePieceReviewHighLabel.colorItemName4 = color4.categoryItemName;
        return this.onePieceReviewHighLabel
    }

    @action changeNewBasicLabelSubColor1= (subcolor1) => {
        this.changeNewBasicLabelNo1(1);
        this.outerReviewHighLabel.subColor1 = subcolor1.no;
        this.outerReviewHighLabel.subColorCategoryNo1 = subcolor1.categoryNo;
        this.outerReviewHighLabel.subColorItemName1 = subcolor1.categoryItemName;
        return this.outerReviewHighLabel
    }
    @action changeNewBasicLabelSubColor2= (subcolor2) => {
        this.changeNewBasicLabelNo2(2);
        this.topReviewHighLabel.subColor2 = subcolor2.no;
        this.topReviewHighLabel.subColorCategoryNo2 = subcolor2.categoryNo;
        this.topReviewHighLabel.subColorItemName2 = subcolor2.categoryItemName;
        return this.topReviewHighLabel
    }
    @action changeNewBasicLabelSubColor3= (subcolor3) => {
        this.changeNewBasicLabelNo3(3);
        this.pantsReviewHighLabel.subColor3 = subcolor3.no;
        this.pantsReviewHighLabel.subColorCategoryNo3 = subcolor3.categoryNo;
        this.pantsReviewHighLabel.subColorItemName3 = subcolor3.categoryItemName;
        return this.pantsReviewHighLabel
    }
    @action changeNewBasicLabelSubColor4= (subcolor4) => {
        this.changeNewBasicLabelNo4(4);
        this.onePieceReviewHighLabel.subColor4 = subcolor4.no;
        this.onePieceReviewHighLabel.subColorCategoryNo4 = subcolor4.categoryNo;
        this.onePieceReviewHighLabel.subColorItemName4 = subcolor4.categoryItemName;
        return this.onePieceReviewHighLabel
    }

    @action changeNewBasicLabelSleeveLength1= (sleeveLength1) => {
        this.changeNewBasicLabelNo1(1);
        this.outerReviewHighLabel.sleeveLength1 = sleeveLength1.no;
        this.outerReviewHighLabel.sleeveLengthCategoryNo1 = sleeveLength1.categoryNo;
        this.outerReviewHighLabel.sleeveLengthItemName1 = sleeveLength1.categoryItemName;
        return this.outerReviewHighLabel
    }
    @action changeNewBasicLabelSleeveLength2= (sleeveLength2) => {
        this.changeNewBasicLabelNo2(2);
        this.topReviewHighLabel.sleeveLength2 = sleeveLength2.no;
        this.topReviewHighLabel.sleeveLengthCategoryNo2 = sleeveLength2.categoryNo;
        this.topReviewHighLabel.sleeveLengthItemName2 = sleeveLength2.categoryItemName;
        return this.topReviewHighLabel
    }
    @action changeNewBasicLabelSleeveLength4= (sleeveLength4) => {
        this.changeNewBasicLabelNo4(4);
        this.onePieceReviewHighLabel.sleeveLength4 = sleeveLength4.no;
        this.onePieceReviewHighLabel.sleeveLengthCategoryNo4 = sleeveLength4.categoryNo;
        this.onePieceReviewHighLabel.sleeveLengthItemName4 = sleeveLength4.categoryItemName;
        return this.onePieceReviewHighLabel
    }

    @action deleteColor1 = () => {
        this.outerReviewHighLabel.color1 = '';
        this.outerReviewHighLabel.colorCategoryNo1 = 0;
        this.outerReviewHighLabel.colorItemName1 = '';
        return this.outerReviewHighLabel;
    }
    @action deleteColor2 = () => {
        this.topReviewHighLabel.color2 = '';
        this.topReviewHighLabel.colorCategoryNo2 = 0;
        this.topReviewHighLabel.colorItemName2 = '';
        return this.topReviewHighLabel;
    }
    @action deleteColor3 = () => {
        this.pantsReviewHighLabel.color3 = '';
        this.pantsReviewHighLabel.colorCategoryNo3 = 0;
        this.pantsReviewHighLabel.colorItemName3 = '';
        return this.pantsReviewHighLabel;
    }
    @action deleteColor4 = () => {
        this.onePieceReviewHighLabel.color4 = '';
        this.onePieceReviewHighLabel.colorCategoryNo4 = 0;
        this.onePieceReviewHighLabel.colorItemName4 = '';
        return this.onePieceReviewHighLabel;
    }
    @action deleteSubColor1 = () => {
        this.outerReviewHighLabel.subColor1 = '';
        this.outerReviewHighLabel.subColorCategoryNo1 = 0;
        this.outerReviewHighLabel.subColorItemName1 = '';
        return this.outerReviewHighLabel;
    }
    @action deleteSubColor2 = () => {
        this.topReviewHighLabel.subColor2 = '';
        this.topReviewHighLabel.subColorCategoryNo2 = 0;
        this.topReviewHighLabel.subColorItemName2 = '';
        return this.topReviewHighLabel;
    }
    @action deleteSubColor3 = () => {
        this.pantsReviewHighLabel.subColor3 = '';
        this.pantsReviewHighLabel.subColorCategoryNo3 = 0;
        this.pantsReviewHighLabel.subColorItemName3 = '';
        return this.pantsReviewHighLabel;
    }
    @action deleteSubColor4 = () => {
        this.onePieceReviewHighLabel.subColor4 = '';
        this.onePieceReviewHighLabel.subColorCategoryNo4 = 0;
        this.onePieceReviewHighLabel.subColorItemName4 = '';
        return this.onePieceReviewHighLabel;
    }

    @action deleteSleeveLength1= () => {
        this.outerReviewHighLabel.sleeveLength1 = '';
        this.outerReviewHighLabel.sleeveLengthCategoryNo1 = 0;
        this.outerReviewHighLabel.sleeveLengthItemName1 = '';
        return this.outerReviewHighLabel;
    }
    @action deleteSleeveLength2 = () => {
        this.topReviewHighLabel.sleeveLength2 = '';
        this.topReviewHighLabel.sleeveLengthCategoryNo2 = 0;
        this.topReviewHighLabel.sleeveLengthItemName2 = '';
        return this.topReviewHighLabel;
    }
    @action deleteSleeveLength4 = () => {
        this.onePieceReviewHighLabel.sleeveLength4 = '';
        this.onePieceReviewHighLabel.sleeveLengthCategoryNo4 = 0;
        this.onePieceReviewHighLabel.sleeveLengthItemName4 = '';
        return this.onePieceReviewHighLabel;
    }



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