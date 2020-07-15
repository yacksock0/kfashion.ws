import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Button, Container, Grid, Typography} from "@material-ui/core";
import Category2 from "../step3/Category2";
import Style from "../step3/Style";
import Detail from "../step3/Detail";
import Print from "../step3/Print";
import Texture from "../step3/Texture";
import ClothLength2 from "../step3/ClothLength2";
import NeckLine from "../step3/NeckLine";
import ColorKara from "../step3/ColorKara";
import Fit3 from "../step3/Fit3";
import Safe from "../step3/Safe";
import Silhouette from "../step3/Silhouette";
import {inject, observer} from "mobx-react";
import Chip from "@material-ui/core/Chip";
import DeleteIcon from "@material-ui/icons/Delete";

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
        this.handleDeleteSafe = this.handleDeleteSafe.bind(this)
        this.handleDeleteSilhouette = this.handleDeleteSilhouette.bind(this)

    }
    componentDidMount() {
        this.props.professionalLabelStore.changeNewProfessionalLabelWorkNo(this.props.imageStore.isWorkNo);
    }
    handleClickCategory=(category)=>{
        console.log(category.no);
        this.setState({
            categoryNo: category.no,
            categoryName: category.categoryItemName,
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelCategory2(category);
        this.props.professionalLabelStore.changeNewProfessionalLabelNo3(3);
    }

    handleClickDetail=(detail)=>{
        this.setState({
            detailNo: detail.no,
            detailName: detail.categoryItemName,
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelDetail2(detail);
    }
    handleClickPrint=(print)=>{
        this.setState({
            printNo: print.no,
            printName: print.categoryItemName,
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelPrint2(print);
    }
    handleClickTexture=(texture)=>{
        this.setState({
            textureNo: texture.no,
            textureName: texture.categoryItemName,
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelTexture2(texture);
    }
    handleClickCloth=(length)=>{
        this.setState({
            lengthNo: length.no,
            lengthName: length.categoryItemName,
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelClothLength2(length);
    }
    handleClickNeckLine=(neckline)=>{
        this.setState({
            necklineNo: neckline.no,
            necklineName: neckline.categoryItemName,
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelNeckLine2(neckline);
    }
    handleClickKara=(kara)=>{
        this.setState({
            karaNo: kara.no,
            karaName: kara.categoryItemName,
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelKara2(kara);
    }
    handleClickFit=(fit)=>{
        this.setState({
            fitNo: fit.no,
            fitName: fit.categoryItemName,
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelFit2(fit);
    }

    handleDelete(){
        this.setState({
            categoryNo:0,
            categoryName:'',
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelNo3(0);
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
    handleSubmit=()=>{
        const createdId=this.props.authStore.loginUser.id;
        this.props.professionalLabelStore.changeNewProfessionalLabelCreatedId(createdId);
        this.props.professionalLabelStore.doProfessionalLabelUp();
    }
    render() {
        const {classes} = this.props;
        console.log('lastIndex', this.props.polyLast)
        console.log('tabIndex1', this.props.tabIndex1)
        return (
                    <Grid container spacing={3} style={{marginTop: 10}}>
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
                                            {this.state.categoryNo > 0 ?
                                                (<Button style={{fontSize:20, width:180, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDelete} endIcon={<DeleteIcon />} > {this.state.categoryName} </Button> ) : ''
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline' }}>
                                                디테일
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <Detail onClick={this.handleClickDetail}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {this.state.detailNo > 0 ?
                                                (<Button style={{fontSize:20, width:180, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDeleteDetail} endIcon={<DeleteIcon />} > {this.state.detailName} </Button> ) : ''
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline'}}>
                                                프린트
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <Print onClick={this.handleClickPrint}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {this.state.printNo > 0 ?
                                                (<Button style={{fontSize:20, width:180, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDeletePrint} endIcon={<DeleteIcon />} > {this.state.printName} </Button> ) : ''
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline'}}>
                                                소재감
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <Texture onClick={this.handleClickTexture} />
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {this.state.textureNo > 0 ?
                                                (<Button style={{fontSize:20, width:180, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDeleteTexture} endIcon={<DeleteIcon />} > {this.state.textureName} </Button> ) : ''
                                            }
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
                                            {this.state.lengthNo > 0 ?
                                                (<Button style={{fontSize:20, width:180, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDeleteCloth} endIcon={<DeleteIcon />} > {this.state.lengthName} </Button> ) : ''
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline'}}>
                                                넥라인
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <NeckLine onClick={this.handleClickNeckLine}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {this.state.necklineNo > 0 ?
                                            (<Button style={{fontSize:20, width:180, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDeleteNeckline} endIcon={<DeleteIcon />} > {this.state.necklineName} </Button> ) : ''
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline'}}>
                                                칼라(카라)
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <ColorKara onClick={this.handleClickKara}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {this.state.karaNo > 0 ?
                                                (<Button style={{fontSize:20, width:180, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDeleteKara} endIcon={<DeleteIcon />} > {this.state.karaName} </Button> ) : ''
                                            }
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} lg={6}>
                                        <div className={classes.content} style={{display:'inline'}}>
                                            <Typography variant="h5" component="h5" style={{display:'inline'}}>
                                                핏
                                            </Typography>
                                            <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                                                <Fit3 onClick={this.handleClickFit}/>
                                            </div>
                                            <div>
                                                <hr></hr>
                                            </div>
                                            {this.state.fitNo > 0 ?
                                                (<Button style={{fontSize:20, width:180, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDeleteFit} endIcon={<DeleteIcon />} > {this.state.fitName} </Button> ) : ''
                                            }
                                        </div>
                                        <Button style={{marginTop: 50}}
                                                type="button"
                                                className={classes.buttonType2}
                                                color="primary"
                                                variant="outlined"
                                                onClick={()=>this.handleSubmit()}
                                        >
                                            저장
                                        </Button>
                                    </Grid>
                                    {/*<Grid item xs={12} lg={6}>*/}
                                    {/*    <div className={classes.content} style={{display:'inline'}}>*/}
                                    {/*        <Typography variant="h5" component="h5" style={{display:'inline'}}>*/}
                                    {/*            세이프*/}
                                    {/*        </Typography>*/}
                                    {/*        <div style={{display:'inline-block', float:'right', marginTop : -3}}>*/}
                                    {/*            <Safe onClick={this.handleClickSafe}/>*/}
                                    {/*        </div>*/}
                                    {/*        <div>*/}
                                    {/*            <hr></hr>*/}
                                    {/*        </div>*/}
                                    {/*        {this.state.safeNo > 0 ?*/}
                                    {/*            (<Chip*/}
                                    {/*                variant="outlined"*/}
                                    {/*                label={this.state.safeName}*/}
                                    {/*                onDelete={this.handleDeleteSafe}*/}
                                    {/*                color="primary"*/}
                                    {/*            />) : ''*/}
                                    {/*        }*/}
                                    {/*    </div>*/}
                                    {/*</Grid>*/}
                                    {/*<Grid item xs={12} lg={6}>*/}
                                    {/*    <div className={classes.content} style={{display:'inline'}}>*/}
                                    {/*        <Typography variant="h5" component="h5" style={{display:'inline'}}>*/}
                                    {/*            실루엣*/}
                                    {/*        </Typography>*/}
                                    {/*        <div style={{display:'inline-block', float:'right', marginTop : -3}}>*/}
                                    {/*            <Silhouette onClick={this.handleClickSilhouette}/>*/}
                                    {/*        </div>*/}
                                    {/*        <div>*/}
                                    {/*            <hr></hr>*/}
                                    {/*        </div>*/}
                                    {/*        {this.state.silhouetteNo > 0 ?*/}
                                    {/*            (<Chip*/}
                                    {/*                variant="outlined"*/}
                                    {/*                label={this.state.silhouetteName}*/}
                                    {/*                onDelete={this.handleDeleteSilhouette}*/}
                                    {/*                color="primary"*/}
                                    {/*            />) : ''*/}
                                    {/*        }*/}
                                    {/*    </div>*/}
                                    {/*</Grid>*/}
                                </Grid>

        );
    }
};
export default withSnackbar(withRouter(withStyles(styles) (CategoryComponent2)));