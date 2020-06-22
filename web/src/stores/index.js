import { default as AuthStore } from "./AuthStore";
import {default as CategoryStore} from "./CategoryStore";
import SignUpStore from "./SignUpStore";
import SecondStepStore from "./SecondStepStore";
import FileUploadStore from "./FileUploadStore";

export const stores = {
    signUpStore: new SignUpStore(),
    authStore:  new AuthStore(),
    categoryStore : new CategoryStore(),
    secondStepStore: new SecondStepStore(),
    fileUploadStore: new FileUploadStore(),
};