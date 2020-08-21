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
    @observable polyInfo1=[];
    @observable polyInfo2=[];
    @observable polyInfo3=[];
    @observable polyInfo4=[];
    @observable polygonInsertList= [];
    @observable polygonList= [];
    @observable locationPolygonList = [];
    @observable polyLast = 0;
    @observable polyInfo;
    @observable labelNoList;
    @observable polyInfo = [];


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


    LoadPolygonLocation = flow(function* LoadPolygonLocation(workNo, handleClickCallback) {
        this.locationPolygonList = [];
        try {
            const response = yield axios.get('/api/v1/kfashion/polygon/locationPolygonList?workNo='+workNo);
            this.locationPolygonList = response.data.locationPolygonList;
            this.tabIndex1 = response.data.polyNo[0];
            this.polyInfo = response.data.polyNo;
            this.polyLast = response.data.polyNo[response.data.polyNo.length-1] - 1;

            handleClickCallback(this.polyInfo, workNo);
        } catch (e) {
            console.log('error');
        }
    });

    LoadLabelNoList = flow(function* loadLabelNoList(workNo, labelNoListCallback ) {
        this.labelNoList = [];
        try {
            const response = yield axios.get('/api/v1/kfashion/label/labelNoList?workNo='+workNo);
            this.labelNoList = response.data.labelNoList;
            labelNoListCallback(response.data.labelNoList, workNo);
        } catch (e) {
            console.log('error')
        }
    });



    doPolygonLocationUp = flow(function* doPolygonLocationUp() {
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