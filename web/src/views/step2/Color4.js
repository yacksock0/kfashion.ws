import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {Button, Typography} from "@material-ui/core";

@inject('basicLabelStore','authStore','basicCategoryStore','checkHighLabelStore')
@observer
export default class Color4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            open1:false,
            text: 'text',
            colorList4: [],
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
            colorList4 : this.props.basicCategoryStore.colorList4,
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
    handledColor(color4){
        this.props.checkHighLabelStore.changeNewBasicLabelColor4(color4);
        this.setState({
            open: false
        });
    }
    handledColorSub(color4){
        this.props.checkHighLabelStore.changeNewBasicLabelSubColor4(color4);
        this.setState({
            open1: false
        });
    }
    render() {
        const colorList4 = this.props.basicCategoryStore.colorList4;

        return (
            <div>
            <Button variant="contained" color="primary" onClick={this.handleClickOpen} style={{marginRight:10}}>메인 색상</Button>
            <Button variant="contained" color="primary" onClick={this.handleClickOpenSub}>서브 색상</Button>
            <Dialog open={this.state.open} onClose={this.handleClose} style={{marginLeft:'50%'}}
                    maxWidth={'sm'}
            >
            <DialogContent>
                <Typography variant="h5" component="h2">
                    색상
                </Typography>
                <hr></hr>
                <div style={{textAlign:'center'}}>
                    {colorList4.map((color4) =>
                     <Button key={color4.no} onClick={() => this.handledColor(color4)}>
                         <div>
                         <div style={{width: 60, height: 60,margin:'auto',border:'1px solid black', backgroundColor: `${color4.categoryItemMemo}`}}>
                         </div>
                         <div style={{display:'inline-block'}}>{color4.categoryItemName}
                         </div>
                         </div>
                     </Button>
                    )
                    }
                </div>
            </DialogContent>
            </Dialog>
                <Dialog open={this.state.open1} onClose={this.handleClose} style={{marginLeft:'50%'}}
                        maxWidth={'sm'}
                >
                    <DialogContent>
                        <Typography variant="h5" component="h2">
                            색상
                        </Typography>
                        <hr></hr>
                        <div style={{textAlign:'center'}}>
                            {colorList4.map((color4) =>
                                <Button key={color4.no} onClick={() => this.handledColorSub(color4)}>
                                    <div>
                                        <div style={{width: 60, height: 60,margin:'auto',border:'1px solid black', backgroundColor: `${color4.categoryItemMemo}`}}>
                                        </div>
                                        <div style={{display:'inline-block'}}>{color4.categoryItemName}
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