import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";
import axios from "axios";
import * as tStore from "./stores/kTagging/TAuthStore";
import tHome from "./views/kTagging/HomeTag";
import tSignUp from "./views/kTagging/SignUpTag";
import tVerify from "./views/kTagging/VerifyTag";
import tSignIn from "./views/kTagging/SignInTag";
import TopBar from "./components/TopBar";
import SideMenuTag from "./views/kTagging/SideMenuTag";
import test from "./views/kTagging/test";

const style = () => ({
    root: {
        display: 'flex',
    }
});
@inject('tAuthStore', 'currentStepStore')
@observer
class AppKtagging extends React.Component {
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
            const token = localStorage.getItem(tStore.tLocalStorageTokenKey);
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
                this.props.tAuthStore.invalidateLogin();
            }
            return response;
        };

        const axiosResponseErrorHandler = (error) => {
            if((error.response) && (error.response.status === 403)) {
                this.props.tAuthStore.invalidateLogin();
            }
            return Promise.reject(error);
        };

        console.log("========== RGate App componentDidMount ==========");
        axios.interceptors.request.use(axiosRequestInterceptors, axiosRequestErrorHandler);
        axios.interceptors.response.use(axiosResponseInterceptor, axiosResponseErrorHandler);

        this.props.tAuthStore.checkLogin();
    }

    setMobileOpen(mobileOpen) {
        this.setState({mobileOpen: mobileOpen});
    }

    render() {

        const { classes } = this.props;
        const { loginState, loginUser} = this.props.tAuthStore;
        return (
            <div className={classes.root}>
                <Router>
                    <CssBaseline />
                    <Route path="/tagging" component={tHome}>
                        <TopBar mobileOpen={this.state.mobileOpen}
                                setMobileOpen={this.setMobileOpen}
                                isLoggedIn={loginState === tStore.State.Authenticated}
                                loginUser={loginUser}
                                doLogout={() => this.props.tAuthStore.doLogout()}
                                setStep={this.props.currentStepStore.currentStep}
                        />
                        <SideMenuTag mobileOpen={this.state.mobileOpen}
                                  setMobileOpen={this.setMobileOpen}
                                  loginUser={loginUser}
                                  isLoggedIn={loginState === tStore.State.Authenticated} />

                        {loginState === tStore.State.Authenticated ? (
                            <React.Fragment>
                                <Switch>
                                    <Route exact path="/tagging/home" component={tHome}/>
                                    <Route exact path="/tagging" component={tHome}/>
                                    <Route exact path="/tagging/test" component={test}/>

                                </Switch>
                            </React.Fragment>
                        ) : (
                            <Switch>
                                <Route path="/tagging/SignUp" component={tSignUp} />
                                <Route path="/tagging/sign/success" component={tVerify} />
                                <Route path="/tagging" component={tSignIn} />

                            </Switch>
                        )}
                    </Route>
                </Router>
            </div>
        );
    }
};

export default withStyles(style) (AppKtagging);