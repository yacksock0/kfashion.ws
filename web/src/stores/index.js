import { default as AuthStore } from "./AuthStore";
import {default as CategoryStore} from "./CategoryStore";
import SignUpStore from "./SignUpStore";
import SecondStepStore from "./SecondStepStore";
import FileUploadStore from "./FileUploadStore";
import ThirdStepStore from "./ThirdStepStore";
import CreateGroupDialogStore from "./CreateGroupDialogStore";

export const stores = {
    signUpStore: new SignUpStore(),
    authStore:  new AuthStore(),
    categoryStore : new CategoryStore(),
    secondStepStore: new SecondStepStore(),
    fileUploadStore: new FileUploadStore(),
    thirdStepStore: new ThirdStepStore(),
    createGroupDialogStore : new CreateGroupDialogStore(),
};