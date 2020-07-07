import {action, computed, flow, observable} from "mobx";
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
export const LocalStorageSaveIsAdminKey = "_Kfashion_AUTHENTICATION_ISADMIN_";
export const LocalStorageSaveIsApprovedKey = "_Kfashion_AUTHENTICATION_ISAPPROVED_";
export const LocalStorageSaveGroupAdminKey = "_Kfashion_AUTHENTICATION_GROUPADMIN_";
export const LocalStorageSaveGroupNoKey = "_Kfashion_AUTHENTICATION_GROUPNO_";
export const LocalStorageSaveAuthorityNoKey = "_Kfashion_AUTHENTICATION_AUTHORITYNO_";



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

    // @action checkLoginId = () => {
    //     const savedId = localStorage.getItem(LocalStorageSaveIdKey);
    //     const saveEmail = localStorage.getItem(LocalStorageSaveEmailKey);
    //     const saveName = localStorage.getItem(LocalStorageSaveNameKey);
    //     const saveIsAdmin = localStorage.getItem(LocalStorageSaveIsAdminKey)
    //     const saveIsApproved = localStorage.getItem(LocalStorageSaveIsApprovedKey)
    //     const saveGroupAdmin = localStorage.getItem(LocalStorageSaveGroupAdminKey)
    //     const saveSaveGroupNo = localStorage.getItem(LocalStorageSaveGroupNoKey)
    //     const saveSaveAuthorityNo = localStorage.getItem(LocalStorageSaveAuthorityNoKey)
    //
    // };
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
        // if(pathname.startsWith("/broadcast/")) {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            this.doLogout();
        }
        // } else {
        //     this.doLogout();
        // }
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

    doLogin = flow(function* doLogin() {
        this.loginState = State.Pending;

        try {
            const param = this.login;
            const response = yield axios.post('/api/v1/kfashion/authentications/signin', param);
            const token = response.data.token;
            const user = response.data;
            localStorage.setItem(LocalStorageTokenKey, token);
            console.log('doLogin');
            this.loginState = State.Authenticated;
            this.loginToken = token;
            this.loginUser = user;
            console.log(this.loginUser)
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
                console.log( 'user:', user)
                this.loginState = State.Authenticated;
                this.loginToken = token;
                this.loginUser = user;
                console.log(this.loginUser)
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