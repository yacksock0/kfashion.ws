import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import * as aStore from "./stores/AppStore";
import AppKfashion from "./AppKfashion";
import AppKtagging from "./AppKtagging";
import AppKsearching from "./AppKsearching";
import AppKmatching from "./AppKmatching";

const style = () => ({
    root: {
        display: 'flex',
    }
});
@inject('appStore', 'authStore','tAuthStore', 'sAuthStore', 'mAuthStore', 'currentStepStore')
@observer
class App extends React.Component {
    componentDidMount() {
        let url = window.location.href;

        if(url.indexOf("tagging") !== -1) this.props.appStore.setLoginURL(aStore.WebURL.kTagging);
        else if(url.indexOf("searching") !== -1) this.props.appStore.setLoginURL(aStore.WebURL.kSearching);
        else if(url.indexOf("matching") !== -1) this.props.appStore.setLoginURL(aStore.WebURL.kMatching);
        else this.props.appStore.setLoginURL(aStore.WebURL.kFashion);
    }

    render() {
        const { classes } = this.props;
        const { loginURL} = this.props.appStore;

        let App;
        if(loginURL === aStore.WebURL.kFashion) App =  <AppKfashion/>;
        else if(loginURL === aStore.WebURL.kTagging)App =  <AppKtagging/>
        else if(loginURL === aStore.WebURL.kSearching)App =  <AppKsearching/>
        else if(loginURL === aStore.WebURL.kMatching)App =  <AppKmatching/>

        // console.log("AA" ,AppKfashion);
        return (
            <div>
                {App}
            </div>
        );
    }
};

