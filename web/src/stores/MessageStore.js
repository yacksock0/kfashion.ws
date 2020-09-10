import {action, computed, flow, observable, toJS} from "mobx";
import axios from "axios";
const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    Success: 'Success',
    Fail: 'Fail',
}
const PolyMessage = {
    comment:'',
    workNo:0,
    sendId:'',
    workStep1:3,
    workType1:'',
    workType2:'',
    workType3:'',
    workType4:'',
}

const LabelMessage = {
    comment:'',
    workNo:0,
    sendId:'',
    workStep2:4,
}


const CheckBox ={
    poly:false,
    label:false,
    outer:false,
    top:false,
    pants:false,
    onepiece:false
}

const Disabled = {
    outerDisabled:false,
    topDisabled:false,
    pantsDisabled:false,
    onepieceDisabled:false
}

const BasicComplete = {
    createdId : '',
    workNo : '',
    workStep : 7,
}

export default class MessageStore {
    @observable polyMsg = {...PolyMessage};
    @observable labelMsg = {...LabelMessage}
    @observable checkBox = {...CheckBox};
    @observable inspectionHighList =[];
    @observable disabled = {...Disabled};
    @observable basicComplete = {...BasicComplete};
    @observable state = {...State};

    @observable pageSize = 5;
    @observable page = 0;
    @observable totalCount = 0;
    @observable keyword = '';

    @action checkBoxReset = () => {
        this.checkBox = {...CheckBox};
    }

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


    @action changePolyInfo = (polyInfo) => {
        if( "" === String(polyInfo.filter(poly => poly === 1))) {
            this.disabled.onepieceDisabled = true;
        }
        if( "" === String(polyInfo.filter(poly => poly === 2))) {
            this.disabled.topDisabled = true;
        }
        if( "" === String(polyInfo.filter(poly => poly === 3))) {
            this.disabled.pantsDisabled = true;
        }
        if( "" === String(polyInfo.filter(poly => poly === 4))) {
            this.disabled.onepieceDisabled = true;
        }
    }

    @action resetType=()=>{
        this.polyMsg.workType1='';
        this.polyMsg.workType2='';
        this.polyMsg.workType3='';
        this.polyMsg.workType4='';
        this.checkBox.outer=false;
        this.checkBox.top=false;
        this.checkBox.pants=false;
        this.checkBox.onepiece=false;
    }
    @action checkAll=()=>{
        this.polyMsg.workType1=1;
        this.polyMsg.workType2=2;
        this.polyMsg.workType3=3;
        this.polyMsg.workType4=4;
    }

    @action checkPoly=(value)=>{
        this.checkBox.poly=value;
        if(value===true){
            this.checkBox.outer=true;
            this.checkBox.top=true;
            this.checkBox.pants=true;
            this.checkBox.onepiece=true;
            this.checkAll();
        }else{
            this.checkBox.outer=false;
            this.checkBox.top=false;
            this.checkBox.pants=false;
            this.checkBox.onepiece=false;
            this.resetType();
        }
    }
    @action polyInfo =(value)=>{
        this.checkBox.poly = value;
    }

    @action checkLabel=(value)=>{
        this.checkBox.label=value;
    }

    @action changePolyComment=(value)=>{
        this.polyMsg.comment = value;
    }
    @action changePolyWorkNo=(value)=>{
        this.polyMsg.workNo = value;
    }
    @action changePolySendId=(value)=>{
        this.polyMsg.sendId = value;
    }

    @action changeLabelComment=(value)=>{
        this.labelMsg.comment = value;
    }
    @action changeLabelWorkNo=(value)=>{
        this.labelMsg.workNo = value;
    }
    @action changeLabelSendId=(value)=>{
        this.labelMsg.sendId = value;
    }


    @action changePolyWorkType=(value)=>{
        if(value === 'outer'){
            this.polyMsg.workType1 = 1;
            this.checkBox.outer = true;
            this.polyInfo(true);
        }else if(value === 'top'){
            this.polyMsg.workType2 = 2;
            this.checkBox.top = true;
            this.polyInfo(true);
        }else if(value === 'pants'){
            this.polyMsg.workType3 = 3;
            this.checkBox.pants = true;
            this.polyInfo(true);
        }if(value === 'onepiece') {
            this.polyMsg.workType4 = 4;
            this.checkBox.onepiece = true;
            this.polyInfo(true);
        }
    }
    @action changePolyWorkType1=(value)=>{
        if(value === 'outer'){
            this.polyMsg.workType1 = '';
            this.checkBox.outer = false;
        }else if(value === 'top'){
            this.polyMsg.workType2 = '';
            this.checkBox.top = false;
        }else if(value === 'pants'){
            this.polyMsg.workType3 = '';
            this.checkBox.pants = false;
        }if(value === 'onepiece') {
            this.polyMsg.workType4 = '';
            this.checkBox.onepiece = false;
        }
    }

