import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  btnstyle:{
    width:'50px',
    height:'25px',
    borderRadius:'16px',
    background:'#7d7d7d',
    color:'#fff',
    boxShadow:'none',
    border:0 ,
    cursor:'pointer',
    "&:hover": {
      background:'#7d7d7d',
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    [theme.breakpoints.down('sm')]: {
      width: "80%",
    },
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width:'50%',
    height:'70%',
    textAlign:'justify',
    overflow:'auto',
    fontSize:14,
    fontfamily:'NotoSansCJKkr-Light',
    outline:'none',
    margin:'0 auto',
  },
  txttitle: {
    fontSize:17,
    fontWeight:'bold',
  },
  txtstyle:{
    fontWeight:'bold'
  },
  linestyle: {
    borderBottom: 'solid 4px #526af2',
  },
  h2txt: {
    fontSize:32,
    fontWeight:'bold',
  },
  paperin:{
    display:'flex',
    justifyContent:'space-between',
  },
  closeButton:{
    marginTop:20,
    height:'55px', 
  }
}));

export default function Modal1() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type="button" onClick={handleOpen} className={classes.btnstyle}>
        보기
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        
      >
        <Fade in={open}>
          <Paper elevation={0} className={classes.paper}>
            <Paper elevation={0} className={classes.paperin}>
                <p id="transition-modal-title" className={classes.h2txt}>서비스 이용약관</p>

                <IconButton onClick={handleClose} className={classes.closeButton}>
                  <CloseIcon style={{width:'35px',height:'35px'}} />
                </IconButton>
            </Paper>
            <div className={classes.linestyle}></div>
            <p id="transition-modal-description">
              <p className={classes.txttitle}>제 1장 총 칙</p>
    
              <p className={classes.txtstyle}>제 1조 (목적)</p>
              본 이용약관은 에이플러스비 주식회사(이하 “회사”)에서 제공하는 모든 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자
              의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.<br />
              PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.<br /><br />

              <p className={classes.txtstyle}>제 2조 (정의)</p>
              1. "사이버몰"이란 회사가 재화 또는 용역(이하 "재화 등")을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신 설비를 이용하여      
              재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버 몰을 운영하는 사업자의 의미로도 사용합니다.<br />
              2."이용자"란 사이버몰에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.<br />
              3."회원"이라 함은 회사에 개인정보를 제공하여 회원 등록을 한 자로서, 회사의 정보를 지속적으로 제공 받으며, 회사가 제공하는 
              서비스를 계속적으로 이용할 수 있는 자를 말합니다.<br />
              4."비회원"이라 함은 회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 말합니다.<br />
              5.이외에 이 약관에서 사용하는 용어의 정의는 관계 법령 및 서비스 별 안내에서 정하는 바에 의합니다.<br /><br />

              <p className={classes.txtstyle}>제 3조 (약관 등의 명시와 설명 및 개정)</p>
              1. 회사는 이 약관의 내용과 상호, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호, 모사전송번
              호, 이메일주소, 사업자등록번호, 통신판매업신고번호, 개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 사이버몰의 초기        
              서비스화면(전면)에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.<br />
              2. 회사는 『약관의 규제에 관한 법률』, 『정보통신망 이용촉진 및 정보보호 등에 관한 법률』, 『전자상거래 등에서의 소비자
              보호에 관한 법률』, 『소비자기본법』 등 관련법을 위배하지 않는 범위 에서 이 약관을 개정할 수 있습니다.<br />
              회사는 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 회사의 화면에 그 적용일자 7일 이전부터 적용일  
              자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예기간을 두고  
              공지합니다. 이 경우 회사는 개정전 내용과 개정후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다.<br />
            </p>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}