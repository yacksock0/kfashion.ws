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
import {Button} from "@material-ui/core";
import GroupList from "./GroupList";
import {Link} from "react-router-dom";
import List from "@material-ui/core/List";
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


@inject('adminAuthorityStore')
@observer
export default class AdminVerify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        userList : [],
            id: '',
        columns: [
            { title: '아이디', field: 'id', filterPlaceholder: 'GroupNo filter', tooltip: 'GroupNo로 정렬', editPlaceholder: 'GroupNo 입력'},
            { title: '이메일', field: 'email',type: 'text'},
            { title: '이름', field: 'name', type: 'text'},
            { title: '연락처', field: 'phone', type: 'number'},
            { title: '소속', field: 'value', type:'',render: rowData => <GroupList />},
            { title: '신청일', field: 'createdDatetime', type: 'date'},
            ],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onRowSelection = this.onRowSelection.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios.get('/api/v1/kfashion/users/userList')
            .then(response => response.data)
            .then(res => {
                this.setState({ userList : res, loading: false})
            })
            .catch(error => {
                console.log(error)
            })
    }
    onRowSelection(){

    }
    handleSubmit(){
        this.props.adminAuthorityStore.changeNewAdminId(this.state.id);
        this.props.adminAuthorityStore.doAdminUp();
    }
    render() {
        const {userList} = this.state.userList;
        return (
            <div>
            <div style={{ maxWidth: "100%" }}>
                <MaterialTable
                    icons={tableIcons}
                    columns={this.state.columns}
                    data={userList}
                    title="그룹 관리자 승인"
                    editable={{
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        axios.get('/api/v1/kfashion/users/userList')
                                            .then(response => response.data)
                                            .then(res => {
                                                this.setState({ userList : res, loading: false})
                                            })
                                    }
                                    resolve();
                                }, 1000);
                            })
                    }}
                    options={{
                        sorting: false,
                        /*padding:'dense',*/
                        minBodyHeight: '77vh',
                        selection: true,
                        actionsColumnIndex: -1,
                        headerStyle: {
                            backgroundColor: '#01579b',
                            color: '#FFF',
                            textAlign:'center',
                        },
                        cellStyle: {
                            textAlign: 'center'
                        },
                    }}
                    onSelectionChange={(rows,rowData) => {this.setState({id : rowData.id})}
                    }
                />
            </div>
                <hr></hr>
                <Button  style={{float:"right"}} variant="contained" color="primary" onClick={this.handleSubmit}>
                    승인
                </Button>
            </div>
        );
    }
}