import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

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
    formControl: {
        width:'100%',
        marginBottom:15,

        "::-webkit-input-placeholder":{
            color:'#000'
        },
        
      },
    btnjoinstyle: {
        fontFamily:'NotoSansCJKkr',
        fontSize:'17px',
        fontWeight:'500',
        width:'100%',
        boxShadow:'none',
        marginTop:12,
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


export default function Questions(){
    const classes = useStyles();
    const [questions, setQuestions] = React.useState('');

    const handleChange = (event) => {
        setQuestions(event.target.value);
    };

    return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <Paper elevation={0}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                        native
                        value={questions}
                        onChange={handleChange}
                        name="questions"
                        style={{color:'#818181'}}
                        >
                            <option value=''>보안질문1</option>
                            <option value={1}>제일 친한 친구의 이름은?</option>
                            <option value={2}>초등학교때 가장 생각나는 선생님 성함은?</option>
                            <option value={3}>중학교때 가장 생각나는 선생님 성함은?</option>
                            <option value={4}>고등학교때 가장 생각나는 선생님 성함은?</option>
                            <option value={5}>가장 좋아하는 음식은?</option>
                            <option value={6}>가장 좋아하는 영화 장르는?</option>
                            <option value={7}>가장 좋아하는 영화은?</option>
                            <option value={8}>가장 좋아하는 책은?</option>
                            <option value={9}>가장 좋아하는 동화책은?</option>
                            <option value={10}>가장 좋아하는 운동화 브랜드는?</option>
                            <option value={11}>가장 좋아하는 컬러는?</option>
                            <option value={12}>가장 좋아하는 만화 캐릭터는?</option>
                            <option value={13}>가장 닮고 싶은 사람은?</option>
                            <option value={14}>처음 극장에서 본 영화는?</option>
                            <option value={15}>가장 좋아하는 배우의 이름은?</option>
                            <option value={16}>첫번째 직장이름은?</option>
                            <option value={17}>나의 출신 초등학교는?</option>
                            <option value={18}>나의 보물 제1호는?</option>
                            <option value={19}>가장 좋아하는 과일은?</option>
                            <option value={20}>초등학교시절 나의 꿈은?</option>
                        </Select>
                    </FormControl>
                    <form noValidate autoComplete="off">
                        <Paper elevation={0}>
                            <TextField placeholder="답변" variant="outlined" className={classes.formControl} />
                        </Paper>
                    </form>
                    <Paper elevation={0}>
                        <Button variant="contained" className={classes.btnjoinstyle} disabled>확인</Button>
                    </Paper> 
                </Paper>
            </Paper> 
        </div>
    )
    
}









