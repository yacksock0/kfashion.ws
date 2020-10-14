import {action, computed, flow, observable, toJS} from "mobx";
import axios from "axios";
import * as validation from "../../common/Validation";

const MinUserId = 4;
const MinUserName = 2;
const MinPassword = 4;
const MinPhone = 13;

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    NotAvailableEmail: 'NotAvailableEmail',
    NotAvailableId: 'NotAvailableId',
    Success: 'Success',
    Fail: 'Fail',
}

const EmptyNewMember = {
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
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
    @action changeNewMemberPassword = (password) => {
        this.newMember.password = password;
    }

    @action changeNewMemberPasswordConfirm = (passwordConfirm) => {
        this.newMember.passwordConfirm = passwordConfirm;
    }

    @action changeNewMemberUserName = (name) => {
        this.newMember.name = name;
    }



    @computed get canSignUp() {
        // const id = this.newMember.id.length >= MinUserId;
        const passwordConfirm = this.newMember.password === this.newMember.passwordConfirm;
        const password = this.newMember.password.length >= MinPassword;
        const userName = this.newMember.name.length >= MinUserName;
        return  passwordConfirm && password && userName;
    }

    @computed get canAdminSignUp() {
        const id = this.newMember.id.length >= MinUserId;
        const emailVerification = validation.validateEmail(this.newMember.email);
        const passwordConfirm = this.newMember.password === this.newMember.passwordConfirm;
        const password = this.newMember.password.length >= MinPassword;
        const userName = this.newMember.name.length >= MinUserName;
        const phone = this.newMember.phone.length >= MinPhone;

        return id && emailVerification && passwordConfirm && password && userName && phone;
    }

    @computed get isValidId() {
        return this.newMember.id.length >= MinUserId;
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

    @computed get isNotAvailableId() {
        return this.state === State.NotAvailableId;
    }

    doSignUp = flow(function* doSignUp(history) {
        this.state = State.Pending;
        try {

            const responseId = yield axios.get(`/api/v1/kMatching/users/signupcheck/id?id=${this.newMember.id}`)
            const isNotAvailId = responseId.data.result;

            if(!isNotAvailId) {
                const param = toJS(this.newMember);
                delete param.passwordConfirm;
                const resp = yield axios.post('/api/v1/kMatching/users/signup', param)
                    .then (res => {

                        history.push("/matching/sign/success")
                    })
            }else{
                this.state = State.NotAvailableId;
            }
        } catch (e) {
            console.log('에러좀 나지 마라')
            this.state = State.Fail;
        }finally {
            this.state = State.Success;
            this.initialize();
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