
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    root: {
        textAlign:'center',
        "& .MuiOutlinedInput-multiline":{
            padding:'0 5px',
            borderRadius:0,
            height:'39px',
        },
        "& .MuiOutlinedInput-input":{
            padding:'0',
        },
        
    },
    paper: {
        width:'400px',
        margin:'0 auto',
    },
    titletext: {
        width:'390px',
        fontFamily:'Montserrat',
        fontSize:'45px',
        fontWeight:'bold',
        borderBottom: 'solid 4px #526af2',
        paddingBottom: 10,
        margin:'0 auto 15px',
    },
    txtstyle1: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        fontWeight:'bold',
        marginBottom:40,
        lineHeight: '1.2',
    },
    namebox: {
        width:'100%',
        marginBottom:20,
    },
    emailbox: {
        width:'32%',
        marginLeft:0
    },
    emailbox2: {
        width:'100%',
        borderRadius:0,
        marginLeft:10,

        "& .MuiInputBase-input":{
            width:'90px',
            height:'39px',
            padding:'8px 10px 0',
            boxSizing:'border-box',
            marginRight:13
        },
    },
    btnjoinstyle: {
        width:'390px',
        boxShadow:'none',
        marginTop:44,
        background:'#000',
        color:'#fff',
        borderRadius:0,
        padding:'10px 0',

        "&:hover": {
            background:'#000',
            color:'#fff',
            borderRadius:0, 
            boxShadow:'none',
        },
    },
}));


export default function IdFind(){
    const classes = useStyles();

    const [address, setAddress] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setAddress(event.target.value);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };

    return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <Paper elevation={0}>
                    <Typography className={classes.titletext}>아이디 찾기</Typography>
                    <Typography className={classes.txtstyle1}>회원가입 시 등록하신 정보로<br /> 아이디를 확인하실 수 있습니다.</Typography>
                    
                        <form noValidate autoComplete="off">
                            <TextField
                                id="name"
                                placeholder="이름을 입력해주세요"
                                multiline
                                variant="outlined"
                                className={classes.namebox}
                            />
                            <Paper elevation={0} style={{display:'flex'}}>
                                <TextField
                                    id="email"
                                    multiline
                                    variant="outlined"
                                    className={classes.emailbox}
                                />
                                <span style={{padding:'0 3px'}}> @ </span>
                                <TextField
                                    id="email-address"
                                    multiline
                                    variant="outlined"
                                    className={classes.emailbox}
                                />
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <Select
                                        id="address-select"
                                        open={open}
                                        onClose={handleClose}
                                        onOpen={handleOpen}
                                        value={address}
                                        onChange={handleChange}
                                        className={classes.emailbox2}
                                        >
                                        <MenuItem value={0}>
                                            <em>직접입력</em>
                                        </MenuItem>
                                        <MenuItem value={1}>naver.com</MenuItem>
                                        <MenuItem value={2}>daum.net</MenuItem>
                                        <MenuItem value={3}>gmail.com</MenuItem>
                                    </Select>
                                </FormControl>
                            </Paper>
                        </form>
                    <Paper elevation={0}>
                        <Button variant="contained" className={classes.btnjoinstyle}>확인</Button>
                    </Paper> 
                </Paper>
            </Paper> 
        </div>
    )
}








