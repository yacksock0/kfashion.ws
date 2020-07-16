import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {Grid, Button, Typography} from "@material-ui/core";

const columns = [
    { id: '항목', label: '항목', minWidth: 170 },
];

@inject('basicLabelStore','authStore','basicCategoryStore')
@observer
export default class SleeveLength2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            text: 'text',
            sleeveList2: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {

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
    handleClick(sleeve2){
        if(this.props.onClick) {
            this.props.onClick(sleeve2);
        }
        this.setState({
            open:false,
        })

    }
    render() {
        const {classes} = this.props;
        const {sleeveList2}= this.props.basicCategoryStore;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>소매기장</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}
                        maxWidth={"sm"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                <DialogContent>
                    <Typography variant="h5" component="h2">
                        소매기장
                    </Typography>
                    <hr></hr>
                    <Grid container>
                        {sleeveList2.map((sleeve2) =>
                            <Grid item xs={3}>
                                <div style={{textAlign:'center', margin:10}}>
                                    <Button style={{width:'100%', height:60}} variant="outlined" key={sleeve2.no} onClick={() => this.handleClick(sleeve2)}>
                                        <h2>{sleeve2.categoryItemName}</h2>
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