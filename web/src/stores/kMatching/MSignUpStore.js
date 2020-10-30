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
    nickName :'',
    question1 : 0,
    answer1 : '',
    question2 : 0,
    answer2 : '',
    question3 : 0,
    answer3 : '',
}

const EmptyAgreements = {
    all: false,
    service: false,
    privacy: false,
}

export default class SignUpStore {
    @observable state = State.Ready;
    @observable newMember = {...EmptyNewMember}
    @observable member = {}
    @observable agreements = {...EmptyAgreements}
    @observable serverMode = '';
    @observable isAllSelected = false;

    @observable agreeOK = false;
    @observable idOK = false;
    @observable pwOK = false;
    @observable userInfoOK = false;

    @action  handleAgreeOK = () => {
        this.agreeOK = true;
    }
    @action  handleIdOK2 = () => {
        this.idOK = true;
    }
    @action  handleIdOK = () => {
        this.checkId();
    }
    checkId = flow(function* checkId() {
        try {
            const responseId = yield axios.get(`/api/v1/kMatching/users/signupcheck/id?id=${this.newMember.id}`)
            const isNotAvailId = responseId.data.result;

            if(isNotAvailId) {
                alert("이미 존재하는 아이디입니다.");
            }else{
                this.idOK = true;
            }
        } catch (e) {
            console.log('checkId ERROR!')
        }finally {
        }
    });

    @action  handlePwOK = () => {
        this.pwOK = true;
    }
    @action  handleUserInfoOK = () => {
        this.userInfoOK = true;
        console.log(this.newMember.name.length)
        console.log(this.newMember.nickName.length)
    }

    @action  changeNewMemberQuestion1 = (event) => {
        this.newMember.question1 = event.target.value;
    }
    @action  changeNewMemberAnswer1 = (event) => {
        this.newMember.answer1 = event.target.value;
    }
    @action  changeNewMemberQuestion2 = (event) => {
        this.newMember.question2 = event.target.value;
    }
    @action  changeNewMemberAnswer2 = (event) => {
        this.newMember.answer2 = event.target.value;
    }
    @action  changeNewMemberQuestion3 = (event) => {
        this.newMember.question3 = event.target.value;
    }
    @action  changeNewMemberAnswer3 = (event) => {
        this.newMember.answer3 = event.target.value;
    }
    @action findIdMemberSet = (result) => {
        this.member = result;
    }

    @computed get isCheckQuestion() {
        return this.newMember.question1 !== 0
            && this.newMember.question2 !== 0
            && this.newMember.question3 !== 0;
    }
    @computed get isCheckAnswer() {
        return this.newMember.answer1 !== ''
            && this.newMember.answer2 !== ''
            && this.newMember.answer3 !== '';
    }

    @action initialize = (email) => {
        this.state = State.Ready;
        this.newMember = {...EmptyNewMember}
        this.agreements = {...EmptyAgreements}
        this.idOK = false;
        this.pwOK = false;
        this.agreeOK = false;
        this.userInfoOK = false;
        this.member = {}
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

    @action changeNewMemberUserName = (event) => {
        this.newMember.name = event.target.value;
    }
    @action changeNewMemberNickName = (event) => {
        this.newMember.nickName = event.target.value;
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

    @computed get isValidUserName() {
        return this.newMember.name.length >= MinUserName;
    }
    @computed get isValidNickName() {
        return this.newMember.nickName.length >= MinUserName;
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



    AllSelected = flow(function* isAllSelected(isAllSelected) {
        this.isAllSelected = isAllSelected
    })

    doSignUp = flow(function* doSignUp(history) {
        this.state = State.Pending;
        try {

            const responseId = yield axios.get(`/api/v1/kMatching/users/signupcheck/id?id=${this.newMember.id}`)
            const isNotAvailId = responseId.data.result;

            if(!isNotAvailId) {
                const param = toJS(this.newMember);
                delete param.passwordConfirm;
                yield axios.post('/api/v1/kMatching/users/signup', param)
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
        }
    });


    doFindUser = flow(function * doFirdUser(history, type){
        this.state = State.Pending;
        try {
            const param = toJS(this.newMember);
            console.log(param)
            delete param.passwordConfirm;
            const responsId = yield axios.post(`/api/v1/kMatching/users/find`, param)
                .then (res => {
                    if(res.data.result){
                        let test = res.data.result;
                        console.log(test)

                        this.findIdMemberSet(test);
                    }else{
                        this.findIdMemberSet({});
                    }
                })
        } catch (e) {
            console.log('MSignUpStore doFindId error');
            this.state = State.Fail;
        }finally {
            this.state = State.Success;
            if(type === "ID"){
                history.push("/matching/completeId");
            }else if(type ==="PW"){
                history.push("/matching/completePw");
            }

        }
    })
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