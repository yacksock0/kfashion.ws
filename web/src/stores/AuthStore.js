import {action, computed, flow, observable} from "mobx";
import axios from "axios";

export const State = {
    Authenticated: 'Authenticated',
    NotAuthenticated: 'NotAuthenticated',
    Pending: 'Pending',
    Failed: 'Failed',
};

export const LocalStorageTokenKey = '_BASKITOP_AUTHENTICATION_TOKEN_';

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
    @observable saveId = false;
    @observable loginUser = Object.assign({}, EmptyUser);

    @action changeLoginId = (id) => {
        this.login.id = id;
    };

    @action changeLoginPassword = (password) => {
        this.login.password = password;
    };

    @action changeUserAuthorityNo = (authorityNo) =>{
        this.loginUser.authorityNo = authorityNo;
    };
    @action logOut = pathname => {
         if(pathname.startsWith("/broadcast/")) {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            this.doLogout();
        }
         } else {
             this.doLogout();
         }
    };
    @computed get loginUserAuthorityNo(){
        return this.loginUser.groupNo;
    }

    @computed get isUserId() {
       return this.loginUser.id;
    }

    @action invalidateLogin = () => {
        this.login = Object.assign({}, EmptyLogin);
        this.loginState = State.NotAuthenticated;
        this.loginToken = '';
        this.loginUser = Object.assign({}, EmptyUser);
    };

    doLogin = flow(function* doLogin(history) {
        this.loginState = State.Pending;
        try {
            const param = this.login;
            const response = yield axios.post('/api/v1/kfashion/authentications/signin', param);
            const token = response.data.token;
            const user = response.data.user;
            localStorage.setItem(LocalStorageTokenKey, token);
            console.log('doLogin');
            this.loginState = State.Authenticated;
            this.loginToken = token;
            this.loginUser = user;
            history.push('/home');
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
                const user = response.data;
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