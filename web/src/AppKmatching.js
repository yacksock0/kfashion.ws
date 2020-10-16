import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";
import axios from "axios";
import * as mStore from "./stores/kMatching/MAuthStore";
import mHome from "./views/kMatching/HomeMatch";
import mSignUp from "./views/kMatching/SignUpMatch";
import mVerify from "./views/kMatching/VerifyMatch";
import mSignIn from "./views/kMatching/SignInMatch";
import TopBar from "./components/TopBar";
import SideMenuMatch from "./views/kMatching/SideMenuMatch";
import test from "./views/kTagging/testTagging";

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

        const { classes } = this.props;
        const { loginState, loginUser} = this.props.mAuthStore;
        return (
            <div className={classes.root}>
                <Router>
                    <CssBaseline />
                    <Route path="/matching" component={mHome}>
                        <TopBar mobileOpen={this.state.mobileOpen}
                                setMobileOpen={this.setMobileOpen}
                                isLoggedIn={loginState === mStore.State.Authenticated}
                                loginUser={loginUser}
                                doLogout={() => this.props.mAuthStore.doLogout()}
                                setStep={this.props.currentStepStore.currentStep}
                        />
                        <SideMenuMatch mobileOpen={this.state.mobileOpen}
                                  setMobileOpen={this.setMobileOpen}
                                  loginUser={loginUser}
                                  isLoggedIn={loginState === mStore.State.Authenticated} />
                        {loginState === mStore.State.Authenticated ? (
                            <React.Fragment>
                                <Switch>
                                    <Route exact path="/matching/home" component={mHome}/>
                                    <Route exact path="/matching" component={mHome}/>
                                    <Route exact path="/matching/test" component={test}/>
                                </Switch>
                            </React.Fragment>
                        ) : (
                            <Switch>
                                <Route path="/matching/SignUp" component={mSignUp} />
                                <Route path="/matching/sign/success" component={mVerify} />
                                <Route path="/matching" component={mSignIn} />
                            </Switch>
                        )}
                    </Route>
                </Router>
            </div>
        );
    }
};

export default withStyles(style) (AppKmatching);