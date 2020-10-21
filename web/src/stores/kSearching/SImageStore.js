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
    @observable imgData = '';
    @observable fileName = '';
    @observable fileType = '';
    //action
    @action initStore = () => {
        this.boundaryList = [];
        this.State = STATE.INITIAL;
    }
    @action setState = (state) => {
        this.State = state;
    }
    @action changeImg = () => {
        this.imgData = 'data:image/jpeg;base64,'+this.boundaryList.imgData;
        this.fileName = this.boundaryList.fileName;
        this.fileType = this.boundaryList.fileType;
    }
    //드롭시 파일업로드
    fileupload = flow(function* fileupload(files) {
        const formData = new FormData();
        formData.append('file', files)
        try {
            this.setState(STATE.PENDING);
            const resp = yield axios.post('/api/v1/kSearching/img/uploadFile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            this.boundaryList = resp.data;
            this.changeImg();
        } catch (error) {
            console.log(error);
        }finally {
            this.setState(STATE.ERROR);
        }
        
    });
}

