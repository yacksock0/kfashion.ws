import React, {forwardRef} from 'react'
import {Container, Typography, Toolbar, Grid} from "@material-ui/core";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
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
import GroupList from "./GroupList";
import {toJS} from "mobx";
import {inject, observer} from "mobx-react";

const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
        width: '100%',
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        marginTop: theme.spacing(2),
        alignItems: 'center',
        width: '100%',
    },
    toolbar: {
        width: '100%',
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

@inject('authStore', 'userListStore')
@observer
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            groupNo:'',
            id:'',
            name:'',
            password:'',
            groupUserList:[],
            newMember:[],
            columns: [
                {
                    title: '아이디',
                    field: 'id',
                    filterPlaceholder: 'GroupNo filter',
                    tooltip: 'GroupNo로 정렬',
                    editPlaceholder: '아이디 입력'
                },
                {title: '이름', field: 'name', type: 'text'},
                {title: '비밀번호', field: 'password', type: 'hidden'},
                {title: '생성일', field: 'createdDatetime', type: 'date'},
            ],
        }
    }
    componentDidMount() {
        const groupNo = this.props.authStore.loginUser.groupNo;
        axios.get('/api/v1/kfashion/users/groupUserList?groupNo='+groupNo)
            .then(response => response.data)
            .then(res => {
                this.setState({ groupUserList : res, loading: false})
            })


        this.props.enqueueSnackbar("User List", {
            variant: 'info'
        });
        this.props.authStore.checkLogin();
    }

    render() {
        const { classes } = this.props;
        const groupNo = this.props.authStore.loginUser.groupNo;
        const {groupUserList} = this.state.groupUserList;
        return (
            <Container component="main" className={classes.mainContainer}>
                console
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Grid item xs={12} lg={12}>
                        <MaterialTable
                            icons={tableIcons}
                            columns={this.state.columns}
                            data={groupUserList}
                            title="그룹 회원 리스트"
                            editable={{
                                onRowAdd:rowData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            try {
                                                this.props.userListStore.changeNewMemberId(rowData.id)
                                                this.props.userListStore.changeNewMemberPassword(rowData.password)
                                                this.props.userListStore.changeNewMemberUserName(rowData.name)
                                                this.props.userListStore.changeNewMemberGroupNo(groupNo)
                                                this.props.userListStore.addGroupUser();
                                            } catch (e) {
                                                console.log('여기 에러 났음')
                                            }
                                            resolve();
                                        }, 1000);
                                    }),
                                onRowDelete: rowData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            {
                                                console.log('userId:', rowData.id)
                                                axios.delete(`/api/v1/kfashion/users/deleteGroupUser`, {data: {userId: rowData.id},
                                                });
                                            }
                                            resolve();
                                        }, 1000);
                                    })
                            }}
                            options={{
                                /*padding:'dense',*/
                                minBodyHeight: '35em',
                                actionsColumnIndex: -1,
                                headerStyle: {
                                    backgroundColor: '#01579b',
                                    color: '#FFF',
                                    textAlign:'center',
                                },
                                cellStyle: {
                                    textAlign: 'center'
                                },
                            }}

                        />
                    </Grid>
                </div>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (UserList)));