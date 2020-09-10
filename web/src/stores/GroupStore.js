import {action,  flow, observable} from "mobx";
import axios from "axios";
const State = {
    Success: 'Success',
    Fail: 'Fail',
}

const EmptyNewGroup = {
    groupName : '',
    groupNo : '',
}


export default class GroupStore {
    @observable newGroup = {...EmptyNewGroup}
    @observable userGroupAuthorityList = [];

    @action changeNewGroupName = (groupName) => {
        this.newGroup.groupName = groupName;
    }
    @action changeNewAuthorityNo = (authorityNo) => {
        this.newGroup.authorityNo = authorityNo;
    }

    @action initStore = () => {
        this.userGroupAuthorityList = [];
    }

    LoadUserGroupAuthorityList= flow(function* loadUserGroupAuthorityList() {
        this.userGroupAuthorityList = [];
        try {
            const response = yield axios.get('/api/v1/kfashion/userGroupAuthority/userGroupAuthorityList')
            this.userGroupAuthorityList = response.data.userGroupAuthorityList;
        } catch (e) {
            console.log('error')
        }
    });


    AddGroup = flow(function* addGroup() {
        const formData = new FormData();
        formData.append('groupName', this.newGroup.groupName)
        formData.append('authorityNo', this.newGroup.authorityNo)
        const resp = yield axios.post('/api/v1/kfashion/group/create', formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
        });
        if (resp.status === 200) {
            this.LoadUserGroupAuthorityList();
            this.state = State.Success;
        } else {
            this.state = State.Fail;
        }
    });


}