import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Container, Grid, Typography} from "@material-ui/core";
import Category from "../step3/Category";
import Style from "../step3/Style";
import Detail from "../step3/Detail";
import Print from "../step3/Print";
import Texture from "../step3/Texture";
import ClothLength from "../step3/ClothLength";
import NeckLine from "../step3/NeckLine";
import ColorKara from "../step3/ColorKara";
import Fit from "../step3/Fit";
import Safe from "../step3/Safe";
import Silhouette from "../step3/Silhouette";
import {inject, observer} from "mobx-react";

const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
        maxWidth:'100%',
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
        marginTop: 15,
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
    test:{
        border: '1px solid black'
    }
});

@inject('professionalLabelStore','authStore', 'imageStore')
@observer
class CategoryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:0,
            createdId: '',
        }
    }
    componentDidMount() {
        this.props.authStore.checkLogin();
        const id = this.props.authStore.loginUser.id;
        this.setState({
            createdId : id,
            imgData: `/api/v1/kfashion/img/getByteImage?workNo=${this.props.imageStore.isWorkNo}`,
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelWorkNo(this.props.imageStore.isWorkNo);
    }

    render() {
        const {classes} = this.props;

        return (
                    <Grid container spacing={3}>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                스타일
                                            </Typography>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Style />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                카테고리
                                            </Typography>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Category />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                디테일
                                            </Typography>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Detail />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                프린트
                                            </Typography>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Print />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                소재감
                                            </Typography>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Texture />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                기장
                                            </Typography>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <ClothLength />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                넥라인
                                            </Typography>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <NeckLine />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                칼라(카라)
                                            </Typography>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <ColorKara />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                핏
                                            </Typography>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Fit />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                세이프
                                            </Typography>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Safe />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                실루엣
                                            </Typography>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Silhouette />
                                        </div>
                                    </Grid>
                                </Grid>
        );
    }

};

export default withSnackbar(withRouter(withStyles(styles) (CategoryComponent)));