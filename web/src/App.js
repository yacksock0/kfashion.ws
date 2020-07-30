import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {CssBaseline} from "@material-ui/core";
import axios from "axios";
import TopBar from "./components/TopBar";
import SideMenu from "./components/SideMenu";
import Home from "./views/Home";
import Step from "./views/Step";
import Step2 from "./views/Step2";
import Step3 from "./views/Step3";
import BoundaryBox from "./views/labeling/BoundaryBox";
import Polygon from "./views/labeling/Polygon";
import SignIn from "./views/SignIn";
import * as store from "./stores/AuthStore";
import SignUp from "./views/SignUp";
import AdminGroup from "./views/admin/AdminGroup";
import Verify from "./views/verify";
import ImageUpload from "./views/labeling/ImageUpload";
import UserList from "./views/admin/UserList";
import UserWork from "./views/admin/UserWork";
import FinalCheckList from "./views/FinalCheckList";
import HighCheckList from "./views/step2/HighCheckList";
import ModifyStep3 from "./views/ModifyStep3";

const style = () => ({
    root: {
        display: 'flex',
    }
});
@inject('authStore', 'currentStepStore')
@observer
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mobileOpen: false,
            height: window.innerHeight,
            width: window.innerWidth,
            count: 1
        };
        this.updateDimensions = this.updateDimensions.bind(this);
        this.setMobileOpen = this.setMobileOpen.bind(this);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    updateDimensions() {
        this.setState({
            height: window.innerHeight,
            width: window.innerWidth,
            count: this.state.count++
        });
        console.log("count: ", this.state.count)
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);

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
            // if (this.state.width < 1500) {
            //     setTimeout(() => document.body.style.zoom = "68%", 100);
            // } else {
            //     setTimeout(() => document.body.style.zoom = "100%", 100);
            // }
        const { classes } = this.props;
        const { loginState, loginUser} = this.props.authStore;
        return (
            <div className={classes.root}>
                <Router>
                    <CssBaseline />
                    <Route path="/" component={Home}>
                        <TopBar mobileOpen={this.state.mobileOpen}
                                setMobileOpen={this.setMobileOpen}
                                isLoggedIn={loginState === store.State.Authenticated}
                                loginUser={loginUser}
                                doLogout={() => this.props.authStore.doLogout()}
                                setStep={this.props.currentStepStore.currentStep}
                        />
                        <SideMenu mobileOpen={this.state.mobileOpen}
                                  setMobileOpen={this.setMobileOpen}
                                  loginUser={loginUser}
                                  isLoggedIn={loginState === store.State.Authenticated} />
                        {loginState === store.State.Authenticated ? (
                            <React.Fragment>
                                <Switch>
                                    <Route exact path="/home" component={Home}/>
                                    <Route exact path="/step" component={Step} />
                                    <Route exact path="/step2" component={Step2} />
                                    <Route exact path="/step3" component={Step3}/>
                                    <Route exact path="/Step/ImageUpload" component={ImageUpload}/>
                                    <Route exact path="/Step/BoundaryBox" component={BoundaryBox} />
                                    <Route exact path="/Step/Polygon" component={Polygon} />
                                    <Route exact path="/Step2/FinalCheckList" component={FinalCheckList} />
                                    <Route exact path="/Step2/ModifyStep3" component={ModifyStep3} />
                                    <Route exact path="/Step2/HighCheckList" component={HighCheckList} />
                                    <Route exact path="/admin/createGroup" component={AdminGroup} />
                                    <Route exact path="/admin/userList" component={UserList} />
                                    <Route exact path="/admin/userWork" component={UserWork} />
                                </Switch>
                            </React.Fragment>
                        ) : (
                            <Switch>
                                <Route path="/SignUp" component={SignUp} />
                                <Route path="/sign/success" component={Verify} />
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