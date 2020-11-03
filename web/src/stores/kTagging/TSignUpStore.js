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

    @observable pwCK = false;
    @observable questionCK = false;
    @observable pwSnack = false;
    @observable idSnack = false;

    @action  handleAgreeOK = () => {
        this.agreeOK = true;
    }
    @action  handleIdOK2 = () => {
        this.checkId2();
    }
    @action  handleIdOK = () => {
        this.checkId();
    }
    @action  handleUserInfoCK = (history) => {
        this.checkNickName(history);
    }
    @action  handleUserInfoOK = () => {
        this.userInfoOK = true;
    }

    checkNickName = flow(function* checkNickName(history) {
        try {
            const responseNick = yield axios.get(`/api/v1/kTagging/users/signupcheck/nickname?nickName=${this.newMember.nickName}`)
            if (responseNick.data.result) {
                this.handleSnackIdOpen();
            } else {
                this.handleUserInfoOK();
                this.handleSnackIdClose();
                history.push("/tagging/question");
            }
        } catch (e) {
            console.log('checkNickName ERROR!')
        } finally {
        }
    });
    checkId = flow(function* checkId() {
        try {
            const responseId = yield axios.get(`/api/v1/kTagging/users/signupcheck/id?id=${this.newMember.id}`)
            const isNotAvailId = responseId.data.result;

            if(isNotAvailId) {
                this.handleSnackIdOpen();
            }else{
                this.idOK = true;
                this.handleSnackIdClose();
            }
        } catch (e) {
            console.log('에러좀 나지 마라')
        }finally {
        }
    });
    //비밀번호 찾기시 아이디체크 20.10.29[이지현]
    checkId2 = flow(function* checkId2() {
        try {
            const responseId = yield axios.get(`/api/v1/kTagging/users/signupcheck/id?id=${this.newMember.id}`)
            const isNotAvailId = responseId.data.result;

            if(!isNotAvailId) {
                this.handleSnackPwOpen();
                //여기에 스넥바바뀌기
            }else{
                this.handleSnackPwClose();
                this.idOK = true;
            }
        } catch (e) {
            console.log('checkId2 ERROR!')
        }finally {
        }
    });

    @action  handlePwOK = () => {
        this.pwOK = true;
    }
    @action  handlePwOK2 = () => {
        this.pwCK = true;
        this.doChangePassword();
    }
    @action  handleUserInfoOK2 = (history) => {
        this.doCheckName(history)
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

    @action handleSnackPwOpen = () => {
        this.pwSnack = true;
    }
    @action handleSnackPwClose = () => {
        this.pwSnack = false;
    }
    @action handleSnackIdOpen = () => {
        this.idSnack = true;
    }
    @action handleSnackIdClose = () => {
        this.idSnack = false;
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
        this.pwCK = false;
        this.agreeOK = false;
        this.userInfoOK = false;
        this.questionCK = false;
        this.idSnack = false;
        this.pwSnack = false;
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
    @action changeQuestionCk = () => {
        this.questionCK = true;
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
        return validation.validateId(this.newMember.id);
    }
    @computed get isValidPassword() {
        return validation.validatePw(this.newMember.password);
    }
    @computed get isPasswordConfirmed() {
        return this.newMember.password === this.newMember.passwordConfirm;
    }
    @computed get isValidUserName() {
        return validation.validateName(this.newMember.name);
    }
    @computed get isValidNickName() {
        return validation.validateNickName(this.newMember.nickName);
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

        const responseId = yield axios.get(`/api/v1/kTagging/users/signupcheck/id?id=${this.newMember.id}`)
        const isNotAvailId = responseId.data.result;

        if(!isNotAvailId) {
            const param = toJS(this.newMember);
            delete param.passwordConfirm;
            const resp = yield axios.post('/api/v1/kTagging/users/signup', param)
                .then (res => {
                    history.push("/tagging/sign/success")
                })
        }else{
             this.state = State.NotAvailableId;
        }
        } catch (e) {
            console.log('TSignUpStore doSignUp error');
            this.state = State.Fail;
        }finally {
            this.state = State.Success;
        }
    });

    doChangePassword = flow(function* doChangePassword() {
        this.state = State.Pending;
        try {
            const param = toJS(this.newMember);
            delete param.passwordConfirm;
            const resp = yield axios.post('/api/v1/kTagging/users/changepassword', param)
        } catch (e) {
            console.log(e)
            console.log('왜안되지')
            this.state = State.Fail;
        }finally {
            this.state = State.Success;
        }
    });

    // 아이디찾기 닉네임, 아이디 체크 20.10.29[이지현]
    doCheckName = flow(function* doChackName() {
        this.state = State.Pending;
        try {
            const param = toJS(this.newMember);
            delete param.passwordConfirm;
            const resp = yield axios.post('/api/v1/kTagging/users/nameck', param)
                .then (res => {
                    if(res.data.result){
                        let test = res.data.result;
                        console.log(test)
                        this.findIdMemberSet(test);
                        this.handleUserInfoOK();
                        this.handleSnackIdClose();
                    }else{
                        this.handleSnackIdOpen();
                    }
                })
        } catch (e) {
            console.log(e)
            this.state = State.Fail;
        }finally {
            this.state = State.Success;
        }
    });


    doFindUser = flow(function* doFindUser(history, type) {
        this.state = State.Pending;
        try {
            const param = toJS(this.newMember);
            delete param.passwordConfirm;
            const responseId = yield axios.post(`/api/v1/kTagging/users/find`, param)
                .then (res => {
                    if(res.data.result){
                        let test = res.data.result;
                        this.findIdMemberSet(test);
                    }else{
                        this.findIdMemberSet({});
                    }
                })
        } catch (e) {
            console.log('TSignUpStore doFindId error');
            this.state = State.Fail;
        }finally {
            this.state = State.Success;
            if(type === "ID"){
                history.push("/tagging/completeId");
            }else if(type ==="PW"){
                history.push("/tagging/completePw");
            }

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