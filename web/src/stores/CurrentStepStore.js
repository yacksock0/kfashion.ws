import {action, computed, flow, observable, values} from "mobx";
import axios from "axios";

export default class CurrentStepStore {
    @observable currentStep = 0;

    @action setStep = (currentStep) => {
        this.currentStep = currentStep;
    }
}