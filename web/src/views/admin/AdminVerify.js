import React from 'react';
import MaterialTable from 'material-table';
import axios from "axios";

import {Button} from "@material-ui/core";
import GroupList from "./GroupList";
import {inject, observer} from "mobx-react";

@inject('adminAuthorityStore')
@observer
export default class AdminVerify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        userList : [],
            id: '',
            groupNo : '',
        columns: [
            { title: '아이디', field: 'id', type : 'text', value :'id', filterPlaceholder: 'GroupNo filter', tooltip: 'GroupNo로 정렬', editPlaceholder: 'GroupNo 입력'},
            { title: '이메일', field: 'email',type: 'text', value: 'email'},
            { title: '이름', field: 'name', type: 'text', value: 'name'},
            { title: '연락처', field: 'phone', type: 'text', value: 'phone'},
            { title: '소속', field: 'value', render: rowData => <GroupList rowDataId={rowData.id}/>},
            { title: '신청일', field: 'createdDatetime', type: 'date'},
            ],
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
                    columns={this.state.columns}
                    data={!!this.props.adminAuthorityStore.userList ?
                        this.props.adminAuthorityStore.userList.map((item) => {
                            return {
                                id: item.id,
                                email: item.email,
                                name: item.name,
                                phone: item.phone,
                                value: item.value,
                                createdDatetime: item.createdDatetime,
                            }
                        }) : []}
                    title="그룹 관리자 승인"
                    editable={{
                        onRowDelete: rowData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        axios.delete(`/api/v1/kfashion/users/deleteGroupAdminUser/${rowData.id}`, {
                                            data : {
                                                id : rowData.id
                                            }
                                        }).then(res => {
                                            if(res.status === 200) {
                                                this.props.adminAuthorityStore.LoadUserList();
                                            }
                                        })
                                    }
                                    resolve();
                                }, 1000);
                            })
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