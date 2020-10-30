import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import {inject, observer} from "mobx-react";
import {withStyles} from '@material-ui/core/styles';
import {STATE} from '../../../common/state';
import {Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';

const style = theme => ({
    root: {
        width: '100%',
        marginBottom: 40,
        "& .MuiDropzoneArea-root": {
            borderColor: 'rgba(82,106,242,0.21)',
            minHeight: '450px',
            outline: 'none',
        },
        "& .MuiTypography-h5": {
            position: "absolute",
            width: "100%",
            textAlign: "center",
            top: "48%",
            fontFamily: "NotoSansCJKkr",
            fontSize: "14px",
            fontWeight: "bold",
        },
        "& .MuiDropzoneArea-icon": {
            position: "absolute",
            top: "40%",
            marginLeft: -20,
            color: '#A8B4F5',
        },
        "& .MuiSnackbarContent-root": {
            backgroundColor: '#526af2',
            fontFamily: 'NotoSansCJKkr',
            paddingLeft: '20px',
            fontWeight: "bold",
            minWidth : "500px",
        },
    },
    close : {
        color: '#fff',
    }
});

@inject('tImageStore')
@observer
class DropFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            fileTotal: 0,
        };
    }
    state = {
        open: false,
    };

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    handleChange(files) {
        if (this.props.tImageStore.progress !== 0) {
            return (alert('이전 요청이 완료되지않았습니다!'));
        }
        if (files.length >= 11) {
            return this.handleClick();
        }
        this.setState({

            files: files,
        });
        this.props.tImageStore.changeFileTotal(files.length);
        const file = files;
        this.props.tImageStore.resetDownload();
        this.props.tImageStore.countReset(0);
        this.props.tImageStore.fileupload(file, 0, file.length);
    }

    render() {
        const {classes} = this.props;
        const {State} = this.props.tImageStore;
        const snackMessage = <div><ErrorIcon style={{ fontSize: 30, marginTop:'5px' }}/><span style={{ fontSize: '17px', position: 'absolute',left: '60px',top : '22px' }} >태깅 서비스는 최대 10장의 이미지까지 첨부 가능합니다.</span></div>

        return (
            <div className={classes.root}>
                <DropzoneArea
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/vnd.microsoft.icon', 'image/tiff', 'image/webp']}
                    maxFileSize={50000000000}
                    filesLimit={5000}
                    onDrop={this.handleChange.bind(this)}
                    dropzoneText='업로드할 이미지 또는 폴더를 드래그해주세요!'
                    showAlerts={false}
                    showPreviewsInDropzone={false}
                    dropzoneProps={{
                        disabled: State === STATE.PENDING,
                    }}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message={snackMessage}
                    severity={'info'}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>

        );
    }
}

export default withStyles(style)(DropFile);