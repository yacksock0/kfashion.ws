import React, {forwardRef} from "react";
import {withSnackbar} from "notistack";
import {Link, withRouter} from "react-router-dom";
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

class Step1 extends React.Component {
    state = {
        loading: false,
        boundaryList : [],
        data: [],
        columns: [
            { title: '번호', field: 'workNo', filterPlaceholder: 'workNo filter', tooltip: 'workNo로 정렬', editPlaceholder: 'workNo 입력'},
            { title: '이미지'},
            // { title: '이미지', field: 'imgData',type: 'string'},
            { title: '작성자', field: 'createdId', type: 'string'},
            { title: '날짜', field: 'createdDatetime', type: 'date'},
            { title: 'go'},
        ],
    }

    componentDidMount() {
        this.setState({ loading: true })
        axios.get('/api/v1/kfashion/img/boundaryList')
            .then(response => {
                this.setState({
                    // render: rowData => <img src={rowData.url} style={{width: 50, borderRadius: '50%'}}/>,
                    boundaryList : response.data.boundaryList.filter(b => b !== null), loading: false },)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { classes, history } = this.props;
        const {boundaryList} = this.state;
        console.log(boundaryList);
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div style={{ maxWidth: "100%" }}>
                    <MaterialTable
                        icons={tableIcons}
                        columns={this.state.columns}
                        data={boundaryList}
                        title="BoundaryBoxList"
                        actions={[
                            {
                                icon: 'go',
                                tooltip: 'labeling',
                                onClick: (event, rowData) => {
                                    history.push("/Step/BoundaryBox");
                                    // const formData = new formData();
                                    // formData.append('workNo', boundaryList.columns.field.workNo);
                                }
                            }
                        ]}

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
                        options={{
                            actionsColumnIndex: -1
                        }}
                    />
                </div>
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

export default withSnackbar(withRouter(withStyles(styles) (Step1)));