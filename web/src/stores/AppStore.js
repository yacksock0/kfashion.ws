import {action, observable} from "mobx";


export const WebURL = {
    kFashion: 'kFashion',
    kTagging: 'kTagging',
    kSearching: 'kSearching',
    kMatching: 'kMatching',
};

export default class AppStore {
    @observable loginURL = "";

    @action setLoginURL = (web) => {
        this.loginURL = web;
    };
}