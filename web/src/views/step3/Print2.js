import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Grid, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

@inject('professionalLabelStore','authStore')
@observer
export default class Print extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            text: 'text',
            printList2: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/print')
            .then(response => {
                const printList2 = response.data.printList1;
                this.setState({ printList2 : printList2})
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
    handleClick(print){
        if(this.props.onClick) {
            this.props.onClick(print);
        }
        this.props.professionalLabelStore.openPrintDialLog(false);
    }
    render() {
        const printList2= this.state.printList2;
        const {topReviewLabel} = this.props.professionalLabelStore;
        const printCheck =topReviewLabel.printItemName2;
        return (
            <div>
                <Button variant="outlined" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.state.open} onClose={this.handleClose} style={{marginLeft:'50%', marginTop:'-7%'}}
                        maxWidth={"sm"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                            프린트
                        </Typography>
                        <hr></hr>
                        <Grid container>
                            {printList2.map((print) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button
                                            style={{width:'100%', height:30, padding:0}}
                                            variant="outlined"
                                            key={print.no}
                                            disabled = {printCheck != undefined?
                                                print.categoryItemName == printCheck.filter((check) => check==print.categoryItemName
                                                ) : ""
                                            }
                                            onClick={() => this.handleClick(print)}>
                                            <h4>{print.categoryItemName}</h4>
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