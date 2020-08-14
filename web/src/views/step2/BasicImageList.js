
import React from "react";
import MaterialTable from 'material-table';
import {inject, observer} from "mobx-react";
import {toJS} from "mobx";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

@inject('fileUploadStore','authStore','imageStore','polygonStore','basicCategoryStore','checkHighLabelStore')
@observer
class BasicImageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            pageSize: 5,
            selected: [],
            basicLabelList: [],
            count: 0,
            data: [],
            columns: [
                {title: <Button onClick={this.allToggle.bind(this)} variant="outlined" ><b>전체선택</b></Button>,
                    render : rowData => <Checkbox checked={this.state.selected.includes(rowData.workNo)}
                                                  onChange={this.toggle.bind(this, rowData.workNo)} ></Checkbox>},
                {title: '번호', field: 'workNo',type: 'button', filterPlaceholder: 'GroupNo filter', tooltip: 'workNo로 정렬'},
                {title: '사진', field: 'fileName',type: 'Image', render : rowData => <img src={rowData.fileName} style={{width: 80, height:80, borderRadius:15}}/> },
                {title: '이름', field: 'workName',type: 'button', filterPlaceholder: 'GroupNo filter',},
                {title: '등록자', field: 'createdId', type: 'text', initialEditValue: 'test', tooltip: 'This is tooltip text'},
                {title: '생성일', field: 'createdDatetime', type: 'date'},
            ],
        }
    }
    allToggle = () => {
        const checkList = toJS(this.props.checkHighLabelStore.polygonList);
        checkList.slice(this.state.pageSize * this.state.page, this.state.page * this.state.pageSize + this.state.pageSize).map(item => (
            this.toggle(item.workNo)
        ))
    }

    toggle = (workNo) => {
        const selected = this.state.selected;
        if (selected.includes(workNo)) selected.splice(selected.indexOf(workNo), 1);
        else selected.push(workNo);
        this.setState({ selected });
        this.props.checkHighLabelStore.changeSelectedItem(selected);
    };

    componentDidMount() {
        const createdId = this.props.authStore.isUserId;
        this.props.checkHighLabelStore.LoadPolygonImage1(createdId);
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


    render() {
        const polyNo = this.props.polygonStore.tabIndex1-1;
        return (
            <MaterialTable
                columns={this.state.columns}
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
                        backgroundColor: '#FFFFFF',
                        color: '#000000',
                        textAlign:'center',
                    },
                    cellStyle: {
                        textAlign: 'center',
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