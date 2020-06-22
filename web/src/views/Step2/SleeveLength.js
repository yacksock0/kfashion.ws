import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TableBody from "@material-ui/core/TableBody";
import {inject, observer} from "mobx-react";

@inject('secondStepStore')
@observer
export default class SleeveLength extends React.Component {
    componentDidMount() {
        this.props.secondStepStore.loadSleeveList();
    }
    render(){
        const {sleeveLengthList} = this.props.secondStepStore;
        return(
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Label</TableCell>
                        <TableCell>Main</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sleeveLengthList.length > 0 ?
                        sleeveLengthList.map((sleeve) =>
                            <TableRow key={sleeve.no}>
                                <TableCell>
                                    {sleeve.no}
                                </TableCell>
                                <TableCell>
                                    {sleeve.categoryItemName}
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
