import React from "react";
import {withSnackbar} from "notistack";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";

import {
    Button,
    Checkbox,
    CircularProgress,
    Container,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";



const style = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    paper: {
        marginTop: theme.spacing(3),
        marginBottom:'20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        padding: '60px 80px 40px 80px',
        border:'1px solid #ddd',
        //marginBottom:theme.spacing(2),
        backgroundColor:'#fff',
        [theme.breakpoints.down("sm")]: {
            padding:'0',
            border:'0 none',
        },
    },
    mainTitle: {
        textAlign: 'center',
        margin: theme.spacing(2, 0, 0),
        padding: theme.spacing(1, 0),
        fontWeight:'700'
    },
    mainContent: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    mainComment:{
        textAlign: 'right',
    },
    checkAgreeMargin: {
        marginTop: theme.spacing(3),
    },
    titleArea:{
        position:'relative'
    },
    checkAgreeTotal:{
        padding:'0 4px 0 0',
    },
    termsCaption:{
        fontSize:'12px',
        color:'#c1c1c1',
        fontWeight:'600'
    },
    gutterMargin:{
        margin:theme.spacing(3, 0, 2),
        '& input[type=password]':{
            fontFamily:'initial',
        }
    },
    okButton: {
        borderRadius: 24,
    },

    successContainer: {
        textAlign: 'center',
    },
    successTitle: {
        fontSize: 38,
        color: '#333333',
        paddingTop: theme.spacing(6),
    },
    successHeader: {
        fontSize: 16,
        color: '#333333',
        paddingTop: theme.spacing(5),
    },
    successHeader2: {
        fontSize: 16,
        color: '#333333',
    },
    successBody: {
        fontSize: 14,
        color: '#b7b7b7',
        paddingTop: theme.spacing(1),
    },
    successButton: {
        borderRadius: 24,
        fontSize: 16,
        width: 200,
        height: 48,
        marginTop: theme.spacing(4),
    },
});

const decodeURLParams = search => {
    const hashes = search.slice(search.indexOf("?") + 1).split("&");
    return hashes.reduce((params, hash) => {
        const split = hash.indexOf("=");

        if (split < 0) {
            return Object.assign(params, {
                [hash]: null
            });
        }

        const key = hash.slice(0, split);
        const val = hash.slice(split + 1);

        return Object.assign(params, { [key]: decodeURIComponent(val) });
    }, {});
};

@inject('signUpStore')
@observer
class SignUp extends React.Component {
    componentDidMount() {
        const params = decodeURLParams(this.props.location.search);


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.signUpStore.isSignUpFailed) {
            this.props.enqueueSnackbar('회원 가입에 실패하였습니다.', {
                variant: 'error'
            });

            this.props.signUpStore.clearState();
        }

