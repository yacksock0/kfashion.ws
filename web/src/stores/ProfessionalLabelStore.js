import {action, computed, flow, observable, toJS} from "mobx";
import axios from "axios";
import {reset} from "react-tabs/lib/helpers/uuid";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    Success: 'Success',
    Fail: 'Fail',
}
const EmptyNewOuterReviewLabel = {
    category1 : '',
    categoryCategoryNo1 : '',
    detailCount : 0,
    printCount : 0,
    textureCount : 0,

    detail1 : [],
    detailCategoryNo1 : [],
    detailItemName1 : [],

    print1 : [],
    printCategoryNo1 : [],
    printItemName1 : [],

    texture1 : [],
    textureCategoryNo1 : [],
    textureItemName1 : [],

    clothLength1 : '',
    clothLengthCategoryNo1 : '',
    neckLine1 : '',
    neckLineCategoryNo1 : '',
    kara1 : '',
    karaCategoryNo1 : '',
    fit1 : '',
    fitCategoryNo1 : '',
}
const EmptyNewTopReviewLabel = {
    category2 : '',
    categoryCategoryNo2 : '',
    detailCount : 0,
    printCount : 0,
    textureCount : 0,

    detail2 : [],
    detailCategoryNo2 : [],
    detailItemName2 : [],

    print2 : [],
    printCategoryNo2 : [],
    printItemName2 : [],

    texture2 : [],
    textureCategoryNo2 : [],
    textureItemName2 : [],

    clothLength2 : '',
    clothLengthCategoryNo2 : '',
    neckLine2 : '',
    neckLineCategoryNo2 : '',
    kara2 : '',
    karaCategoryNo2 : '',
    fit2 : '',
    fitCategoryNo2 : '',
}
const EmptyNewPantsReviewLabel = {
    category3 : '',
    categoryCategoryNo3 : '',
    detailCount : 0,
    printCount : 0,
    textureCount : 0,
    detail3 : [],
    detailCategoryNo3 : [],
    detailItemName3 : [],

    print3 : [],
    printCategoryNo3 : [],
    printItemName3 : [],

    texture3 : [],
    textureCategoryNo3 : [],
    textureItemName3 : [],

    clothLength3 : '',
    clothLengthCategoryNo3 : '',
    fit3 : '',
    fitCategoryNo3 : '',
}
const EmptyNewOnePieceReviewLabel = {
    category4 : '',
    categoryCategoryNo4 : '',

    detailCount : 0,
    printCount : 0,
    textureCount : 0,

    detail4 : [],
    detailCategoryNo4 : [],
    detailItemName4 : [],

    print4 : [],
    printCategoryNo4 : [],
    printItemName4 : [],

    texture4 : [],
    textureCategoryNo4 : [],
    textureItemName4 : [],

    clothLength4 : '',
    clothLengthCategoryNo4 : '',
    neckLine4 : '',
    neckLineCategoryNo4 : '',
    kara4 : '',
    karaCategoryNo4 : '',
    fit4 : '',
    fitCategoryNo4 : '',
}
const EmptyNewStyleReviewLabel = {
    createdId : '',
    workNo : '',
    workStep : 6,
    labelNo1 : 0,
    labelNo2 : 0,
    labelNo3 : 0,
    labelNo4 : 0,
    labelNo5 : 0,
    style : '',
    styleSub : '',
    styleCategoryNo : '',
    styleCategorySubNo : '',
}


const EmptyNewProfessionalLabel = {
    workNo : '',
    workStep : 6,
    labelNo1 : 0,
    labelNo2 : 0,
    labelNo3 : 0,
    labelNo4 : 0,
    labelNo5 : 0,
    createdId : '',
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
    detail1 : [],
    detail2 : [],
    detail3 : [],
    detail4 : [],
    detailCategoryNo1 : [],
    detailCategoryNo2 : [],
    detailCategoryNo3 : [],
    detailCategoryNo4 : [],
    print1 : [],
    print2 : [],
    print3 : [],
    print4 : [],
    printCategoryNo1 : [],
    printCategoryNo2 : [],
    printCategoryNo3 : [],
    printCategoryNo4 : [],
    texture1 : [],
    texture2 : [],
    texture3 : [],
    texture4 : [],
    textureCategoryNo1 : [],
    textureCategoryNo2 : [],
    textureCategoryNo3 : [],
    textureCategoryNo4 : [],
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

    styleItemName :'',
    styleSubItemName : '',
    categoryItemName1 : '',
    categoryItemName2 : '',
    categoryItemName3 : '',
    categoryItemName4 : '',
    detailItemName1 : [],
    detailItemName2 : [],
    detailItemName3 : [],
    detailItemName4 : [],
    printItemName1 : [],
    printItemName2 : [],
    printItemName3 : [],
    printItemName4 : [],
    textureItemName1 : [] ,
    textureItemName2 : [] ,
    textureItemName3 : [] ,
    textureItemName4 : [] ,
    clothLengthItemName1 : '',
    clothLengthItemName2 : '',
    clothLengthItemName3 : '',
    clothLengthItemName4 : '',
    neckLineItemName1 : '',
    neckLineItemName2 : '',
    neckLineItemName4 : '',
    karaItemName1: '',
    karaItemName2 : '',
    karaItemName4 : '',
    fitItemName1 : '',
    fitItemName2 : '',
    fitItemName3 : '',
    fitItemName4 : '',
}
const menuOpen = {
    categoryDialLog : '',
    clothLengthDialLog: '',
    colorKaraDialLog:'',
    detailDialLog:'',
    fitDialLog:'',
    neckLineDialLog:'',
    printDialLog:'',
    textureDialLog:'',
    categoryAll1 :'',
    categoryAll2 :'',
    categoryAll3 :'',
    categoryAll4 :'',
}
export default class ProfessionalLabelStore {
    @observable state = State.Ready;
    @observable newProfessionalLabel = {...EmptyNewProfessionalLabel};
    @observable professionalList = [];
    @observable recentlyImg=[];
    @observable outerReviewLabel= {...EmptyNewOuterReviewLabel};
    @observable topReviewLabel= {...EmptyNewTopReviewLabel};
    @observable pantsReviewLabel= {...EmptyNewPantsReviewLabel};
    @observable onePieceReviewLabel= {...EmptyNewOnePieceReviewLabel};
    @observable styleReviewLabel= {...EmptyNewStyleReviewLabel};
    @observable menuOpen={...menuOpen};
    @observable workNo = 0;
    @observable inspectionList = [];

    @action openCategoryAll1 =(value)=>{
        this.menuOpen.categoryAll1 = value;
    }
    @action openCategoryAll2 =(value)=>{
        this.menuOpen.categoryAll2 = value;
    }
    @action openCategoryAll3 =(value)=>{
        this.menuOpen.categoryAll3 = value;
    }
    @action openCategoryAll4 =(value)=>{
        this.menuOpen.categoryAll4 = value;
    }
    @action openCategoryDialLog =(value)=>{
        this.menuOpen.categoryDialLog = value;
    }
    @action openClothLength =(value)=>{
        this.menuOpen.clothLengthDialLog = value;
    }
    @action openColorKaraDialLog =(value)=>{
        this.menuOpen.colorKaraDialLog = value;
    }
    @action openDetailDialLog =(value)=>{
        this.menuOpen.detailDialLog = value;
    }
    @action openFitDialLog =(value)=>{
        this.menuOpen.fitDialLog = value;
    }
    @action openNeckLineDialLog =(value)=>{
        this.menuOpen.neckLineDialLog = value;
    }
    @action openPrintDialLog =(value)=>{
        this.menuOpen.printDialLog = value;
    }
    @action openTextureDialLog =(value)=>{
        this.menuOpen.textureDialLog = value;
    }

