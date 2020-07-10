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
    @observable newAdmin = {...EmptyNewAdmin};
    @observable userList = [];

    @action changeNewAdminId = (id) => {
        this.newAdmin.id = id;
    }
    @action changeNewAdminGroupNo = (groupNo) => {
        this.newAdmin.groupNo = groupNo;
    }

    @action initStore = () => {
        this.userList = [];
    }

    LoadUserList = flow(function* loadUserList() {
        this.userList = [];
        try {
            const response = yield axios.get('/api/v1/kfashion/users/userList')
            this.userList = response.data.userList;
        } catch (e) {
            console.log('error')
        }
    });


    doAdminUp = flow(function* doAdminUp(doAction) {
         const formData = new FormData();
         formData.append("id",this.newAdmin.id);
         formData.append("groupNo",this.newAdmin.groupNo);
          console.log(formData);
        const resp = yield axios.post('/api/v1/kfashion/group/updateUser', formData);
            if (resp.status === 200) {
                this.LoadUserList();
            this.state = State.Success;
            } else {
                this.state = State.Fail;
        }
    });


}