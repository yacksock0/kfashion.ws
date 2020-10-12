import {action, computed, flow, observable} from "mobx";
import axios from "axios";


export const WebURL = {
    kFashion: 'kFashion',
    kTagging: 'kTagging',
    kSearching: 'kSearching',
    kMatching: 'kMatching',
};

export default class AppStore {
    @observable loginURL = "";

    setLoginURL = flow(function* setLoginURL(web) {
        this.loginURL = web;
    });
}