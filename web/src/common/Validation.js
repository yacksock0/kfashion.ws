export function validateEmail(email) {
    const regExp = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(.]?)$/;
    return regExp.test(String(email).toLowerCase());
}
//패스워드 유효성검사 추가 2020.10.29[이지현]
export function validatePw(password) {
    const regExp = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
    return regExp.test(String(password).toLowerCase());
}
//아이디 유효성검사 추가 2020.10.29[이지현]
export function validateId(id) {
    const regExp = /^.*(?=.{8,20})(?=.*[a-zA-Z]).*$/;
    return regExp.test(String(id).toLowerCase());
}