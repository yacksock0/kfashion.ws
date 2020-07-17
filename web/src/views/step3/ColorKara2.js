import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import {Button, Grid, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

@inject('professionalLabelStore','authStore')
@observer
export default class ColorKara2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            text: 'text',
            karaList2: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handleClick =this. handleClick.bind(this);
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/professional/kara')
            .then(response => {
                const karaList2 = response.data.karaList2;
                this.setState({ karaList2 : karaList2
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
    handleClick(kara){
        if(this.props.onClick) {
            this.props.onClick(kara);
        }
        this.setState({
            open:false,
        })
    };

    render() {
        const karaList2= this.state.karaList2;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>선택</Button>
                <Dialog open={this.state.open} onClose={this.handleClose} style={{marginLeft:'50%', marginTop:'-7%'}}
                        maxWidth={"sm"}
                        fullWidth={"100%"}
                        height={'100%'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                            카라
                        </Typography>
                        <hr></hr>
                        <Grid container>
                            {karaList2.map((kara) =>
                                <Grid item xs={3}>
                                    <div style={{textAlign:'center', margin:5}}>
                                        <Button style={{width:'100%', height:30, padding:0}} variant="outlined" key={kara.no} onClick={() => this.handleClick(kara)}>
                                            <h2>{kara.categoryItemName}</h2>
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