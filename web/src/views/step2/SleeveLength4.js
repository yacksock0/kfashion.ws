import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {Grid, Button, Typography} from "@material-ui/core";

const columns = [
    { id: '항목', label: '항목', minWidth: 170 },
];

@inject('basicLabelStore','authStore')
@observer
export default class SleeveLength4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            text: 'text',
            sleeveList4: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/basic/sleeve')
            .then(response => {
                const sleeveList4 = response.data.sleeveList4;
                this.setState({
                    sleeveList4: sleeveList4,
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
    handleClick(sleeve4){
        if(this.props.onClick) {
            this.props.onClick(sleeve4);
        }
        this.setState({
            open:false,
        })

    }
    render() {
        const {classes} = this.props;
        const {sleeveList4}= this.state;
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
                        {sleeveList4.map((sleeve4) =>
                            <Grid item xs={3}>
                                <div style={{textAlign:'center', margin:10}}>
                                    <Button style={{width:'100%', height:60}} variant="outlined" key={sleeve4.no} onClick={() => this.handleClick(sleeve4)}>
                                        <h2>{sleeve4.categoryItemName}</h2>
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