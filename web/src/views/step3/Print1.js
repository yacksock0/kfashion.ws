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
            printList1: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/print')
            .then(response => {
                const printList1 = response.data.printList1;
                this.setState({ printList1 : printList1})
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleClickOpen() {
        this.props.professionalLabelStore.openPrintDialLog(true);
    }
    handleClose() {
        this.props.professionalLabelStore.openPrintDialLog(false);
    }
    handleClick(print){
        if(this.props.onClick) {
            this.props.onClick(print);
        }
    }
    handledDetailClose(){
        this.props.professionalLabelStore.openPrintDialLog(false);
    }
    render() {
        const printList1= this.state.printList1;
        const {outerReviewLabel} = this.props.professionalLabelStore;
        const printCheck =outerReviewLabel.printItemName1;
        return (
            <div>
                <Button variant="outlined" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.props.professionalLabelStore.menuOpen.printDialLog} onClose={this.handleClose} style={{marginLeft:'50%', marginTop:'-7%'}}
                        maxWidth={"sm"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2" style={{display:'inline'}}>
                            프린트
                        </Typography>
                        <Button
                            style={{width:20, height:40, padding:0, float:'right', marginTop:-3}}
                            variant="outlined"
                            onClick={() => this.handledDetailClose()}>
                            <h4>닫기</h4>
                        </Button>
                        <hr></hr>
                        <Grid container>
                            {printList1.map((print) =>
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