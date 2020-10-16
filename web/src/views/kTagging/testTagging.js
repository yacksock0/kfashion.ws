import React from 'react'
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {Grid, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import Button from "@material-ui/core/Button";
import {DropzoneArea, DropzoneDialog} from "material-ui-dropzone";


const styles = theme => ({
    mainContainer: {
        flexGrow: 1,
        width:'100%',
        marginTop: '5vh'
    },
    appBarSpacer: theme.mixins.toolbar,
    mainContent: {
        width:'100%',
        objectFit: 'contain',
    },
    toolbar: {
        width: '100%',
    },
    mainTitle:{
            marginTop:'25vh',
            fontFamily: 'NotoSansCJKkr',
            fontWeight: 'bold',
            fontStyle: 'normal',
            textAlign: 'center',
            color: '#000000',
    },
    subTitle:{
        marginTop:'10vh',
        fontFamily: 'NotoSansCJKkr',
        fontWeight: 'bold',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#000000',
    }
});

@inject('currentStepStore')
@observer
class HomeTag extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            files: []
        };
    }

    componentDidMount() {
        setTimeout(() => document.body.style.zoom = "100%", 100);
        this.props.currentStepStore.setStep(0);
    }

    handleChange(files){
        this.setState({
            files: files
        });
    }

    handleResult(){
        console.log("file : ", this.state.files);
    }


    test = () =>{

    }



    render() {
        const { classes } = this.props;

        return (
            <div className={classes.mainContainer} style={{ width:'100%',height:'90vh' , backgroundSize:'cover'}}>
                <div className={classes.appBarSpacer} />
                    <Grid item xs={12}>
                        <div className={classes.mainTitle}>
                            <Typography variant="h3" component="h3" style={{display:'inline'}} >
                                test
                            </Typography>
                            <DropzoneArea
                                style = {{width : 100}}
                                filesLimit = {1200000}
                                onChange={this.test}
                                // onChange={(files) => console.log('Files:', files)}
                                showPreviews={false}
                                // maxFileSize={50000000000}
                                // onChange={this.handleChange.bind(this)}
                                // dropzoneText={"이미지 파일 혹은 폴더를 올려주세요"}
                                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp','image/jpg','image/tiff']}
                            />


                        </div>





                        <Button onClick={this.handleResult.bind(this)}
                        >
                            test
                        </Button>
                    </Grid>

            </div>




        );
    }


};

export default withSnackbar(withRouter(withStyles(styles) (HomeTag)));