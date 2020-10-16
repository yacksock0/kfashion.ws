import { action, flow, observable } from "mobx";
import axios from "axios";

export default class ImageStore {
    //observable
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
    }

    //드롭시 파일업로드
    fileupload = flow(function* fileupload(fileList, index, max) {
        //console.log('fileList, index, max :>> ', fileList, index, max);
        const formData = new FormData();
        formData.append("file", fileList[index]);

        try {

            if (max !== index) {
                const resp = yield axios.post('http://localhost:8080/dnd/uploadFile', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                this.fileupload(fileList, index + 1, max);
                this.imagesList.push(resp.data);
                this.boundaryList = this.imagesList;
                //[resp.data]
                // this.changeRecentlyImg(resp.data);
                //카운트 증가위함!
                this.count = this.count + 1;
                if (max === index) {
                }
                if (this.count >= max) {
                    this.maxValue += index + 1;
                }
            }
        } catch (error) {
            console.log(error);
        }
    });
}

