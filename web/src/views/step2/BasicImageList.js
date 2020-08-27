
import React from "react";
import MaterialTable from 'material-table';
import {inject, observer} from "mobx-react";
import {toJS} from "mobx";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TablePagination from "@material-ui/core/TablePagination";

@inject('authStore','polygonStore','basicCategoryStore','checkHighLabelStore')
@observer
class BasicImageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            pageSize: 5,
            selected: [],
            basicLabelList: [],
            checkBoxListLength : -1,
            count: 0,
            data: [],
        }
    }

    allToggle = () => {
        const checkList = toJS(this.props.checkHighLabelStore.polygonList);
        const selectList =checkList.slice(this.state.pageSize * this.state.page, this.state.page * this.state.pageSize + this.state.pageSize);
        const selected = toJS(this.props.checkHighLabelStore.selectedItem);
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
        const selected = toJS(this.props.checkHighLabelStore.selectedItem);
        if (selected.includes(workNo)) selected.splice(selected.indexOf(workNo), 1);
        else selected.push(workNo);
        this.setState({ selected });
        this.props.checkHighLabelStore.changeSelectedItem(selected);
    };

    componentDidMount() {
        const createdId = this.props.authStore.isUserId;
        this.props.checkHighLabelStore.pageResetAll();
        this.props.checkHighLabelStore.LoadPolygonImage1(createdId);
        this.props.checkHighLabelStore.selectedItemReset();
        this.props.basicCategoryStore.LoadColorList();
        this.props.basicCategoryStore.LoadSleeveList();
    }

    componentWillUnmount() {
        this.props.polygonStore.initStore();
    }
    handleClick = (workNo, imageData,polyNo, comment) => {
        this.props.checkHighLabelStore.LoadReviewHighLabelList(workNo);
        this.props.checkHighLabelStore.cleanLabel();
        this.props.checkHighLabelStore.changeNewBasicLabelWorkNo(workNo);
        this.props.checkHighLabelStore.changeNewBasicLabelCreatedId(this.props.authStore.loginUser.id);
        if(this.props.onClick) {
            this.props.onClick(workNo, imageData,polyNo,comment);
        }
    }

    handleClickReturn = () =>{
        const retry = window.confirm("작업을 전단계로 되돌려 보내시겠습니까?");
        if(retry){
            //
        }
    }

    handleChangePagingPage = (event,page) => {
        this.setState({
            selected : [],
        })
        this.props.checkHighLabelStore.changePage(page);
        this.props.checkHighLabelStore.LoadPolygonImage1(this.props.authStore.isUserId);
        this.props.checkHighLabelStore.selectedItemReset();
    }

    handleChangePagingRowsPerPage = (event) => {
        this.setState({
            pageSize : event,
        })
        this.props.checkHighLabelStore.changePageSize(event);
        this.props.checkHighLabelStore.LoadPolygonImage1(this.props.authStore.isUserId);
        this.props.checkHighLabelStore.selectedItemReset();
    }

    handleSearchChange = (event) =>{
        this.props.checkHighLabelStore.changeKeyword(event);
        this.props.checkHighLabelStore.LoadPolygonImage1(this.props.authStore.isUserId);
        this.props.checkHighLabelStore.selectedItemReset();
    }


    handleRowClick = (event, rowData) => {
        this.toggle(rowData.workNo);
    };


    render() {
        const polyNo = this.props.polygonStore.tabIndex1-1;
        return (
            <MaterialTable
                columns={[
                {title: <Checkbox onClick={this.allToggle.bind(this)} variant="outlined"
                                  checked={this.props.checkHighLabelStore.selectedItem.length ===
                                  this.props.checkHighLabelStore.polygonList.length ? true : false}>
                        </Checkbox>,
                    render : rowData => <Checkbox checked={this.props.checkHighLabelStore.selectedItem.includes(rowData.workNo)}></Checkbox>},
                {title: '번호', field: 'workNo',type: 'button', filterPlaceholder: 'GroupNo filter', tooltip: 'workNo로 정렬'},
                {title: '사진', field: 'fileName',type: 'Image', render : rowData => <img src={rowData.fileName} style={{width: 80, height:80, borderRadius:15}}/> },
                {title: '이름', field: 'workName',type: 'button', filterPlaceholder: 'GroupNo filter',},
                {title: '등록자', field: 'createdId', type: 'text', initialEditValue: 'test', tooltip: 'This is tooltip text'},
                {title: '생성일', field: 'createdDatetime', type: 'date'},
                    ]}
                data={!!this.props.checkHighLabelStore.polygonList ?
                    this.props.checkHighLabelStore.polygonList.map((item) => {
                        return {
                            workNo: item.workNo,
                            fileName: item.fileName,
                            workName: item.workName,
                            createdId: item.createdId,
                            createdDatetime: item.createdDatetime,
                            comment: item.comment
                        }
                    }) : []}
                title="이미지 리스트"
                options={{
                    sorting:false,
                    actionsColumnIndex: -1,
                    headerStyle: {
                        backgroundColor: '#E2E2E2',
                        color: '#000000',
                        textAlign:'center',
                    },
                    cellStyle: {
                        textAlign: 'center',
                    },
                    pageSize : this.props.checkHighLabelStore.pageSize,
                    pageSizeOptions : [5,10,25,50],
                }}
                onRowClick={this.handleRowClick}
                onChangeRowsPerPage={this.handleChangePagingRowsPerPage}
                onSearchChange={this.handleSearchChange}
                components={{
                    Pagination: props => (
                        <TablePagination
                            {...props}
                            component="div"
                            count={this.props.checkHighLabelStore.totalCount}
                            rowsPerPage={this.props.checkHighLabelStore.pageSize}
                            page={this.props.checkHighLabelStore.page}
                            onChangePage={this.handleChangePagingPage}
                        />
                    )
                }}

                actions={[
                    {
                        icon: 'check',
                        tooltip: 'Select Image',
                        onClick: (event, rowData) => this.handleClick(rowData.workNo, "/api/v1/kfashion/img/getByteImage?workNo="+rowData.workNo,polyNo, rowData.comment)
                    },
                    rowData => ({
                        icon: 'error',
                        iconProps: {
                            style: {color: 'red'}
                        },
                        tooltip: <h1 style={{lineHeight:1}}>{rowData.comment}</h1>,
                        hidden: rowData.comment == null,
                    })
                ]}
            />
        );
    }
};
export default BasicImageList;