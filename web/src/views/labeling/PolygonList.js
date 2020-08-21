import React, {forwardRef} from "react";
import MaterialTable from 'material-table';
import axios from "axios";
import {inject, observer} from "mobx-react";
import Checkbox from "@material-ui/core/Checkbox";
import {toJS} from "mobx";

@inject('authStore','imageStore','rectStore', 'polygonStore')
@observer
class PolygonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            pageSize: 5,
            selected: [],
            rectList: [],
            checkBoxListLength : -1,
            count: 0,
            comment : '',
            data: [],
        }
    }
    componentDidMount() {
        const createdId = this.props.authStore.isUserId;
        this.props.rectStore.LoadRectImage(createdId, this.handleListChange)
    }

    allToggle = () => {
        const checkList = toJS(this.props.rectStore.rectList);
        const selectList = checkList.slice(this.state.pageSize * this.state.page, this.state.page * this.state.pageSize + this.state.pageSize);
        const checkBoxList = []
        selectList.map((item, index) => {
            if (item.comment === '' || item.comment === null) {
                checkBoxList.push(item);
            }
        })
        if (checkBoxList === null || checkBoxList.length === 0) {
            this.setState({
                checkBoxListLength : 0,
            })
        } else {
            this.setState({
                checkBoxListLength: checkBoxList.length,
            })
            const selected = toJS(this.props.rectStore.selectedItem);
            if (selected.length > 0 && checkBoxList.length > selected.length) {
                for (let i = 0; i < selected.length; i++) {
                    const idx = checkBoxList.findIndex(function (item, index) {
                        return item.workNo === selected[i]
                    })
                    if (idx > -1) checkBoxList.splice(idx, 1)
                }
            }
            checkBoxList.map((item, index) => {
                this.toggle(item.workNo);
            })
        }
    }

    toggle = (workNo,comment) => {
        const selected = toJS(this.props.rectStore.selectedItem);
        if (selected.includes(workNo)){
            selected.splice(selected.indexOf(workNo), 1);
            this.setState({
                comment : comment,
            })
        }
        else{
            selected.push(workNo);
            this.setState({
                comment : comment,
            })
        }
        this.props.rectStore.changeSelectedItem(selected);
    };

    componentWillUnmount() {
        this.props.rectStore.initStore();
    }

    handleClick = (workNo, imageData, polyNo, comment) => {
        if(this.props.onClick) {
            this.props.onClick(workNo, imageData, polyNo, comment);
        }
    }

    handleClickReturn = () =>{
        const retry = window.confirm("작업을 전단계로 되돌려 보내시겠습니까?");
        if(retry){
            //
        }
    }
    handleListChange=(listIndex)=>{
        if(this.props.onChange){
            this.props.onChange(listIndex);
        }
    }

    handleChangePagingPage = (event) => {
        this.setState({
            page : event,
            selected : [],
        })
        this.props.rectStore.selectedItemReset();
    }

    handleChangePagingRowsPerPage = (event) => {
        this.setState({
            pageSize : event,
        })
    }
    handleRowClick = (event, rowData) => {
        console.log(rowData.comment);
        const checkList = toJS(this.props.rectStore.rectList);
        const selectList = checkList.slice(this.state.pageSize * this.state.page, this.state.page * this.state.pageSize + this.state.pageSize);
        const checkBoxList = []
        selectList.map((item, index) => {
            if (item.comment === '' || item.comment === null) {
                checkBoxList.push(item);
            }
        })
        if (checkBoxList === null || checkBoxList.length === 0) {
            this.setState({
                checkBoxListLength: 0,
            })
        } else {
            this.setState({
                checkBoxListLength: checkBoxList.length,
            })
            if (rowData.comment === '' || rowData.comment === null ) {
                this.toggle(rowData.workNo,rowData.comment);
            }
        }
    }

    render() {
        const comment = this.props.rectStore.rectList;
        const polyNo = this.props.polygonStore.tabIndex1-1;
        return (
            <MaterialTable
                columns={[
                    {title: <Checkbox onClick={this.allToggle.bind(this)} variant="outlined"
                                      checked={this.props.rectStore.selectedItem.length === this.state.checkBoxListLength ? true : false}>
                        </Checkbox>,
                        render : rowData => <Checkbox checked={this.props.rectStore.selectedItem.includes(rowData.workNo)}
                                                      disabled={rowData.comment === null || rowData.comment === ''? false : true}></Checkbox>},
                    {title: '번호', field: 'workNo',type: 'button', filterPlaceholder: 'GroupNo filter', tooltip: 'workNo로 정렬'},
                    {title: '사진', field: 'fileName',type: 'Image', render : rowData => <img src={rowData.fileName} style={{width: 80, height:80, borderRadius:15}}/> },
                    {title: '이름', field: 'workName',type: 'button', filterPlaceholder: 'GroupNo filter',},
                    {title: '등록자', field: 'createdId', type: 'text', initialEditValue: 'test', tooltip: 'This is tooltip text'},
                    {title: '등록일 ', field: 'createdDatetime', type: 'date'},
                ]}
                data={!!this.props.rectStore.rectList ?
                    this.props.rectStore.rectList.map((item) => {
                        return {
                            workNo: item.workNo,
                            fileName: item.fileName,
                            workName: item.workName,
                            createdId: item.createdId,
                            createdDatetime: item.createdDatetime,
                            comment : item.comment,
                        }
                    }) : []}
                title="이미지 리스트"

                options={{
                    sorting:false,
                    actionsColumnIndex: -1,
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
                        icon: 'check',
                        tooltip: 'Select Image',
                        onClick: (event, rowData) => this.handleClick(rowData.workNo, "/api/v1/kfashion/img/getByteImage?workNo="+rowData.workNo, polyNo, rowData.comment)
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
export default PolygonList;