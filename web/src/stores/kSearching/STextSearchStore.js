import { action, computed, flow, observable, toJS } from "mobx";
import axios from 'axios';


const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    NotAvailableEmail: 'NotAvailableEmail',
    NotAvailableId: 'NotAvailableId',
    Success: 'Success',
    Fail: 'Fail',
    Error: 'Error',
    Done: 'Done',
}

const initCategory = {
   1: "아우터",
   2: "상의",
   3: "하의",
   4: "원피스",
}

const initSelectedItemList = [
    {
        selectItemName : '',
        selectItemNo : '',
    },
]


const initSelectedSearchClassification = {
    CATEGORY : "",
    STYLE : "",
    COLOR : "",
}

const initColorCategoryNoByStyle = {
    OUTER : 2,
    TOP : 12,
    BOTTOM : 22,
    ONEPIECE : 29,
}

export default class STextSearchStore {
    @observable styleRequestState = State.Ready;
    @observable categoryItemRequestState = State.Ready;
    @observable colorRequestState = State.Ready;
    @observable searchRequestState = State.Ready;
    @observable addSearchResultRequestState = State.Ready;
    @observable category = {...initCategory}
    @observable categoryNoList = [];
    @observable styleList = [];
    @observable colorList = [];
    @observable searchWord = "";
    @observable selectedStyle = "";
    @observable selectedStyleType = 0;
    @observable selectedCategory = "";
    @observable selectedCategoryType = 0;
    @observable selectedCategoryItem = "";
    @observable selectedColor = "";
    @observable selectedColorType = 0;
    @observable selectedSearchClassification = {...initSelectedSearchClassification}
    @observable searchResult = [];
    @observable selectCategoryList = [...initSelectedItemList];
    @observable selectColorList = [...initSelectedItemList];
    @observable selectStyleList = [...initSelectedItemList];
    @observable imagePageNum = 0;
    @observable imageRowsPerPage = 20;
    @observable imageTotalCount = 0;

    @observable searchInfo = [];

    @observable categoryList = {
        OUTER : 1,
        TOP : 2,
        BOTTOM : 3,
        ONEPIECE : 4,
    }

    @action initializeStore = () => {
        this.styleRequestState = State.Ready;
        this.categoryItemRequestState = State.Ready;
        this.colorRequestState = State.Ready;
        this.searchRequestState = State.Ready;
        this.setTypesRequestState = State.Ready;

        this.category = {...initCategory};
        this.categoryItemList = [];
        this.styleList = [];
        this.colorList = [];
        this.categoryList = [];
        this.categoryNoList = [];

        this.searchInfo = [];

        this.searchWord = "";
        this.selectedStyle = "";
        this.selectedStyleType = 0;
        this.selectedCategory = "";
        this.selectedCategoryType = 0;
        this.selectedCategoryItem = "";
        this.selectedColor = "";
        this.selectedColorType = 0;
        this.selectedSearchClassification = {...initSelectedSearchClassification};

        this.selectCategoryItemList = [...initSelectedItemList];
        this.selectColorItemList = [...initSelectedItemList];
        this.selectStyleItemList = [...initSelectedItemList];

        this.imagePageNum = 0;
        this.imageRowsPerPage = 20;
        this.imageTotalCount = 0;
        this.searchResult = [];

    }

    @action initializeSearchResult = () => {
        this.searchRequestState = State.Ready;
        this.imagePageNum = 0;
        this.imageRowsPerPage = 20;
        this.imageTotalCount = 0;
        this.searchResult = [];
    }


    @action handleClickStyleBtn = (e) => {
        console.log("handleClickStyleBtn e.currentTarget.value : >> ", e.currentTarget.value);
        console.log("handleClickStyleBtn e.currentTarget.innerText : >> ", e.currentTarget.innerText);
        this.selectedStyle ? this.selectedStyle = "" : this.selectedStyle = e.currentTarget.innerText;
        this.selectedStyleType !== 0 ? this.selectedStyleType = 0 : this.selectedStyleType = e.currentTarget.value;
    }

