import React from 'react';
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
export default class Fit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            text: 'text',
            fitList0: [],
            fitList3:[],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/fit')
            .then(response => {
                console.log(response.data.fitList0);
                console.log(response.data.fitList3);
                const fitList0 = response.data.fitList0;
                const fitList3 = response.data.fitList3;
                this.setState({fitList0:fitList0,
                    fitList3: fitList3,
                    })
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
    handleClick(fit){
        if(this.props.onClick) {
            this.props.onClick(fit);
        }
        this.setState({
            open:false,
        })

    }
    render() {
        const fitList0= this.state.fitList0;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}
                        maxWidth={"md"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                            핏
                        </Typography>
                        <hr></hr>
                        <Grid container>
                            {fitList0.map((fit) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:10}}>
                                        <Button style={{width:'100%', height:60}} variant="outlined" key={fit.no} onClick={() => this.handleClick(fit)}>
                                            <h2>{fit.categoryItemName}</h2>
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