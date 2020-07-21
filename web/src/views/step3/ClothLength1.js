import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Grid, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

@inject('professionalLabelStore','authStore')
@observer
export default class ClothLength1 extends React.Component {
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
                const lengthList1 = response.data.lengthList1;
                const lengthList2 = response.data.lengthList2;
                const lengthList3 = response.data.lengthList3;
                const lengthList4 = response.data.lengthList4;
                this.setState({lengthList1:lengthList1,
                    lengthList2: lengthList2,
                    lengthList3: lengthList3,
                    lengthList4: lengthList4})
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleClickOpen() {
     this.props.professionalLabelStore.openClothLength(true)
    }
    handleClose() {
        this.props.professionalLabelStore.openClothLength(false)
    }
    handleClick(length) {
        if (this.props.onClick) {
            this.props.onClick(length);
        }
        this.props.professionalLabelStore.openClothLength(false)
    }
    render() {
        const lengthList1= this.state.lengthList1;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.props.professionalLabelStore.menuOpen.clothLengthDialLog} onClose={this.handleClose} style={{marginLeft:'50%', marginTop:'-7%'}}
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
                            {lengthList1.map((length) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button style={{width:'100%', height:30, padding:0}} variant="outlined" key={length.no} onClick={() => this.handleClick(length)}>
                                            <h4>{length.categoryItemName}</h4>
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