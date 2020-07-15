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
export default class ClothLength extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            open: false,
            lengthList0: [],
            lengthList1: [],
            lengthList2: [],
            lengthList3: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/length')
            .then(response => {
                console.log(response.data.lengthList0);
                console.log(response.data.lengthList1);
                console.log(response.data.lengthList2);
                console.log(response.data.lengthList3);
                const lengthList0 = response.data.lengthList0;
                const lengthList1 = response.data.lengthList1;
                const lengthList2 = response.data.lengthList2;
                const lengthList3 = response.data.lengthList3;
                this.setState({lengthList0:lengthList0,
                    lengthList1: lengthList1,
                    lengthList2: lengthList2,
                    lengthList3: lengthList3})
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
    handleClick(length) {
        if (this.props.onClick) {
            this.props.onClick(length);
        }
        this.setState({
            open: false,
        })
    }
    render() {
        const lengthList0= this.state.lengthList0;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.state.open} onClose={this.handleClose} style={{marginLeft:'50%', marginTop:'-7%'}}
                        maxWidth={"sm"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                            기장
                        </Typography>
                        <hr></hr>
                        <Grid container>
                            {lengthList0.map((length) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:10}}>
                                        <Button style={{width:'100%', height:60, padding:0}} variant="outlined" key={length.no} onClick={() => this.handleClick(length)}>
                                            <h2>{length.categoryItemName}</h2>
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