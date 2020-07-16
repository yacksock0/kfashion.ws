import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Grid, Button} from '@material-ui/core';
import {inject, observer} from "mobx-react";

const style = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        border: '1px solid black',
        borderRadius: 15,
        padding:10
    },
    topBox:{
        borderBottom:'1px solid black',
        textAlign:'center',
        display:'block',
        margin:'auto',
        padding:0
    },
    imgBox:{
        width:100,
        height:80,
        display:'block',
        margin:'auto',
    }
});

@inject('professionalLabelStore','authStore','workStore')
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
            this.props.onClick(item)
        }
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