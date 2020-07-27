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

    LoadRectImage = flow(function* LoadRectImage(createdId, handleListChange) {
        this.rectList = [];
        try {
            const response = yield axios.get('/api/v1/kfashion/rect/rectList?createdId='+createdId)
            this.rectList = response.data.rectList;

            //polygon 입력하고 호출될 땐 핸들러가 없어서 오류남.
            if(handleListChange != null){
                handleListChange(this.rectList.length);
            }
        } catch (e) {
            console.log('error')
        }
    });

    doRectLocationUp = flow(function* doRectLocationUp(changeWorkNo) {
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
            alert(kfashionRectList);
            console.log(kfashionRectList);
            // const resp = yield axios.post(`/api/v1/kfashion/rect/location`, kfashionRectList); //  /updateLocation
            // if (resp.status === 200) {
            //     // this.state = State.Success;
            //     // const createdId = this.NewRectLocation.createdId;
            //     // this.LoadRectImage(createdId);
            //     this.doPolygonLocationUp();
            //     changeWorkNo(0);
            // };


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
                alert("작업이 저장되었습니다.");
                this.state = State.Success;

                //작업 완료 후 리스트 갱신.
                const createdId = this.NewRectLocation.createdId;
                this.LoadRectImage(createdId);
            }
        } catch (e) {
            console.log('error');
        }
    });


    deleteImg = flow(function* deleteImg(workNo,createdId) {
        console.log(workNo);
        try {
            const resp = yield axios.delete(`/api/v1/kfashion/img/deleteImage/${workNo}`, {
                data: {
                    workNo: workNo
                }
            })
            if(resp.status === 200) {
                alert('이미지가 삭제 되었습니다.')
                this.LoadRectImage(createdId);
            }
        } catch (err) {
            console.log(err);
        }
    })


}