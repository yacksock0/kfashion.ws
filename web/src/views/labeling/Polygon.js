import React, { Component, ReactDOM } from 'react';
import {fabric} from 'fabric';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

import {Container, Toolbar, Typography, Button, Grid} from "@material-ui/core";

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import SaveIcon from '@material-ui/icons/Save';
import {inject, observer} from "mobx-react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import PolygonList from "./PolygonList";

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Typography>{children}</Typography>
            )}
        </div>
    );
}

const styles = theme => ({
    root: {
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




@inject('fileUploadStore','imageStore', 'polygonStore','authStore')
@observer
class Polygon extends React.Component {
    state = {
        imgData :'',
        workNo:'',
        value:1,
        finishbtn : false,
        buttonDis1 : false,
        buttonDis2 : false,
        buttonDis3 : false,
        buttonDis4 : false,
        buttonDis5 : false,
    }
    save1 = false;
    save2 = false;
    save3 = false;
    save4 = false;
    save5 = false;
    polygonIndex = 0;
    polygon = [{
        polyNo : '',
        points: [{
            x: 0,
            y: 0,
        }
        ]

    }];

    rectList=[]

    canvas;
    polyNo;
    polyPointX = [];
    polyPointY = [];

    x;
    y;
    lineTwoPoint=[];
    lineCounter = 0;
    polyCounter = 0;
    onOff = '';
    onOff2 = 1;
    i=0;

    handleTabChange = (event, newValue) => {
        this.setState({ value: newValue });
    }

    componentDidMount() {
        this.props.enqueueSnackbar("Polygon Work", {
            variant: 'info'
        });
        this.setState({
            boundaryList: this.props.imageStore.boundaryList,
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })
        // canvas Drawing
        this.canvas = new fabric.Canvas('c');
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`, this.canvas.renderAll.bind(this.canvas), {
            left: 25,
            top: 25,
            width : 650,
            height : 800,
            originX: 'left',
            originY: 'top'
        });

        this.canvas.on('selection:created', function (e) {
            const asd = e.target;
        });

        this.canvas.on('mouse:move', function (e) {
            const asd = e.x;
        });

        this.canvas.on('mouse:down', (e) => {
            console.log('polyNo : ' + this.polyNo);

            if (this.onOff == 'lineUse') {
                this.canvas.selection = false;
                this.polyPointX[this.polyCounter] = e.pointer.x;
                this.polyPointY[this.polyCounter] = e.pointer.y;


                this.lineTwoPoint = [this.x, this.y, e.pointer.x, e.pointer.y];
                this.x = e.pointer.x;
                this.y = e.pointer.y;

                let circle = new fabric.Circle({
                    type: 'circle',
                    id: this.polyCounter,
                    radius: 8,
                    fill: 'green',
                    left: e.pointer.x - 5,
                    top: e.pointer.y - 5,
                    selectable: false,
                    evented: false,
                });
                this.canvas.add(circle);
                this.canvas.bringToFront(circle)
                this.canvas.renderAll();
                this.polyCounter += 1;
            }
            console.log(this.polyPointX);
            console.log(this.polyPointY);
        });

        this.canvas.on('mouse:up', (e) => {

            let x1 = this.lineTwoPoint[0];
            let x2 = this.lineTwoPoint[2];
            let x3 = 0;
            let y1 = this.lineTwoPoint[1];
            let y2 = this.lineTwoPoint[3];
            let y3 = 0;
            if(x2 <x1){
                x3 = x1;
                x1 = x2;
                x2 = x3;
            }
            if(y2 <y1){
                y3 = y1;
                y1 = y2;
                y2 = y3;
            }
            if(this.onOff == 'lineUse' && x1 !=0 ){
                let polyline = new fabric.Line(
                    [this.lineTwoPoint[0],
                        this.lineTwoPoint[1],
                        this.lineTwoPoint[2],
                        this.lineTwoPoint[3]], {
                        id : this.lineCounter,
                        type : 'line',
                        fill: 'red',
                        stroke: 'red',
                        strokeWidth: 1,
                        padding: 1,
                        selectable : false,
                        evented : false,
                        left: x1,
                        top: y1,
                    });
                this.canvas.add(polyline);
                this.canvas.sendToBack(polyline);
                this.lineCounter +=1;
            }
            this.canvas.selection = true;
        });
    }

    startPoly = (polyNo) => {
        // this.polygonIndex +=1;
        this.onOff = 'lineUse';
        this.polyNo = polyNo;

        this.setState({
            buttonDis1: true,
            buttonDis2: true,
            buttonDis3: true,
            buttonDis4: true,
            buttonDis5: true,
        });
        console.log(polyNo);
        switch (polyNo) {
            case 1 : console.log('1'); this.setState({buttonDis1: false}); break;
            case 2 : console.log('2');this.setState({buttonDis2: false}); break;
            case 3 : console.log('3');this.setState({buttonDis3: false}); break;
            case 4 : console.log('4');this.setState({buttonDis4: false}); break;
            case 5 : console.log('5');this.setState({buttonDis5: false}); break;
        }
    }

    deleteOne = () => {
        let j = (this.polyCounter);
        let line = 0;
        let circle = 0;
        this.canvas.getObjects().forEach(function( o) {
            if(o.id == j-1 && o.type == 'line')     line = o;
            if(o.id == j-1 && o.type == 'circle')   circle = o;
        })
        this.canvas.remove(line);
        this.canvas.remove(circle);

        let x1 =this.polyPointX[this.polyCounter -2];
        let y1 =this.polyPointY[this.polyCounter -2];
        this.x = x1;
        this.y = y1;
        this.polyCounter -=1;
        this.lineCounter -=1;
        this.polyPointX[this.polyCounter] = 0;
        this.polyPointY[this.polyCounter] = 0;
    }

    deleteAll = (b) =>{
        let objList =[];
        this.canvas.getObjects().forEach(function( o) {
            objList.push(o);
        })
        for (let i=0 ; i<=objList.length; i++ ){
            this.canvas.remove(objList[i]);
        }

        if( b != -1) {
            console.log(b);
            this.x = 0;
            this.y = 0;
            this.polyCounter =0;
            this.lineCounter =0;
            this.polyPointX.length =0;
            this.polyPointY.length =0;
            this.buttonState();
        }
    }

    buttonState = () => {
        this.setState({
            buttonDis1: this.save1,
            buttonDis2: this.save2,
            buttonDis3: this.save3,
            buttonDis4: this.save4,
            buttonDis5: this.save5,
        });
    }

    finishPath = () => {

        if(this.canvas.getObjects().length !=0) {
            console.log("여기는 피니시");
            this.onOff = '';
            let makePath = 'M' + this.polyPointX[0] + ' ' + this.polyPointY[0];
            for (let i = 1; i < this.polyCounter; i++) {
                makePath += ' L ' + this.polyPointX[i] + ' ' + this.polyPointY[i];
            }
            makePath += ' z';
            let path = new fabric.Path(makePath);
            this.deleteAll(-1);
            this.canvas.add(path);
            this.state.finishbtn = true;
        }else{
            alert("입력된 polygon이 존재하지 않습니다.");
        }
    }

    poly = [];
    polyX = [];
    polyY = [];
    doSave = (newPolyNo) => {

        const newPolygon = {
            polyNo:'',
            points: [{
            }],
        };

        console.log(newPolyNo);
        console.log(this.i);
        if(this.state.finishbtn) {
            if (this.canvas.getObjects().length != 0) {
                newPolygon.polyNo = newPolyNo;
                for(let i in this.polyPointX) {
                    const x = this.polyPointX[i];
                    const y = this.polyPointY[i];
                    newPolygon.points.push({x: x, y: y});
                }
                this.polygon.push(newPolygon);


                this.deleteAll(newPolyNo);
                console.log(this.polygon);

                switch (newPolyNo) {
                    case 1 :
                        console.log('1');
                        this.save1 = true;
                        break;
                    case 2 :
                        console.log('2');
                        this.save2 = true;
                        break;
                    case 3 :
                        console.log('3');
                        this.save3 = true;
                        break;
                    case 4 :
                        console.log('4');
                        this.save4 = true;
                        break;
                    case 5 :
                        console.log('5');
                        this.save5 = true;
                        break;
                }
                this.buttonState();

            } else {
                alert("입력된 polygon이 존재하지 않습니다.");
            }
            this.state.finishbtn = false;
        }else{
            alert("finish를 눌러 작업을 마무리 하세요.");
        }
    }


    submit = () =>{

        console.log(this.state.rectList);
        // this.props.polygonStore.objGet(this.polygon);
        // this.props.polygonStore.changeNewPolygonLocationCreatedId(this.props.authStore.isUserId);
        // this.props.polygonStore.changeNewPolygonLocationWorkNo(this.props.imageStore.isWorkNo);
        // this.props.polygonStore.doPolygonLocationUp();
    }
    handleClickItem = (workNo, imageData) => {
        this.props.imageStore.changeWorkNo(workNo);
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
            left: 25,
            top: 25,
            width : 600,
            height : 800,
            originX: 'left',
            originY: 'top'
        });
    }
    render() {
        const { classes } = this.props;
        const {isWorkNo} = this.props.imageStore;

        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer}/>
                <div className={classes.mainContent}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={5} style={{margin:"auto", display: "block"}}>
                            <div style ={{ backgroundColor : "#13264E"}}>
                                <canvas id="c" width={600} height={800} className={classes.canvas}>  </canvas>
                            </div>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                        <AppBar position="static">
                            <Tabs value={this.state.value} onChange={this.handleTabChange} aria-label="simple tabs example">
                                <Tab label="영역지정" value={0} style={{minWidth:'50%'}}/>
                                <Tab label="이미지 리스트" value={1} style={{minWidth:'50%'}}/>
                            </Tabs>
                        </AppBar>
                        <TabPanel value={this.state.value} index={0}>
                            <div className={classes.mainContent}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>영역</TableCell>
                                                <TableCell>poly start</TableCell>
                                                <TableCell>poly finish</TableCell>
                                                <TableCell>delete One</TableCell>
                                                <TableCell>delete All</TableCell>
                                                <TableCell>save</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            <TableRow >
                                                <TableCell>상의 영역</TableCell>
                                                <TableCell>
                                                    <Button
                                                        id="1"
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Draw Polygon"
                                                        onClick={() => this.startPoly(1) }
                                                        disabled={this.state.buttonDis1}>
                                                        start <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        id="2"
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="finish"
                                                        onClick={() => this.finishPath() }
                                                        disabled={this.state.buttonDis1}>
                                                        finish
                                                    </Button>

                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton id="3" aria-label="delete" onClick={() => this.deleteOne()} disabled={this.state.buttonDis1}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        id="4"
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.deleteAll(1) }
                                                        disabled={this.state.buttonDis1}>
                                                        All<DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        id="5"
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.doSave(1) }
                                                        startIcon={<SaveIcon />}
                                                        disabled={this.state.buttonDis1}>
                                                        save
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableBody >
                                            <TableRow>
                                                <TableCell>하의 영역</TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Draw Polygon"
                                                        onClick={() => this.startPoly(2) }
                                                        disabled={this.state.buttonDis2}>
                                                        start <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="finish"
                                                        onClick={() => this.finishPath() }
                                                        disabled={this.state.buttonDis2}>
                                                        finish
                                                    </Button>

                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteOne()} disabled={this.state.buttonDis2}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.deleteAll(2) }
                                                        disabled={this.state.buttonDis2}>
                                                        All<DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.doSave(2) }
                                                        disabled={this.state.buttonDis2}>
                                                        save
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>신발 영역</TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Draw Polygon"
                                                        onClick={() => this.startPoly(3) }
                                                        disabled={this.state.buttonDis3}>
                                                        start <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="finish"
                                                        onClick={() => this.finishPath() }
                                                        disabled={this.state.buttonDis3}>
                                                        finish
                                                    </Button>

                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteOne()} disabled={this.state.buttonDis3}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.deleteAll(3) }
                                                        disabled={this.state.buttonDis3} >
                                                        All<DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.doSave(3) }
                                                        disabled={this.state.buttonDis3} >
                                                        save
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>가방 영역</TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Draw Polygon"
                                                        onClick={() => this.startPoly(4) }
                                                        disabled={this.state.buttonDis4}>
                                                        start <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="finish"
                                                        onClick={() => this.finishPath() }
                                                        disabled={this.state.buttonDis4} >
                                                        finish
                                                    </Button>

                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteOne()} disabled={this.state.buttonDis4}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.deleteAll(4) }
                                                        disabled={this.state.buttonDis4}>
                                                        All<DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.doSave(4) }
                                                        disabled={this.state.buttonDis4}>
                                                        save
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableBody>
                                            <TableRow >
                                                <TableCell>악세사리 영역</TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Draw Polygon"
                                                        onClick={() => this.startPoly(5) }
                                                        disabled={this.state.buttonDis5} >
                                                        start <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="finish"
                                                        onClick={() => this.finishPath() }
                                                        disabled={this.state.buttonDis5}>
                                                        finish
                                                    </Button>

                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteOne()}  disabled={this.state.buttonDis5}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.deleteAll(5) }
                                                        disabled={this.state.buttonDis5}>
                                                        All<DeleteIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        title="Delete All"
                                                        onClick={() => this.doSave(5) }
                                                        disabled={this.state.buttonDis5}>
                                                        save
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                            </div>

                            <div style={{backgroundColor: 'grey'}}>
                                <div align="center">
                                    <Button onClick={() => this.submit()}>submit </Button>
                                </div>
                            </div>

                        </TabPanel>
                            <TabPanel value={this.state.value} index={1}>
                                <PolygonList onClick={this.handleClickItem} />
                            </TabPanel>
                        </Grid>

                    </Grid>

                </div>

                {/*Stepper*/}
                <div style={{marginTop:70}}>
                </div>
                <div>
                    <hr></hr>
                    <Button
                        type="submit"
                        className={classes.buttonType1}
                        variant="outlined"
                        onClick={this.handleSubmitForm} >
                        Previous
                    </Button>
                    <Button
                        type="submit"
                        className={classes.buttonType1}
                        variant="outlined"
                        onClick={this.handleSubmitForm} >
                        Next
                    </Button>
                    <Button
                        type="submit"
                        className={classes.buttonType2}
                        color="primary"
                        variant="outlined"
                        onClick={this.handleSubmitForm} >
                        Save and Next
                    </Button>
                </div>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Polygon)));