    @action initStore = () => {
        this.professionalList = [];
    }
    @action changeLabelNumber = (labelNo)=>{
        if(labelNo == 1){
            this.styleReviewLabel.labelNo1 = labelNo;
            return this.styleReviewLabel;
        }else if(labelNo == 2){
            this.styleReviewLabel.labelNo2 = labelNo;
            return this.styleReviewLabel;
        }else if(labelNo == 3){
            this.styleReviewLabel.labelNo3 = labelNo;
            return this.styleReviewLabel;
        }else{
            this.styleReviewLabel.labelNo4 = labelNo;
            return this.styleReviewLabel;
        }
    }
    @action changeNewProfessionalLabelNo1 = (labelNo1) => {
        this.styleReviewLabel.labelNo1 = labelNo1;
    }

    @action changeNewProfessionalLabelNo2 = (labelNo2) => {
        this.styleReviewLabel.labelNo2 = labelNo2;
    }
    @action changeNewProfessionalLabelNo3 = (labelNo3) => {
        this.styleReviewLabel.labelNo3 = labelNo3;
    }
    @action changeNewProfessionalLabelNo4 = (labelNo4) => {
        this.styleReviewLabel.labelNo4 = labelNo4;
    }
    @action changeNewProfessionalLabelNo5 = (labelNo5) => {
        this.styleReviewLabel.labelNo5 = labelNo5;
    }

    @action changeNewProfessionalLabelStyle = (style) => {
        this.changeNewProfessionalLabelNo5(5);
        this.styleReviewLabel.style = style.no;
        this.styleReviewLabel.styleCategoryNo = style.categoryNo;
        this.styleReviewLabel.styleItemName = style.categoryItemName;
        return this.styleReviewLabel;
    }
    @action changeNewProfessionalLabelStyleSub = (styleSub) => {
        this.changeNewProfessionalLabelNo5(5);
        this.styleReviewLabel.styleSub = styleSub.no;
        this.styleReviewLabel.styleCategorySubNo = styleSub.categoryNo;
        this.styleReviewLabel.styleSubItemName = styleSub.categoryItemName;
        return this.styleReviewLabel;
    }
    @action deleteStyle = () => {
        this.styleReviewLabel.style = '';
        this.styleReviewLabel.styleCategoryNo = 0;
        this.styleReviewLabel.styleItemName = '';
        return this.styleReviewLabel;
    }
    @action deleteSubStyle = () => {
        this.styleReviewLabel.styleSub = '';
        this.styleReviewLabel.styleCategorySubNo = 0;
        this.styleReviewLabel.styleSubItemName = '';
        return this.styleReviewLabel;
    }

    @action changeNewProfessionalLabelCategory1 = (category1) => {
        this.changeNewProfessionalLabelNo1(1);
        this.outerReviewLabel.category1 = category1.no;
        this.outerReviewLabel.categoryCategoryNo1 = category1.categoryNo;
        this.outerReviewLabel.categoryItemName1 = category1.categoryItemName;
        return this.outerReviewLabel
    }
    @action changeNewProfessionalLabelCategory2 = (category2) => {
        this.changeNewProfessionalLabelNo2(2);
        this.topReviewLabel.category2 = category2.no;
        this.topReviewLabel.categoryCategoryNo2 = category2.categoryNo;
        this.topReviewLabel.categoryItemName2 = category2.categoryItemName;
        return this.topReviewLabel;
    }
    @action changeNewProfessionalLabelCategory3 = (category3) => {
        this.changeNewProfessionalLabelNo3(3);
        this.pantsReviewLabel.category3 = category3.no;
        this.pantsReviewLabel.categoryCategoryNo3 = category3.categoryNo;
        this.pantsReviewLabel.categoryItemName3 = category3.categoryItemName;
        return this.pantsReviewLabel;
    }
    @action changeNewProfessionalLabelCategory4 = (category4) => {
        this.changeNewProfessionalLabelNo4(4);
        this.onePieceReviewLabel.category4 = category4.no;
        this.onePieceReviewLabel.categoryCategoryNo4 = category4.categoryNo;
        this.onePieceReviewLabel.categoryItemName4 = category4.categoryItemName;
        return this.onePieceReviewLabel;
    }
    @action deleteCategory1 = () => {
        this.outerReviewLabel.category1 = '';
        this.outerReviewLabel.categoryCategoryNo1 = 0;
        this.outerReviewLabel.categoryItemName1 = '';
        return this.outerReviewLabel;
    }

    @action deleteCategory2 = () => {
        this.topReviewLabel.category2 = '';
        this.topReviewLabel.categoryCategoryNo2 = 0;
        this.topReviewLabel.categoryItemName2 = '';
        return this.topReviewLabel;
    }
    @action deleteCategory3 = () => {
        this.pantsReviewLabel.category3 = '';
        this.pantsReviewLabel.categoryCategoryNo3 = 0;
        this.pantsReviewLabel.categoryItemName3 = '';
        return this.pantsReviewLabel;
    }
    @action deleteCategory4 = () => {
        this.onePieceReviewLabel.category4 = '';
        this.onePieceReviewLabel.categoryCategoryNo4 = 0;
        this.onePieceReviewLabel.categoryItemName4 = '';
        return this.onePieceReviewLabel;
    }

    @action changeNewProfessionalLabelDetail1 = (detail1) => {
        console.log(this.outerReviewLabel.detail1)
        this.changeNewProfessionalLabelNo1(1);
        this.outerReviewLabel.detail1[this.outerReviewLabel.detailCount] = detail1.no;
        this.outerReviewLabel.detailCategoryNo1[this.outerReviewLabel.detailCount] = detail1.categoryNo;
        this.outerReviewLabel.detailItemName1[this.outerReviewLabel.detailCount] = detail1.categoryItemName;
        this.outerReviewLabel.detailCount +=1;
    }
    @action changeNewProfessionalLabelDetail2 = (detail2) => {
        this.changeNewProfessionalLabelNo2(2);
        this.topReviewLabel.detail2[this.topReviewLabel.detailCount] = detail2.no;
        this.topReviewLabel.detailCategoryNo2[this.topReviewLabel.detailCount] = detail2.categoryNo;
        this.topReviewLabel.detailItemName2[this.topReviewLabel.detailCount] = detail2.categoryItemName;
        this.topReviewLabel.detailCount +=1
    }

    @action changeNewProfessionalLabelDetail3= (detail3) => {
        this.changeNewProfessionalLabelNo3(3);
        this.pantsReviewLabel.detail3[this.pantsReviewLabel.detailCount] = detail3.no;
        this.pantsReviewLabel.detailCategoryNo3[this.pantsReviewLabel.detailCount] = detail3.categoryNo;
        this.pantsReviewLabel.detailItemName3[this.pantsReviewLabel.detailCount] = detail3.categoryItemName;
        this.pantsReviewLabel.detailCount +=1;
    }

