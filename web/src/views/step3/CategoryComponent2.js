import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Grid, Typography} from "@material-ui/core";
import Category2 from "./Category2";
import Detail2 from "./Detail2";
import Print2 from "./Print2";
import Texture2 from "./Texture2";
import ClothLength2 from "./ClothLength2";
import NeckLine2 from "./NeckLine2";
import ColorKara2 from "./ColorKara2";
import Fit2 from "./Fit2";
import {inject, observer} from "mobx-react";
import DeleteIcon from "@material-ui/icons/Delete";
import CategoryAll2 from "./CategoryAll2";
import CategoryAll1 from "./CategoryAll1";

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
class CategoryComponent2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:0,
            createdId: '',
            polyLast:0,
            tabIndex1:0,
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
        this.props.professionalLabelStore.changeNewProfessionalLabelCategory2(category);
        this.props.professionalLabelStore.changeNewProfessionalLabelNo2(2);
    }

    handleClickDetail=(detail)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelDetail2(detail);
    }
    handleClickPrint=(print)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelPrint2(print);
    }
    handleClickTexture=(texture)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelTexture2(texture);
    }
    handleClickCloth=(length)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelClothLength2(length);
    }
    handleClickNeckLine=(neckline)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelNeckLine2(neckline);
    }
    handleClickKara=(kara)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelKara2(kara);
    }
    handleClickFit=(fit)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelFit2(fit);
    }

    handleDelete(){
        this.props.professionalLabelStore.deleteCategory2();
        this.props.professionalLabelStore.changeNewProfessionalLabelNo2(0);
    }
    handleDeleteCloth(){
        this.props.professionalLabelStore.deleteClothLength2();
    }
    handleDeleteDetail(detail2){
        this.props.professionalLabelStore.deleteDetail2(detail2);
    }
    handleDeletePrint(print2){
        this.props.professionalLabelStore.deletePrint2(print2);
    }
    handleDeleteNeckline(){
        this.props.professionalLabelStore.deleteNeckLine2();
    }
    handleDeleteTexture(texture2){
        this.props.professionalLabelStore.deleteTexture2(texture2);
    }
    handleDeleteKara(){
        this.props.professionalLabelStore.deleteKara2();
    }
    handleDeleteFit(){
        this.props.professionalLabelStore.deleteFit2();
    }
    handleSubmit(){
        if(this.props.onClick){
            this.props.onClick();
        }
    }
    render() {
        const {classes} = this.props;
        const {topReviewLabel} = this.props.professionalLabelStore;
        const detail2 = topReviewLabel.detailItemName2;
        const print2 =topReviewLabel.printItemName2;
        const texture2 =topReviewLabel.textureItemName2;
        return (
                    <Grid container spacing={3}>
                        <Grid items xs={11} style={{margin:"auto", marginTop:10}}>
                            <CategoryAll2 onClick={this.handleDeleteDetail} onClickTexture2={this.handleDeleteTexture} onClickPrint2={this.handleDeletePrint} />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <div className={classes.content}  style={{display:'inline'}} >
                                            <Typography variant="h5" component="h5" style={{display:'inline'}} >
                                                카테고리
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <Category2 onClick={this.handleClickCategory} />
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {topReviewLabel.categoryCategoryNo2 > 0 ?
                                                (<Button style={{fontSize:15, width:200, borderRadius:50,padding:0}} variant="outlined" onClick={this.handleDelete} endIcon={<DeleteIcon />} > {topReviewLabel.categoryItemName2} </Button> ) : ''
                                            }
                                        </div>
                                    </Grid>

                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline' }}>
                                                디테일
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <Detail2 onClick={this.handleClickDetail}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {detail2 != null && detail2 != undefined  ?(
                                                detail2.map((detail2) =>
                                                <Button
                                                    style={{fontSize:15, width:200, borderRadius:50 ,padding:0}}
                                                    variant="outlined"
                                                    onClick={() => this.handleDeleteDetail(detail2)}
                                                    endIcon={<DeleteIcon />}
                                                >
                                                    {detail2}
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
                                                <Print2 onClick={this.handleClickPrint}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {print2 != null  && print2 != undefined  ?(
                                                print2.map((print1) =>
                                                    <Button
                                                        style={{
                                                            fontSize: 15,
                                                            width: 200,
                                                            borderRadius: 50,
                                                            padding: 0
                                                        }}
                                                        variant="outlined"
                                                        onClick={()=>this.handleDeletePrint(print1)}
                                                        endIcon={<DeleteIcon/>}
                                                    >
                                                        {print1}
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
                                                <Texture2 onClick={this.handleClickTexture} />
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {texture2 != null  && texture2 != undefined  ?(
                                                texture2.map((texture2) =>
                                                    <Button
                                                        style={{
                                                            fontSize: 15,
                                                            width: 200,
                                                            borderRadius: 50,
                                                            padding: 0
                                                        }}
                                                        variant="outlined"
                                                        onClick={()=>this.handleDeleteTexture(texture2)}
                                                        endIcon={<DeleteIcon/>}
                                                    >
                                                        {texture2}
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
                                                <ClothLength2 onClick={this.handleClickCloth}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {topReviewLabel.clothLengthCategoryNo2 > 0 ?
                                                (<Button style={{fontSize:15, width:200, borderRadius:50,padding:0}} variant="outlined" onClick={this.handleDeleteCloth} endIcon={<DeleteIcon />} > {topReviewLabel.clothLengthItemName2} </Button> ) : ''
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline'}}>
                                                넥라인
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <NeckLine2 onClick={this.handleClickNeckLine}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {topReviewLabel.neckLineCategoryNo2 > 0 ?
                                                (<Button style={{fontSize:15, width:200, borderRadius:50 ,padding:0}} variant="outlined" onClick={this.handleDeleteNeckline} endIcon={<DeleteIcon />} > {topReviewLabel.neckLineItemName2} </Button> ) : ''
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline'}}>
                                                칼라(카라)
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <ColorKara2 onClick={this.handleClickKara}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {topReviewLabel.karaCategoryNo2 > 0 ?
                                                (<Button style={{fontSize:15, width:200, borderRadius:50 ,padding:0}} variant="outlined" onClick={this.handleDeleteKara} endIcon={<DeleteIcon />} > {topReviewLabel.karaItemName2} </Button> ) : ''
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline'}}>
                                                핏
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <Fit2 onClick={this.handleClickFit}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {topReviewLabel.fitCategoryNo2 > 0 ?
                                                (<Button style={{fontSize:15, width:200, borderRadius:50,padding:0}} variant="outlined" onClick={this.handleDeleteFit} endIcon={<DeleteIcon />} > {topReviewLabel.fitItemName2} </Button> ) : ''
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
export default withSnackbar(withRouter(withStyles(styles) (CategoryComponent2)));