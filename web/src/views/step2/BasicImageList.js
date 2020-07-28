
import React from "react";
import MaterialTable from 'material-table';
import {inject, observer} from "mobx-react";

@inject('fileUploadStore','authStore','imageStore','polygonStore','basicCategoryStore','checkHighLabelStore')
@observer
class BasicImageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basicLabelList: [],
            count: 0,
            data: [],
            columns: [
                {title: '번호', field: 'workNo',type: 'button', filterPlaceholder: 'GroupNo filter', tooltip: 'workNo로 정렬'},
                {title: '사진', field: 'fileName',type: 'Image', render : rowData => <img src={rowData.fileName} style={{width: 80, height:80, borderRadius:15}}/> },
                {title: '이름', field: 'workName',type: 'button', filterPlaceholder: 'GroupNo filter',},
                {title: '등록자', field: 'createdId', type: 'text', initialEditValue: 'test', tooltip: 'This is tooltip text'},
                {title: '생성일', field: 'createdDatetime', type: 'date'},
            ],
        }
    }
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
                        backgroundColor: '#000000',
                        color: '#FFF',
                        textAlign:'center',
                    },
                    cellStyle: {
                        textAlign: 'center',
                    },
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