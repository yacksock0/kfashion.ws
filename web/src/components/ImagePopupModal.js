import React from "react";
import Dialog from "@material-ui/core/Dialog/index";
import DialogTitle from "@material-ui/core/DialogTitle/index";
import DialogContent from "@material-ui/core/DialogContent/index";
import Close from "@material-ui/icons/Close";
import {Button} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import {observer} from "mobx-react";

const imagePopupStyle = theme => ({
    imagePopup: {
        [theme.breakpoints.up('sm')]: {
            maxWidth: '900px'
        },
        backgroundColor: 'rgba( 255, 255, 255, 0 )',
            boxShadow: 'none',
            border: 'none',
            marginTop: '100px !important',
            textAlign: 'center'
    },
    imagePopupSize: {
        width: '100%'
    },
    modalRoot: {
        overflow: "auto",
        alignItems: "unset",
        justifyContent: "unset"
    },
    modal: {
        [theme.breakpoints.up("sm")]: {
            maxWidth: "500px",
            margin: "auto"
        },
        borderRadius: "6px",
        marginTop: "100px !important",
        overflow: "visible",
        maxHeight: "unset",
        position: "relative",
        height: "fit-content"
    },
    customModal: {
        [theme.breakpoints.up("sm")]: {
            maxWidth: "500px",
            margin: "auto"
        },
        [theme.breakpoints.up("md")]: {
            maxWidth: "720px",
            margin: "auto"
        },
        [theme.breakpoints.up("lg")]: {
            maxWidth: "1280px",
            margin: "auto"
        },
        [theme.breakpoints.up("xl")]: {
            maxWidth: "1560px",
            margin: "auto"
        },
        borderRadius: "6px",
        marginTop: "100px !important",
        overflow: "visible",
        maxHeight: "unset",
        position: "relative",
        height: "fit-content"
    },
    modalHeader: {
        borderBottom: "none",
        paddingTop: "24px",
        paddingRight: "24px",
        paddingBottom: "0",
        paddingLeft: "24px",
        minHeight: "16.43px"
    },
    modalTitle: {
        margin: "0",
        lineHeight: "1.42857143"
    },
    modalCloseButton: {
        color: 'gray',
        marginTop: "-12px",
        WebkitAppearance: "none",
        padding: "0",
        cursor: "pointer",
        background: "0 0",
        border: "0",
        fontSize: "inherit",
        opacity: ".9",
        textShadow: "none",
        fontWeight: "700",
        lineHeight: "1",
        float: "right"
    },
    modalClose: {
        width: "16px",
        height: "16px"
    },
    modalBody: {
        paddingTop: "24px",
        paddingRight: "24px",
        paddingBottom: "16px",
        paddingLeft: "24px",
        position: "relative",
        overflow: "visible"
    },
    modalFooter: {
        padding: "15px",
        textAlign: "right",
        paddingTop: "0",
        margin: "0"
    },
    modalFooterCenter: {
        marginLeft: "auto",
        marginRight: "auto"
    },
    instructionNoticeModal: {
        marginBottom: "25px"
    },
    imageNoticeModal: {
        maxWidth: "150px"
    },
    modalSmall: {
        width: "300px"
    },
    modalSmallBody: {
        paddingTop: "0"
    },
    modalSmallFooterFirstButton: {
        margin: "0",
        paddingLeft: "16px",
        paddingRight: "16px",
        width: "auto"
    },
    modalSmallFooterSecondButton: {
        marginBottom: "0",
        marginLeft: "5px"
    }
});

@observer
class ImagePopupModal extends React.Component {
    render() {
        const { classes, store } = this.props;
        return (
            <Dialog
                classes={{root: classes.modalRoot, paper: classes.imagePopup}}
                open={store.isShowImagePopupModal}
                // keepMounted scroll={"body"}
                onClose={() => store.onCloseImagePopupModal()}
                aria-labelledby="modal-slide-title"
                aria-describedby="modal-slide-description">
                <DialogTitle id="classic-modal-slide-title" disableTypography className={classes.modalHeader}>
                    <Button justIcon key="close" aria-label="Close" onClick={() => store.onCloseImagePopupModal()}>
                        <Close className={classes.modalClose} />
                    </Button>
                </DialogTitle>
                <DialogContent>
                    {store.popupTargetImage.image &&
                        <img className={classes.imagePopupSize}
                             src={store.popupTargetImage.type ? `data:${store.popupTargetImage.type};base64,${store.popupTargetImage.image}` : store.popupTargetImage.image}
                             title={store.popupTargetImage.title}
                             alt={store.popupTargetImage.title}/>
                    }
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles((theme) => ({
    ...imagePopupStyle(theme),
}),{ withTheme: true },)(ImagePopupModal);
