import {action, computed, flow, observable, toJS} from "mobx";
import axios from "axios";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    Success: 'Success',
    Fail: 'Fail',
    selectedTab : 0,
}

const EmptyNewBasicValue = {
    no:'',
    name:'',
    memo:'',
    subNo:0,
    subName:'',
    subMemo:'',
    sleeveNo:0,
    sleeveName: '',
    tabIndex: 1,
    tabIndex1: 0,
}



export default class BasicLabelingStore {

    @observable state = State.Ready;
    @observable NewBasicInsertList = {...EmptyNewBasicValue};
    @observable NewBasicInsertList1 = {...EmptyNewBasicValue};
    @observable NewBasicInsertList2 = {...EmptyNewBasicValue};
    @observable NewBasicInsertList3 = {...EmptyNewBasicValue};
    @action changeData = (tabIndex1, no, name, memo, subNo, subName, subMemo, sleeveNo, sleeveName) => {
        if(tabIndex1 === 0) {
            this.tabIndex1 = tabIndex1;
            this.NewBasicInsertList.no = no;
            this.NewBasicInsertList.name = name;
            this.NewBasicInsertList.memo =memo;
            this.NewBasicInsertList.subNo = subNo;
            this.NewBasicInsertList.subName= subName;
            this.NewBasicInsertList.subMemo= subMemo;
            this.NewBasicInsertList.sleeveNo=sleeveNo;
            this.NewBasicInsertList.sleeveName=sleeveName;
            return this.NewBasicInsertList
        }else if( tabIndex1 === 1) {
            this.NewBasicInsertList1.no = no;
            this.NewBasicInsertList1.name = name;
            this.NewBasicInsertList1.memo =memo;
            this.NewBasicInsertList1.subNo = subNo;
            this.NewBasicInsertList1.subName= subName;
            this.NewBasicInsertList1.subMemo= subMemo;
            this.NewBasicInsertList1.sleeveNo=sleeveNo;
            this.NewBasicInsertList1.sleeveName=sleeveName;
            return this.NewBasicInsertList1
        }else if( tabIndex1 === 2) {
            this.NewBasicInsertList2.no = no;
            this.NewBasicInsertList2.name = name;
            this.NewBasicInsertList2.memo =memo;
            this.NewBasicInsertList2.subNo = subNo;
            this.NewBasicInsertList2.subName= subName;
            this.NewBasicInsertList2.subMemo= subMemo;
            this.NewBasicInsertList2.sleeveNo=sleeveNo;
            this.NewBasicInsertList2.sleeveName=sleeveName;
            return this.NewBasicInsertList2
        }else {
            this.NewBasicInsertList3.no = no;
            this.NewBasicInsertList3.name = name;
            this.NewBasicInsertList3.memo =memo;
            this.NewBasicInsertList3.subNo = subNo;
            this.NewBasicInsertList3.subName= subName;
            this.NewBasicInsertList3.subMemo= subMemo;
            this.NewBasicInsertList3.sleeveNo=sleeveNo;
            this.NewBasicInsertList3.sleeveName=sleeveName;
            return this.NewBasicInsertList3
        }
    }
}