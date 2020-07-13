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
    workStep : 3,
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
    @observable List = [];
    @observable NewRectLocation = {...EmptyNewRectLocation};
    @observable rectInsertList= [];
    @observable rectList = [];
    @observable locationRectList = [];
    @observable polygonInsertList= [];
    @observable polygonList= [];
    @observable locationPolygonList = [];

    @action objGet = (rectangle, polygon) => {
        this.rectInsertList = rectangle;
        this.polygonInsertList = polygon;

    }

    @action initStore = () => {
        this.rectList = [];

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

    LoadRectLocation = flow(function* LoadRectLocation(workNo) {
        this.locationRectList = [];
        try {
            const response = yield axios.get('/api/v1/kfashion/rect/locationRectList?workNo='+workNo)
            this.locationRectList = response.data.locationRectList;
            console.log(this.locationRectList);
        } catch (e) {
            console.log('error')
        }
    });

    LoadRectImage = flow(function* LoadRectImage(createdId) {
        this.rectList = [];
        try {
            const response = yield axios.get('/api/v1/kfashion/rect/rectList?createdId='+createdId)
            this.rectList = response.data.rectList;
            return this.rectList;
        } catch (e) {
            console.log('error')
        }
    });

    doRectLocationUp = flow(function* doRectLocationUp(doAction) {
        this.state = State.Pending;
        try {

            const kfashionRectList = this.rectInsertList.map(r => ({
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
                const createdId = this.NewRectLocation.createdId;
                this.LoadRectImage(createdId);
            };

            this.doPolygonLocationUp();
        } catch (e) {
            console.log('error')
        }
    });

    doPolygonLocationUp = flow(function* doPolygonLocationUp() {
        this.state = State.Pending;
        try {
            const kfashionPolygonList = this.polygonInsertList.map(r => ({
                workNo :this.NewRectLocation.workNo,
                workStep : this.NewRectLocation.workStep,
                createdId : this.NewRectLocation.createdId,
                rectNo: r.polyNo,
                polyNo: r.polyNo,
                points : r.points,
            }));
            const resp = yield axios.post(`/api/v1/kfashion/polygon/location`, kfashionPolygonList);
            if (resp.status === 200) {
                this.state = State.Success;
                const createdId = this.NewPolygonLocation.createdId;
                this.LoadPolygonImage(createdId);
            } else {
            }
        } catch (e) {
            console.log('error')
        }
    });



}