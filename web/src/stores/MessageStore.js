import {action, computed, flow, observable, toJS} from "mobx";
import axios from "axios";

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

export default class MessageStore {
    @observable newMsg = {...State}

    @action changeComment=(value)=>{
        this.newMsg.comment = value;
    }
    @action changeWorkNo=(value)=>{
        this.newMsg.workNo = value;
    }
    @action changeWorkStep=(value)=>{
        console.log('value',value)
        this.newMsg.workStep1 = value;
    }
    @action changeWorkStep1=(value)=>{
        console.log('value',value)
        this.newMsg.workStep2 = value;
    }

    @action changeSendId=(value)=>{
        this.newMsg.sendId = value;
    }
    @action changeWorkType1=(value)=>{
        console.log('changeWorkType1',value)
        this.newMsg.workType1 = value;
    }
    @action changeWorkType2=(value)=>{
        console.log('changeWorkType2',value)
        this.newMsg.workType2 = value;
    }
    @action changeWorkType3=(value)=>{
        console.log('changeWorkType3',value)
        this.newMsg.workType3 = value;
    }
    @action changeWorkType4=(value)=>{
        console.log('changeWorkType4',value)
        this.newMsg.workType4 = value;
    }
    sendMsg = flow(function* sendMsg() {
        const param = toJS(this.newMsg);
        console.log('param', param)
        try {
            const resp = yield axios.post('/api/v1/kfashion/comment/highComment', param);
            console.log(resp)
        }catch (e) {
            console.log('comment 에러')
        }
    });
}

