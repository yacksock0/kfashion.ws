import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {Button, Typography} from "@material-ui/core";

@inject('basicLabelStore','authStore')
@observer
export default class Color1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            open1:false,
            text: 'text',
            colorList1: [],
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
                const colorList1 = response.data.colorList1;
                const colorList2 = response.data.colorList2;
                const colorList3 = response.data.colorList3;
                const colorList4 = response.data.colorList4;
                this.setState({
                    colorList1:colorList1,
                })
                console.log("colorList1",colorList1);
                console.log("colorList2",colorList2);
                console.log("colorList3",colorList3);
                console.log("colorList4",colorList4);
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
    handledColor(color1){
        if(this.props.onClick) {
            this.props.onClick(color1);
        }
        this.setState({
            open: false
        });
    }
    handledColorSub(color1){
        if(this.props.onClick) {
            this.props.onClickSub(color1);
        }
        this.setState({
            open1: false
        });
    }
    render() {
        const {colorList1}= this.state;

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
                    {colorList1.map((color1) =>
                     <Button key={color1.no} onClick={() => this.handledColor(color1)}>
                         <div>
                         <div style={{width: 60, height: 60,margin:'auto',border:'1px solid black', backgroundColor: `${color1.categoryItemMemo}`}}>
                         </div>
                         <div style={{display:'inline-block'}}>{color1.categoryItemName}
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
                            {colorList1.map((color1) =>
                                <Button key={color1.no} onClick={() => this.handledColorSub(color1)}>
                                    <div>
                                        <div style={{width: 60, height: 60,margin:'auto',border:'1px solid black', backgroundColor: `${color1.categoryItemMemo}`}}>
                                        </div>
                                        <div style={{display:'inline-block'}}>{color1.categoryItemName}
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