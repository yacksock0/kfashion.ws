import {action, computed, flow, observable, toJS} from "mobx";
import axios from "axios";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    Success: 'Success',
    Fail: 'Fail',
}

const EmptyNewProfessionalLabel = {
    workNo : '',
    workStep : 6,
    labelNo1 : 0,
    labelNo2 : 0,
    labelNo3 : 0,
    labelNo4 : 0,
    labelNo5 : 0,
    createId : '',
    style : '',
    styleSub : '',
    styleCategoryNo : '',
    styleCategorySubNo : '',
    category1 : '',
    category2 : '',
    category3 : '',
    category4 : '',
    categoryCategoryNo1 : '',
    categoryCategoryNo2 : '',
    categoryCategoryNo3 : '',
    categoryCategoryNo4 : '',
    detail1 : '',
    detail2 : '',
    detail3 : '',
    detail4 : '',
    detailCategoryNo1 : '',
    detailCategoryNo2 : '',
    detailCategoryNo3 : '',
    detailCategoryNo4 : '',
    print1 : '',
    print2 : '',
    print3 : '',
    print4 : '',
    printCategoryNo1 : '',
    printCategoryNo2 : '',
    printCategoryNo3 : '',
    printCategoryNo4 : '',
    texture1 : '',
    texture2 : '',
    texture3 : '',
    texture4 : '',
    textureCategoryNo1 : '',
    textureCategoryNo2 : '',
    textureCategoryNo3 : '',
    textureCategoryNo4 : '',
    clothLength1 : '',
    clothLength2 : '',
    clothLength3 : '',
    clothLength4 : '',
    clothLengthCategoryNo1 : '',
    clothLengthCategoryNo2 : '',
    clothLengthCategoryNo3 : '',
    clothLengthCategoryNo4 : '',
    neckLine1 : '',
    neckLine2 : '',
    neckLine4 : '',
    neckLineCategoryNo1 : '',
    neckLineCategoryNo2 : '',
    neckLineCategoryNo4 : '',
    kara1 : '',
    kara2 : '',
    kara4 : '',
    karaCategoryNo1 : '',
    karaCategoryNo2 : '',
    karaCategoryNo4 : '',
    fit1 : '',
    fit2 : '',
    fit3 : '',
    fit4 : '',
    fitCategoryNo1 : '',
    fitCategoryNo2 : '',
    fitCategoryNo3 : '',
    fitCategoryNo4 : '',
}

export default class ProfessionalLabelStore {
    @observable state = State.Ready;
    @observable newProfessionalLabel = {...EmptyNewProfessionalLabel}
    @observable professionalList = [];
    @observable recentlyImg=[];

    @action initStore = () => {
        this.professionalList = [];
    }


    @action changeNewProfessionalLabelNo1 = (labelNo1) => {
        this.newProfessionalLabel.labelNo1 = labelNo1;
    }
    @action changeNewProfessionalLabelNo2 = (labelNo2) => {
        this.newProfessionalLabel.labelNo2 = labelNo2;
    }
    @action changeNewProfessionalLabelNo3 = (labelNo3) => {
        this.newProfessionalLabel.labelNo3 = labelNo3;
    }
    @action changeNewProfessionalLabelNo4 = (labelNo4) => {
        this.newProfessionalLabel.labelNo4 = labelNo4;
    }
    @action changeNewProfessionalLabelNo5 = (labelNo5) => {
        this.newProfessionalLabel.labelNo5 = labelNo5;
    }

    @action changeNewProfessionalLabelStyle = (style) => {
        this.newProfessionalLabel.style = style.no;
        this.newProfessionalLabel.styleCategoryNo = style.categoryNo;
    }

    @action changeNewProfessionalLabelStyleSub = (styleSub) => {
        this.newProfessionalLabel.styleSub = styleSub.no;
        this.newProfessionalLabel.styleCategorySubNo = styleSub.categoryNo;
    }

    @action changeNewProfessionalLabelCategory1 = (category1) => {
        this.newProfessionalLabel.category1 = category1.no;
        this.newProfessionalLabel.categoryCategoryNo1 = category1.categoryNo;
    }
    @action changeNewProfessionalLabelCategory2 = (category2) => {
        this.newProfessionalLabel.category2 = category2.no;
        this.newProfessionalLabel.categoryCategoryNo2 = category2.categoryNo;
    }
    @action changeNewProfessionalLabelCategory3 = (category3) => {
        this.newProfessionalLabel.category3 = category3.no;
        this.newProfessionalLabel.categoryCategoryNo3 = category3.categoryNo;
    }
    @action changeNewProfessionalLabelCategory4 = (category4) => {
        this.newProfessionalLabel.category4 = category4.no;
        this.newProfessionalLabel.categoryCategoryNo4 = category4.categoryNo;
    }

