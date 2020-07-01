import {action, computed, flow, observable} from "mobx";
import axios from "axios";
const State = {
    Success: 'Success',
    Fail: 'Fail',
}

const EmptyNewAdmin = {
    id : '',
    groupNo : '',
}


export default class AdminAuthorityStore {
    @observable newAdmin = {...EmptyNewAdmin}

    @action changeNewAdminId = (id) => {
        this.newAdmin.id = id;
        console.log(id);
    }
    @action changeNewAdminGroupNo = (groupNo) => {
        this.newAdmin.groupNo = groupNo;
        console.log(groupNo);
    }

    doAdminUp = flow(function* doAdminUp(doAction) {
         const formData = new FormData();
         formData.append("id",this.newAdmin.id);
         formData.append("groupNo",this.newAdmin.groupNo);
          console.log(formData);
        const resp = yield axios.post('/api/v1/kfashion/group/updateUser', formData);
            if (resp.status === 200) {
            this.state = State.Success;
            } else {
                this.state = State.Fail;
        }
    });


}