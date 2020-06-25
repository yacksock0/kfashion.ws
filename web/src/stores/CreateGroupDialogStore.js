import {action, computed, flow, observable} from "mobx";
import axios from "axios";

export default class CreateGroupDialogStore {
    @observable groupList = []


    @computed
    get group() {
        return this.groupList === undefined ? [] : this.groupList;
    }
    loadGroupList = flow(function* getGroupList() {
        try {
            const response = yield axios.get(`/api/v1/group/groupList`)
            if(response.status === 200) {
                const group =response.data.groupList;
                this.groupList=group
                console.log(this.groupList);
            }
        } catch(error) {
            console.log("error getGroupList", error);
        }
    })
}