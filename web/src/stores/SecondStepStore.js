import {action, computed, flow, observable} from "mobx";
import axios from "axios";

const ListState = {
    Loading: 'Loading',
    Loaded: 'Loaded',
    LoadFailed: 'LoadFailed',
};

export default class SecondStepStore {
    @observable colorList = []
    @observable sleeveList = []


    @computed
    get color() {
        return this.colorList === undefined ? [] : this.colorList;
    }
    @computed
    get sleeve() {
        return this.sleeveList === undefined ? [] : this.sleeveList;
    }

    loadColorList = flow(function* getColorList() {
        try {
            const response = yield axios.get(`/api/v1/kfashion/category/item/basic/color`)
            if(response.status === 200) {
                const color =response.data.colorList;
                this.colorList=color
            }
        } catch(error) {
            console.log("error getColorList", error);
        }
    })

    loadSleeveList = flow(function* getSleeveList() {
        try {
            const response = yield axios.get(`/api/v1/kfashion/category/item/basic/sleeve`)
            if(response.status === 200) {
                const sleeve =response.data.sleeveList;
                this.sleeveList=sleeve
            }
        } catch(error) {
            console.log("error getSleeveList", error);
        }
    })

   /* loadClothList = flow(function* getClothList() {
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
    })*/


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