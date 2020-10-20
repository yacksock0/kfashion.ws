import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import axios from "axios";
import * as sStore from "./stores/kSearching/SAuthStore";
import sSignUp from "./views/kSearching/SinupSearch/SignUpSearch";
import sVerify from "./views/kSearching/SinupSearch/VerifySearch";
import sSignIn from "./views/kSearching/SinupSearch/SignInSearch";
import TopBar from "./views/kSearching/TopBarSearch";
import TrendSearchByText from "./views/kSearching/MainSearch/TrendSearchByText";
import TrendSearchByImage from "./views/kSearching/MainSearch/TrendSearchByImage";
import FooterSearch from "./views/kSearching/FooterSearch";
import MainContents from "./views/kSearching/MainSearch/MainContentSearch";
import JoinAgreeSearch from "./views/kSearching/SinupSearch/JoinAgreeSearch";


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
                        {loginState === sStore.State.Authenticated ? (
                            <React.Fragment>
                                <Switch>
                                    <Route exact path="/searching/home" component={MainContents}/>
                                    <Route exact path="/searching" component={MainContents}/>
                                    <Route exact path="/searching/text" component={TrendSearchByText}/>
                                    <Route exact path="/searching/image" component={TrendSearchByImage}/>

                                </Switch>
                            </React.Fragment>
                        ) : (
                            <Switch>
                                <Route path="/searching/SignUp" component={sSignUp} />
                                <Route path="/searching/sign/success" component={sVerify} />
                                <Route path="/searching/agree" component={JoinAgreeSearch} />
                                {/*<Route path="/searching/SignUp/id" component={JoinId} />*/}
                                {/*<Route path="/searching/SignUp/pw" component={JoinPw} />*/}
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