import {action, computed, flow, observable} from "mobx";
import axios from "axios";

const STATE = {
    INITIAL : 'initial',
    PENDING : 'pending',
    DONE : 'done',
    ERROR : 'error'
}

export default class ImageStore {
    //observable
    @observable State = STATE.INITIAL;
    @observable boundaryList = [];
    @observable imagesList = [];
    @observable fileTotal = 0;
    @observable count = 0;
    @observable maxValue = 0;
    //action
    @action countChange = (max) => {
        this.count = max;
    }
    @action restFileTotal = (num) => {
        this.fileTotal = num;
    }
    @action changeFileTotal = (fileTotal) => {
        this.fileTotal = fileTotal;
    }
    @action countReset = (count) => {
        this.count = count;
    }
    @action initStore = () => {
        this.boundaryList = [];
        this.State = STATE.INITIAL;
    }
    @action setState = (state) => {
        this.State = state;
    }
    //드롭시 파일업로드
    fileupload = flow(function* fileupload(fileList, index, max) {
        try {
            this.setState(STATE.PENDING);
            if (max !== index) {
                const formData = new FormData();
                formData.append("file", fileList[index]);
                const resp = yield axios.post('/dnd/uploadFile', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                this.fileupload(fileList, index + 1, max);
                this.imagesList.push(resp.data);
                this.boundaryList = this.imagesList;
                //카운트 증가위함!
                this.count = this.count + 1;
                if (this.count >= max) this.maxValue += index + 1;
                if (this.count === max) this.setState(STATE.DONE);
            }
        } catch (error) {
            console.log(error);
            this.setState(STATE.ERROR);
        }
    });
}

