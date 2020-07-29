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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {fabric} from "fabric";
import {get, toJS} from "mobx";
import Chip from "@material-ui/core/Chip";

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

@inject('professionalLabelStore','authStore', 'imageStore', 'currentStepStore','workStore', 'polygonStore')
@observer
class FinalCheckList extends React.Component {
    constructor(props) {
        super(...arguments , props);
        this.state = {
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
            tabIndex1:1,
            tabIndex2: 0,
            createdId: '',
            successCheckId : '',
            boundaryList: [],
            imgData:'',
            count: 0,
            data: [],
            columns: [
                {title: '번호', field: 'workNo',type: 'number'},
                {title: '사진', field: 'fileName',type: 'string', render : rowData => <img src={rowData.fileName} style={{width: 80, height:80, borderRadius:15}}/> },
                {title: '이름', field: 'workName',type: 'string', filterPlaceholder: 'GroupNo filter',},
                {title: '생성일', field: 'createdDatetime', type: 'date'},
                {title: '생성자', field: 'createdId', type: 'string'},
            ],
        }
        this.handleClickMsgOpen = this.handleClickMsgOpen.bind(this)
    }

    componentWillUnmount() {
        this.props.imageStore.initStore();
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas('c');
        this.props.currentStepStore.setStep(4);
        const id = this.props.authStore.loginUser.id;
        this.props.professionalLabelStore.LoadInspectionList(id);
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
        this.props.professionalLabelStore.LoadLabelList(workNo);
                this.props.workStore.LoadReviewLabelList(workNo);
        this.deleteAll();
        this.props.imageStore.changeWorkNo(workNo);
        this.props.polygonStore.changeNewPolygonLocationWorkNo(workNo);
        this.props.polygonStore.LoadPolygonLocation(workNo);
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
            width: 800,
            height: 800,
            originX: 'left',
            originY: 'top'
        });
        this.setState({tabIndex1 : 0, tabIndex2 : 0})
    }

    handleComplete = () => {
        const basicComplateConfirm = window.confirm("검수를 완료 하시겠습니까?");
        if (basicComplateConfirm) {
            const workNo = this.props.polygonStore.NewPolygonLocation.workNo;
            const createdId = this.props.authStore.loginUser.id;
            this.props.professionalLabelStore.ProfessionalCompleteUp(workNo, createdId);
            this.deleteAll();
            this.setState({
                open: false,
                tabIndex1 : 1,
            });
            this.canvas.backgroundImage = 0;
            this.canvas.renderAll();
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

                if(i !=0) {
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
        this.setState({tabIndex1 : tabIndex});
    }
    render() {
        const handleClickMsgOpen = () => {
            this.setState({open:true,})
        };

        const {classes} = this.props;
        const {outerReviewLabel, topReviewLabel, pantsReviewLabel, onePieceReviewLabel, styleReviewLabel} =this.props.professionalLabelStore;
        const detail1 = outerReviewLabel.detailItemName1;
        console.log(onePieceReviewLabel);
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
                                <Tabs selectedIndex={this.state.tabIndex1} onSelect={tabIndex1 => this.onSelectTab1(tabIndex1)}>
                                    <TabList >
                                        <Tab tabIndex={0} style={{width: '50%', height:50,textAlign:'center'}}><h3>레이블링</h3></Tab>
                                        <Tab tabIndex={1} style={{width: '50%', height:50,textAlign:'center'}}><h3>이미지 리스트</h3></Tab>
                                    </TabList>

                                    <TabPanel>
                                <Tabs selectedIndex={this.state.tabIndex2} onSelect={tabIndex2 => this.onSelectTab2(tabIndex2)}>
                                    <TabList >
                                        <Tab  style={{width: '20%', height:60,textAlign:'center'}}><h3>스타일</h3></Tab>
                                        <Tab  style={{width: '20%', height:60,textAlign:'center'}}><h3>아우터</h3></Tab>
                                        <Tab  style={{width: '20%', height:60,textAlign:'center'}}><h3>상의</h3></Tab>
                                        <Tab  style={{width: '20%', height:60,textAlign:'center'}}><h3>하의</h3></Tab>
                                        <Tab  style={{width: '20%', height:60,textAlign:'center'}}><h3>원피스</h3></Tab>
                                    </TabList>
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
                                                        <TableCell align="center">스타일</TableCell>
                                                        <TableCell align="center">메인 :<Chip
                                                            variant="outlined"
                                                            label={styleReviewLabel.styleItemName}
                                                        />  서브 : {styleReviewLabel.styleSubItemName ?
                                                        <Chip
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
                                                        <TableCell align="center">항목</TableCell>
                                                        <TableCell align="center">레이블링</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell align="center">스타일</TableCell>
                                                        <TableCell align="center">메인 :<Chip
                                                            variant="outlined"
                                                            label={styleReviewLabel.styleItemName}
                                                        /> 서브 : {styleReviewLabel.styleSubItemName ?
                                                            <Chip
                                                                variant="outlined"
                                                                label={styleReviewLabel.styleSubItemName}
                                                            /> : ''}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">카테고리</TableCell>
                                                        <TableCell align="center"><Chip
                                                            variant="outlined"
                                                            label={outerReviewLabel.categoryItemName1}
                                                        /></TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">디테일</TableCell>
                                                        <TableCell align="center"> {outerReviewLabel.detailItemName1 ? outerReviewLabel.detailItemName1.map((detail1) =>
                                                            (detail1 ? ' ( '+detail1+' ) ' : '')
                                                            ) : ''}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">프린트</TableCell>
                                                        <TableCell align="center">{outerReviewLabel.printItemName1 ? outerReviewLabel.printItemName1.map((print1) =>
                                                            (print1 ? ' ( '+print1+' ) ' : '')
                                                        ) : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">소재</TableCell>
                                                        <TableCell align="center">{outerReviewLabel.textureItemName1 ? outerReviewLabel.textureItemName1.map((texture1)=>
                                                            (texture1 ? ' ( '+texture1+' ) ' : '')
                                                        ) : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">기장</TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                variant="outlined"
                                                                label={outerReviewLabel.clothLengthItemName1}
                                                            />
                                                            </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">넥라인</TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                variant="outlined"
                                                                label={outerReviewLabel.neckLineItemName1}
                                                            />
                                                            </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">칼라</TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                variant="outlined"
                                                                label={outerReviewLabel.karaItemName1}
                                                            />
                                                            </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">핏</TableCell>
                                                        <TableCell align="center">
                                                            <Chip
                                                                variant="outlined"
                                                                label={outerReviewLabel.fitItemName1}
                                                            /></TableCell>
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
                                                        <TableCell align="center">스타일</TableCell>
                                                        <TableCell align="center">메인 : {styleReviewLabel.styleItemName} 서브 : {styleReviewLabel.styleSubItemName ? styleReviewLabel.styleSubItemName : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">카테고리</TableCell>
                                                        <TableCell align="center">{topReviewLabel.categoryItemName2}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">디테일</TableCell>
                                                        <TableCell align="center">{topReviewLabel.detailItemName2 ? topReviewLabel.detailItemName2.map((detail2)=>
                                                            (detail2 ? ' ( '+detail2+' ) ' : '')
                                                        ) : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">프린트</TableCell>
                                                        <TableCell align="center">{topReviewLabel.printItemName2 ? topReviewLabel.printItemName2.map((print2) =>
                                                            (print2 ? ' ( '+print2+' ) ' : '')
                                                        ) : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">소재</TableCell>
                                                        <TableCell align="center">{topReviewLabel.textureItemName2 ? topReviewLabel.textureItemName2.map((texture2)=>
                                                            (texture2 ? ' ( '+texture2+' ) ' : '')
                                                        ) : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">기장</TableCell>
                                                        <TableCell align="center">{topReviewLabel.clothLengthItemName2}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">넥라인</TableCell>
                                                        <TableCell align="center">{topReviewLabel.neckLineItemName2}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">칼라</TableCell>
                                                        <TableCell align="center">{topReviewLabel.karaItemName2}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">핏</TableCell>
                                                        <TableCell align="center">{topReviewLabel.fitItemName2}</TableCell>
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
                                                        <TableCell align="center">스타일</TableCell>
                                                        <TableCell align="center">메인 : {styleReviewLabel.styleItemName} 서브 : {styleReviewLabel.styleSubItemName ? styleReviewLabel.styleSubItemName : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">카테고리</TableCell>
                                                        <TableCell align="center">{pantsReviewLabel.categoryItemName3}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">디테일</TableCell>
                                                        <TableCell align="center">{pantsReviewLabel.detailItemName3 ? pantsReviewLabel.detailItemName3.map((detail3)=>
                                                            (detail3 ? ' ( '+detail3+' ) ' : '')
                                                        ) : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">프린트</TableCell>
                                                        <TableCell align="center">{pantsReviewLabel.printItemName3 ? pantsReviewLabel.printItemName3.map((print3) =>
                                                            (print3 ? ' ( '+print3+' ) ' : '')
                                                        ) : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">소재</TableCell>
                                                        <TableCell align="center">{pantsReviewLabel.textureItemName3 ? pantsReviewLabel.textureItemName3.map((texture3)=>
                                                            (texture3 ? ' ( '+texture3+' ) ' : '')
                                                        ) : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">기장</TableCell>
                                                        <TableCell align="center">{pantsReviewLabel.clothLengthItemName3}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">핏</TableCell>
                                                        <TableCell align="center">{pantsReviewLabel.fitItemName3}</TableCell>
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
                                                        <TableCell align="center">스타일</TableCell>
                                                        <TableCell align="center">메인 : {styleReviewLabel.styleItemName} 서브 : {styleReviewLabel.styleSubItemName ? styleReviewLabel.styleSubItemName : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">카테고리</TableCell>
                                                        <TableCell align="center">{onePieceReviewLabel.categoryItemName4}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">디테일</TableCell>
                                                        <TableCell align="center">{onePieceReviewLabel.detailItemName4 ? onePieceReviewLabel.detailItemName4.map((detail4)=>
                                                            (detail4 ? ' ( '+detail4+' ) ' : '')
                                                        ) : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">프린트</TableCell>
                                                        <TableCell align="center">{onePieceReviewLabel.printItemName4 ? onePieceReviewLabel.printItemName4.map((print4) =>
                                                            (print4 ? ' ( '+print4+' ) ' : '')
                                                        ) : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">소재</TableCell>
                                                        <TableCell align="center">{onePieceReviewLabel.textureItemName4 ? onePieceReviewLabel.textureItemName4.map((texture4)=>
                                                            (texture4 ? ' ( '+texture4+' ) ' : '')
                                                        ) : ''}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">기장</TableCell>
                                                        <TableCell align="center">{onePieceReviewLabel.clothLengthItemName4}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">넥라인</TableCell>
                                                        <TableCell align="center">{onePieceReviewLabel.neckLineItemName4}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">칼라</TableCell>
                                                        <TableCell align="center">{onePieceReviewLabel.karaItemName4}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell align="center">핏</TableCell>
                                                        <TableCell align="center">{onePieceReviewLabel.fitItemName4}</TableCell>
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
                                            data={!!this.props.professionalLabelStore.inspectionList ?
                                                this.props.professionalLabelStore.inspectionList.map((item) => {
                                                    return {
                                                        workNo: item.workNo,
                                                        fileName: item.fileName,
                                                        workName: item.workName,
                                                        createdDatetime: item.createdDatetime,
                                                        createdId: item.createdId,
                                                    }
                                                }) : []}
                                            title="이미지 리스트"
                                            options={{
                                                sorting:false,
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
                                            actions={
                                                [
                                                    {
                                                        icon: CheckIcon,
                                                        tooltip: 'Select Image',
                                                        onClick: (event, rowData) => this.handleClick(rowData.workNo, rowData.createdId,"/api/v1/kfashion/img/getByteImage?workNo=" + rowData.workNo)
                                                    },
                                                    rowData => ({
                                                        icon: Edit,
                                                        tooltip: 'return',
                                                        hidden: rowData.createdId !== this.props.authStore.loginUser.id,
                                                        onClick: (event, rowData) => this.handleClickReturn(rowData.workNo)
                                                    })
                                                ]
                                            }
                                        />
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <hr></hr>
                <Button variant="outlined" onClick={this.handleComplete} disabled={this.state.successCheckId !== this.props.authStore.loginUser.id} style={{float:'right' , width:150, marginBottom:10}}>
                    완료
                </Button>
            </Container>
        );
    }
};
export default withSnackbar(withRouter(withStyles(styles) (FinalCheckList)));