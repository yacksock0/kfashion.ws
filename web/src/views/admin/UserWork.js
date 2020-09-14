import React from 'react'
import {Container, Typography, Grid} from "@material-ui/core";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import MaterialTable from "material-table";
import {inject, observer} from "mobx-react";
import {ProgressBar} from "../../components/ProgressBar";
import WorkDetail from "./WorkDetail";
import ErrorIcon from "@material-ui/icons/Error";
import TablePagination from '@material-ui/core/TablePagination';
const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
        width: '100%',
        minWidth: '80%',
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


@inject('authStore', 'userListStore')
@observer
class UserWork extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            groupNo:'',
            id:'',
            name:'',
            password:'',
            selectedId:'',
            groupUserList:[],
            newMember:[],
            changeId : '',
        }
    }
    componentDidMount() {
        setTimeout(() => document.body.style.zoom = "100%", 100);
        const groupNo = this.props.authStore.loginUser.groupNo;
        this.props.userListStore.changeAllReSet();
        this.props.userListStore.LoadGroupUserList(groupNo);
        this.props.enqueueSnackbar("작업 지정", {
            variant: 'success',
            anchorOrigin:{
                vertical: 'bottom',
                horizontal: 'left',
            }
        });
        this.props.userListStore.LoadTotalWork();
        this.props.userListStore.LoadCompleteWork(this.props.authStore.loginUser.authorityNo);
        this.props.userListStore.LoadSuccessWork(this.props.authStore.loginUser.authorityNo);
    }
    // componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        // let prevFakeData = this.createPrevFakeData(this.props.userListStore.pageSize * this.props.userListStore.page);
        // console.log(prevFakeData);
        // let nextFakeData = this.createNextFakeData(this.props.userListStore.pageSize);
        // console.log(nextFakeData);
        // console.log(toJS(this.props.userListStore.groupUserList));
        // if (this.props.userListStore.isFirstPage) {
        //     let realData = this.props.userListStore.groupUserList.slice(this.props.userListStore.page * this.props.userListStore.pageSize, this.props.userListStore.pageSize);
        //     this.props.userListStore.changeGroupUserList(toJS(realData.concat(nextFakeData)));
        // } else if (this.props.userListStore.isLastPage) {
        //     let realData = this.props.userListStore.groupUserList.slice(this.props.userListStore.page * this.props.userListStore.pageSize, this.props.userListStore.groupUserList.length);
        //     this.props.userListStore.changeGroupUserList(toJS(prevFakeData.concat(realData)));
        // } else {
        //     let realData = this.props.userListStore.groupUserList.slice(this.props.userListStore.page * this.props.userListStore.pageSize, (this.props.userListStore.page * this.props.userListStore.pageSize) + this.props.userListStore.pageSize);
        //     this.props.userListStore.changeGroupUserList(toJS(prevFakeData.concat(realData).concat(nextFakeData)));
        // }

    // }

    // createPrevFakeData = (size) => {
    //     console.log(size)
    //     let fakeData = Array.apply(null, new Array(size)).map(Object.prototype.valueOf, new Object());
    //     return fakeData.map((currentValue, index) => this.setFakeData(index));
    // }
    //
    // createNextFakeData = (size) => {
    //     console.log(size)
    //     let fakeData = Array.apply(null, new Array(size)).map(Object.prototype.valueOf, new Object());
    //     return fakeData.map((currentValue, index) => this.setFakeData(index + (this.props.userListStore.page + 1) * this.props.userListStore.pageSize));
    // }
    //
    // setFakeData = (id) => {
    //     console.log(id);
    //     let fakeData = new Object();
    //     console.log(fakeData.tableData);
    //     fakeData.tableData = {id: id};
    //     return fakeData;
    // }

    handleChangePagingPage = (event,page) => {
        this.props.userListStore.changePage(page);
        this.props.userListStore.LoadGroupUserList(this.props.authStore.loginUser.groupNo);
    }

    handleChangePagingRowsPerPage = (event) => {
        this.props.userListStore.changePageSize(event);
        this.props.userListStore.LoadGroupUserList(this.props.authStore.loginUser.groupNo);
    }


    handleSearchChange = (event) =>{
        console.log(event);
        this.props.userListStore.changeKeyword(event);
        this.props.userListStore.LoadGroupUserList(this.props.authStore.loginUser.groupNo);
    }

    handleOnChange = (id) => {
        console.log(id);
        this.setState({
            changeId : id,
        })

    }

    render() {
        const { classes } = this.props;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent} style={{marginBottom: 15}}>
                    <Grid item xs={12} lg={12}>
                        <MaterialTable
                            tableRef={this.tableRef}
                            columns={[
                                {title: '아이디',field: 'id',cellStyle: {minWidth: 150,textAlign: 'center'}},
                                {title: '이름', field: 'name', type: 'text', cellStyle: {minWidth:100,textAlign: 'center'}},
                                {title: '작업진도', field: 'progress', cellStyle: {minWidth:500,textAlign: 'left', paddingLeft:20},
                                    render: rowData => <ProgressBar rowDataId={rowData.id}/>,},
                                {title: '작업지정', field: 'workDetail',cellStyle: {minWidth:100,textAlign: 'center'},
                                    render: rowData => <WorkDetail rowDataId={rowData.id}/>},
                            ]}
                            title={<h3>그룹 회원 리스트 ( 총 등록된 이미지 수량 : <b style={{color:"blue"}}>{this.props.userListStore.totalWork}</b>,
                                    저장 수량 : <b style={{color:"blue"}}>{this.props.userListStore.completeWork}</b>,
                                    완료 수량 : <b style={{color:"blue"}}>{this.props.userListStore.successWork}</b>)</h3>}
                            data={
                                // query =>
                                //     new Promise((resolve, reject) => {
                                //         let url = `/api/v1/kfashion/users/testUserList`;
                                //         axios.get(url, {
                                //             params: {
                                //                 groupNo : this.props.authStore.loginUser.groupNo,
                                //                 pageSize: query.pageSize,
                                //                 page: query.page
                                //             }
                                //         })
                                //             // .then(response => response.json())
                                //             .then(result => {
                                //                 console.log(result.data.page -1);
                                //                 resolve({
                                //                     data: result.data.groupUserList.map((item) => {
                                //                             return {
                                //                                 id:  item.id,
                                //                                 name : item.name,
                                //                                 // progress : <ProgressBar rowDataId={item.id} />,
                                //                                 // workDetail : <WorkDetail rowDataId={item.id}/>
                                //                             }
                                //                         }),
                                //                     page: result.data.page,
                                //                     totalCount: result.data.totalCount,
                                //                 })
                                //             });
                                //     })
                            // }
                                this.props.userListStore.groupUserList.map((item) => {
                                return {
                                    id:  item.id,
                                    name : item.name,
                                    // progress : <ProgressBar rowDataId={item.id} />,
                                    // workDetail : <WorkDetail rowDataId={item.id} onChange={this.handleOnChange}/>
                                }
                            })
                            }

                            options={{
                                sorting: false,
                                rowStyle:{
                                    textAlign:'center'
                                },
                                editCellStyle: {
                                    textAlign:"center",
                                },
                                /*padding:'dense',*/
                                minBodyHeight: '100%',
                                actionsColumnIndex: -1,
                                headerStyle: {
                                    backgroundColor: '#000000',
                                    color: '#ffffff',
                                    textAlign:'center',
                                },
                                cellStyle: {
                                    textAlign: 'center',
                                    padding : 12 ,
                                    margin : 10,
                                },
                                actionsCellStyle: {
                                    textAlign: 'center'
                                },
                                pageSize: this.props.userListStore.pageSize,
                                pageSizeOptions: [5,10,20],
                            }}
                            components={{
                                Pagination: props => (
                                    <TablePagination
                                        {...props}
                                        component="div"
                                        count={this.props.userListStore.totalCount}
                                        page={this.props.userListStore.page}
                                        onChangePage={this.handleChangePagingPage}
                                    />
                                )
                            }}
                            onSearchChange={this.handleSearchChange}
                            isLoading={this.props.userListStore.loading === true ? true : false}
                            onChangeRowsPerPage={this.handleChangePagingRowsPerPage}
                        />
                    </Grid>
                </div>
                <ErrorIcon style={{display: 'inline-block', verticalAlign: 'middle', marginBottom: 3, marginRight: 5}}/>
                <Typography variant="h6" component="h4" style={{display:'inline' , fontSize: '15px'}}>
                   그룹 회원 리스트의 작업지정 버튼을 통해 해당 작업자에게 작업분배
                </Typography>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (UserWork)));