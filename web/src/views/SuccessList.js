import React from "react";
import MaterialTable from 'material-table';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import CheckIcon from '@material-ui/icons/Check';
import {Button, Container, Grid} from "@material-ui/core";
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
import {toJS} from "mobx";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import TablePagination from "@material-ui/core/TablePagination";
import Moment from "react-moment";

const styles = theme => ({   root: {
    [theme.breakpoints.up('xl')]: {
        width: "80%",
    },
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
},
    table: {
        minWidth: 500,
    },
    mainContainer: {
        [theme.breakpoints.up('xl')]: {
            maxWidth:'80%',
        },
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
    canvas:{
        [theme.breakpoints.up('xl')]: {
            zoom : "100%",
        },
        overflow:'auto',
        width: 800,
        height: 800,
        zoom : "80%",
        marginLeft:'auto'
    },
    tabliststyle:{
        padding:0,
        "& .react-tabs__tab--selected":{
            height:59,
            border:'none',
            background:'#000',
            color:'#fff'
        },
    },
    btnstyle:{
        width: '20%',
        height:60,
        textAlign:'center',
        listStyle: 'none',
        display: 'inline-block',
        border: '1px solid #e2e2e2',
        borderRadius:0,
        bottom: '-1px',
        position: 'relative',
        padding: '6px 12px',
        cursor:'pointer',
        background:'#fff',
    },
    tabletxt:{
        width:'50%',
        fontFamily: 'NotoSansCJKkr',
        fontSize: '15px',
        fontWeight: '500',
        color:'#7d7d7d',
    },
});

@inject('professionalLabelStore','authStore', 'imageStore', 'currentStepStore','workStore', 'polygonStore','checkHighLabelStore')
@observer
class SuccessList extends React.Component {
    constructor(props) {
        super(...arguments , props);
        this.state = {
            page: 0,
            pageSize: 5,
            selected: [],
            open:'',
            styleItemName :'',
            styleSubItemName : '',
            categoryItemName : '',
            detailItemName : '',
            printItemName : '',
            textureItemName : '' ,
            clothLengthItemName : '',
            neckLineItemName : '',
            karaItemName : '',
            fitItemName : '',
            // tabIndex1:1,
            tabIndex1:0,
            tabIndex2: 0,
            createdId: '',
            successCheckId : '',
            boundaryList: [],
            canvasWidth:0,
            canvasHeight:0,
            imgData:'',
            count: 0,
            workNo : 0,
            data: [],
            selectedIdList : [],
            selectedId : '',
            selectedReturn : true,
            checkBoxListLength : -1,
            tableSize : 6,
            imgtext: "선택한 이미지가 없습니다."

        }
        this.handleClickMsgOpen = this.handleClickMsgOpen.bind(this)
    }

    allToggle = () => {
        const checkList = toJS(this.props.professionalLabelStore.successList);
        const checkBoxList = []
        // const id = this.props.authStore.loginUser.id;
        checkList.map((item) => {
            return checkBoxList.push(item);
        })
        if (checkBoxList === null || checkBoxList.length === 0) {
            this.setState({
                checkBoxListLength : -1,
            })
        } else {
            this.setState({
                checkBoxListLength: checkBoxList.length,
            })
            const selected = toJS(this.props.professionalLabelStore.selectedItem);
            if (selected.length > 0 && checkBoxList.length > selected.length) {
                for (let i = 0; i < selected.length; i++) {
                    const idx = checkBoxList.findIndex(function (item, index) {
                        return item.workNo === selected[i]
                    })
                    if (idx > -1) checkBoxList.splice(idx, 1)
                }
            }
            checkBoxList.map((item) => {
                return this.toggle(item.workNo);
            })
        }
    }

    toggle = (workNo,createdId) => {
        const selected = toJS(this.props.professionalLabelStore.selectedItem);
        if (selected.includes(workNo)){
            selected.splice(selected.indexOf(workNo), 1);
        }
        else{
            selected.push(workNo);
        }
        this.props.professionalLabelStore.changeSelectedItem(selected);
    };

    handleChangePagingPage = (event,page) => {
        this.setState({
            page : page,
            selected : [],
        })
        this.props.professionalLabelStore.changeSuccessPage(page)
        this.props.professionalLabelStore.LoadSuccessList();
        this.props.professionalLabelStore.selectedItemReset();
    }

    handleChangePagingRowsPerPage = (event) => {
        this.setState({
            pageSize : event,
        })
        this.props.professionalLabelStore.changeSuccessPageSize(event)
        this.props.professionalLabelStore.LoadSuccessList();
        this.props.professionalLabelStore.selectedItemReset();
    }
    handleSearchChange = (keyword) => {
        this.props.professionalLabelStore.changeSuccessKeyword(keyword);
        this.props.professionalLabelStore.LoadSuccessList();
        this.props.professionalLabelStore.selectedItemReset();
    }

    componentWillUnmount() {
        this.props.imageStore.initStore();
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas('c');
        this.props.currentStepStore.setStep(4);
        const id = this.props.authStore.loginUser.id;
        this.props.professionalLabelStore.LoadSuccessList();
        this.props.professionalLabelStore.selectedItemReset();
        this.setState({createdId : id});
        this.props.enqueueSnackbar("검수", {
            variant: 'success',
            anchorOrigin:{
                vertical: 'bottom',
                horizontal: 'left',
            }
        });
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })
    }

    handleClickMsgOpen(workNo){
        this.setState({open:true,})
    }
    handleClick=(workNo, createdId ,imgData)=>{
        this.setState({
            successCheckId : createdId,
        })
        this.props.professionalLabelStore.cleanLabel();
        this.props.professionalLabelStore.changeNewProfessionalLabelWorkNo(workNo);
        this.onImgLoad(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`);
        this.props.checkHighLabelStore.changeNewBasicLabelWorkNo(workNo);
        this.props.checkHighLabelStore.LoadReviewHighLabelList(workNo);
        this.props.professionalLabelStore.LoadLabelList(workNo);
        this.props.workStore.LoadReviewLabelList(workNo);
        this.deleteAll();
        this.props.imageStore.changeWorkNo(workNo);
        this.props.polygonStore.changeNewPolygonLocationWorkNo(workNo);
        this.props.polygonStore.LoadPolygonLocation(workNo, this.handleClickCallback);
        this.setState({imgtext: "",});
    }
    handleClickCallback= (polyInfo, workNo)=>{
        this.setState({ polyInfo : polyInfo, workNo : workNo});
        // this.setState({tabIndex1 : 0, tabIndex2 : 0});
        this.setState({tabIndex1 : 1, tabIndex2 : 0});
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${this.state.workNo}`
            , this.canvas.renderAll.bind(this.canvas),{
                width: this.canvas.width,
                height: this.canvas.height,
                originX: 'left',
                originY: 'top',
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

    handleComplete = () => {
        const basicComplateConfirm = window.confirm("검수를 완료 하시겠습니까?");
        if (basicComplateConfirm) {
            const workNo = this.props.polygonStore.NewPolygonLocation.workNo;
            const createdId = this.props.authStore.loginUser.id;
            const selected = toJS(this.props.professionalLabelStore.selectedItem);
            if(selected.length > 0 && selected !== null) {
                this.props.professionalLabelStore.ProfessionalSelectedCompleteUp(selected,createdId);
            }
            else {
                this.props.professionalLabelStore.ProfessionalCompleteUp(workNo, createdId);
            }
            this.setState({
                open: false,
                // tabIndex1 : 1,
                tabIndex1 : 0,
                checkBoxListLength: -1,
                selectedId : '',
            });
            this.canvas.backgroundImage = 0;
            this.canvas.setWidth(0);
            this.canvas.setHeight(0);
            this.canvas.renderAll();
            this.deleteAll();
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
    handleJson = () =>{
        const jsonComplateConfirm = window.confirm("json파일을 가지고 오시겠습니까?");
        if (jsonComplateConfirm) {
            const workNo = this.props.polygonStore.NewPolygonLocation.workNo;
            this.props.professionalLabelStore.JsonCompleteUp(workNo);
            this.setState({
                open: false,
                // tabIndex1 : 1,
                tabIndex1 : 0,
            });
            this.canvas.backgroundImage = 0;
            this.canvas.setWidth(0);
            this.canvas.setHeight(0);
            this.canvas.renderAll();
            this.deleteAll();
        }
    }

    onSelectTab2(tabIndex) {
        let polyNo = tabIndex  ;
        const {locationPolygonList} = this.props.polygonStore;
        const selectedPoly = (toJS(locationPolygonList).filter(poly => poly.polyNo === polyNo));
        if (selectedPoly.length !== 0) {
            this.deleteAll();
            for(let i = 0 ; i <selectedPoly.length; i++) {
                this.lineTwoPoint = [this.x, this.y, selectedPoly[i].locationX, selectedPoly[i].locationY];
                this.x = selectedPoly[i].locationX;
                this.y = selectedPoly[i].locationY;

                if(i !==0) {
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
            let x1 = selectedPoly[selectedPoly.length-1].locationX;
            let x2 = selectedPoly[0].locationX;
            let x3 = 0;
            let y1 = selectedPoly[selectedPoly.length-1].locationY;
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
                tabIndex2: tabIndex,
            })
        }else{
            this.deleteAll();
            this.setState({
                tabIndex2: tabIndex,
            });
        }
    }

    handleClickReturn=(workNo)=>{
        this.props.professionalLabelStore.cleanLabel();
        this.props.professionalLabelStore.LoadLabelList(workNo);
        this.props.professionalLabelStore.changeNewProfessionalLabelWorkNo(workNo);
        this.props.imageStore.changeWorkNo(workNo);
        this.props.polygonStore.changeNewPolygonLocationWorkNo(workNo);
        this.props.polygonStore.LoadPolygonLocation(workNo);
        this.props.history.push("/Step2/ModifyStep3");
    }

    onSelectTab1(tabIndex) {
        if (this.state.workNo !== 0) {
            // if(tabIndex === 1) {
            if(tabIndex === 0) {
                this.setState({
                    selected : [],
                    workNo : 0,
                    successCheckId : '',
                })
                this.canvas.backgroundImage = 0;
                this.canvas.setWidth(0);
                this.canvas.setHeight(0);
                this.canvas.renderAll();
                this.deleteAll();
                this.props.professionalLabelStore.selectedItemReset();
            }
            this.setState({
                tabIndex1: tabIndex,
            });
        }else{
            alert("이미지 리스트 탭에서 작업할 이미지를 선택해주세요.");
        }
        this.setState({imgtext: "선택한 이미지가 없습니다.",});
    }

    handleRowClick = (event, rowData) => {
        const checkList = toJS(this.props.professionalLabelStore.successList);
        const checkBoxList = []
        checkList.map((item) => {
            return checkBoxList.push(item);
        })
        if (checkBoxList === null || checkBoxList.length === 0) {
            this.setState({
                checkBoxListLength: -1,
            })
        } else {
            this.setState({
                checkBoxListLength: checkBoxList.length,
            })
                this.toggle(rowData.workNo);
        }
    }
    render() {
        // const handleClickMsgOpen = () => {
        //     this.setState({open:true,})
        // };
        setTimeout(() => document.body.style.zoom = "100%", 100);

        const {classes} = this.props;
        const {outerReviewLabel, topReviewLabel, pantsReviewLabel, onePieceReviewLabel, styleReviewLabel} =this.props.professionalLabelStore;
        const {outerReviewHighLabel, topReviewHighLabel, pantsReviewHighLabel, onePieceReviewHighLabel} =this.props.checkHighLabelStore;
        // const detail1 = outerReviewLabel.detailItemName1;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Grid container>
                        <Grid item xs={12} lg={5} xl={5} style={{marginTop:10}}>
                            <div className={classes.canvas} style={{display:"table"}}>
                                <div style={{width:'800px',height:'650px',background:'#e2e2e2',textAlign:'center',fontSize:'17px',display:'table-cell',verticalAlign:'middle'}}>{this.state.imgtext} </div>
                                <canvas id="c" width={this.state.canvasWidth} height={this.state.canvasHeight}>  </canvas>
                            </div>
                        </Grid>
                        <Grid item xs={12} lg={this.state.tableSize} xl={this.state.tableSize} style={{marginLeft:'auto'}}>
                            <div component={Paper}>
                                <Tabs selectedIndex={this.state.tabIndex1} onSelect={tabIndex1 => this.onSelectTab1(tabIndex1)}>
                                    <TabList >
                                        {/* <Tab tabIndex={0} style={{width: '50%', height:50,textAlign:'center'}}><h3>레이블링</h3></Tab>
                                        <Tab tabIndex={1} style={{width: '50%', height:50,textAlign:'center'}}><h3>이미지 리스트</h3></Tab> */}
                                        <Tab tabIndex={0} style={{width: '50%', height:50,textAlign:'center',borderRadius:0}}><h3 style={{fontFamily:'NotoSansCJKkr',fontSize:'19px',marginTop:7}}>이미지 리스트</h3></Tab>
                                        <Tab tabIndex={1} style={{width: '50%', height:50,textAlign:'center',borderRadius:0}}><h3 style={{fontFamily:'NotoSansCJKkr',fontSize:'19px',marginTop:7}}>레이블링</h3></Tab>
                                        
                                    </TabList>
                                    <TabPanel>
                                        <MaterialTable
                                            columns={[
                                                
                                                {title: '번호', field: 'workNo',type: 'number'},
                                                {title: '사진', field: 'fileName',type: 'string', render : rowData => <img alt={""} src={rowData.fileName} style={{width: 80, height:80, borderRadius:10}}/> },
                                                {title: '이름', field: 'workName',type: 'string', filterPlaceholder: 'GroupNo filter',},
                                                {title: '생성일', field: 'createdDatetime', type: 'date'},
                                                {title: '생성자', field: 'createdId', type: 'string'},
                                                {title: <Checkbox onClick={this.allToggle.bind(this)} variant="outlined"
                                                                  checked={this.props.professionalLabelStore.selectedItem.length === this.state.checkBoxListLength ? true : false} style={{color:'#ffffff'}}>
                                                    </Checkbox>,
                                                    render : rowData => <Checkbox key={this.props.professionalLabelStore.successList.workNo}
                                                                                  checked={this.props.professionalLabelStore.selectedItem.includes(rowData.workNo)} style={{color:'#000000'}}></Checkbox>},
                                            ]}
                                            data={!!this.props.professionalLabelStore.successList ?
                                                this.props.professionalLabelStore.successList.map((item) => {
                                                    return {
                                                        workNo: item.workNo,
                                                        fileName: item.fileName,
                                                        workName: item.workName,
                                                        createdDatetime: <Moment format="MM-DD">{item.createdDatetime}</Moment>,
                                                        createdId: item.createdId,
                                                    }
                                                }) : []}
                                            title=""
                                            options={{
                                                sorting:false,
                                                search: true,
                                                // actionsColumnIndex: -1,
                                                headerStyle: {
                                                    backgroundColor: '#000000',
                                                    color: '#ffffff',
                                                    textAlign:'center',
                                                    padding : 5,
                                                    fontFamily: 'NotoSansCJKkr',
                                                    fontSize:'15px',
                                                },
                                                cellStyle: {
                                                    textAlign: 'center',
                                                    padding : 3,
                                                    fontFamily: 'Roboto',
                                                    fontSize:'13px',
                                                },
                                                pageSize : this.props.professionalLabelStore.successPageSize,
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
                                                        count={this.props.professionalLabelStore.successTotalCount}
                                                        rowsPerPage={this.props.professionalLabelStore.successPageSize}
                                                        page={this.props.professionalLabelStore.successPage}
                                                        onChangePage={this.handleChangePagingPage}
                                                    />
                                                )
                                            }}
                                            localization={{header: { actions: <p style={{width:'80px'}}>선택</p> } }}
                                            actions={
                                                [
                                                    {
                                                        icon: CheckIcon,
                                                        tooltip: 'Select Image',
                                                        onClick: (event, rowData) => this.handleClick(rowData.workNo, rowData.createdId,"/api/v1/kfashion/img/getByteImage?workNo=" + rowData.workNo)
                                                    },
                                                ]
                                            }
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <Tabs selectedIndex={this.state.tabIndex2} onSelect={tabIndex2 => this.onSelectTab2(tabIndex2)} style={{boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.45)',background:'#fff',height:'500px'}}>
                                            <TabList className={classes.tabliststyle} >
                                                <Tab className={classes.btnstyle}><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>스타일</h3></Tab>
                                                <Tab className={classes.btnstyle}
                                                      disabled={this.props.professionalLabelStore.styleReviewLabel.labelNo1 === 1 ? false : true}><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>아우터</h3></Tab>
                                                <Tab className={classes.btnstyle}
                                                      disabled={this.props.professionalLabelStore.styleReviewLabel.labelNo2 === 2 ? false : true}><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>상의</h3></Tab>
                                                <Tab className={classes.btnstyle}
                                                      disabled={this.props.professionalLabelStore.styleReviewLabel.labelNo3 === 3 ? false : true}><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>하의</h3></Tab>
                                                <Tab className={classes.btnstyle}
                                                      disabled={this.props.professionalLabelStore.styleReviewLabel.labelNo4 === 4 ? false : true}><h3 style={{fontFamily: 'NotoSansCJKkr',fontSize: '15px',fontWeight: '500'}}>원피스</h3></Tab>
                                            </TabList>
                                            <TabPanel>
                                                <TableContainer>
                                                    <Table className={classes.table} aria-label="simple table" tabIndex={this.state.tabIndex}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>항목</TableCell>
                                                                <TableCell align="center" className={classes.tabletxt} style={{color:'#000'}}>레이블링</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>스타일</TableCell>
                                                                <TableCell align="center" style={{color:'#000',fontFamily: 'NotoSansCJKkr',fontSize:'15px'}}>메인 {styleReviewLabel.styleItemName ?
                                                                    <Chip style={{margin: '0 8px 0'}}
                                                                          variant="outlined"
                                                                          label={styleReviewLabel.styleItemName}
                                                                    /> : ''}
                                                                    서브  {styleReviewLabel.styleSubItemName ?
                                                                        <Chip style={{margin: '0 8px 0'}}
                                                                              variant="outlined"
                                                                              label={styleReviewLabel.styleSubItemName}
                                                                        /> : ''}</TableCell>
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
                                                                <TableCell align="center" className={classes.tabletxt}>항목</TableCell>
                                                                <TableCell align="center" className={classes.tabletxt} style={{color:'#000'}}>레이블링</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>색상</TableCell>
                                                                <TableCell align="center" style={{color:'#000',fontFamily: 'NotoSansCJKkr',fontSize:'15px'}}>
                                                                    메인 {outerReviewHighLabel.colorItemName1 ?
                                                                    <Chip style={{margin: '0 8px 0', backgroundColor: outerReviewHighLabel.colorItemMemo1,
                                                                        ...( outerReviewHighLabel.colorItemMemo1 === '#FFFFFF' ? {color:'#000000'} : {color: '#FFFFFF'}),
                                                                        fontWeight: 'bold'}}
                                                                          variant="outlined"
                                                                          label={outerReviewHighLabel.colorItemName1}
                                                                    /> : ''}
                                                                    서브 {outerReviewHighLabel.subColorItemName1 ?
                                                                    <Chip style={{margin: '0 8px 0',backgroundColor: outerReviewHighLabel.subColorItemMemo1,
                                                                        ...( outerReviewHighLabel.subColorItemMemo1 === '#FFFFFF' ? {color:'#000000'} : {color: '#FFFFFF'}),
                                                                        fontWeight: 'bold'}}
                                                                          variant="outlined"
                                                                          label={outerReviewHighLabel.subColorItemName1}
                                                                    /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>소매길이</TableCell>
                                                                <TableCell align="center">
                                                                    {outerReviewHighLabel.sleeveLengthItemName1 ?
                                                                        <Chip style={{margin: '0 4px 0'}}
                                                                              variant="outlined"
                                                                              label={outerReviewHighLabel.sleeveLengthItemName1}
                                                                        /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>카테고리</TableCell>
                                                                <TableCell align="center">
                                                                    {outerReviewLabel.categoryItemName1 ? <Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={outerReviewLabel.categoryItemName1}
                                                                    /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>디테일</TableCell>
                                                                <TableCell align="center"> {outerReviewLabel.detailItemName1 ? outerReviewLabel.detailItemName1.map((detail1) =>
                                                                    (detail1 ? <Chip style={{margin: '0 4px 0'}}
                                                                                     variant="outlined"
                                                                                     label={detail1}
                                                                    /> : '')
                                                                ) : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>프린트</TableCell>
                                                                <TableCell align="center">{outerReviewLabel.printItemName1 ? outerReviewLabel.printItemName1.map((print1) =>
                                                                    (print1 ? <Chip style={{margin: '0 4px 0'}}
                                                                                    variant="outlined"
                                                                                    label={print1}
                                                                    /> : '')
                                                                ) : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>소재</TableCell>
                                                                <TableCell align="center">{outerReviewLabel.textureItemName1 ? outerReviewLabel.textureItemName1.map((texture1)=>
                                                                    (texture1 ? <Chip style={{margin: '0 4px 0'}}
                                                                                      variant="outlined"
                                                                                      label={texture1}
                                                                    /> : '')
                                                                ) : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>기장</TableCell>
                                                                <TableCell align="center">
                                                                    {outerReviewLabel.clothLengthItemName1 ? <Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={outerReviewLabel.clothLengthItemName1}
                                                                    /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>넥라인</TableCell>
                                                                <TableCell align="center">
                                                                    {outerReviewLabel.neckLineItemName1 ? <Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined" 
                                                                        label={outerReviewLabel.neckLineItemName1}
                                                                    /> : '' }
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>칼라(카라)</TableCell>
                                                                <TableCell align="center">
                                                                    {outerReviewLabel.karaItemName1 ? <Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={outerReviewLabel.karaItemName1}
                                                                    /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>핏</TableCell>
                                                                <TableCell align="center">
                                                                    {outerReviewLabel.fitItemName1 ?<Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={outerReviewLabel.fitItemName1}
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
                                                                <TableCell align="center" className={classes.tabletxt}>항목</TableCell>
                                                                <TableCell align="center" className={classes.tabletxt} style={{color:'#000'}}>레이블링</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>색상</TableCell>
                                                                <TableCell align="center">
                                                                    메인 {topReviewHighLabel.colorItemName2 ?
                                                                    <Chip style={{margin: '0 8px 0', backgroundColor: topReviewHighLabel.colorItemMemo2,
                                                                        ...( topReviewHighLabel.colorItemMemo2 === '#FFFFFF' ? {color:'#000000'} : {color: '#FFFFFF'}),
                                                                        fontWeight: 'bold'}}
                                                                          variant="outlined"
                                                                          label={topReviewHighLabel.colorItemName2}
                                                                    /> : ''}
                                                                    서브 {topReviewHighLabel.subColorItemName2 ?
                                                                    <Chip style={{margin: '0 8px 0',backgroundColor: topReviewHighLabel.subColorItemMemo2,
                                                                        ...( topReviewHighLabel.subColorItemMemo2 === '#FFFFFF' ? {color:'#000000'} : {color: '#FFFFFF'}),
                                                                        fontWeight: 'bold'}}
                                                                          variant="outlined"
                                                                          label={topReviewHighLabel.subColorItemName2}
                                                                    /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>소매길이</TableCell>
                                                                <TableCell align="center">
                                                                    {topReviewHighLabel.sleeveLengthItemName2 ?
                                                                        <Chip style={{margin: '0 4px 0'}}
                                                                              variant="outlined"
                                                                              label={topReviewHighLabel.sleeveLengthItemName2}
                                                                        /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>카테고리</TableCell>
                                                                <TableCell align="center">
                                                                    {topReviewLabel.categoryItemName2 ? <Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={topReviewLabel.categoryItemName2}
                                                                    /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>디테일</TableCell>
                                                                <TableCell align="center"> {topReviewLabel.detailItemName2 ? topReviewLabel.detailItemName2.map((detail2) =>
                                                                    (detail2 ? <Chip style={{margin: '0 4px 0'}}
                                                                                     variant="outlined"
                                                                                     label={detail2}
                                                                    /> : '')
                                                                ) : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>프린트</TableCell>
                                                                <TableCell align="center">{topReviewLabel.printItemName2 ? topReviewLabel.printItemName2.map((print2) =>
                                                                    (print2 ? <Chip style={{margin: '0 4px 0'}}
                                                                                    variant="outlined"
                                                                                    label={print2}
                                                                    /> : '')
                                                                ) : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>소재</TableCell>
                                                                <TableCell align="center">{topReviewLabel.textureItemName2 ? topReviewLabel.textureItemName2.map((texture2)=>
                                                                    (texture2 ? <Chip style={{margin: '0 4px 0'}}
                                                                                      variant="outlined"
                                                                                      label={texture2}
                                                                    /> : '')
                                                                ) : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>기장</TableCell>
                                                                <TableCell align="center">
                                                                    {topReviewLabel.clothLengthItemName2 ? <Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={topReviewLabel.clothLengthItemName2}
                                                                    /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>넥라인</TableCell>
                                                                <TableCell align="center">
                                                                    {topReviewLabel.neckLineItemName2 ? <Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={topReviewLabel.neckLineItemName2}
                                                                    /> : '' }
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>칼라(카라)</TableCell>
                                                                <TableCell align="center">
                                                                    {topReviewLabel.karaItemName2 ? <Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={topReviewLabel.karaItemName2}
                                                                    /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>핏</TableCell>
                                                                <TableCell align="center">
                                                                    {topReviewLabel.fitItemName2 ?<Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={topReviewLabel.fitItemName2}
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
                                                                <TableCell align="center" className={classes.tabletxt}>항목</TableCell>
                                                                <TableCell align="center" className={classes.tabletxt} style={{color:'#000'}}>레이블링</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>색상</TableCell>
                                                                <TableCell align="center">
                                                                    메인 {pantsReviewHighLabel.colorItemName3 ?
                                                                    <Chip style={{margin: '0 8px 0', backgroundColor: pantsReviewHighLabel.colorItemMemo3,
                                                                        ...( pantsReviewHighLabel.colorItemMemo3 === '#FFFFFF' ? {color:'#000000'} : {color: '#FFFFFF'}),
                                                                        fontWeight: 'bold'}}
                                                                          variant="outlined"
                                                                          label={pantsReviewHighLabel.colorItemName3}
                                                                    /> : ''}
                                                                    서브 {pantsReviewHighLabel.subColorItemName3 ?
                                                                    <Chip style={{margin: '0 8px 0',backgroundColor: pantsReviewHighLabel.subColorItemMemo3,
                                                                        ...( pantsReviewHighLabel.subColorItemMemo3 === '#FFFFFF' ? {color:'#000000'} : {color: '#FFFFFF'}),
                                                                        fontWeight: 'bold'}}
                                                                          variant="outlined"
                                                                          label={pantsReviewHighLabel.subColorItemName3}
                                                                    /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>카테고리</TableCell>
                                                                <TableCell align="center">
                                                                    {pantsReviewLabel.categoryItemName3 ? <Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={pantsReviewLabel.categoryItemName3}
                                                                    /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>디테일</TableCell>
                                                                <TableCell align="center"> {pantsReviewLabel.detailItemName3 ? pantsReviewLabel.detailItemName3.map((detail3) =>
                                                                    (detail3 ? <Chip style={{margin: '0 4px 0'}}
                                                                                     variant="outlined"
                                                                                     label={detail3}
                                                                    /> : '')
                                                                ) : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>프린트</TableCell>
                                                                <TableCell align="center">{pantsReviewLabel.printItemName3 ? pantsReviewLabel.printItemName3.map((print3) =>
                                                                    (print3 ? <Chip style={{margin: '0 4px 0'}}
                                                                                    variant="outlined"
                                                                                    label={print3}
                                                                    /> : '')
                                                                ) : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>소재</TableCell>
                                                                <TableCell align="center">{pantsReviewLabel.textureItemName3 ? pantsReviewLabel.textureItemName3.map((texture3)=>
                                                                    (texture3 ? <Chip style={{margin: '0 4px 0'}}
                                                                                      variant="outlined"
                                                                                      label={texture3}
                                                                    /> : '')
                                                                ) : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>기장</TableCell>
                                                                <TableCell align="center">
                                                                    {pantsReviewLabel.clothLengthItemName3 ? <Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={pantsReviewLabel.clothLengthItemName3}
                                                                    /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>핏</TableCell>
                                                                <TableCell align="center">
                                                                    {pantsReviewLabel.fitItemName3 ?<Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={pantsReviewLabel.fitItemName3}
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
                                                                <TableCell align="center" className={classes.tabletxt}>항목</TableCell>
                                                                <TableCell align="center" className={classes.tabletxt} style={{color:'#000'}}>레이블링</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>색상</TableCell>
                                                                <TableCell align="center">
                                                                    메인 {onePieceReviewHighLabel.colorItemName4 ?
                                                                    <Chip style={{margin: '0 8px 0', backgroundColor: onePieceReviewHighLabel.colorItemMemo4,
                                                                        ...( onePieceReviewHighLabel.colorItemMemo4 === '#FFFFFF' ? {color:'#000000'} : {color: '#FFFFFF'}),
                                                                        fontWeight: 'bold'}}
                                                                          variant="outlined"
                                                                          label={onePieceReviewHighLabel.colorItemName4}
                                                                    /> : ''}
                                                                    서브 {onePieceReviewHighLabel.subColorItemName4 ?
                                                                    <Chip style={{margin: '0 8px 0',backgroundColor: onePieceReviewHighLabel.subColorItemMemo4,
                                                                        ...( onePieceReviewHighLabel.subColorItemMemo4 === '#FFFFFF' ? {color:'#000000'} : {color: '#FFFFFF'}),
                                                                        fontWeight: 'bold'}}
                                                                          variant="outlined"
                                                                          label={onePieceReviewHighLabel.subColorItemName4}
                                                                    /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>소매길이</TableCell>
                                                                <TableCell align="center">{onePieceReviewHighLabel.sleeveLengthItemName4}</TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center">카테고리</TableCell>
                                                                <TableCell align="center">
                                                                    {onePieceReviewLabel.categoryItemName4 ? <Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={onePieceReviewLabel.categoryItemName4}
                                                                    /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>디테일</TableCell>
                                                                <TableCell align="center"> {onePieceReviewLabel.detailItemName4 ? onePieceReviewLabel.detailItemName4.map((detail4) =>
                                                                    (detail4 ? <Chip style={{margin: '0 4px 0'}}
                                                                                     variant="outlined"
                                                                                     label={detail4}
                                                                    /> : '')
                                                                ) : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>프린트</TableCell>
                                                                <TableCell align="center">{onePieceReviewLabel.printItemName4 ? onePieceReviewLabel.printItemName4.map((print4) =>
                                                                    (print4 ? <Chip style={{margin: '0 4px 0'}}
                                                                                    variant="outlined"
                                                                                    label={print4}
                                                                    /> : '')
                                                                ) : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>소재</TableCell>
                                                                <TableCell align="center">{onePieceReviewLabel.textureItemName4 ? onePieceReviewLabel.textureItemName4.map((texture4)=>
                                                                    (texture4 ? <Chip style={{margin: '0 4px 0'}}
                                                                                      variant="outlined"
                                                                                      label={texture4}
                                                                    /> : '')
                                                                ) : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>기장</TableCell>
                                                                <TableCell align="center">
                                                                    {onePieceReviewLabel.clothLengthItemName4 ? <Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={onePieceReviewLabel.clothLengthItemName4}
                                                                    /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>넥라인</TableCell>
                                                                <TableCell align="center">
                                                                    {onePieceReviewLabel.neckLineItemName4 ? <Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={onePieceReviewLabel.neckLineItemName4}
                                                                    /> : '' }
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>칼라(카라)</TableCell>
                                                                <TableCell align="center">
                                                                    {onePieceReviewLabel.karaItemName4 ? <Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={onePieceReviewLabel.karaItemName4}
                                                                    /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell align="center" className={classes.tabletxt}>핏</TableCell>
                                                                <TableCell align="center">
                                                                    {onePieceReviewLabel.fitItemName4 ?<Chip style={{margin: '0 4px 0'}}
                                                                        variant="outlined"
                                                                        label={onePieceReviewLabel.fitItemName4}
                                                                    /> : ''}
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </TabPanel>
                                        </Tabs>
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                {/* <hr></hr> */}
                <div style={{textAlign:'right',marginTop:15,marginBottom:30}}>
                    {this.props.authStore.loginUser.authorityNo !== 4? (
                    <Button variant="outlined" onClick={this.handleJson} style={{width:'135px',height:'46px',border:'1px solid #000',fontFamily:'NotoSansCJKkr',fontSize:'15px',color:'#000' }}>
                        json가져오기
                    </Button>
                        ) : ''}
                </div>
            </Container>
        );
    }
};
export default withSnackbar(withRouter(withStyles(styles) (SuccessList)));