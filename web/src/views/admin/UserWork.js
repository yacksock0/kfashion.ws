import React, {forwardRef} from 'react'
import {Container, Typography, Toolbar, Grid} from "@material-ui/core";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import MaterialTable from "material-table";
import {inject, observer} from "mobx-react";
import {ProgressBar} from "../../components/ProgressBar";
import WorkDetail from "./WorkDetail";
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

        }
    }
    componentDidMount() {
        setTimeout(() => document.body.style.zoom = "100%", 100);
        const groupNo = this.props.authStore.loginUser.groupNo;
        this.props.userListStore.LoadGroupUserList(groupNo);
        this.props.enqueueSnackbar("작업 지정", {
            variant: 'success',
            anchorOrigin:{
                vertical: 'bottom',
                horizontal: 'left',
            }
        });
    }
    render() {
        const { classes } = this.props;
        const groupNo = this.props.authStore.loginUser.groupNo;
        return (
            <Container component="main" className={classes.mainContainer}>
                <div className={classes.appBarSpacer} />
                <div className={classes.mainContent}>
                    <Grid item xs={12} lg={12}>
                        <MaterialTable
                            columns={[
                                {title: '아이디',field: 'id',cellStyle: {minWidth: 150,textAlign: 'center'}},
                                {title: '이름', field: 'name', type: 'text', cellStyle: {minWidth:100,textAlign: 'center'}},
                                {title: '작업진도', field: 'progress', cellStyle: {minWidth:500,textAlign: 'left', paddingLeft:150},render: rowData => <ProgressBar rowDataId={rowData.id}/>,},
                                {title: '작업지정', field: 'workDetail',cellStyle: {minWidth:100,textAlign: 'center'},render: rowData => <WorkDetail rowDataId={rowData.id}/>},
                            ]}
                            data={!!this.props.userListStore.groupUserList ?
                                this.props.userListStore.groupUserList.map((item) => {
                                    return {
                                        id: item.id,
                                        name: item.name,
                                    }
                                }) : []}
                            title="그룹 회원 리스트"
                            editable={{
                                // onRowUpdate:rowData =>
                                //     new Promise((resolve, reject) => {
                                //         setTimeout(() => {
                                //             try {
                                //                 this.props.userListStore.changeNewMemberId(rowData.id)
                                //                 this.props.userListStore.changeNewMemberPassword(rowData.password)
                                //                 this.props.userListStore.changeNewMemberUserName(rowData.name)
                                //                 this.props.userListStore.changeNewMemberGroupNo(groupNo)
                                //                 this.props.userListStore.addGroupUser();
                                //             } catch (e) {
                                //                 console.log('여기 에러 났음')
                                //             }
                                //             resolve();
                                //         }, 1000);
                                //     }),
                                // onRowDelete: rowData =>
                                //     new Promise((resolve, reject) => {
                                //         setTimeout(() => {
                                //             {
                                //                 console.log('userId:', rowData.id)
                                //                 axios.delete(`/api/v1/kfashion/users/deleteGroupUser`, {data: {userId: rowData.id},
                                //                 });
                                //             }
                                //             resolve();
                                //         }, 1000);
                                //     })
                            }}
                            options={{
                                emptyRowsWhenPaging : true,
                                sorting: false,
                                padding:'dense',
                                minBodyHeight: '100%',
                                actionsColumnIndex: -1,
                                headerStyle: {
                                    backgroundColor: '#000000',
                                    color: '#FFF',
                                    textAlign:'center',
                                },
                                cellStyle: {
                                    textAlign: 'center',
                                    padding : 0,
                                    margin : 0,
                                },
                                pageSize: 10,
                                pageSizeOptions: [5,10,20]
                            }}
                            isLoading={this.props.userListStore.loading === true ? true : false}
                        />
                    </Grid>
                </div>
                <ErrorIcon/>
                <Typography variant="h6" component="h4" style={{display:'inline'}}>
                   그룹 회원 리스트의 작업지정 버튼을 통해 해당 작업자에게 작업분배
                </Typography>
            </Container>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (UserWork)));