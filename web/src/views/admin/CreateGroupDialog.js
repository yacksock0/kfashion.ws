import React from 'react';
import {inject, observer} from "mobx-react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

@inject('createGroupDialogStore')
@observer
export default class CreateGroupDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            open: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
    }
    handleClickOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            groupName: '',
            open: false
        })
    }
    componentDidMount() {
        this.props.createGroupDialogStore.loadGroupList();
    }

    render() {
        const {groupList} = this.props.createGroupDialogStore;
        return (
            <div>
            <TableContainer style={{maxHeight:300}}>
                <Table stickyHeader size="small" aria-label="a dense table sticky table" >
                    <TableHead>
                        <TableRow>
                            <TableCell>그룹번호</TableCell>
                            <TableCell>그룹명</TableCell>
                            <TableCell>그룹권한</TableCell>
                            <TableCell>생성일</TableCell>
                            <TableCell>수정일</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groupList.length > 0 ?
                            groupList.map((group) =>
                                <TableRow key={group.no}>
                                    <TableCell>
                                        {group.no}
                                    </TableCell>
                                    <TableCell>
                                        {group.groupName}
                                    </TableCell>
                                    <TableCell>
                                        {group.groupName}
                                    </TableCell>
                                    <TableCell>
                                        {group.createdDatetime}
                                    </TableCell>
                                    <TableCell>
                                        {group.updatedDatetime}
                                    </TableCell>

                                </TableRow>
                            )
                            :
                            ''
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        <hr></hr>
        </div>
        );
    }
}