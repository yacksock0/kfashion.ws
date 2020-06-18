import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

function createData(label, main) {
    return { label, main};
}

export default class Print extends React.Component {
    render(){
        const PrintRows = [
            createData('꽃무늬', <FormControlLabel value="male" control={<Radio />}  />),
            createData('가로 줄무늬', <FormControlLabel value="male" control={<Radio />} />),
            createData('세로 줄무늬', <FormControlLabel value="male" control={<Radio />} />),
        ];
        return(
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Label</TableCell>
                        <TableCell>Main</TableCell>
                    </TableRow>
                </TableHead>
                {PrintRows.map((row) => (
                    <TableRow key={row.label}>
                        <TableCell>{row.label}</TableCell>
                        <TableCell>{row.main}</TableCell>
                    </TableRow>
                ))}
            </Table>
        );
    }
};
