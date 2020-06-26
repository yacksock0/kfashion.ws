import {action, computed, flow, observable, values} from "mobx";
import axios from "axios";

export default class CreateGroupDialogStore {
    @observable userGroupAuthorityList = []

    @computed
    get group() {
        return this.userGroupAuthorityList === undefined ? [] : this.userGroupAuthorityList;
    }
    loadGroupList = flow(function* userGroupAuthorityList() {
        try {
            const response = yield axios.get(`/api/v1/kfashion/userGroupAuthority/userGroupAuthorityList`)
            if(response.status === 200) {
                const Authority =response.data.userGroupAuthorityList;
                this.userGroupAuthorityList=Authority;
                console.log(this.userGroupAuthorityList);
            }
        } catch(error) {
            console.log("error getGroupList", error);
        }
    })
}