import { default as AuthStore } from "./AuthStore";
import SignUpStore from "./SignUpStore";
import SecondStepStore from "./SecondStepStore";
import FileUploadStore from "./FileUploadStore";
import ThirdStepStore from "./ThirdStepStore";
import CreateGroupDialogStore from "./CreateGroupDialogStore";
import AdminAuthorityStore from "./AdminAuthorityStore";

export const stores = {
    signUpStore: new SignUpStore(),
    authStore:  new AuthStore(),
    secondStepStore: new SecondStepStore(),
    fileUploadStore: new FileUploadStore(),
    thirdStepStore: new ThirdStepStore(),
    createGroupDialogStore : new CreateGroupDialogStore(),
    adminAuthorityStore : new AdminAuthorityStore(),
};