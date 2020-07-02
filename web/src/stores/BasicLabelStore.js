import {action, computed, flow, observable, toJS} from "mobx";
import axios from "axios";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    Success: 'Success',
    Fail: 'Fail',
}

const EmptyNewBasicLabel= {
    color: '',
    sleeveLength: '',
}

export default class BasicLabelStore {
    @observable state = State.Ready;
    @observable newBasicLabel = {...EmptyNewBasicLabel}

    @action changeNewBasicLabelColor = (color) => {
        this.newBasicLabel.color = color;
    }

    @action changeNewBasicLabelSleeveLength = (sleeveLength) => {
        this.newBasicLabel.sleeveLength = sleeveLength;
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
            const param = toJS(this.newProfessionalLabel);

            const resp = yield axios.post('/api/v1/kfashion/label/BasicLabel', param);
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