import {action,observable} from "mobx";

export default class CurrentStepStore {
    @observable currentStep = 0;

    @action setStep = (currentStep) => {
        this.currentStep = currentStep;
    }
}