    @action changeNewProfessionalLabelDetail4 = (detail4) => {
        this.changeNewProfessionalLabelNo4(4);
        this.onePieceReviewLabel.detail4[this.onePieceReviewLabel.detailCount] = detail4.no;
        this.onePieceReviewLabel.detailCategoryNo4[this.onePieceReviewLabel.detailCount] = detail4.categoryNo;
        this.onePieceReviewLabel.detailItemName4[this.onePieceReviewLabel.detailCount] = detail4.categoryItemName;
        this.onePieceReviewLabel.detailCount +=1;
    }
    @action deleteDetail1 = (detail1) => {
        let index = 0;
        for(let i = 0 ; i<this.outerReviewLabel.detailItemName1.length ; i++){
            if(detail1 ==this.outerReviewLabel.detailItemName1[i]){
                index = i;
            }
        }
        this.outerReviewLabel.detail1.splice(index, 1);
        this.outerReviewLabel.detailCategoryNo1.splice(index, 1);
        this.outerReviewLabel.detailItemName1.splice(index, 1);
        this.outerReviewLabel.detailCount -=1;
    }
    @action deleteDetail2 = (detail2) => {
        let index = 0;
        for(let i = 0 ; i<this.topReviewLabel.detailItemName2.length ; i++){
            if(detail2 ==this.topReviewLabel.detailItemName2[i]){
                index = i;
            }
        }
        this.topReviewLabel.detail2.splice(index, 1);
        this.topReviewLabel.detailCategoryNo2.splice(index, 1);
        this.topReviewLabel.detailItemName2.splice(index, 1);
        this.topReviewLabel.detailCount -=1;
    }
    @action deleteDetail3 = (detail3) => {
        let index = 0;
        for(let i = 0 ; i<this.pantsReviewLabel.detailItemName3.length ; i++){
            if(detail3 ==this.pantsReviewLabel.detailItemName3[i]){
                index = i;
            }
        }
        this.pantsReviewLabel.detail3.splice(index, 1);
        this.pantsReviewLabel.detailCategoryNo3.splice(index, 1);
        this.pantsReviewLabel.detailItemName3.splice(index, 1);
        this.pantsReviewLabel.detailCount -=1;

    }
    @action deleteDetail4 = (detail4) => {
        let index = 0;
        for(let i = 0 ; i<this.onePieceReviewLabel.detailItemName4.length ; i++){
            if(detail4 ==this.onePieceReviewLabel.detailItemName4[i]){
                index = i;
            }
        }
        this.onePieceReviewLabel.detail4.splice(index, 1);
        this.onePieceReviewLabel.detailCategoryNo4.splice(index, 1);
        this.onePieceReviewLabel.detailItemName4.splice(index, 1);
        this.onePieceReviewLabel.detailCount -=1;
    }

    @action changeNewProfessionalLabelPrint1= (print1) => {
        console.log(this.outerReviewLabel.print1)
        this.changeNewProfessionalLabelNo1(1);
        this.outerReviewLabel.print1[this.outerReviewLabel.printCount] = print1.no;
        this.outerReviewLabel.printCategoryNo1[this.outerReviewLabel.printCount] = print1.categoryNo;
        this.outerReviewLabel.printItemName1[this.outerReviewLabel.printCount] = print1.categoryItemName;
        this.outerReviewLabel.printCount +=1;
    }
    @action changeNewProfessionalLabelPrint2= (print2) => {
        console.log(this.topReviewLabel.print2)
        this.changeNewProfessionalLabelNo2(2);
        this.topReviewLabel.print2[this.topReviewLabel.printCount] = print2.no;
        this.topReviewLabel.printCategoryNo2[this.topReviewLabel.printCount] = print2.categoryNo;
        this.topReviewLabel.printItemName2[this.topReviewLabel.printCount] = print2.categoryItemName;
        this.topReviewLabel.printCount +=1;
    }
    @action changeNewProfessionalLabelPrint3= (print3) => {
        console.log(this.pantsReviewLabel.print3)
        this.changeNewProfessionalLabelNo3(3);
        this.pantsReviewLabel.print3[this.pantsReviewLabel.printCount] = print3.no;
        this.pantsReviewLabel.printCategoryNo3[this.pantsReviewLabel.printCount] = print3.categoryNo;
        this.pantsReviewLabel.printItemName3[this.pantsReviewLabel.printCount] = print3.categoryItemName;
        this.pantsReviewLabel.printCount +=1;
    }
    @action changeNewProfessionalLabelPrint4= (print4) => {
        console.log(this.onePieceReviewLabel.print4)
        this.changeNewProfessionalLabelNo4(4);
        this.onePieceReviewLabel.print4[this.onePieceReviewLabel.printCount] = print4.no;
        this.onePieceReviewLabel.printCategoryNo4[this.onePieceReviewLabel.printCount] = print4.categoryNo;
        this.onePieceReviewLabel.printItemName4[this.onePieceReviewLabel.printCount] = print4.categoryItemName;
        this.onePieceReviewLabel.printCount +=1;
    }
    @action deletePrint1 = (print1) => {
        let index = 0;
        for(let i = 0 ; i<this.outerReviewLabel.printItemName1.length ; i++){
            if(print1 ==this.outerReviewLabel.printItemName1[i]){
                index = i;
            }
        }
        this.outerReviewLabel.print1.splice(index, 1);
        this.outerReviewLabel.printCategoryNo1.splice(index, 1);
        this.outerReviewLabel.printItemName1.splice(index, 1);
        this.outerReviewLabel.printCount -=1;
    }
    @action deletePrint2 = (print2) => {
        let index = 0;
        for(let i = 0 ; i<this.topReviewLabel.printItemName2.length ; i++){
            if(print2 ==this.topReviewLabel.printItemName2[i]){
                index = i;
            }
        }
        this.topReviewLabel.print2.splice(index, 1);
        this.topReviewLabel.printCategoryNo2.splice(index, 1);
        this.topReviewLabel.printItemName2.splice(index, 1);
        this.topReviewLabel.printCount -=1;
    }
    @action deletePrint3 = (print3) => {
        let index = 0;
        for(let i = 0 ; i<this.pantsReviewLabel.printItemName3.length ; i++){
            if(print3 ==this.pantsReviewLabel.printItemName3[i]){
                index = i;
            }
        }
        this.pantsReviewLabel.print3.splice(index, 1);
        this.pantsReviewLabel.printCategoryNo3.splice(index, 1);
        this.pantsReviewLabel.printItemName3.splice(index, 1);
        this.pantsReviewLabel.printCount -=1;

    }
    @action deletePrint4 = (print4) => {
        let index = 0;
        for(let i = 0 ; i<this.onePieceReviewLabel.printItemName4.length ; i++){
            if(print4 ==this.onePieceReviewLabel.printItemName4[i]){
                index = i;
            }
        }
        this.onePieceReviewLabel.print4.splice(index, 1);
        this.onePieceReviewLabel.printCategoryNo4.splice(index, 1);
        this.onePieceReviewLabel.printItemName4.splice(index, 1);
        this.onePieceReviewLabel.printCount -=1;
    }


