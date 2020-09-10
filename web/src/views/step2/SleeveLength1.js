import React from 'react';
import {inject, observer} from "mobx-react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {Grid, Button, Typography} from "@material-ui/core";


@inject('authStore','basicCategoryStore', 'checkHighLabelStore')
@observer
export default class SleeveLength1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            text: 'text',
            sleeveList1: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
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
    handleClick(sleeve1){
        this.props.checkHighLabelStore.changeNewBasicLabelSleeveLength1(sleeve1);
        this.setState({
            open:false,
        })

    }
    render() {
        const {sleeveList1}= this.props.basicCategoryStore;
        return (
            <div>
                <Button variant="outlined" onClick={this.handleClickOpen}>소매기장</Button>
                <Dialog open={this.state.open} onClose={this.handleClose} style={{marginLeft:'50%'}}
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
                        {sleeveList1.map((sleeve1) =>
                            <Grid item xs={3}>
                                <div style={{textAlign:'center', margin:10}}>
                                    <Button style={{width:'100%', height:60}} variant="outlined" key={sleeve1.no} onClick={() => this.handleClick(sleeve1)}>
                                        <h2>{sleeve1.categoryItemName}</h2>
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