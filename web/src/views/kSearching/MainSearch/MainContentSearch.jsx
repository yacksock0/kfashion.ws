import React, { Component } from 'react'
import { withStyles  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ReactComponent as Banner } from '../../../images/banner.svg';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const style = theme => ({
    root: {
        margin:'0 auto',
        fontFamily: 'NotoSansCJKkr',
    },
    titlestyle1: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        textAlign:'left',
        marginBottom:50,
        color: '#26151b',
        fontWeight:'500',
    },
    titlestyle2: {
        [theme.breakpoints.down('sm')]: {
            [theme.breakpoints.down('xs')]: {
                fontSize:'18px',
              },
              fontSize:'20px',
          },
        fontFamily:'NotoSansCJKkr',
        fontSize:'27px',
        fontWeight:'bold',
        margin:'60px 0 28px',
        letterSpacing:'normal',
    },
    btnbox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    btnstyle: {
          [theme.breakpoints.down('sm')]: {
            [theme.breakpoints.down('xs')]: {
                height:'60px',
                fontSize:'18px',
              },
            height:'100px',
            fontSize:'20px',
          },
        width:'49%',
        height:'142px',
        fontSize:'27px',
        fontWeight:'bold',
        color:'#fff',
        boxShadow:'none',
        fontFamily:'NotoSansCJKkr',
    },
});

class MainContentSearch extends Component{
    goText = () =>{
        this.props.history.push("/searching/text");
    }
    goImage = () =>{
        this.props.history.push("/searching/image");
    }
    render() {
        const { classes } = this.props;
    
        return (
            <div className={classes.root}>
                <Container minwidth="xl">
                    <Typography className={classes.titlestyle1}>현재 유행중인 패션 트렌드를 검색해보세요</Typography>
                    <Banner style={{width:'100%',maxWidth:'100%',height:'auto'}}/>
                    <Typography className={classes.titlestyle2}>검색방법을 선택해주세요</Typography>
                    <Paper elevation={0} className={classes.btnbox}>
                        <Button variant="contained"
                                className={classes.btnstyle}
                                style={{background:'#5ebf9b'}}
                                onClick={this.goText}
                        >
                            텍스트 검색
                        </Button>
                        <Button variant="contained"
                                className={classes.btnstyle}
                                style={{background:'#4c7364'}}
                                onClick={this.goImage}
                            >
                            이미지 검색
                        </Button>

                    </Paper>
                </Container>
            </div>
        )
    }
  
}
export default withStyles(style)(MainContentSearch);


