import {action, flow, observable} from "mobx";
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

export default class BasicCategoryStore {

    @observable state = State.Ready;
    @observable newMember = {...EmptyNewMember}
    @observable colorList1 = [];
    @observable colorList2 = [];
    @observable colorList3 = [];
    @observable colorList4 = [];

    @observable sleeveList1 = [];
    @observable sleeveList2 = [];
    @observable sleeveList4 = [];

    @observable listState = ListState.Loaded;

    @action initStore = () => {
        this.colorList1 = [];
        this.colorList2 = [];
        this.colorList3 = [];
        this.colorList4 = [];

        this.sleeveList1 = [];
        this.sleeveList2 = [];
        this.sleeveList4 = [];
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


    LoadSleeveList = flow(function* loadSleeveList() {
        try {
            const response = yield axios.get('/api/v1/kfashion/category/item/basic/sleeve')
                const sleeveList1 = response.data.sleeveList1;
                const sleeveList2 = response.data.sleeveList2;
                const sleeveList4 = response.data.sleeveList4;

                this.sleeveList1 = sleeveList1;
                this.sleeveList2 = sleeveList2;
                this.sleeveList4 = sleeveList4;
        } catch (e) {
            console.log('error')
        }
    });


    LoadColorList = flow(function* loadColorList() {
        try {
            const response = yield axios.get('/api/v1/kfashion/category/item/basic/color')
                const colorList1 = response.data.colorList1;
                const colorList2 = response.data.colorList2;
                const colorList3 = response.data.colorList3;
                const colorList4 = response.data.colorList4;

                this.colorList1 = colorList1;
                this.colorList2 = colorList2;
                this.colorList3 = colorList3;
                this.colorList4 = colorList4;
        } catch (e) {
            console.log('error')
        }
    });



}