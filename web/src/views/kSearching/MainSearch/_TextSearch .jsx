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
import {observe, toJS} from "mobx";
import {inject, observer} from "mobx-react";
import { STATE } from "common/state";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {BubbleChart} from "@material-ui/icons";
import {ButtonGroup} from "@material-ui/core";
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';


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
        fontSize:'10px',
        margin:'0 10px',
        boxShadow:'0 3px 6px 0 rgba(0, 0, 0, 0.2)',
        "&:hover": {
            background:'#38a67e',
            color:'#fff',
        },
        "&:clicked" : {
            background:'#38a67e',
            color:'#fff',
        }
    },
    clickedBtnSearch:{
        [theme.breakpoints.down('sm')]: {
            height:'45px',
            fontSize:'16px',
            margin:'0 5px',
        },
        fontWeight:'500',
        width:'110px',
        height:'54px',
        border:'2px solid #38a67e',
        color:'#fff',
        background:'#38a67e',
        borderRadius:'42px',
        fontSize:'10px',
        margin:'0 10px',
        boxShadow:'0 3px 6px 0 rgba(0, 0, 0, 0.2)',
        "&:hover": {
            background:'#fff',
            color:'#38a67e',
        },
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

@inject("sTextSearchStore")
@observer
class TextSearch  extends Component{
    constructor(props) {
        super(props);
        this.state = {
            styleTransfer : {
                OUTER : "아우터",
                TOP : "상의",
                BOTTOM : "하의",
                ONEPIECE : "원피스",
            },
            selected : true,
            categoryFormats : [

            ]
        }
    }
    componentDidMount() {
        const { getStyle, getColor, initializeStore } = this.props.sTextSearchStore;
        initializeStore();
        getStyle();
        getColor();
    }

    changeToggleBtn = (selected) => {
        this.setState({selected : selected})
    }

    handleChangeFormat = (e, newFormats) => {
        console.log("handleChangeFormat newFormats: >> ", newFormats);
        this.setState({categoryFormats : newFormats})
    }



    render() {
        const { classes } = this.props;
        const styleName = this.state.styleTransfer;
        const selected = this.state.selected;
        const categoryFormats = this.state.categoryFormats;
        const { category, styleList, colorList, styleRequestState, categoryItemRequestState,
                colorRequestState, selectedStyle, selectedColor, selectedCategory,
                handleClickStyleBtn, handleClickColorBtn, handleClickCategoryBtn, handleClickSendBtn } = this.props.sTextSearchStore;
        console.log("TextSearch styleList : >> ", styleList);
        console.log("TextSearch category : >> ", toJS(category));
        console.log("TextSearch styleName : >> ", styleName);
        console.log("TextSearch selected : >> ", selected);
        console.log("TextSearch colorList : >> ", colorList);
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
                {/*    <Hidden smDown>*/}
                {/*        <Paper elevation={0} className={classes.btnsearchbox}>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>레트로</Button>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>로맨틱</Button>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>캐주얼</Button>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>페미닌</Button>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>스트릿</Button>*/}
                {/*        </Paper>*/}
                {/*        <Paper elevation={0} className={classes.btnsearchbox}>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>오피스</Button>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>시크</Button>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>섹시</Button>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>걸리시</Button>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>스포츠</Button>*/}
                {/*        </Paper>*/}
                {/*    </Hidden>*/}

                {/*<Hidden smDown>*/}
                {/*    <Paper elevation={0} className={classes.btnsearchbox}>*/}
                {/*        <Button variant="outlined" className={classes.btnsearch}>레트로</Button>*/}
                {/*        <Button variant="outlined" className={classes.btnsearch}>로맨틱</Button>*/}
                {/*        <Button variant="outlined" className={classes.btnsearch}>캐주얼</Button>*/}
                {/*        <Button variant="outlined" className={classes.btnsearch}>페미닌</Button>*/}
                {/*        <Button variant="outlined" className={classes.btnsearch}>스트릿</Button>*/}
                {/*    </Paper>*/}
                {/*    <Paper elevation={0} className={classes.btnsearchbox}>*/}
                {/*        <Button variant="outlined" className={classes.btnsearch}>오피스</Button>*/}
                {/*        <Button variant="outlined" className={classes.btnsearch}>시크</Button>*/}
                {/*        <Button variant="outlined" className={classes.btnsearch}>섹시</Button>*/}
                {/*        <Button variant="outlined" className={classes.btnsearch}>걸리시</Button>*/}
                {/*        <Button variant="outlined" className={classes.btnsearch}>스포츠</Button>*/}
                {/*    </Paper>*/}
                {/*</Hidden>*/}

                {/*<Hidden mdUp>*/}
                {/*    <Paper elevation={0} className={classes.btnsearchbox}>*/}
                {/*        <Button variant="outlined" className={classes.btnsearch}>레트로</Button>*/}
                {/*        <Button variant="outlined" className={classes.btnsearch}>로맨틱</Button>*/}
                {/*        <Button variant="outlined" className={classes.btnsearch}>캐주얼</Button>*/}
                {/*    </Paper>*/}
                {/*    <Paper elevation={0} className={classes.btnsearchbox}>*/}
                {/*        <Button variant="outlined" className={classes.btnsearch}>페미닌</Button>*/}
                {/*        <Button variant="outlined" className={classes.btnsearch}>스트릿</Button>*/}
                {/*        <Button variant="outlined" className={classes.btnsearch}>오피스</Button>*/}
                {/*    </Paper>*/}
                {/*    <Hidden xsDown>*/}
                {/*        <Paper elevation={0} className={classes.btnsearchbox}>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>시크</Button>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>섹시</Button>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>걸리시</Button>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>스포츠</Button>*/}
                {/*        </Paper>*/}
                {/*    </Hidden>*/}
                {/*    <Hidden smUp>*/}
                {/*        <Paper elevation={0} className={classes.btnsearchbox}>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>시크</Button>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>섹시</Button>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>걸리시</Button>*/}
                {/*        </Paper>*/}
                {/*        <Paper elevation={0} className={classes.btnsearchbox}>*/}
                {/*            <Button variant="outlined" className={classes.btnsearch}>스포츠</Button>*/}
                {/*        </Paper>*/}
                {/*    </Hidden>*/}
                {/*</Hidden>*/}
                {
                    styleRequestState === STATE.Pending &&
                    colorRequestState === STATE.Pending &&
                    <Paper>
                        <CircularProgress size={14}/>
                    </Paper>
                }

                        <Hidden smDown>
                            <Typography>Style</Typography>
                            <Paper elevation={0} className={classes.btnsearchbox} >
                                <Grid container>
                                    <Grid container item spacing={2} >
                                        {
                                            styleList.map((style, index) => {
                                                return (
                                                    <Grid item xl key={index} >
                                                        {/*<ToggleButtonGroup value={categoryFormats} onChange={this.handleChangeFormat}>*/}
                                                        {/*    <ToggleButton*/}
                                                        {/*        value={style.categoryItemName}*/}
                                                        {/*        variant="outlined"*/}
                                                        {/*        className={classes.btnsearch}*/}
                                                        {/*        disabled={categoryFormats.length > 0 && style.categoryItemName !== categoryFormats[0]}*/}
                                                        {/*    >*/}
                                                        {/*        {style.categoryItemName}*/}
                                                        {/*    </ToggleButton>*/}
                                                        {/*</ToggleButtonGroup>*/}
                                                        <Button
                                                            className={selectedStyle && selectedStyle === style.categoryItemName ? classes.clickedBtnSearch : classes.btnsearch}
                                                            variant="outlined"
                                                            disabled={selectedStyle && style.categoryItemName !== selectedStyle}
                                                            value={style.categoryItemName}
                                                            onClick={handleClickStyleBtn}
                                                        >
                                                            {style.categoryItemName}
                                                        </Button>
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Hidden>
                    <Hidden smDown>
                    <Typography>Category</Typography>
                    <Paper elevation={0} className={classes.btnsearchbox}>
                    {
                        Object.keys(category).map((obj, index) => {
                            console.log(" Object.keys(category).map((obj : >> ", obj)
                            return (
                                <Button
                                    className={selectedCategory && selectedCategory === obj ? classes.clickedBtnSearch : classes.btnsearch}
                                    variant={"outlined"}
                                    disabled={selectedCategory && obj !== selectedCategory}
                                    value={obj}
                                    onClick={handleClickCategoryBtn}
                                >
                                    {styleName[obj]}
                                </Button>
                            )
                        })
                    }
                    {/*<Button variant="outlined" className={classes.btnsearch} value={category.OUTER}>{styleName.OUTER}</Button>*/}
                    {/*<Button variant="outlined" className={classes.btnsearch} value={category.TOP}>{styleName.TOP}</Button>*/}
                    {/*<Button variant="outlined" className={classes.btnsearch} value={category.BOTTOM}>{styleName.BOTTOM}</Button>*/}
                    {/*<Button variant="outlined" className={classes.btnsearch} value={category.ONEPIECE}>{styleName.ONEPIECE}</Button>*/}
                    </Paper>
                    {/*<Paper elevation={0} className={classes.btnsearchbox}>*/}
                    {/*    <Button variant="outlined" className={classes.btnsearch}>오피스</Button>*/}
                    {/*    <Button variant="outlined" className={classes.btnsearch}>시크</Button>*/}
                    {/*    <Button variant="outlined" className={classes.btnsearch}>섹시</Button>*/}
                    {/*    <Button variant="outlined" className={classes.btnsearch}>걸리시</Button>*/}
                    {/*    <Button variant="outlined" className={classes.btnsearch}>스포츠</Button>*/}
                    {/*</Paper>*/}
                    </Hidden>

                    <Hidden smDown>
                    <Typography>Color</Typography>
                    <Paper elevation={0} className={classes.btnsearchbox}>
                        <Grid container>
                            <Grid container item spacing={2}>
                                {
                                    colorList.map((color, index) => {
                                        return (
                                            <Grid item xs key={index}>
                                                <Button
                                                    className={selectedColor && selectedColor === color.categoryItemName ? classes.clickedBtnSearch : classes.btnsearch}
                                                    variant={"outlined"}
                                                    disabled={selectedColor && color.categoryItemName !== selectedColor}
                                                    value={color.categoryItemName}
                                                    onClick={handleClickColorBtn}
                                                    startIcon={<PanoramaFishEyeIcon htmlColor={color.categoryItemMemo}/>}
                                                >
                                                    {color.categoryItemName}
                                                </Button>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        </Grid>
                    {/*<Button variant="outlined" className={classes.btnsearch} value={category.OUTER}>{styleName.OUTER}</Button>*/}
                    {/*<Button variant="outlined" className={classes.btnsearch} value={category.TOP}>{styleName.TOP}</Button>*/}
                    {/*<Button variant="outlined" className={classes.btnsearch} value={category.BOTTOM}>{styleName.BOTTOM}</Button>*/}
                    {/*<Button variant="outlined" className={classes.btnsearch} value={category.ONEPIECE}>{styleName.ONEPIECE}</Button>*/}
                    </Paper>
                    {/*<Paper elevation={0} className={classes.btnsearchbox}>*/}
                    {/*    <Button variant="outlined" className={classes.btnsearch}>오피스</Button>*/}
                    {/*    <Button variant="outlined" className={classes.btnsearch}>시크</Button>*/}
                    {/*    <Button variant="outlined" className={classes.btnsearch}>섹시</Button>*/}
                    {/*    <Button variant="outlined" className={classes.btnsearch}>걸리시</Button>*/}
                    {/*    <Button variant="outlined" className={classes.btnsearch}>스포츠</Button>*/}
                    {/*</Paper>*/}
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
                <Button
                    variant="contained"
                    className={classes.btnsend}
                    onClick={handleClickSendBtn}
                >
                    적용하기
                </Button>
            </Container>
        </div>
        )
    }
}
export default withStyles(style)(TextSearch );

                    

                    