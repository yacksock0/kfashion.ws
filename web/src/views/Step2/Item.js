import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import axios from "axios";

function createData(label, main) {
    return { label, main};
}

export default class Item extends React.Component {
    componentDidMount() {
        const getBreeds = () => {
            try {
                return axios.get('api/v1/basic');
                } catch (error) {
                console.error(error)
            }
        };
        const countBreeds = async () => {
            const breeds = await getBreeds();

            if (breeds.data) {
                console.log(`${Object.entries(breeds.data)}`);
            }
        };
        countBreeds();
    }


    render(){
        const ItemRows = [
            createData('Frozen yoghurt', <FormControlLabel value="male" control={<Radio />}  />),
            createData('Ice cream sandwich', <FormControlLabel value="male" control={<Radio />} />),
        ];
        return(
        <Table size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell>Label</TableCell>
                    <TableCell>Main</TableCell>
                </TableRow>
            </TableHead>
            {ItemRows.map((row) => (
                <TableRow key={row.label}>
                    <TableCell>{row.label}</TableCell>
                    <TableCell>{row.main}</TableCell>
                </TableRow>
            ))}
        </Table>
        );
    }
};