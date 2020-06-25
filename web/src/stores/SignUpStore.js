import {action, computed, flow, observable, toJS} from "mobx";
import axios from "axios";
import * as validation from "../common/Validation";

const MinUserId = 4;
const MinUserName = 2;
const MinPassword = 4;
const MinNickName = 2;

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    NotAvailableEmail: 'NotAvailableEmail',
    Success: 'Success',
    Fail: 'Fail',
}

const EmptyNewMember = {
    id: '',
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    nickName: '',
}

const EmptyAgreements = {
    all: false,
    service: false,
    privacy: false,
}

export default class SignUpStore {
    @observable state = State.Ready;
    @observable newMember = {...EmptyNewMember}
    @observable agreements = {...EmptyAgreements}
    @observable serverMode = '';

    @action initialize = (email) => {
        this.state = State.Ready;
        this.newMember = {...EmptyNewMember}
        this.agreements = {...EmptyAgreements}

        if((email !== undefined) && (email !== null) && (email.length > 0) && validation.validateEmail(email)) {
            this.newMember.email = email;
        }
    }

    @action clearState = () => {
        this.state = State.Ready;
    }
    @action changeNewMemberId = (id) => {
        this.newMember.id = id;
    }
    @action changeNewMemberEmail = (email) => {
        this.newMember.email = email;
    }

    @action changeNewMemberPassword = (password) => {
        this.newMember.password = password;
    }

    @action changeNewMemberPasswordConfirm = (passwordConfirm) => {
        this.newMember.passwordConfirm = passwordConfirm;
    }

    @action changeNewMemberUserName = (name) => {
        this.newMember.name = name;
    }

    @action changeNewMemberNickName = (nickName) => {
        this.newMember.nickName = nickName;
    }

    @action changeAgreementsAll = (allAgreement) => {
        if(allAgreement) {
            this.agreements.all = true;
            this.agreements.service = true;
            this.agreements.privacy = true;
        } else {
            this.agreements.all = false;
            this.agreements.service = false;
            this.agreements.privacy = false;
        }
    }

    @action changeAgreementsService = (serviceAgreements) => {
        if(serviceAgreements) {
            this.agreements.service = true;
        } else {
            this.agreements.all = false;
            this.agreements.service = false;
        }
    }

    @action changeAgreementsPrivacy = (privacyAgreements) => {
        if(privacyAgreements) {
            this.agreements.privacy = true;
        } else {
            this.agreements.all = false;
            this.agreements.privacy = false;
        }
    }

    @computed get isEmailInputed() {
        return (this.newMember.email !== undefined) && (this.newMember.email !== null) && (this.newMember.email.length > 0);
    }

    @computed get canSignUp() {
        const id = this.newMember.id.length >= MinUserId;
        const emailVerification = validation.validateEmail(this.newMember.email);
        const agreements = this.agreements.service && this.agreements.privacy;
        const passwordConfirm = this.newMember.password === this.newMember.passwordConfirm;
        const password = this.newMember.password.length >= MinPassword;
        const userName = this.newMember.name.length >= MinUserName;
        const nickName = this.newMember.nickName.length >= MinNickName;

        return emailVerification && agreements && passwordConfirm && password && userName && nickName;
    }

    @computed get canAdminSignUp() {
        const id = this.newMember.id.length >= MinUserId;
        const emailVerification = validation.validateEmail(this.newMember.email);
        const passwordConfirm = this.newMember.password === this.newMember.passwordConfirm;
        const password = this.newMember.password.length >= MinPassword;
        const userName = this.newMember.name.length >= MinUserName;
        const nickName = this.newMember.nickName.length >= MinNickName;

        return emailVerification && passwordConfirm && password && userName && nickName;
    }

    @computed get isValidId() {
        return this.newMember.id.length >= MinUserId;
    }
    @computed get isValidEmail() {
        return validation.validateEmail(this.newMember.email);
    }

    @computed get isValidPassword() {
        return this.newMember.password.length >= MinPassword;
    }

    @computed get isPasswordConfirmed() {
        return this.newMember.password === this.newMember.passwordConfirm;
    }

    @computed get isValidUsername() {
        return this.newMember.name.length >= MinUserName;
    }

    @computed get isValidNickName() {
        return this.newMember.nickName.length >= MinNickName;
    }

    @computed get isPending() {
        return this.state === State.Pending;
    }

    @computed get isSignUpSuccess() {
        return this.state === State.Success;
    }

    @computed get isSignUpFailed() {
        return this.state === State.Fail;
    }

    @computed get isNotAvailableEmail() {
        return this.state === State.NotAvailableEmail;
    }

    doSignUp = flow(function* doSignUp(doAction) {
        this.state = State.Pending;
        try {
        const response = yield axios.get(`/api/v1/users/signupcheck?email=${this.newMember.email}`)
        const isNotAvailEmail = response.data.result;

        if(!isNotAvailEmail) {

            const param = toJS(this.newMember);
            delete param.passwordConfirm;

            const resp = yield axios.post('/api/v1/kfashion/users/signup', param);
            if (resp.status === 200) {
                this.state = State.Success;
                if (doAction !== undefined) doAction();
            } else {
                this.state = State.NotAvailableEmail;
            }
        }else{
            console.log('이메일이 있다 임마')
        }
        } catch (e) {
            console.log('에러좀 나지 마라')
        }

    });

    getServerMode = flow(function* getServerMode() {
        try {
            const response = yield axios.get('/api/v1/informations/mode');
            const serverMode = response.data;

            this.serverMode = serverMode;
        } catch(error) {
            console.log("Can't get server mode");
        }
    })
}