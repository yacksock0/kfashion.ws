import React, {forwardRef} from "react";
import MaterialTable from 'material-table';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import Edit from '@material-ui/icons/Edit';
import {inject, observer} from "mobx-react";
import CheckIcon from '@material-ui/icons/Check';
import {Button, Container, Grid, Toolbar, Typography} from "@material-ui/core";
import 'react-tabs/style/react-tabs.css';
import Stepper from "../components/Stepper";
import AddBox from "@material-ui/icons/AddBox";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ChevronRight from "@material-ui/icons/ChevronRight";
import SaveAlt from "@material-ui/icons/SaveAlt";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Remove from "@material-ui/icons/Remove";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {fabric} from "fabric";

const styles = theme => ({   root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {
        minWidth: 500,
    },

    mainContainer: {
        flexGrow: 1,
        marginTop:20,
        maxWidth:'80%',
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
        padding:0,
    },
    buttonType1:{
        width: 100,
        marginRight: theme.spacing(2),
    },
    buttonType2:{
        width: 150,
        float:'right',

    },
    toolButton:{
        border:'1px solid black',
        height:50,
        width:'100%',
    },
    test:{
        border:'1px solid black',
        height: '50%',
    },
    toolBox:{
        border:'1px solid black',
        marginRight: 1,
        height:'100%',
    },
    fileText: {
        paddingTop: 32,
        paddingRight: theme.spacing(2),
        textAlign: 'left'
    },
    filebox: {
        paddingTop: 35,
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    fileSelection: {
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        border: 0,
        borderRadius: 12,
    },

    divStyle: {
        display: 'inline',
    },
});

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

@inject('professionalLabelStore','authStore', 'imageStore', 'currentStepStore')
@observer
class finalCheckList extends React.Component {
    canvas;
    constructor(props) {
        super(...arguments , props);
        this.state = {

            tapIndex: 1,
            createdId: '',
            boundaryList: [],
            imgData:'',
            count: 0,
            data: [],
            columns: [
                {title: '번호', field: 'workNo',type: 'button', filterPlaceholder: 'GroupNo filter', tooltip: 'workNo로 정렬'},
                {title: '사진', field: 'fileName',type: 'Image', render : rowData => <img src={rowData.fileName} style={{width: 50, height:50,}}/> },
                {title: '이름', field: 'workName',type: 'button', filterPlaceholder: 'GroupNo filter',},
                {title: '생성일', field: 'createdDatetime', type: 'date'},
            ],
        }
    }

    componentWillUnmount() {
        this.props.imageStore.initStore();
    }

    componentDidMount() {
        this.props.currentStepStore.setStep(4);
        this.props.imageStore.LoadInspectionList();
        const id = this.props.authStore.loginUser.id;
        this.setState({createdId : id});
        this.props.enqueueSnackbar("FinalCheck", {
            variant: 'info'
        });
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelWorkNo(this.props.imageStore.isWorkNo);
        this.canvas = new fabric.Canvas('c');
    }
    handleClick=(workNo, imgData)=>{
        this.setState({
            imgData:imgData,
        })

        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
            width: 750,
            height: 850,
            originX: 'left',
            originY: 'top'
        });

    }
    handleClickReturn=()=>{

    }
    render() {
        const {classes,history} = this.props;

        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Grid container>
                        <Grid item xs={5}>
                            <div>
                                <canvas id="c" width={750} height={850} className={classes.canvas}>  </canvas>
                            </div>
                        </Grid>
                        <Grid item xs={3} style={{marginRight:10}}>
                            <div>
                                <TableContainer component={Paper} style={{height:'60vh'}}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead style={{backgroundColor:"primary"}}>
                                            <TableRow>
                                                <TableCell align="center">항목</TableCell>
                                                <TableCell align="center">레이블링</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                                <TableRow>
                                                    <TableCell align="center">스타일</TableCell>
                                                    <TableCell align="center"></TableCell>
                                                </TableRow>
                                            <TableRow>
                                                <TableCell align="center">카테고리</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center">컬러</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center">디테일</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center">프린트</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center">소재</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center">기장</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center">소매기장</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center">넥라인</TableCell>
                                                <TableCell align="center"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center">칼라</TableCell>
                                                <TableCell align="left"></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center">핏</TableCell>
                                                <TableCell align="left"></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <MaterialTable
                                icons={tableIcons
                                }

                                columns={this.state.columns}
                                data={!!this.props.imageStore.inspectionList ?
                                    this.props.imageStore.inspectionList.map((item) => {
                                        return {
                                            workNo: item.workNo,
                                            fileName: item.fileName,
                                            workName: item.workName,
                                            createdDatetime: item.createdDatetime,
                                        }
                                    }) : []}
                                title="이미지 리스트"
                                options={{
                                    search: true,
                                    actionsColumnIndex: -1,
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
                                        onClick: (event, rowData) => this.handleClickReturn(rowData.id)
                                    }
                                ]}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
};
export default withSnackbar(withRouter(withStyles(styles) (finalCheckList)));