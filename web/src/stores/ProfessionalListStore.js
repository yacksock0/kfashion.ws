import {action, flow, observable} from "mobx";
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
export default class ProfessionalListStore {
    @observable professionalList = [];
    @observable addState = AddState.Closed;
    @observable updateState = UpdateState.Closed;
    @observable state = State.Ready;

    @action initStore = () => {
        this.professionalList = [];
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