import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Grid, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Chip from "@material-ui/core/Chip";



@inject('professionalLabelStore','authStore')
@observer
export default class CategoryAll3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            open: false,
            categoryList3: [],
            lengthList3:[],
            printList3:[],
            textureList3:[],
            detailList3:[],
            karaList3:[],
            neckLineList3:[],
            fitList3:[],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/category')
            .then(response => {
                const categoryList3 = response.data.categoryList3;
                this.setState({categoryList3:categoryList3,
                })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/length')
            .then(response => {
                const lengthList3 = response.data.lengthList3;
                this.setState({lengthList3:lengthList3,
                    })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/print')
            .then(response => {
                const printList3 = response.data.printList3;
                this.setState({ printList3 : printList3})
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/texture')
            .then(response => {
                const textureList3 = response.data.textureList3;
                this.setState({ textureList3 : textureList3})
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/kara')
            .then(response => {
                const karaList3 = response.data.karaList3;
                this.setState({ karaList3 : karaList3,
                })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/detail')
            .then(response => {
                const detailList3 = response.data.detailList3;
                this.setState({detailList3:detailList3
                })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/fit')
            .then(response => {
                const fitList3 = response.data.fitList3;
                this.setState({fitList3:fitList3,
                })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/neckLine')
            .then(response => {
                const neckLineList3 = response.data.neckLineList3;
                this.setState({
                    neckLineList3: neckLineList3,
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleClickOpen() {
        this.props.professionalLabelStore.openCategoryAll3(true);
    }
    handleClose() {
        this.props.professionalLabelStore.openCategoryAll3(false);
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
        this.props.professionalLabelStore.changeNewProfessionalLabelCategory3(category);
    }
    handleClickDetail=(detail)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelDetail3(detail);
        this.props.professionalLabelStore.changeNewProfessionalLabelNo3(1);
    }
    handleClickPrint=(print)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelPrint3(print);
    }
    handleClickTexture=(texture)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelTexture3(texture);
    }
    handleClickCloth=(length)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelClothLength3(length);
    }
    handleClickFit=(fit)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelFit3(fit);
        this.props.professionalLabelStore.openCategoryAll3(false);
    }
    render() {
        const {pantsReviewLabel} = this.props.professionalLabelStore;
        const categoryList3= this.state.categoryList3;
        const lengthList3= this.state.lengthList3;
        const detailList3= this.state.detailList3;
        const fitList3= this.state.fitList3;
        const printList3= this.state.printList3;
        const textureList3= this.state.textureList3;

        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen} style={{width:'100%', borderRadius:15}}>항목 전체선택</Button>
                <Dialog open={this.props.professionalLabelStore.menuOpen.categoryAll3} onClose={this.handleClose} style={{marginLeft:'50%'}}
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
                            {pantsReviewLabel.categoryCategoryNo3 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={pantsReviewLabel.categoryItemName3}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {categoryList3.map((category) =>
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
                            {pantsReviewLabel.detailCategoryNo3 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={pantsReviewLabel.detailItemName3}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {detailList3.map((detail) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button style={{width:'100%', height:30, padding:0}} variant="outlined" key={detail.no} onClick={() => this.handleClickDetail(detail)}>
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
                            {pantsReviewLabel.printCategoryNo3 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={pantsReviewLabel.printItemName3}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {printList3.map((print) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button style={{width:'100%', height:30, padding:0}} variant="outlined" key={print.no} onClick={() => this.handleClickPrint(print)}>
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
                            {pantsReviewLabel.textureCategoryNo3 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={pantsReviewLabel.textureItemName3}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {textureList3.map((texture) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button style={{width:'100%', height:30, padding:0}} variant="outlined" key={texture.no} onClick={() => this.handleClickTexture(texture)}>
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
                            {pantsReviewLabel.clothLengthCategoryNo3 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={pantsReviewLabel.clothLengthItemName3}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {lengthList3.map((length) =>
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
                            핏
                        </Typography>
                        <div style={{display:'inline-block',float:'right'}}>
                            {pantsReviewLabel.fitCategoryNo3 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={pantsReviewLabel.fitItemName3}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {fitList3.map((fit) =>
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