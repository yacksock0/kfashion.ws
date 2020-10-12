import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";
import axios from "axios";
import * as sStore from "./stores/kSearching/SAuthStore";
import sHome from "./views/kSearching/Home";
import sSignUp from "./views/kSearching/SignUp";
import sVerify from "./views/kSearching/verify";
import sSignIn from "./views/kSearching/SignIn";
import mHome from "./views/kMatching/Home";
import TopBar from "./components/TopBar";
import SideMenu from "./components/SideMenu";

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

        const { classes } = this.props;
        const { loginState, loginUser} = this.props.sAuthStore;
        return (
            <div className={classes.root}>
                <Router>
                    <CssBaseline />
                    <Route path="/searching" component={sHome}>
                            <TopBar mobileOpen={this.state.mobileOpen}
                                    setMobileOpen={this.setMobileOpen}
                                    isLoggedIn={loginState === sStore.State.Authenticated}
                                    loginUser={loginUser}
                                    doLogout={() => this.props.sAuthStore.doLogout()}
                                    setStep={this.props.currentStepStore.currentStep}
                            />
                            <SideMenu mobileOpen={this.state.mobileOpen}
                                      setMobileOpen={this.setMobileOpen}
                                      loginUser={loginUser}
                                      isLoggedIn={loginState === sStore.State.Authenticated} />
                        {loginState === sStore.State.Authenticated ? (
                            <React.Fragment>
                                <Switch>
                                    <Route exact path="/searching/home" component={sHome}/>
                                    <Route exact path="/searching" component={sHome}/>

                                </Switch>
                            </React.Fragment>
                        ) : (
                            <Switch>
                                <Route path="/searching/SignUp" component={sSignUp} />
                                <Route path="/searching/sign/success" component={sVerify} />
                                <Route path="/searching" component={sSignIn} />
                            </Switch>
                        )}
                    </Route>
                </Router>
            </div>
        );
    }
};

export default withStyles(style) (AppKsearching);