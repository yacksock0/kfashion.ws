import { default as AuthStore } from "./AuthStore";
import {default as CategoryStore} from "./CategoryStore";

export const stores = {
    authStore:  new AuthStore(),
    categoryStore : new CategoryStore(),
};