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
export default class CategoryAll2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            open: false,
            categoryList2: [],
            lengthList2:[],
            printList2:[],
            textureList2:[],
            detailList2:[],
            karaList2:[],
            neckLineList2:[],
            fitList2:[],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/category')
            .then(response => {
                const categoryList2 = response.data.categoryList2;
                this.setState({categoryList2:categoryList2,
                })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/length')
            .then(response => {
                const lengthList2 = response.data.lengthList2;
                this.setState({lengthList2:lengthList2,
                    })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/print')
            .then(response => {
                const printList2 = response.data.printList2;
                this.setState({ printList2 : printList2})
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/texture')
            .then(response => {
                const textureList2 = response.data.textureList2;
                this.setState({ textureList2 : textureList2})
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/kara')
            .then(response => {
                const karaList2 = response.data.karaList2;
                this.setState({ karaList2 : karaList2,
                })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/detail')
            .then(response => {
                const detailList2 = response.data.detailList2;
                this.setState({detailList2:detailList2
                })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/fit')
            .then(response => {
                const fitList2 = response.data.fitList2;
                this.setState({fitList2:fitList2,
                })
            })
            .catch(error => {
                console.log(error)
            })
        axios.get('/api/v1/kfashion/category/item/professional/neckLine')
            .then(response => {
                const neckLineList2 = response.data.neckLineList2;
                this.setState({
                    neckLineList2: neckLineList2,
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleClickOpen() {
        this.props.professionalLabelStore.openCategoryAll2(true);
    }
    handleClose() {
        this.props.professionalLabelStore.openCategoryAll2(false);
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
        this.props.professionalLabelStore.changeNewProfessionalLabelCategory2(category);
    }
    handleClickDetail=(detail)=>{
        this.props.professionalLabelStore.changeNewProfessionalLabelDetail2(detail);
        this.props.professionalLabelStore.changeNewProfessionalLabelNo2(2);
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
        this.props.professionalLabelStore.openCategoryAll2(false);
    }

    handleDeleteDetail=(detail2)=>{
        if(this.props.onClick){
            this.props.onClick(detail2);
        }
    }

    handleDeletePrint=(print2)=>{
        if(this.props.onClickPrint2){
            this.props.onClickPrint2(print2);
        }
    }
    handleDeleteTexture=(texture2)=>{
        if(this.props.onClickTexture2){
            this.props.onClickTexture2(texture2);
        }
    }
    render() {
        const categoryList2= this.state.categoryList2;
        const lengthList2= this.state.lengthList2;
        const karaList2= this.state.karaList2;
        const detailList2= this.state.detailList2;
        const fitList2= this.state.fitList2;
        const neckLineList2= this.state.neckLineList2;
        const printList2= this.state.printList2;
        const textureList2= this.state.textureList2;
        const {topReviewLabel} = this.props.professionalLabelStore;
        const detail2 =topReviewLabel.detailItemName2;
        const print2 =topReviewLabel.printItemName2;
        const texture2 =topReviewLabel.textureItemName2;
        return (
            <div>
                <Button variant="outlined" onClick={this.handleClickOpen} style={{width:'100%', borderRadius:15, fontSize:20}}>항목 전체선택</Button>
                <Dialog open={this.props.professionalLabelStore.menuOpen.categoryAll2} onClose={this.handleClose} style={{marginLeft:'50%'}}
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
                            {topReviewLabel.categoryCategoryNo2 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={topReviewLabel.categoryItemName2}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {categoryList2.map((category) =>
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
                            {detail2 != null  && detail2 != undefined  ?(
                                detail2.map((detail2) =>
                                    <Button
                                        style={{
                                            fontSize: 15,
                                            width: 200,
                                            borderRadius: 50,
                                            padding: 0
                                        }}
                                        variant="outlined"
                                        color="primary"
                                        onClick={()=>this.handleDeleteDetail(detail2)}
                                        endIcon={<DeleteIcon/>}
                                    >
                                        {detail2}
                                    </Button>
                                )) : ''}

                        </div>
                        <hr></hr>
                        <Grid container>
                            {detailList2.map((detail) =>
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
                        <hr></hr>
                        <Grid container>
                            {printList2.map((print) =>
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
                        <hr></hr>
                        <Grid container>
                            {textureList2.map((texture) =>
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
                            {topReviewLabel.clothLengthCategoryNo2 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={topReviewLabel.clothLengthItemName2}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {lengthList2.map((length) =>
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
                            {topReviewLabel.neckLineCategoryNo2 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={topReviewLabel.neckLineItemName2}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {neckLineList2.map((neckLine) =>
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
                            {topReviewLabel.karaCategoryNo2 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={topReviewLabel.karaItemName2}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {karaList2.map((kara) =>
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
                        <Typography variant="h5" component="h2"style={{display:'inline'}}>
                            핏
                        </Typography>
                        <div style={{display:'inline-block',float:'right'}}>
                            {topReviewLabel.fitCategoryNo2 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={topReviewLabel.fitItemName2}
                                    color="primary"
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {fitList2.map((fit) =>
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