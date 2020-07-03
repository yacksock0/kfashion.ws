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
    workStep : '',
    createId: '',
    style: '',
    category: '',
    detail: '',
    print: '',
    texture: '',
    clothLength: '',
    neckLine: '',
    kara : '',
    fit : '',
    safe : '',
    silhouette: '',
}

export default class ProfessionalLabelStore {
    @observable state = State.Ready;
    @observable newProfessionalLabel = {...EmptyNewProfessionalLabel}

    @action changeNewProfessionalLabelStyle = (style) => {
        this.newProfessionalLabel.style = style;
    }

    @action changeNewProfessionalLabelCategory = (category) => {
        this.newProfessionalLabel.category = category;
    }

    @action changeNewProfessionalLabelDetail = (detail) => {
        this.newProfessionalLabel.detail = detail;
    }

    @action changeNewProfessionalLabelPrint= (print) => {
        this.newProfessionalLabel.print = print;
    }

    @action changeNewProfessionalLabelTexture = (texture) => {
        this.newProfessionalLabel.texture = texture;
    }
    @action changeNewProfessionalLabelClothLength = (clothLength) => {
        this.newProfessionalLabel.clothLength = clothLength;
    }

    @action changeNewProfessionalLabelNeckLine = (neckLine) => {
        this.newProfessionalLabel.neckLine = neckLine;
    }
    @action changeNewProfessionalLabelKara = (kara) => {
        this.newProfessionalLabel.kara = kara;
    }

    @action changeNewProfessionalLabelFit = (fit) => {
        this.newProfessionalLabel.fit = fit;
    }

    @action changeNewProfessionalLabelSafe= (safe) => {
        this.newProfessionalLabel.safe = safe;
    }

    @action changeNewProfessionalLabelSilhouette = (silhouette) => {
        this.newProfessionalLabel.silhouette = silhouette;
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

    doProfessionalLabelUp = flow(function* doProfessionalLabelUp(doAction) {
        this.state = State.Pending;

        try {
                const param = toJS(this.newProfessionalLabel);

                const resp = yield axios.post('/api/v1/kfashion/label/ProfessionalLabel', param);
                if (resp.status === 200) {
                    this.state = State.Success;
                    if (doAction !== undefined) doAction();
                } else {
                }
        } catch (e) {
            console.log('에러좀 나지 마라')
        }
    });




}