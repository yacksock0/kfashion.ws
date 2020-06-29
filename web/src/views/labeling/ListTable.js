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
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile"/></TableCell>
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.date}</TableCell>
                <TableCell>{this.props.step}</TableCell>
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

