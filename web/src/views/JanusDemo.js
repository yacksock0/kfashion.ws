import _ from "lodash";

const Janus = window.Janus;

const Log = (msg, ...args) => {
    if(msg) {
        if(typeof msg === 'string') {
            console.log(`[OnTheLive Demo] ${msg}`, ...args);
        } else {
            console.log(`[OnTheLive Demo] ${JSON.stringify(msg)}`, ...args);
        }
    } else {
        console.log();
    }
}

export class JanusDemo {
    constructor(teacherVideoRef, studentVideoRef, config) {
        this.teacherVideoRef = teacherVideoRef;
        this.studentVideoRef = studentVideoRef;

        this.janus = undefined;
        this.echoHandle = undefined;


        this.teacherHandle = undefined;
        this.teacherId = '';
        this.studentHandle = undefined;

        this.onInitializeSuccess = config ? config.onInitializeSuccess : undefined;
        this.onInitializeError = config ? config.onInitializeError : undefined;
        this.onPublished = config ? config.onPublished : undefined;
    }

    static listVideoDevices = (onSuccess) => {
        Janus.listDevices((devices) => {
            console.log('Video devices : ', devices);

            const videoDevices = _.filter(devices, (d) => d.kind === 'videoinput' && d.deviceId !== 'default');

            if(onSuccess) {
                onSuccess(videoDevices);
            }
        });
    }

    start(video, bitrate, simulcast) {
        let janusServer = 'wss://bs010.onthe.live:8989/janus';

        Log(`Connecting to ${janusServer}`);
        let janus = new Janus({
            server: janusServer,
            success: () => {
                Log('Connect success');

                this.janus = janus;
                this.attachEchoPlugin(janus, video, bitrate, simulcast);

                if(this.onInitializeSuccess) {
                    this.onInitializeSuccess();
                }
            },
            error: () => {
                Log('Connect error');

                if(this.onInitializeError) {
                    this.onInitializeError();
                }
            },
            destroyed: () => {
                Log('Janus Object destroyed');

                window.location.reload();
            },
        });
    }

    stop() {
        if(this.janus) {
            this.janus.destroy();
            this.janus = undefined;
        }
    }

    attachEchoPlugin = (janus, video, bitrate, simulcast) => {
        const that = this;
        const demoId = Janus.randomString(12);

        Log('Attaching echo plugin');
        janus.attach({
            plugin: 'janus.plugin.echotest',
            opaqueId: demoId,
            success: (pluginHandle) => {
                Log('Plugin attach success : pluginHandle = ', pluginHandle);

                that.echoHandle = pluginHandle;

                const joinRequest = {video: true, audio: false, videocode: 'vp8', audiocodec: 'opus'};
                pluginHandle.send({
                    message: joinRequest,
                    success: () => {
                        Log('Join success');
                        that.publish(joinRequest, video, bitrate, simulcast);
                    },
                    error: () => {
                        Log('Join failed');
                    }
                });
            },
            error: (error) => {
                Log('Plugin attach error : error = ', error);

            },
            consentDialog: (on) => {
                Log('ConsentDialog : on = ', on);
            },
            mediaState: (medium, on) => {
                Log('MediaState : medium = ', medium);
                Log('MediaState : on = ', on);
            },
            webrtcState: (on) => {
                Log('WebRTCState : on = ', on);
            },
            slowLink: (uplink, lose) => {
                Log('SlowLink : uplink = ', uplink);
                Log('SlowLink : lose = ', lose);
            },
            onmessage: (msg, jsep) => {
                Log('OnMessage : msg = ', msg);
                Log('OnMessage : jsep = ', jsep);

                if(jsep !== undefined && jsep !== null) {
                    Log('Handling remote jsep');
                    that.echoHandle.handleRemoteJsep({jsep: jsep});
                }
            },
            onlocalstream: (stream) => {
                Log('OnLocalStream : stream = ', stream);

                if(that.teacherVideoRef.current) {
                    Log('Publisher - Attach local media stream');
                    const children = that.teacherVideoRef.current.childNodes;
                    for(let i=0; i<children.length; i++) {
                        that.teacherVideoRef.current.removeChild(children[i]);
                    }

                    const videoEl = document.createElement('video');
                    videoEl.setAttribute('autoplay', 'true');
                    videoEl.setAttribute('playsinline', 'true');
                    videoEl.setAttribute('muted', 'true');
                    videoEl.setAttribute('width', '100%');
                    videoEl.setAttribute('height', '100%');

                    that.teacherVideoRef.current.appendChild(videoEl);

                    Janus.attachMediaStream(videoEl, stream);
                }
            },
            onremotestream: (stream) => {
                Log('OnRemoteStream : stream = ', stream);

                if(that.studentVideoRef.current) {
                    Log('Attach remote stream');

                    setTimeout(() => {
                        const children = that.studentVideoRef.current.childNodes;
                        for (let i = 0; i < children.length; i++) {
                            that.studentVideoRef.current.removeChild(children[i]);
                        }

                        const videoEl = document.createElement('video');
                        videoEl.setAttribute('autoplay', 'true');
                        videoEl.setAttribute('playsinline', 'true');
                        videoEl.setAttribute('muted', 'true');
                        videoEl.setAttribute('width', '100%');
                        videoEl.setAttribute('height', '100%');

                        that.studentVideoRef.current.appendChild(videoEl);

                        Janus.attachMediaStream(videoEl, stream);
                    }, 1000);
                }
            },
            oncleanup: function() {
                Log('OnCleanUp');
            },
        });
    };

    publish = (request, video, bitrate, simulcast) => {
        Log(`Publishing : simulcast=${simulcast}, bitrate=${bitrate}, video = `, video);

        const that = this;
        const publishRequest = {
            media: {video: video, audio: false, videocodec: 'vp8', audiocodec: 'opus'},
            simulcast: simulcast,
            simulcast2: false,
            success: (jsep) => {
                Log('Create offer success : jsep = ', jsep);

                Log('Sending publish command');
                that.echoHandle.send({message: request, jsep: jsep});
            },
            error: (error) => {
                Log('Create offer error : error = ', error);
            }
        };

        Log('Creating offer');
        this.echoHandle.createOffer(publishRequest);
    };
}