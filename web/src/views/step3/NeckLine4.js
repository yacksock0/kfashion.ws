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
            neckLineList4: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/neckLine')
            .then(response => {
                const neckLineList4 = response.data.neckLineList4;
                this.setState({
                    neckLineList4: neckLineList4,
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
    handleClick(neckLine){
        if(this.props.onClick) {
            this.props.onClick(neckLine);
        }
        this.setState({
            open:false,
        })

    }

    render() {
        const neckLineList4= this.state.neckLineList4;
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
                           넥라인
                        </Typography>
                        <hr></hr>
                        <Grid container>
                            {neckLineList4.map((neckLine) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button style={{width:'100%', height:30, padding:0}} variant="outlined" key={neckLine.no} onClick={() => this.handleClick(neckLine)}>
                                            <h2>{neckLine.categoryItemName}</h2>
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