    @action changeNewProfessionalLabelTexture1 = (texture1) => {
        this.changeNewProfessionalLabelNo1(1);
        this.outerReviewLabel.texture1[this.outerReviewLabel.textureCount] = texture1.no;
        this.outerReviewLabel.textureCategoryNo1[this.outerReviewLabel.textureCount] = texture1.categoryNo;
        this.outerReviewLabel.textureItemName1[this.outerReviewLabel.textureCount] = texture1.categoryItemName;
        this.outerReviewLabel.textureCount +=1;
    }
    @action changeNewProfessionalLabelTexture2 = (texture2) => {
        this.changeNewProfessionalLabelNo2(2);
        this.topReviewLabel.texture2[this.topReviewLabel.textureCount] = texture2.no;
        this.topReviewLabel.textureCategoryNo2[this.topReviewLabel.textureCount] = texture2.categoryNo;
        this.topReviewLabel.textureItemName2[this.topReviewLabel.textureCount] = texture2.categoryItemName;
        this.topReviewLabel.textureCount +=1;
    }
    @action changeNewProfessionalLabelTexture3 = (texture3) => {
        this.changeNewProfessionalLabelNo3(3);
        this.pantsReviewLabel.texture3[this.pantsReviewLabel.textureCount] = texture3.no;
        this.pantsReviewLabel.textureCategoryNo3[this.pantsReviewLabel.textureCount] = texture3.categoryNo;
        this.pantsReviewLabel.textureItemName3[this.pantsReviewLabel.textureCount] = texture3.categoryItemName;
        this.pantsReviewLabel.textureCount +=1;
    }
    @action changeNewProfessionalLabelTexture4 = (texture4) => {

        this.changeNewProfessionalLabelNo4(4);
        this.onePieceReviewLabel.texture4[this.onePieceReviewLabel.textureCount] = texture4.no;
        this.onePieceReviewLabel.textureCategoryNo4[this.onePieceReviewLabel.textureCount] = texture4.categoryNo;
        this.onePieceReviewLabel.textureItemName4[this.onePieceReviewLabel.textureCount] = texture4.categoryItemName;
        this.onePieceReviewLabel.textureCount +=1;
    }
    @action deleteTexture1 = (texture1) => {
        let index = 0;
        for(let i = 0 ; i<this.outerReviewLabel.textureItemName1.length ; i++){
            if(texture1 ==this.outerReviewLabel.textureItemName1[i]){
                index = i;
            }
        }
        this.outerReviewLabel.texture1.splice(index, 1);
        this.outerReviewLabel.textureCategoryNo1.splice(index, 1);
        this.outerReviewLabel.textureItemName1.splice(index, 1);
        this.outerReviewLabel.textureCount -=1;
    }
    @action deleteTexture2 = (texture2) => {
        let index = 0;
        for(let i = 0 ; i<this.topReviewLabel.textureItemName2.length ; i++){
            if(texture2 ==this.topReviewLabel.textureItemName2[i]){
                index = i;
            }
        }
        this.topReviewLabel.texture2.splice(index, 1);
        this.topReviewLabel.textureCategoryNo2.splice(index, 1);
        this.topReviewLabel.textureItemName2.splice(index, 1);
        this.topReviewLabel.textureCount -=1;
    }
    @action deleteTexture3 = (texture3) => {
        let index = 0;
        for(let i = 0 ; i<this.pantsReviewLabel.textureItemName3.length ; i++){
            if(texture3 ==this.pantsReviewLabel.textureItemName3[i]){
                index = i;
            }
        }
        this.pantsReviewLabel.texture3.splice(index, 1);
        this.pantsReviewLabel.textureCategoryNo3.splice(index, 1);
        this.pantsReviewLabel.textureItemName3.splice(index, 1);
        this.pantsReviewLabel.textureCount -=1;
    }
    @action deleteTexture4 = (texture4) => {
        let index = 0;
        for(let i = 0 ; i<this.onePieceReviewLabel.textureItemName4.length ; i++){
            if(texture4 ==this.onePieceReviewLabel.textureItemName4[i]){
                index = i;
            }
        }
        this.onePieceReviewLabel.texture4.splice(index, 1);
        this.onePieceReviewLabel.textureCategoryNo4.splice(index, 1);
        this.onePieceReviewLabel.textureItemName4.splice(index, 1);
        this.onePieceReviewLabel.textureCount -=1;
    }

    @action changeNewProfessionalLabelClothLength1 = (clothLength1) => {
        this.changeNewProfessionalLabelNo1(1);
        this.outerReviewLabel.clothLength1 = clothLength1.no;
        this.outerReviewLabel.clothLengthCategoryNo1 = clothLength1.categoryNo;
        this.outerReviewLabel.clothLengthItemName1 = clothLength1.categoryItemName;
        return this.outerReviewLabel;
    }
    @action changeNewProfessionalLabelClothLength2 = (clothLength2) => {
        this.changeNewProfessionalLabelNo2(2);
        this.topReviewLabel.clothLength2 = clothLength2.no;
        this.topReviewLabel.clothLengthCategoryNo2 = clothLength2.categoryNo;
        this.topReviewLabel.clothLengthItemName2 = clothLength2.categoryItemName;
        return this.topReviewLabel;
    }
    @action changeNewProfessionalLabelClothLength3 = (clothLength3) => {
        this.changeNewProfessionalLabelNo3(3);
        this.pantsReviewLabel.clothLength3 = clothLength3.no;
        this.pantsReviewLabel.clothLengthCategoryNo3 = clothLength3.categoryNo;
        this.pantsReviewLabel.clothLengthItemName3 = clothLength3.categoryItemName;
        return this.pantsReviewLabel;
    }
    @action changeNewProfessionalLabelClothLength4 = (clothLength4) => {
        this.changeNewProfessionalLabelNo4(4);
        this.onePieceReviewLabel.clothLength4 = clothLength4.no;
        this.onePieceReviewLabel.clothLengthCategoryNo4 = clothLength4.categoryNo;
        this.onePieceReviewLabel.clothLengthItemName4 = clothLength4.categoryItemName;
        return this.onePieceReviewLabel;
    }
    @action deleteClothLength1 = () => {
        this.outerReviewLabel.clothLength1 = '';
        this.outerReviewLabel.clothLengthCategoryNo1 = 0;
        this.outerReviewLabel.clothLengthItemName1 = '';
        return this.outerReviewLabel;
    }
    @action deleteClothLength2 = () => {
        this.topReviewLabel.clothLength2 = '';
        this.topReviewLabel.clothLengthCategoryNo2 = 0;
        this.topReviewLabel.clothLengthItemName2 = '';
        return this.topReviewLabel;
    }
    @action deleteClothLength3 = () => {
        this.pantsReviewLabel.clothLength3 = '';
        this.pantsReviewLabel.clothLengthCategoryNo3 = 0;
        this.pantsReviewLabel.clothLengthItemName3 = '';
        return this.pantsReviewLabel;
    }
    @action deleteClothLength4 = () => {
        this.onePieceReviewLabel.clothLength4 = '';
        this.onePieceReviewLabel.clothLengthCategoryNo4 = 0;
        this.onePieceReviewLabel.clothLengthItemName4 = '';
        return this.onePieceReviewLabel;
    }


    @action changeNewProfessionalLabelNeckLine1 = (neckLine1) => {
        this.changeNewProfessionalLabelNo1(1);
        this.outerReviewLabel.neckLine1 = neckLine1.no;
        this.outerReviewLabel.neckLineCategoryNo1 = neckLine1.categoryNo;
        this.outerReviewLabel.neckLineItemName1 = neckLine1.categoryItemName;
        return this.outerReviewLabel
    }
    @action changeNewProfessionalLabelNeckLine2 = (neckLine2) => {
        this.changeNewProfessionalLabelNo2(2);
        this.topReviewLabel.neckLine2 = neckLine2.no;
        this.topReviewLabel.neckLineCategoryNo2 = neckLine2.categoryNo;
        this.topReviewLabel.neckLineItemName2 = neckLine2.categoryItemName;
        return this.topReviewLabel;
    }
    @action changeNewProfessionalLabelNeckLine4 = (neckLine4) => {
        this.changeNewProfessionalLabelNo4(4);
        this.onePieceReviewLabel.neckLine4 = neckLine4.no;
        this.onePieceReviewLabel.neckLineCategoryNo4 = neckLine4.categoryNo;
        this.onePieceReviewLabel.neckLineItemName4 = neckLine4.categoryItemName;
        return this.onePieceReviewLabel;
    }
    @action deleteNeckLine1 = () => {
        this.outerReviewLabel.neckLine1 = '';
        this.outerReviewLabel.neckLineCategoryNo1 = 0;
        this.outerReviewLabel.neckLineItemName1 = '';
        return this.outerReviewLabel;
    }
    @action deleteNeckLine2 = () => {
        this.topReviewLabel.neckLine2 = '';
        this.topReviewLabel.neckLineCategoryNo2 = 0;
        this.topReviewLabel.neckLineItemName2 = '';
        return this.topReviewLabel;
    }
    @action deleteNeckLine4 = () => {
        this.onePieceReviewLabel.neckLine4 = '';
        this.onePieceReviewLabel.neckLineCategoryNo4 = 0;
        this.onePieceReviewLabel.neckLineItemName4 = '';
        return this.onePieceReviewLabel;
    }

