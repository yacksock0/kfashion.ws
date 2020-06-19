import { default as AuthStore } from "./AuthStore";
import {default as CategoryStore} from "./CategoryStore";
import SignUpStore from "./SignUpStore";

export const stores = {
    authStore:  new AuthStore(),
    categoryStore : new CategoryStore(),
    sinupStore : new SignUpStore(),
};