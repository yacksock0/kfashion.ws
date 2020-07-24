import React, {forwardRef} from "react";
import MaterialTable from 'material-table';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import Edit from '@material-ui/icons/Edit';
import {inject, observer} from "mobx-react";
import CheckIcon from '@material-ui/icons/Check';
import {Container, Grid} from "@material-ui/core";
import 'react-tabs/style/react-tabs.css';
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
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {fabric} from "fabric";
import ReturnMsg from "./ReturnMsg";
import ErrorIcon from '@material-ui/icons/Error';
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
        maxWidth:'100%',
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

@inject('authStore','imageStore', 'checkHighLabelStore', 'currentStepStore','workStore','professionalLabelStore')
@observer
class HighCheckList extends React.Component {
    constructor(props) {
        super(...arguments , props);
        this.state = {
            color1 : '',
            color2 : '',
            color3 : '',
            color4 : '',
            colorCategoryNo1 : '',
            colorCategoryNo2 : '',
            colorCategoryNo3 : '',
            colorCategoryNo4 : '',
            colorItemName1 :'',
            colorItemName2 :'',
            colorItemName3 :'',
            colorItemName4 :'',

            subColor1 : '',
            subColor2 : '',
            subColor3 : '',
            subColor4 : '',
            subColorCategoryNo1 : '',
            subColorCategoryNo2 : '',
            subColorCategoryNo3 : '',
            subColorCategoryNo4 : '',
            colorSubItemName1 : '',
            colorSubItemName2 : '',
            colorSubItemName3 : '',
            colorSubItemName4 : '',

            sleeveLength1 : '',
            sleeveLength2 : '',
            sleeveLength4 : '',
            sleeveLengthCategoryNo1 : '',
            sleeveLengthCategoryNo2 : '',
            sleeveLengthCategoryNo4 : '',
            sleeveLengthItemName1 : '',
            sleeveLengthItemName2 : '',
            sleeveLengthItemName4 : '',

            tabIndex1: 1,
            tabIndex2:0,
            createdId: '',
            imgData:'',
            count: 0,
            data: [],
            columns: [
                {title: '번호', field: 'workNo',type: 'button', filterPlaceholder: 'GroupNo filter', tooltip: 'workNo로 정렬'},
                {title: '사진', field: 'fileName',type: 'Image', render : rowData => <img src={rowData.fileName} style={{width: 80, height:80,}}/> },
                {title: '이름', field: 'workName',type: 'button', filterPlaceholder: 'GroupNo filter',},
                {title: '생성일', field: 'createdDatetime', type: 'date'},
                {title: '반송', field: 'return',render : rowData => <ReturnMsg workNo={rowData.workNo}/> },
            ],
        }
    }

    componentWillUnmount() {
        this.props.imageStore.initStore();
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas('c');
        this.props.currentStepStore.setStep(4);
        this.props.checkHighLabelStore.LoadInspectionHighList();
        const id = this.props.authStore.loginUser.id;
        this.setState({createdId : id});
        this.props.enqueueSnackbar("FinalCheck", {
            variant: 'info'
        });
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelWorkNo(this.props.imageStore.isWorkNo);
    }

