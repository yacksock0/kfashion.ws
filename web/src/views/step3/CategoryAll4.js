import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Grid, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Chip from "@material-ui/core/Chip";
import DeleteIcon from "@material-ui/icons/Delete";



@inject('professionalLabelStore','authStore')
@observer
export default class CategoryAll4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            open: false,
            categoryList4: [],
            lengthList4:[],
            printList4:[],
            textureList4:[],
            detailList4:[],
            karaList4:[],
            neckLineList4:[],
            fitList4:[],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/category')
            .then(response => {
                const categoryList4 = response.data.categoryList4;
                console.log('categoryList1',categoryList4)
                this.setState({categoryList4:categoryList4,
                })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/length')
            .then(response => {
                const lengthList4 = response.data.lengthList4;
                this.setState({lengthList4:lengthList4,
                    })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/print')
            .then(response => {
                const printList4 = response.data.printList4;
                this.setState({ printList4 : printList4})
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/texture')
            .then(response => {
                const textureList4 = response.data.textureList4;
                this.setState({ textureList4 : textureList4})
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/kara')
            .then(response => {
                const karaList4 = response.data.karaList4;
                this.setState({ karaList4 : karaList4,
                })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/detail')
            .then(response => {
                const detailList4 = response.data.detailList4;
                this.setState({detailList4:detailList4
                })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/fit')
            .then(response => {
                const fitList4 = response.data.fitList4;
                this.setState({fitList4:fitList4,
                })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/neckLine')
            .then(response => {
                const neckLineList4 = response.data.neckLineList4;
                this.setState({
                    neckLineList4: neckLineList4,
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleClickOpen() {
        this.props.professionalLabelStore.openCategoryAll4(true);
    }
    handleClose() {
        this.props.professionalLabelStore.openCategoryAll4(false);
    }
    // handleClick(category){
    //     console.log(category);
    //     this.props.professionalLabelStore.changeNewProfessionalLabelCategory1(category);
    //     this.setState({
    //         open:false,
    //     })
    //
    // }
    handleClick(category){
        this.props.professionalLabelStore.changeNewProfessionalLabelCategory4(category);
    }
    handleClickDetail=(detail)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelDetail4(detail);
        this.props.professionalLabelStore.changeNewProfessionalLabelNo4(4);
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
        this.props.professionalLabelStore.openCategoryAll4(false);
    }
    handleDeleteDetail=(detail4)=>{
        if(this.props.onClick){
            this.props.onClick(detail4);
        }
    }
    handleDeletePrint=(print4)=>{
        if(this.props.onClickPrint4){
            this.props.onClickPrint4(print4);
        }
    }
    handleDeleteTexture=(texture4)=>{
        if(this.props.onClickTexture4){
            this.props.onClickTexture4(texture4);
        }
    }
    render() {
        const categoryList4= this.state.categoryList4;
        const lengthList4= this.state.lengthList4;
        const karaList4= this.state.karaList4;
        const detailList4= this.state.detailList4;
        const fitList4= this.state.fitList4;
        const neckLineList4= this.state.neckLineList4;
        const printList4= this.state.printList4;
        const textureList4= this.state.textureList4;
        const {onePieceReviewLabel} =this.props.professionalLabelStore;
        const detail4 =onePieceReviewLabel.detailItemName4;
        const print4 =onePieceReviewLabel.printItemName4;
        const texture4 =onePieceReviewLabel.textureItemName4;
        return (
            <div>
                <Button variant="outlined" onClick={this.handleClickOpen} style={{width:'100%', borderRadius:15, fontSize:20}}>항목 전체선택</Button>
                <Dialog open={this.props.professionalLabelStore.menuOpen.categoryAll4} onClose={this.handleClose} style={{marginLeft:'50%'}}
                        maxWidth={"md"}
                        fullWidth={"100%"}
                        height={'100%'}
                        marginLeft={'50%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2" style={{display:'inline'}}>
                            카테고리
                        </Typography>
                        <div style={{display:'inline-block',float:'right'}}>
                            {onePieceReviewLabel.categoryCategoryNo4 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={onePieceReviewLabel.categoryItemName4}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {categoryList4.map((category) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:10}}>
                                        <Button style={{width:'100%', height:30, padding:0}} variant="outlined" key={category.no} onClick={() => this.handleClick(category)}>
                                            <h4>{category.categoryItemName}</h4>
                                        </Button>
                                    </div>
                                </Grid>
                            )
                            }
                        </Grid>
                        <Typography variant="h5" component="h2" style={{display:'inline'}}>
                            디테일
                        </Typography>
                        <div style={{display:'inline-block',float:'right'}}>
                            {detail4 != null  && detail4 != undefined  ?(
                                detail4.map((detail4) =>
                                    <Button
                                        style={{
                                            fontSize: 15,
                                            width: 200,
                                            borderRadius: 50,
                                            padding: 0
                                        }}
                                        variant="outlined"
                                        color="primary"
                                        onClick={()=>this.handleDeleteDetail(detail4)}
                                        endIcon={<DeleteIcon/>}
                                    >
                                        {detail4}
                                    </Button>
                                )) : ''}
                        </div>
                        <hr></hr>
                        <Grid container>
                            {detailList4.map((detail) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button
                                            style={{width:'100%', height:30, padding:0}}
                                            variant="outlined"
                                            key={detail.no}
                                            disabled = {detail4 != undefined?
                                                detail.categoryItemName == detail4.filter((check) => check==detail.categoryItemName
                                                ) : ""
                                            }
                                            onClick={() => this.handleClickDetail(detail)}
                                        >
                                            <h4>{detail.categoryItemName}</h4>
                                        </Button>
                                    </div>
                                </Grid>
                            )
                            }
                        </Grid>
                        <Typography variant="h5" component="h2" style={{display:'inline'}}>
                            프린트
                        </Typography>
                        <div style={{display:'inline-block',float:'right'}}>
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
                        <hr></hr>
                        <Grid container>
                            {printList4.map((print) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button
                                            style={{width:'100%', height:30, padding:0}}
                                            variant="outlined"
                                            key={print.no}
                                            disabled = {print4 != undefined?
                                                print.categoryItemName == print4.filter((check) => check==print.categoryItemName
                                                ) : ""
                                            }
                                            onClick={() => this.handleClickPrint(print)}>
                                            <h4>{print.categoryItemName}</h4>
                                        </Button>
                                    </div>
                                </Grid>
                            )
                            }

                        </Grid>
                        <Typography variant="h5" component="h2" style={{display:'inline'}}>
                            소재감
                        </Typography>
                        <div style={{display:'inline-block',float:'right'}}>
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
                        <hr></hr>
                        <Grid container>
                            {textureList4.map((texture) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button
                                            style={{width:'100%', height:30, padding:0}}
                                            variant="outlined"
                                            key={texture.no}
                                            disabled = {texture4 != undefined?
                                                texture.categoryItemName == texture4.filter((check) => check==texture.categoryItemName
                                                ) : ""
                                            }
                                            onClick={() => this.handleClickTexture(texture)}>
                                            <h4>{texture.categoryItemName}</h4>
                                        </Button>
                                    </div>
                                </Grid>
                            )
                            }
                        </Grid>
                        <Typography variant="h5" component="h2" style={{display:'inline'}}>
                            기장
                        </Typography>
                        <div style={{display:'inline-block',float:'right'}}>
                            {onePieceReviewLabel.clothLengthCategoryNo4 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={onePieceReviewLabel.clothLengthItemName4}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {lengthList4.map((length) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button style={{width:'100%', height:30, padding:0}} variant="outlined" key={length.no} onClick={() => this.handleClickCloth(length)}>
                                            <h4>{length.categoryItemName}</h4>
                                        </Button>
                                    </div>
                                </Grid>
                            )
                            }
                        </Grid>
                        <Typography variant="h5" component="h2" style={{display:'inline'}}>
                            넥라인
                        </Typography>
                        <div style={{display:'inline-block',float:'right'}}>
                            {onePieceReviewLabel.neckLineCategoryNo4 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={onePieceReviewLabel.neckLineItemName4}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {neckLineList4.map((neckLine) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button style={{width:'100%', height:30, padding:0}} variant="outlined" key={neckLine.no} onClick={() => this.handleClickNeckLine(neckLine)}>
                                            <h4>{neckLine.categoryItemName}</h4>
                                        </Button>
                                    </div>
                                </Grid>
                            )
                            }
                        </Grid>
                        <Typography variant="h5" component="h2" style={{display:'inline'}}>
                            카라
                        </Typography>
                        <div style={{display:'inline-block',float:'right'}}>
                            {onePieceReviewLabel.karaCategoryNo4 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={onePieceReviewLabel.karaItemName4}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {karaList4.map((kara) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button style={{width:'100%', height:30, padding:0}} variant="outlined" key={kara.no} onClick={() => this.handleClickKara(kara)}>
                                            <h4>{kara.categoryItemName}</h4>
                                        </Button>
                                    </div>
                                </Grid>
                            )
                            }
                        </Grid>
                        <Typography variant="h5" component="h2" style={{display:'inline'}}>
                            핏
                        </Typography>
                        <div style={{display:'inline-block',float:'right'}}>
                            {onePieceReviewLabel.fitCategoryNo4 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={onePieceReviewLabel.fitItemName4}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {fitList4.map((fit) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button style={{width:'100%', height:30, padding:0}} variant="outlined" key={fit.no} onClick={() => this.handleClickFit(fit)}>
                                            <h4>{fit.categoryItemName}</h4>
                                        </Button>
                                    </div>
                                </Grid>
                            )
                            }
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}