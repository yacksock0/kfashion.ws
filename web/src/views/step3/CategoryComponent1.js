import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Grid, Typography} from "@material-ui/core";
import Category1 from "./Category1";
import Detail1 from "./Detail1";
import Print1 from "./Print1";
import Texture1 from "./Texture1";
import ClothLength1 from "./ClothLength1";
import NeckLine1 from "./NeckLine1";
import ColorKara1 from "./ColorKara1";
import Fit1 from "./Fit1";
import {inject, observer} from "mobx-react";
import DeleteIcon from "@material-ui/icons/Delete";
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

@inject('professionalLabelStore','authStore', 'imageStore','workStore')
@observer
class CategoryComponent1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:0,
            createdId: '',
            polyLast:0,
            tabIndex1:0,
            tabIndex:0,
        }
        this.handleClickAll = this.handleClickAll.bind(this)
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
        console.log("2222222 : " +category);
        this.props.professionalLabelStore.changeNewProfessionalLabelCategory1(category);
    }


    handleClickDetail=(detail)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelDetail1(detail);
        this.props.professionalLabelStore.changeNewProfessionalLabelNo1(1);
    }
    handleClickPrint=(print)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelPrint1(print);
    }
    handleClickTexture=(texture)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelTexture1(texture);
    }
    handleClickCloth=(length)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelClothLength1(length);
    }
    handleClickNeckLine=(neckline)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelNeckLine1(neckline);
    }
    handleClickKara=(kara)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelKara1(kara);
    }
    handleClickFit=(fit)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelFit1(fit);
    }

    handleDelete(){
        this.props.professionalLabelStore.deleteCategory1();
    }
    handleDeleteCloth(){
        this.props.professionalLabelStore.deleteClothLength1();
    }
    handleDeleteDetail(detail1){
        this.props.professionalLabelStore.deleteDetail1(detail1);
    }
    handleDeletePrint(){
        this.props.professionalLabelStore.deletePrint1();
    }
    handleDeleteNeckline(){
        this.props.professionalLabelStore.deleteNeckLine1();
    }
    handleDeleteTexture(){
        this.props.professionalLabelStore.deleteTexture1();
    }
    handleDeleteKara(){
        this.props.professionalLabelStore.deleteKara1();
    }
    handleDeleteFit(){
        this.props.professionalLabelStore.deleteFit1();
    }
    handleSubmit(){
        console.log("저장 1111 : ");
        if(this.props.onClick){
            this.props.onClick();
        }
    }
    handleClickAll(){
        console.log(this);
        this.props.professionalLabelStore.openCategoryAll(true);
    }
    render() {
        const {classes} = this.props;
        const {outerReviewLabel} = this.props.professionalLabelStore;
        const detail1 =outerReviewLabel.detailItemName1;
        console.log( detail1 );
        return (
            <Grid container spacing={3}>
                <Grid items xs={11} style={{margin:"auto", marginTop:10}}>
                    <CategoryAll1 />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <div className={classes.content}  style={{display:'inline'}} >
                        <Typography variant="h5" component="h5" style={{display:'inline'}} >
                            카테고리
                        </Typography>
                        <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                            <Category1 onClick={this.handleClickCategory} />
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        {outerReviewLabel.categoryCategoryNo1 > 0 ?
                            (<Button style={{fontSize:15, width:200, borderRadius:50 ,padding:0}} variant="outlined" color="primary" onClick={this.handleDelete} endIcon={<DeleteIcon />} > {outerReviewLabel.categoryItemName1} </Button> ) : ''
                        }
                    </div>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <div className={classes.content} style={{display:'inline'}}>
                        <Typography variant="h5" component="h5" style={{display:'inline' }}>
                            디테일
                        </Typography>
                        <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                            <Detail1 onClick={this.handleClickDetail}/>
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        {detail1.length > 0 ?(
                            detail1.map((detail1) =>
                                <Button
                                    style={{
                                        fontSize: 15,
                                        width: 200,
                                        borderRadius: 50,
                                        padding: 0
                                    }}
                                    variant="outlined"
                                    color="primary"
                                    onClick={()=>this.handleDeleteDetail(detail1)}
                                    endIcon={<DeleteIcon/>}
                                >
                                {detail1}
                                </Button>
                            )) : ''}

                    </div>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <div className={classes.content} style={{display:'inline'}}>
                        <Typography variant="h5" component="h5" style={{display:'inline'}}>
                            프린트
                        </Typography>
                        <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                            <Print1 onClick={this.handleClickPrint}/>
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        {outerReviewLabel.printCategoryNo1 > 0 ?
                            (<Button style={{fontSize:15, width:200, borderRadius:50 ,padding:0}} variant="outlined" color="primary" onClick={this.handleDeletePrint} endIcon={<DeleteIcon />} > {outerReviewLabel.printItemName1} </Button> ) : ''
                        }
                    </div>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <div className={classes.content} style={{display:'inline'}}>
                        <Typography variant="h5" component="h5" style={{display:'inline'}}>
                            소재감
                        </Typography>
                        <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                            <Texture1 onClick={this.handleClickTexture} />
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        {outerReviewLabel.textureCategoryNo1 > 0 ?
                            (<Button style={{fontSize:15, width:200, borderRadius:50 ,padding:0}} variant="outlined" color="primary" onClick={this.handleDeleteTexture} endIcon={<DeleteIcon />} > {outerReviewLabel.textureItemName1} </Button> ) : ''
                        }
                    </div>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <div className={classes.content} style={{display:'inline'}}>
                        <Typography variant="h5" component="h5" style={{display:'inline'}}>
                            기장
                        </Typography>
                        <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                            <ClothLength1 onClick={this.handleClickCloth}/>
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        {outerReviewLabel.clothLengthCategoryNo1 > 0 ?
                            (<Button style={{fontSize:15, width:200, borderRadius:50 ,padding:0}} variant="outlined" color="primary" onClick={this.handleDeleteCloth} endIcon={<DeleteIcon />} > {outerReviewLabel.clothLengthItemName1} </Button> ) : ''
                        }
                    </div>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <div className={classes.content} style={{display:'inline'}}>
                        <Typography variant="h5" component="h5" style={{display:'inline'}}>
                            넥라인
                        </Typography>
                        <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                            <NeckLine1 onClick={this.handleClickNeckLine}/>
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        {outerReviewLabel.neckLineCategoryNo1 > 0 ?
                            (<Button style={{fontSize:15, width:200, borderRadius:50 ,padding:0}} variant="outlined" color="primary" onClick={this.handleDeleteNeckline} endIcon={<DeleteIcon />} > {outerReviewLabel.neckLineItemName1} </Button> ) : ''
                        }
                    </div>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <div className={classes.content} style={{display:'inline'}}>
                        <Typography variant="h5" component="h5" style={{display:'inline'}}>
                            칼라(카라)
                        </Typography>
                        <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                            <ColorKara1 onClick={this.handleClickKara}/>
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        {outerReviewLabel.karaCategoryNo1 > 0 ?
                            (<Button style={{fontSize:15, width:200, borderRadius:50 ,padding:0}} variant="outlined" color="primary" onClick={this.handleDeleteKara} endIcon={<DeleteIcon />} > {outerReviewLabel.karaItemName1} </Button> ) : ''
                        }
                    </div>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <div className={classes.content} style={{display:'inline'}}>
                        <Typography variant="h5" component="h5" style={{display:'inline'}}>
                            핏
                        </Typography>
                        <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                            <Fit1 onClick={this.handleClickFit}/>
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        {outerReviewLabel.fitCategoryNo1 > 0 ?
                            (<Button style={{fontSize:15, width:200, borderRadius:50 ,padding:0}} variant="outlined" color="primary" onClick={this.handleDeleteFit} endIcon={<DeleteIcon />} > {outerReviewLabel.fitItemName1} </Button> ) : ''
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
export default withSnackbar(withRouter(withStyles(styles) (CategoryComponent1)));