    handleClick=(workNo, imgData)=>{
        this.props.checkHighLabelStore.LoadReviewHighLabelList(workNo);
        this.setState({
            imgData:imgData,
        })
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
            width: 800,
            height: 800,
            originX: 'left',
            originY: 'top'
        });
        this.setState({tabIndex1 : 0, tabIndex2 : 0})

    }
    onSelectTab(tabIndex1) {
        this.setState({tabIndex1:tabIndex1})
    }
    onSelectTab1(tabIndex2){
        this.setState({tabIndex2:tabIndex2})
    }
    render() {
        const {inspectionHighList} = this.props.checkHighLabelStore;
        const {classes} = this.props;
        const {outerReviewHighLabel, topReviewHighLabel, pantsReviewHighLabel, onePieceReviewHighLabel} =this.props.checkHighLabelStore;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Grid container>
                        <Grid item xs={12} lg={5} xl={5}>
                            <div>
                                <canvas id="c" width="800" height="800">  </canvas>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={5} xl={5} style={{marginLeft:'auto'}}>
                            <div component={Paper}>
                                <Tabs selectedIndex={this.state.tabIndex1} onSelect={tabIndex1 => this.onSelectTab(tabIndex1)}>
                                    <TabList >
                                        <Tab tabIndex={0} style={{width: '50%', height:50,textAlign:'center'}}><h3>레이블링</h3></Tab>
                                        <Tab tabIndex={1} style={{width: '50%', height:50,textAlign:'center'}}><h3>이미지 리스트</h3></Tab>
                                    </TabList>

                                    <TabPanel>
                                    <Tabs selectedIndex={this.state.tabIndex2} onSelect={tabIndex2 => this.onSelectTab1(tabIndex2)}>
                                        <TabList >
                                            <Tab  style={{width: '25%', height:60,textAlign:'center'}}><h3>아우터</h3></Tab>
                                            <Tab  style={{width: '25%', height:60,textAlign:'center'}}><h3>상의</h3></Tab>
                                            <Tab  style={{width: '25%', height:60,textAlign:'center'}}><h3>하의</h3></Tab>
                                            <Tab  style={{width: '25%', height:60,textAlign:'center'}}><h3>원피스</h3></Tab>
                                        </TabList>
                                        <TabPanel>
                                        <TableContainer >

                                    <Table className={classes.table} aria-label="simple table" tabIndex={this.state.tabIndex}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">항목</TableCell>
                                                <TableCell align="center">레이블링</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                                <TableRow>
                                                    <TableCell align="center">색상</TableCell>
                                                    <TableCell align="center">메인 : {outerReviewHighLabel.colorItemName1} 서브 : {outerReviewHighLabel.colorSubItemName1 ? outerReviewHighLabel.colorSubItemName1 : '' }</TableCell>
                                                </TableRow>
                                            <TableRow>
                                                <TableCell align="center">소매길이</TableCell>
                                                <TableCell align="center">{outerReviewHighLabel.sleeveLengthItemName1}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                    </TabPanel>

                                        <TabPanel>
                                            <TableContainer >

                                                <Table className={classes.table} aria-label="simple table" tabIndex={this.state.tabIndex}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center">항목</TableCell>
                                                            <TableCell align="center">레이블링</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="center">색상</TableCell>
                                                            <TableCell align="center">메인 : {topReviewHighLabel.colorItemName2} 서브 : {topReviewHighLabel.colorSubItemName2 ? topReviewHighLabel.colorSubItemName2 : ''}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="center">소매길이</TableCell>
                                                            <TableCell align="center">{topReviewHighLabel.sleeveLengthItemName2}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </TabPanel>
                                        <TabPanel>
                                            <TableContainer>

                                                <Table className={classes.table} aria-label="simple table" tabIndex={this.state.tabIndex}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center">항목</TableCell>
                                                            <TableCell align="center">레이블링</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="center">색상</TableCell>
                                                            <TableCell align="center">메인 : {pantsReviewHighLabel.colorItemName3} 서브 : {pantsReviewHighLabel.colorSubItemName3 ? pantsReviewHighLabel.colorSubItemName3 : '' }</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

                                        </TabPanel>
                                        <TabPanel>
                                            <TableContainer>

                                                <Table className={classes.table} aria-label="simple table" tabIndex={this.state.tabIndex}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center">항목</TableCell>
                                                            <TableCell align="center">레이블링</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="center">색상</TableCell>
                                                            <TableCell align="center">메인 : {onePieceReviewHighLabel.colorItemName4} 서브 : {onePieceReviewHighLabel.colorSubItemName4 ? onePieceReviewHighLabel.colorSubItemName4 : ''}</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="center">소매길이</TableCell>
                                                            <TableCell align="center">{onePieceReviewHighLabel.sleeveLengthItemName4}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

                                        </TabPanel>
                                    </Tabs>
                                    </TabPanel>

                        <TabPanel>
                            <MaterialTable
                                icons={tableIcons
                                }
                                columns={this.state.columns}
                                data={!!this.props.checkHighLabelStore.inspectionHighList ?
                                    inspectionHighList.map((item) => {
                                        return {
                                            workNo: item.workNo,
                                            fileName: item.fileName,
                                            workName: item.workName,
                                            createdDatetime: item.createdDatetime,
                                        }
                                    }) : []}
                                title="이미지 리스트"
                                options={{
                                    sorting: false,
                                    search: true,
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
                                        icon: CheckIcon,
                                        tooltip: 'Select Image',
                                        onClick: (event, rowData) => this.handleClick(rowData.workNo, "/api/v1/kfashion/img/getByteImage?workNo="+rowData.workNo)
                                    },

                                    // {
                                    //     icon: Clear,
                                    //     tooltip: 'return',
                                    //     onClick: (event, rowData) => this.props.checkHighLabelStore.msgDialogOpen(true)
                                    // }
                                ]}
                            />
                        </TabPanel>
                                </Tabs>
                            </div>
                        </Grid>
                    </Grid>
                </div>


            </Container>
        );
    }
};
export default withSnackbar(withRouter(withStyles(styles) (HighCheckList)));