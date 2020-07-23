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
    @action changeWorkType=(value)=>{
        console.log('changeWorkType',value)
        if(value == 'outer'){
            this.newMsg.workType1 = 1;
            console.log('changeWorkType',this.newMsg.workType1)
        }else if(value == 'top'){
            this.newMsg.workType2 = 2;
            console.log('changeWorkType',this.newMsg.workType2)
        }else if(value == 'pants'){
            this.newMsg.workType3 = 3;
            console.log('changeWorkType',this.newMsg.workType3)
        }if(value == 'onepiece') {
            this.newMsg.workType4 = 4;
            console.log('changeWorkType',this.newMsg.workType4)
        }
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

