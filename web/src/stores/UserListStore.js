import {action, computed, flow, observable, toJS} from "mobx";
import React from "react";
import axios from "axios";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    Success: 'Success',
    Fail: 'Fail',
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


    AddGroupUser = flow(function* addGroupUser() {
        this.state = State.Pending;
        try {
            // console.log("id : "+ this.newMember.id);
            // console.log("pw : "+ this.newMember.password);
            // console.log("name : "+ this.newMember.name);
            // console.log("groupNo : "+ this.newMember.groupNo);
            const param = toJS(this.newMember);
                axios.post('/api/v1/kfashion/users/createGroupUser', param)
                .then(res =>{
                    if (res.status === 200) {
                        let groupNo= this.newMember.groupNo;
                        this.LoadGroupUserList(groupNo);
                    }
                })
        } catch (e) {
            console.log('에러좀 나지 마라')
        }
    });
}