import React from 'react';
import axios from "axios";
import {inject, observer} from "mobx-react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import {Grid, Button, Typography} from "@material-ui/core";



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
                this.setState({ colorList : colorList.map(color => {
                        color.value = color.no;
                        color.label = color.categoryItemName;
                        return color
                    })
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
    render() {
        const { selectedOption } = this.state;
        const {colorList}= this.state.colorList;
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
                <Grid container>
                    <Grid item xs={12} lg={12}>
            <div style={{border: '1px solid red', backgroundColor:"red", width: 50, height: 50}}>
            </div>
            <div>
                Red(빨간색)
            </div>
                    <div style={{border: '1px solid blue', backgroundColor:"blue", width: 50, height: 50}}>
                    </div>
                    <div>
                        Blue(파란색)
                    </div>
                        <Button>{colorList.label}</Button>
                    <div>
                        Black(검정색)
                    </div>
                    </Grid>
                </Grid>
                </div>
            </DialogContent>
            </Dialog>
            </div>

        );
    }
}