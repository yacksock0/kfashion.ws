import React, {forwardRef} from "react";
import MaterialTable from 'material-table';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import CheckIcon from '@material-ui/icons/Check';
import {Container, Grid, Typography} from "@material-ui/core";
import 'react-tabs/style/react-tabs.css';
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
import {toJS} from "mobx";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import ErrorIcon from "@material-ui/icons/Error";
import TablePagination from "@material-ui/core/TablePagination";
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

@inject('authStore','imageStore', 'checkHighLabelStore', 'currentStepStore','workStore','professionalLabelStore', 'polygonStore', 'messageStore')
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
            colorItemMemo1: '',
            colorItemMemo2: '',
            colorItemMemo3: '',
            colorItemMemo4: '',

            subColor1 : '',
            subColor2 : '',
            subColor3 : '',
            subColor4 : '',
            subColorCategoryNo1 : '',
            subColorCategoryNo2 : '',
            subColorCategoryNo3 : '',
            subColorCategoryNo4 : '',
            subColorSubItemName1 : '',
            subColorSubItemName2 : '',
            subColorSubItemName3 : '',
            subColorSubItemName4 : '',
            subColorSubItemMemo1 : '',
            subColorSubItemMemo2 : '',
            subColorSubItemMemo3 : '',
            subColorSubItemMemo4 : '',

            sleeveLength1 : '',
            sleeveLength2 : '',
            sleeveLength4 : '',
            sleeveLengthCategoryNo1 : '',
            sleeveLengthCategoryNo2 : '',
            sleeveLengthCategoryNo4 : '',
            sleeveLengthItemName1 : '',
            sleeveLengthItemName2 : '',
            sleeveLengthItemName4 : '',

            workNo : '',
            workStep : 4,
            labelNo1 : 0,
            labelNo2 : 0,
            labelNo3 : 0,
            labelNo4 : 0,

            polyInfo : [],

            tabIndex1: 1,
            tabIndex2:0,
            createdId: '',
            imgData:'',
            count: 0,
            data: [],
            canvasWidth : 0,
            canvasHeight : 0,
            page: 0,
            pageSize: 5,
        }
    }

    componentWillUnmount() {
        this.props.imageStore.initStore();
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas('c');
        this.props.currentStepStore.setStep(4);
        const id = this.props.authStore.loginUser.id;
        this.setState({createdId : id});
        this.props.messageStore.pageResetAll();
        this.props.messageStore.LoadInspectionHighList1();
        this.props.checkHighLabelStore.selectedItemReset();
        this.props.enqueueSnackbar("고등학생 검수", {
            variant: 'success',
            anchorOrigin:{
                vertical: 'bottom',
                horizontal: 'left',
            }
        });
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelWorkNo(this.props.imageStore.isWorkNo);
    }

    handleClick=(workNo, imgData)=>{
        this.deleteAll();
        this.canvas.setWidth(0);
        this.canvas.setHeight(0);
        this.props.checkHighLabelStore.changeNewBasicLabelWorkNo(workNo);
        this.props.checkHighLabelStore.LoadReviewHighLabelList(workNo);
        this.props.polygonStore.changeNewPolygonLocationWorkNo(workNo);
        this.onImgLoad(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`);
        this.props.polygonStore.LoadPolygonLocation(workNo, this.handleClickCallback);
    }

    handleClickCallback= (polyInfo, workNo)=>{
        const polyNo = polyInfo[0]-1;
        this.onSelectTab1(polyNo);
        this.setState({ polyInfo : polyInfo, workNo : workNo,
            tabIndex1 : 0, tabIndex2 : polyNo});
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${this.state.workNo}`, this.canvas.renderAll.bind(this.canvas), {
            width: this.canvas.width,
            height: this.canvas.height,
            originX: 'left',
            originY: 'top'
        });
    }

    onImgLoad = (img) => {
        const image = new Image();
        image.src = img;
        image.onload = this.handleImageLoaded;
    };

    handleImageLoaded = (e) => {
        // alert(e.target.width +"+"+ e.target.height);
        this.setState({
            canvasWidth: e.target.width,
            canvasHeight: e.target.height
        });
        this.canvas.setWidth(this.state.canvasWidth)
        this.canvas.setHeight(this.state.canvasHeight)
    }



    onSelectTab(tabIndex1) {
        if(this.state.workNo !== 0) {
            this.setState({tabIndex1:tabIndex1})
            if (tabIndex1 === 0) {
                this.props.checkHighLabelStore.changeNewBasicLabelWorkNo(this.state.workNo);
            } else {
                this.setState({
                    workNo: 0,
                })
                this.canvas.backgroundImage = 0;
                this.canvas.setWidth(0);
                this.canvas.setHeight(0);
                this.canvas.renderAll();
                this.deleteAll();
                this.props.checkHighLabelStore.selectedItemReset();
                this.props.checkHighLabelStore.changeNewBasicLabelWorkNo(0);
            }
        }else {
            alert("이미지 리스트 탭에서 작업할 이미지를 선택해주세요.");
        }

    }
    onSelectTab1(tabIndex2){
        let polyNo = tabIndex2+1;
        const {locationPolygonList} = this.props.polygonStore;
        const selectedPoly = (toJS(locationPolygonList).filter(poly => poly.polyNo === polyNo));

        if (selectedPoly.length !== 0) {
            this.deleteAll();
            for (let i = 0; i < selectedPoly.length; i++) {
                this.lineTwoPoint = [this.x, this.y, selectedPoly[i].locationX, selectedPoly[i].locationY];
                this.x = selectedPoly[i].locationX;
                this.y = selectedPoly[i].locationY;

                if (i != 0) {
                    let x1 = this.lineTwoPoint[0];
                    let x2 = this.lineTwoPoint[2];
                    let x3 = 0;
                    let y1 = this.lineTwoPoint[1];
                    let y2 = this.lineTwoPoint[3];
                    let y3 = 0;
                    if (x2 < x1) {
                        x3 = x1;
                        x1 = x2;
                        x2 = x3;
                    }
                    if (y2 < y1) {
                        y3 = y1;
                        y1 = y2;
                        y2 = y3;
                    }
                    let polyline = new fabric.Line(
                        [this.lineTwoPoint[0],
                            this.lineTwoPoint[1],
                            this.lineTwoPoint[2],
                            this.lineTwoPoint[3]], {
                            id: this.lineCounter,
                            type: 'line',
                            fill: 'red',
                            stroke: 'red',
                            strokeWidth: 5,
                            padding: 1,
                            selectable: false,
                            evented: false,
                            left: x1,
                            top: y1,
                        });
                    this.canvas.add(polyline);
                    this.canvas.sendToBack(polyline);
                }
            }
            let x1 = selectedPoly[selectedPoly.length - 1].locationX;
            let x2 = selectedPoly[0].locationX;
            let x3 = 0;
            let y1 = selectedPoly[selectedPoly.length - 1].locationY;
            let y2 = selectedPoly[0].locationY;
            let y3 = 0;
            this.lineTwoPoint = [x1, y1, x2, y2];
            if (x2 < x1) {
                x3 = x1;
                x1 = x2;
                x2 = x3;
            }
            if (y2 < y1) {
                y3 = y1;
                y1 = y2;
                y2 = y3;
            }
            let polyline = new fabric.Line(
                [this.lineTwoPoint[0],
                    this.lineTwoPoint[1],
                    this.lineTwoPoint[2],
                    this.lineTwoPoint[3]], {
                    id: this.lineCounter,
                    type: 'line',
                    fill: 'red',
                    stroke: 'red',
                    strokeWidth: 5,
                    padding: 1,
                    selectable: false,
                    evented: false,
                    left: x1,
                    top: y1,
                });
            this.canvas.add(polyline);
            this.canvas.sendToBack(polyline);

            this.setState({
                tabIndex2: tabIndex2,
            })
        }  else {
            alert("poly정보가 존재하지 않습니다.")
        }
    }
    deleteAll = () =>{
        let objList = [];
        this.canvas.getObjects().forEach(function (o) {
            objList.push(o);
        })
        for (let i = 0; i <= objList.length; i++) {
            this.canvas.remove(objList[i]);
        }
    }
    handleSubmit(){
        this.canvas.backgroundImage = 0;
        this.canvas.renderAll();
        this.deleteAll();
        this.canvas.setWidth(0);
        this.canvas.setHeight(0);
        this.props.checkHighLabelStore.selectedItemReset();
        this.setState({
            tabIndex1:1
        })
    }

    handleChangePagingPage = (event,page) => {
        this.setState({
            selected : [],
        })
        this.props.messageStore.changePage(page);
        this.props.messageStore.LoadInspectionHighList1();
        this.props.checkHighLabelStore.selectedItemReset();

    }

    handleChangePagingRowsPerPage = (event) => {
        this.setState({
            pageSize : event,
        })
        this.props.messageStore.changePageSize(event);
        this.props.messageStore.LoadInspectionHighList1();
        this.props.checkHighLabelStore.selectedItemReset();
    }

    handleSearchChange = (event) =>{
        this.props.messageStore.changeKeyword(event);
        this.props.messageStore.LoadInspectionHighList1();
        this.props.checkHighLabelStore.selectedItemReset();
    }

    allToggle = () => {
        const checkList = toJS(this.props.messageStore.inspectionHighList);
        const selected = toJS(this.props.checkHighLabelStore.selectedItem);
        if(selected.length > 0 && checkList.length > selected.length)
            for(let i=0; i < selected.length; i++) {
                const idx = checkList.findIndex(function(item,index) {return item.workNo === selected[i]})
                if (idx > -1) checkList.splice(idx, 1)
            }
        checkList.map((item, index) => {
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

    handleRowClick = (event, rowData) => {
        this.toggle(rowData.workNo);
    };

    render() {
        setTimeout(() => document.body.style.zoom = "100%", 100);
        const {inspectionHighList} = this.props.messageStore;
        const {classes} = this.props;
        const {outerReviewHighLabel, topReviewHighLabel, pantsReviewHighLabel, onePieceReviewHighLabel} =this.props.checkHighLabelStore;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Grid container>
                        <Grid item xs={12} lg={5} xl={5} style={{marginTop:10}}>
                            <div style={{overflow:'auto', width: 800,height: 800, zoom : "80%"}}>
                                <canvas id="c" width={this.state.canvasWidth} height={this.state.canvasHeight}>  </canvas>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={6} xl={6} style={{marginLeft:'auto'}}>
                            <div component={Paper}>
                                <Tabs selectedIndex={this.state.tabIndex1} onSelect={tabIndex1 => this.onSelectTab(tabIndex1)}>
                                    <TabList >
                                        <Tab tabIndex={0} style={{width: '50%', height:50,textAlign:'center'}}><h3>레이블링</h3></Tab>
                                        <Tab tabIndex={1} style={{width: '50%', height:50,textAlign:'center'}}><h3>이미지 리스트</h3></Tab>
                                    </TabList>

                                    <TabPanel>
                                    <Tabs selectedIndex={this.state.tabIndex2} onSelect={tabIndex2 => this.onSelectTab1(tabIndex2)}>
                                        <TabList >
                                            <Tab  style={{width: '25%', height:60,textAlign:'center'}}
                                                  disabled={"" == this.state.polyInfo.filter((poly=> poly == 1))}
                                            ><h3>아우터</h3></Tab>
                                            <Tab  style={{width: '25%', height:60,textAlign:'center'}}
                                                  disabled={"" == this.state.polyInfo.filter((poly=> poly == 2))}
                                            ><h3>상의</h3></Tab>
                                            <Tab  style={{width: '25%', height:60,textAlign:'center'}}
                                                  disabled={"" == this.state.polyInfo.filter((poly=> poly == 3))}
                                            ><h3>하의</h3></Tab>
                                            <Tab  style={{width: '25%', height:60,textAlign:'center'}}
                                                  disabled={"" == this.state.polyInfo.filter((poly=> poly == 4))}
                                            ><h3>원피스</h3></Tab>
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
                                                    <TableCell align="center">
                                                        메인 {outerReviewHighLabel.colorItemName1 ?
                                                            <Chip style={{marginRight : 10, backgroundColor: outerReviewHighLabel.colorItemMemo1,
                                                                ...( outerReviewHighLabel.colorItemMemo1 === '#FFFFFF' ? {color:'#000000'} : {color: '#FFFFFF'}),
                                                                fontWeight: 'bold'}}
                                                                  variant="outlined"
                                                                  label={outerReviewHighLabel.colorItemName1}
                                                            /> : ''}
                                                        서브 {outerReviewHighLabel.subColorItemName1 ?
                                                            <Chip style={{marginRight : 10,backgroundColor: outerReviewHighLabel.subColorItemMemo1,
                                                                ...( outerReviewHighLabel.subColorItemMemo1 === '#FFFFFF' ? {color:'#000000'} : {color: '#FFFFFF'}),
                                                                fontWeight: 'bold'}}
                                                                  variant="outlined"
                                                                  label={outerReviewHighLabel.subColorItemName1}
                                                            /> : ''}
                                                    </TableCell>
                                                </TableRow>
                                            <TableRow>
                                                <TableCell align="center">소매길이</TableCell>
                                                <TableCell align="center">
                                                    {outerReviewHighLabel.sleeveLengthItemName1 ?
                                                        <Chip style={{marginRight : 10}}
                                                              variant="outlined"
                                                              label={outerReviewHighLabel.sleeveLengthItemName1}
                                                    /> : ''}
                                                </TableCell>
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
                                                            <TableCell align="center">
                                                                메인 {topReviewHighLabel.colorItemName2 ?
                                                                <Chip style={{marginRight : 10, backgroundColor: topReviewHighLabel.colorItemMemo2,
                                                                    ...( topReviewHighLabel.colorItemMemo2 === '#FFFFFF' ? {color:'#000000'} : {color: '#FFFFFF'}),
                                                                    fontWeight: 'bold'}}
                                                                      variant="outlined"
                                                                      label={topReviewHighLabel.colorItemName2}
                                                                /> : ''}
                                                                서브 {topReviewHighLabel.subColorItemName2 ?
                                                                <Chip style={{marginRight : 10,backgroundColor: topReviewHighLabel.subColorItemMemo2,
                                                                    ...( topReviewHighLabel.subColorItemMemo2 === '#FFFFFF' ? {color:'#000000'} : {color: '#FFFFFF'}),
                                                                    fontWeight: 'bold'}}
                                                                      variant="outlined"
                                                                      label={topReviewHighLabel.subColorItemName2}
                                                                /> : ''}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="center">소매길이</TableCell>
                                                            <TableCell align="center">
                                                                {topReviewHighLabel.sleeveLengthItemName2 ?
                                                                    <Chip style={{marginRight : 10}}
                                                                          variant="outlined"
                                                                          label={topReviewHighLabel.sleeveLengthItemName2}
                                                                    /> : ''}
                                                            </TableCell>
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
                                                            <TableCell align="center">
                                                                메인 {pantsReviewHighLabel.colorItemName3 ?
                                                                <Chip style={{marginRight : 10, backgroundColor: pantsReviewHighLabel.colorItemMemo3,
                                                                    ...( pantsReviewHighLabel.colorItemMemo3 === '#FFFFFF' ? {color:'#000000'} : {color: '#FFFFFF'}),
                                                                    fontWeight: 'bold'}}
                                                                      variant="outlined"
                                                                      label={pantsReviewHighLabel.colorItemName3}
                                                                /> : ''}
                                                                서브 {pantsReviewHighLabel.subColorItemName3 ?
                                                                <Chip style={{marginRight : 10,backgroundColor: pantsReviewHighLabel.subColorItemMemo3,
                                                                    ...( pantsReviewHighLabel.subColorItemMemo3 === '#FFFFFF' ? {color:'#000000'} : {color: '#FFFFFF'}),
                                                                    fontWeight: 'bold'}}
                                                                      variant="outlined"
                                                                      label={pantsReviewHighLabel.subColorItemName3}
                                                                /> : ''}
                                                            </TableCell>
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
                                                            <TableCell align="center">
                                                                메인 {onePieceReviewHighLabel.colorItemName4 ?
                                                                <Chip style={{marginRight : 10, backgroundColor: onePieceReviewHighLabel.colorItemMemo4,
                                                                    ...( onePieceReviewHighLabel.colorItemMemo4 === '#FFFFFF' ? {color:'#000000'} : {color: '#FFFFFF'}),
                                                                    fontWeight: 'bold'}}
                                                                      variant="outlined"
                                                                      label={onePieceReviewHighLabel.colorItemName4}
                                                                /> : ''}
                                                                서브 {onePieceReviewHighLabel.subColorItemName4 ?
                                                                <Chip style={{marginRight : 10,backgroundColor: onePieceReviewHighLabel.subColorItemMemo4,
                                                                    ...( onePieceReviewHighLabel.subColorItemMemo4 === '#FFFFFF' ? {color:'#000000'} : {color: '#FFFFFF'}),
                                                                    fontWeight: 'bold'}}
                                                                      variant="outlined"
                                                                      label={onePieceReviewHighLabel.subColorItemName4}
                                                                /> : ''}
                                                            </TableCell>
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
                                columns={[
                                    {title: <Checkbox onClick={this.allToggle.bind(this)} variant="outlined"
                                                      checked={this.props.checkHighLabelStore.selectedItem.length ===
                                                      this.props.messageStore.inspectionHighList.length ? true : false}>
                                        </Checkbox>,
                                        render : rowData => <Checkbox checked={this.props.checkHighLabelStore.selectedItem.includes(rowData.workNo)}></Checkbox>},
                                    {title: '번호', field: 'workNo',type: 'button', filterPlaceholder: 'GroupNo filter', tooltip: 'workNo로 정렬'},
                                    {title: '사진', field: 'fileName',type: 'Image', render : rowData => <img src={rowData.fileName} style={{width: 80, height:80, borderRadius:15}}/> },
                                    {title: '이름', field: 'workName',type: 'button', filterPlaceholder: 'GroupNo filter',},
                                    {title: '등록자', field: 'createdId', type: 'text', initialEditValue: 'test', tooltip: 'This is tooltip text'},
                                    {title: '생성일', field: 'createdDatetime', type: 'date'},
                                ]}
                                data={
                                    inspectionHighList.map((item) => {
                                        return {
                                            workNo: item.workNo,
                                            fileName: item.fileName,
                                            workName: item.workName,
                                            createdId : item.createdId,
                                            createdDatetime: item.createdDatetime,
                                        }
                                    })}
                                title="이미지 리스트"
                                options={{
                                    sorting: false,
                                    search: true,
                                    actionsColumnIndex: -1,
                                    headerStyle: {
                                        backgroundColor: '#E2E2E2',
                                        color: '#000000',
                                        textAlign:'center',
                                    },
                                    cellStyle: {
                                        textAlign: 'center'
                                    },
                                    pageSize : this.props.messageStore.pageSize,
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
                                            count={this.props.messageStore.totalCount}
                                            rowsPerPage={this.props.messageStore.pageSize}
                                            page={this.props.messageStore.page}
                                            onChangePage={this.handleChangePagingPage}
                                        />
                                    )
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
                <hr></hr>
                <ReturnMsg onClick={()=> this.handleSubmit()}/><br></br><br></br>
                {this.props.authStore.loginUser.authorityNo !== 4? (
                <Typography variant="h6" component="h4" style={{display:'inline'}}>
                    <p><ErrorIcon/> 우측 상단에 검수할 확인 할 이미지 선택</p>
                    <p><ErrorIcon/> 작업한 폴리곤 좌표 및 레이블링 확인 </p>
                    <p><ErrorIcon/> 확인 후 수정 사항 있으면 반송 버튼을 선택</p>
                    <p><ErrorIcon/> 반송 시 수정 사항 있는 부분 체크 후 반송 사유 작성 후 확인</p>
                    <p><ErrorIcon/> 체크 박스 활용하여 일괄적으로 완료 가능 합니다 ( 반송은 체크박스 활용 불가능합니다 )</p>
                </Typography>
                    ) : ''}
            </Container>
        );
    }
};
export default withSnackbar(withRouter(withStyles(styles) (HighCheckList)));