import {action, computed, flow, observable} from "mobx";
import axios from "axios";


export default class ThirdStepStore {
    @observable styleList = []
    @observable categoryList = []
    @observable detailList = []
    @observable printList = []
    @observable textureList = []
    @observable lengthList = []
    @observable neckLineList = []
    @observable colorKaraList = []
    @observable fitList = []
    @observable safeList = []
    @observable silhouetteList = []




    @computed
    get category() {
        return this.categoryList === undefined ? [] : this.categoryList;
    }

    loadStyleList = flow(function* getCategoryList() {
        try {
            const response = yield axios.get(`/api/v1/category/item/basic/style`)
            if(response.status === 200) {
                const style =response.data.styleList;
                this.styleList=style
            }
        } catch(error) {
            console.log("error getCategoryList", error);
        }
    })
    loadCategoryList = flow(function* getCategoryList() {
        try {
            const response = yield axios.get(`/api/v1/category/item/basic/category`)
            if(response.status === 200) {
                const category =response.data.categoryList;
                this.categoryList=category
            }
        } catch(error) {
            console.log("error getCategoryList", error);
        }
    })
    loadDetailList = flow(function* getCategoryList() {
        try {
            const response = yield axios.get(`/api/v1/category/item/basic/detail`)
            if(response.status === 200) {
                const detail =response.data.detailList;
                this.detailList=detail
            }
        } catch(error) {
            console.log("error getCategoryList", error);
        }
    })
    loadPrintList = flow(function* getCategoryList() {
        try {
            const response = yield axios.get(`/api/v1/category/item/basic/print`)
            if(response.status === 200) {
                const print =response.data.printList;
                this.printList=print
            }
        } catch(error) {
            console.log("error getCategoryList", error);
        }
    })
    loadTextureList = flow(function* getCategoryList() {
        try {
            const response = yield axios.get(`/api/v1/category/item/basic/texture`)
            if(response.status === 200) {
                const texture =response.data.textureList;
                this.textureList=texture
            }
        } catch(error) {
            console.log("error getCategoryList", error);
        }
    })
    loadLengthList = flow(function* getCategoryList() {
        try {
            const response = yield axios.get(`/api/v1/category/item/basic/length`)
            if(response.status === 200) {
                const length =response.data.lengthList;
                this.lengthList=length
            }
        } catch(error) {
            console.log("error getCategoryList", error);
        }
    })
    loadNeckLineList = flow(function* getCategoryList() {
        try {
            const response = yield axios.get(`/api/v1/category/item/basic/neckLine`)
            if(response.status === 200) {
                const neckLine =response.data.neckLineList;
                this.neckLineList=neckLine
            }
        } catch(error) {
            console.log("error getCategoryList", error);
        }
    })
    loadColorKaraList = flow(function* getCategoryList() {
        try {
            const response = yield axios.get(`/api/v1/category/item/basic/colorKara`)
            if(response.status === 200) {
                const colorKara =response.data.colorKaraList;
                this.colorKaraList=colorKara
            }
        } catch(error) {
            console.log("error getCategoryList", error);
        }
    })
    loadFitList = flow(function* getCategoryList() {
        try {
            const response = yield axios.get(`/api/v1/category/item/basic/fit`)
            if(response.status === 200) {
                const fit =response.data.fitList;
                this.fitList=fit
            }
        } catch(error) {
            console.log("error getCategoryList", error);
        }
    })
    loadSafeList = flow(function* getCategoryList() {
        try {
            const response = yield axios.get(`/api/v1/category/item/basic/safe`)
            if(response.status === 200) {
                const safe =response.data.safeList;
                this.safeList=safe
            }
        } catch(error) {
            console.log("error getCategoryList", error);
        }
    })
    loadSilhouetteList = flow(function* getCategoryList() {
        try {
            const response = yield axios.get(`/api/v1/category/item/basic/silhouette`)
            if(response.status === 200) {
                const silhouette =response.data.silhouetteList;
                this.silhouetteList=silhouette
            }
        } catch(error) {
            console.log("error getCategoryList", error);
        }
    })
}