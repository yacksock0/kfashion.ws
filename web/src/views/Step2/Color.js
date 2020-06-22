import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import {inject, observer} from "mobx-react";

@inject('secondStepStore')
@observer
export default class Color extends React.Component {
    componentDidMount() {
        this.props.secondStepStore.loadColorList();
    }
    render(){
        const {colorList} = this.props.secondStepStore;
        return(
            <Table stickyHeader size="small" aria-label="a dense table, sticky table" >
                <TableHead>
                    <TableRow>
                        <TableCell>Label</TableCell>
                        <TableCell>Main</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {colorList.length > 0 ?
                        colorList.map((color) =>
                            <TableRow key={color.no}>
                                <TableCell>
                                    {color.no}
                                </TableCell>
                                <TableCell>
                                    {color.categoryItemName}
                                </TableCell>
                            </TableRow>
                        )
                        :
                        <TableRow>

                        </TableRow>
                    }
                </TableBody>
            </Table>
        );
    }
};