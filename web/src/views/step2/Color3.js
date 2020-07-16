import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {Button, Typography} from "@material-ui/core";

@inject('basicLabelStore','authStore')
@observer
export default class Color3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            open1:false,
            text: 'text',
            colorList3: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClickOpenSub =this.handleClickOpenSub.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handledColor = this.handledColor.bind(this)
    }
    componentDidMount() {
        axios.get('/api/v1/kfashion/category/item/basic/color')
            .then(response => {
                const colorList3 = response.data.colorList3;
                this.setState({
                    colorList3:colorList3,
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
    handleClickOpenSub() {
        this.setState({
            open1: true
        });
    }
    handleClose() {
        this.setState({
            open: false,
            open1: false
        });
    }
    handledColor(color3){
        if(this.props.onClick) {
            this.props.onClick(color3);
        }
        this.setState({
            open: false
        });
    }
    handledColorSub(color3){
        if(this.props.onClick) {
            this.props.onClickSub(color3);
        }
        this.setState({
            open1: false
        });
    }
    render() {
        const {colorList3}= this.state;

        return (
            <div>
            <Button variant="contained" color="primary" onClick={this.handleClickOpen} style={{marginRight:10}}>메인 색상</Button>
            <Button variant="contained" color="primary" onClick={this.handleClickOpenSub}>서브 색상</Button>
            <Dialog open={this.state.open} onClose={this.handleClose}
                    maxWidth={'sm'}
            >
            <DialogContent>
                <Typography variant="h5" component="h2">
                    색상
                </Typography>
                <hr></hr>
                <div style={{textAlign:'center'}}>
                    {colorList3.map((color3) =>
                     <Button key={color3.no} onClick={() => this.handledColor(color3)}>
                         <div>
                         <div style={{width: 60, height: 60,margin:'auto',border:'1px solid black', backgroundColor: `${color3.categoryItemMemo}`}}>
                         </div>
                         <div style={{display:'inline-block'}}>{color3.categoryItemName}
                         </div>
                         </div>
                     </Button>
                    )
                    }
                </div>
            </DialogContent>
            </Dialog>
                <Dialog open={this.state.open1} onClose={this.handleClose}
                        maxWidth={'sm'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                            색상
                        </Typography>
                        <hr></hr>
                        <div style={{textAlign:'center'}}>
                            {colorList3.map((color3) =>
                                <Button key={color3.no} onClick={() => this.handledColorSub(color3)}>
                                    <div>
                                        <div style={{width: 60, height: 60,margin:'auto',border:'1px solid black', backgroundColor: `${color3.categoryItemMemo}`}}>
                                        </div>
                                        <div style={{display:'inline-block'}}>{color3.categoryItemName}
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