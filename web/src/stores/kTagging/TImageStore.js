import {action, flow, observable} from "mobx";
import axios from "axios";

const STATE = {
    INITIAL: 'initial',
    PENDING: 'pending',
    DONE: 'done',
    ERROR: 'error'
}

export default class ImageStore {
    //observable
    @observable State = STATE.INITIAL;
    @observable boundaryList = [];
    @observable imagesList = [];
    @observable fileTotal = 0;
    @observable count = 0;
    @observable maxValue = 0;
    @observable progress = 0;
    @observable dataList = [];
    @observable csvData = [];
    @observable textData = '';
    @observable table = 3;
    @observable test = [];
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
        this.resetDownload();
    }
    @action setState = (state) => {
        this.State = state;
    }
    @action resetProgress = () => {
        this.progress = 0;
    }
    @action resetDownload = () => {
        this.csvData = [];
        this.dataList = [];
        this.textData = [];
    }
    // @action changeTableRow = () => {
    //     this.table = this.count;
    //     console.log(this.count + '카운트입니다.')
    // }
    //드롭시 파일업로드
    fileupload = flow(function* fileupload(fileList, index, max) {
        const formData = new FormData();
        formData.append("file", fileList[index]);
        try {
            this.setState(STATE.PENDING);
            if (max !== index) {
                const resp = yield axios.post('/dnd/uploadFile', formData, {
                    headers: {'Content-Type': 'multipart/form-data'},
                });
                this.fileupload(fileList, index + 1, max);
                this.imagesList.push(resp.data.boundaryList);
                this.boundaryList = this.imagesList;
                this.dataList.push(resp.data.exportMap);
                this.csvData = this.dataList;
                this.textData = JSON.stringify(this.csvData);
                //카운트 증가위함!
                this.count = this.count + 1;
                // this.changeTableRow()
                if (this.count >= max) {
                    this.maxValue = 0;
                    this.maxValue += index + 1;
                    this.imagesList = [];
                }
                //progress bar && 메세지 && 버튼 등 한번에 활성화(2020.10.20 이지현)
                if (this.count === max) setTimeout(() => {
                    this.setState(STATE.DONE)
                    this.resetProgress()
                }, 700);
            }
            //progress바 %로변환
            if (max >= 1) {
                this.progress = this.count / max * 100

            }
            //table row 수

        } catch (error) {
            console.log(error);
            this.setState(STATE.ERROR);
        }
    });
}

