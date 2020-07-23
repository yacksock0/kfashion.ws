import {action, computed, flow, observable, toJS} from "mobx";
import axios from "axios";

const State = {
    comment:'',
    workNo:0,
    sendId:'',
    workStep:'',
    workStep1:'',
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
        this.newMsg.workStep = value;
    }
    @action changeWorkStep1=(value)=>{
        console.log('value',value)
        this.newMsg.workStep1 = value;
    }

    @action changeSendId=(value)=>{
        this.newMsg.sendId = value;
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

