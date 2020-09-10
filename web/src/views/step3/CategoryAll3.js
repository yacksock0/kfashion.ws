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
        this.handleClick =this.handleClick.bind(this);
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
    handleDeleteDetail=(detail3)=>{
        if(this.props.onClick){
            this.props.onClick(detail3);
        }
    }
    handleDeletePrint=(print3)=>{
        if(this.props.onClickPrint3){
            this.props.onClickPrint3(print3);
        }
    }
    handleDeleteTexture=(texture3)=>{
        if(this.props.onClickTexture3){
            this.props.onClickTexture3(texture3);
        }
    }
    render() {
        const categoryList3= this.state.categoryList3;
        const lengthList3= this.state.lengthList3;
        const detailList3= this.state.detailList3;
        const fitList3= this.state.fitList3;
        const printList3= this.state.printList3;
        const textureList3= this.state.textureList3;
        const {pantsReviewLabel} = this.props.professionalLabelStore;
        const detail3 =pantsReviewLabel.detailItemName3;
        const print3 =pantsReviewLabel.printItemName3;
        const texture3 =pantsReviewLabel.textureItemName3;

        return (
            <div>
                <Button variant="outlined" onClick={this.handleClickOpen} style={{width:'100%', borderRadius:15, fontSize:20}}>항목 전체선택</Button>
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
                                />) : ''
                            }
                        </div>
                        <hr></hr>
                        <Grid container>
                            {categoryList3.map((category) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
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
                            {detail3 !== null  && detail3 !== undefined  ?(
                                detail3.map((detail3) =>
                                    <Button
                                        style={{
                                            fontSize: 15,
                                            width: 200,
                                            borderRadius: 50,
                                            padding: 0
                                        }}
                                        variant="outlined"
                                        onClick={()=>this.handleDeleteDetail(detail3)}
                                        endIcon={<DeleteIcon/>}
                                    >
                                        {detail3}
                                    </Button>
                                )) : ''}
                        </div>
                        <hr></hr>
                        <Grid container>
                            {detailList3.map((detail) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button
                                            style={{width:'100%', height:30, padding:0}}
                                            variant="outlined"
                                            key={detail.no}
                                            disabled = {detail3 !== undefined?
                                                detail.categoryItemName === detail3.filter((check) => check===detail.categoryItemName
                                                ) : ""
                                            }
                                            onClick={() => this.handleClickDetail(detail)}>
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
                            {print3 !== 0  && print3 !== undefined  ?(
                                print3.map((print3) =>
                                    <Button
                                        style={{fontSize:15, width:200, borderRadius:50 ,padding:0}}
                                        variant="outlined"
                                        onClick={() => this.handleDeletePrint(print3)}
                                        endIcon={<DeleteIcon />}
                                    >
                                        {print3}
                                    </Button>
                                )
                            ) : ''}
                        </div>
                        <hr></hr>
                        <Grid container>
                            {printList3.map((print) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button
                                            style={{width:'100%', height:30, padding:0}}
                                            variant="outlined"
                                            key={print.no}
                                            disabled = {print3 !== undefined?
                                                print.categoryItemName === print3.filter((check) => check===print.categoryItemName
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
                            {texture3 !== null  && texture3 !== undefined  ?(
                                texture3.map((texture3) =>
                                    <Button
                                        style={{
                                            fontSize: 15,
                                            width: 200,
                                            borderRadius: 50,
                                            padding: 0
                                        }}
                                        variant="outlined"
                                        onClick={()=>this.handleDeleteTexture(texture3)}
                                        endIcon={<DeleteIcon/>}
                                    >
                                        {texture3}
                                    </Button>
                                )) : ''}
                        </div>
                        <hr></hr>
                        <Grid container>
                            {textureList3.map((texture) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button
                                            style={{width:'100%', height:30, padding:0}}
                                            variant="outlined"
                                            key={texture.no}
                                            disabled = {texture3 !== undefined?
                                                texture.categoryItemName === texture3.filter((check) => check===texture.categoryItemName
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
                            {pantsReviewLabel.clothLengthCategoryNo3 > 0 ?
                                (<Chip
                                    variant="outlined"
                                    label={pantsReviewLabel.clothLengthItemName3}
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