import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Grid, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

@inject('professionalLabelStore','authStore')
@observer
export default class Fit1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            text: 'text',
            fitList1: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/fit')
            .then(response => {
                const fitList1 = response.data.fitList1;
                const fitList2 = response.data.fitList2;
                const fitList3 = response.data.fitList3;
                const fitList4 = response.data.fitList4;
                this.setState({fitList1:fitList1,
                    fitList2: fitList2,
                    fitList3: fitList3,
                    fitList4: fitList4,
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleClickOpen() {
        this.props.professionalLabelStore.openFitDialLog(true);
    }
    handleClose() {
        this.props.professionalLabelStore.openFitDialLog(false);
    }
    handleClick(fit){

        if(this.props.onClick) {
            this.props.onClick(fit);
        }
        this.props.professionalLabelStore.openFitDialLog(false);
    }
    render() {
        const fitList1= this.state.fitList1;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.props.professionalLabelStore.menuOpen.fitDialLog} onClose={this.handleClose} style={{marginLeft:'50%', marginTop:'-7%'}}
                        maxWidth={"sm"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                            핏
                        </Typography>
                        <hr></hr>
                        <Grid container>
                            {fitList1.map((fit) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button style={{width:'100%', height:30, padding:0}} variant="outlined" key={fit.no} onClick={() => this.handleClick(fit)}>
                                            <h4>{fit.categoryItemName}</h4>
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