    @action handleClickColorBtn = (e) => {
        console.log("handleClickColorBtn e.currentTarget.value : >> ", e.currentTarget.value)
        console.log("handleClickColorBtn e.currentTarget.innerText : >> ", e.currentTarget.innerText)
        this.selectedColor ? this.selectedColor = "" : this.selectedColor = e.currentTarget.innerText;
        this.selectedColorType !== 0 ? this.selectedColorType = 0 : this.selectedColorType = e.currentTarget.value;
    }

    @action handleClickCategoryBtn = (e) => {
        console.log("handleClickCategoryBtn e.currentTarget.value : >> ", e.currentTarget.value)
        console.log("handleClickCategoryBtn e.currentTarget.innerText : >> ", e.currentTarget.innerText);
        this.selectedCategory ? this.selectedCategory = "" : this.selectedCategory = e.currentTarget.innerText;
        this.selectedCategoryType !== 0  ? this.selectedCategoryType = 0 : this.selectedCategoryType = e.currentTarget.value;
        if(this.selectedCategory && this.selectedCategoryType !== 0) {
            this.getColor();
        } else if(!this.selectedCategory && this.selectedCategoryType === 0) {
            this.selectedColor = "";
            this.selectedColorType = 0;
            this.colorList = [];
            return;
        } else {
            return;
        }
    }

    @action handleClickSendBtn = (e) => {
        console.log("검색실행할거야");
        this.initializeSearchResult();
        this.requestTagSearch();
        this.getTagSearchTotalCount();
    }

    @action handleClickSendBtnForScroll = (e) => {
        console.log("검색실행할거야");
        this.initializeSearchResult();
        this.addRequestTagSearch();
        this.getTagSearchTotalCount();
    }


    //스크롤리스트용
    @action setPage = () => {
        this.imagePageNum++;
        console.log("this.imagePageNum", this.imagePageNum);
    }

    //스크롤리스트용
    @action addSearchResultImage = () => {
        this.imagePageNum++;
        console.log("this.imagePageNum", this.imagePageNum);
        this.addRequestTagSearch();
    }

    //일반페이징
    @action changeImageListPage = (newPage) => {
        this.imagePageNum = newPage;
    }

    //일반페이징
    @action changeImageRowsPerPage = (newRowsPerPage) => {
        this.imageRowsPerPage = newRowsPerPage;
    }

   requestSetTypes = flow(function*() {
        this.setTypesRequestState = State.Pending;
        try {
            const categoryResponse = yield axios.get("/api/v1/kSearching/searchingFashion/getTypes");
            this.categoryNoList = categoryResponse.data;
            Object.assign(initCategory)
            console.log("requestSetTypes this.categoryList : >> ", this.categoryList);
            const styleResponse = yield axios.get("/api/v1/kSearching/searchingFashion/getStyleList");
            this.styleList = styleResponse.data;
            console.log("getStyle : >> ", this.styleList);
            this.setTypesRequestState = State.Success
        } catch(e) {
            console.log("requestSetTypes Error e : >> ", e.message);
            window.alert("서버에서 정보를 불러오는데 실패하였습니다. 관리자에게 문의 해주세요/n" + e.message);
            this.setTypesRequestState = State.Error;
        } finally {
            this.setTypesRequestState= State.Done;
        }
    }).bind(this)

    // getStyle = flow(function*() {
    //     this.styleRequestState = State.Pending;
    //     try {
    //         const response = yield axios.get("/api/v1/kSearching/searchingFashion/getStyleList");
    //         this.styleList = response.data;
    //         console.log("getStyle : >> ", this.styleList);
    //         this.styleRequestState = State.Success;
    //     } catch(e) {
    //         console.log("getStyle Error e : >> ", e.message);
    //         this.styleRequestState = State.Error;
    //         window.alert("서버에서 정보를 불러오는데 실패하였습니다. 관리자에게 문의 해주세요");
    //     } finally {
    //         this.styleRequestState = State.Done;
    //     }
    // }).bind(this)

