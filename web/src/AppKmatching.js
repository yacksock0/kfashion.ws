import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import axios from "axios";
import * as mStore from "./stores/kMatching/MAuthStore";
import mSignIn from "./views/kMatching/SignInMatch/SignInMatch";
import './App.css' ;
import TopBarMatch from "./views/kMatching/TopBarMatch";
import FooterMatch from "./views/kMatching/FooterMatch";
import JoinAgreeMatch from "./views/kMatching/SignInMatch/JoinAgreeMatch";

import DailyCody from "./views/kMatching/MainMatch/DailyCody";

import JoinQuestionsMatch from "./views/kMatching/SignInMatch/NewSign/JoinQuestionsMatch"
import JoinWelcomeMatch from "./views/kMatching/SignInMatch/NewSign/JoinWelcomeMatch"
import IdFindMatch from "./views/kMatching/SignInMatch/NewSign/IdFindMatch";
import IdCompleteMatch from "./views/kMatching/SignInMatch/NewSign/IdCompleteMatch"
import PwFindMatch from "./views/kMatching/SignInMatch/NewSign/PwFindMatch";
import PwCompleteMatch from "./views/kMatching/SignInMatch/NewSign/PwCompleteMatch";
import HeaderMatch from "./views/kMatching/HeaderMatch";


const style = () => ({
    root: {
        display: 'flex',
    }
});
@inject('mAuthStore', 'currentStepStore')
@observer
class AppKmatching extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileOpen: false,
            height: window.innerHeight,
            width: window.innerWidth,
            count: 1
        };
        this.setMobileOpen = this.setMobileOpen.bind(this);
    }

    componentDidMount() {
        const axiosRequestInterceptors = (config) => {
            const token = localStorage.getItem(mStore.mLocalStorageTokenKey);
            if(token) {
                config.headers['X-Auth-Token'] = token;
            }
            return config;
        };

        const axiosRequestErrorHandler = (error) => {
            return Promise.reject(error);
        };

        const axiosResponseInterceptor = (response) => {
            if(response.status === 403) {
                this.props.mAuthStore.invalidateLogin();
            }
            return response;
        };
        const axiosResponseErrorHandler = (error) => {
            if((error.response) && (error.response.status === 403)) {
                this.props.mAuthStore.invalidateLogin();
            }
            return Promise.reject(error);
        };

        console.log("========== RGate App componentDidMount ==========");
        axios.interceptors.request.use(axiosRequestInterceptors, axiosRequestErrorHandler);
        axios.interceptors.response.use(axiosResponseInterceptor, axiosResponseErrorHandler);

        this.props.mAuthStore.checkLogin();
    }

    setMobileOpen(mobileOpen) {
        this.setState({mobileOpen: mobileOpen});
    }

    render() {
        const { loginState, loginUser} = this.props.mAuthStore;
        return (
            <div className="App">
                <Router>
                    <Route path="/matching" component={DailyCody}>
                                <TopBarMatch mobileOpen={this.state.mobileOpen}
                                            setMobileOpen={this.setMobileOpen}
                                            isLoggedIn={loginState === mStore.State.Authenticated}
                                            loginUser={loginUser}
                                            doLogout={() => this.props.mAuthStore.doLogout()}
                                            setStep={this.props.currentStepStore.currentStep}
                                             gohome = {this.props.mAuthStore.goHome}
                                />
                                {/*<HeaderMatch/>*/}
                        {loginState === mStore.State.Authenticated ? (
                            <React.Fragment>
                                <Switch>
                                    <Route exact path="/matching/home" component={DailyCody}/>
                                    <Route exact path="/matching" component={DailyCody}/>
                                </Switch>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                            <Switch>
                                <Route path="/matching/sign/success" component={JoinWelcomeMatch} />
                                <Route path="/matching/agree" component={JoinAgreeMatch} />
                                <Route path="/matching/question" component={JoinQuestionsMatch} />
                                <Route path="/matching/findId" component={IdFindMatch} />
                                <Route path="/matching/completeId" component={IdCompleteMatch} />
                                <Route path="/matching/findPw" component={PwFindMatch} />
                                <Route path="/matching/completePw" component={PwCompleteMatch} />
                                <Route path="/matching" component={mSignIn} />

                            </Switch>
                            </React.Fragment>
                        )}
                        <FooterMatch />
                    </Route>
                </Router>
            </div>
        );
    }
};

export default withStyles(style) (AppKmatching);