import {action, computed, flow, observable, toJS} from "mobx";
import axios from "axios";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    Success: 'Success',
    Fail: 'Fail',
}

const EmptyNewRectLocation = {
    workNo : '',
    workStep : 2,
    createdId : '',
    rectNo : '',
    locationX : '',
    locationY : '',
    locationWidth : '',
    locationHeight : '',
    scaleX : '',
    scaleY : '',
}

export default class RectStore {
    @observable state = State.Ready;
    @observable NewRectLocation = {...EmptyNewRectLocation};
    @observable List = [];
    @observable rectList= [];

    @action objGet = (obj) => {
        console.log(obj);
        this.rectList = obj;
    }


    @action changeNewRectLocationWorkNo = (workNo) => {
        this.NewRectLocation.workNo = workNo;
    }

    @action changeNewRectLocationCreatedId = (createdId) => {
        this.NewRectLocation.createdId = createdId;
    }

    @action changeNewRectLocationRectNo = (rectNo) => {
        this.NewRectLocation.rectNo =rectNo;
    }

    @action changeNewRectLocationX = (locationX) => {
        this.NewRectLocation.locationX = locationX;
        console.log(locationX);
    }

    @action changeNewRectLocationY = (locationY) => {
        this.NewRectLocation.locationY = locationY;
    }

    @action changeNewRectLocationWidth = (locationWidth) => {
        this.NewRectLocation.locationWidth = locationWidth;
    }
    @action changeNewRectLocationHeight = (locationHeight) => {
        this.NewRectLocation.locationHeight = locationHeight;
    }

    @action changeNewRectLocationScaleX = (scaleX) => {
        this.NewRectLocation.scaleX = scaleX;
    }

    @action changeNewRectLocationScaleY = (scaleY) => {
        this.NewRectLocation.scaleY = scaleY;
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



    doRectLocationUp = flow(function* doRectLocationUp(doAction) {
        this.state = State.Pending;
        try {
            // this.rectList.push(this.NewRectLocation.workNo);
            // this.rectList.push(this.NewRectLocation.workStep);
            // this.rectList.push(this.NewRectLocation.createdId);
            // const param = this.rectList;
            //
            // console.log(param);

            const kfashionRectList = this.rectList.map(r => ({
                id: r.id,
                left: r.left,
                top: r.top,
                width: r.width,
                height: r.height,
                scaleX: r.scaleX,
                scaleY: r.scaleY,

                createdId : this.NewRectLocation.createdId,
                workNo :this.NewRectLocation.workNo,
                workStep : this.NewRectLocation.workStep

            }));
            console.log(kfashionRectList);

            const resp = yield axios.post(`/api/v1/kfashion/rect/location`, kfashionRectList);
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