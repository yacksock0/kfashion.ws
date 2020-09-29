import React from 'react';
import MaterialTable from 'material-table';
import axios from "axios";

import {Button} from "@material-ui/core";
import GroupList from "./GroupList";
import {inject, observer} from "mobx-react";

@inject('adminAuthorityStore','userListStore')
@observer
export default class AdminVerify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        userList : [],
            id: '',
            groupNo : '',
        // columns: [
        //     { title: '아이디', field: 'id', type : 'text', value :'id', filterPlaceholder: 'GroupNo filter', tooltip: 'GroupNo로 정렬', editPlaceholder: 'GroupNo 입력'},
        //     { title: '이메일', field: 'email',type: 'text', value: 'email'},
        //     { title: '이름', field: 'name', type: 'text', value: 'name'},
        //     { title: '연락처', field: 'phone', type: 'text', value: 'phone'},
        //     { title: '소속', field: 'value', render: rowData => {rowData.value ? rowData.value : <GroupList rowDataId={rowData.id}/>}},
        //     { title: '신청일', field: 'createdDatetime', type: 'date'},
        //     ],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onRowSelection = this.onRowSelection.bind(this);
    }

    componentDidMount() {
        this.props.adminAuthorityStore.LoadUserList();
    }

    componentWillUnmount() {
        this.props.adminAuthorityStore.initStore();
    }
    onRowSelection(){

    }
    handleSubmit(){
        this.props.adminAuthorityStore.doAdminUp();
    }
    render() {
        return (
            <div>
            <div style={{ maxWidth: "100%" }}>
                <MaterialTable
                    columns={ [{ title: '아이디', field: 'id', type : 'text', value :'id', filterPlaceholder: 'GroupNo filter', tooltip: 'GroupNo로 정렬', editPlaceholder: 'GroupNo 입력'},
                    { title: '이메일', field: 'email',type: 'text', value: 'email'},
                    { title: '이름', field: 'name', type: 'text', value: 'name'},
                    { title: '연락처', field: 'phone', type: 'text', value: 'phone'},
                    { title: '소속', field: 'value', render: rowData => rowData.groupNo ? rowData.groupNo : <GroupList rowDataId={rowData.id}/>},
                    { title: '신청일', field: 'createdDatetime', type: 'date',editable: 'never'},
                    { title: '비밀번호', field: 'password', editable: 'onUpdate'},
                        ]}
                    data={!!this.props.adminAuthorityStore.userList ?
                        this.props.adminAuthorityStore.userList.map((item) => {
                            return {
                                id: item.id,
                                email: item.email,
                                name: item.name,
                                phone: item.phone,
                                groupNo : item.groupNo,
                                value: item.value,
                                createdDatetime: item.createdDatetime,
                            }
                        }) : []}
                    title="그룹 관리자 승인"
                    editable={{
                        onRowDelete: rowData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                        axios.delete(`/api/v1/kfashion/users/deleteGroupAdminUser/${rowData.id}`, {
                                            data : {
                                                id : rowData.id
                                            }
                                        }).then(res => {
                                            if(res.status === 200) {
                                                this.props.adminAuthorityStore.LoadUserList();
                                            }
                                        })
                                    resolve();
                                }, 1000);
                            }),
                        onRowUpdate: rowData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    try {
                                        this.props.userListStore.changeNewMemberId(rowData.id)
                                        this.props.userListStore.changeNewMemberPassword(rowData.password)
                                        this.props.userListStore.changeNewMemberUserName(rowData.name)
                                        this.props.userListStore.changeNewMemberGroupNo(rowData.groupNo)
                                        this.props.userListStore.UpdatedGroupUser();

                                    } catch (e) {
                                        console.log('여기 에러 났음')
                                    }
                                    resolve();
                                }, 1000);
                            }),
                    }}
                    options={{
                        emptyRowsWhenPaging: true,
                        sorting: false,
                        /*padding:'dense',*/
                        minBodyHeight: '65vh',
                        selection: false,
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: '#000000',
                            color: '#FFF',
                            textAlign:'center',
                        },
                        cellStyle: {
                            textAlign: 'center'
                        },
                        pageSize: 10,
                        pageSizeOptions: [5,10,20]
                    }}
                />
            </div>
                <hr></hr>
                <Button  style={{float:"right"}} variant="outlined" onClick={this.handleSubmit}>
                    승인
                </Button>
            </div>
        );
    }
}