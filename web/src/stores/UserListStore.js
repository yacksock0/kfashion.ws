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
    isApproved: '',
    groupNo: '',
    createdDatetime: '',
    updatedDatetime: '',
}

export default class UserListStore {

    @observable state = State.Ready;
    @observable newMember = {...EmptyNewMember}

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

    addGroupUser = flow(function* addGroupUser() {
        this.state = State.Pending;
        try {
            const param = toJS(this.newMember);
            const response = axios.post('/api/v1/kfashion/users/createGroupUser', param)
            console.log(response.data);
                if (response.status === 200) {
                    this.state = State.Success;
                } else {
                    this.state = State.NotAvailableEmail;
                }
        } catch (e) {
            console.log('에러좀 나지 마라')
        }
    });
}