export default withStyles(style) (App);
//
// import React from "react";
// import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import {inject, observer} from "mobx-react";
// import {withStyles} from "@material-ui/core/styles";
// import * as aStore from "./stores/AppStore";
// import * as kStore from "./stores/AuthStore";
// import * as mStore from "./stores/kMatching/MAuthStore";
// import * as sStore from "./stores/kSearching/SAuthStore";
// import * as tStore from "./stores/kTagging/TAuthStore";
// import AppKfashion from "./AppKfashion";
// import AppKtagging from "./AppKtagging";
// import AppKsearching from "./AppKsearching";
// import AppKmatching from "./AppKmatching";
//
// import axios from "axios";
// import {CssBaseline} from "@material-ui/core";
// import tHome from "./views/kTagging/HomeTag";
// import TopBar from "./components/TopBar";
// import SideMenu from "./components/SideMenu";
// import tSignUp from "./views/kTagging/SignUpTag";
// import tVerify from "./views/kTagging/VerifyTag";
// import tSignIn from "./views/kTagging/SignInTag";
// import sHome from "./views/kSearching/Home";
// import sSignUp from "./views/kSearching/SignUp";
// import sVerify from "./views/kSearching/verify";
// import sSignIn from "./views/kSearching/SignIn";
// import mHome from "./views/kMatching/Home";
// import mSignUp from "./views/kMatching/SignUp";
// import mVerify from "./views/kMatching/verify";
// import mSignIn from "./views/kMatching/SignIn";
// import Home from "./views/Home";
// import Step from "./views/Step";
// import SuccessList from "./views/SuccessList";
// import SignUp from "./views/SignUp";
// import ProfessionalCheckList from "./views/ProfessionalCheckList";
// import Step2 from "./views/Step2";
// import Step3 from "./views/Step3";
// import ImageUpload from "./views/labeling/ImageUpload";
// import BoundaryBox from "./views/labeling/BoundaryBox";
// import Polygon from "./views/labeling/Polygon";
// import FinalCheckList from "./views/FinalCheckList";
// import ModifyStep3 from "./views/ModifyStep3";
// import HighCheckList from "./views/step2/HighCheckList";
// import AdminGroup from "./views/admin/AdminGroup";
// import UserList from "./views/admin/UserList";
// import UserWork from "./views/admin/UserWork";
// import Verify from "./views/verify";
// import SignIn from "./views/SignIn";
//
// const style = () => ({
//     root: {
//         display: 'flex',
//     }
// });
// @inject('appStore', 'authStore','tAuthStore', 'sAuthStore', 'mAuthStore', 'currentStepStore')
// @observer
// class App extends React.Component {
//     // componentDidMount() {
//     //     let url = window.location.href;
//     //     if(url.indexOf("tagging") !== -1) this.props.appStore.setLoginURL(aStore.WebURL.kTagging);
//     //     else if(url.indexOf("searching") !== -1) this.props.appStore.setLoginURL(aStore.WebURL.kSearching);
//     //     else if(url.indexOf("matching") !== -1) this.props.appStore.setLoginURL(aStore.WebURL.kMatching);
//     //     else this.props.appStore.setLoginURL(aStore.WebURL.kFashion);
//     // }
//     componentDidMount() {
//         let url = window.location.href;
//         if(url.indexOf("tagging") !== -1) {
//             this.props.appStore.setLoginURL(aStore.WebURL.kTagging);
//             this.settingTagging();
//         }
//             else if(url.indexOf("searching") !== -1) {
//                 this.props.appStore.setLoginURL(aStore.WebURL.kSearching);
//                 this.settingSearching();
//         }
//             else if(url.indexOf("matching") !== -1) {
//                 this.props.appStore.setLoginURL(aStore.WebURL.kMatching);
//                 this.settingMatching();
//         }
//             else {
//                 this.props.appStore.setLoginURL(aStore.WebURL.kFashion);
//                 this.settingFashion();
//         }
//     }
//     settingFashion  = () => {
//         const axiosRequestInterceptors = (config) => {
//             const token = localStorage.getItem(kStore.LocalStorageTokenKey);
//             if(token) {
//                 config.headers['X-Auth-Token'] = token;
//             }
//             return config;
//         };
//
//         const axiosRequestErrorHandler = (error) => {
//             return Promise.reject(error);
//         };
//
//         const axiosResponseInterceptor = (response) => {
//             if(response.status === 403) {
//                 this.props.authStore.invalidateLogin();
//             }
//             return response;
//         };
//
//         const axiosResponseErrorHandler = (error) => {
//             if((error.response) && (error.response.status === 403)) {
//                 this.props.authStore.invalidateLogin();
//             }
//
//             return Promise.reject(error);
//         };
//
//         console.log("========== RGate App componentDidMount ==========");
//         axios.interceptors.request.use(axiosRequestInterceptors, axiosRequestErrorHandler);
//         axios.interceptors.response.use(axiosResponseInterceptor, axiosResponseErrorHandler);
//
//         this.props.authStore.checkLogin();
//     }
//     settingTagging  = () => {const axiosRequestInterceptors = (config) => {
//         const token = localStorage.getItem(tStore.tLocalStorageTokenKey);
//         if(token) {
//             config.headers['X-Auth-Token'] = token;
//         }
//         return config;
//     };
//
//         const axiosRequestErrorHandler = (error) => {
//             return Promise.reject(error);
//         };
//
//         const axiosResponseInterceptor = (response) => {
//             if(response.status === 403) {
//                 this.props.tAuthStore.invalidateLogin();
//             }
//             return response;
//         };
//
//         const axiosResponseErrorHandler = (error) => {
//             if((error.response) && (error.response.status === 403)) {
//                 this.props.tAuthStore.invalidateLogin();
//             }
//             return Promise.reject(error);
//         };
//
//         console.log("========== RGate App componentDidMount ==========");
//         axios.interceptors.request.use(axiosRequestInterceptors, axiosRequestErrorHandler);
//         axios.interceptors.response.use(axiosResponseInterceptor, axiosResponseErrorHandler);
//
//         this.props.tAuthStore.checkLogin();}
//     settingSearching = () => {
//         const axiosRequestInterceptors = (config) => {
//             const token = localStorage.getItem(sStore.sLocalStorageTokenKey);
//             if(token) {
//                 config.headers['X-Auth-Token'] = token;
//             }
//             return config;
//         };
//
//         const axiosRequestErrorHandler = (error) => {
//             return Promise.reject(error);
//         };
//
//         const axiosResponseInterceptor = (response) => {
//             if(response.status === 403) {
//                 this.props.sAuthStore.invalidateLogin();
//             }
//             return response;
//         };
//
//         const axiosResponseErrorHandler = (error) => {
//             if((error.response) && (error.response.status === 403)) {
//                 this.props.sAuthStore.invalidateLogin();
//             }
//
//             return Promise.reject(error);
//         };
//
//         console.log("========== RGate App componentDidMount ==========");
//         axios.interceptors.request.use(axiosRequestInterceptors, axiosRequestErrorHandler);
//         axios.interceptors.response.use(axiosResponseInterceptor, axiosResponseErrorHandler);
//
//         this.props.sAuthStore.checkLogin();
//     }
//     settingMatching = () => {
//
//         const axiosRequestInterceptors = (config) => {
//             const token = localStorage.getItem(mStore.mLocalStorageTokenKey);
//             if(token) {
//                 config.headers['X-Auth-Token'] = token;
//             }
//             return config;
//         };
//
//         const axiosRequestErrorHandler = (error) => {
//             return Promise.reject(error);
//         };
//
//         const axiosResponseInterceptor = (response) => {
//             if(response.status === 403) {
//                 this.props.mAuthStore.invalidateLogin();
//             }
//             return response;
//         };
//
//         const axiosResponseErrorHandler = (error) => {
//             if((error.response) && (error.response.status === 403)) {
//                 this.props.mAuthStore.invalidateLogin();
//             }
//
//             return Promise.reject(error);
//         };
//
//         console.log("========== RGate App componentDidMount ==========");
//         axios.interceptors.request.use(axiosRequestInterceptors, axiosRequestErrorHandler);
//         axios.interceptors.response.use(axiosResponseInterceptor, axiosResponseErrorHandler);
//
//         this.props.mAuthStore.checkLogin();
//     }
//
//
//
//     render() {
//         const { classes } = this.props;
//         const { loginURL } = this.props.appStore;
//         const { kLoginState, kLoginUser} = this.props.authStore;
//         const { tLoginState, tLoginUser} = this.props.tAuthStore;
//         const { sLoginState, sLoginUser} = this.props.sAuthStore;
//         const { mLoginState, mLoginUser} = this.props.mAuthStore;
//
//
//         // const { classes } = this.props;
//         // const { loginURL} = this.props.appStore;
//         // let App;
//         // if(loginURL === aStore.WebURL.kFashion) App =  <AppKfashion/>;
//         // else if(loginURL === aStore.WebURL.kTagging)App =  <AppKtagging/>
//         // else if(loginURL === aStore.WebURL.kSearching)App =  <AppKsearching/>
//         // else if(loginURL === aStore.WebURL.kMatching)App =  <AppKmatching/>
//         // return (
//         //
//         //     <div>
//         //         {App}
//         //     </div>
//         // );
//
//         if(loginURL === aStore.WebURL.kFashion) {
//             return (
//                 <div className={classes.root}>
//                     <Router>
//                         <CssBaseline />
//                         <Route path="/" component={Home}>
//                             <TopBar mobileOpen={this.state.mobileOpen}
//                                     setMobileOpen={this.setMobileOpen}
//                                     isLoggedIn={kLoginState === kStore.State.Authenticated}
//                                     loginUser={kLoginUser}
//                                     doLogout={() => this.props.authStore.doLogout()}
//                                     setStep={this.props.currentStepStore.currentStep}
//                             />
//                             <SideMenu mobileOpen={this.state.mobileOpen}
//                                       setMobileOpen={this.setMobileOpen}
//                                       loginUser={kLoginUser}
//                                       isLoggedIn={kLoginState === kStore.State.Authenticated} />
//                             {kLoginState === kStore.State.Authenticated ? (
//                                 <React.Fragment>
//                                     <Switch>
//                                         <Route exact path="/home" component={Home}/>
//                                         <Route path="/" component={Home} />
//                                         <Route exact path="/step" component={Step} />
//                                         <Route exact path="/SuccessList" component={SuccessList} />
//                                         <Route path="/SignUp" component={SignUp} />
//                                         <Route exact path="/ProfessionalCheckList" component={ProfessionalCheckList} />
//                                         <Route exact path="/step2" component={Step2} />
//                                         <Route exact path="/step3" component={Step3}/>
//                                         <Route exact path="/Step/ImageUpload" component={ImageUpload}/>
//                                         <Route exact path="/Step/BoundaryBox" component={BoundaryBox} />
//                                         <Route exact path="/Step/Polygon" component={Polygon} />
//                                         <Route exact path="/Step2/FinalCheckList" component={FinalCheckList} />
//                                         <Route exact path="/Step2/ModifyStep3" component={ModifyStep3} />
//                                         <Route exact path="/Step2/HighCheckList" component={HighCheckList} />
//                                         <Route exact path="/admin/createGroup" component={AdminGroup} />
//                                         <Route exact path="/admin/userList" component={UserList} />
//                                         <Route exact path="/admin/userWork" component={UserWork} />
//
//                                     </Switch>
//                                 </React.Fragment>
//                             ) : (
//                                 <Switch>
//                                     <Route path="/SignUp" component={SignUp} />
//                                     <Route path="/sign/success" component={Verify} />
//                                     <Route path="/" component={SignIn} />
//
//                                 </Switch>
//                             )}
//                         </Route>
//                     </Router>
//                 </div>
//             );
//         }
//         else if(loginURL === aStore.WebURL.kTagging) {
//             return (
//                 <div className={classes.root}>
//                     <Router>
//                         <CssBaseline />
//                         <Route path="/tagging" component={tHome}>
//                             <TopBar mobileOpen={this.state.mobileOpen}
//                                     setMobileOpen={this.setMobileOpen}
//                                     isLoggedIn={tLoginState === tStore.State.Authenticated}
//                                     loginUser={tLoginUser}
//                                     doLogout={() => this.props.tAuthStore.doLogout()}
//                                     setStep={this.props.currentStepStore.currentStep}
//                             />
//                             <SideMenu mobileOpen={this.state.mobileOpen}
//                                       setMobileOpen={this.setMobileOpen}
//                                       loginUser={tLoginUser}
//                                       isLoggedIn={tLoginState === tStore.State.Authenticated} />
//
//                             {tLoginState === tStore.State.Authenticated ? (
//                                 <React.Fragment>
//                                     <Switch>
//                                         <Route exact path="/tagging/home" component={tHome}/>
//                                         <Route exact path="/tagging" component={tHome}/>
//
//                                     </Switch>
//                                 </React.Fragment>
//                             ) : (
//                                 <Switch>
//                                     <Route path="/tagging/SignUpTag" component={tSignUp} />
//                                     <Route path="/tagging/sign/success" component={tVerify} />
//                                     <Route path="/tagging" component={tSignIn} />
//
//                                 </Switch>
//                             )}
//                         </Route>
//                     </Router>
//                 </div>
//             );
//         }
//         // else if(loginURL === aStore.WebURL.kSearching){
//         //     return (
//         //         <div className={classes.root}>
//         //             <Router>
//         //                 <CssBaseline />
//         //                 <Route path="/searching" component={sHome}>
//         //                     <TopBar mobileOpen={this.state.mobileOpen}
//         //                             setMobileOpen={this.setMobileOpen}
//         //                             isLoggedIn={loginState === sStore.State.Authenticated}
//         //                             loginUser={loginUser}
//         //                             doLogout={() => this.props.sAuthStore.doLogout()}
//         //                             setStep={this.props.currentStepStore.currentStep}
//         //                     />
//         //                     <SideMenu mobileOpen={this.state.mobileOpen}
//         //                               setMobileOpen={this.setMobileOpen}
//         //                               loginUser={loginUser}
//         //                               isLoggedIn={loginState === sStore.State.Authenticated} />
//         //                     {loginState === sStore.State.Authenticated ? (
//         //                         <React.Fragment>
//         //                             <Switch>
//         //                                 <Route exact path="/searching/home" component={sHome}/>
//         //                                 <Route exact path="/searching" component={sHome}/>
//         //
//         //                             </Switch>
//         //                         </React.Fragment>
//         //                     ) : (
//         //                         <Switch>
//         //                             <Route path="/searching/SignUpTag" component={sSignUp} />
//         //                             <Route path="/searching/sign/success" component={sVerify} />
//         //                             <Route path="/searching" component={sSignIn} />
//         //                         </Switch>
//         //                     )}
//         //                 </Route>
//         //             </Router>
//         //         </div>
//         //     );
//         // }
//         // else if(loginURL === aStore.WebURL.kMatching){
//         //     return (
//         //         <div className={classes.root}>
//         //             <Router>
//         //                 <CssBaseline />
//         //                 <Route path="/matching" component={mHome}>
//         //                     <TopBar mobileOpen={this.state.mobileOpen}
//         //                             setMobileOpen={this.setMobileOpen}
//         //                             isLoggedIn={loginState === mStore.State.Authenticated}
//         //                             loginUser={loginUser}
//         //                             doLogout={() => this.props.mAuthStore.doLogout()}
//         //                             setStep={this.props.currentStepStore.currentStep}
//         //                     />
//         //                     <SideMenu mobileOpen={this.state.mobileOpen}
//         //                               setMobileOpen={this.setMobileOpen}
//         //                               loginUser={loginUser}
//         //                               isLoggedIn={loginState === mStore.State.Authenticated} />
//         //                     {loginState === mStore.State.Authenticated ? (
//         //                         <React.Fragment>
//         //                             <Switch>
//         //                                 <Route exact path="/matching/home" component={mHome}/>
//         //                                 <Route exact path="/matching" component={mHome}/>
//         //                             </Switch>
//         //                         </React.Fragment>
//         //                     ) : (
//         //                         <Switch>
//         //                             <Route path="/matching/SignUpTag" component={mSignUp} />
//         //                             <Route path="/matching/sign/success" component={mVerify} />
//         //                             <Route path="/matching" component={mSignIn} />
//         //                         </Switch>
//         //                     )}
//         //                 </Route>
//         //             </Router>
//         //         </div>
//         //     );
//         // }
//
//
//     }
// };
//
// export default withStyles(style) (App);