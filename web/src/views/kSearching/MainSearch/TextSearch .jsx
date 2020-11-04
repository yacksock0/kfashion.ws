
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
import { STATE } from "../../../common/state";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {BubbleChart} from "@material-ui/icons";
import {ButtonGroup} from "@material-ui/core";
// import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


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
    txtresultbox: {
        display:'flex',
        marginBottom:30  
    },
    txtline: {
        [theme.breakpoints.down('xs')]: {
            marginTop:15,
        },
        width:'40%',
        height:'1px',
        border:0,
        background:'#707070',
        marginTop:22,
    },
    txtresult: {
        [theme.breakpoints.down('md')]: {
            [theme.breakpoints.down('sm')]: {
                [theme.breakpoints.down('xs')]: {
                    fontSize:'20px',
                },
                fontSize:'25px',
            },
            fontSize:'30px',
        },
        fontFamily:'NotoSansCJKkr', 
        width:'20%',
        fontSize:'34px',
        fontWeight:'300',
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
        "& .MuiGrid-item":{
            margin:'0 auto'
        }
    },
    btnsearch:{
        fontWeight:'600',
        width:'160px',
        height:'50px',
        border:'2px solid #38a67e',
        color:'#38a67e',
        borderRadius:'42px',
        fontSize:'15px',
        margin:'0 15px',
        boxShadow:'0 3px 6px 0 rgba(0, 0, 0, 0.2)',
        "&:hover": {
            background:'#38a67e',
            color:'#fff',
        },
        "&:clicked" : {
            background:'#38a67e',
            color:'#fff',
        },
        
    },
    clickedBtnSearch:{
        fontWeight:'600',
        width:'160px',
        height:'50px',
        border:'2px solid #38a67e',
        color:'#fff',
        background:'#38a67e',
        borderRadius:'42px',
        fontSize:'15px',
        margin:'0 15px',
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
    colorBorder:{
        width:'2em',
        height:'2em',   
    },
    colorText:{
        position:'relative',
        left:-8
        
    }
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
        const { requestSetTypes, getStyle, getColor, initializeStore } = this.props.sTextSearchStore;
        initializeStore();
        requestSetTypes();
        //getStyle();
        //getColor();
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
        const { category, categoryNoList, styleList, colorList, styleRequestState, categoryItemRequestState,
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

                {
                    styleRequestState === STATE.Pending &&
                    colorRequestState === STATE.Pending &&
                    <Paper>
                        <CircularProgress size={14}/>
                    </Paper>
                }

                    {/* <Hidden xsDown> */}
                        <Paper elevation={0} className={classes.txtresultbox}>
                            <hr className={classes.txtline} />
                            <Typography className={classes.txtresult}>Style</Typography>
                            <hr className={classes.txtline} /> 
                        </Paper>
                        {/* <Typography>Style</Typography>
                        <hr style={{marginBottom:25}}/> */}
                        <Paper elevation={0} className={classes.btnsearchbox} >
                            <Grid container item spacing={1} >
                                {
                                    styleList.map((style, index) => {
                                        return (
                                            <Grid item xl key={index} >
                                                <Button
                                                    className={selectedStyle && selectedStyle === style.categoryItemName ? classes.clickedBtnSearch : classes.btnsearch}
                                                    variant="outlined"
                                                    disabled={selectedStyle && style.categoryItemName !== selectedStyle}
                                                    value={style.no}
                                                    onClick={handleClickStyleBtn}
                                                    style={{marginBottom:10}}
                                                >
                                                    {style.categoryItemName}
                                                </Button>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        </Paper>
                    {/* </Hidden> */}
                    {/* <Hidden xsDown> */}
                        <Paper elevation={0} className={classes.txtresultbox}>
                            <hr className={classes.txtline} />
                            <Typography className={classes.txtresult}>Category</Typography>
                            <hr className={classes.txtline} /> 
                        </Paper>
                        {/* <Typography>Category</Typography>
                        <hr style={{marginBottom:25}}/> */}
                        <Paper elevation={0} className={classes.btnsearchbox}>
                            {
                                categoryNoList.map((data, index) => {
                                    console.log(" categoryNoList.map category : >> ", data);
                                    return (
                                        <Button
                                            className={selectedCategory && selectedCategory === category[data.categoryType] ? classes.clickedBtnSearch : classes.btnsearch}
                                            variant={"outlined"}
                                            disabled={selectedCategory && category[data.categoryType] !== selectedCategory}
                                            value={data.categoryType}
                                            onClick={handleClickCategoryBtn}
                                            style={{marginBottom:15}}
                                        >
                                            {category[data.categoryType]}
                                        </Button>
                                    )

                                })
                            }
                            
                            {/*    Object.keys(category).map((obj, index) => {*/}
                            {/*        console.log(" Object.keys(category).map((obj : >> ", obj)*/}
                            {/*        return (*/}
                            {/*            <Button*/}
                            {/*                className={selectedCategory && selectedCategory === obj ? classes.clickedBtnSearch : classes.btnsearch}*/}
                            {/*                variant={"outlined"}*/}
                            {/*                disabled={selectedCategory && obj !== selectedCategory}*/}
                            {/*                value={obj}*/}
                            {/*                onClick={handleClickCategoryBtn}*/}
                            {/*            >*/}
                            {/*                {styleName[obj]}*/}
                            {/*            </Button>*/}
                            {/*        )*/}
                            {/*    })*/}
                            {/*}*/}
                        </Paper>
                    {/* </Hidden> */}
                    
                {
                    selectedCategory
                    ? (
                            // <Hidden xsDown>
                            <Paper elevation={0}>
                                <Paper elevation={0} className={classes.txtresultbox}>
                                    <hr className={classes.txtline} />
                                    <Typography className={classes.txtresult}>Color</Typography>
                                    <hr className={classes.txtline} /> 
                                </Paper>
                                
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
                                                                value={color.no}
                                                                onClick={handleClickColorBtn}
                                                                startIcon={<FiberManualRecordIcon htmlColor={color.categoryItemMemo} className={classes.colorBorder}/>}
                                                                style={{marginBottom:10}}
                                                            >
                                                                <spna className={classes.colorText}>{color.categoryItemName}</spna>
                                                            </Button>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Paper>
                            // </Hidden>
                            
                        )
                    : null
                }
                    {/* <Hidden mdUp>
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
                    </Hidden> */}
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



// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
// import Paper from '@material-ui/core/Paper';
// import InputBase from '@material-ui/core/InputBase';
// import IconButton from '@material-ui/core/IconButton';
// import SearchIcon from '@material-ui/icons/Search';
// import Hidden from '@material-ui/core/Hidden';
// import Button from '@material-ui/core/Button';
// import ToggleButton from '@material-ui/lab/ToggleButton';
// import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         margin:'0 auto',
//         fontFamily: 'NotoSansCJKkr',
//     },
//     titlestyle1: {
//         fontFamily:'NotoSansCJKkr',
//         fontSize:'17px',
//         textAlign:'left',
//         marginBottom:50,
//         marginLeft:-20,
//         color: '#26151b',
//         fontWeight:'500',
//     },
//     input: {
//         marginLeft: theme.spacing(1),
//         flex: 1,
//         width:'300px',
//     },
//     iconButton: {
//         padding: 5,
//         "&:hover": {
//             background:'transparent'
//         },
//     },
//     searchline: {
//         width:'350px',
//         height:'2px',
//         border:0,
//         background:'#000',
//         margin:'-3px auto 50px',
//     },
//     btnsearchbox: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         marginBottom:35,
//         justifyContent:'center',

//         "& .MuiToggleButton-root": {
//             [theme.breakpoints.down('sm')]: {
//                 height:'45px',
//                 fontSize:'16px',
//                 margin:'0 5px',
//             },
//             width:'110px',
//             height:'54px',
//             border:'2px solid #38a67e',
//             color:'#38a67e',
//             fontSize:'18px',
//             fontWeight:'bold',
//             margin:'0 10px',
//             boxShadow:'0 3px 6px 0 rgba(0, 0, 0, 0.2)',

//             '&:not(:first-child)': {
//                 borderRadius: '42px',
//             },
//             '&:first-child': {
//                 borderRadius: '42px',
//             },
//         },
//         "& .MuiToggleButton-root.Mui-selected": {
//             background:'#38a67e',
//             color:'#fff',
//         }
//     },
//     btnsend: {
//         width:'190px',
//         height:'56px',
//         background:'#26151b',
//         color:'#fff', 
//         margin:'30px auto 70px',
//         fontWeight:'500',
//         fontFamily:'NotoSansCJKkr',
//         fontSize:'18px',

//         "&:hover": {
//             background:'#26151b',
//         },   
//     },
// }));



// export default function TextSearch(){
//     const classes = useStyles();

//     const [search, setSearch] = React.useState();


//     const handleSearch = (event, newSearch) => {
//         setSearch(newSearch);
//     };

//      return (
//         <div className={classes.root}>
//             <Container minwidth="xl">   
//                 <Typography className={classes.titlestyle1}>검색창에 입력 또는 아래 버튼클릭시<br />해당 스타일을 추천받을 수 있습니다</Typography>
//                 <InputBase
//                     className={classes.input}
//                     placeholder="search"
//                     inputProps={{ 'aria-label': 'search' }}
//                 />
//                 <IconButton type="submit" className={classes.iconButton} aria-label="search">
//                     <SearchIcon style={{color:'#000',width:35,height:35,}}/>
//                 </IconButton>
//                 <hr className={classes.searchline} />
//                 <Hidden smDown>
//                     <Paper elevation={0} className={classes.btnsearchbox}>
//                         <ToggleButtonGroup
//                             value={search}
//                             exclusive
//                             onChange={handleSearch}
//                             aria-label="text search"
//                         >
//                             <ToggleButton value='retro'>레트로</ToggleButton>
//                             <ToggleButton value='romantic'>로맨틱</ToggleButton>
//                             <ToggleButton value='casual'>캐주얼</ToggleButton>
//                             <ToggleButton value='feminine'>페미닌</ToggleButton>
//                             <ToggleButton value='street'>스트릿</ToggleButton>  
//                         </ToggleButtonGroup>  
//                     </Paper>
//                     <Paper elevation={0} className={classes.btnsearchbox}>
//                         <ToggleButtonGroup
//                             value={search}
//                             exclusive
//                             onChange={handleSearch}
//                             aria-label="text search"
//                         >

//                             <ToggleButton value='office'>오피스</ToggleButton>
//                             <ToggleButton value='chic'>시크</ToggleButton>
//                             <ToggleButton value='sexy'>섹시</ToggleButton>
//                             <ToggleButton value='gully'>걸리시</ToggleButton>
//                             <ToggleButton value='sports'>스포츠</ToggleButton>  
//                         </ToggleButtonGroup>
//                     </Paper>
//                 </Hidden>

//                 <Hidden mdUp>
//                     <Paper elevation={0} className={classes.btnsearchbox}>
//                         <ToggleButtonGroup
//                             value={search}
//                             exclusive
//                             onChange={handleSearch}
//                             aria-label="text search"
//                         >
//                             <ToggleButton value='retro'>레트로</ToggleButton>
//                             <ToggleButton value='romantic'>로맨틱</ToggleButton>
//                             <ToggleButton value='casual'>캐주얼</ToggleButton>
//                         </ToggleButtonGroup>
//                     </Paper>
//                     <Paper elevation={0} className={classes.btnsearchbox}>
//                         <ToggleButtonGroup
//                             value={search}
//                             exclusive
//                             onChange={handleSearch}
//                             aria-label="text search"
//                         >
//                             <ToggleButton value='feminine'>페미닌</ToggleButton>
//                             <ToggleButton value='street'>스트릿</ToggleButton>   
//                             <ToggleButton value='office'>오피스</ToggleButton>
                             
//                         </ToggleButtonGroup>
//                     </Paper>
//                     <Hidden xsDown>
                        
//                         <Paper elevation={0} className={classes.btnsearchbox}>
//                             <ToggleButtonGroup
//                                 value={search}
//                                 exclusive
//                                 onChange={handleSearch}
//                                 aria-label="text search"
//                             >
//                                 <ToggleButton value='chic'>시크</ToggleButton>
//                                 <ToggleButton value='sexy'>섹시</ToggleButton>
//                                 <ToggleButton value='gully'>걸리시</ToggleButton>
//                                 <ToggleButton value='sports'>스포츠</ToggleButton> 
//                             </ToggleButtonGroup>
//                         </Paper>
//                     </Hidden>
//                     <Hidden smUp>
                        
//                         <Paper elevation={0} className={classes.btnsearchbox}>
//                             <ToggleButtonGroup
//                                 value={search}
//                                 exclusive
//                                 onChange={handleSearch}
//                                 aria-label="text search"
//                             >
//                                 <ToggleButton value='chic'>시크</ToggleButton>
//                                 <ToggleButton value='sexy'>섹시</ToggleButton>
//                                 <ToggleButton value='gully'>걸리시</ToggleButton>
//                             </ToggleButtonGroup>
//                         </Paper>
//                         <Paper elevation={0} className={classes.btnsearchbox}>
//                             <ToggleButtonGroup
//                                 value={search}
//                                 exclusive
//                                 onChange={handleSearch}
//                                 aria-label="text search"
//                             >
//                                 <ToggleButton value='sports'>스포츠</ToggleButton> 
//                             </ToggleButtonGroup>
//                         </Paper>
                        
//                     </Hidden>
//                 </Hidden>
//                 <Button variant="contained" className={classes.btnsend}>적용하기</Button>
//             </Container>
//         </div>
//         );
    
// }

                    






                    

                    