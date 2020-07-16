import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Grid, Typography} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from "@material-ui/core/Chip";

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
                this.setState({ styleList : styleList
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleClick = (style) => {
        this.props.professionalLabelStore.changeNewProfessionalLabelStyle(style);
        this.props.professionalLabelStore.changeNewProfessionalLabelNo5(5);
    };
    handleClickSub = (styleSub) =>{
        this.setState({
            open:false,
        })
        this.props.professionalLabelStore.changeNewProfessionalLabelStyleSub(styleSub);
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
        this.props.professionalLabelStore.deleteStyle();
        this.props.professionalLabelStore.changeNewProfessionalLabelNo5(0);
    }
    handleDeleteSub(){
        this.props.professionalLabelStore.deleteSubStyle();
    }
    render() {
        const styleList= this.state.styleList;
        const {styleReviewLabel} =this.props.professionalLabelStore;
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
                            {styleReviewLabel.styleCategoryNo > 0 ?
                                (<Button style={{fontSize:20, width:150, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDelete} endIcon={<DeleteIcon />} > {styleReviewLabel.styleItemName} </Button> ) : ''
                            }
                        </div>
                        <div style={{display:"inline-block"}}>
                            {styleReviewLabel.styleCategorySubNo > 0 ?
                                (<Button style={{fontSize:20, width:150, borderRadius:50}} variant="outlined" color="primary" onClick={this.handleDeleteSub} endIcon={<DeleteIcon />} > {styleReviewLabel.styleSubItemName} </Button> ) : ''
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
                                    {styleReviewLabel.styleCategoryNo > 0 ?
                                        (<Chip
                                            variant="outlined"
                                            label={styleReviewLabel.styleItemName}
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
                                {!styleReviewLabel.styleCategoryNo == 0 ?
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
