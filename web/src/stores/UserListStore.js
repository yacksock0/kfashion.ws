import {action, computed, flow, observable, toJS} from "mobx";
import React from "react";
import axios from "axios";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    Success: 'Success',
    Fail: 'Fail',
    NotAvailableId: 'NotAvailableId',
}
const ListState = {
    Loading: 'Loading',
    Loaded: 'Loaded',
    LoadFailed: 'LoadFailed',
};

const EmptyNewMember = {
    id: '',
    password: '',
    name: '',
    isApproved: 'Y',
    groupNo: '',
    createdDatetime: '',
    updatedDatetime: '',
}

export default class UserListStore {

    @observable state = State.Ready;
    @observable newMember = {...EmptyNewMember}
    @observable groupUserList = [];
    @observable listState = ListState.Loaded;
    @observable loading = false;
    @observable totalWork = 0;

    @action initStore = () => {
        this.groupUserList = [];
    }

    @action clearState = () => {
        this.state = State.Ready;
    }
    @action changeNewMemberId = (id) => {
        this.newMember.id = id;
    }
    @action changeNewMemberPassword = (password) => {
        this.newMember.password = password;
    }

    @action changeNewMemberUserName = (name) => {
        this.newMember.name = name;
    }

    @action changeNewMemberIsApproved = (isApproved) => {
        this.newMember.isApproved = isApproved;
    }
    @action changeNewMemberGroupNo = (groupNo) => {
        this.newMember.groupNo = groupNo;
    }

    @action clearState = () => {
        this.state = State.Ready;
    }

    @action reSetNewMember = () => {
        this.newMember = {...EmptyNewMember};
    }

    @action changeLoadingUp = () => {
        this.loading = true;
    }

    @action changeLoadingDown = () => {
        this.loading = false;
    }

    @computed get isNotAvailableId() {
        return this.state === State.NotAvailableId;
    }



        LoadGroupUserList= flow(function* loadGroupUserList(groupNo) {
            this.listState = ListState.Loading;
            this.groupUserList = [];
            try {
                const response = yield axios.get('/api/v1/kfashion/users/groupUserList?groupNo='+groupNo)
                this.groupUserList = response.data.groupUserList;
                this.listState = ListState.Loaded;
            } catch (e) {
                console.log('error')
                this.listState = ListState.LoadFailed;
            }
        });

    LoadTotalWork= flow(function* loadTotalWork() {
        this.state = State.Pending;
        try {
            const response = yield axios.get('/api/v1/kfashion/work/totalWork')
            this.totalWork = response.data;
        } catch (e) {
            console.log('error')
            this.state = State.Fail;
        }
    });


    AddGroupUser = flow(function* addGroupUser() {
        this.state = State.Pending;
        try {
            const responseId = yield axios.get(`/api/v1/kfashion/users/signupcheck/id?id=${this.newMember.id}`)
            const isNotAvailId = responseId.data.result;
            if(!isNotAvailId) {
            const param = toJS(this.newMember);
                axios.post('/api/v1/kfashion/users/createGroupUser', param)
                .then(res =>{
                    if (res.status === 200) {
                        let groupNo= this.newMember.groupNo;
                        this.LoadGroupUserList(groupNo);
                        this.reSetNewMember();
                    }
                })
        }else {
                console.log("error");
                this.state = State.NotAvailableId;
            }
        } catch (e) {
            console.log('에러좀 나지 마라')
        }
    });


    UpdatedGroupUser = flow(function* updatedGroupUser() {
        this.state = State.Pending;
        try {
                const param = toJS(this.newMember);
                axios.put('/api/v1/kfashion/users/updateGroupUser', param)
                    .then(res =>{
                        if (res.status === 200) {
                            let groupNo= this.newMember.groupNo;
                            this.LoadGroupUserList(groupNo);
                            this.reSetNewMember();
                        }
                    })
        } catch (e) {
            console.log('에러좀 나지 마라')
        }
    });

}