import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {Button, Typography} from "@material-ui/core";

@inject('basicLabelStore','authStore','basicCategoryStore','checkHighLabelStore')
@observer
export default class Color2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            open1:false,
            text: 'text',
            colorList2: [],
            selectedOption:null,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClickOpenSub =this.handleClickOpenSub.bind(this)
        this.handleClose = this.handleClose.bind(this);
        this.handledColor = this.handledColor.bind(this)
    }
    componentDidMount() {
        this.props.basicCategoryStore.LoadColorList();
        this.setState({
            colorList2 : this.props.basicCategoryStore.colorList2,
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
    handledColor(color2){
        this.props.checkHighLabelStore.changeNewBasicLabelColor2(color2);
        this.setState({
            open: false
        });
    }
    handledColorSub(color2){
        this.props.checkHighLabelStore.changeNewBasicLabelSubColor2(color2);
        this.setState({
            open1: false
        });
    }
    render() {
        const colorList2 = this.props.basicCategoryStore.colorList2;

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
                    {colorList2.map((color2) =>
                     <Button key={color2.no} onClick={() => this.handledColor(color2)}>
                         <div>
                         <div style={{width: 60, height: 60,margin:'auto',border:'1px solid black', backgroundColor: `${color2.categoryItemMemo}`}}>
                         </div>
                         <div style={{display:'inline-block'}}>{color2.categoryItemName}
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
                            {colorList2.map((color2) =>
                                <Button key={color2.no} onClick={() => this.handledColorSub(color2)}>
                                    <div>
                                        <div style={{width: 60, height: 60,margin:'auto',border:'1px solid black', backgroundColor: `${color2.categoryItemMemo}`}}>
                                        </div>
                                        <div style={{display:'inline-block'}}>{color2.categoryItemName}
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