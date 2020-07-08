import { default as AuthStore } from "./AuthStore";
import SignUpStore from "./SignUpStore";
import SecondStepStore from "./SecondStepStore";
import FileUploadStore from "./FileUploadStore";
import ThirdStepStore from "./ThirdStepStore";
import CreateGroupDialogStore from "./CreateGroupDialogStore";
import AdminAuthorityStore from "./AdminAuthorityStore";
import ProfessionalLabelStore from "./ProfessionalLabelStore";
import BasicLabelStore from "./BasicLabelStore";
import UserListStore from "./UserListStore";
import ImageStore from "./ImageStore";
import RectStore from "./RectStore";
import PolygonStore from "./PolygonStore";
import GroupStore from "./GroupStore";


export const stores = {
    signUpStore: new SignUpStore(),
    authStore:  new AuthStore(),
    secondStepStore: new SecondStepStore(),
    fileUploadStore: new FileUploadStore(),
    thirdStepStore: new ThirdStepStore(),
    createGroupDialogStore : new CreateGroupDialogStore(),
    adminAuthorityStore : new AdminAuthorityStore(),
    professionalLabelStore : new ProfessionalLabelStore(),
    basicLabelStore : new BasicLabelStore(),
    userListStore: new UserListStore(),
    imageStore : new ImageStore(),
    rectStore : new RectStore(),
    polygonStore :  new PolygonStore(),
    groupStore : new GroupStore(),
};