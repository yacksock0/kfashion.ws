import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";
import axios from "axios";
import * as sStore from "./stores/kSearching/SAuthStore";
import sHome from "./views/kSearching/HomeSearch";
import sSignUp from "./views/kSearching/SignUpSearch";
import sVerify from "./views/kSearching/VerifySearch";
import sSignIn from "./views/kSearching/SignInSearch";
import mHome from "./views/kMatching/HomeMatch";
// import TopBar from "./components/TopBar";
import SideMenu from "./components/SideMenu";
import SideMenuSearch from "./views/kSearching/SideMenuSearch";
import test from "./views/kTagging/testTagging";
import TopBar from "./views/Test/Test/TopBar";
import TrendSearch from "./views/Test/Test/TrendSearch";
import Footer from "./views/Test/Test/Footer";
import MainContents from "./views/Test/Test/MainContents";

// import React from 'react';
// import './App.css';
// import TopBar from './TopBar';
// import MainContents from './MainContents';
// import TrendSearch from './TrendSearch';
// import Footer from './Footer';

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
            <div className="App">
                <Router>
                    <Route path="/searching" component={MainContents}>
                            <TopBar mobileOpen={this.state.mobileOpen}
                                    setMobileOpen={this.setMobileOpen}
                                    isLoggedIn={loginState === sStore.State.Authenticated}
                                    loginUser={loginUser}
                                    doLogout={() => this.props.sAuthStore.doLogout()}
                                    setStep={this.props.currentStepStore.currentStep}
                            />
                            {/*<SideMenuSearch mobileOpen={this.state.mobileOpen}*/}
                            {/*          setMobileOpen={this.setMobileOpen}*/}
                            {/*          loginUser={loginUser}*/}
                            {/*          isLoggedIn={loginState === sStore.State.Authenticated} />*/}
                        {loginState === sStore.State.Authenticated ? (
                            <React.Fragment>
                                <Switch>
                                    <Route exact path="/searching/home" component={MainContents}/>
                                    <Route exact path="/searching" component={MainContents}/>
                                    <Route exact path="/searching/text" component={TrendSearch}/>

                                </Switch>
                            </React.Fragment>
                        ) : (
                            <Switch>
                                <Route path="/searching/SignUp" component={sSignUp} />
                                <Route path="/searching/sign/success" component={sVerify} />
                                <Route path="/searching" component={sSignIn} />
                            </Switch>
                        )}
                        <Footer />
                    </Route>
                </Router>
            </div>
            //
            // <div className="App">
            //     <header className="App-header">
            //         <TopBar />
            //          <MainContents />
            //         <TrendSearch />
            //         <Footer />
            //     </header>
            // </div>
        );
    }
};

export default withStyles(style) (AppKsearching);