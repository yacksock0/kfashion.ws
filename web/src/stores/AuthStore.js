import {action, flow, observable} from "mobx";
import axios from "axios";

export const State = {
    Authenticated: 'Authenticated',
    NotAuthenticated: 'NotAuthenticated',
    Pending: 'Pending',
    Failed: 'Failed',
};

export const LocalStorageTokenKey = '_BASKITOP_AUTHENTICATION_TOKEN_';
export const LocalStorageSaveIdKey = "Kfashion_AUTHENTICATION_SAVE_ID_";
export const LocalStorageSaveEmailKey = "_Kfashion_AUTHENTICATION_EMAIL_";
export const LocalStorageSaveNameKey = "_Kfashion_AUTHENTICATION_NAME_";


const EmptyLogin = {
    id: '',
    password: '',
};

const EmptyUser = {
    id: '',
    name: '',
    email: '',
    phone: '',
    groupNo: '',
    isAdmin: '',
    isApproved: '',
    authorityNo: '',
    groupAdmin: '',
    createdDatetime: '',
    updatedDatetime: '',

};

export default class AuthStore {
    @observable login = Object.assign({}, EmptyLogin);
    @observable loginState = State.NotAuthenticated;
    @observable loginToken = '';
    @observable loginUser = Object.assign({}, EmptyUser);

    @action changeLoginId = (id) => {
        this.login.id = id;
    };

    @action changeLoginPassword = (password) => {
        this.login.password = password;
    };

    @action logOut = pathname => {
        // if(pathname.startsWith("/broadcast/")) {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            this.doLogout();
        }
        // } else {
        //     this.doLogout();
        // }
    };

    @action invalidateLogin = () => {
        this.login = Object.assign({}, EmptyLogin);
        this.loginState = State.NotAuthenticated;
        this.loginToken = '';
        this.loginUser = Object.assign({}, EmptyUser);
    };

    doLogin = flow(function* doLogin() {
        this.loginState = State.Pending;

        try {
            const param = this.login;
            const response = yield axios.post('/api/v1/kfashion/authentications/signin', param);
            const token = response.data.token;
            const user = response.data.user;

            localStorage.setItem(LocalStorageTokenKey, token);

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

    checkLogin = flow(function* checkLogin() {
        const token = localStorage.getItem(LocalStorageTokenKey);

        if(token) {
            try {
                const response = yield axios.get('/api/v1/kfashion/authentications/signcheck');
                const token = response.data.token;
                const user = response.data.user;

                this.loginState = State.Authenticated;
                this.loginToken = token;
                this.loginUser = user;
            } catch(e) {
                this.loginState = State.NotAuthenticated;
                this.loginToken = '';
                this.loginUser = Object.assign({}, EmptyUser);
            }
        }
    });

    doLogout = flow(function* doLogout() {
        localStorage.removeItem(LocalStorageTokenKey);

        try {
            yield axios.post('/api/v1/kfashion/authentications/signout');

            console.log(this);
            this.login = Object.assign({}, EmptyLogin);
            this.loginState = State.NotAuthenticated;
            this.loginToken = '';
            this.loginUser = Object.assign({}, EmptyUser);
        } catch(e) {
            this.login = Object.assign({}, EmptyLogin);
            this.loginState = State.NotAuthenticated;
            this.loginToken = '';
            this.loginUser = Object.assign({}, EmptyUser);
        }
    });
}