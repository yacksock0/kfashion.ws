import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Typography} from "@material-ui/core";
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
export default class Print extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            text: 'text',
            printList: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/print')
            .then(response => {
                const printList = response.data.printList;
                this.setState({ printList : printList})
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
        this.setState({
            open:false,
        })

    }
    render() {
        const printList= this.state.printList;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}
                        maxWidth={"sm"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                            프린트
                        </Typography>
                        <hr></hr>
                        <Paper>
                            <TableContainer>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableBody>
                                        {printList.map((print) => (
                                            <TableRow onClick={()=>this.handleClick(print)} hover>
                                                <TableCell key={print.no}>
                                                    {print.categoryItemName}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}