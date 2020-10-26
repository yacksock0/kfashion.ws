import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import SelectColors from './SelectColorsMatch';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            marginTop:30,
        },
        marginTop:90,
        textAlign:'left', 
    },
    titletext: {
        [theme.breakpoints.down('sm')]: {
            textAlign:'center'
        },
        fontFamily:'NotoSansCJKkr',
        fontSize:'24px',
        fontWeight:'600',
        color:'#4e4873',
        marginBottom:30,
    },
    textstyle: {
        [theme.breakpoints.down('sm')]: {
            textAlign:'center'
        },
        fontFamily:'NotoSansCJKkr',
        fontSize:'18px',
        color:'#4e4873',
        marginBottom:10,
    }, 
    paper: { 
        flexWrap: 'wrap',
        marginBottom:35,
        
        "& .MuiToggleButton-root": {
            width:'99px',
            height:'46px',
            boxShadow:'0 3px 6px 0 rgba(0, 0, 0, 0.2)',
            fontFamily:'NotoSansCJKkr',
            fontSize:'14px',
            fontWeight:'500',
            color:'#a4a4a4',
            border:'1px solid #a4a4a4',
            marginRight:15,

            '&:not(:first-child)': {
                borderRadius: 5,
            },
            '&:first-child': {
                borderRadius: 5,
            },
        },
        "& .MuiToggleButton-root.Mui-selected": {
            background:'#707070',
            color:'#fff',
        },
    },
    buttonbox:{
        [theme.breakpoints.down('sm')]: {
            justifyContent:'center'
        },
        display: 'flex',
    },
}));


export default function CustomizedDividers() {
    const classes = useStyles();

    const [seasons, setSeasons] = React.useState();
    const [item, setItem] = React.useState();
    const [style, setStyle] = React.useState();

    const handleSeasons = (event, newSeasons) => {
        setSeasons(newSeasons);
    };
    const handleItem = (event, newItem) => {
        setItem(newItem);
    };
    const handleStyle = (event, newStyle) => {
        setStyle(newStyle);
    };

    return (
        <div className={classes.root}>
            <Typography className={classes.titletext}>어떤 옷과 매칭할까요?</Typography>
            <Typography className={classes.textstyle}>계절</Typography>
            <Paper elevation={0} className={classes.paper}>
                <ToggleButtonGroup
                    value={seasons}
                    exclusive
                    onChange={handleSeasons}
                    aria-label="text seasons"
                    className={classes.buttonbox} 
                >
                    <ToggleButton value='spring'> 봄 </ToggleButton>
                    <ToggleButton value='summer'>여름</ToggleButton>
                    <ToggleButton value='autumn'>가을</ToggleButton>
                    <ToggleButton value='winter'>겨울</ToggleButton>
                    <ToggleButton value='seasons'>간절기</ToggleButton>
                </ToggleButtonGroup>   
            </Paper>

            <Typography className={classes.textstyle}>매칭할 아이템</Typography>
            <Paper elevation={0} className={classes.paper}>
                <ToggleButtonGroup
                    value={item}
                    exclusive
                    onChange={handleItem}
                    aria-label="text item"
                    className={classes.buttonbox}
                >
                    <ToggleButton value='outer'>아우터</ToggleButton>
                    <ToggleButton value='top'>상의</ToggleButton>
                    <ToggleButton value='pants'>바지</ToggleButton>
                    <ToggleButton value='skirt'>스커트</ToggleButton>
                    <ToggleButton value='onepiece'>원피스</ToggleButton>
                </ToggleButtonGroup>   
            </Paper>

            <Typography className={classes.textstyle}>스타일</Typography>
            <Paper elevation={0} className={classes.paper}>
                <ToggleButtonGroup
                    value={style}
                    exclusive
                    onChange={handleStyle}
                    aria-label="text style"
                    style={{marginBottom:15}}
                    className={classes.buttonbox}
                >
                    <ToggleButton value='retro'>레트로</ToggleButton>
                    <ToggleButton value='street'>스트릿</ToggleButton>
                    <ToggleButton value='casual'>캐주얼</ToggleButton>
                    <ToggleButton value='romantic'>로맨틱</ToggleButton>
                    <ToggleButton value='office'>오피스</ToggleButton>
                </ToggleButtonGroup> 
                <ToggleButtonGroup
                    value={style}
                    exclusive
                    onChange={handleStyle}
                    aria-label="text style"
                    className={classes.buttonbox}
                >
                    <ToggleButton value='gully'>걸리시</ToggleButton>
                    <ToggleButton value='sports'>스포츠</ToggleButton>
                    <ToggleButton value='chic'>시크</ToggleButton>
                    <ToggleButton value='sexy'>섹시</ToggleButton>
                    <ToggleButton value='travel'>여행</ToggleButton>
                </ToggleButtonGroup>    
            </Paper>
            <Typography className={classes.textstyle}>컬러</Typography>
            <SelectColors />
            
        </div>
    );
}


