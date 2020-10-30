import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import axios from "axios";
import * as sStore from "./stores/kSearching/SAuthStore";
// import sSignUp from "./views/kSearching/SinupSearch/SignUpSearch";
// import sVerify from "./views/kSearching/SinupSearch/VerifySearch";
import sSignIn from "./views/kSearching/SinupSearch/SignInSearch";
import './App.css'
import TopBarSearch from "./views/kSearching/TopBarSearch";
import FooterSearch from "./views/kSearching/FooterSearch";
import JoinAgreeSearch from "./views/kSearching/SinupSearch/JoinAgreeSearch";

import MainContentSearch from "./views/kSearching/MainSearch/MainContentSearch";
import JoinQuestionsSearch from "./views/kSearching/SinupSearch/NewSign/JoinQuestionsSearch";
import JoinWelcomeSearch from "./views/kSearching/SinupSearch/NewSign/JoinWelcomeSearch";
import TrendSearchByText from "./views/kSearching/MainSearch/TrendSearchByText";
import TrendSearchByImage from "./views/kSearching/MainSearch/TrendSearchByImage";
import IdFindSearch from "./views/kSearching/SinupSearch/NewSign/IdFindSearch";
import IdCompleteSearch from "./views/kSearching/SinupSearch/NewSign/IdCompleteSearch";
import PwFindSearch from "./views/kSearching/SinupSearch/NewSign/PwFindSearch";
import PwCompleteSearch from "./views/kSearching/SinupSearch/NewSign/PwCompleteSearch";

import TrendSearchByTextForScroll from "./views/kSearching/MainSearch/TrendSearchByTextForScroll";

const style = () => ({
    root: {
        display: 'flex',
    }
});
@inject('sAuthStore', 'currentStepStore')
@observer
class AppKsearching extends React.Component {
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
            const token = localStorage.getItem(sStore.sLocalStorageTokenKey);
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
                this.props.sAuthStore.invalidateLogin();
            }
            return response;
        };

        const axiosResponseErrorHandler = (error) => {
            if((error.response) && (error.response.status === 403)) {
                this.props.sAuthStore.invalidateLogin();
            }

            return Promise.reject(error);
        };

        console.log("========== RGate App componentDidMount ==========");
        axios.interceptors.request.use(axiosRequestInterceptors, axiosRequestErrorHandler);
        axios.interceptors.response.use(axiosResponseInterceptor, axiosResponseErrorHandler);

        this.props.sAuthStore.checkLogin();
    }

    setMobileOpen(mobileOpen) {
        this.setState({mobileOpen: mobileOpen});
    }

    render() {

        const { loginState, loginUser} = this.props.sAuthStore;
        return (
            <div className="App">
                <Router>
                    <Route path="/searching" component={MainContentSearch}>
                            <TopBarSearch mobileOpen={this.state.mobileOpen}
                                    setMobileOpen={this.setMobileOpen}
                                    isLoggedIn={loginState === sStore.State.Authenticated}
                                    loginUser={loginUser}
                                    doLogout={() => this.props.sAuthStore.doLogout()}
                                    setStep={this.props.currentStepStore.currentStep}
                                    gohome={this.props.sAuthStore.goHome}
                            />
                        {loginState === sStore.State.Authenticated ? (
                            <React.Fragment>
                                <Switch>
                                    <Route exact path="/searching/home" component={MainContentSearch}/>
                                    <Route exact path="/searching" component={MainContentSearch}/>
                                    <Route exact path="/searching/text" component={TrendSearchByText}/>
                                    <Route exact path="/searching/image" component={TrendSearchByImage}/>
                                    <Route exact path="/searching/scrolltext" component={TrendSearchByTextForScroll} />

                                </Switch>
                            </React.Fragment>
                        ) : (
                            <Switch>
                                <Route path="/searching/sign/success" component={JoinWelcomeSearch} />
                                <Route path="/searching/agree" component={JoinAgreeSearch} />
                                <Route path="/searching/question" component={JoinQuestionsSearch} />
                                <Route path="/searching/findId" component={IdFindSearch} />
                                <Route path="/searching/completeId" component={IdCompleteSearch} />
                                <Route path="/searching/findPw" component={PwFindSearch} />
                                <Route path="/searching/completePw" component={PwCompleteSearch} />
                                <Route path="/searching" component={sSignIn} />

                            </Switch>
                        )}
                        <FooterSearch />
                    </Route>
                </Router>
            </div>
        );
    }
};

export default withStyles(style) (AppKsearching);