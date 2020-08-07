import {action, computed, flow, observable, toJS} from "mobx";
import axios from "axios";
import {inject, observer} from "mobx-react";

const State = {
    comment:'',
    workNo:0,
    sendId:'',
    workStep1:'',
    workStep2:'',
    workType1:'',
    workType2:'',
    workType3:'',
    workType4:'',
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
    @observable newMsg = {...State};
    @observable checkBox = {...CheckBox};
    @observable inspectionHighList =[];
    @observable disabled = {...Disabled};
    @observable basicComplete = {...BasicComplete};

    @action changePolyInfo = (polyInfo) => {
        if( "" === polyInfo.filter(poly => poly == 1)) {
            this.disabled.onepieceDisabled = true;
        }
        if( "" === polyInfo.filter(poly => poly == 2)) {
            this.disabled.topDisabled = true;
        }
        if( "" === polyInfo.filter(poly => poly == 3)) {
            this.disabled.pantsDisabled = true;
        }
        if( "" === polyInfo.filter(poly => poly == 4)) {
            this.disabled.onepieceDisabled = true;
        }
    }

    @action resetType=()=>{
        this.newMsg.workStep1='';
        this.newMsg.workType1='';
        this.newMsg.workType2='';
        this.newMsg.workType3='';
        this.newMsg.workType4='';
    }
    @action checkAll=()=>{
        this.newMsg.workStep1=3;
        this.newMsg.workType1=1;
        this.newMsg.workType2=2;
        this.newMsg.workType3=3;
        this.newMsg.workType4=4;
    }
    @action checkPoly=(value)=>{
        this.checkBox.poly=value;
        if(value==true){
            this.checkBox.outer=true;
            this.checkBox.top=true;
            this.checkBox.pants=true;
            this.checkBox.onepiece=true;
            this.checkAll();
            this.newMsg.workStep1=3;
        }else{
            this.checkBox.outer=false;
            this.checkBox.top=false;
            this.checkBox.pants=false;
            this.checkBox.onepiece=false;
            this.resetType();
            this.newMsg.workStep1='';
        }
    }
    @action polyInfo =(value)=>{
        this.checkBox.poly = value;
    }
    @action checkLabel=(value)=>{
        this.checkBox.label=value;
        if(value==true){
            this.newMsg.workStep2=4;
        }else{
            this.newMsg.workStep2='';
        }
    }
    @action changeComment=(value)=>{
        this.newMsg.comment = value;
    }
    @action changeWorkNo=(value)=>{
        this.newMsg.workNo = value;
    }
    @action changeSendId=(value)=>{
        this.newMsg.sendId = value;
    }
    @action changeWorkType=(value)=>{
        console.log('changeWorkType',value)
        if(value == 'outer'){
            this.newMsg.workType1 = 1;
            this.checkBox.outer = true;
            this.newMsg.workStep1=3;
            this.polyInfo(true);
            console.log('changeWorkType',this.newMsg.workType1)
        }else if(value == 'top'){
            this.newMsg.workType2 = 2;
            this.checkBox.top = true;
            this.newMsg.workStep1=3;
            this.polyInfo(true);
            console.log('changeWorkType',this.newMsg.workType2)
        }else if(value == 'pants'){
            this.newMsg.workType3 = 3;
            this.checkBox.pants = true;
            this.newMsg.workStep1=3;
            this.polyInfo(true);
            console.log('changeWorkType',this.newMsg.workType3)
        }if(value == 'onepiece') {
            this.newMsg.workType4 = 4;
            this.checkBox.onepiece = true;
            this.newMsg.workStep1=3;
            this.polyInfo(true);
            console.log('changeWorkType',this.newMsg.workType4)
        }
    }
    @action changeWorkType1=(value)=>{
        console.log('changeWorkType',value)
        if(value == 'outer'){
            this.newMsg.workType1 = '';
            this.checkBox.outer = false;
        }else if(value == 'top'){
            this.newMsg.workType2 = '';
            this.checkBox.top = false;
        }else if(value == 'pants'){
            this.newMsg.workType3 = '';
            this.checkBox.pants = false;
        }if(value == 'onepiece') {
            this.newMsg.workType4 = '';
            this.checkBox.onepiece = false;
        }
        {!!this.checkBox.outer == false && !!this.checkBox.top == false && !!this.checkBox.pants == false && !!this.checkBox.onepiece == false ? this.checkBox.poly=false :this.checkBox.poly=true}
    }


    sendMsg = flow(function* sendMsg() {
        const param = toJS(this.newMsg);
        console.log('param', param)
        try {
            const resp = yield axios.post('/api/v1/kfashion/comment/highComment', param);
            if (resp.status === 200) {
                this.checkBox ={...CheckBox};
                this.LoadInspectionHighList1();
                this.newMsg ={...State};
                this.changeComment('')
                alert('작업이 반송처리 되었습니다');
            } else {
                this.state = State.Fail;
            }
        }catch (e) {
            console.log('comment 에러')
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


    LoadInspectionHighList1 = flow(function* loadInspectionHighList() {
        this.state = State.Pending;
        try {
            const response = yield axios.get('/api/v1/kfashion/img/inspectionHighList')
            this.inspectionHighList = response.data.inspectionHighList;
        } catch (e) {
            console.log('error')
        }
    });
}