    @action changeNewProfessionalLabelDetail1 = (detail1) => {
        this.newProfessionalLabel.detail1 = detail1.no;
        this.newProfessionalLabel.detailCategoryNo1 = detail1.categoryNo;
    }
    @action changeNewProfessionalLabelDetail2 = (detail2) => {
        this.newProfessionalLabel.detail2 = detail2.no;
        this.newProfessionalLabel.detailCategoryNo2 = detail2.categoryNo;
    }
    @action changeNewProfessionalLabelDetail3= (detail3) => {
        this.newProfessionalLabel.detail3 = detail3.no;
        this.newProfessionalLabel.detailCategoryNo3 = detail3.categoryNo;
    }
    @action changeNewProfessionalLabelDetail4 = (detail4) => {
        this.newProfessionalLabel.detail4 = detail4.no;
        this.newProfessionalLabel.detailCategoryNo4 = detail4.categoryNo;
    }

    @action changeNewProfessionalLabelPrint4= (print4) => {
        this.newProfessionalLabel.print4 = print4.no;
        this.newProfessionalLabel.printCategoryNo4 = print4.categoryNo;
    }
    @action changeNewProfessionalLabelPrint1= (print1) => {
        this.newProfessionalLabel.print1 = print1.no;
        this.newProfessionalLabel.printCategoryNo1 = print1.categoryNo;
    }
    @action changeNewProfessionalLabelPrint2= (print2) => {
        this.newProfessionalLabel.print2 = print2.no;
        this.newProfessionalLabel.printCategoryNo2 = print2.categoryNo;
    }
    @action changeNewProfessionalLabelPrint3= (print3) => {
        this.newProfessionalLabel.print3 = print3.no;
        this.newProfessionalLabel.printCategoryNo3 = print3.categoryNo;
    }

    @action changeNewProfessionalLabelTexture4 = (texture4) => {
        this.newProfessionalLabel.texture4 = texture4.no;
        this.newProfessionalLabel.textureCategoryNo4 = texture4.categoryNo;
    }
    @action changeNewProfessionalLabelTexture1 = (texture1) => {
        this.newProfessionalLabel.texture1 = texture1.no;
        this.newProfessionalLabel.textureCategoryNo1 = texture1.categoryNo;
    }
    @action changeNewProfessionalLabelTexture2 = (texture2) => {
        this.newProfessionalLabel.texture2 = texture2.no;
        this.newProfessionalLabel.textureCategoryNo2 = texture2.categoryNo;
    }
    @action changeNewProfessionalLabelTexture3 = (texture3) => {
        this.newProfessionalLabel.texture3 = texture3.no;
        this.newProfessionalLabel.textureCategoryNo3 = texture3.categoryNo;
    }

    @action changeNewProfessionalLabelClothLength4 = (clothLength4) => {
        this.newProfessionalLabel.clothLength4 = clothLength4.no;
        this.newProfessionalLabel.clothLengthCategoryNo4 = clothLength4.categoryNo;
    }
    @action changeNewProfessionalLabelClothLength1 = (clothLength1) => {
        this.newProfessionalLabel.clothLength1 = clothLength1.no;
        this.newProfessionalLabel.clothLengthCategoryNo1 = clothLength1.categoryNo;
    }
    @action changeNewProfessionalLabelClothLength2 = (clothLength2) => {
        this.newProfessionalLabel.clothLength2 = clothLength2.no;
        this.newProfessionalLabel.clothLengthCategoryNo2 = clothLength2.categoryNo;
    }
    @action changeNewProfessionalLabelClothLength3 = (clothLength3) => {
        this.newProfessionalLabel.clothLength3 = clothLength3.no;
        this.newProfessionalLabel.clothLengthCategoryNo3 = clothLength3.categoryNo;
    }

    @action changeNewProfessionalLabelNeckLine4 = (neckLine4) => {
        this.newProfessionalLabel.neckLine4 = neckLine4.no;
        this.newProfessionalLabel.neckLineCategoryNo4 = neckLine4.categoryNo;
    }
    @action changeNewProfessionalLabelNeckLine1 = (neckLine1) => {
        this.newProfessionalLabel.neckLine1 = neckLine1.no;
        this.newProfessionalLabel.neckLineCategoryNo1 = neckLine1.categoryNo;
    }
    @action changeNewProfessionalLabelNeckLine2 = (neckLine2) => {
        this.newProfessionalLabel.neckLine2 = neckLine2.no;
        this.newProfessionalLabel.neckLineCategoryNo2 = neckLine2.categoryNo;
    }


