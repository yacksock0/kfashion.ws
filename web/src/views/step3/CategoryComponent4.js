import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Grid, Typography} from "@material-ui/core";
import Category4 from "./Category4";
import Detail4 from "./Detail4";
import Print4 from "./Print4";
import Texture4 from "./Texture4";
import ClothLength4 from "./ClothLength4";
import NeckLine4 from "./NeckLine4";
import ColorKara4 from "./ColorKara4";
import Fit4 from "./Fit4";
import {inject, observer} from "mobx-react";
import DeleteIcon from "@material-ui/icons/Delete";
import CategoryAll4 from "./CategoryAll4";

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

@inject('professionalLabelStore','authStore', 'imageStore','workStore')
@observer
class CategoryComponent4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:0,
            createdId: '',
            polyLast:0,
            tabIndex1:0,
            tabIndex:0,
        }

        this.handleDelete = this.handleDelete.bind(this)
        this.handleDeleteCloth = this.handleDeleteCloth.bind(this)
        this.handleDeleteDetail = this.handleDeleteDetail.bind(this)
        this.handleDeletePrint = this.handleDeletePrint.bind(this)
        this.handleDeleteNeckline = this.handleDeleteNeckline.bind(this)
        this.handleDeleteTexture = this.handleDeleteTexture.bind(this)
        this.handleDeleteKara = this.handleDeleteKara.bind(this)
        this.handleDeleteFit = this.handleDeleteFit.bind(this)
    }
    componentDidMount() {
        this.props.professionalLabelStore.changeNewProfessionalLabelWorkNo(this.props.imageStore.isWorkNo);
    }

    handleClickCategory=(category)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelCategory4(category);
        this.props.professionalLabelStore.changeNewProfessionalLabelNo4(4);
    }

    handleClickDetail=(detail)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelDetail4(detail);
    }
    handleClickPrint=(print)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelPrint4(print);
    }
    handleClickTexture=(texture)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelTexture4(texture);
    }
    handleClickCloth=(length)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelClothLength4(length);
    }
    handleClickNeckLine=(neckline)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelNeckLine4(neckline);
    }
    handleClickKara=(kara)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelKara4(kara);
    }
    handleClickFit=(fit)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelFit4(fit);
    }

    handleDelete(){
        this.props.professionalLabelStore.deleteCategory4();
    }
    handleDeleteCloth(){
        this.props.professionalLabelStore.deleteClothLength4();
    }
    handleDeleteDetail(detail4){
        this.props.professionalLabelStore.deleteDetail4(detail4);
    }
    handleDeletePrint(print4){
        this.props.professionalLabelStore.deletePrint4(print4);
    }
    handleDeleteNeckline(){
        this.props.professionalLabelStore.deleteNeckLine4();
    }
    handleDeleteTexture(texture4){
        this.props.professionalLabelStore.deleteTexture4(texture4);
    }
    handleDeleteKara(){
        this.props.professionalLabelStore.deleteKara4();
    }
    handleDeleteFit(){
        this.props.professionalLabelStore.deleteFit4();
    }
    handleSubmit(){
        if(this.props.onClick){
            this.props.onClick();
        }
    }
    render() {

        const {classes} = this.props;
        const {onePieceReviewLabel} =this.props.professionalLabelStore;
        const detail4 = onePieceReviewLabel.detailItemName4;
        const print4 =onePieceReviewLabel.printItemName4;
        const texture4 =onePieceReviewLabel.textureItemName4;

        return (
                    <Grid container spacing={3}>
                        <Grid items xs={11} style={{margin:"auto", marginTop:10}}>
                            <CategoryAll4  onClick={this.handleDeleteDetail}  onClickTexture4={this.handleDeleteTexture} onClickPrint4={this.handleDeletePrint}/>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <div className={classes.content}  style={{display:'inline'}} >
                                            <Typography variant="h5" component="h5" style={{display:'inline'}} >
                                                카테고리
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <Category4 onClick={this.handleClickCategory}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {onePieceReviewLabel.categoryCategoryNo4 > 0 ?
                                                (<Button style={{fontSize:15, width:200, borderRadius:50 ,padding:0}} variant="outlined" onClick={this.handleDelete} endIcon={<DeleteIcon />} > {onePieceReviewLabel.categoryItemName4} </Button> ) : ''
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline' }}>
                                                디테일
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <Detail4 onDetail4={this.handleClickDetail}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {detail4 != 0  && detail4 != undefined  ?(
                                                detail4.map((detail4) =>
                                                    <Button
                                                        style={{fontSize:15, width:200, borderRadius:50 ,padding:0}}
                                                        variant="outlined"
                                                        onClick={() => this.handleDeleteDetail(detail4)}
                                                        endIcon={<DeleteIcon />}
                                                    >
                                                        {detail4}
                                                    </Button>
                                                )
                                            ) : ''}
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline'}}>
                                                프린트
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <Print4 onClick={this.handleClickPrint}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {print4 != null  && print4 != undefined  ?(
                                                print4.map((print4) =>
                                                    <Button
                                                        style={{
                                                            fontSize: 15,
                                                            width: 200,
                                                            borderRadius: 50,
                                                            padding: 0
                                                        }}
                                                        variant="outlined"
                                                        onClick={()=>this.handleDeletePrint(print4)}
                                                        endIcon={<DeleteIcon/>}
                                                    >
                                                        {print4}
                                                    </Button>
                                                )) : ''}

                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline'}}>
                                                소재감
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <Texture4 onClick={this.handleClickTexture} />
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {texture4 != null  && texture4 != undefined  ?(
                                                texture4.map((texture4) =>
                                                    <Button
                                                        style={{
                                                            fontSize: 15,
                                                            width: 200,
                                                            borderRadius: 50,
                                                            padding: 0
                                                        }}
                                                        variant="outlined"
                                                        onClick={()=>this.handleDeleteTexture(texture4)}
                                                        endIcon={<DeleteIcon/>}
                                                    >
                                                        {texture4}
                                                    </Button>
                                                )) : ''}
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline'}}>
                                                기장
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <ClothLength4 onClick={this.handleClickCloth}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {onePieceReviewLabel.clothLengthCategoryNo4 > 0 ?
                                                (<Button style={{fontSize:15, width:200, borderRadius:50 ,padding:0}} variant="outlined" onClick={this.handleDeleteCloth} endIcon={<DeleteIcon />} > {onePieceReviewLabel.clothLengthItemName4} </Button> ) : ''
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline'}}>
                                                넥라인
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <NeckLine4 onClick={this.handleClickNeckLine}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {onePieceReviewLabel.neckLineCategoryNo4 > 0 ?
                                            (<Button style={{fontSize:15, width:200, borderRadius:50 ,padding:0}} variant="outlined"  onClick={this.handleDeleteNeckline} endIcon={<DeleteIcon />} > {onePieceReviewLabel.neckLineItemName4} </Button> ) : ''
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline'}}>
                                                칼라(카라)
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <ColorKara4 onClick={this.handleClickKara}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {onePieceReviewLabel.karaCategoryNo4 > 0 ?
                                                (<Button style={{fontSize:15, width:200, borderRadius:50 ,padding:0}} variant="outlined" onClick={this.handleDeleteKara} endIcon={<DeleteIcon />} > {onePieceReviewLabel.karaItemName4} </Button> ) : ''
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline'}}>
                                                핏
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <Fit4 onClick={this.handleClickFit}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {onePieceReviewLabel.fitCategoryNo4 > 0 ?
                                                (<Button style={{fontSize:15, width:200, borderRadius:50 ,padding:0}} variant="outlined" onClick={this.handleDeleteFit} endIcon={<DeleteIcon />} > {onePieceReviewLabel.fitItemName4} </Button> ) : ''
                                            }
                                        </div>

                                        {/*<Button style={{marginTop: 50}}*/}
                                        {/*        type="button"*/}
                                        {/*        className={classes.buttonType2}*/}
                                        {/*        color="primary"*/}
                                        {/*        variant="outlined"*/}
                                        {/*        onClick={()=>this.handleSubmit()}*/}
                                        {/*>*/}
                                        {/*    저장*/}
                                        {/*</Button>*/}

                                    </Grid>
                                </Grid>

        );
    }
};
export default withSnackbar(withRouter(withStyles(styles) (CategoryComponent4)));