    @action changeNewProfessionalLabelKara1 = (kara1) => {
        this.changeNewProfessionalLabelNo1(1);
        this.outerReviewLabel.kara1 = kara1.no;
        this.outerReviewLabel.karaCategoryNo1 = kara1.categoryNo;
        this.outerReviewLabel.karaItemName1 = kara1.categoryItemName;
        return this.outerReviewLabel
    }
    @action changeNewProfessionalLabelKara2 = (kara2) => {
        this.changeNewProfessionalLabelNo2(2);
        this.topReviewLabel.kara2 = kara2.no;
        this.topReviewLabel.karaCategoryNo2 = kara2.categoryNo;
        this.topReviewLabel.karaItemName2 = kara2.categoryItemName;
        return this.topReviewLabel;
    }
    @action changeNewProfessionalLabelKara4 = (kara4) => {
        this.changeNewProfessionalLabelNo4(4);
        this.onePieceReviewLabel.kara4 = kara4.no;
        this.onePieceReviewLabel.karaCategoryNo4= kara4.categoryNo;
        this.onePieceReviewLabel.karaItemName4 = kara4.categoryItemName;
        return this.onePieceReviewLabel;
    }
    @action deleteKara1 = () => {
        this.outerReviewLabel.kara1 = '';
        this.outerReviewLabel.karaCategoryNo1 = 0;
        this.outerReviewLabel.karaItemName1 = '';
        return this.outerReviewLabel;
    }
    @action deleteKara2 = () => {
        this.topReviewLabel.kara2 = '';
        this.topReviewLabel.karaCategoryNo2 = 0;
        this.topReviewLabel.karaItemName2 = '';
        return this.topReviewLabel;
    }
    @action deleteKara4 = () => {
        this.onePieceReviewLabel.kara4 = '';
        this.onePieceReviewLabel.karaCategoryNo4 = 0;
        this.onePieceReviewLabel.karaItemName4 = '';
        return this.onePieceReviewLabel;
    }

    @action changeNewProfessionalLabelFit1 = (fit1) => {
        this.changeNewProfessionalLabelNo1(1);
        this.outerReviewLabel.fit1 = fit1.no;
        this.outerReviewLabel.fitCategoryNo1 = fit1.categoryNo;
        this.outerReviewLabel.fitItemName1 = fit1.categoryItemName;
        return this.outerReviewLabel
    }
    @action changeNewProfessionalLabelFit2 = (fit2) => {
        this.changeNewProfessionalLabelNo2(2);
        this.topReviewLabel.fit2 = fit2.no;
        this.topReviewLabel.fitCategoryNo2 = fit2.categoryNo;
        this.topReviewLabel.fitItemName2 = fit2.categoryItemName;
        return this.topReviewLabel;
    }
    @action changeNewProfessionalLabelFit3 = (fit3) => {
        this.changeNewProfessionalLabelNo3(3);
        this.pantsReviewLabel.fit3 = fit3.no;
        this.pantsReviewLabel.fitCategoryNo3 = fit3.categoryNo;
        this.pantsReviewLabel.fitItemName3 = fit3.categoryItemName;
        return this.pantsReviewLabel;
    }
    @action changeNewProfessionalLabelFit4 = (fit4) => {
        this.changeNewProfessionalLabelNo4(4);
        this.onePieceReviewLabel.fit4 = fit4.no;
        this.onePieceReviewLabel.fitCategoryNo4 = fit4.categoryNo;
        this.onePieceReviewLabel.fitItemName4 = fit4.categoryItemName;
        return this.onePieceReviewLabel;
    }
    @action deleteFit1= () => {
        this.outerReviewLabel.fit1 = '';
        this.outerReviewLabel.fitCategoryNo1 = 0;
        this.outerReviewLabel.fitItemName1 = '';
        return this.outerReviewLabel;
    }
    @action deleteFit2= () => {
        this.topReviewLabel.fit2 = '';
        this.topReviewLabel.fitCategoryNo2 = 0;
        this.topReviewLabel.fitItemName2 = '';
        return this.topReviewLabel;
    }
    @action deleteFit3= () => {
        this.pantsReviewLabel.fit3 = '';
        this.pantsReviewLabel.fitCategoryNo3 = 0;
        this.pantsReviewLabel.fitItemName3 = '';
        return this.pantsReviewLabel;
    }
    @action deleteFit4= () => {
        this.onePieceReviewLabel.fit4 = '';
        this.onePieceReviewLabel.fitCategoryNo4 = 0;
        this.onePieceReviewLabel.fitItemName4 = '';
        return this.onePieceReviewLabel;
    }


    @action changeNewProfessionalLabelCreatedId = (createdId) => {
        this.styleReviewLabel.createdId = createdId;
    }

    @action changeNewProfessionalLabelWorkNo = (workNo) => {
        this.workNo = workNo;
        console.log(this.workNo);
    }

