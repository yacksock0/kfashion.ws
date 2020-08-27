import { default as AuthStore } from "./AuthStore";
import SignUpStore from "./SignUpStore";
import AdminAuthorityStore from "./AdminAuthorityStore";
import ProfessionalLabelStore from "./ProfessionalLabelStore";
import UserListStore from "./UserListStore";
import ImageStore from "./ImageStore";
import RectStore from "./RectStore";
import PolygonStore from "./PolygonStore";
import GroupStore from "./GroupStore";
import CurrentStepStore from "./CurrentStepStore";
import WorkStore from "./WorkStore";
import CheckHighLabelStore from "./CheckHighLabelStore";
import BasicCategoryStore from "./BasicCategoryStore";
import MessageStore from "./MessageStore";



export const stores = {
    signUpStore: new SignUpStore(),
    authStore:  new AuthStore(),
    adminAuthorityStore : new AdminAuthorityStore(),
    professionalLabelStore : new ProfessionalLabelStore(),
    userListStore: new UserListStore(),
    imageStore : new ImageStore(),
    rectStore : new RectStore(),
    polygonStore :  new PolygonStore(),
    groupStore : new GroupStore(),
    currentStepStore : new CurrentStepStore(),
    workStore : new WorkStore(),
    checkHighLabelStore : new CheckHighLabelStore(),
    basicCategoryStore : new BasicCategoryStore(),
    messageStore : new MessageStore(),
};