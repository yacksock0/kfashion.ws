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
    createId : '',
    style : '',
    styleSub : '',
    styleCategoryNo : '',
    styleCategorySubNo : '',
    category : '',
    category1 : '',
    category2 : '',
    category3 : '',
    categoryCategoryNo : '',
    detail : '',
    detail1 : '',
    detail2 : '',
    detail3 : '',
    detailCategoryNo : '',
    print : '',
    print1 : '',
    print2 : '',
    print3 : '',
    printCategoryNo : '',
    texture : '',
    texture1 : '',
    texture2 : '',
    texture3 : '',
    textureCategoryNo : '',
    clothLength : '',
    clothLength1 : '',
    clothLength2 : '',
    clothLength3 : '',
    clothLengthCategoryNo : '',
    neckLine : '',
    neckLine1 : '',
    neckLine2 : '',
    neckLine3 : '',
    neckLineCategoryNo : '',
    kara : '',
    kara1 : '',
    kara2 : '',
    kara3 : '',
    karaCategoryNo : '',
    fit : '',
    fit1 : '',
    fit2 : '',
    fit3 : '',
    fitCategoryNo : '',
}

export default class ProfessionalLabelStore {
    @observable state = State.Ready;
    @observable newProfessionalLabel = {...EmptyNewProfessionalLabel}
    @observable professionalList = [];
    @observable recentlyImg=[];

    @action initStore = () => {
        this.professionalList = [];
    }


    @action changeNewProfessionalLabelNo1 = (lableNo1) => {
        this.newProfessionalLabel.labelNo1 = lableNo1;
    }
    @action changeNewProfessionalLabelNo2 = (lableNo2) => {
        this.newProfessionalLabel.labelNo2 = lableNo2;
    }
    @action changeNewProfessionalLabelNo3 = (lableNo3) => {
        this.newProfessionalLabel.labelNo3 = lableNo3;
    }
    @action changeNewProfessionalLabelNo4 = (lableNo4) => {
        this.newProfessionalLabel.labelNo4 = lableNo4;
    }

    @action changeNewProfessionalLabelStyle = (style) => {
        this.newProfessionalLabel.style = style.no;
        this.newProfessionalLabel.styleCategoryNo = style.categoryNo;
    }

    @action changeNewProfessionalLabelStyleSub = (styleSub) => {
        this.newProfessionalLabel.styleSub = styleSub.no;
        this.newProfessionalLabel.styleCategorySubNo = styleSub.categoryNo;
    }

    @action changeNewProfessionalLabelCategory = (category) => {
        this.newProfessionalLabel.category = category.no;
        this.newProfessionalLabel.categoryCategoryNo = category.categoryNo;
    }
    @action changeNewProfessionalLabelCategory1 = (category1) => {
        this.newProfessionalLabel.category1 = category1.no;
        this.newProfessionalLabel.categoryCategoryNo = category1.categoryNo;
    }
    @action changeNewProfessionalLabelCategory2 = (category2) => {
        this.newProfessionalLabel.category2 = category2.no;
        this.newProfessionalLabel.categoryCategoryNo = category2.categoryNo;
    }
    @action changeNewProfessionalLabelCategory3 = (category3) => {
        this.newProfessionalLabel.category3 = category3.no;
        this.newProfessionalLabel.categoryCategoryNo = category3.categoryNo;
    }

    @action changeNewProfessionalLabelDetail = (detail) => {
        this.newProfessionalLabel.detail = detail.no;
        this.newProfessionalLabel.detailCategoryNo = detail.categoryNo;
    }
    @action changeNewProfessionalLabelDetail1 = (detail1) => {
        this.newProfessionalLabel.detail1 = detail1.no;
        this.newProfessionalLabel.detailCategoryNo = detail1.categoryNo;
    }
    @action changeNewProfessionalLabelDetail2= (detail2) => {
        this.newProfessionalLabel.detail2 = detail2.no;
        this.newProfessionalLabel.detailCategoryNo = detail2.categoryNo;
    }
    @action changeNewProfessionalLabelDetail3 = (detail3) => {
        this.newProfessionalLabel.detail3 = detail3.no;
        this.newProfessionalLabel.detailCategoryNo = detail3.categoryNo;
    }

    @action changeNewProfessionalLabelPrint= (print) => {
        this.newProfessionalLabel.print = print.no;
        this.newProfessionalLabel.printCategoryNo = print.categoryNo;
    }
    @action changeNewProfessionalLabelPrint1= (print1) => {
        this.newProfessionalLabel.print1 = print1.no;
        this.newProfessionalLabel.printCategoryNo = print1.categoryNo;
    }
    @action changeNewProfessionalLabelPrint2= (print2) => {
        this.newProfessionalLabel.print2 = print2.no;
        this.newProfessionalLabel.printCategoryNo = print2.categoryNo;
    }
    @action changeNewProfessionalLabelPrint3= (print3) => {
        this.newProfessionalLabel.print3 = print3.no;
        this.newProfessionalLabel.printCategoryNo = print3.categoryNo;
    }