    @computed get isPending() {
        return this.state === State.Pending;
    }

    @computed get isLabelUpSuccess() {
        return this.state === State.Success;
    }

    @computed get isLabelUpFailed() {
        return this.state === State.Fail;
    }

    sendMsg = flow(function* sendMsg() {
        const param = toJS(this.polyMsg);
        try {
            const resp = yield axios.post('/api/v1/kfashion/comment/highComment', param);
            if (resp.status === 200) {
                this.checkBox ={...CheckBox};
                this.LoadInspectionHighList1();
                this.polyMsg ={...PolyMessage};
                this.changePolyComment('')
                alert('작업이 반송처리 되었습니다');
            } else {
                this.state = State.Fail;
            }
        }catch (e) {
            console.log('comment 에러')
        }
    });

    sendSelectMsg = flow(function* sendSelectMsg(selected,createdId) {
        this.state = State.Pending;
        if(selected.length > 0) {
            for (let i = 0; i < selected.length; i++) {
                try {
                    this.changeLabelWorkNo(selected[i]);
                    this.changeLabelSendId(createdId)
                    const param = toJS(this.labelMsg);
                    const resp = yield axios.post('/api/v1/kfashion/comment/highCommentLabel', param);
                    if (resp.status === 200) {
                        this.state = State.Success;
                    } else {
                        this.state = State.Fail;
                    }
                } catch (e) {
                    console.log('에러좀 나지 마라')
                }
            }
            if (this.state === State.Success) {
                alert("작업이 반송처리 되었습니다");
                this.checkBox.label = false;
                this.labelMsg ={...LabelMessage};
                this.changeLabelComment('')
                this.LoadInspectionHighList1();
            }
        }
    });





    BasicCompleteUp = flow(function* basicCompleteUp(workNo,createdId) {
        this.state = State.Pending;
        try {
            this.basicComplete.workNo = workNo;
            this.basicComplete.createdId =createdId;
            const param = toJS(this.basicComplete);
            const resp = yield axios.post('/api/v1/kfashion/work/history/basicComplete',param);
            if (resp.status === 200) {
                alert("검수가 완료 되었습니다.");
                this.LoadInspectionHighList1();
            } else {
                this.state = State.Fail;
            }
        } catch (e) {
            console.log('에러좀 나지 마라')
        }
    });

    BasicSelectedCompleteUp = flow(function* basicSelectedCompleteUp(selected,createdId) {
        this.state = State.Pending;
        if(selected.length > 0) {
            for (let i = 0; i < selected.length; i++) {
                try {
                    this.basicComplete.workNo = selected[i];
                    this.basicComplete.createdId = createdId;
                    const param = toJS(this.basicComplete);
                    const resp = yield axios.post('/api/v1/kfashion/work/history/basicComplete', param);
                    if (resp.status === 200) {
                        this.state = State.Success;
                    } else {
                        this.state = State.Fail;
                    }
                } catch (e) {
                    console.log('에러좀 나지 마라')
                }
            }
            if (this.state === State.Success) {
                alert("검수가 완료 되었습니다.");
                this.LoadInspectionHighList1();
            }
        }
    });





    LoadInspectionHighList1 = flow(function* loadInspectionHighList1() {
        this.state = State.Pending;
        try {
            const response = yield axios.get('/api/v1/kfashion/img/inspectionHighList', {
                params : {
                    page : this.page,
                    pageSize : this.pageSize,
                    keyword : this.keyword,
            }
        })
            if(response.status === 200) {
                if(response.data.totalCount !== 0) {
                    this.inspectionHighList = response.data.inspectionHighList;
                    this.page =  response.data.page;
                    this.totalCount = response.data.totalCount;
                    this.pageSize = response.data.pageSize;
                }
            }else {
                this.state = State.Fail;
            }
        } catch (e) {
            console.log('error')
        }
    });
}

