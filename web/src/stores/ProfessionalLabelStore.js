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
    workStep : 5,
    createId : '',
    styleNoList: [],
    styleCategoryNoList: [],
    style : '',
    style1 : '',
    style2 : '',
    style3 : '',
    styleSub : '',
    styleSub1 : '',
    styleSub2 : '',
    styleSub3 : '',
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

    @action changeNewProfessionalLabelStyle = (style) => {
        if(style) {
            for(let i=0; i < style.length; i++) {
                this.newProfessionalLabel.styleNoList[i] = style[i].no;
                this.newProfessionalLabel.styleCategoryNoList[i] = style[i].categoryNo;
            }
            console.log(this.newProfessionalLabel.styleNoList);
            console.log(this.newProfessionalLabel.styleCategoryNoList);
            this.newProfessionalLabel.style = this.newProfessionalLabel.styleNoList[0]
            this.newProfessionalLabel.styleCategoryNo = this.newProfessionalLabel.styleCategoryNoList[0]
            this.newProfessionalLabel.styleSub = this.newProfessionalLabel.styleNoList[1]
            this.newProfessionalLabel.styleCategorySubNo = this.newProfessionalLabel.styleCategoryNoList[1]
        }
    }

    @action changeNewProfessionalLabelStyle = (style) => {
        this.newProfessionalLabel.style = style.no;
        this.newProfessionalLabel.styleCategoryNo = style.categoryNo;
    }
    @action changeNewProfessionalLabelStyle1 = (style1) => {
        this.newProfessionalLabel.style1 = style1.no;
        this.newProfessionalLabel.styleCategoryNo1 = style1.categoryNo;
    }
    @action changeNewProfessionalLabelStyle2 = (style2) => {
        this.newProfessionalLabel.style2 = style2.no;
        this.newProfessionalLabel.styleCategoryNo2 = style2.categoryNo;
    }
    @action changeNewProfessionalLabelStyle3 = (style3) => {
        this.newProfessionalLabel.style3 = style3.no;
        this.newProfessionalLabel.styleCategoryNo3 = style3.categoryNo;
    }

    @action changeNewProfessionalLabelStyleSub = (styleSub) => {
        this.newProfessionalLabel.styleSub = styleSub.no;
        this.newProfessionalLabel.styleCategorySubNo = styleSub.categoryNo;
    }
    @action changeNewProfessionalLabelStyleSub1 = (styleSub1) => {
        this.newProfessionalLabel.styleSub1 = styleSub1.no;
        this.newProfessionalLabel.styleCategorySubNo1 = styleSub1.categoryNo;
    }
    @action changeNewProfessionalLabelStyleSub2 = (styleSub2) => {
        this.newProfessionalLabel.styleSub2 = styleSub2.no;
        this.newProfessionalLabel.styleCategorySubNo2 = styleSub2.categoryNo;
    }
    @action changeNewProfessionalLabelStyleSub3 = (styleSub3) => {
        this.newProfessionalLabel.styleSub3 = styleSub3.no;
        this.newProfessionalLabel.styleCategorySubNo3 = styleSub3.categoryNo;
    }

    @action changeNewProfessionalLabelCategory = (category) => {
        this.newProfessionalLabel.category = category.no;
        this.newProfessionalLabel.categoryCategoryNo = category.categoryNo;
    }
    @action changeNewProfessionalLabelCategory1 = (category1) => {
        this.newProfessionalLabel.category1 = category1.no;
        this.newProfessionalLabel.categoryCategoryNo1 = category1.categoryNo;
    }
    @action changeNewProfessionalLabelCategory2 = (category2) => {
        this.newProfessionalLabel.category2 = category2.no;
        this.newProfessionalLabel.categoryCategoryNo2 = category2.categoryNo;
    }
    @action changeNewProfessionalLabelCategory = (category3) => {
        this.newProfessionalLabel.category3 = category3.no;
        this.newProfessionalLabel.categoryCategoryNo3 = category3.categoryNo;
    }

    @action changeNewProfessionalLabelDetail = (detail) => {
        this.newProfessionalLabel.detail = detail.no;
        this.newProfessionalLabel.detailCategoryNo = detail.categoryNo;
    }
    @action changeNewProfessionalLabelDetail1 = (detail1) => {
        this.newProfessionalLabel.detail1 = detail1.no;
        this.newProfessionalLabel.detailCategoryNo1 = detail1.categoryNo;
    }
    @action changeNewProfessionalLabelDetail2= (detail2) => {
        this.newProfessionalLabel.detail2 = detail2.no;
        this.newProfessionalLabel.detailCategoryNo2 = detail2.categoryNo;
    }
    @action changeNewProfessionalLabelDetail3 = (detail3) => {
        this.newProfessionalLabel.detail3 = detail3.no;
        this.newProfessionalLabel.detailCategoryNo3 = detail3.categoryNo;
    }

    @action changeNewProfessionalLabelPrint= (print) => {
        this.newProfessionalLabel.print = print.no;
        this.newProfessionalLabel.printCategoryNo = print.categoryNo;
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

    @action changeNewProfessionalLabelTexture = (texture) => {
        this.newProfessionalLabel.texture = texture.no;
        this.newProfessionalLabel.textureCategoryNo = texture.categoryNo;
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

    @action changeNewProfessionalLabelClothLength = (clothLength) => {
        this.newProfessionalLabel.clothLength = clothLength.no;
        this.newProfessionalLabel.clothLengthCategoryNo = clothLength.categoryNo;
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

    @action changeNewProfessionalLabelNeckLine = (neckLine) => {
        this.newProfessionalLabel.neckLine = neckLine.no;
        this.newProfessionalLabel.neckLineCategoryNo = neckLine.categoryNo;
    }
    @action changeNewProfessionalLabelNeckLine1 = (neckLine1) => {
        this.newProfessionalLabel.neckLine1 = neckLine1.no;
        this.newProfessionalLabel.neckLineCategoryNo1 = neckLine1.categoryNo;
    }
    @action changeNewProfessionalLabelNeckLine2 = (neckLine2) => {
        this.newProfessionalLabel.neckLine2 = neckLine2.no;
        this.newProfessionalLabel.neckLineCategoryNo2 = neckLine2.categoryNo;
    }
    @action changeNewProfessionalLabelNeckLine3 = (neckLine3) => {
        this.newProfessionalLabel.neckLine3 = neckLine3.no;
        this.newProfessionalLabel.neckLineCategoryNo3 = neckLine3.categoryNo;
    }

    @action changeNewProfessionalLabelKara = (kara) => {
        this.newProfessionalLabel.kara = kara.no;
        this.newProfessionalLabel.karaCategoryNo = kara.categoryNo;
    }
    @action changeNewProfessionalLabelKara1 = (kara1) => {
        this.newProfessionalLabel.kara1 = kara1.no;
        this.newProfessionalLabel.karaCategoryNo1 = kara1.categoryNo;
    }
    @action changeNewProfessionalLabelKara2 = (kara2) => {
        this.newProfessionalLabel.kara2 = kara2.no;
        this.newProfessionalLabel.karaCategoryNo2 = kara2.categoryNo;
    }
    @action changeNewProfessionalLabelKara3 = (kara3) => {
        this.newProfessionalLabel.kara3 = kara3.no;
        this.newProfessionalLabel.karaCategoryNo3 = kara3.categoryNo;
    }

    @action changeNewProfessionalLabelFit = (fit) => {
        this.newProfessionalLabel.fit = fit.no;
        this.newProfessionalLabel.fitCategoryNo = fit.categoryNo;
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

    @computed get isSignUpSuccess() {
        return this.state === State.Success;
    }

    @computed get isSignUpFailed() {
        return this.state === State.Fail;
    }

    doProfessionalLabelUp = flow(function* doProfessionalLabelUp() {
        this.state = State.Pending;
        try {
                const param = toJS(this.newProfessionalLabel);

                const resp = yield axios.post('/api/v1/kfashion/label/professionalLabel', param);
                if (resp.status === 200) {
                    this.state = State.Success;
                } else {
                }
        } catch (e) {
            console.log('에러좀 나지 마라')
        }
    });




}