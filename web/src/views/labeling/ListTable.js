import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {Button, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Link} from "react-router-dom";
import ComputerIcon from "@material-ui/icons/Computer";



class Customer extends React.Component {

    render() {
        return (
            <TableRow>
                <TableCell>{this.props.workNo}</TableCell>
                <TableCell><img src={this.props.imgData} alt="profile"/></TableCell>
                <TableCell>{this.props.createdId}</TableCell>
                <TableCell>{this.props.createdDatetime}</TableCell>
                <TableCell>
                    <Link to="/Step/BoundaryBox">
                    <Button
                        type="submit"
                        variant="outlined"
                        onClick="/Step/BoundaryBox" >
                        레이블링
                    </Button>
                    </Link>
                </TableCell>
            </TableRow>
        )
    }
}
export default Customer;