    @action changeNewProfessionalLabelTexture = (texture) => {
        this.newProfessionalLabel.texture = texture.no;
        this.newProfessionalLabel.textureCategoryNo = texture.categoryNo;
    }
    @action changeNewProfessionalLabelTexture1 = (texture1) => {
        this.newProfessionalLabel.texture1 = texture1.no;
        this.newProfessionalLabel.textureCategoryNo = texture1.categoryNo;
    }
    @action changeNewProfessionalLabelTexture2 = (texture2) => {
        this.newProfessionalLabel.texture2 = texture2.no;
        this.newProfessionalLabel.textureCategoryNo = texture2.categoryNo;
    }
    @action changeNewProfessionalLabelTexture3 = (texture3) => {
        this.newProfessionalLabel.texture3 = texture3.no;
        this.newProfessionalLabel.textureCategoryNo = texture3.categoryNo;
    }

    @action changeNewProfessionalLabelClothLength = (clothLength) => {
        this.newProfessionalLabel.clothLength = clothLength.no;
        this.newProfessionalLabel.clothLengthCategoryNo = clothLength.categoryNo;
    }
    @action changeNewProfessionalLabelClothLength1 = (clothLength1) => {
        this.newProfessionalLabel.clothLength1 = clothLength1.no;
        this.newProfessionalLabel.clothLengthCategoryNo = clothLength1.categoryNo;
    }
    @action changeNewProfessionalLabelClothLength2 = (clothLength2) => {
        this.newProfessionalLabel.clothLength2 = clothLength2.no;
        this.newProfessionalLabel.clothLengthCategoryNo = clothLength2.categoryNo;
    }
    @action changeNewProfessionalLabelClothLength3 = (clothLength3) => {
        this.newProfessionalLabel.clothLength3 = clothLength3.no;
        this.newProfessionalLabel.clothLengthCategoryNo = clothLength3.categoryNo;
    }

    @action changeNewProfessionalLabelNeckLine = (neckLine) => {
        this.newProfessionalLabel.neckLine = neckLine.no;
        this.newProfessionalLabel.neckLineCategoryNo = neckLine.categoryNo;
    }
    @action changeNewProfessionalLabelNeckLine1 = (neckLine1) => {
        this.newProfessionalLabel.neckLine1 = neckLine1.no;
        this.newProfessionalLabel.neckLineCategoryNo = neckLine1.categoryNo;
    }
    @action changeNewProfessionalLabelNeckLine2 = (neckLine2) => {
        this.newProfessionalLabel.neckLine2 = neckLine2.no;
        this.newProfessionalLabel.neckLineCategoryNo = neckLine2.categoryNo;
    }
    @action changeNewProfessionalLabelNeckLine3 = (neckLine3) => {
        this.newProfessionalLabel.neckLine3 = neckLine3.no;
        this.newProfessionalLabel.neckLineCategoryNo = neckLine3.categoryNo;
    }

    @action changeNewProfessionalLabelKara = (kara) => {
        this.newProfessionalLabel.kara = kara.no;
        this.newProfessionalLabel.karaCategoryNo = kara.categoryNo;
    }
    @action changeNewProfessionalLabelKara1 = (kara1) => {
        this.newProfessionalLabel.kara1 = kara1.no;
        this.newProfessionalLabel.karaCategoryNo = kara1.categoryNo;
    }
    @action changeNewProfessionalLabelKara2 = (kara2) => {
        this.newProfessionalLabel.kara2 = kara2.no;
        this.newProfessionalLabel.karaCategoryNo = kara2.categoryNo;
    }
    @action changeNewProfessionalLabelKara3 = (kara3) => {
        this.newProfessionalLabel.kara3 = kara3.no;
        this.newProfessionalLabel.karaCategoryNo = kara3.categoryNo;
    }

    @action changeNewProfessionalLabelFit = (fit) => {
        this.newProfessionalLabel.fit = fit.no;
        this.newProfessionalLabel.fitCategoryNo = fit.categoryNo;
    }
    @action changeNewProfessionalLabelFit1 = (fit1) => {
        this.newProfessionalLabel.fit1 = fit1.no;
        this.newProfessionalLabel.fitCategoryNo = fit1.categoryNo;
    }
    @action changeNewProfessionalLabelFit2 = (fit2) => {
        this.newProfessionalLabel.fit2 = fit2.no;
        this.newProfessionalLabel.fitCategoryNo = fit2.categoryNo;
    }
    @action changeNewProfessionalLabelFit3 = (fit3) => {
        this.newProfessionalLabel.fit3 = fit3.no;
        this.newProfessionalLabel.fitCategoryNo = fit3.categoryNo;
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
                }
        } catch (e) {
            console.log('에러좀 나지 마라')
        }
    });




}