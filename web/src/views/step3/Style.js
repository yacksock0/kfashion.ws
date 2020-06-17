import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

function createStyleData(label, main, sub) {
    return { label, main, sub};
}

export default class Style extends React.Component {
    render(){
        const styleRows = [
            createStyleData('Frozen yoghurt', <FormControlLabel control={<Radio />} />, <FormControlLabel control={<Radio />} />),
            createStyleData('Ice cream sandwich', <FormControlLabel control={<Radio />} />, <FormControlLabel control={<Radio />} />),
        ];
        return(
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Label</TableCell>
                        <TableCell>Main</TableCell>
                        <TableCell>Sub</TableCell>
                    </TableRow>
                </TableHead>
                {styleRows.map((row) => (
                    <TableRow key={row.label}>
                        <TableCell>{row.label}</TableCell>
                        <TableCell>{row.main}</TableCell>
                        <TableCell>{row.sub}</TableCell>
                    </TableRow>
                ))}
            </Table>
        );
    }
};
