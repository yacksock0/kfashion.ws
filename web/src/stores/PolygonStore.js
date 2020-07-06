import {action, computed, flow, observable, toJS} from "mobx";
import axios from "axios";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    Success: 'Success',
    Fail: 'Fail',
}

const EmptyNewPolygonLocation = {
    workNo : '',
    workStep : 3,
    createdId : '',
    rectNo : ''
}

export default class PolygonStore {
    @observable state = State.Ready;
    @observable NewPolygonLocation = {...EmptyNewPolygonLocation};
    @observable List = [];
    @observable polygonList= [];

    @action objGet = (obj) => {

        this.polygonList = obj;
    }
    @action changeNewPolygonLocationWorkNo = (workNo) => {
        this.NewPolygonLocation.workNo = workNo;
    }

    @action changeNewPolygonLocationCreatedId = (createdId) => {
        this.NewPolygonLocation.createdId = createdId;
    }

    @action changeNewPolygonLocationRectNo = (rectNo) => {
        this.NewPolygonLocation.rectNo =rectNo;
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



    doPolygonLocationUp = flow(function* doPolygonLocationUp(doAction) {
        this.state = State.Pending;
        try {
            const kfashionPolygonList = this.polygonList.map(r => ({
                workNo :this.NewPolygonLocation.workNo,
                workStep : this.NewPolygonLocation.workStep,
                createdId : this.NewPolygonLocation.createdId,
                rectNo: r.polyNo,
                polyNo: r.polyNo,
                points : r.points,
            }));
            console.log("1111111 : "+kfashionPolygonList);
            console.log("1111111 : "+this.workNo);
            const resp = yield axios.post(`/api/v1/kfashion/polygon/location`, kfashionPolygonList);
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