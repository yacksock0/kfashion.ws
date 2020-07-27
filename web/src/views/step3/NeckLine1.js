import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Grid, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

@inject('professionalLabelStore','authStore')
@observer
export default class NeckLine1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            text: 'text',
            neckLineList1: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/neckLine')
            .then(response => {
                const neckLineList1 = response.data.neckLineList1;
                this.setState({
                    neckLineList1: neckLineList1,
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleClickOpen() {
       this.props.professionalLabelStore.openNeckLineDialLog(true);
    }
    handleClose() {
        this.props.professionalLabelStore.openNeckLineDialLog(false);
    }
    handleClick(neckLine){
        if(this.props.onClick) {
            this.props.onClick(neckLine);
        }
        this.props.professionalLabelStore.openNeckLineDialLog(false);
    }

    render() {
        const neckLineList1= this.state.neckLineList1;
        return (
            <div>
                <Button variant="outlined" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.props.professionalLabelStore.menuOpen.neckLineDialLog} onClose={this.handleClose} style={{marginLeft:'50%', marginTop:'-7%'}}
                        maxWidth={"sm"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                           넥라인
                        </Typography>
                        <hr></hr>
                        <Grid container>
                            {neckLineList1.map((neckLine) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button style={{width:'100%', height:30, padding:0}} variant="outlined" key={neckLine.no} onClick={() => this.handleClick(neckLine)}>
                                            <h4>{neckLine.categoryItemName}</h4>
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