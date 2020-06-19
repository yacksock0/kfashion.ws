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
        this.props.categoryStore.loadColorList();
    }

    handleChangeColor = (e) => {
        this.props.categoryStore.changeColor();
    }

    render(){
        const {colorList} = this.props.categoryStore;
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

                <TableBody>
                    {colorList.length > 0 ?
                        colorList.map((color) =>
                            <TableRow key={color.color_name}>
                                <TableCell>
                                    {color.color_name}
                                </TableCell>
                                <TableCell>
                                    {color.color_hexcode}
                                </TableCell>
                                <TableCell>
                                    {color.color_rgb}
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