import React, { Component } from 'react'
import { withStyles  } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DropZone from './DropZoneMatch';
import MatchingButton from './MatchingButtonMatch';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';


const style = theme => ({
    root: {
        margin:'0 auto',
        flexWrap: '1',
        paddingTop: 0,
    },
    gridcontainer:{
        display:'flex',
        justifyContent:'space-between', 
        margin:'0 auto', 
    },
    titletext: {
        width:'190px',
        textAlign:'left',
        fontFamily:'Montserrat',
        fontSize:'24px',
        fontWeight:'bold',  
        borderBottom:'solid 4px #f2ada7',
        marginBottom:26,
    },
    textstyle: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        textAlign:'left',
        height:'30px',
        color: '#26151b',
        fontWeight:'500',
    },
    btnsend: {
        width:'190px',
        height:'56px',
        background:'#26151b',
        color:'#fff', 
        margin:'30px auto 70px',
        fontWeight:'500',
        fontFamily:'NotoSansCJKkr', 
        fontSize:'18px',

        "&:hover": {
            background:'#26151b',
        },   
    },
});

class ImageSearch extends Component{
    render() {
        const { classes } = this.props;
    
        return (
            <div className={classes.root}>
                <React.Fragment>
                    <Container minwidth="xl">
                        <Grid item xs={12} className={classes.gridcontainer}>
                            <Hidden smDown>
                                <Paper elevation={0} style={{width:'49%'}}>
                                    <Typography className={classes.titletext}>image upload</Typography>
                                    <Typography className={classes.textstyle}>매칭하고 옷 이미지를 업로드해주세요</Typography>
                                    <DropZone  />
                                </Paper>
                                <Paper elevation={0} style={{width:'49%'}}>
                                    <MatchingButton />
                                </Paper>
                            </Hidden>

                            <Hidden mdUp>
                                <Paper elevation={0} style={{width:'100%'}}>
                                    <Typography className={classes.titletext}>image upload</Typography>
                                    <Typography className={classes.textstyle}>매칭하고 옷 이미지를 업로드해주세요</Typography>
                                    <DropZone  />

                                    <MatchingButton />
                                </Paper>
                               
                                    
                                
                            </Hidden>
                        </Grid>
                        <Button variant="contained" className={classes.btnsend}>적용하기</Button>
                    </Container>
                </React.Fragment>
            </div>
        )
    }
}

export default withStyles(style)(ImageSearch);