    @action changeNewProfessionalLabelKara4 = (kara4) => {
        this.newProfessionalLabel.kara4 = kara4.no;
        this.newProfessionalLabel.karaCategoryNo4= kara4.categoryNo;
    }
    @action changeNewProfessionalLabelKara1 = (kara1) => {
        this.newProfessionalLabel.kara1 = kara1.no;
        this.newProfessionalLabel.karaCategoryNo1 = kara1.categoryNo;
    }
    @action changeNewProfessionalLabelKara2 = (kara2) => {
        this.newProfessionalLabel.kara2 = kara2.no;
        this.newProfessionalLabel.karaCategoryNo2 = kara2.categoryNo;
    }


    @action changeNewProfessionalLabelFit4 = (fit4) => {
        this.newProfessionalLabel.fit4 = fit4.no;
        this.newProfessionalLabel.fitCategoryNo4 = fit4.categoryNo;
    }
    @action changeNewProfessionalLabelFit1 = (fit1) => {
        this.newProfessionalLabel.fit1 = fit1.no;
        this.newProfessionalLabel.fitCategoryNo1 = fit1.categoryNo;
    }
    @action changeNewProfessionalLabelFit2 = (fit2) => {
        this.newProfessionalLabel.fit2 = fit2.no;
        this.newProfessionalLabel.fitCategoryNo2 = fit2.categoryNo;
    }
    @action changeNewProfessionalLabelFit3 = (fit3) => {
        this.newProfessionalLabel.fit3 = fit3.no;
        this.newProfessionalLabel.fitCategoryNo3 = fit3.categoryNo;
    }


    @action changeNewProfessionalLabelCreatedId = (createdId) => {
        this.newProfessionalLabel.createdId = createdId;
    }

    @action changeNewProfessionalLabelWorkNo = (workNo) => {
        this.newProfessionalLabel.workNo = workNo;
    }

    @computed get isPending() {
        return this.state === State.Pending;
    }

    @computed get isLabelUpSuccess() {
        return this.state === State.Success;
    }

    @computed get isLabelUpFailed() {
        return this.state === State.Fail;
    }
    LoadProfessionalList = flow(function* loadProfessionalList(createdId) {
        this.professionalList = [];
        try {
            const response = yield axios.get('/api/v1/kfashion/img/professionalList?createdId='+createdId)
            this.professionalList = response.data.professionalList;
            console.log(' this.professionalList', this.professionalList)
        } catch (e) {
            console.log('error')
        }
    });

    LoadRecentImage = flow(function* LoadRecentImage(createdId) {
        this.recentlyImg = [];
        try {
            const response = yield axios.get(`/api/v1/kfashion/img/recentlyImg?createdId=`+createdId)
            this.recentlyImg = response.data.recentlyImg;
        } catch (e) {
            console.log('error')
        }
    });

    doProfessionalLabelUp = flow(function* doProfessionalLabelUp() {
        this.state = State.Pending;
        try {
                const param = toJS(this.newProfessionalLabel);

                const resp = yield axios.post('/api/v1/kfashion/label/professionalLabel', param);
                if (resp.status === 200) {
                    const createdId =this.newProfessionalLabel.createdId;
                    this.state = State.Success;
                    this.LoadProfessionalList(createdId);
                    this.LoadRecentImage(createdId);
                } else {
                    this.state = State.Fail;
                }
        } catch (e) {
            console.log('에러좀 나지 마라')
        }
    });

    LoadLabelList = flow(function* LoadLabelList(workNo) {
        try {
            const response = yield axios.get('/api/v1/kfashion/label/reviewLabelList?workNo='+workNo)
            console.log(response.data)
            if(response.data.outerReviewLabel != null) {
                this.outerReviewLabel = response.data.outerReviewLabel;
            }else {
                this.outerReviewLabel= [];
            }
            if(response.data.topReviewLabel != null) {
                this.topReviewLabel = response.data.topReviewLabel;
            }else {
                this.topReviewLabel = [];
            }
            if(response.data.pantsReviewLabel != null) {
                this.pantsReviewLabel = response.data.pantsReviewLabel;
            }else {
                this.pantsReviewLabel = [];
            }
            if(response.data.onePieceReviewLabel != null) {
                this.onePieceReviewLabel = response.data.onePieceReviewLabel;
            }else {
                this.onePieceReviewLabel = [];
            }if(response.data.styleReviewLabel != null) {
                this.styleReviewLabel = response.data.styleReviewLabel;
            }else {
                this.styleReviewLabel = [];
            }

        } catch (e) {
            console.log('error')
        }
    });



}