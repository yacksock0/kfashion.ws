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

const Assignment = {
    workId: '',
    workCount : '',
    authorityNo : 0,
}
const AssignmentCancel = {
    workId: '',
    workCount : '',
    authorityNo : 0,
}

const ProgressBar ={
    total : 0,
    complete : 0,
    percent : 100,
    rowDataId : '',
}

export default class UserListStore {

    @observable state = State.Ready;
    @observable newMember = {...EmptyNewMember}
    @observable groupUserList = [];
    @observable listState = ListState.Loaded;
    @observable loading = false;
    @observable totalWork = 0;
    @observable page = 0;
    @observable pageSize = 10;
    @observable totalCount = 0;
    @observable keyword = '';
    @observable list = [];
    @observable userList = [];
    @observable total = 0;
    @observable complete = 0;
    @observable percent = 100;
    @observable progressBar = [{...ProgressBar}];
    @observable assignment = {...Assignment};
    @observable assignmentCancel = {...AssignmentCancel};
    @observable completeWork = 0;
    @observable successWork = 0;
    @observable progressBarList = [];
    @observable changeId = '';

    @action changeAllReSet = () => {
        this.page = 0;
        this.pageSize = 10;
        this.keyword = '';
    }

    @action changePage = (page) => {
        this.page = page;
    }
    @action changePageSize =(pageSize) => {
        this.pageSize = pageSize;
    }
    @action changeKeyword = (keyword) => {
        this.keyword = keyword;
    }

    @action changeValue = (value) => {
        this.assignment.workCount = value;
    }

    @action changeWorkId = (workId) => {
        this.assignment.workId = workId;
    }

    @action changeAuthorityNo = (authorityNo) => {
        this.assignment.authorityNo = authorityNo;
    }


    @action changeCancelValue = (cancelValue) => {
        this.assignmentCancel.workCount = cancelValue;
    }

    @action changeCancelWorkId = (workId) => {
        this.assignmentCancel.workId = workId;
    }

    @action changeCancelAuthorityNo = (authorityNo) => {
        this.assignmentCancel.authorityNo = authorityNo;
    }


    @action changeValueReset = () => {
        this.assignment.workCount = '';
    }

    @action changeCancelValueReset = () => {
        this.assignmentCancel.workCount = '';
    }


    @action changeGroupUserList = (groupUserList) => {
        this.groupUserList = groupUserList;
    }

    @computed get isFirstPage () {
        return this.page == 0;
    }

    @computed get isLastPage () {
        return this.groupUserList.length <= this.page * this.pageSize + this.pageSize;
    }

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

    @action handleChangeId = (changeId) =>{
        this.changeId = changeId;
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
    @computed get isSuccess() {
        return this.state === State.Success;
    }




    LoadGroupUserList= flow(function* loadGroupUserList(groupNo) {
            this.listState = ListState.Loading;
            this.groupUserList = [];
            try {
                const response = yield axios.get('/api/v1/kfashion/users/groupUserList', {
                    params: {
                        groupNo : groupNo,
                        pageSize: this.pageSize,
                        page: this.page,
                        keyword : this.keyword,
                    }
                })
                this.groupUserList = response.data.groupUserList;
                this.page =  response.data.page;
                this.pageSize =  response.data.pageSize;
                this.totalCount = response.data.totalCount;
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



    DoAssignment = flow(function* doAssignment(groupNo) {
        try {
            const resp = yield axios.post(`/api/v1/kfashion/work/history/assignment?workId=${this.assignment.workId}&workCount=${this.assignment.workCount}&authorityNo=${this.assignment.authorityNo}`);
            if (resp.status === 200) {
                this.changeLoadingDown();
                this.LoadGroupUserList(groupNo);
                alert("작업지정이 완료되었습니다.");
                this.assignment = {...Assignment};
                this.state = State.Success;
            } else {
                this.state = State.Fail;
            }
        }catch (e) {
            console.log('comment 에러')
        }
    });

    DoAssignmentCancel = flow(function* doAssignmentCancel(groupNo) {
        try {
            const resp = yield axios.post(`/api/v1/kfashion/work/history/assignmentCancel?workId=${this.assignmentCancel.workId}&workCount=${this.assignmentCancel.workCount}&authorityNo=${this.assignmentCancel.authorityNo}`);
            if (resp.status === 200) {
                this.changeLoadingDown();
                this.LoadGroupUserList(groupNo);
                alert("작업취소가 완료되었습니다.");
                this.assignmentCancel = {...AssignmentCancel};
                this.state = State.Success;
            } else {
                this.state = State.Fail;
            }
        }catch (e) {
            console.log('comment 에러')
        }
    });

    LoadCompleteWork= flow(function* loadCompleteWork(authorityNo) {
        this.state = State.Pending;
        try {
            const response = yield axios.get('/api/v1/kfashion/work/completeWork?authorityNo='+authorityNo)
            this.completeWork = response.data;
        } catch (e) {
            console.log('error')
            this.state = State.Fail;
        }
    });

    LoadSuccessWork= flow(function* loadSuccessWork(authorityNo) {
        this.state = State.Pending;
        try {
            const response = yield axios.get('/api/v1/kfashion/work/successWork?authorityNo='+authorityNo)
            this.successWork = response.data;
        } catch (e) {
            console.log('error')
            this.state = State.Fail;
        }
    });

    LoadProgressRate= flow(function* loadProgressRate(rowDataId,authorityNo) {
        this.listState = ListState.Loading;
        try {
            const response = yield axios.post(`/api/v1/kfashion/work/history/progressRate?createdId=${rowDataId}&authorityNo=${authorityNo}`)
            const selectWorkProgressRate = response.data.selectWorkProgressRate;
            const total = selectWorkProgressRate.totalWork;
            const complete = selectWorkProgressRate.finishWork;
            let percent = ((complete / total) *100).toFixed(1)
            if(complete == 0 && total== 0 ) {
               percent = 100;
            }
            this.progressBar.total = total;
            this.progressBar.complete = complete;
            this.progressBar.percent = percent;

            console.log(this.progressBarList);
        } catch (e) {
            console.log('error')
            this.listState = ListState.LoadFailed;
        }
    });

}