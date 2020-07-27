import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Grid, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

@inject('professionalLabelStore','authStore')
@observer
export default class Texture1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            text: 'text',
            textureList1: [],
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/texture')
            .then(response => {
                const textureList1 = response.data.textureList1;
                this.setState({ textureList1 : textureList1})
            })
            .catch(error => {
                console.log(error)
            })
    }
    handleClickOpen() {
        this.props.professionalLabelStore.openTextureDialLog(true);
    }
    handleClose() {
        this.props.professionalLabelStore.openTextureDialLog(false);
    }
    handleClick(texture){
        if(this.props.onClick) {
            this.props.onClick(texture);
        }
        this.props.professionalLabelStore.openTextureDialLog(false);

    }
    render() {
        const textureList1= this.state.textureList1;
        return (
            <div>
                <Button variant="outlined" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.props.professionalLabelStore.menuOpen.textureDialLog} onClose={this.handleClose} style={{marginLeft:'50%', marginTop:'-7%'}}
                        maxWidth={"sm"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                            소재감
                        </Typography>
                        <hr></hr>
                        <Grid container>
                            {textureList1.map((texture) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button style={{width:'100%', height:30, padding:0}} variant="outlined" key={texture.no} onClick={() => this.handleClick(texture)}>
                                            <h4>{texture.categoryItemName}</h4>
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