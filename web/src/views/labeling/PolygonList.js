import React, {forwardRef} from "react";
import MaterialTable from 'material-table';
import axios from "axios";
import {inject, observer} from "mobx-react";

@inject('authStore','imageStore','rectStore', 'polygonStore')
@observer
class PolygonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rectList: [],
            count: 0,
            data: [],
            columns: [
                {title: '번호', field: 'workNo',type: 'button', filterPlaceholder: 'GroupNo filter', tooltip: 'workNo로 정렬'},
                {title: '사진', field: 'fileName',type: 'Image', render : rowData => <img src={rowData.fileName} style={{width: 70, height:70,}}/> },
                {title: '이름', field: 'workName',type: 'button', filterPlaceholder: 'GroupNo filter',},
                {title: '등록자', field: 'createdId', type: 'text', initialEditValue: 'test', tooltip: 'This is tooltip text'},
                {title: '등록일 ', field: 'createdDatetime', type: 'date'},
            ],
        }
    }
    componentDidMount() {
        const createdId = this.props.authStore.isUserId;
        this.props.rectStore.LoadRectImage(createdId, this.handleListChange)
    }

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
    render() {
        const comment = this.props.rectStore.rectList;
        const polyNo = this.props.polygonStore.tabIndex1-1;
        return (
            <MaterialTable
                columns={this.state.columns}
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
                        backgroundColor: '#000000',
                        color: '#FFF',
                        textAlign:'center',
                    },
                    cellStyle: {
                        textAlign: 'center'
                    },
                }}
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