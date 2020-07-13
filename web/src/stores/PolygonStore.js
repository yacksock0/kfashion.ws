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
    @observable tabIndex1 =0;
    @observable polygonInsertList= [];
    @observable polygonList= [];
    @observable locationPolygonList = [];

    @action objGet = (obj) => {
        this.polygonInsertList = obj;
    }

    @action initStore = () => {
        this.polygonList = [];
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
    @computed get rectNo() {
        return this.NewPolygonLocation.rectNo;
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


    LoadPolygonImage = flow(function* LoadPolygonImage(createdId) {
        this.polygonList = [];
        try {
            const response = yield axios.get('/api/v1/kfashion/polygon/polygonList?createdId='+createdId)
            this.polygonList = response.data.polygonList;
        } catch (e) {
            console.log('error')
        }
    });


    LoadPolygonLocation = flow(function* LoadPolygonLocation(workNo) {
        this.locationPolygonList = [];
        try {
            const response = yield axios.get('/api/v1/kfashion/polygon/locationPolygonList?workNo='+workNo);
            this.locationPolygonList = response.data.locationPolygonList;
            this.tabIndex1 = response.data.polyNo;
            console.log(this.tabIndex1);
        } catch (e) {
            console.log('error');
        }
    });



    doPolygonLocationUp = flow(function* doPolygonLocationUp() {
        console.log("11111111111");
        this.state = State.Pending;
        try {
            const kfashionPolygonList = this.polygonInsertList.map(r => ({
                workNo :this.NewPolygonLocation.workNo,
                workStep : this.NewPolygonLocation.workStep,
                createdId : this.NewPolygonLocation.createdId,
                rectNo: r.polyNo,
                polyNo: r.polyNo,
                points : r.points,
            }));
            // const kfashionPolygonList = [];
            // kfashionPolygonList.concat(polygonList);
            // console.log("1111111 : "+this.workNo);
            console.log("1111111 : "+kfashionPolygonList);
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