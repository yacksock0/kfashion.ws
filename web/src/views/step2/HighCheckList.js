import React, {forwardRef} from "react";
import MaterialTable from 'material-table';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import CheckIcon from '@material-ui/icons/Check';
import {Container, Grid} from "@material-ui/core";
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
import ErrorIcon from '@material-ui/icons/Error';
import {toJS} from "mobx";
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

@inject('authStore','imageStore', 'checkHighLabelStore', 'currentStepStore','workStore','professionalLabelStore', 'polygonStore')
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
            columns: [
                {title: '번호', field: 'workNo',type: 'button', filterPlaceholder: 'GroupNo filter', tooltip: 'workNo로 정렬'},
                {title: '사진', field: 'fileName',type: 'Image', render : rowData => <img src={rowData.fileName} style={{width: 80, height:80,}}/> },
                {title: '이름', field: 'workName',type: 'button', filterPlaceholder: 'GroupNo filter',},
                {title: '생성일', field: 'createdDatetime', type: 'date'},
            ],
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
        this.props.checkHighLabelStore.LoadInspectionHighList();
        this.props.enqueueSnackbar("FinalCheck", {
            variant: 'info'
        });
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelWorkNo(this.props.imageStore.isWorkNo);
    }

    handleClick=(workNo, imgData)=>{
        this.deleteAll();
        this.props.checkHighLabelStore.changeNewBasicLabelWorkNo(workNo);
        this.props.checkHighLabelStore.LoadReviewHighLabelList(workNo);
        this.props.polygonStore.changeNewPolygonLocationWorkNo(workNo);
        this.props.polygonStore.LoadPolygonLocation(workNo, this.handleClickCallback);
    }
    handleClickCallback= (polyInfo, workNo)=>{
        this.setState({ polyInfo : polyInfo, workNo : workNo});
        this.setState({tabIndex1 : 0, tabIndex2 : 0});
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${this.state.workNo}`, this.canvas.renderAll.bind(this.canvas), {
            width: 800,
            height: 800,
            originX: 'left',
            originY: 'top'
        });
    }

    onSelectTab(tabIndex1) {
        this.setState({tabIndex1:tabIndex1})
        if(tabIndex1 ==0){
            this.props.checkHighLabelStore.changeNewBasicLabelWorkNo(this.state.workNo);
        }else{
            this.props.checkHighLabelStore.changeNewBasicLabelWorkNo('');
        }

    }
    onSelectTab1(tabIndex2){
        let polyNo = tabIndex2+1;
        const {locationPolygonList} = this.props.polygonStore;
        const selectedPoly = (toJS(locationPolygonList).filter(poly => poly.polyNo === polyNo));

        if (selectedPoly.length !== 0) {
            this.deleteAll();
            for (let i = 0; i < selectedPoly.length; i++) {
                console.log(this.lineTwoPoint);
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
    handleSubmit=()=>{
        this.props.checkHighLabelStore.LoadInspectionHighList();
        this.setState({
            tabIndex1:1
        })
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
                                                    <TableCell align="center">메인 : {outerReviewHighLabel.colorItemName1} 서브 : {outerReviewHighLabel.subColorItemName1 ? outerReviewHighLabel.subColorItemName1 : '' }</TableCell>
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
                                                            <TableCell align="center">메인 : {topReviewHighLabel.colorItemName2} 서브 : {topReviewHighLabel.subColorItemName2 ? topReviewHighLabel.subColorItemName2 : ''}</TableCell>
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
                                                            <TableCell align="center">메인 : {pantsReviewHighLabel.colorItemName3} 서브 : {pantsReviewHighLabel.subColorItemName3 ? pantsReviewHighLabel.subColorItemName3 : '' }</TableCell>
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
                                                            <TableCell align="center">메인 : {onePieceReviewHighLabel.colorItemName4} 서브 : {onePieceReviewHighLabel.subColorItemName4 ? onePieceReviewHighLabel.subColorItemName4 : ''}</TableCell>
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
                                columns={this.state.columns}
                                data={
                                    inspectionHighList.map((item) => {
                                        return {
                                            workNo: item.workNo,
                                            fileName: item.fileName,
                                            workName: item.workName,
                                            createdDatetime: item.createdDatetime,
                                        }
                                    })}
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
                <hr></hr>
                <ReturnMsg onClick={()=> this.handleSubmit()}/><br></br><br></br>
            </Container>
        );
    }
};
export default withSnackbar(withRouter(withStyles(styles) (HighCheckList)));