import React, { Component } from 'react'
import { withStyles  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';

// import imgfile from '../images/test1.png';


const style = theme => ({ 
    root: {
        margin:'0 auto',
        fontFamily: 'NotoSansCJKkr',
    },
    imgboxin: {
        [theme.breakpoints.down('md')]: {
            justifyContent:'center', 
        },
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'space-between', 
        alignItems: 'center',  
        margin:'55px auto' 
    },
    imagebox:{
        [theme.breakpoints.down('md')]: {
            [theme.breakpoints.down('xs')]: {
                marginRight:0
            },
            width:'400px',
            height:'430px',
            marginBottom:'2%',
            marginRight:'10px'
        },
        marginBottom:'1%',
        width:'285px',
        height:'310px',
        borderRadius:0,
        overflow:'auto',
        display:'flex',
        alignItems: 'flex-start',
        cursor:'pointer' 
    },
    imagefile: {
        width:'100%',
    }, 
});


class ImageListSearch extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          imagePopup: "",
          isOpen: false
        };
      }

    render() {
        const { classes } = this.props;
        const { imagePopup, isOpen } = this.state;
    
        return (
            <div className={classes.root}>
                <Container minwidth="xl">
                    <Paper elevation={0} className={classes.imgboxin}>
                        <Paper elevation={0} className={classes.imagebox} onClick={() => this.setState({ isOpen: true, imagePopup:require('../../../images/test1.png') })}>
                            <img src={ require('../../../images/test1.png') } className={classes.imagefile} alt="image01"/>
                        </Paper>
                        <Paper elevation={0} className={classes.imagebox} onClick={() => this.setState({ isOpen: true, imagePopup:require('../../../images/test3.png') })}>
                            <img src={ require('../../../images/test3.png') } className={classes.imagefile} alt="image01" />
                        </Paper>
                        <Paper elevation={0} className={classes.imagebox} onClick={() => this.setState({ isOpen: true, imagePopup:require('../../../images/test4.png') })}>
                            <img src={ require('../../../images/test4.png') } className={classes.imagefile} alt="image01"/>
                        </Paper>
                        <Paper elevation={0} className={classes.imagebox} onClick={() => this.setState({ isOpen: true, imagePopup:require('../../../images/test5.jpg') })}>
                            <img src={ require('../../../images/test5.jpg') } className={classes.imagefile} alt="image01"/>
                        </Paper>


                        {isOpen && (
                            <Lightbox
                                mainSrc={imagePopup}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                            />
                        )}
                    </Paper>
                
                </Container>
            </div>
        )
    }
  
}

export default withStyles(style)(ImageListSearch);







