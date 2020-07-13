import {action, computed, flow, observable, toJS} from "mobx";
import axios from "axios";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    Success: 'Success',
    Fail: 'Fail',
}

const EmptyNewBasicLabel= {
    workNo : '',
    workStep : 4,
    no : 1,
    labelNo: '',
    color: '',
    colorCategoryNo: '',
    sleeveLength: '',
    sleeveLengthCategoryNo : '',
    createdId : '',
}

export default class BasicLabelStore {
    @observable state = State.Ready;
    @observable newBasicLabel = {...EmptyNewBasicLabel}

    @action changeNewBasicLabelColor = (color) => {
        this.newBasicLabel.color = color.no;
        this.newBasicLabel.colorCategoryNo = color.categoryNo;
    }

    @action changeNewBasicLabelLabelNo = (labelNo) => {
        this.newBasicLabel.labelNo = labelNo;
    }
    @action changeNewBasicLabelWorkNo = (workNo) => {
        this.newBasicLabel.workNo = workNo;
    }

    @computed get isWorkNo() {
        return this.newBasicLabel.workNo;
    }

    @action changeNewBasicLabelCreatedId = (createdId) => {
        this.newBasicLabel.createdId = createdId;
    }

    @action changeNewBasicLabelSleeveLength = (sleeveLength) => {
        this.newBasicLabel.sleeveLength = sleeveLength.no;
        this.newBasicLabel.sleeveLengthCategoryNo = sleeveLength.categoryNo;
    }

    @computed get isPending() {
        return this.state === State.Pending;
    }

    @computed get isSignUpSuccess() {
        return this.state === State.Success;
    }

    @computed get isSignUpFailed() {
        return this.state === State.Fail;
    }



    doBasicLabelUp = flow(function* doBasicLabelUp(doAction) {
        this.state = State.Pending;
        try {
            const param = toJS(this.newBasicLabel);

            const resp = yield axios.post('/api/v1/kfashion/label/basicLabel', param);
            if (resp.status === 200) {
                this.state = State.Success;
                if (doAction !== undefined) doAction();
            } else {
            }
        } catch (e) {
            console.log('에러좀 나지 마라')
        }
    });



}