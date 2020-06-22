import {action, flow, observable} from "mobx";
import axios from "axios";
import {State} from "./AuthStore";

export default class FileUploadStore {
    @observable uploadFile = '';

    @action

    fileUpload = flow(function* doLogin() {
        this.uploadFile = State.Pending;

        try {
            const param = this.uploadFile;
            const response = yield axios.post('/api/v1/authentications/signin', param);
            const token = response.data.token;
            const user = response.data.user;

            console.log('doLogin');
            console.log(this);

            this.loginState = State.Authenticated;
            this.loginToken = token;
            this.loginUser = user;
        } catch (e) {
            this.loginState = State.Failed;
            this.loginToken = '';
            this.loginUser = Object.assign({}, EmptyUser);
        }
    });
}