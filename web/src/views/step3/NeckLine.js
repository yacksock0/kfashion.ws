import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import React from "react";
import {inject, observer} from "mobx-react";
import TableContainer from "@material-ui/core/TableContainer";
import {Checkbox} from "@material-ui/core";

@inject('thirdStepStore')
@observer
export default class Category extends React.Component {
    componentDidMount() {
        this.props.thirdStepStore.loadNeckLineList();
    }

    render(){
        const {neckLineList} = this.props.thirdStepStore;
        return(
            <TableContainer style={{maxHeight:100}}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Label</TableCell>
                            <TableCell>Main</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {neckLineList.length > 0 ?
                            neckLineList.map((neckLine) =>
                                <TableRow key={neckLine.no}>
                                    <TableCell>
                                        {neckLine.categoryItemName}
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