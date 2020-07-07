import React, { Component, ReactDOM } from 'react';
import {fabric} from 'fabric';
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {Container, Toolbar, Typography, Button, Grid} from "@material-ui/core";
import {green, grey ,red} from "@material-ui/core/colors";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import ImageList from "./ImageList";
import SaveIcon from "@material-ui/icons/Save";


const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {
        minWidth: 500,
    },
    // --START Test
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
    // --END Test

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
    canvas:{
        width:'100%',
        minWidth:'100%',
        height:'100vh',
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
});
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

@inject('fileUploadStore','imageStore','rectStore','authStore')
@observer
class Test extends React.Component {
    objectList = [];
    downX;
    downY;
    upX;
    upY;
    onOff = '';

    i=0;
    width;
    height;
    canvas;
    text;
    fill;
    x;
    y;
    id;

    state = {
        imgData :'',
        workNo:'',
        value:1,
        count:0,
        winheight: 0,
        winwidth: 0,

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

    objectList = [];

    handleTabChange = (event, newValue) => {
        this.setState({ value: newValue });
    }
    componentDidMount() {
        this.props.enqueueSnackbar("BoundaryBox Work", {
            variant: 'info'
        });
        this.setState({
            boundaryList: this.props.imageStore.boundaryList,
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })

        this.canvas = this.__canvas = new fabric.Canvas('c');
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`, this.canvas.renderAll.bind(this.canvas), {
            left: 25,
            top: 25,
            width: 700,
            height: 800,
            originX: 'left',
            originY: 'top'
        });
        this.canvas.selection = false;
        fabric.Object.prototype.transparentCorners = false;
        fabric.Object.prototype.cornerColor = 'blue';
        fabric.Object.prototype.hasRotatingPoint = false;

        // after:render
        this.canvas.on('after:render', function (e) {
            const asd = e.target;
            // console.log("11111111 : "+e);
            // console.log("11111111 : "+e);
        });


        this.canvas.on('mouse:down', function (e) {
            this.downX = e.pointer.x;
            this.downY = e.pointer.y
            console.log("11111111 : " + e.pointer.x);
            console.log(e.pointer.y);
        });

        this.canvas.on('mouse:up', function(e) {
            if (this.selection) {
                console.log("222222222 : " + e.pointer.x);
                console.log(e.pointer.y);
                let upX = e.pointer.x;
                let upY = e.pointer.y;
                let width = (this.downX - upX);
                let height = (this.downY - upY);
                let id = this.id;

                const rect = new fabric.Rect({
                    id: id,
                    left: upX,
                    top: upY,
                    width: width,
                    height: height,
                    opacity: 0.0,
                    strokeWidth: 2,
                    stroke: "#880E4F",

                });

                // rect.fill = 'yellow';
                this.add(rect);
                this.setActiveObject(rect);
                this.selection = false;
                console.log(rect);
                // this.add(upX, upY, width, height);

            }

        });
        this.canvas.on('object:moving', function (e) {
            const asd = e.target;
            console.log(e.target);
        });
    }

    // add = (upX, upY, width, height) =>{
    //     const rect = new fabric.Rect({
    //         id: `${this.id}`,
    //         left: upX,
    //         top: upY,
    //         width: width,
    //         height: height,
    //         opacity: 0,
    //         strokeWidth: 2,
    //         stroke: "#880E4F",
    //
    //     });
    //     // rect.fill = 'yellow';
    //     this.add(rect);
    //     this.setActiveObject(rect);
    //     this.selection = false;
    // }

    addRect = (rectNo) => {
        let obj = 0;
        this.canvas.getObjects().forEach(function( o) {
            if(o.id == rectNo) {
                obj = o;
            }
        })
        if(obj==0){
            this.canvas.id= rectNo;
            this.onOff = 'rectUse';
            this.id = rectNo;
            this.canvas.selection = true;
        }else {
            alert('이미 존재합니다.');
        }
        this.setState({
            buttonDis1: true,
            buttonDis2: true,
            buttonDis3: true,
            buttonDis4: true,
            buttonDis5: true,
        });
        console.log(rectNo);
        switch (rectNo) {
            case 1 : console.log('1'); this.setState({buttonDis1: false}); break;
            case 2 : console.log('2');this.setState({buttonDis2: false}); break;
            case 3 : console.log('3');this.setState({buttonDis3: false}); break;
            case 4 : console.log('4');this.setState({buttonDis4: false}); break;
            case 5 : console.log('5');this.setState({buttonDis5: false}); break;
        }
    }


    deleteObject = (rectNo) => {
        let obj = 0;
        this.canvas.getObjects().forEach(function (o) {
            console.log("o : " + o.id);
            if (o.id == rectNo) {
                obj = o;
            }
        })
        let result = true;
        if (obj != 0 && result) {
            result = window.confirm("삭제하시겠습니까?");
            this.canvas.remove(obj);
        }
    }

    delete = () => {
        let result = window.confirm("삭제하시겠습니까?");
        if(result){
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
        this.buttonState();

    }

    doSave = (rectNo) => {
        let objList = [];
        this.canvas.getObjects().forEach(function (o) {
            if(o.id == rectNo){
                objList.push(o);
            }
        })
        this.objectList.push(objList);

        this.deleteAll();
        switch (rectNo) {
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

    submit = () => {

        console.log("objectList : " + this.objectList);
        // this.props.rectStore.objGet(this.objectList);
        // this.props.rectStore.changeNewRectLocationCreatedId(this.props.authStore.loginUser.id);
        // this.props.rectStore.changeNewRectLocationWorkNo(this.props.imageStore.isWorkNo);
        // this.props.rectStore.doRectLocationUp();
    }
    handlePrevious(){
        this.setState({
            count: this.state.count-1
        });
        {this.state.boundaryList.length - this.state.count >=0 ?this.props.imageStore.changeWorkNo(this.state.boundaryList[this.state.count].workNo)
            : alert("첫번째 이미지 입니다.")
        }
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
            workNo: this.props.imageStore.workNo
        })
    }
    handleNext() {
        this.setState({
            count: this.state.count+1
        });
        {this.state.count < this.state.boundaryList.length ?
            this.props.imageStore.changeWorkNo(this.state.boundaryList[this.state.count].workNo)
            :alert("마지막 이미지 입니다.")
        }
        this.setState({
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
            workNo: this.props.imageStore.workNo
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Container component="main" className={classes.mainContainer} style={{height:'97vh', border: '1px solid black'}}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={5} style={{margin:"auto", display:"block"}}>
                            <div style ={{ backgroundColor : "#13264E"}}>
                                <canvas id="c" width= "750" height= "850"  >  </canvas>
                            </div>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <div className={classes.root}>
                                <AppBar position="static">
                                    <Tabs value={this.state.value} onChange={this.handleTabChange} aria-label="simple tabs example">
                                        <Tab label="영역지정" value={0} style={{minWidth:'50%'}}/>
                                        <Tab label="이미지 리스트" value={1} style={{minWidth:'50%'}}/>
                                    </Tabs>
                                </AppBar>
                                <TabPanel value={this.state.value} index={0}>
                                    <Table className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>영역</TableCell>
                                                <TableCell>추가버튼</TableCell>
                                                <TableCell>삭제버튼</TableCell>
                                                <TableCell>저장버튼</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            <TableRow>
                                                <TableCell>상의 영역</TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        onClick={() => this.addRect(1) }
                                                        disabled={this.state.buttonDis1}>
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.delete()} disabled={this.state.buttonDis1}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Save">
                                                        <IconButton aria-label="save" onClick={() => this.doSave(1)} disabled={this.state.buttonDis1}>
                                                            <SaveIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>하의 영역</TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        onClick={() => this.addRect(2) }
                                                        disabled={this.state.buttonDis2}>
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.delete()} disabled={this.state.buttonDis2}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Save">
                                                        <IconButton aria-label="save" onClick={() => this.doSave(2)} disabled={this.state.buttonDis2}>
                                                            <SaveIcon />
                                                        </IconButton>
                                                    </Tooltip>
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
                                                        onClick={() => this.addRect(3) } disabled={this.state.buttonDis3}>
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.delete()} disabled={this.state.buttonDis3}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Save">
                                                        <IconButton aria-label="save" onClick={() => this.doSave(3)} disabled={this.state.buttonDis3}>
                                                            <SaveIcon />
                                                        </IconButton>
                                                    </Tooltip>
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
                                                        onClick={() => this.addRect(4) } disabled={this.state.buttonDis4}>
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.delete()} disabled={this.state.buttonDis4}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Save">
                                                        <IconButton aria-label="save" onClick={() => this.doSave(4)} disabled={this.state.buttonDis4}>
                                                            <SaveIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>악세사리 영역</TableCell>
                                                <TableCell>
                                                    <Button
                                                        type="submit"
                                                        className={classes.buttonType1}
                                                        variant="outlined"
                                                        onClick={() => this.addRect(5) } disabled={this.state.buttonDis5}>
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.delete()} disabled={this.state.buttonDis5}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Save">
                                                        <IconButton aria-label="save" onClick={() => this.doSave(5)} disabled={this.state.buttonDis5}>
                                                            <SaveIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>

                                            </TableRow>
                                        </TableBody>
                                    </Table>



                                    <div style={{backgroundColor: 'grey'}}>
                                        <div align="center">
                                            <Button onClick={this.submit} color={'#999999'}>submit </Button>
                                        </div>
                                    </div>
                                </TabPanel>
                            </div>
                            <TabPanel value={this.state.value} index={1}>
                                <ImageList />
                            </TabPanel>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Test)));