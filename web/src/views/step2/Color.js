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
    handleChange = (selectedOption) => {
        this.props.basicLabelStore.changeNewBasicLabelColor(selectedOption)
        this.setState(
            { selectedOption }
        );
    };
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
    handledColor(){

    }
    render() {
        const { selectedOption } = this.state;
        const {colorList}= this.state;
        return (
            <div>
            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>생삭 지정</Button>
            <Dialog open={this.state.open} onClose={this.handleClose}
                    maxWidth={"md"}
                    fullWidth={"100%"}
                    height={'100%'}
            >
            <DialogContent>
                <Typography variant="h5" component="h2">
                    색상
                </Typography>
                <div>
                    {colorList.map((color) =>
                     <Button key={color.no} onClick={this.handledColor} style={{}}>
                         <div>
                         <div style={{width: 80, height: 80,margin:'auto'}}>
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