import {action, flow, observable} from "mobx";
import axios from "axios";


const ListState = {
    Loading: 'Loading',
    Loaded: 'Loaded',
    LoadFailed: 'LoadFailed',
};

export default class CategoryStore {

    @observable listState = ListState.Loaded;
    @observable categoryList = [];

    @action changeCategory = () => {
        this.loadCategoryList();
    }

    loadCategoryList = flow(function* loadColorList() {
        this.listState = ListState.Loading;

        try {
            let response = yield axios.get(`/api/v1/category/item/basic/category`)
            const categorys = response.data.categoryList;
            this.categoryList = categorys;
            this.listState = ListState.Loaded;
        } catch(error) {
            this.listState = ListState.LoadFailed;
        }

    })



}