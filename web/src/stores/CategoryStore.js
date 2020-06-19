import {action, flow, observable} from "mobx";
import axios from "axios";


const ListState = {
    Loading: 'Loading',
    Loaded: 'Loaded',
    LoadFailed: 'LoadFailed',
};

export default class CategoryStore {

    @observable listState = ListState.Loaded;
    @observable colorList = [];

    @action changeColor = () => {
        this.loadColorList();
    }

    loadColorList = flow(function* loadColorList() {
        this.listState = ListState.Loading;

        try {
            let response = yield axios.get(`/api/v1/basic`)
            const colors = response.data.colorList;

            console.log(response.data);

            this.colorList = colors;

            this.listState = ListState.Loaded;
        } catch(error) {
            this.listState = ListState.LoadFailed;
        }

    })



}