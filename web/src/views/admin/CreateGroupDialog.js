import React from 'react';
import MaterialTable from 'material-table';
import {Button, Container, Grid} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import AddGroup from "./AddGroup";
import {inject, observer} from "mobx-react";

@inject('groupStore')
@observer
export default class CreateGroupDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            text: 'text',
            userGroupAuthorityList: [],
            data: [],
            columns: [
                {title: '번호', field: 'groupNo', filterPlaceholder: 'GroupNo filter', tooltip: 'GroupNo로 정렬'},
                {title: '그룹명', field: 'groupName', initialEditValue: 'test', tooltip: 'This is tooltip text'},
                {title: '그룹권한', field: 'authorityName', type: 'date'},
                {title: '생성일', field: 'createdDatetime', type: 'date'},
                {title: '수정일', field: 'updatedDatetime', type: 'date'},
            ],
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }
    componentDidMount() {
        this.props.groupStore.LoadUserGroupAuthorityList();
    }

    componentWillUnmount() {
        this.props.groupStore.initStore();
    }

    handleClickOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            open: false
        });
    }
    render() {
        return (
            <div style={{maxWidth:"100%"}}>
                <Button variant="outlined" onClick={this.handleClickOpen}>그룹 관리</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}
                        maxWidth={"md"}
                        fullWidth={"100%"}
                >
                    <DialogContent>
                    <MaterialTable
                        columns={this.state.columns}
                        data={!!this.props.groupStore.userGroupAuthorityList ?
                            this.props.groupStore.userGroupAuthorityList.map((item) => {
                                return {
                                    groupNo: item.groupNo,
                                    groupName: item.groupName,
                                    authorityName: item.authorityName,
                                    createdDatetime: item.createdDatetime,
                                    updatedDatetime: item.updatedDatetime,
                                }
                            }) : []}
                        title="그룹 리스트"
                        /*editable={{
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        {
                                            /!* let data = this.state.data;
                                            const index = data.indexOf(oldData);
                                            data.splice(index, 1);
                                            this.setState({ data }, () => resolve()); *!/
                                        }
                                        resolve();
                                    }, 1000);
                                })
                        }}*/
                    />
                <hr></hr>
                            <Button style={{float:"right"}} variant="outlined"  onClick={this.handleClose}>닫기</Button>
                    <AddGroup />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
