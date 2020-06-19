import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import React from "react";
import TableBody from "@material-ui/core/TableBody";
import {inject, observer} from "mobx-react";

@inject('secondStepStore')
@observer
export default class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = []
    }
    componentDidMount() {
    }
render(){
        return(
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Label</TableCell>
                        <TableCell>Main</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                </TableBody>
            </Table>
        );
    }
};