    getColor = flow(function*() {
        this.colorRequestState = State.Pending;
        try {
            const categoryName = this.selectedCategory;
            const categoryType = this.selectedCategoryType;
            const response = yield axios.get("/api/v1/kSearching/searchingFashion/getColorList", {params : {
                    categoryType : categoryType,
                }});
            this.colorList = response.data;
            console.log("getColor : >> ", this.colorList);
            this.colorRequestState = State.Success;
        } catch (e) {
            console.log("getColor Error e : >> ", e.message);
            this.colorRequestState = State.Error;
            window.alert("서버에서 정보를 불러오는데 실패하였습니다. 관리자에게 문의 해주세요." + e.message);
        } finally {
            this.colorRequestState = State.Done;
        }
    }).bind(this)

    getTagSearchTotalCount = flow(function* () {
        try {
                const response = yield axios.get("/api/v1/kSearching/searchingFashion/getTagSearchResultTotalCount", {params : {
                        style : this.selectedStyle,
                        styleType :this.selectedStyleType,
                        category : this.selectedCategory,
                        categoryType : this.selectedCategoryType,
                        color : this.selectedColor,
                        colorType : this.selectedColorType,
                    }});
                this.imageTotalCount = response.data;
                console.log(" tagSearchTotalCount this.imageTotalCount : >> ", this.imageTotalCount);
        } catch (e) {
            console.log("getColor Error e : >> ", e.message);
            this.colorRequestState = State.Error;
            window.alert("서버에서 정보를 불러오는데 실패하였습니다. 관리자에게 문의 해주세요." + e.message);
        }
    }).bind(this)

    requestTagSearch = flow(function* () {
        this.searchRequestState = State.Pending;
        //this.addSearchResultRequestState = State.Pending;
        //const searchInfo = this.searchInfo;
        try {
            //const searchWord = this.searchWord;
            const searchStyle = this.selectedStyle;
            console.log("requestTagSearch searchStyle : >> ", searchStyle);
            const searchStyleType = this.selectedStyleType;
            console.log("requestTagSearch searchStyleType : >> ", searchStyleType);
            const searchCategory = this.selectedCategory;
            console.log("requestTagSearch searchCategory : >> ", searchCategory);
            const searchCategoryType = this.selectedCategoryType;
            console.log("requestTagSearch searchCategoryType : >> ", searchCategoryType);
            const searchColor = this.selectedColor;
            console.log("requestTagSearch searchColor : >> ", searchColor);
            const searchColorType = this.selectedColorType;
            console.log("requestTagSearch searchColor : >> ", searchColorType);

            const selectedCategoryInfo = {};
            const selectedStyleInfo = {};
            const selectedColorInfo = {};
            const searchInfo = {}
            if(searchStyle) {
                searchInfo['searchStyle'] = searchStyle;
                searchInfo['searchStyleType'] = searchStyleType;
            }

            // if(searchInfo.indexOf(selectedStyleInfo) === -1) {
            //     searchInfo.push(selectedStyleInfo);
            // }
            if(searchCategory) {
                searchInfo['searchCategory'] = searchCategory;
                searchInfo['searchCategoryType'] = searchCategoryType;
            }

            // if(searchInfo.indexOf(selectedCategoryInfo) === -1) {
            //     searchInfo.push(selectedCategoryInfo);
            // }
            if(searchColor) {
                searchInfo['searchColor'] = searchColor;
                searchInfo['searchColorType'] = searchColorType;
            }

            // if(searchInfo.indexOf(selectedColorInfo) === -1) {
            //     searchInfo.push(selectedColorInfo);
            // }

            console.log("requestTagSearch searchInfo : >> ", toJS(searchInfo));
            if((!searchStyle && !searchCategory && !searchColor)) {
                window.alert("검색하실 태그를 선택해주세요.");
                return;
            }
            const response = yield axios.get("/api/v1/kSearching/searchingFashion/getTagSearchResult", {params : {
                    //searchInfo: searchInfo,
                    style : this.selectedStyle,
                    styleType :this.selectedStyleType,
                    category : this.selectedCategory,
                    categoryType : this.selectedCategoryType,
                    color : this.selectedColor,
                    colorType : this.selectedColorType,
                    pageNum : this.imagePageNum,
                    rowsPerPage : this.imageRowsPerPage,
                }});
            this.searchResult = response.data;
            console.log("requestTagSearch searchResult: >> ", this.searchResult);
            this.searchRequestState = State.Success;
            //this.addSearchResultRequestState = State.Success;
        }catch (e) {
            console.log("requestTagSearch Error e : >> ", e.message);
            this.searchRequestState = State.Error;
            window.alert("서버에서 정보를 불러오는데 실패하였습니다. 관리자에게 문의 해주세요." + e.message);
        } finally {
            this.searchRequestState = State.Done;
            //this.addSearchResultRequestState = State.Done;
        }
    }).bind(this)

