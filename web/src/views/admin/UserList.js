import React, {forwardRef} from 'react'
import {Container, Typography, Toolbar, Grid} from "@material-ui/core";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import axios from "axios";
import MaterialTable from "material-table";
import {inject, observer} from "mobx-react";
import ErrorIcon from "@material-ui/icons/Error";

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
class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            groupNo:'',
            id:'',
            name:'',
            password:'',
            hidden : true,
            columns: [
                {
                    title: '아이디',
                    field: 'id',
                    filterPlaceholder: 'GroupNo filter',
                    tooltip: 'GroupNo로 정렬',
                    editPlaceholder: '아이디 입력',
                },
                {title: '이름', field: 'name', type: 'text'},
                {title: '비밀번호', field: 'password' },
                {title: '생성일', field: 'createdDatetime', type: 'date', editable: 'never'},
                // {title: '비고', field: 'etc', type: 'text'},
            ],
        }
    }
    componentDidMount() {
        const groupNo = this.props.authStore.loginUser.groupNo;
        const id = this.props.authStore.loginUser.id;
        this.props.userListStore.LoadGroupUserList(groupNo);
        this.props.enqueueSnackbar("작업자 등록", {
            variant: 'success',
            anchorOrigin:{
                vertical: 'bottom',
                horizontal: 'left',
            }
        });
        this.props.authStore.checkLogin();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.userListStore.isNotAvailableId) {
            alert("이미 사용중인 아이디입니다.")

            this.props.userListStore.clearState();
        }
    }


    handelOnChange=() => {
        if(this.state.columns.hidden == true) {
            this.setState({
                hidden : false,
            })
        }

    }


    render() {
        const { classes } = this.props;
        const {isNotAvailableId} =this.props.userListStore.isNotAvailableId;
        const groupNo = this.props.authStore.loginUser.groupNo;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Grid item xs={12} lg={12}>
                        <MaterialTable
                            localization={{ body: {
                                editRow: { deleteText: '정말 삭제 하시겠습니까?'} } ,
                                pagination: {
                                    labelDisplayedRows: '10',
                                    labelRowsPerPage: '5',
                                    }
                                }
                            }
                            columns={this.state.columns}
                            data={!!this.props.userListStore.groupUserList ?
                                this.props.userListStore.groupUserList.map((item) => {
                                    return {
                                        id: item.id,
                                        name: item.name,
                                        // password: item.password,
                                        createdDatetime: item.createdDatetime,
                                    }
                                }) : []}
                            title="작업자 리스트"
                            editable={{
                                isEditHidden: rowData => rowData.name === "createdDatetime",
                                onRowAdd:rowData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            try {
                                                this.props.userListStore.changeNewMemberId(rowData.id)
                                                this.props.userListStore.changeNewMemberPassword(rowData.password)
                                                this.props.userListStore.changeNewMemberUserName(rowData.name)
                                                this.props.userListStore.changeNewMemberGroupNo(groupNo)
                                                this.props.userListStore.AddGroupUser();
                                            } catch (e) {
                                                console.log('여기 에러 났음')
                                            }
                                            resolve();
                                        }, 1000);
                                    }),
                                onRowDelete: rowData =>
                                    new Promise((resolve, reject) => {
                                            {
                                                axios.delete(`/api/v1/kfashion/users/deleteGroupUser/${rowData.id}`, {
                                                    data: {
                                                        id: rowData.id
                                                    }
                                                }).then(res => {
                                                    if(res.status === 200) {
                                                        let groupNo=this.props.authStore.loginUser.groupNo;
                                                        this.props.userListStore.LoadGroupUserList(groupNo);
                                                    }
                                                })
                                            }
                                            resolve();
                                    })
                            }}
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
                                    color: '#FFF',
                                    textAlign:'center',
                                },
                                cellStyle: {
                                    textAlign: 'center'
                                },
                                actionsCellStyle: {
                                    textAlign: 'center'
                                },
                                pageSize: 10,
                                pageSizeOptions: [5,10,20]
                            }}

                        />
                    </Grid>
                </div>
                <ErrorIcon/>
                <Typography variant="h6" component="h4" style={{display:'inline'}}>
                    우측상단 + 버튼을 통해 작업자 추가 / 작업 리스트의 액션버튼을 통해 작업자 삭제
                </Typography>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (UserList)));