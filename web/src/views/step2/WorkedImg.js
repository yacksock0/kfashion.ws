import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Button} from '@material-ui/core';
import {inject, observer} from "mobx-react";

const style = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        border: '1px solid black',
        borderRadius: 15,
    },
    topBox:{
        borderBottom:'1px solid black',
        textAlign:'center',
        margin: 'auto',
    },
    imgBox:{
        width:100,
        height:80,
        margin:'auto',
        padding:5
    }
});

@inject('professionalLabelStore','authStore','workStore', 'imageStore')
@observer
class WorkedImg extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            boundaryList: [],
        }
    }
    componentDidMount() {
        const id = this.props.authStore.loginUser.id;
        this.props.professionalLabelStore.LoadRecentImage(id)
    }

    handleClick=(item)=>{
        if(this.props.onClick){
            this.props.onClick(item);
        }

        //
        // if(this.props.imageStore.workNo != 0){
        //     console.log(this.props.imageStore.workNo);
        //     this.props.professionalLabelStore.LoadLabelList(item.workNo);
        // }else{
        //     alert("이미지 리스트 탭에서 작업할 이미지를 선택해주세요.");
        //     this.setState({
        //         tabIndex1: 1,
        //     });
        // }

    }
    render() {
        const {recentlyImg} = this.props.professionalLabelStore;
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Grid item xs={12}>
                    <div className={classes.topBox}>
                        <h3>이전작업 </h3>
                    </div>
                    {recentlyImg.map((item) =>
                        <Button className={classes.imgBox} onClick={() => this.handleClick(item)}>
                            <img src={item.fileName} style={{width: '100%', height: 80}}/>
                        </Button>
                    )
                    }
                </Grid>
            </div>
        );
    }
}
export default withStyles(style) (WorkedImg);