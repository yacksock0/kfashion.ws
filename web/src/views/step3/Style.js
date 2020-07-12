import React from 'react';
import Select from 'react-select';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Grid, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHeader from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Category from "./Category";
import Chip from "@material-ui/core/Chip";

@inject('professionalLabelStore','authStore')
@observer
export default class SelectTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNo:0,
            selectedName:'',
            selectedSubNo:0,
            selectedSubName:'',
            open: false,
            text: 'text',
            styleList: [],
            selectedOption:null,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleDeleteSub = this.handleDeleteSub.bind(this)
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/style')
            .then(response => {
                const styleList = response.data.styleList;
                this.setState({ styleList : styleList.map(style => {
                        style.value = style.no;
                        style.label = style.categoryItemName;
                        return style
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleClick = (style) => {
        this.setState({
            selectedNo:style.no,
            selectedName:style.categoryItemName
        })
    };
    handleClickSub = (style) =>{
        this.setState({
            selectedSubNo:style.no,
            selectedSubName:style.categoryItemName,
            open:false,
        })
        // if(this.props.onClick) {
        //     this.props.onClick(this.state.selectedNo,this.state.selectedName,
        //         this.state.selectedSubNo,
        //         this.state.selectedSubName);
        // }
    }
    handleClickOpen(){
        this.setState({
            open:true,
        })
    }
    handleClose() {
        this.setState({
            open: false
        });
    }
    handleDelete(){
        this.setState({
            selectedNo:0,
            selectedName:'',
            selectedSubNo:0,
            selectedSubName:'',
        })
    }
    handleDeleteSub(){
        this.setState({
            selectedSubNo: 0,
            selectedSubName: '',
        })
    }
    render() {
        const styleList= this.state.styleList;
        return (
            <div>
                <Grid item xs={12} lg={12}>
                    <div style={{display:'inline'}} >
                        <Typography variant="h5" component="h5" style={{display:'inline'}} >
                            스타일
                        </Typography>
                        <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>선택</Button>
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        <div style={{display:"inline-block", marginRight:10}}>
                        {this.state.selectedNo > 0 ?
                            (<Chip
                                variant="outlined"
                                label={this.state.selectedName}
                                onDelete={this.handleDelete}
                                color="primary"
                            />) : ''
                        }
                        </div>
                        <div style={{display:"inline-block"}}>
                            {this.state.selectedSubNo > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={this.state.selectedSubName}
                                    onDelete={this.handleDeleteSub}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                    </div>
                </Grid>

                <Dialog open={this.state.open} onClose={this.handleClose}
                        maxWidth={"sm"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Grid container style={{height:800}}>
                            <Grid item xs={6}>
                        <Typography variant="h5" component="h2" style={{display:'inline'}}>
                            메인 스타일
                        </Typography>
                                <div style={{display:'inline-block', float:'right', marginTop: -3}}>
                                {this.state.selectedNo > 0 ?
                                    (<Chip
                                        variant="outlined"
                                        label={this.state.selectedName}
                                        onDelete={this.handleDelete}
                                        color="primary"
                                    />) : ''
                                }
                                </div>
                        <hr></hr>
                            <TableContainer>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableBody>
                                        {styleList.map((style) => (
                                            <TableRow onClick={()=>this.handleClick(style)} hover>
                                                <TableCell key={style.no}>
                                                    {style.categoryItemName}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={5}>
                                <Typography variant="h5" component="h2">
                                    서브 스타일
                                </Typography>
                                <hr></hr>
                                <TableContainer>
                                    <Table stickyHeader aria-label="sticky table">
                                        {!this.state.selectedNo == 0 ?
                                        <TableBody>
                                            {styleList.map((style) =>(
                                                <TableRow onClick={()=>this.handleClickSub(style)} hover>
                                                    <TableCell key={style.no}>
                                                        {style.categoryItemName}
                                                    </TableCell>
                                                </TableRow>
                                                ))}
                                        </TableBody>
                                        : ''}
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}