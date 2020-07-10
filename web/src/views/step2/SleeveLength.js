import React from 'react';
import Select from 'react-select';
import axios from "axios";
import {inject, observer} from "mobx-react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {Grid, Button, Typography} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";

const columns = [
    { id: '항목', label: '항목', minWidth: 170 },
];

@inject('basicLabelStore','authStore')
@observer
export default class SelectTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            text: 'text',
            sleeveList: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/basic/sleeve')
            .then(response => {
                const sleeveList = response.data.sleeveList;
                this.setState({
                    sleeveList: sleeveList,
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
    handleClick(sleeve){
        if(this.props.onClick) {
            this.props.onClick(sleeve);
        }
        this.setState({
            open:false,
        })

    }
    render() {
        const {classes} = this.props;
        const {sleeveList}= this.state;
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
                <Paper>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableBody>
                                    {sleeveList.map((sleeve) => (
                                <TableRow onClick={()=>this.handleClick(sleeve)} hover>
                                        <TableCell key={sleeve.no}>
                                            {sleeve.categoryItemName}
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