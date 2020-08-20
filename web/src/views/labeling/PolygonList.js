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
            count: 0,
            data: [],
        }
    }
    componentDidMount() {
        const createdId = this.props.authStore.isUserId;
        this.props.rectStore.LoadRectImage(createdId, this.handleListChange)
    }

    allToggle = () => {
        const checkList = toJS(this.props.rectStore.rectList);
        const selectList =checkList.slice(this.state.pageSize * this.state.page, this.state.page * this.state.pageSize + this.state.pageSize);
        const selected = toJS(this.props.rectStore.selectedItem);
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
        const selected = toJS(this.props.rectStore.selectedItem);
        if (selected.includes(workNo)) selected.splice(selected.indexOf(workNo), 1);
        else selected.push(workNo);
        this.setState({ selected });
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

    render() {
        const comment = this.props.rectStore.rectList;
        const polyNo = this.props.polygonStore.tabIndex1-1;
        return (
            <MaterialTable
                columns={[
                    {title: <Checkbox onClick={this.allToggle.bind(this)} variant="outlined"
                                      checked={this.props.rectStore.selectedItem.length ===
                                      this.props.rectStore.rectList.slice
                                      (this.state.pageSize * this.state.page, this.state.page * this.state.pageSize + this.state.pageSize).length ? true : false}>
                        </Checkbox>,
                        render : rowData => <Checkbox checked={this.props.rectStore.selectedItem.includes(rowData.workNo)}
                                                      onChange={this.toggle.bind(this, rowData.workNo)} ></Checkbox>},
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