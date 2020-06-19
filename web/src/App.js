import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";

import axios from "axios";

import TopBar from "./components/TopBar";
import SideMenu from "./components/SideMenu";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./views/Home";
import Step from "./views/Step";
import Step2 from "./views/Step2";
import Step3 from "./views/Step3";
import BoundaryBox from "./views/Labeling/BoundaryBox";
import BoundaryBoxList from "./views/Labeling/BoundaryBoxList";
import Segmentation from "./views/Labeling/Segmentaion";
import Polygon from "./views/Labeling/Polygon";
import Test from "./views/Labeling/Test";
import SignIn from "./views/SignIn";
import * as store from "./stores/AuthStore";
import SignUp from "./views/SignUp";


const style = () => ({
    root: {
        display: 'flex',
    }
});


@inject('authStore')
@observer
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileOpen: false,
        };

        this.setMobileOpen = this.setMobileOpen.bind(this);
    }

    componentDidMount() {
        const axiosRequestInterceptors = (config) => {
            const token = localStorage.getItem(store.LocalStorageTokenKey);

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
                this.props.authStore.invalidateLogin();
            }

            return response;
        };

        const axiosResponseErrorHandler = (error) => {
            if((error.response) && (error.response.status === 403)) {
                this.props.authStore.invalidateLogin();
            }

            return Promise.reject(error);
        };

        console.log("========== RGate App componentDidMount ==========");
        axios.interceptors.request.use(axiosRequestInterceptors, axiosRequestErrorHandler);
        axios.interceptors.response.use(axiosResponseInterceptor, axiosResponseErrorHandler);

        this.props.authStore.checkLogin();
    }

    setMobileOpen(mobileOpen) {
        this.setState({mobileOpen: mobileOpen});
    }

    render() {
        const { classes } = this.props;
        const { loginState } = this.props.authStore;

        return (
            <div className={classes.root}>
                <Router>
                    <CssBaseline />

                    <Route path="/" component={ScrollToTop}>
                        <TopBar mobileOpen={this.state.mobileOpen}
                                setMobileOpen={this.setMobileOpen}
                                isLoggedIn={loginState === store.State.Authenticated}
                                doLogout={() => this.props.authStore.doLogout()} />
                        <SideMenu mobileOpen={this.state.mobileOpen}
                                  setMobileOpen={this.setMobileOpen}
                                  isLoggedIn={loginState === store.State.Authenticated} />

                        {loginState === store.State.Authenticated ? (
                            <React.Fragment>
                              <Switch>
                                <Route exact path="/" component={Home} />
                                <Route exact path="/home" component={Home} />
                                  <Route exact path="/step" component={Step} />
                                  <Route exact path="/step2" component={Step2} />
                                  <Route exact path="/step3" component={Step3} />
                                  <Route exact path="/Step/BoundaryBox" component={BoundaryBox} />
                                  <Route exact path="/Step/BoundaryBoxList" component={BoundaryBoxList} />
                                  <Route exact path="/Step/Segmentation" component={Segmentation} />
                                  <Route exact path="/Step/Polygon" component={Polygon} />
                                  <Route exact path="/Test" component={Test} />
                              </Switch>
                            </React.Fragment>
                        ) : (
                            <Switch>
                            <Route path="/SignUp" component={SignUp} />
                            <Route path="/" component={SignIn} />
                            </Switch>
                        )}
                  </Route>
                </Router>
            </div>
        );
    }
};

export default withStyles(style) (App);
