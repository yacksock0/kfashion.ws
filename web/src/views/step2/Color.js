import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import React from "react";
import {inject, observer} from "mobx-react";
import {Checkbox} from "@material-ui/core";

@inject('secondStepStore')
@observer
export default class Color extends React.Component {
    componentDidMount() {
        this.props.secondStepStore.loadColorList();
    }
    render(){
        const {colorList} = this.props.secondStepStore;
        return(
            <TableContainer style={{maxHeight:250}}>
                <Table stickyHeader size="small" aria-label="a dense table sticky table" >
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
                                        {color.categoryItemName}
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox color="primary"/>
                                    </TableCell>
                                </TableRow>
                            )
                            :
                            ''
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
};
