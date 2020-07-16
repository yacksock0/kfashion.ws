import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Grid, Typography} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from "@material-ui/core/Chip";
import {withStyles} from "@material-ui/core/styles";

@inject('professionalLabelStore','authStore', 'workStore')
@observer
export default class Style extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNo:0,
            selectedName:'',
            selectedSubNo:0,
            selectedSubName:'',
            open: false,
            text: 'text',
            styleList: [],
            selectedOption:null,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleDeleteSub = this.handleDeleteSub.bind(this)
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/style')
            .then(response => {
                const styleList = response.data.styleList;
                this.setState({ styleList : styleList.map(style => {
                        style.value = style.no;
                        style.label = style.categoryItemName;
                        return style
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleClick = (style) => {
        this.setState({
            selectedNo:style.no,
            selectedName:style.categoryItemName
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelStyle(style);
        this.props.professionalLabelStore.changeNewProfessionalLabelNo5(5);
    };
    handleClickSub = (styleSub) =>{
        this.setState({
            selectedSubNo:styleSub.no,
            selectedSubName:styleSub.categoryItemName,
            open:false,
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelStyleSub(styleSub);
        // if(this.props.onClick) {
        //     this.props.onClick(this.state.selectedNo,this.state.selectedName,
        //         this.state.selectedSubNo,
        //         this.state.selectedSubName);
        // }
    }
    handleClickOpen(){
        this.setState({
            open:true,
        })
    }
    handleClose() {
        this.setState({
            open: false
        });
    }
    handleDelete(){
        this.setState({
            selectedNo:0,
            selectedName:'',
            selectedSubNo:0,
            selectedSubName:'',
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelNo5(0);
    }
    handleDeleteSub(){
        this.setState({
            selectedSubNo: 0,
            selectedSubName: '',
        })
    }
    render() {
        const styleList= this.state.styleList;
        const {outerReviewLabel, topReviewLabel, pantsReviewLabel, onePieceReviewLabel} =this.props.workStore;
        return (
            <div>
                <Grid item xs={12} lg={12}>
                    <div style={{display:'inline'}} >
                        <Typography variant="h5" component="h5" style={{display:'inline'}} >
                            스타일
                        </Typography>
                        <div style={{display:'inline-block', float:'right', marginTop : -3}}>
                            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>선택</Button>
                        </div>
                        <div>
                            <hr></hr>
                        </div>
                        <div style={{display:"inline-block", marginRight:10}}>
                            <Button style={{fontSize:20, width:150, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDelete} endIcon={<DeleteIcon />} > {outerReviewLabel.styleItemName} </Button>
                            <Button style={{fontSize:20, width:150, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDelete} endIcon={<DeleteIcon />} > {outerReviewLabel.styleSubItemName} </Button>
                        {this.state.selectedNo > 0 ?
                            (<Button style={{fontSize:20, width:150, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDelete} endIcon={<DeleteIcon />} > {this.state.selectedName} </Button> ) : ''
                        }
                        </div>
                        <div style={{display:"inline-block"}}>
                            {this.state.selectedSubNo > 0 ?
                                (<Button style={{fontSize:20, width:150, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDeleteSub} endIcon={<DeleteIcon />} > {this.state.selectedSubName} </Button> ) : ''
                            }
                        </div>
                    </div>
                </Grid>

                <Dialog open={this.state.open} onClose={this.handleClose} style={{marginLeft:'50%', marginTop:'-7%'}}
                        maxWidth={"lg"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Grid container style={{height:'100%'}}>
                            <Grid item xs={6} style={{padding:10}}>
                        <Typography variant="h5" component="h2" style={{display:'inline'}}>
                            메인 스타일
                        </Typography>
                                <div style={{display:'inline-block', float:'right', marginTop: -3}}>
                                {this.state.selectedNo > 0 ?
                                    (<Chip
                                        variant="outlined"
                                        label={this.state.selectedName}
                                        onDelete={this.handleDelete}
                                        color="primary"
                                    />) : ''
                                }
                                </div>
                        <hr></hr>
                                <Grid container>
                                    {styleList.map((style) =>
                                        <Grid item xs={3}>
                                            <div style={{textAlign:'center', margin:5}}>
                                                <Button style={{width:'100%', height:60,padding:0}} variant="outlined" key={style.no} onClick={() => this.handleClick(style)}>
                                                    <h3>{style.categoryItemName}</h3>
                                                </Button>
                                            </div>
                                        </Grid>
                                    )
                                    }
                                </Grid>
                            </Grid>
                            <Grid item xs={6} style={{padding:10}}>
                                <Typography variant="h5" component="h2">
                                    서브 스타일
                                </Typography>
                                <hr></hr>
                                {!this.state.selectedNo == 0 ?
                                <Grid container>
                                    {styleList.map((style) =>
                                        <Grid item xs={3}>
                                            <div style={{textAlign:'center', margin:5}}>
                                                <Button style={{width:'100%', height:60,padding:0}} variant="outlined" key={style.no} onClick={() => this.handleClickSub(style)}>
                                                    <h3>{style.categoryItemName}</h3>
                                                </Button>
                                            </div>
                                        </Grid>
                                    )
                                    }
                                </Grid>
                                :''}
                            </Grid>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
