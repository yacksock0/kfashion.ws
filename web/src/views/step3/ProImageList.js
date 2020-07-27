
import React from "react";
import MaterialTable from 'material-table';
import Clear from '@material-ui/icons/Clear';
import {inject, observer} from "mobx-react";
import CheckIcon from '@material-ui/icons/Check';

@inject('professionalLabelStore','authStore')
@observer
export default class ProImageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            professionalList: [],
            count: 0,
            data: [],
            columns: [
                {title: '번호', field: 'workNo',type: 'button'},
                {title: '사진', field: 'fileName',type: 'Image', render : rowData => <img src={rowData.fileName} style={{width: 80, height:80, borderRadius:15}}/> },
                {title: '이름', field: 'workName',type: 'button', filterPlaceholder: 'GroupNo filter',},
                {title: '등록자', field: 'createdId', type: 'text', initialEditValue: 'test', tooltip: 'This is tooltip text',hidden:true},
                {title: '생성일', field: 'createdDatetime', type: 'date'},
            ],
        }
    }
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

    handleClickReturn = () =>{
        const retry = window.confirm("작업을 전단계로 되돌려 보내시겠습니까?");
        if(retry){
            //
        }
    }
    render() {
        return (
            <MaterialTable
                columns={this.state.columns}
                data={!!this.props.professionalLabelStore.professionalList ?
                    this.props.professionalLabelStore.professionalList.map((item) => {
                        return {
                            workNo: item.workNo,
                            fileName: item.fileName,
                            workName: item.workName,
                            createdId: item.createdId,
                            createdDatetime: item.createdDatetime,
                        }
                    }) : []}
                title="이미지 리스트"
                onChangeColumnHidden={('createdDatetime',true)}
                options={{
                    actionsColumnIndex: -1,
                    sorting:false,
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
                        icon: CheckIcon,
                        tooltip: 'Select Image',
                        onClick: (event, rowData) => this.handleClick(rowData.workNo, "/api/v1/kfashion/img/getByteImage?workNo="+rowData.workNo)
                    },
                    {
                        icon: Clear,
                        tooltip: 'return',
                        onClick: (event, rowData) => this.handleClickReturn()
                    }
                ]}
            />
        );
    }
}
