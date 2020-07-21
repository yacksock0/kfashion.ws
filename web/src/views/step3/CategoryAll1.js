import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Grid, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Chip from "@material-ui/core/Chip";



@inject('professionalLabelStore','authStore')
@observer
export default class CategoryAll1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            open: false,
            categoryList1: [],
            lengthList1:[],
            printList1:[],
            textureList1:[],
            detailList1:[],
            karaList1:[],
            neckLineList1:[],
            fitList1:[],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/category')
            .then(response => {
                const categoryList1 = response.data.categoryList1;
                console.log('categoryList1',categoryList1)
                this.setState({categoryList1:categoryList1,
                })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/length')
            .then(response => {
                const lengthList1 = response.data.lengthList1;
                this.setState({lengthList1:lengthList1,
                    })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/print')
            .then(response => {
                const printList1 = response.data.printList1;
                this.setState({ printList1 : printList1})
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/texture')
            .then(response => {
                const textureList1 = response.data.textureList1;
                this.setState({ textureList1 : textureList1})
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/kara')
            .then(response => {
                const karaList1 = response.data.karaList1;
                this.setState({ karaList1 : karaList1,
                })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/detail')
            .then(response => {
                const detailList1 = response.data.detailList1;
                this.setState({detailList1:detailList1
                })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/fit')
            .then(response => {
                const fitList1 = response.data.fitList1;
                this.setState({fitList1:fitList1,
                })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/neckLine')
            .then(response => {
                const neckLineList1 = response.data.neckLineList1;
                this.setState({
                    neckLineList1: neckLineList1,
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleClickOpen() {
        this.props.professionalLabelStore.openCategoryAll1(true);
    }
    handleClose() {
        this.props.professionalLabelStore.openCategoryAll1(false);
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
        this.props.professionalLabelStore.openCategoryAll1(false);
    }
    render() {
        const categoryList1= this.state.categoryList1;
        const lengthList1= this.state.lengthList1;
        const karaList1= this.state.karaList1;
        const detailList1= this.state.detailList1;
        const fitList1= this.state.fitList1;
        const neckLineList1= this.state.neckLineList1;
        const printList1= this.state.printList1;
        const textureList1= this.state.textureList1;
        const {outerReviewLabel} = this.props.professionalLabelStore;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen} style={{width:'100%', borderRadius:15}}>항목 전체선택</Button>
                <Dialog open={this.props.professionalLabelStore.menuOpen.categoryAll1} onClose={this.handleClose} style={{marginLeft:'50%'}}
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
                            {outerReviewLabel.categoryCategoryNo1 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={outerReviewLabel.categoryItemName1}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {categoryList1.map((category) =>
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
                            {outerReviewLabel.detailCategoryNo1 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={outerReviewLabel.detailItemName1}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {detailList1.map((detail) =>
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
                            {outerReviewLabel.printCategoryNo1 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={outerReviewLabel.printItemName1}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {printList1.map((print) =>
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
                            {outerReviewLabel.textureCategoryNo1 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={outerReviewLabel.textureItemName1}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {textureList1.map((texture) =>
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
                            {outerReviewLabel.clothLengthCategoryNo1 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={outerReviewLabel.clothLengthItemName1}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {lengthList1.map((length) =>
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
                            {outerReviewLabel.neckLineCategoryNo1 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={outerReviewLabel.neckLineItemName1}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {neckLineList1.map((neckLine) =>
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
                            {outerReviewLabel.karaCategoryNo1 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={outerReviewLabel.karaItemName1}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {karaList1.map((kara) =>
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
                            {outerReviewLabel.fitCategoryNo1 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={outerReviewLabel.fitItemName1}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {fitList1.map((fit) =>
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