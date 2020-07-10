import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {Grid, Button, Typography} from "@material-ui/core";

class ColorInfo extends React.Component {
    render() {
        return (
            <div>
                <span>번호 : {this.props.color.value}</span><br/>
                <span>색상 : {this.props.color.label}</span><br/>
                <hr/>
            </div>
        );
    }
}
@inject('basicLabelStore','authStore')
@observer
export default class SelectTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            text: 'text',
            colorList: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handledColor = this.handledColor.bind(this)
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/basic/color')
            .then(response => {
                const colorList = response.data.colorList;
                this.setState({
                    colorList:colorList,
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
    handledColor(color){
        if(this.props.onClick) {
            this.props.onClick(color);
        }
        this.setState({
            open: false
        });
    }
    render() {
        const {colorList}= this.state;

        return (
            <div>
            <Button variant="contained" color="primary" onClick={this.handleClickOpen} style={{marginRight:10}}>메인 색상</Button>
            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>서브 색상</Button>
            <Dialog open={this.state.open} onClose={this.handleClose}
                    maxWidth={'sm'}
            >
            <DialogContent>
                <Typography variant="h5" component="h2">
                    색상
                </Typography>
                <hr></hr>
                <div style={{textAlign:'center'}}>
                    {colorList.map((color) =>
                     <Button key={color.no} onClick={() => this.handledColor(color)}>
                         <div>
                         <div style={{width: 60, height: 60,margin:'auto',border:'1px solid black', backgroundColor: `${color.categoryItemMemo}`}}>
                         </div>
                         <div style={{display:'inline-block'}}>{color.categoryItemName}
                         </div>
                         </div>
                     </Button>
                    )
                    }
                </div>
            </DialogContent>
            </Dialog>
            </div>

        );
    }
}