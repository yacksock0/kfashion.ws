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
import Chip from "@material-ui/core/Chip";

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
            lengthNo:0,
            lengthName:'',
            categoryNo:0,
            categoryName:'',
            detailNo:0,
            detailName:'',
            printNo:0,
            printName:'',
            textureNo:0,
            textureName:'',
            necklineNo:0,
            necklineName:'',
            karaNo:0,
            karaName:'',
            fitNo:0,
            fitName:'',
            safeNo:0,
            safeName:'',
            silhouetteNo:0,
            silhouetteName:'',
            value:0,
            createdId: '',
        }

        this.handleDelete = this.handleDelete.bind(this)
        this.handleDeleteCloth = this.handleDeleteCloth.bind(this)
        this.handleDeleteDetail = this.handleDeleteDetail.bind(this)
        this.handleDeletePrint = this.handleDeletePrint.bind(this)
        this.handleDeleteNeckline = this.handleDeleteNeckline.bind(this)
        this.handleDeleteTexture = this.handleDeleteTexture.bind(this)
        this.handleDeleteKara = this.handleDeleteKara.bind(this)
        this.handleDeleteFit = this.handleDeleteFit.bind(this)
        this.handleDeleteSafe = this.handleDeleteSafe.bind(this)
        this.handleDeleteSilhouette = this.handleDeleteSilhouette.bind(this)

    }
    componentDidMount() {
        this.props.professionalLabelStore.changeNewProfessionalLabelWorkNo(this.props.imageStore.isWorkNo);
    }
    handleClickCategory=(category)=>{
        this.setState({
            categoryNo: category.no,
            categoryName: category.categoryItemName,
        })
    }
    handleClickDetail=(detail)=>{
        this.setState({
            detailNo: detail.no,
            detailName: detail.categoryItemName,
        })
    }
    handleClickPrint=(print)=>{
        this.setState({
            printNo: print.no,
            printName: print.categoryItemName,
        })
    }
    handleClickTexture=(texture)=>{
        this.setState({
            textureNo: texture.no,
            textureName: texture.categoryItemName,
        })
    }
    handleClickCloth=(length)=>{
        this.setState({
            lengthNo: length.no,
            lengthName: length.categoryItemName,
        })
    }
    handleClickNeckLine=(neckline)=>{
        this.setState({
            necklineNo: neckline.no,
            necklineName: neckline.categoryItemName,
        })
    }
    handleClickKara=(kara)=>{
        this.setState({
            karaNo: kara.no,
            karaName: kara.categoryItemName,
        })
    }
    handleClickFit=(fit)=>{
        this.setState({
            fitNo: fit.no,
            fitName: fit.categoryItemName,
        })
    }
    handleClickSafe=(safe)=>{
        this.setState({
            safeNo: safe.no,
            safeName: safe.categoryItemName,
        })
    }
    handleClickSilhouette=(silhouette)=>{
        this.setState({
            silhouetteNo: silhouette.no,
            silhouetteName: silhouette.categoryItemName,
        })
    }
    handleDelete(){
        this.setState({
            categoryNo:0,
            categoryName:'',
        })
    }
    handleDeleteCloth(){
        this.setState({
            lengthNo:0,
            lengthName:'',
        })
    }
    handleDeleteDetail(){
        this.setState({
            detailNo:0,
            detailName:'',
        })
    }
    handleDeletePrint(){
        this.setState({
            printNo:0,
            printName:'',
        })
    }
    handleDeleteNeckline(){
        this.setState({
            necklineNo:0,
            necklineName:'',
        })
    }
    handleDeleteTexture(){
        this.setState({
            textureNo:0,
            textureName:'',
        })
    }
    handleDeleteKara(){
        this.setState({
            karaNo:0,
            karaName:'',
        })
    }
    handleDeleteFit(){
        this.setState({
            fitNo:0,
            fitName:'',
        })
    }
    handleDeleteSafe(){
        this.setState({
            safeNo:0,
            safeName:'',
        })
    }
    handleDeleteSilhouette(){
        this.setState({
            silhouetteNo:0,
            silhouetteName:'',
        })
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
                                            <div style={{display:'inline-block'}}>
                                                {this.state.categoryNo > 0 ?
                                                    (<Chip
                                                        variant="outlined"
                                                        label={this.state.categoryName}
                                                        onDelete={this.handleDelete}
                                                        color="primary"
                                                    />) : ''
                                                }
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Category onClick={this.handleClickCategory} />
                                            <br></br>

                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                디테일
                                            </Typography>
                                            <div style={{display:'inline-block'}}>
                                                {this.state.detailNo > 0 ?
                                                    (<Chip
                                                        variant="outlined"
                                                        label={this.state.detailName}
                                                        onDelete={this.handleDeleteDetail}
                                                        color="primary"
                                                    />) : ''
                                                }
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Detail onClick={this.handleClickDetail}/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                프린트
                                            </Typography>
                                            <div style={{display:'inline-block'}}>
                                                {this.state.printNo > 0 ?
                                                    (<Chip
                                                        variant="outlined"
                                                        label={this.state.printName}
                                                        onDelete={this.handleDeletePrint}
                                                        color="primary"
                                                    />) : ''
                                                }
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Print onClick={this.handleClickPrint}/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                소재감
                                            </Typography>
                                            <div style={{display:'inline-block'}}>
                                                {this.state.textureNo > 0 ?
                                                    (<Chip
                                                        variant="outlined"
                                                        label={this.state.textureName}
                                                        onDelete={this.handleDeleteTexture}
                                                        color="primary"
                                                    />) : ''
                                                }
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Texture onClick={this.handleClickTexture} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                기장
                                            </Typography>
                                            <div style={{display:'inline-block'}}>
                                                {this.state.lengthNo > 0 ?
                                                    (<Chip
                                                        variant="outlined"
                                                        label={this.state.lengthName}
                                                        onDelete={this.handleDeleteCloth}
                                                        color="primary"
                                                    />) : ''
                                                }
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <ClothLength onClick={this.handleClickCloth}/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                넥라인
                                            </Typography>
                                            <div style={{display:'inline-block'}}>
                                                {this.state.necklineNo > 0 ?
                                                    (<Chip
                                                        variant="outlined"
                                                        label={this.state.necklineName}
                                                        onDelete={this.handleDeleteNeckline}
                                                        color="primary"
                                                    />) : ''
                                                }
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <NeckLine onClick={this.handleClickNeckLine}/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                칼라(카라)
                                            </Typography>
                                            <div style={{display:'inline-block'}}>
                                                {this.state.karaNo > 0 ?
                                                    (<Chip
                                                        variant="outlined"
                                                        label={this.state.karaName}
                                                        onDelete={this.handleDeleteKara}
                                                        color="primary"
                                                    />) : ''
                                                }
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <ColorKara onClick={this.handleClickKara}/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                핏
                                            </Typography>
                                            <div style={{display:'inline-block'}}>
                                                {this.state.fitNo > 0 ?
                                                    (<Chip
                                                        variant="outlined"
                                                        label={this.state.fitName}
                                                        onDelete={this.handleDeleteFit}
                                                        color="primary"
                                                    />) : ''
                                                }
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Fit onClick={this.handleClickFit}/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                세이프
                                            </Typography>
                                            <div style={{display:'inline-block'}}>
                                                {this.state.safeNo > 0 ?
                                                    (<Chip
                                                        variant="outlined"
                                                        label={this.state.safeName}
                                                        onDelete={this.handleDeleteSafe}
                                                        color="primary"
                                                    />) : ''
                                                }
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Safe onClick={this.handleClickSafe}/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content}>
                                            <Typography variant="h5" component="h5">
                                                실루엣
                                            </Typography>
                                            <div style={{display:'inline-block'}}>
                                                {this.state.silhouetteNo > 0 ?
                                                    (<Chip
                                                        variant="outlined"
                                                        label={this.state.silhouetteName}
                                                        onDelete={this.handleDeleteSilhouette}
                                                        color="primary"
                                                    />) : ''
                                                }
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            <Silhouette onClick={this.handleClickSilhouette}/>
                                        </div>
                                    </Grid>
                                </Grid>
        );
    }

};

export default withSnackbar(withRouter(withStyles(styles) (CategoryComponent)));