import {action, flow, observable} from "mobx";
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
    fileupload = flow(function* fileupload(file) {
        try {
            this.setState(STATE.PENDING);
                const formData = new FormData();
                formData.append("file", file);
                const resp = yield axios.post('/api/v1/kSearching/img/uploadFile', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                this.imagesList.push(resp.data);
                this.boundaryList = this.imagesList;
        } catch (error) {
            console.log(error);
        }finally {
            this.setState(STATE.ERROR);
        }
    });
}

