import {action, computed, flow, observable} from "mobx";
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
    @observable workTypeList = [];
    @observable selectedItem = [];
    @observable total = 0;
    @observable complete = 0;

    @observable pageSize = 5;
    @observable page = 0;
    @observable totalCount = 0;
    @observable keyword = '';

    @action pageResetAll = () => {
        this.pageSize = 5;
        this.page = 0;
        this.totalCount = 0;
        this.keyword = '';
    }

    @action changePageSize = (pageSize) => {
        this.pageSize = pageSize;
    }
    @action changePage = (page) => {
        this.page = page;
    }
    @action changeKeyword = (keyword) => {
        this.keyword = keyword;
    }

    @action changeSelectedItem = (workNo) => {
        this.selectedItem = workNo;
    }

    @action selectedItemReset = () => {
        this.selectedItem = [];
    }

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
        } catch (e) {
            console.log('error')
        }
    });

    LoadWorkTypeList = flow(function* loadWorkTypeList(workNo,  handleClickCallback) {
        this.workTypeList = [];
        try {
            const response = yield axios.get('/api/v1/kfashion/comment/workTypeList?workNo='+workNo)
            this.workTypeList = response.data.workTypeList;
            handleClickCallback(this.workTypeList, workNo);
        } catch (e) {
            console.log('error')
        }
    });

    LoadRectImage = flow(function* LoadRectImage(createdId, handleListChange) {
        this.rectList = [];
        try {
            const response = yield axios.get('/api/v1/kfashion/rect/rectList', {
              params : {
                  createdId : createdId,
                  page : this.page,
                  pageSize : this.pageSize,
                  keyword : this.keyword,
              }
            })
            if(response.status === 200) {
                this.rectList = response.data.rectList;
                this.page =  response.data.page;
                this.totalCount = response.data.totalCount;
                this.pageSize = response.data.pageSize;
            }else {
                this.state = State.Fail;
            }
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
            const resp = yield axios.post(`/api/v1/kfashion/rect/location`, kfashionRectList);
            if (resp.status === 200) {
                // this.state = State.Success;
                // const createdId = this.NewRectLocation.createdId;
                // this.LoadRectImage(createdId);
                this.doPolygonLocationUp(changeWorkNo);

            };
        } catch (e) {
            console.log('error')
        }
    });

    sleep = (delay) => {
        let start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }

    doRectUpdate = flow(function* doRectUpdate(changeWorkNo) {
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
            yield this.sleep(60000000);
            const resp = yield axios.post(`/api/v1/kfashion/rect/updateLocation`, kfashionRectList);
            if (resp.status === 200) {
                this.doPolygonLocationUp(changeWorkNo);
            };
        } catch (e) {
            console.log('error')
        }
    });

    doPolygonLocationUp = flow(function* doPolygonLocationUp(changeWorkNo) {
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
                //작업 완료 후 리스트 갱신.
                const createdId = this.NewRectLocation.createdId;
                this.LoadRectImage(createdId);
                this.doPolygonCompleteUp(createdId,2)
                alert("작업이 저장되었습니다.");
                changeWorkNo(0);
            }
        } catch (e) {
            console.log('error');
        }
    });



    deleteImg = flow(function* deleteImg(selected,createdId) {
        if(selected.length > 0) {
            for (let i = 0; i < selected.length; i++) {
                try {
                    const resp = yield axios.delete(`/api/v1/kfashion/img/deleteCheckListImage/${selected[i]}`, {
                        data: {
                            workNo: selected[i]
                        }
                    })
                    if (resp.status === 200) {
                        this.state = State.Success;
                    } else {
                        this.state = State.Fail;
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            if (this.state === State.Success) {
                alert("이미지 삭제가 완료되었습니다.")
                this.LoadRectImage(createdId);
                this.doPolygonCompleteUp(createdId,2)
                this.selectedItemReset();
            }
        }
    })


    doPolygonCompleteUp = flow(function* doPolygonCompleteUp(id,authorityNo) {
        this.state = State.Pending;
        try {
            const resp = yield axios.post(`/api/v1/kfashion/work/history/progressRate?createdId=${id}&authorityNo=${authorityNo}`);
            if (resp.status === 200) {
                const selectWorPolygonRate = resp.data.selectWorPolygonRate;
                this.total = selectWorPolygonRate.totalWork;
                this.complete = selectWorPolygonRate.finishWork;
            } else {
                this.state = State.Fail;
            }
        } catch (e) {
            console.log('에러 좀 나지 마라 Label insert error (doProfessionalLabelUp check)');
        }
    });

}