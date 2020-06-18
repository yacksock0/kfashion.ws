import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, Typography,
    withStyles
} from "@material-ui/core";
import {inject, observer} from "mobx-react";

const styles = (theme) => ({
    dialog: {
    },
    dialogTitle: {
    },
    dialogContent: {
    },
    grow: {
        flexGrow: 1,
    },
    contentSubTitle: {
        paddingTop: 32,
        paddingLeft: theme.spacing(1),
        fontSize: 20,
    },
    itemHeader: {
    },
    itemBody: {
    },
    listContainer: {
        height: 320,
        overflow: 'auto',
        boxShadow:'none',
        border:'1px solid #eee',
        '& ul li > div > div > span ':{
            fontSize:'14px',
            fontWeight:'700',
            color:'#333'
        }
    },
    commandButton: {
        borderRadius: 24,
    },
});

@inject('authStore')
@observer
class SignInDialog extends React.Component {
    render() {
        const { classes } = this.props;
        const { isOpenEnabledUserDialog, changeEnabledUserDialog } = this.props.authStore;

        return (
            <Dialog disableBackdropClick fullWidth
                    maxWidth="sm"
                    className={classes.dialog}
                    open={isOpenEnabledUserDialog}
                    onClose={e => changeEnabledUserDialog(false)}
                    aria-labelledby="quiz-add-dialog-title" >
                <DialogTitle id="quiz-add-dialog-title" className={classes.dialogTitle}>
                    로그인 실패
                </DialogTitle>

                <DialogContent className={classes.dialogContent}>
                    <Grid container spacing={1} className={classes.formContainer}>
                        <Grid item xs={12}>
                            <Typography className={classes.successBody}>이메일인증 완료 후에 ONTHELIVE의 서비스를 이용하실 수 있습니다.</Typography>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <div className={classes.grow} />
                    <Button color="primary" onClick={e => changeEnabledUserDialog(false)}>
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
};

export default withSnackbar(withRouter(withStyles(styles) (SignInDialog)));