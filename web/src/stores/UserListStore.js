import {action, computed, flow, observable, toJS} from "mobx";
import React from "react";
import axios from "axios";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    Success: 'Success',
    Fail: 'Fail',
}

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
            this.groupUserList = [];
            try {
                const response = yield axios.get('/api/v1/kfashion/users/groupUserList?groupNo='+groupNo)
                this.groupUserList = response.data.groupUserList;
            } catch (e) {
                console.log('error')
            }
        });


    addGroupUser = flow(function* addGroupUser() {
        this.state = State.Pending;
        try {
            const param = toJS(this.newMember);
            const response = axios.post('/api/v1/kfashion/users/createGroupUser', param)
                if (response.status === 200) {
                    this.LoadGroupUserList(this.newMember.groupNo);
                    console.log(this.newMember.groupNo);
                }
        } catch (e) {
            console.log('에러좀 나지 마라')
        }
    });
}