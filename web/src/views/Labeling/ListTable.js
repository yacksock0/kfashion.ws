import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {Button, Container} from "@material-ui/core";



class Customer extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile"/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.date}</TableCell>
                <TableCell>{this.props.step}</TableCell>
                <TableCell>
                    <Button
                        type="submit"
                        variant="outlined"
                        onClick={this.handleSubmitForm} >
                        레이블링
                    </Button>
                </TableCell>
            </TableRow>
        )
    }
}

export default Customer;

