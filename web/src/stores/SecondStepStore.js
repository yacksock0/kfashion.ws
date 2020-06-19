import {action, computed, flow, observable} from "mobx";
import axios from "axios";

export default class SecondStepStore {
    @observable categoryList = []
    @observable colorList = []
    @observable sleeveLengthList = []
    @observable clothLengthList = []
    @observable printList = []

    @computed
    get category() {
        return this.categoryList === undefined ? [] : this.categoryList;
    }
    @computed
    get color() {
        return this.colorList === undefined ? [] : this.colorList;
    }
    @computed
    get sleeve() {
        return this.sleeveLengthList === undefined ? [] : this.sleeveLengthList;
    }
    @computed
    get clothLength() {
        return this.clothLengthList === undefined ? [] : this.clothLengthList;
    }
    @computed
    get print() {
        return this.printList === undefined ? [] : this.printList;
    }

    loadCategoryList = flow(function* getCategoryList() {
        try {
            const response = yield axios.get(`/api/v1/category/item/basic/category`)
            if(response.status === 200) {
                this.categoryList = response.data;
            }
        } catch(error) {
            console.log("error getCategoryList", error);
        }
    })

    loadColorList = flow(function* getColorList() {
        try {
            const response = yield axios.get(`/api/v1/category/item/basic/color`)
            if(response.status === 200) {
                this.colorList = response.data;
            }
        } catch(error) {
            console.log("error getColorList", error);
        }
    })

    loadSleeveList = flow(function* getSleeveList() {
        try {
            const response = yield axios.get(`/api/v1/category/item/basic/sleeve`)
            if(response.status === 200) {
                this.sleeveLengthList = response.data;
            }
        } catch(error) {
            console.log("error getSleeveList", error);
        }
    })

    loadClothList = flow(function* getClothList() {
        try {
            const response = yield axios.get(`/api/v1/category/item/basic/cloth`)
            if(response.status === 200) {
                this.clothLengthList = response.data;
            }
        } catch(error) {
            console.log("error getClothList", error);
        }
    })

    loadPrintList = flow(function* getPrintList() {
        try {
            const response = yield axios.get(`/api/v1/category/item/basic/print`)
            if(response.status === 200) {
                this.printList = response.data;
            }
        } catch(error) {
            console.log("error getPrintList", error);
        }
    })

    /*changeCategoryStatus = flow(function* changeCategoryStatus(userId, statusCode) {
        try {
            const response = yield axios.put(`/api/v1/admin/users`, [{"userId": userId, "statusCode": statusCode}])
            if(response.status === 200) {
                this.loadCategoryList();
            }
        } catch(error) {
            console.log("error getUserList", error);
        }
    })*/

}