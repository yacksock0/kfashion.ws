import {action, flow, observable} from "mobx";
import axios from "axios";
import {State} from "./AuthStore";

const AddState = {
    Closed: 'Closed',
    Opened: 'Opened',
    Adding: 'Adding',
    Added: 'Added',
    AddFailed: 'AddFailed',
};
const UpdateState = {
    Closed: 'Closed',
    Loading: 'Loading',
    Loaded: 'Loaded',
    LoadFailed: 'LoadFailed',
    Updating: 'Updating',
    Updated: 'Updated',
    UpdateFailed: 'UpdateFailed',
    Uploading: 'Uploading',
    Uploaded: 'Uploaded',
    UploadFailed: 'UploadFailed',
};
export default class FileUploadStore {
    @observable fileList = [];
    @observable uploadFile = '';
    @observable addState = AddState.Closed;
    @observable updateState = UpdateState.Closed;
    @observable state = State.Ready;
/*
    @action fileUploadHandle = () => {
        this.fileUpload();
    }
*/
    @action changeUploadFile = (file) => {
        this.uploadFile = file;
    }
/*    @computed get isAdding() {
        return this.addState === AddState.Adding;
    }

    @computed get isAdded() {
        return this.addState === AddState.Added;
    }

    @computed get isAddFailed() {
        return this.addState === AddState.AddFailed;
    }*/


 /*   fileUpload = flow(function* fileUpload(e) {
        const formData = new FormData()

        formData.append('file', blob, 'filename.jpg')
        formData.append('subPath', 'shop')

        const res = await axios.post(`/api/v1/img/uploadImgFile`, formData)
        try {
            const formData = new FormData();
            formData.append('file', e.target.file[0]);
            const response = yield axios.post('/api/v1/img/uploadImgFile', formData);
            if(response.status === 200) {
            }
        } catch (e) {
            console.log('error다 이놈아');
        }
    });*/

    uploadFile = flow(function* uploadFile(userId) {
        this.updateState = UpdateState.Uploading;

        try {
            const fileParam = new FormData();
            fileParam.append('boardAttach', JSON.stringify({
            }));
            fileParam.append('file', this.uploadFile);

            yield axios.post('/api/v1/img/uploadFile', fileParam);

            const fileResponse = yield axios.get(`/api/v1/img/uploadFile`);
            const files = fileResponse.data;

            this.uploadFile = '';
            this.fileList = files;
            this.updateState = UpdateState.Uploaded;
        } catch (error) {
            this.updateState = UpdateState.UploadFailed;
        }
    })
    addNewImg = flow(function* addNewBoard() {
        this.addState = AddState.Adding;

        try {
                const fileParam = new FormData();
                fileParam.append('file', this.uploadFile);

                yield axios.post('/api/v1/files/board-attach', fileParam);
            this.file = '';
            this.addState = AddState.Added;
        } catch(error) {
            this.addState = AddState.AddFailed;
        }
    })

}