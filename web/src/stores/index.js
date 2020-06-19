import { default as AuthStore } from "./AuthStore";
import SecondStepStore from "./SecondStepStore";
import SignUpStore from "./SignUpStore";

export const stores = {
    authStore:  new AuthStore(),
    signUpStore: new SignUpStore(),
    secondStepStore : new SecondStepStore(),
};