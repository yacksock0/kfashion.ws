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

        return (
            <div>
                {App}
            </div>
        );
    }
};

export default withStyles(style) (App);