    @computed get isLabelNo1() {
        return (this.styleReviewLabel.labelNo1 !== undefined) && (this.styleReviewLabel.labelNo1 !== null) && (this.styleReviewLabel.labelNo1.length > 0);
    }
    @computed get isLabelNo2() {
        return (this.styleReviewLabel.labelNo2 !== undefined) && (this.styleReviewLabel.labelNo2 !== null) && (this.styleReviewLabe2.labelNo1.length > 0);
    }
    @computed get isLabelNo3() {
        return (this.styleReviewLabel.labelNo3 !== undefined) && (this.styleReviewLabel.labelNo3 !== null) && (this.styleReviewLabe3.labelNo1.length > 0);
    }
    @computed get isLabelNo4() {
        return (this.styleReviewLabel.labelNo4 !== undefined) && (this.styleReviewLabel.labelNo4 !== null) && (this.styleReviewLabe4.labelNo1.length > 0);
    }
    @computed get isLabelNo5() {
        return (this.styleReviewLabel.labelNo5 !== undefined) && (this.styleReviewLabel.labelNo5 !== null) && (this.styleReviewLabe5.labelNo1.length > 0);
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

    doProfessionalLabelUp = flow(function* doProfessionalLabelUp(changeWorkNo) {
        this.state = State.Pending;
        try {
                this.newProfessionalLabel.category1 = this.outerReviewLabel.category1;
                this.newProfessionalLabel.categoryCategoryNo1 = this.outerReviewLabel.categoryCategoryNo1;
                this.newProfessionalLabel.category1 = this.outerReviewLabel.category1;
                this.newProfessionalLabel.detail1 = this.outerReviewLabel.detail1;
                this.newProfessionalLabel.detailCategoryNo1 = this.outerReviewLabel.detailCategoryNo1;
                this.newProfessionalLabel.print1 = this.outerReviewLabel.print1;
                this.newProfessionalLabel.printCategoryNo1 = this.outerReviewLabel.printCategoryNo1;
                this.newProfessionalLabel.texture1 = this.outerReviewLabel.texture1;
                this.newProfessionalLabel.textureCategoryNo1 = this.outerReviewLabel.textureCategoryNo1;
                this.newProfessionalLabel.clothLength1 = this.outerReviewLabel.clothLength1;
                this.newProfessionalLabel.clothLengthCategoryNo1 = this.outerReviewLabel.clothLengthCategoryNo1;
                this.newProfessionalLabel.neckLine1 = this.outerReviewLabel.neckLine1;
                this.newProfessionalLabel.neckLineCategoryNo1 = this.outerReviewLabel.neckLineCategoryNo1;
                this.newProfessionalLabel.kara1 = this.outerReviewLabel.kara1;
                this.newProfessionalLabel.karaCategoryNo1 = this.outerReviewLabel.karaCategoryNo1;
                this.newProfessionalLabel.fit1 = this.outerReviewLabel.fit1;
                this.newProfessionalLabel.fitCategoryNo1 = this.outerReviewLabel.fitCategoryNo1;

                this.newProfessionalLabel.category2 = this.topReviewLabel.category2;
                this.newProfessionalLabel.categoryCategoryNo2 = this.topReviewLabel.categoryCategoryNo2;
                this.newProfessionalLabel.detail2 = this.topReviewLabel.detail2;
                this.newProfessionalLabel.detailCategoryNo2 = this.topReviewLabel.detailCategoryNo2;
                this.newProfessionalLabel.print2 = this.topReviewLabel.print2;
                this.newProfessionalLabel.printCategoryNo2 = this.topReviewLabel.printCategoryNo2;
                this.newProfessionalLabel.texture2 = this.topReviewLabel.texture2;
                this.newProfessionalLabel.textureCategoryNo2 = this.topReviewLabel.textureCategoryNo2;
                this.newProfessionalLabel.clothLength2 = this.topReviewLabel.clothLength2;
                this.newProfessionalLabel.clothLengthCategoryNo2 = this.topReviewLabel.clothLengthCategoryNo2;
                this.newProfessionalLabel.neckLine2 = this.topReviewLabel.neckLine2;
                this.newProfessionalLabel.neckLineCategoryNo2 = this.topReviewLabel.neckLineCategoryNo2;
                this.newProfessionalLabel.kara2 = this.topReviewLabel.kara2;
                this.newProfessionalLabel.karaCategoryNo2 = this.topReviewLabel.karaCategoryNo2;
                this.newProfessionalLabel.fit2 = this.topReviewLabel.fit2;
                this.newProfessionalLabel.fitCategoryNo2 = this.topReviewLabel.fitCategoryNo2;

                this.newProfessionalLabel.category3 = this.pantsReviewLabel.category3;
                this.newProfessionalLabel.categoryCategoryNo3 = this.pantsReviewLabel.categoryCategoryNo3;
                this.newProfessionalLabel.detail3 = this.pantsReviewLabel.detail3;
                this.newProfessionalLabel.detailCategoryNo3 = this.pantsReviewLabel.detailCategoryNo3;
                this.newProfessionalLabel.print3 = this.pantsReviewLabel.print3;
                this.newProfessionalLabel.printCategoryNo3 = this.pantsReviewLabel.printCategoryNo3;
                this.newProfessionalLabel.texture3 = this.pantsReviewLabel.texture3;
                this.newProfessionalLabel.textureCategoryNo3 = this.pantsReviewLabel.textureCategoryNo3;
                this.newProfessionalLabel.clothLength3 = this.pantsReviewLabel.clothLength3;


                this.newProfessionalLabel.clothLengthCategoryNo3 = this.pantsReviewLabel.clothLengthCategoryNo3;
                this.newProfessionalLabel.fit3 = this.pantsReviewLabel.fit3;
                this.newProfessionalLabel.fitCategoryNo3 = this.pantsReviewLabel.fitCategoryNo3;

                this.newProfessionalLabel.category4 = this.onePieceReviewLabel.category4;
                this.newProfessionalLabel.categoryCategoryNo4 = this.onePieceReviewLabel.categoryCategoryNo4;
                this.newProfessionalLabel.detail4 = this.onePieceReviewLabel.detail4;
                this.newProfessionalLabel.detailCategoryNo4 = this.onePieceReviewLabel.detailCategoryNo4;
                this.newProfessionalLabel.print4 = this.onePieceReviewLabel.print4;
                this.newProfessionalLabel.printCategoryNo4 = this.onePieceReviewLabel.printCategoryNo4;
                this.newProfessionalLabel.texture4 = this.onePieceReviewLabel.texture4;
                this.newProfessionalLabel.textureCategoryNo4 = this.onePieceReviewLabel.textureCategoryNo4;
                this.newProfessionalLabel.clothLength4 = this.onePieceReviewLabel.clothLength4;
                this.newProfessionalLabel.category4 = this.onePieceReviewLabel.category4;
                this.newProfessionalLabel.clothLengthCategoryNo4 = this.onePieceReviewLabel.clothLengthCategoryNo4;
                this.newProfessionalLabel.neckLine4 = this.onePieceReviewLabel.neckLine4;
                this.newProfessionalLabel.neckLineCategoryNo4 = this.onePieceReviewLabel.neckLineCategoryNo4;
                this.newProfessionalLabel.kara4 = this.onePieceReviewLabel.kara4;
                this.newProfessionalLabel.karaCategoryNo4 = this.onePieceReviewLabel.karaCategoryNo4;
                this.newProfessionalLabel.fit4 = this.onePieceReviewLabel.fit4;
                this.newProfessionalLabel.fitCategoryNo4 = this.onePieceReviewLabel.fitCategoryNo4;

                this.newProfessionalLabel.createdId = this.styleReviewLabel.createdId;
                this.newProfessionalLabel.workNo = this.workNo;
                this.newProfessionalLabel.workStep = 6;
                this.newProfessionalLabel.labelNo1 = this.styleReviewLabel.labelNo1;
                this.newProfessionalLabel.labelNo2 = this.styleReviewLabel.labelNo2;
                this.newProfessionalLabel.labelNo3 = this.styleReviewLabel.labelNo3;
                this.newProfessionalLabel.labelNo4 = this.styleReviewLabel.labelNo4;
                this.newProfessionalLabel.labelNo5 = this.styleReviewLabel.labelNo5;
                this.newProfessionalLabel.style = this.styleReviewLabel.style;
                this.newProfessionalLabel.styleSub = this.styleReviewLabel.styleSub;
                this.newProfessionalLabel.styleCategoryNo = this.styleReviewLabel.styleCategoryNo;
                this.newProfessionalLabel.styleCategorySubNo = this.styleReviewLabel.styleCategorySubNo;
            const param = toJS(this.newProfessionalLabel);
            console.log("print1 : "+ this.newProfessionalLabel.print1);
            console.log("print2 : "+ this.newProfessionalLabel.print2);
            console.log("print3 : "+ this.newProfessionalLabel.print3);
            console.log("print4 : "+ this.newProfessionalLabel.print4);

            console.log("texture1 : "+ this.newProfessionalLabel.texture1);
            console.log("texture2 : "+ this.newProfessionalLabel.texture2);
            console.log("texture3 : "+ this.newProfessionalLabel.texture3);
            console.log("texture4 : "+ this.newProfessionalLabel.texture4);

            console.log("clothLength2 : "+ this.newProfessionalLabel.clothLength2);
            console.log("clothLengthCategoryNo2 : "+ this.newProfessionalLabel.clothLengthCategoryNo2);
            console.log("clothLength3 : "+ this.newProfessionalLabel.clothLength3);
            console.log("clothLengthCategoryNo3 : "+ this.newProfessionalLabel.clothLengthCategoryNo3);

                const resp = yield axios.post('/api/v1/kfashion/label/professionalLabel', param);
                if (resp.status === 200) {
                    const createdId =this.newProfessionalLabel.createdId;
                    this.state = State.Success;
                    this.LoadProfessionalList(createdId);
                    this.outerReviewLabel= {...EmptyNewOuterReviewLabel};
                    this.topReviewLabel= {...EmptyNewTopReviewLabel};
                    this.pantsReviewLabel= {...EmptyNewPantsReviewLabel};
                    this.onePieceReviewLabel= {...EmptyNewOnePieceReviewLabel};
                    this.styleReviewLabel= {...EmptyNewStyleReviewLabel};
                    this.LoadRecentImage(createdId);
                    changeWorkNo(0);
                    alert("저장 완료");
                } else {
                    this.state = State.Fail;
                }
        } catch (e) {
            console.log('에러 좀 나지 마라 Label insert error (doProfessionalLabelUp check)');
        }
    });

    LoadLabelList = flow(function* LoadLabelList(workNo) {
        this.state = State.Pending;
        try {
            const response = yield axios.get('/api/v1/kfashion/label/reviewLabelList?workNo='+workNo)


            console.log(response.data.onePieceReviewLabel);
            alert(response.data.pantsReviewLabel.category3);
            alert(response.data.topReviewLabel.category2);
            alert(response.data.onePieceReviewLabel);
            if(response.data.outerReviewLabel != null) {
                this.changeNewProfessionalLabelNo1(1);
                this.outerReviewLabel = response.data.outerReviewLabel;
                this.outerReviewLabel.detailCount = response.data.outerReviewLabel.detail1.length;
                this.outerReviewLabel.printCount = response.data.outerReviewLabel.print1.length;
                this.outerReviewLabel.textureCount = response.data.outerReviewLabel.texture1.length;
            }else {
                this.outerReviewLabel= {...EmptyNewOuterReviewLabel};
            }
            if(response.data.topReviewLabel != null) {
                this.changeNewProfessionalLabelNo2(2);
                this.topReviewLabel = response.data.topReviewLabel;
                this.topReviewLabel.detailCount = response.data.topReviewLabel.detail2.length;
                this.topReviewLabel.printCount = response.data.topReviewLabel.print2.length;
                this.topReviewLabel.textureCount = response.data.topReviewLabel.texture2.length;
            }else {
                this.topReviewLabel = {...EmptyNewTopReviewLabel};
            }
            if(response.data.pantsReviewLabel != null) {
                this.changeNewProfessionalLabelNo3(3);
                this.pantsReviewLabel = response.data.pantsReviewLabel;
                this.pantsReviewLabel.detailCount = response.data.pantsReviewLabel.detail3.length;
                this.pantsReviewLabel.printCount = response.data.pantsReviewLabel.print3.length;
                this.pantsReviewLabel.textureCount = response.data.pantsReviewLabel.texture2.length;
            }else {
                this.pantsReviewLabel = {...EmptyNewPantsReviewLabel};
            }
            if(response.data.onePieceReviewLabel != null) {
                this.changeNewProfessionalLabelNo4(4);
                this.onePieceReviewLabel = response.data.onePieceReviewLabel;
                this.onePieceReviewLabel.detailCount = response.data.onePieceReviewLabel.detail4.length;
                this.onePieceReviewLabel.printCount = response.data.onePieceReviewLabel.print4.length;
                this.onePieceReviewLabel.textureCount = response.data.onePieceReviewLabel.texture4.length;
            }else {
                this.onePieceReviewLabel = {...EmptyNewOnePieceReviewLabel};
            }if(response.data.styleReviewLabel != null) {
                this.styleReviewLabel = response.data.styleReviewLabel;
                this.changeNewProfessionalLabelNo5(5);
            }else {
                this.styleReviewLabel = {...EmptyNewStyleReviewLabel};
            }

        } catch (e) {
            console.log('에러좀 나지 마라')
        }
    });

    cleanLabel = flow(function* LoadLabelList(workNo) {
        this.outerReviewLabel= {...EmptyNewOuterReviewLabel};
        this.topReviewLabel= {...EmptyNewTopReviewLabel};
        this.pantsReviewLabel= {...EmptyNewPantsReviewLabel};
        this.onePieceReviewLabel= {...EmptyNewOnePieceReviewLabel};
        this.styleReviewLabel= {...EmptyNewStyleReviewLabel};
    });

    deleteProfessionalLabel = flow(function* deleteProfessionalLabel(workNo) {
        this.state = State.Pending;
        try {

            const resp = yield axios.get('/api/v1/kfashion/label/deleteProfessionalLabel?workNo='+ workNo);
            if (resp.status === 200) {
                this.updateProfessionalLabelUp();
            } else {
                this.state = State.Fail;
            }
        } catch (e) {
            console.log('에러좀 나지 마라')
        }
    });

    deleteImg = flow(function* deleteImg(workNo,createdId) {
        console.log(workNo);
        try {
            const resp = yield axios.delete(`/api/v1/kfashion/img/deleteImage/${workNo}`, {
                data: {
                    workNo: workNo
                }
            })
            if(resp.status === 200) {
                this.LoadProfessionalList(createdId);
            }
        } catch (err) {
            console.log(err);
        }
    })


    updateProfessionalLabelUp = flow(function* updateProfessionalLabelUp(changeWorkNo) {
        this.state = State.Pending;
        try {
            this.newProfessionalLabel.category1 = this.outerReviewLabel.category1;
            this.newProfessionalLabel.categoryCategoryNo1 = this.outerReviewLabel.categoryCategoryNo1;
            this.newProfessionalLabel.category1 = this.outerReviewLabel.category1;
            this.newProfessionalLabel.detail1 = this.outerReviewLabel.detail1;
            this.newProfessionalLabel.detailCategoryNo1 = this.outerReviewLabel.detailCategoryNo1;
            this.newProfessionalLabel.print1 = this.outerReviewLabel.print1;
            this.newProfessionalLabel.printCategoryNo1 = this.outerReviewLabel.printCategoryNo1;
            this.newProfessionalLabel.texture1 = this.outerReviewLabel.texture1;
            this.newProfessionalLabel.textureCategoryNo1 = this.outerReviewLabel.textureCategoryNo1;
            this.newProfessionalLabel.clothLength1 = this.outerReviewLabel.clothLength1;
            this.newProfessionalLabel.clothLengthCategoryNo1 = this.outerReviewLabel.clothLengthCategoryNo1;
            this.newProfessionalLabel.neckLine1 = this.outerReviewLabel.neckLine1;
            this.newProfessionalLabel.neckLineCategoryNo1 = this.outerReviewLabel.neckLineCategoryNo1;
            this.newProfessionalLabel.kara1 = this.outerReviewLabel.kara1;
            this.newProfessionalLabel.karaCategoryNo1 = this.outerReviewLabel.karaCategoryNo1;
            this.newProfessionalLabel.fit1 = this.outerReviewLabel.fit1;
            this.newProfessionalLabel.fitCategoryNo1 = this.outerReviewLabel.fitCategoryNo1;

            this.newProfessionalLabel.category2 = this.topReviewLabel.category2;
            this.newProfessionalLabel.categoryCategoryNo2 = this.topReviewLabel.categoryCategoryNo2;
            this.newProfessionalLabel.detail2 = this.topReviewLabel.detail2;
            this.newProfessionalLabel.detailCategoryNo2 = this.topReviewLabel.detailCategoryNo2;
            this.newProfessionalLabel.print2 = this.topReviewLabel.print2;
            this.newProfessionalLabel.printCategoryNo2 = this.topReviewLabel.printCategoryNo2;
            this.newProfessionalLabel.texture2 = this.topReviewLabel.texture2;
            this.newProfessionalLabel.textureCategoryNo2 = this.topReviewLabel.textureCategoryNo2;
            this.newProfessionalLabel.clothLength2 = this.topReviewLabel.clothLength2;
            this.newProfessionalLabel.clothLengthCategoryNo2 = this.topReviewLabel.clothLengthCategoryNo2;
            this.newProfessionalLabel.neckLine2 = this.topReviewLabel.neckLine2;
            this.newProfessionalLabel.neckLineCategoryNo2 = this.topReviewLabel.neckLineCategoryNo2;
            this.newProfessionalLabel.kara2 = this.topReviewLabel.kara2;
            this.newProfessionalLabel.karaCategoryNo2 = this.topReviewLabel.karaCategoryNo2;
            this.newProfessionalLabel.fit2 = this.topReviewLabel.fit2;
            this.newProfessionalLabel.fitCategoryNo2 = this.topReviewLabel.fitCategoryNo2;

            this.newProfessionalLabel.category3 = this.pantsReviewLabel.category3;
            this.newProfessionalLabel.categoryCategoryNo3 = this.pantsReviewLabel.categoryCategoryNo3;
            this.newProfessionalLabel.detail3 = this.pantsReviewLabel.detail3;
            this.newProfessionalLabel.detailCategoryNo3 = this.pantsReviewLabel.detailCategoryNo3;
            this.newProfessionalLabel.print3 = this.pantsReviewLabel.print3;
            this.newProfessionalLabel.printCategoryNo3 = this.pantsReviewLabel.printCategoryNo3;
            this.newProfessionalLabel.texture3 = this.pantsReviewLabel.texture3;
            this.newProfessionalLabel.textureCategoryNo3 = this.pantsReviewLabel.textureCategoryNo3;
            this.newProfessionalLabel.clothLength3 = this.pantsReviewLabel.clothLength3;
            this.newProfessionalLabel.clothLengthCategoryNo3 = this.pantsReviewLabel.clothLengthCategoryNo3;
            this.newProfessionalLabel.fit3 = this.pantsReviewLabel.fit3;
            this.newProfessionalLabel.fitCategoryNo3 = this.pantsReviewLabel.fitCategoryNo3;

            this.newProfessionalLabel.category4 = this.onePieceReviewLabel.category4;
            this.newProfessionalLabel.categoryCategoryNo4 = this.onePieceReviewLabel.categoryCategoryNo4;
            this.newProfessionalLabel.detail4 = this.onePieceReviewLabel.detail4;
            this.newProfessionalLabel.detailCategoryNo4 = this.onePieceReviewLabel.detailCategoryNo4;
            this.newProfessionalLabel.print4 = this.onePieceReviewLabel.print4;
            this.newProfessionalLabel.printCategoryNo4 = this.onePieceReviewLabel.printCategoryNo4;
            this.newProfessionalLabel.texture4 = this.onePieceReviewLabel.texture4;
            this.newProfessionalLabel.textureCategoryNo4 = this.onePieceReviewLabel.textureCategoryNo4;
            this.newProfessionalLabel.clothLength4 = this.onePieceReviewLabel.clothLength4;
            this.newProfessionalLabel.category4 = this.onePieceReviewLabel.category4;
            this.newProfessionalLabel.clothLengthCategoryNo4 = this.onePieceReviewLabel.clothLengthCategoryNo4;
            this.newProfessionalLabel.neckLine4 = this.onePieceReviewLabel.neckLine4;
            this.newProfessionalLabel.neckLineCategoryNo4 = this.onePieceReviewLabel.neckLineCategoryNo4;
            this.newProfessionalLabel.kara4 = this.onePieceReviewLabel.kara4;
            this.newProfessionalLabel.karaCategoryNo4 = this.onePieceReviewLabel.karaCategoryNo4;
            this.newProfessionalLabel.fit4 = this.onePieceReviewLabel.fit4;
            this.newProfessionalLabel.fitCategoryNo4 = this.onePieceReviewLabel.fitCategoryNo4;

            this.newProfessionalLabel.createdId = this.styleReviewLabel.createdId;
            this.newProfessionalLabel.workNo = this.workNo;
            this.newProfessionalLabel.workStep = 6;
            this.newProfessionalLabel.labelNo1 = this.styleReviewLabel.labelNo1;
            this.newProfessionalLabel.labelNo2 = this.styleReviewLabel.labelNo2;
            this.newProfessionalLabel.labelNo3 = this.styleReviewLabel.labelNo3;
            this.newProfessionalLabel.labelNo4 = this.styleReviewLabel.labelNo4;
            this.newProfessionalLabel.labelNo5 = this.styleReviewLabel.labelNo5;
            this.newProfessionalLabel.style = this.styleReviewLabel.style;
            this.newProfessionalLabel.styleSub = this.styleReviewLabel.styleSub;
            this.newProfessionalLabel.styleCategoryNo = this.styleReviewLabel.styleCategoryNo;
            this.newProfessionalLabel.styleCategorySubNo = this.styleReviewLabel.styleCategorySubNo;
            const param = toJS(this.newProfessionalLabel);
            console.log("1 : "+ this.newProfessionalLabel.labelNo1);
            console.log("2 : "+ this.newProfessionalLabel.labelNo2);
            console.log("3 : "+ this.newProfessionalLabel.labelNo3);
            console.log("4 : "+ this.newProfessionalLabel.labelNo4);
            console.log("5 : "+ this.newProfessionalLabel.labelNo5);
            console.log('param',param);
            const resp = yield axios.post('/api/v1/kfashion/label/professionalLabel', param);
            if (resp.status === 200) {
                const createdId =this.newProfessionalLabel.createdId;
                this.state = State.Success;
                alert("수정 완료되었습니다.");
                this.LoadInspectionList(this.newProfessionalLabel.createdId);
                this.outerReviewLabel= {...EmptyNewOuterReviewLabel};
                this.topReviewLabel= {...EmptyNewTopReviewLabel};
                this.pantsReviewLabel= {...EmptyNewPantsReviewLabel};
                this.onePieceReviewLabel= {...EmptyNewOnePieceReviewLabel};
                this.styleReviewLabel= {...EmptyNewStyleReviewLabel};
                changeWorkNo(0);
            } else {
                this.state = State.Fail;
            }
        } catch (e) {
            console.log('에러 좀 나지 마라 Label insert error (doProfessionalLabelUp check)');
        }
    });

    LoadInspectionList = flow(function* loadInspectionList(createdId) {
        this.inspectionList = [];
        try {
            const response = yield axios.get('/api/v1/kfashion/img/inspectionList?createdId='+createdId);
            this.inspectionList = response.data.inspectionList;
        } catch (e) {
            console.log('error')
        }
    });

    ProfessionalCompleteUp = flow(function* professionalCompleteUp(workNo,createdId) {
        this.state = State.Pending;
        try {
            this.professionalComplete.workNo = workNo;
            this.professionalComplete.createdId = createdId;
            const param = toJS(this.professionalComplete);
            const resp = yield axios.post('/api/v1/kfashion/work/history/professionalComplete',param);
            if (resp.status === 200) {
                alert("검수가 완료 되었습니다.");
                this.LoadInspectionList(createdId);
            } else {
                this.state = State.Fail;
            }
        } catch (e) {
            console.log('에러좀 나지 마라')
        }
    });
}