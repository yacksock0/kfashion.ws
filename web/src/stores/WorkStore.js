import {action, computed, flow, observable, toJS} from "mobx";
import React from "react";
import axios from "axios";

const State = {
    Ready: 'Ready',
    Pending: 'Pending',
    NotAvailableEmail: 'NotAvailableEmail',
    Success: 'Success',
    Fail: 'Fail',
}

const AddState = {
    Closed: 'Closed',
    Opened: 'Opened',
    Adding: 'Adding',
    Added: 'Added',
    AddFailed: 'AddFailed',
};

const UpdateState = {
    Closed: 'Closed',
    Loading: 'Loading',
    Loaded: 'Loaded',
    LoadFailed: 'LoadFailed',
    Updating: 'Updating',
    Updated: 'Updated',
    UpdateFailed: 'UpdateFailed',
    Uploading: 'Uploading',
    Uploaded: 'Uploaded',
    UploadFailed: 'UploadFailed',
};
export default class WorkStore {
    @observable workQuantity= 0;
    @observable addState = AddState.Closed;
    @observable updateState = UpdateState.Closed;
    @observable state = State.Ready;

    @action initStore = () => {
        this.professionalList = 0;
    }

    LoadWorkQuantity = flow(function* workQuantity(authorityNo) {
        this.workQuantity = 0;
        try {
            const response = yield axios.get('/api/v1/kfashion/work/workQuantity?authorityNo='+authorityNo)
            this.workQuantity = response.data.workQuantity;
        } catch (e) {
            console.log('error')
        }
    });


    // doProfessionalUp = flow(function* doProfessionalUp() {
    //     this.state = State.Pending;
    //     try {
    //         const kfashionPolygonList = this.polygonInsertList.map(r => ({
    //             workNo :this.NewRectLocation.workNo,
    //             workStep : this.NewRectLocation.workStep,
    //             createdId : this.NewRectLocation.createdId,
    //             rectNo: r.polyNo,
    //             polyNo: r.polyNo,
    //             points : r.points,
    //         }));
    //         const resp = yield axios.post(`/api/v1/kfashion/polygon/location`, kfashionPolygonList);
    //         if (resp.status === 200) {
    //             this.state = State.Success;
    //             const createdId = this.NewPolygonLocation.createdId;
    //             this.LoadPolygonImage(createdId);
    //         } else {
    //         }
    //     } catch (e) {
    //         console.log('error')
    //     }
    // });
}