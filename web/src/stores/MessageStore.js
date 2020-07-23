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
        {value == 'checked' ? this.newMsg.workStep = 3 : this.newMsg.workStep = ''};
    }
    @action changeWorkStep1=(value)=>{
        {value == 'checked' ? this.newMsg.workStep1 = 4 : this.newMsg.workStep1 = ''};
    }
    @action changeSendId=(value)=>{
        this.newMsg.sendId = value;
    }
    sendMsg = flow(function* sendMsg() {
        const param = toJS(this.newMsg);
        console.log('param', param)
        const resp = yield axios.post('/api/v1/kfashion/group/create', param);
    });
}

