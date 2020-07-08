import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from "axios";
import {Button, Container, Grid} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import AddGroup from "./AddGroup";
import {inject, observer} from "mobx-react";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

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
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>그룹 관리</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}
                        maxWidth={"md"}
                        fullWidth={"100%"}
                >
                    <DialogContent>
                    <MaterialTable
                        icons={tableIcons}
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
                            <Button style={{float:"right"}} variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    <AddGroup />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
