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
export default class ColorKara extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            text: 'text',
            karaList: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/kara')
            .then(response => {
                const karaList = response.data.karaList;
                this.setState({ karaList : karaList})
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
    handleClick(kara){
        if(this.props.onClick) {
            this.props.onClick(kara);
        }
        this.setState({
            open:false,
        })
    };

    render() {
        const karaList= this.state.karaList;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}
                        maxWidth={"md"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                            카라
                        </Typography>
                        <hr></hr>
                            <TableContainer>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableBody>
                                        {karaList.map((kara) => (
                                            <TableRow onClick={()=>this.handleClick(kara)} hover>
                                                <TableCell key={kara.no}>
                                                    {kara.categoryItemName}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}