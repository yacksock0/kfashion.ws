import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import {inject, observer} from "mobx-react";

const style = theme => ({
    root: {
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
        this.props.professionalLabelStore.LoadLabelList(item.workNo);
        const labelNo1 =this.props.professionalLabelStore.styleReviewLabel.labelNo1;
        if(labelNo1 === 1) {
            this.props.professionalLabelStore.changeNewProfessionalLabelNo1(labelNo1);
        }
        const labelNo2 =this.props.professionalLabelStore.styleReviewLabel.labelNo2;
        if(labelNo2 === 2) {
            this.props.professionalLabelStore.changeNewProfessionalLabelNo2(labelNo2);
        }
        const labelNo3 =this.props.professionalLabelStore.styleReviewLabel.labelNo3;
        if(labelNo3 === 3) {
            this.props.professionalLabelStore.changeNewProfessionalLabelNo3(labelNo3);
        }
        const labelNo4 =this.props.professionalLabelStore.styleReviewLabel.labelNo4;
        if(labelNo4 === 4) {
            this.props.professionalLabelStore.changeNewProfessionalLabelNo4(labelNo4);
        }
        const labelNo5 =this.props.professionalLabelStore.styleReviewLabel.labelNo5;
        if(labelNo5 === 5) {
            this.props.professionalLabelStore.changeNewProfessionalLabelNo5(labelNo5);
        }

    }
    render() {
        const {recentlyImg} = this.props.professionalLabelStore;
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                        <h3>이전작업 </h3>
                    {recentlyImg.map((item) =>
                        <Button className={classes.imgBox} onClick={() => this.handleClick(item)}>
                            <img src={item.fileName} key={item.fileName} style={{width: 80, height: 80, borderRadius:15}}/>
                        </Button>
                    )
                    }
            </div>
        );
    }
}
export default withStyles(style) (WorkedImg);