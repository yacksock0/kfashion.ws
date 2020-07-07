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
class BoundaryBox extends React.Component {

    i=0;
    width;
    height;
    canvas;
    text;
    fill;
    x;
    y;
    id = []

    state = {
        imgData :'',
        workNo:'',
        value:1,
        count:0,
        winheight: 0,
        winwidth: 0
    }
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
            width : 200,
            height : 200,
            originX: 'left',
            originY: 'top'
        });

        this.canvas.on('object:moving', function (e) {
            const asd = e.target;
            console.log("name : "+asd.name);

        });


        this.canvas.on('mouse:move', (e) => {
            console.log("mouse.x : " +e.pointer.x);
            console.log("mouse.y : " +e.pointer.y);
            if(e.pointer.x <700){
                // e.pointer.x-10;
            }
        });

        const maxScaleX = 3.2;
        const maxScaleY = 3.2;
        this.canvas.on('object:scaling', function (e) {
            const obj = e.target;
            console.log(obj.scaleX);
            obj.setCoords();
            // top-left  corner
            if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
                obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
                obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
            }
            // bot-right corner
            if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
                obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
                obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
            }

            if(obj.scaleX > maxScaleX) {
                obj.scaleX = maxScaleX;
                obj.left = obj.lastGoodLeft;
                obj.top = obj.lastGoodTop;
            }
            if(obj.scaleY > maxScaleY) {
                obj.scaleY = maxScaleY;
                obj.left = obj.lastGoodLeft;
                obj.top = obj.lastGoodTop;
            }
            obj.lastGoodTop = obj.top;
            obj.lastGoodLeft = obj.left;
        });
        // // --END  < Testing... >

        // -- START  < rect가 canvas를 못벗어나도록... >
        this.canvas.on('object:moving', function (e) {
            const obj = e.target;
            // if object is too big ignore
            if(obj.height > obj.canvas.height || obj.width > obj.canvas.width){
                return;
            }
            obj.setCoords();
            // top-left  corner
            if(obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0){
                obj.top = Math.max(obj.top, obj.top-obj.getBoundingRect().top);
                obj.left = Math.max(obj.left, obj.left-obj.getBoundingRect().left);
            }
            // bot-right corner
            if(obj.getBoundingRect().top+obj.getBoundingRect().height  > obj.canvas.height || obj.getBoundingRect().left+obj.getBoundingRect().width  > obj.canvas.width){
                obj.top = Math.min(obj.top, obj.canvas.height-obj.getBoundingRect().height+obj.top-obj.getBoundingRect().top);
                obj.left = Math.min(obj.left, obj.canvas.width-obj.getBoundingRect().width+obj.left-obj.getBoundingRect().left);
            }
        });
        // --END  < rect가 canvas를 못벗어나도록... >
    }

    addRect = (rectNo) => {
        this.id = rectNo;
        let obj = 0;
        this.canvas.getObjects().forEach(function( o) {
            if(o.id == rectNo) {
                obj = o;
            }
        })
        if(obj==0){
            const rect = new fabric.Rect({
                id : `${rectNo}`,
                name : `${rectNo}`,
                left: 100,
                top: 100,
                width: 600,
                height: 800,
                fill: grey,
                opacity: 0.20
            });

            this.canvas.add(rect);
            this.canvas.setActiveObject(rect);
        }else {
            alert('이미 존재합니다.');
        }
    }

    deleteObject = (rectNo) => {
        let obj = 0;
        this.canvas.getObjects().forEach(function( o) {
            console.log("o : " +o.id);
            if(o.id == rectNo) {
                obj = o;
            }
        })
        this.canvas.remove(obj);
    }

    SelectObject = (j) => {
        let obj = 0;
        this.canvas.getObjects().forEach(function( o) {
            console.log("o : " +o.id);
            if(o.id === j) {
                obj = o;
            }
        })
        this.canvas.setActiveObject(obj);
        this.canvas.renderAll();
    }


    submit = () => {
        this.props.rectStore.objGet(this.canvas.getObjects());
        this.props.rectStore.changeNewRectLocationCreatedId(this.props.authStore.loginUser.id);
        this.props.rectStore.changeNewRectLocationWorkNo(this.props.imageStore.isWorkNo);
        this.props.rectStore.doRectLocationUp();
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

    handleClickItem = (workNo, imageData) => {
        this.props.imageStore.changeWorkNo(workNo);
        this.canvas.setBackgroundImage(`/api/v1/kfashion/img/getByteImage?workNo=${workNo}`, this.canvas.renderAll.bind(this.canvas), {
            left: 25,
            top: 25,
            width : 200,
            height : 200,
            originX: 'left',
            originY: 'top'
        });
    }

    render() {
        const { classes } = this.props;
        const {workNo} = this.props.imageStore;

        return (
            <Container component="main" className={classes.mainContainer} style={{height:'97vh'}}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={5} style={{margin:"auto", display:"block"}}>
                            <div style ={{ backgroundColor : "#13264E"}}>
                                <canvas id="c" width={600} height={800} className={classes.canvas}>  </canvas>

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
                                                        onClick={() => this.addRect(1) } >
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteObject(1)}>
                                                            <DeleteIcon />
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
                                                        onClick={() => this.addRect(2) } >
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteObject(2)}>
                                                            <DeleteIcon />
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
                                                        onClick={() => this.addRect(3) } >
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteObject(3)}>
                                                            <DeleteIcon />
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
                                                        onClick={() => this.addRect(4) } >
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteObject(4)}>
                                                            <DeleteIcon />
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
                                                        onClick={() => this.addRect(5) } >
                                                        rect <AddIcon/>
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Delete">
                                                        <IconButton aria-label="delete" onClick={() => this.deleteObject(5)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                            <div style={{backgroundColor: 'grey'}}>
                                <div align="center">
                                    <Button onClick={this.submit} >submit </Button>
                                </div>
                            </div>
                        </TabPanel>
                            </div>
                                <TabPanel value={this.state.value} index={1}>
                                    <ImageList onClick={this.handleClickItem} />
                                </TabPanel>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <hr></hr>
                    <Button
                        type="submit"
                        className={classes.buttonType1}
                        variant="outlined"
                        onClick={this.handlePrevious.bind(this)} >
                        Previous
                    </Button>
                    <Button
                        type="submit"
                        className={classes.buttonType1}
                        variant="outlined"
                        onClick={this.handleNext.bind(this)} >
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

export default withSnackbar(withRouter(withStyles(styles) (BoundaryBox)));