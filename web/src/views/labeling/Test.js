import React, {forwardRef} from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Container, Typography} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Customer from './ListTable'
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Edit from "@material-ui/icons/Edit";
import SaveAlt from "@material-ui/icons/SaveAlt";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Remove from "@material-ui/icons/Remove";
import ViewColumn from "@material-ui/icons/ViewColumn";


const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    table: {
        minWidth: 1080
    },
    mainContainer: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
    },
    content:{
        margin: 15,
        display: 'flex',
        flexDirection: 'column',

    },
    buttonType1:{
        width: 100,
        marginRight: theme.spacing(2),
    },
    buttonType2:{
        width: 150,
        float:'right',
    },
});
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

// const customers = [
//
//     {
//         'workNo': 2,
//         'imgData': 'https://placeimg.com/48/48/2',
//         'createdId': '나동빈',
//         'createdDatetime': '200516',
//     },
//     {
//         'workNo': 3,
//         'imgData': 'https://placeimg.com/48/48/3',
//         'createdId': '이순신',
//         'createdDatetime': '200614',
//     }
// ]


class Test extends React.Component {

    state = {
        loading: false,
        boundaryList : [],
        data: [],
        columns: [
            { title: '번호', field: 'workNo', filterPlaceholder: 'workNo filter', tooltip: 'workNo로 정렬', editPlaceholder: 'workNo 입력'},
            { title: '이미지', field: '',type: 'byte'},
            { title: '작성자', field: 'createdId', type: 'string'},
            { title: '날짜', field: 'createdDatetime', type: 'date'},
            // { title: '작업하기', field: '', type: 'string'},
        ],
    }
    componentDidMount() {
        this.setState({ loading: true })
        axios.get('/api/v1/kfashion/img/boundaryList')
            .then(response => response.data.boundaryList.filter(b => b !== null))
            .then(res => {
                this.setState({
                    const boundaryList = response.data.boundaryList;
                    boundaryList : Customer.map(b => {
                        b.workNo  = b.workNo;
                        b.imgData = b.imgData;
                        b.createdId = b.createdId;
                        b.createdDatetime = b.createdDatetime;

                        return b
                    }), loading: false },)

            })
            .catch(error => {
                console.log(error)
            })
    }


    render() {
        const { classes } = this.props;
        const {boundaryList} = this.state;

        return (

            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />


                <div style={{ maxWidth: "100%" }}>

                    <MaterialTable
                        icons={tableIcons}
                        columns={this.state.columns}
                        data={this.state.boundaryList}
                        title="BoundaryBoxList"
                        editable={{
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        {
                                            /* let data = this.state.data;
                                            const index = data.indexOf(oldData);
                                            data.splice(index, 1);
                                            this.setState({ data }, () => resolve()); */
                                        }
                                        resolve();
                                    }, 1000);
                                })
                        }}
                    />
                </div>
                {/*<hr></hr>*/}
                {/*<div className={classes.mainContent}>*/}
                {/*    <Typography variant="h4" component="h2">*/}
                {/*        BoundaryBoxList*/}
                {/*    </Typography>*/}
                {/*    <Paper className={classes.root}>*/}
                {/*        <Table className={classes.table}>*/}
                {/*            <TableHead>*/}
                {/*                <TableRow>*/}
                {/*                    <TableCell>번호</TableCell>*/}
                {/*                    <TableCell>이미지</TableCell>*/}
                {/*                    <TableCell>작성자</TableCell>*/}
                {/*                    <TableCell>업로드 날짜</TableCell>*/}
                {/*                    <TableCell>진행 상황</TableCell>*/}
                {/*                    <TableCell>작업하기</TableCell>*/}
                {/*                </TableRow>*/}
                {/*            </TableHead>*/}
                {/*            <TableBody>*/}
                {/*                {boundaryList.map(c => {*/}
                {/*                    return <Customer key={c.workNo} id={c.workNo} image={c.imgData} name={c.createdId} date={c.createdDatetime} action={c.action} />*/}
                {/*                })}*/}
                {/*            </TableBody>*/}
                {/*        </Table>*/}
                {/*    </Paper>*/}
                {/*</div>*/}
                {/*<hr></hr>*/}
                <Button
                    type="submit"
                    className={classes.buttonType1}
                    variant="outlined"
                    onClick={this.handleSubmitForm} >
                    Previous
                </Button>
                <Button
                    type="submit"
                    className={classes.buttonType1}
                    variant="outlined"
                    onClick={this.handleSubmitForm} >
                    Next
                </Button>
                <Button
                    type="submit"
                    className={classes.buttonType2}
                    color="primary"
                    variant="outlined"
                    onClick={this.handleSubmitForm} >
                    Save and Next
                </Button>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (Test)));