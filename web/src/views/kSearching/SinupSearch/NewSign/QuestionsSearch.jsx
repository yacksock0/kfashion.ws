import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {inject, observer} from "mobx-react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";


const style = (theme) => ({
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
        background:'#38a67e',
        color:'#fff',
        borderRadius:0,
        padding:'10px 0',

        "&:hover": {
            background:'#38a67e',
            color:'#fff',
            borderRadius:0, 
            boxShadow:'none',
        },
    },
});

@inject('sSignUpStore')
@observer
class QuestionsSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionsList : [
                "제일 친한 친구의 이름은?",
                "초등학교때 가장 생각나는 선생님 성함은?",
                "중학교때 가장 생각나는 선생님 성함은?",
                "고등학교때 가장 생각나는 선생님 성함은?",
                "가장 좋아하는 음식은?",
                "가장 좋아하는 영화 장르는?",
                "가장 좋아하는 영화는?",
                "가장 좋아하는 책은?",
                "가장 좋아하는 동화책은?",
                "가장 좋아하는 운동화 브랜드는?",
                "가장 좋아하는 컬러는?",
                "가장 좋아하는 만화 캐릭터는?",
                "가장 닮고 싶은 사람은?",
                "처음 극장에서 본 영화는?",
                "가장 좋아하는 배우의 이름은?",
                "첫번째 직장이름은?",
                "나의 출신 초등학교는?",
                "나의 보물 제1호는?",
                "가장 좋아하는 과일은?",
                "초등학교시절 나의 꿈은?",
            ],
            url : ""
        };
    }
    render() {
        const {classes, handleClickOK} = this.props;
        const {
            isPending, newMember,
            changeNewMemberQuestion1,
            changeNewMemberAnswer1,
            changeNewMemberQuestion2,
            changeNewMemberAnswer2,
            changeNewMemberQuestion3,
            changeNewMemberAnswer3,
            isCheckQuestion,
            isCheckAnswer
        } = this.props.sSignUpStore;
    return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <Paper elevation={0}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                        native
                        value={newMember.question1}
                        onChange={changeNewMemberQuestion1}
                        name="questions"
                        style={{color:'#818181'}}
                        >
                            <option value=''>보안질문1</option>
                            {this.state.questionsList.map( (e, i) =>{
                                return <option value={i+1}>{e}</option>
                            })}
                        </Select>
                    </FormControl>
                    <form noValidate autoComplete="off">
                        <Paper elevation={0}>
                            <TextField placeholder="답변"
                                       variant="outlined"
                                       className={classes.formControl}
                                       value={newMember.answer1}
                                       onChange={changeNewMemberAnswer1}
                            />
                        </Paper>
                    </form>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                            native
                            value={newMember.question2}
                            onChange={changeNewMemberQuestion2}
                            name="questions"
                            style={{color: '#818181'}}
                        >
                            <option value={0}>보안질문2</option>
                            {this.state.questionsList.map( (e, i) =>{
                                return <option value={i+1}>{e}</option>
                            })}
                        </Select>
                    </FormControl>
                    <form noValidate autoComplete="off">
                        <Paper elevation={0}>
                            <TextField placeholder="답변"
                                       variant="outlined"
                                       className={classes.formControl}
                                       value={newMember.answer2}
                                       onChange={changeNewMemberAnswer2}
                            />
                        </Paper>
                    </form>

                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                            native
                            value={newMember.question3}
                            onChange={changeNewMemberQuestion3}
                            name="questions"
                            style={{color: '#818181'}}
                        >
                            <option value={0}>보안질문3</option>
                            {this.state.questionsList.map( (e, i) =>{
                                return <option value={i+1}>{e}</option>
                            })}
                        </Select>
                    </FormControl>
                    <form noValidate autoComplete="off">
                        <Paper elevation={0}>
                            <TextField placeholder="답변"
                                       variant="outlined"
                                       className={classes.formControl}
                                       value={newMember.answer3}
                                       onChange={changeNewMemberAnswer3}
                            />
                        </Paper>
                    </form>


                    <Paper elevation={0}>
                        <Button variant="contained"
                                className={classes.btnjoinstyle}
                                disabled={!isCheckQuestion || !isCheckAnswer}
                                onClick={handleClickOK}>확인</Button>
                    </Paper> 
                </Paper>
            </Paper> 
        </div>
    )

    }}

export default withSnackbar(withRouter(withStyles(style) (QuestionsSearch)));












