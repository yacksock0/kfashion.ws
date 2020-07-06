import {action, computed, flow, observable, toJS} from "mobx";
import axios from "axios";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    Success: 'Success',
    Fail: 'Fail',
}

const EmptyNewProfessionalLabel = {
    workNo : 60,
    workStep : 5,
    rectNo : 1,
    polyNo : 1,
    createId : '',
    styleNoList: [],
    styleCategoryNoList: [],
    style : '',
    styleSub : '',
    styleCategoryNo : '',
    styleCategorySubNo : '',
    category : '',
    categoryCategoryNo : '',
    detail : '',
    detailCategoryNo : '',
    print : '',
    printCategoryNo : '',
    texture : '',
    textureCategoryNo : '',
    clothLength : '',
    clothLengthCategoryNo : '',
    neckLine : '',
    neckLineCategoryNo : '',
    kara : '',
    karaCategoryNo : '',
    fit : '',
    fitCategoryNo : '',
    safe : '',
    safeCategoryNo : '',
    silhouette : '',
    silhouetteCategoryNo : '',
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

    @action changeNewProfessionalLabelCategory = (category) => {
        this.newProfessionalLabel.category = category.no;
        this.newProfessionalLabel.categoryCategoryNo = category.categoryNo;
    }

    @action changeNewProfessionalLabelDetail = (detail) => {
        this.newProfessionalLabel.detail = detail.no;
        this.newProfessionalLabel.detailCategoryNo = detail.categoryNo;
    }

    @action changeNewProfessionalLabelPrint= (print) => {
        this.newProfessionalLabel.print = print.no;
        this.newProfessionalLabel.printCategoryNo = print.categoryNo;
    }

    @action changeNewProfessionalLabelTexture = (texture) => {
        this.newProfessionalLabel.texture = texture.no;
        this.newProfessionalLabel.textureCategoryNo = texture.categoryNo;
    }
    @action changeNewProfessionalLabelClothLength = (clothLength) => {
        this.newProfessionalLabel.clothLength = clothLength.no;
        this.newProfessionalLabel.clothLengthCategoryNo = clothLength.categoryNo;
    }

    @action changeNewProfessionalLabelNeckLine = (neckLine) => {
        this.newProfessionalLabel.neckLine = neckLine.no;
        this.newProfessionalLabel.neckLineCategoryNo = neckLine.categoryNo;
    }
    @action changeNewProfessionalLabelKara = (kara) => {
        this.newProfessionalLabel.kara = kara.no;
        this.newProfessionalLabel.karaCategoryNo = kara.categoryNo;
    }

    @action changeNewProfessionalLabelFit = (fit) => {
        this.newProfessionalLabel.fit = fit.no;
        this.newProfessionalLabel.fitCategoryNo = fit.categoryNo;
    }

    @action changeNewProfessionalLabelSafe= (safe) => {
        this.newProfessionalLabel.safe = safe.no;
        this.newProfessionalLabel.safeCategoryNo = safe.categoryNo;
    }

    @action changeNewProfessionalLabelSilhouette = (silhouette) => {
        this.newProfessionalLabel.silhouette = silhouette.no;
        this.newProfessionalLabel.silhouetteCategoryNo = silhouette.categoryNo;
    }

    @action changeNewProfessionalLabelCreatedId = (createdId) => {
        this.newProfessionalLabel.createdId = createdId;
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