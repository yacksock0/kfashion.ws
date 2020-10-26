
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import { ReactComponent as Check } from './images/Check.svg';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    root: {
        textAlign:'center',
        "& .MuiOutlinedInput-root":{
            borderRadius:0,
            marginTop: theme.spacing(1),
        },
        "& .MuiOutlinedInput-input":{
            padding:10,
        }, 
    },
    paper: {
        width:'400px',
        margin:'0 auto',
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
        marginBottom:10,
    },
    idtext: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'14px',
        color:'#c9c9c9',
        marginBottom:5,
    },
    btnjoinstyle: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        width:'100%',
        boxShadow:'none',
        marginTop:7,
        background:'#526af2',
        color:'#fff',
        borderRadius:0,
        padding:'10px 0',

        "&:hover": {
            background:'#526af2',
            color:'#fff',
            borderRadius:0, 
            boxShadow:'none',
        },
    },
}));


export default function PwFind(){
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <Paper elevation={0}>
                    <Typography className={classes.txtstyle1}>회원가입 필수 입력사항입니다.</Typography>
                    
                    <form noValidate autoComplete="off">
                        <TextField
                        id="name"
                        placeholder="이름"
                        variant="outlined"
                        className={classes.namebox}
                        />
                        <Paper elevation={0} style={{display:'flex'}}>
                            <Typography className={classes.idtext}>최소2글자 이상 입력 </Typography>
                            <CheckRoundedIcon style={{color:'#c9c9c9',marginTop:-5}}/>
                        </Paper>

                        {/* 이름중복체크후 가능하면
                        <Paper elevation={0} style={{display:'flex'}}>
                            <Typography className={classes.idtext} style={{color:'#526af2'}}>최소2글자 이상 입력 </Typography>
                            <CheckRoundedIcon style={{color:'#526af2',marginTop:-5}}/>
                        </Paper> */}
                        {/* 이름중복체크후 불가능하면
                        <Paper elevation={0} style={{display:'flex'}}>
                            <Typography className={classes.idtext} style={{color:'#e82828'}}>최소2글자 이상 입력 </Typography>
                            <CheckRoundedIcon style={{color:'#e82828',marginTop:-5}}/>
                        </Paper> */}

                        <TextField
                        id="name1"
                        placeholder="닉네임"
                        variant="outlined"
                        className={classes.namebox}
                        />
                        <Paper elevation={0} style={{display:'flex'}}>
                            <Typography className={classes.idtext}>최소2글자 이상 입력 </Typography>
                            <CheckRoundedIcon style={{color:'#c9c9c9',marginTop:-5}}/>
                        </Paper>

                        {/* 이름중복체크후 가능하면
                        <Paper elevation={0} style={{display:'flex'}}>
                            <Typography className={classes.idtext} style={{color:'#526af2'}}>최소2글자 이상 입력 </Typography>
                            <CheckRoundedIcon style={{color:'#526af2',marginTop:-5}}/>
                        </Paper> */}
                        {/* 이름중복체크후 불가능하면
                        <Paper elevation={0} style={{display:'flex'}}>
                            <Typography className={classes.idtext} style={{color:'#e82828'}}>이미 사용중인 닉네임입니다 </Typography>
                            <CheckRoundedIcon style={{color:'#e82828',marginTop:-5}}/>
                        </Paper> */}
                    </form>
                    <Paper elevation={0}>
                        <Button variant="contained" className={classes.btnjoinstyle} disabled>다음</Button>
                    </Paper> 
                </Paper>
            </Paper> 
        </div>
    )
}















// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import FormControl from '@material-ui/core/FormControl';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         textAlign:'center',
//         "& .MuiOutlinedInput-multiline":{
//             padding:'0 5px',
//             borderRadius:0,
//             height:'39px',
//         },
//         "& .MuiOutlinedInput-input":{
//             padding:'0',
//         },
//     },
//     paper: {
//         width:'400px',
//         margin:'0 auto',
//     },
//     txtstyle1: {
//         fontFamily:'NotoSansCJKkr',
//         fontSize:'17px',
//         fontWeight:'bold',
//         marginBottom:40,
//         lineHeight: '1.2',
//     },
//     emailbox: {
//         width:'32%',
//         marginLeft:0
//     },
//     emailbox2: {
//         width:'100%',
//         borderRadius:0,
//         marginLeft:10,

//         "& .MuiInputBase-input":{
//             width:'90px',
//             height:'39px',
//             padding:'8px 10px 0',
//             boxSizing:'border-box',
//             marginRight:13
//         },
//     },
//     btnjoinstyle: {
//         fontFamily:'NotoSansCJKkr',
//         fontSize:'17px',
//         width:'390px',
//         boxShadow:'none',
//         marginTop:44,
//         background:'#526af2',
//         color:'#fff',
//         borderRadius:0,
//         padding:'10px 0',

//         "&:hover": {
//             background:'#526af2',
//             color:'#fff',
//             borderRadius:0, 
//             boxShadow:'none',
//         },
//     },
// }));


// export default function PwFind(){
//     const classes = useStyles();

//     const [address, setAddress] = React.useState('');
//     const [open, setOpen] = React.useState(false);

//     const handleChange = (event) => {
//         setAddress(event.target.value);
//       };
    
//       const handleClose = () => {
//         setOpen(false);
//       };
    
//       const handleOpen = () => {
//         setOpen(true);
//       };

//     return (
//         <div className={classes.root}>
//             <Paper elevation={0} className={classes.paper}>
//                 <Paper elevation={0}>
//                     <Typography className={classes.txtstyle1}>로그인에 사용할 아이디를 입력해주세요</Typography>
                    
//                         <form noValidate autoComplete="off">
//                             <Paper elevation={0} style={{display:'flex'}}>
//                                 <TextField
//                                     id="email"
//                                     multiline
//                                     variant="outlined"
//                                     className={classes.emailbox}
//                                 />
//                                 <span style={{padding:'0 3px'}}> @ </span>
//                                 <TextField
//                                     id="email-address"
//                                     multiline
//                                     variant="outlined"
//                                     className={classes.emailbox}
//                                 />
//                                 <FormControl variant="outlined" className={classes.formControl}>
//                                     <Select
//                                         id="address-select"
//                                         open={open}
//                                         onClose={handleClose}
//                                         onOpen={handleOpen}
//                                         value={address}
//                                         onChange={handleChange}
//                                         className={classes.emailbox2}
//                                         >
//                                         <MenuItem value={0}>
//                                             <em>직접입력</em>
//                                         </MenuItem>
//                                         <MenuItem value={1}>naver.com</MenuItem>
//                                         <MenuItem value={2}>daum.net</MenuItem>
//                                         <MenuItem value={3}>gmail.com</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                             </Paper>
//                         </form>
//                     <Paper elevation={0}>
//                         <Button variant="contained" className={classes.btnjoinstyle} disabled>다음</Button>
//                     </Paper> 
//                 </Paper>
//             </Paper> 
//         </div>
//     )
// }








