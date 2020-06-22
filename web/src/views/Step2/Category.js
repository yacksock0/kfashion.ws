import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {inject, observer} from "mobx-react";

function createData(label, main) {
    return { label, main};
}

@inject('categoryStore')
@observer
export default class Category extends React.Component {
    componentDidMount() {
        this.props.categoryStore.loadCategoryList();
    }

    handleChangeColor = (e) => {
        this.props.categoryStore.changeCategory();
    }

    render(){
        const {categoryList} = this.props.categoryStore;
        return(
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Label</TableCell>
                        <TableCell>Main</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {categoryList.length > 0 ?
                        categoryList.map((category) =>
                            <TableRow key={category.categoryItemName}>
                                <TableCell>
                                    {category.categoryItemName}
                                </TableCell>
                                <TableCell>
                                    {category.categoryItemName}
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