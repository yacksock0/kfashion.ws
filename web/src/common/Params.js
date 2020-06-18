export const deviceType = {
    android: "android",
    ios: "ios",
    etc: "etc"
}

export const browserType = {
    chrome: "chrome",
    safari: "safari",
    edge: "edge"
}

export function getURLParams(search) {
    const hashes = search.slice(search.indexOf("?") + 1).split("&");

    return hashes.reduce((params, hash) => {
        const split = hash.indexOf("=");

        if (split < 0) {
            return Object.assign(params, {
                [hash]: null
            });
        }

        const key = hash.slice(0, split);
        const val = hash.slice(split + 1);

        return Object.assign(params, { [key]: decodeURIComponent(val) });
    }, {});
};

export function getDeviceBrowserType(isAlert) {
    const agent = navigator.userAgent.toLowerCase();
    if(isAlert) {
        alert(agent);
    }
    // else {
    //     console.log('Agent : ' + agent);
    // }

    let deviceType = undefined;
    let browserType = undefined;

    if(agent.indexOf('android') > 0) {
        deviceType = 'android';

        if(agent.indexOf('kakaotalk') > 0) {
            browserType = 'kakaotalk';
        } else if(agent.indexOf('samsungbrowser') > 0) {
            browserType = 'saumsungbrowser';
        } else if(agent.indexOf('chrome') > 0) {
            browserType = 'chrome';
        } else {
            browserType = 'etc';
        }
    } else if(agent.indexOf('iphone') > 0) {
        deviceType = 'ios';

        if(agent.indexOf('kakaotalk') > 0) {
            browserType = 'kakaotalk';
        } else if(agent.indexOf('safari') > 0) {
            if(agent.indexOf('crios') > 0) {
                browserType = 'chrome';
            } else {
                browserType = 'safari';
            }
        } else {
            browserType = 'etc';
        }
    } else if(agent.indexOf('ipad') > 0) {
        deviceType = 'ios';

        if(agent.indexOf('kakaotalk') > 0) {
            browserType = 'kakaotalk';
        } else if(agent.indexOf('safari') > 0) {
            if(agent.indexOf('crios') > 0) {
                browserType = 'chrome';
            } else {
                browserType = 'safari';
            }
        } else {
            browserType = 'etc';
        }
    } else {
        deviceType = 'etc';

        if(agent.indexOf('edge') > 0) {
            browserType = 'edge'
        } else if(agent.indexOf('firefox') > 0) {
            browserType = 'firefox';
        } else if(agent.indexOf('chrome') > 0) {
            browserType = 'chrome';
        } else if(agent.indexOf('safari') > 0) {
            browserType = 'safari';
        } else {
            browserType = 'etc';
        }
    }

    return {deviceType: deviceType, browserType: browserType};
}