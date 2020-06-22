import {action, flow, observable} from "mobx";
import axios from "axios";
import {State} from "./AuthStore";

export default class FileUploadStore {
    @observable uploadFile = '';

    @action

    fileUpload = flow(function* fileUpload(e) {
        this.uploadFile = State.Pending;

        try {
            const formData = new FormData();
            formData.append('file', e.target.file[0]);
            const response = yield axios.post('/api/v1/img/uploadImgFile', formData);
        } catch (e) {
            console.log('error다 이놈아');
        }
    });
}