import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding:0,
  },
  paperin:{
    marginTop:56,
  },
  titletext: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: '17px',
    fontWeight: '600',
  },
  linestyle: {
    border:'none',
    height:'1px',
    background:'#e2e2e2',
    marginBottom:20,
  },
  textstyle: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: '14px',
  },
 
}));

export default function SideHelp() {
  const classes = useStyles();
  

  return (
    <div>
        <Paper elevation={0} className={classes.paperin}>

            <Typography className={classes.titletext}>다각형 지정</Typography>
            <hr className={classes.linestyle} />
            <Typography className={classes.textstyle}>1. 이미지 리스트 탭 - 선택에서 체크을 클릭하여 작업할 이미지 선택</Typography>
                
        </Paper>
    </div>
  );
}

