
import React from "react";
import MaterialTable from 'material-table';
import {inject, observer} from "mobx-react";
import CheckIcon from '@material-ui/icons/Check';
import { TablePagination } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import {toJS} from "mobx";
import Moment from "react-moment";

@inject('professionalLabelStore','authStore')
@observer
export default class ProImageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            pageSize: 5,
            selected: [],
            totalCount: 0,
            professionalList: [],
            count: 0,
            data: [],
        }
    }

    allToggle = () => {
        const checkList = toJS(this.props.professionalLabelStore.professionalList);
        const checkBoxList = []
        const id = this.props.authStore.loginUser.id;
        checkList.map((item, index) => {
            if (item.createdId === id) {
                return checkBoxList.push(item);
             }
            return checkBoxList;
        })
        if (checkBoxList === null || checkBoxList.length === 0) {
            this.setState({
                checkBoxListLength : -1,
            })
        } else {
            this.setState({
                checkBoxListLength: checkBoxList.length,
            })
            const selected = toJS(this.props.professionalLabelStore.selectedItem);
            if (selected.length > 0 && checkBoxList.length > selected.length) {
                for (let i = 0; i < selected.length; i++) {
                    const idx = checkBoxList.findIndex(function (item, index) {
                        return item.workNo === selected[i]
                    })
                    if (idx > -1) checkBoxList.splice(idx, 1)
                }
            }
            checkBoxList.map((item, index) => {
                return this.toggle(item.workNo, item.createdId);
            })
        }
    }

    toggle = (workNo,createdId) => {
        const selected = toJS(this.props.professionalLabelStore.selectedItem);
        if (selected.includes(workNo)){
            selected.splice(selected.indexOf(workNo), 1);
            this.setState({
                selectedId : '',
            })
        }
        else{
            selected.push(workNo);
            this.setState({
                selectedId : createdId,
            })
        }
        this.props.professionalLabelStore.changeSelectedItem(selected);
    };

    componentDidMount() {
        const createdId = this.props.authStore.isUserId;
        this.props.professionalLabelStore.selectedItemReset();
        this.props.professionalLabelStore.LoadProfessionalList(createdId);
    }

    componentWillUnmount() {
        this.props.professionalLabelStore.initStore();

    }

    handleClick = (workNo, imageData) => {
            this.props.professionalLabelStore.changeNewProfessionalLabelWorkNo(workNo);
            if(this.props.onClick) {
                this.props.onClick(workNo, imageData);
            }
    }

    handleChangePagingPage = (event,page) => {
        this.setState({
            page : page,
            selected : [],
        })
        this.props.professionalLabelStore.changePage(page);
        this.props.professionalLabelStore.LoadProfessionalList(this.props.authStore.isUserId);
        this.props.professionalLabelStore.selectedItemReset();
    }
    handleSearchChange = (keyword) => {
        this.props.professionalLabelStore.changeKeyword(keyword);
        this.props.professionalLabelStore.LoadProfessionalList(this.props.authStore.isUserId);
        this.props.professionalLabelStore.selectedItemReset();
    }

    handleChangePagingRowsPerPage = (event) => {
        this.setState({
            pageSize : event,
        })
        this.props.professionalLabelStore.changePageSize(event);
        this.props.professionalLabelStore.LoadProfessionalList(this.props.authStore.isUserId);
        this.props.professionalLabelStore.selectedItemReset();
    }

    handleRowClick = (event, rowData) => {
        const checkList = toJS(this.props.professionalLabelStore.professionalList);
        const checkBoxList = []
        checkList.map((item, index) => {
            if (item.createdId === this.props.authStore.isUserId) {
                return checkBoxList.push(item);
            }
            return checkBoxList;
        })
        if (checkBoxList === null || checkBoxList.length === 0) {
            this.setState({
                checkBoxListLength: -1,
            })
        } else {
            this.setState({
                checkBoxListLength: checkBoxList.length,
            })
            if (rowData.createdId === this.props.authStore.isUserId) {
                this.toggle(rowData.workNo, rowData.createdId);
            }
        }
    };
    
    render() {
        return (
                <MaterialTable
                columns={[
                    {title: <Checkbox onClick={this.allToggle.bind(this)} variant="outlined"
                                      checked={this.props.professionalLabelStore.selectedItem.length === this.state.checkBoxListLength ? true : false} style={{color:'#ffffff'}}>
                        </Checkbox>,
                        render : rowData => <Checkbox checked={this.props.professionalLabelStore.selectedItem.includes(rowData.workNo)} style={{color:'#000000'}}
                                                      ></Checkbox>},
                    {title: '번호', field: 'workNo',type: 'button'},
                    {title: '사진', field: 'fileName',type: 'Image', render : rowData => <img alt={rowData.workName} src={rowData.fileName} style={{width: 80, height:80, borderRadius:10}}/> },
                    {title: '이름', field: 'workName',type: 'button', filterPlaceholder: 'GroupNo filter',},
                    {title: '등록자', field: 'createdId', type: 'text', initialEditValue: 'test', tooltip: 'This is tooltip text',hidden:true},
                    {title: '생성일', field: 'createdDatetime', type: 'date'},
                ]}
                data={this.props.professionalLabelStore.professionalList.map((item) => {
                        return {
                                    workNo: item.workNo,
                                    fileName: item.fileName,
                                    workName: item.workName,
                                    createdId: item.createdId,
                                    createdDatetime: <Moment format="MM-DD">{item.createdDatetime}</Moment>,
                        }
                    })}
                title="이미지 리스트"
                onChangeColumnHidden={('createdDatetime',true)}
                options={{
                    actionsColumnIndex: -1,
                    search: true,
                    sorting:false,
                    headerStyle: {
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        textAlign:'center',
                        padding : 9
                    },
                    cellStyle: {
                        textAlign: 'center',
                        padding : 3
                    },
                    pageSize : this.props.professionalLabelStore.pageSize,
                    pageSizeOptions : [5,10,25,50],
                }}
                onRowClick={this.handleRowClick}
                onSearchChange={this.handleSearchChange}
                onChangeRowsPerPage={this.handleChangePagingRowsPerPage}
                components={{
                    Pagination: props => (
                        <TablePagination
                            {...props}
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={this.props.professionalLabelStore.totalCount}
                            rowsPerPage={this.props.professionalLabelStore.pageSize}
                            page={this.props.professionalLabelStore.page}
                            onChangePage={this.handleChangePagingPage}
                        />
                    )
                }}
                actions={[
                    {
                        icon: CheckIcon,
                        tooltip: 'Select Image',
                        onClick: (event, rowData) => this.handleClick(rowData.workNo, "/api/v1/kfashion/img/getByteImage?workNo="+rowData.workNo),
                    },
                    // {
                    //     icon: DeleteIcon,
                    //     tooltip: 'Delete',
                    //     onClick: (event, rowData) => this.handleClickReturn()
                    // }
                ]}
                // components={{
                //     Pagination: props => (
                //         <TablePagination
                //             component="div"
                //             count={this.props.professionalLabelStore.professionalList.length}
                //             labelDisplayedRows={({from, to, count}) => `총 ${count}개 중 ${from} - ${to}`}
                //             SelectProps={{renderValue: (value) => value + ' 개씩 보기'}}
                //         />
                //     )
                // }}
            />
        );
    }
}
