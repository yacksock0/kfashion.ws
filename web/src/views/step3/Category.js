import React from 'react';
import Select from 'react-select';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Grid, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";



@inject('professionalLabelStore','authStore')
@observer
export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            open: false,
            categoryList0: [],
            categoryList1: [],
            categoryList2: [],
            categoryList3: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/category')
            .then(response => {
                console.log(response.data.categoryList0);
                console.log(response.data.categoryList1);
                console.log(response.data.categoryList2);
                console.log(response.data.categoryList3);
                const categoryList0 = response.data.categoryList0;
                const categoryList1 = response.data.categoryList1;
                const categoryList2 = response.data.categoryList2;
                const categoryList3 = response.data.categoryList3;
                this.setState({categoryList0:categoryList0,
                                    categoryList1: categoryList1,
                                    categoryList2: categoryList2,
                                    categoryList3: categoryList3})
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleClickOpen() {
        this.setState({
            open: true
        });
    }
    handleClose() {
        this.setState({
            open: false
        });
    }
    handleClick(category){
        if(this.props.onClick) {
            this.props.onClick(category);
        }
        this.setState({
            open:false,
        })

    }

    render() {
        const categoryList0= this.state.categoryList0;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}
                        maxWidth={"sm"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                            카테고리
                        </Typography>
                        <hr></hr>
                        <Grid container>
                            {categoryList0.map((category) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:10}}>
                                        <Button style={{width:'100%', height:60}} variant="outlined" key={category.no} onClick={() => this.handleClick(category)}>
                                            <h2>{category.categoryItemName}</h2>
                                        </Button>
                                    </div>
                                </Grid>
                            )
                            }
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}