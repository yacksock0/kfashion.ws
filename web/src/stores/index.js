import { default as AuthStore } from "./AuthStore";
import {default as CategoryStore} from "./CategoryStore";
import SignUpStore from "./SignUpStore";

export const stores = {
    signUpStore: new SignUpStore(),
    authStore:  new AuthStore(),
    categoryStore : new CategoryStore(),
};