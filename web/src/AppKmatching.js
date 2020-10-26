import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import axios from "axios";
import * as mStore from "./stores/kMatching/MAuthStore";
import mSignUp from "./views/kMatching/SignInMatch/SignUpMatch";
import mVerify from "./views/kMatching/VerifyMatch";
import TopBarMatch from "./views/kMatching/TopBarMatch";
import MainTopBar from "./views/kMatching/MainTopBarMatch";
import Header from "./views/kMatching/HeaderMatch";
import DailyCody from "./views/kMatching/MainMatch/DailyCody";
import FooterMatch from "./views/kMatching/FooterMatch";
import SignInMatch from "./views/kMatching/SignInMatch/SignInMatch";
import JoinAgreeMatch from "./views/kMatching/SignInMatch/JoinAgreeMatch";

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
                        {loginState === mStore.State.Authenticated ? (
                            <React.Fragment>
                                <MainTopBar mobileOpen={this.state.mobileOpen}
                                            setMobileOpen={this.setMobileOpen}
                                            isLoggedIn={loginState === mStore.State.Authenticated}
                                            loginUser={loginUser}
                                            doLogout={() => this.props.mAuthStore.doLogout()}
                                            setStep={this.props.currentStepStore.currentStep}
                                />
                                <Header/>
                                <Switch>
                                    <Route exact path="/matching/home" component={DailyCody}/>
                                    <Route exact path="/matching" component={DailyCody}/>
                                </Switch>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                            <TopBarMatch mobileOpen={this.state.mobileOpen}
                                         setMobileOpen={this.setMobileOpen}
                                         isLoggedIn={loginState === mStore.State.Authenticated}
                                         loginUser={loginUser}
                                         doLogout={() => this.props.mAuthStore.doLogout()}
                                         setStep={this.props.currentStepStore.currentStep}
                            />
                            <Switch>
                                <Route path="/matching/SignUp" component={mSignUp} />
                                <Route path="/matching/sign/success" component={mVerify} />
                                <Route path="/matching/agree" component={JoinAgreeMatch} />
                                <Route path="/matching" component={SignInMatch} />

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