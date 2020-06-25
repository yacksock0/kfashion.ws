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

export default class AdminVerify extends React.Component {
    state = {
        text: 'text',
        data: [
            {no: '1',email:'jang6845@naver.com', group: <select/>, name:'장성열', birthDay:new Date(),createdDateTime: '1994-11-23T08:15:30-05:00', updatedDateTime: new Date() },
            {no: '2', group: '아이테르대학교', createdDateTime: '1994-11-23T08:15:30-05:00', updatedDateTime: new Date() },
            {no: '3', group: '교마이스터고', createdDateTime: '1994-11-23T08:15:30-05:00', updatedDateTime: new Date() },
        ],
        columns: [
            { title: '아이디', field: 'no', filterPlaceholder: 'GroupNo filter', tooltip: 'GroupNo로 정렬', editPlaceholder: 'GroupNo 입력' },
            { title: '이메일', field: 'email', initialEditValue: 'test', tooltip: 'This is tooltip text' },
            { title: '이름', field: 'name', type: 'datetime' },
            { title: '생년월일', field: 'birthDay', type: 'date' },
            { title: '연락처', field: 'updatedDateTime', type: 'datetime' },
            { title: '소속', field: 'group', type: '<select>' },
            { title: '신청일', field: 'updatedDateTime', type: 'datetime' },
        ],
    }
    render() {
        return (
            <div style={{ maxWidth: "100%" }}>
                <MaterialTable
                    icons={tableIcons}
                    columns={this.state.columns}
                    data={this.state.data}
                    title="관리자 승인"
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        /* const data = this.state.data;
                                        const index = data.indexOf(oldData);
                                        data[index] = newData;
                                        this.setState({ data }, () => resolve()); */
                                    }
                                    resolve();
                                }, 1000);
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        /* let data = this.state.data;
                                        const index = data.indexOf(oldData);
                                        data.splice(index, 1);
                                        this.setState({ data }, () => resolve()); */
                                    }
                                    resolve();
                                }, 1000);
                            })
                    }}
                />
            </div>
        );
    }
}