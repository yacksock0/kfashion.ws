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
export default class Safe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            text: 'text',
            safeList: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/safe')
            .then(response => {
                const safeList = response.data.safeList;
                this.setState({ safeList : safeList})
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
    handleClick(safe){
        if(this.props.onClick) {
            this.props.onClick(safe);
        }
        this.setState({
            open:false,
        })

    }
    render() {
        const safeList= this.state.safeList;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>세이프</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}
                        maxWidth={"sm"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                            세이프
                        </Typography>
                        <hr></hr>
                        <Paper>
                            <TableContainer>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableBody>
                                        {safeList.map((safe) => (
                                            <TableRow onClick={()=>this.handleClick(safe)} hover>
                                                <TableCell key={safe.no}>
                                                    {safe.categoryItemName}
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