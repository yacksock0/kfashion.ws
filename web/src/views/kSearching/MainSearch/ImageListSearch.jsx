import React, { Component } from 'react'
import { withStyles  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';
import {inject, observer} from "mobx-react";
import {Typography} from "@material-ui/core";
import {STATE} from "../../../common/state";
import CircularProgress from "@material-ui/core/CircularProgress";
import TablePagination from "@material-ui/core/TablePagination";



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

@inject("sTextSearchStore")
@observer
class ImageListSearch extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          imagePopup: "",
          isOpen: false,
          scrolling : false,
          scrollTop : 0,
          scrollHeight : 0,
          clientHeight : 0,
        };
      }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleChangePage = (event, newPage) => {
        const { changeImageListPage, requestTagSearch} = this.props.sTextSearchStore;

        changeImageListPage(newPage);
        requestTagSearch();
    }

    handleChangeRowsPerPage = (event) => {
        const {changeImageRowsPerPage, changeImageListPage, requestTagSearch} = this.props.sTextSearchStore;
        changeImageRowsPerPage(event.target.value);
        changeImageListPage(0);
        requestTagSearch();
    }



    // handleScroll = (event) =>{
    //     console.log("window.scrollY : >> ", window.scrollY);
    //     //console.log("window.scrollTop : >> ", window.scrollTop);
    //
    //     const { searchResult, addSearchResultImage } = this.props.sTextSearchStore;
    //
    //     const scrollHeight = document.documentElement.scrollHeight;
    //     const scrollToTop = document.documentElement.scrollTop;
    //     const scrollTotalHeight = scrollToTop + (scrollHeight - scrollToTop);
    //     const scrollClient = document.documentElement.clientHeight;
    //     console.log("scrollHeight : >> ", scrollHeight);
    //     console.log("scrollToTop : >> ", scrollToTop);
    //     console.log("scrollHeight + scrollToTop : >> ", scrollHeight + scrollToTop);
    //     console.log("scrollTotalHeight : >> ", scrollTotalHeight);
    //     console.log("scrollClient : >> ", scrollClient);
    //     console.log("document.body.scrollHeight : >> ", document.body.scrollHeight);
    //     console.log("document.body.scrollTop : >> ", document.body.scrollTop);
    //     console.log("scrollToTop + scrollClient : >> ", scrollToTop + scrollClient);
    //
    //
    //     if(window.scrollY === 0 && this.state.scrolling === true) {
    //         this.setState({scrolling : false});
    //         this.setState({scrollTop : window.scrollTop});
    //         this.setState({scrollHeight : window.scrollHeight});
    //         this.setState({clientHeight : window.clientHeight});
    //         console.log("window.scrollY : >> ", window.scrollY);
    //         console.log("handleScroll scrolling : >> ", this.state.scrolling);
    //         console.log("handleScroll scrollTop : >> ", this.state.scrollTop);
    //         console.log("handleScroll scrollHeight : >> ", this.state.scrollHeight);
    //         console.log("handleScroll clientHeight : >> ", this.state.clientHeight);
    //     } else if (window.scrollY !== 0 && this.state.scrolling !== true) {
    //         this.setState({scrolling :  true})
    //         console.log("handleScroll : >> ", this.state.scrolling)
    //         //console.log("window.scrollY : >> ", window.scrollY);
    //     }
    //
    //     if(searchResult.length > 0 && (scrollToTop + scrollClient) === scrollHeight) {
    //         console.log("이때 검색결과 추가로 불러오기");
    //         addSearchResultImage();
    //     }
    // }

    render() {
        const { classes } = this.props;
        const { imagePopup, isOpen } = this.state;
        const { searchResult, searchRequestState, imageRowsPerPage, imagePageNum, imageTotalCount } = this.props.sTextSearchStore;

        return (
            <div className={classes.root}>
                {
                    searchResult.length === 0 && searchRequestState === STATE.Done
                        ? (
                            <Container>
                                <Paper elevation={0} component={"div"}>
                                    <Typography align={"center"} variant={"h4"}>
                                        검색결과가 없습니다.
                                    </Typography>
                                </Paper>
                            </Container>
                        )
                        : (
                            <Container minwidth="xl">
                                {
                                    searchResult.length > 0 && searchRequestState === STATE.Done &&
                                    <Paper elevation={0} className={classes.imgboxin}>
                                        {
                                            searchResult.map((result, index) => {
                                                console.log("classes.root", classes.root)
                                                console.log("result : >> ", result.workNo)
                                                return (
                                                    <Paper key={index} elevation={0} className={classes.imagebox}
                                                           onClick={() => this.setState({ isOpen: true, imagePopup: '/api/v1/kfashion/img/getByteImage?workNo=' + result.workNo })}
                                                        //onScroll={}
                                                    >
                                                        <img src={'/api/v1/kfashion/img/getByteImage?workNo=' + result.workNo} className={classes.imagefile} alt={result.imgData}/>
                                                    </Paper>
                                                )
                                            })
                                        }
                                        {/*{*/}
                                        {/*    searchResult.length > 0 && addSearchResultRequestState === STATE.Pending*/}
                                        {/*    &&*/}
                                        {/*    <Paper elevation={0} component={"div"}>*/}
                                        {/*        <CircularProgress size={18} />*/}
                                        {/*    </Paper>*/}
                                        {/*}*/}
                                        <TablePagination
                                            rowsPerPageOptions={[20, 40, 60]}
                                            component="div"
                                            backIconButtonProps={{
                                                'aria-label' : 'Previous Page'
                                            }}
                                            nextIconButtonProps={{
                                                'aria-label' : 'Next Page'
                                            }}
                                            labelRowsPerPage="Rows per page"
                                            count={imageTotalCount}
                                            rowsPerPage={imageRowsPerPage}
                                            page={imagePageNum}
                                            onChangePage={this.handleChangePage}
                                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                        />


                                        {/*<Paper elevation={0} className={classes.imagebox} onClick={() => this.setState({ isOpen: true, imagePopup:require('../../../images/test3.png') })}>*/}
                                        {/*    <img src={ require('../../../images/test3.png') } className={classes.imagefile} alt="image01" />*/}
                                        {/*</Paper>*/}
                                        {/*<Paper elevation={0} className={classes.imagebox} onClick={() => this.setState({ isOpen: true, imagePopup:require('../../../images/test4.png') })}>*/}
                                        {/*    <img src={ require('../../../images/test4.png') } className={classes.imagefile} alt="image01"/>*/}
                                        {/*</Paper>*/}
                                        {/*<Paper elevation={0} className={classes.imagebox} onClick={() => this.setState({ isOpen: true, imagePopup:require('../../../images/test5.jpg') })}>*/}
                                        {/*    <img src={ require('../../../images/test5.jpg') } className={classes.imagefile} alt="image01"/>*/}
                                        {/*</Paper>*/}


                                        {isOpen && (
                                            <Lightbox
                                                mainSrc={imagePopup}
                                                onCloseRequest={() => this.setState({ isOpen: false })}
                                            />
                                        )}
                                    </Paper>
                                }
                                {
                                    searchResult.length > 0 && searchRequestState === STATE.Pending &&
                                    <Container>
                                        <Paper elevation={0} component={"div"}>
                                            <CircularProgress size={18} />
                                        </Paper>
                                    </Container>
                                }

                            </Container>
                        )
                }
                {
                    searchResult.length === 0 && searchRequestState === STATE.Pending &&
                    <Container>
                        <Paper elevation={0} component={"div"}>
                            <CircularProgress size={18} />
                        </Paper>
                    </Container>
                }
            </div>
        )
    }
  
}

export default withStyles(style)(ImageListSearch);







