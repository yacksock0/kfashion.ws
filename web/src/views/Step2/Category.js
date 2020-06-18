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

export default class Category extends React.Component {
    render(){
        const CategoryRows = [
            createData('드레스', <FormControlLabel value="male" control={<Radio />}  />),
            createData('치마', <FormControlLabel value="male" control={<Radio />} />),
            createData('바지', <FormControlLabel value="male" control={<Radio />} />),
            createData('티셔츠', <FormControlLabel value="male" control={<Radio />} />),
        ];
        return(
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Label</TableCell>
                        <TableCell>Main</TableCell>
                    </TableRow>
                </TableHead>
                {CategoryRows.map((row) => (
                    <TableRow key={row.label}>
                        <TableCell>{row.label}</TableCell>
                        <TableCell>{row.main}</TableCell>
                    </TableRow>
                ))}
            </Table>
        );
    }
};