    //스크롤리스트용
    addRequestTagSearch = flow(function* () {
        this.searchRequestState = State.Pending;
        this.addSearchResultRequestState = State.Pending;
        //const searchInfo = this.searchInfo;
        try {
            //const searchWord = this.searchWord;
            const searchStyle = this.selectedStyle;
            console.log("requestTagSearch searchStyle : >> ", searchStyle);
            const searchStyleType = this.selectedStyleType;
            console.log("requestTagSearch searchStyleType : >> ", searchStyleType);
            const searchCategory = this.selectedCategory;
            console.log("requestTagSearch searchCategory : >> ", searchCategory);
            const searchCategoryType = this.selectedCategoryType;
            console.log("requestTagSearch searchCategoryType : >> ", searchCategoryType);
            const searchColor = this.selectedColor;
            console.log("requestTagSearch searchColor : >> ", searchColor);
            const searchColorType = this.selectedColorType;
            console.log("requestTagSearch searchColor : >> ", searchColorType);

            const selectedCategoryInfo = {};
            const selectedStyleInfo = {};
            const selectedColorInfo = {};
            const searchInfo = {}
            if(searchStyle) {
                searchInfo['searchStyle'] = searchStyle;
                searchInfo['searchStyleType'] = searchStyleType;
            }

            // if(searchInfo.indexOf(selectedStyleInfo) === -1) {
            //     searchInfo.push(selectedStyleInfo);
            // }
            if(searchCategory) {
                searchInfo['searchCategory'] = searchCategory;
                searchInfo['searchCategoryType'] = searchCategoryType;
            }

            // if(searchInfo.indexOf(selectedCategoryInfo) === -1) {
            //     searchInfo.push(selectedCategoryInfo);
            // }
            if(searchColor) {
                searchInfo['searchColor'] = searchColor;
                searchInfo['searchColorType'] = searchColorType;
            }

            // if(searchInfo.indexOf(selectedColorInfo) === -1) {
            //     searchInfo.push(selectedColorInfo);
            // }

            console.log("requestTagSearch searchInfo : >> ", toJS(searchInfo));
            if((!searchStyle && !searchCategory && !searchColor)) {
                window.alert("검색하실 태그를 선택해주세요.");
                return;
            }
            const response = yield axios.get("/api/v1/kSearching/searchingFashion/getTagSearchResult", {params : {
                    //searchInfo: searchInfo,
                    style : this.selectedStyle,
                    styleType :this.selectedStyleType,
                    category : this.selectedCategory,
                    categoryType : this.selectedCategoryType,
                    color : this.selectedColor,
                    colorType : this.selectedColorType,
                    pageNum : this.imagePageNum,
                    rowsPerPage : this.imageRowsPerPage,
                }});
            if(this.searchResult.length === 0) {
                this.searchResult = response.data;
            } else {
                console.log("여기로 들어오긴하니");
                this.searchResult.push(...response.data);
            }
            console.log("requestTagSearch searchResult: >> ", this.searchResult);
            this.searchRequestState = State.Success;
            this.addSearchResultRequestState = State.Success;
        }catch (e) {
            console.log("requestTagSearch Error e : >> ", e.message);
            this.searchRequestState = State.Error;
            window.alert("서버에서 정보를 불러오는데 실패하였습니다. 관리자에게 문의 해주세요." + e.message);
        } finally {
            this.searchRequestState = State.Done;
            this.addSearchResultRequestState = State.Done;
        }
    }).bind(this)


}






