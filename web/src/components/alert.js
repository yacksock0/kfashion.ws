import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function SimpleAlerts() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Alert severity="error">이미 등록된 이메일 형식 입니다</Alert>
        </div>
    );
}