import React, { Component } from 'react'
import { withStyles  } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';


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
        marginLeft:-20,
        color: '#26151b',
        fontWeight:'500',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        width:'300px',
    },
    iconButton: {
        padding: 5,
        "&:hover": {
            background:'transparent'
        },
    },
    searchline: {
        width:'350px',
        height:'2px',
        border:0,
        background:'#000',
        margin:'-3px auto 50px',
    },
    btnsearchbox: {
        marginBottom:25,
    },
    btnsearch:{
        [theme.breakpoints.down('sm')]: {
              height:'45px',
              fontSize:'16px',
              margin:'0 5px',
          },
        fontWeight:'500',
        width:'110px',
        height:'54px',
        border:'2px solid #38a67e',
        color:'#38a67e',
        borderRadius:'42px',
        fontSize:'18px',
        margin:'0 10px',
        boxShadow:'0 3px 6px 0 rgba(0, 0, 0, 0.2)',
        "&:focus": {
            background:'#38a67e',
            color:'#fff',
        }
    }, 
    btnsend: {
        width:'190px',
        height:'56px',
        background:'#26151b',
        color:'#fff', 
        margin:'30px auto 70px',
        fontWeight:'500',
        fontFamily:'NotoSansCJKkr',

        "&:hover": {
            background:'#26151b',
        },   
    },
});

class TextSearch  extends Component{

      render() {
        const { classes } = this.props;
     return (
        <div className={classes.root}>
            <Container minwidth="xl">   
                <Typography className={classes.titlestyle1}>검색창에 입력 또는 아래 버튼클릭시<br />해당 스타일을 추천받을 수 있습니다</Typography>
                <InputBase
                    className={classes.input}
                    placeholder="search"
                    inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon style={{color:'#000',width:35,height:35,}}/>
                </IconButton>
                <hr className={classes.searchline} />
                <Hidden smDown>
                    <Paper elevation={0} className={classes.btnsearchbox}>
                        <Button variant="outlined" className={classes.btnsearch}>레트로</Button>
                        <Button variant="outlined" className={classes.btnsearch}>로맨틱</Button>
                        <Button variant="outlined" className={classes.btnsearch}>캐주얼</Button>
                        <Button variant="outlined" className={classes.btnsearch}>페미닌</Button>
                        <Button variant="outlined" className={classes.btnsearch}>스트릿</Button>  
                    </Paper>
                    <Paper elevation={0} className={classes.btnsearchbox}>
                        <Button variant="outlined" className={classes.btnsearch}>오피스</Button>
                        <Button variant="outlined" className={classes.btnsearch}>시크</Button>
                        <Button variant="outlined" className={classes.btnsearch}>섹시</Button>
                        <Button variant="outlined" className={classes.btnsearch}>걸리시</Button>
                        <Button variant="outlined" className={classes.btnsearch}>스포츠</Button>  
                    </Paper>
                </Hidden>

                <Hidden mdUp>
                    <Paper elevation={0} className={classes.btnsearchbox}>
                        <Button variant="outlined" className={classes.btnsearch}>레트로</Button>
                        <Button variant="outlined" className={classes.btnsearch}>로맨틱</Button>
                        <Button variant="outlined" className={classes.btnsearch}>캐주얼</Button>
                    </Paper>
                    <Paper elevation={0} className={classes.btnsearchbox}>
                        <Button variant="outlined" className={classes.btnsearch}>페미닌</Button>
                        <Button variant="outlined" className={classes.btnsearch}>스트릿</Button>  
                        <Button variant="outlined" className={classes.btnsearch}>오피스</Button>
                    </Paper>
                    <Hidden xsDown>
                        <Paper elevation={0} className={classes.btnsearchbox}>
                            <Button variant="outlined" className={classes.btnsearch}>시크</Button>
                            <Button variant="outlined" className={classes.btnsearch}>섹시</Button>
                            <Button variant="outlined" className={classes.btnsearch}>걸리시</Button>
                            <Button variant="outlined" className={classes.btnsearch}>스포츠</Button> 
                        </Paper>
                    </Hidden>
                    <Hidden smUp>
                        <Paper elevation={0} className={classes.btnsearchbox}>
                            <Button variant="outlined" className={classes.btnsearch}>시크</Button>
                            <Button variant="outlined" className={classes.btnsearch}>섹시</Button>
                            <Button variant="outlined" className={classes.btnsearch}>걸리시</Button>
                        </Paper>
                        <Paper elevation={0} className={classes.btnsearchbox}>
                            <Button variant="outlined" className={classes.btnsearch}>스포츠</Button> 
                        </Paper>
                    </Hidden>
                </Hidden>
                <Button variant="contained" className={classes.btnsend}>적용하기</Button>
            </Container>
        </div>
        )
    }
}
export default withStyles(style)(TextSearch );

                    

                    