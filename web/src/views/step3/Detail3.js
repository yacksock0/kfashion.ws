import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Typography, Grid} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

@inject('professionalLabelStore','authStore')
@observer
export default class Detail1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'text',
            open: false,
            detailList3: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/detail')
            .then(response => {
                const detailList1 = response.data.detailList1;
                const detailList2 = response.data.detailList2;
                const detailList3 = response.data.detailList3;
                const detailList4 = response.data.detailList4;

                this.setState({detailList:detailList1,
                    detailList2: detailList2,
                    detailList3: detailList3,
                    detailList4: detailList4
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleClickOpen() {
        this.setState({
            open: true
        });
    }
    handleClose() {
        this.setState({
            open: false
        });
    }
    handleClick(detail){
        if(this.props.onClick) {
            this.props.onClick(detail);
        }
        this.setState({
            open:false,
        })

    }
    handledDetail=(detail)=>{
        if(this.props.onClick) {
            this.props.onClick(detail);
        }
    }
    handledDetailClose(){
        this.setState({
            open: false
        });
    }
    render() {
        const detailList3= this.state.detailList3;
        const {pantsReviewLabel} = this.props.professionalLabelStore;
        const detailCheck =pantsReviewLabel.detailItemName3;
        console.log("@@@@@@@ : " +detailCheck);
        return (
            <div>
                <Button variant="outlined" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.state.open} onClose={this.handleClose} style={{marginLeft:'50%', marginTop:'-7%'}}
                        maxWidth={"sm"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2" style={{display:'inline'}}>
                            디테일
                        </Typography>
                        <Button
                            style={{width:20, height:40, padding:0, float:'right', marginTop:-3}}
                            variant="outlined"
                            onClick={() => this.handledDetailClose()}>
                            <h4>닫기</h4>
                        </Button>
                        <hr></hr>
                            <Grid container>
                                        {detailList3.map((detail) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                            <Button
                                                style={{width:'100%', height:30, padding:0}}
                                                variant="outlined"
                                                key={detail.no}
                                                disabled = {detailCheck != undefined?
                                                    detail.categoryItemName == detailCheck.filter((check) => check==detail.categoryItemName
                                                    ) : ""
                                                }
                                                onClick={() => this.handledDetail(detail)}>
                                                <h4>{detail.categoryItemName}</h4>
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