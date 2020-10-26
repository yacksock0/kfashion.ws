import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Typography, Button} from "@material-ui/core";


const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        width: '100%',
    },
    successContainer: {
        marginTop : 200,
        margin: 'auto',
        textAlign: 'center',
    },
    successTitle: {
        fontSize: 38,
        color: '#333333',
        paddingTop: theme.spacing(6),
    },
    successHeader: {
        fontSize: 16,
        color: '#333333',
        paddingTop: theme.spacing(5),
    },
    successHeader2: {
        fontSize: 16,
        color: '#333333',
    },
    successBody: {
        fontSize: 14,
        color: '#b7b7b7',
        paddingTop: theme.spacing(1),
    },
    successButton: {
        borderRadius: 24,
        fontSize: 16,
        width: 200,
        height: 48,
        marginTop: theme.spacing(4),
    },
});


class VerifySearch extends React.Component {
    handleClickToHome = () => {
        this.props.history.push("/searching");
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.successContainer}>
                    <React.Fragment>
                        <Typography className={classes.successTitle}>회원 가입 인증 완료</Typography>
                        <Typography className={classes.successHeader}>{`가입을 축하합니다.`}</Typography>
                        <Typography className={classes.successHeader2}>작업자를 등록 하려면 관리자의 승인이 필요합니다.</Typography>
                        <Typography className={classes.successBody}>승인 후에 kSearching 서비스를<br/> 이용하실 수 있습니다.</Typography>
                    </React.Fragment>
                <Button color="primary" variant="contained"
                        className={classes.successButton}
                        onClick={() => this.handleClickToHome()}>
                    로그인으로 이동
                </Button>
                    </div>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (VerifySearch)));