        if(this.props.signUpStore.isNotAvailableEmail) {
            this.props.enqueueSnackbar('이미 존재하는 이메일 혹은 아이디 입니다.', {
                variant: 'error'
            });

            this.props.signUpStore.clearState();
        }

    }
    handleChangeId = (event) => {
        this.props.signUpStore.changeNewMemberId(event.target.value);
    }

    handleChangeEmail = (event) => {
        this.props.signUpStore.changeNewMemberEmail(event.target.value);
    }

    handleChangePassword = (event) => {
        this.props.signUpStore.changeNewMemberPassword(event.target.value);
    }

    handleChangePasswordConfirm = (event) => {
        this.props.signUpStore.changeNewMemberPasswordConfirm(event.target.value);
    }

    handleChangeUserName = (event) => {
        this.props.signUpStore.changeNewMemberUserName(event.target.value);
    }

    handleChangePhone = (event) => {
        this.props.signUpStore.changeNewMemberPhone(event.target.value);
    }

    handleChangeAllAgreements = (event) => {
        this.props.signUpStore.changeAgreementsAll(event.target.checked);
    }

    handleChangeServiceAgreements = (event) => {
        this.props.signUpStore.changeAgreementsService(event.target.checked);
    }

    handleChangePrivacyAgreements = (event) => {
        this.props.signUpStore.changeAgreementsPrivacy(event.target.checked);
    }

    handleClickOK = () => {
        this.props.signUpStore.doSignUp();

    }

    handleClickToHome = () => {
        this.props.history.push("/");
    }

    render() {
        const { classes } = this.props;
        const { isEmailInputed, isValidId, isValidEmail, isValidPassword, isPasswordConfirmed, isValidUsername, isValidPhone, isPending, isSignUpSuccess, canSignUp, newMember, agreements, serverMode} = this.props.signUpStore;

        return (
            <React.Fragment>
                <Container component="main" maxWidth="sm">
                    <div className={classes.appBarSpacer} />
                    <div className={classes.paper}>
                        <img src="https://placeimg.com/100/100/any" alt={""}/>
                        {!isSignUpSuccess ?
                            <div className={classes.mainContent}>
                                <Typography className={classes.mainTitle} component="h1" variant="h3" >
                                    회원가입
                                </Typography>

                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="body2" className={classes.mainComment}>* 필수입력</Typography>
                                    </Grid>
                                </Grid>
                               <TextField id="id"
                                           name="id"
                                           label="아이디"
                                           margin="dense"
                                           value={newMember.id}
                                           onChange={this.handleChangeId}
                                           className={classes.gutterMargin}
                                           InputLabelProps={{shrink: true}}
                                           helperText={isValidPassword ? '' : '최소 4 글자 이상을 입력해 주세요.'}
                                           autoFocus={isValidId ? false : true} required fullWidth/>
                                <TextField id="email"
                                           name="email"
                                           label="이메일 주소"
                                           margin="dense"
                                           value={newMember.email}
                                           onChange={this.handleChangeEmail}
                                           className={classes.gutterMargin}
                                           InputLabelProps={{shrink: true}}
                                           helperText={isValidEmail ? '' : '이메일 형식이 아닙니다.'}
                                           autoFocus={isEmailInputed ? false : true} required fullWidth/>
                                <TextField id="password"
                                           type="password"
                                           name="password"
                                           label="비밀번호"
                                           margin="dense"
                                           autoComplete={"off"}
                                           value={newMember.password}
                                           onChange={this.handleChangePassword}
                                           className={classes.gutterMargin}
                                           InputLabelProps={{shrink: true}}
                                           helperText={isValidPassword ? '' : '최소 4 글자 이상을 입력해 주세요.'}
                                           autoFocus={isValidPassword ? true : false} required fullWidth/>
                                <TextField id="passwordConfirm"
                                           type="password"
                                           name="passwordConfirm"
                                           label="비밀번호 확인"
                                           margin="dense"
                                           autoComplete={"off"}
                                           value={newMember.passwordConfirm}
                                           onChange={this.handleChangePasswordConfirm}
                                           className={classes.gutterMargin}
                                           InputLabelProps={{shrink: true}}
                                           helperText={isPasswordConfirmed ? '' : '패스워드가 일치하지 않습니다.'}
                                           required fullWidth/>
                                <TextField id="name"
                                           name="name"
                                           label="이름"
                                           margin="dense"
                                           value={newMember.userName}
                                           onChange={this.handleChangeUserName}
                                           className={classes.gutterMargin}
                                           InputLabelProps={{shrink: true}}
                                           helperText={isValidUsername ? '' : '최소 2 글자 이상을 입력해 주세요.'}
                                           required fullWidth/>
                                <TextField id="phone"
                                           name="phone"
                                           label="휴대폰"
                                           margin="dense"
                                           value={newMember.phone}
                                           onChange={this.handleChangePhone}
                                           className={classes.gutterMargin}
                                           InputLabelProps={{shrink: true}}
                                           helperText={isValidPhone ? '' : 'EX)010-1234-5678 입력해주세요.'}
                                           required fullWidth/>
                                <div className={classes.titleArea}>
                                    <Typography variant="h5" component="h5">
                                        약관 동의자
                                    </Typography>
                                    <hr></hr>
                                    <FormControlLabel
                                        variant="body2"
                                        name="checkAgreeTotal"
                                        style={{paddingLeft: 9}}
                                        control={
                                            <Checkbox
                                                checked={agreements.all}
                                                onChange={this.handleChangeAllAgreements}
                                                color="primary"
                                                className={classes.checkAgreeTotal}
                                            />
                                        }
                                        label="전체 동의"
                                    />
                                </div>
                                <Grid item xs={12} style={{display: 'flex'}}>
                                    <Grid item xs>
                                        <FormControlLabel
                                            name="checkAgreeService"
                                            control={
                                                <Checkbox
                                                    checked={agreements.service}
                                                    onChange={this.handleChangeServiceAgreements}
                                                    color="primary"
                                                />
                                            }
                                            label="서비스 이용 약관"
                                        />
                                    </Grid>
                                    <Grid item xs align={"right"}>
                                        <Link underline={"always"} href="/terms/terms"
                                              className={classes.termsCaption}>내용보기</Link>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} style={{display: 'flex'}}>
                                    <Grid item xs>
                                        <FormControlLabel
                                            name="checkAgreePersonal"
                                            control={
                                                <Checkbox
                                                    checked={agreements.privacy}
                                                    onChange={this.handleChangePrivacyAgreements}
                                                    color="primary"
                                                />
                                            }
                                            label="개인 정보 처리 방침"
                                        />
                                    </Grid>
                                    <Grid item xs align={"right"}>
                                        <Link underline={"always"} href="/terms/privacy"
                                              className={classes.termsCaption}>내용보기</Link>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} align={"center"}>
                                    <Button color="primary" variant="contained" className={classes.okButton}
                                            disabled={(!canSignUp) || (isPending)}
                                            onClick={this.handleClickOK}
                                            fullWidth>
                                        {isPending ? <CircularProgress size={16}/> : '회원 가입'}
                                    </Button>
                                </Grid>
                            </div>
                            :
                            ''
                        }
                        {isSignUpSuccess ?
                            <div className={classes.successContainer}>
                                {serverMode === 'SERVER' ?
                                    <React.Fragment>
                                        <Typography className={classes.successTitle}>회원 가입 신청 완료</Typography>
                                        <Typography className={classes.successHeader}>{`${newMember.email}로 회원 가입 신청 되었습니다.`}</Typography>
                                        <Typography className={classes.successHeader2}>가입이 완료 되려면 관리자의 승인이 필요합니다.</Typography>
                                        <Typography className={classes.successBody}>승인 후에 ONTHELIVE의 서비스를<br/> 이용하실 수 있습니다.</Typography>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <Typography className={classes.successTitle}>회원 가입 완료</Typography>
                                        <Typography className={classes.successHeader}>{`${newMember.email}로 전송된 이메일을 확인하여`}</Typography>
                                        <Typography className={classes.successHeader2}>가입절차를 완료해 주세요.</Typography>
                                        <Typography className={classes.successBody}>이메일인증 완료 후에 Kfashion의 서비스를<br/> 이용하실 수 있습니다.</Typography>
                                    </React.Fragment>
                                }
                                <Button color="primary" variant="contained"
                                        className={classes.successButton}
                                        onClick={() => this.handleClickToHome()}>
                                    메인으로 가기
                                </Button>
                            </div>
                            :
                            ''
                        }
                    </div>
                    <Grid container style={{ backgroundColor: '#fafafa', paddingBottom: 30}}>
                        <Grid container item xs={12} style={{paddingTop: 16}} >
                            <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', paddingBottom: 16}}>
                                <ErrorIcon style={{width: 16, height: 16, paddingTop: 2, paddingRight: 2}} /><Typography variant="subtitle2">로그인 시스템</Typography>
                            </Grid>
                            <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                <Typography variant="body2" style={{textAlign: 'left'}}>
                                    회원 가입을 통해 <b>생성되는 아이디는 그룹 관리자 계정</b>입니다.<br/>
                                    일반 계정은 로그인 후, 그룹 메뉴를 통해 직접 생성하시면 됩니다.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
};
export default withSnackbar(withRouter(withStyles(style) (SignUp)));