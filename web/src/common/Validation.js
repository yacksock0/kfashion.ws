export function validateEmail(email) {
    const regExp = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(.]?)$/;
    return regExp.test(String(email).toLowerCase());
}
//패스워드 유효성검사 추가 2020.10.29[이지현]
export function validatePw(password) {
    const regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{8,20}$/;
    return regExp.test(String(password).toLowerCase());
}
//아이디 유효성검사 추가 2020.10.29[이지현]
export function validateId(id) {
    const regExp = /^([a-z0-9]){8,20}$/;
    return regExp.test(String(id).toLowerCase());
}
//닉네임 이름 유효성검사 추가 2020.11.02[이지현]
export function validateName(name) {
    const regExp = /^[가-힣|a-z|A-Z|\*]{2,20}$/;
    return regExp.test(String(name).toLowerCase());
}
export function validateNickName(nickName) {
    const regExp = /^[가-힣|a-z|A-Z|0-9|\*]{2,20}$/;
    return regExp.test(String(nickName).toLowerCase());
}


