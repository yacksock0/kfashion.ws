import {observer} from "mobx-react";
import {extendObservable, observable} from "mobx";

export default class Outer {
    @observable categoryNo
    @observable categoryType
    @observable no
    @observable categoryItemMemo
    @observable createdId
    @observable category1;
    @observable categoryCategoryNo1;
    @observable categoryItemName1;

    constructor(data) {
        console.log(data);
        this.categoryNo = data.categoryNo;
        this.categoryType = data.categoryType;
        this.no = data.no;
        this.categoryItemMemo = data.categoryItemMemo;
        this.createdId = data.createdId;
        this.category1 = data.category;
        this.categoryCategoryNo1 = data.categoryNo;
        this.categoryItemName1 = data.categoryItemName;
    }
}