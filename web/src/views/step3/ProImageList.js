
import React from "react";
import MaterialTable from 'material-table';
import Clear from '@material-ui/icons/Clear';
import {inject, observer} from "mobx-react";
import CheckIcon from '@material-ui/icons/Check';
import { TablePagination } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {toJS} from "mobx";

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
        const selectList = checkList.slice(this.state.pageSize * this.state.page, this.state.page * this.state.pageSize + this.state.pageSize);
        const selected = toJS(this.props.professionalLabelStore.selectedItem);
        if(selected.length > 0 && selectList.length > selected.length)
            for(let i=0; i < selected.length; i++) {
                const idx = selectList.findIndex(function(item,index) {return item.workNo === selected[i]})
                if (idx > -1) selectList.splice(idx, 1)
            }
        selectList.map((item, index) => {
                this.toggle(item.workNo)
        })
    }

    toggle = (workNo) => {
        const selected = toJS(this.props.professionalLabelStore.selectedItem);
        if (selected.includes(workNo)) selected.splice(selected.indexOf(workNo), 1);
        else selected.push(workNo);
        this.props.professionalLabelStore.changeSelectedItem(selected);
    };

    componentDidMount() {
        const createdId = this.props.authStore.isUserId;
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

    handleChangePagingPage = (event) => {
        this.setState({
            page : event,
            selected : [],
        })
        this.props.professionalLabelStore.selectedItemReset();
    }

    handleChangePagingRowsPerPage = (event) => {
        this.setState({
            pageSize : event,
        })
    }

    handleRowClick = (event, rowData) => {
        this.toggle(rowData.workNo);
    };
    
    render() {
        const {selectedItem} = this.props.professionalLabelStore;
        return (
                <MaterialTable
                columns={[
                    {title: <Checkbox onClick={this.allToggle.bind(this)} variant="outlined"
                                      checked={this.props.professionalLabelStore.selectedItem.length === this.props.professionalLabelStore.professionalList.slice
                                      (this.state.pageSize * this.state.page, this.state.page * this.state.pageSize + this.state.pageSize).length ? true : false}
                        >
                        </Checkbox>,
                        render : rowData => <Checkbox checked={this.props.professionalLabelStore.selectedItem.includes(rowData.workNo)}
                                                      ></Checkbox>},
                    {title: '번호', field: 'workNo',type: 'button'},
                    {title: '사진', field: 'fileName',type: 'Image', render : rowData => <img src={rowData.fileName} style={{width: 80, height:80, borderRadius:15}}/> },
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
                                    createdDatetime: item.createdDatetime,
                        }
                    })}
                title="이미지 리스트"
                onChangeColumnHidden={('createdDatetime',true)}
                options={{
                    actionsColumnIndex: -1,
                    search: true,
                    sorting:false,
                    headerStyle: {
                        backgroundColor: '#FFFFFF',
                        color: '#000000',
                        textAlign:'center',
                    },
                    cellStyle: {
                        textAlign: 'center'
                    },
                    pageSize : this.state.pageSize,
                    pageSizeOptions : [5,10,25,50],
                }}
                onRowClick={this.handleRowClick}
                onChangePage={this.handleChangePagingPage}
                onChangeRowsPerPage={this.handleChangePagingRowsPerPage}
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
