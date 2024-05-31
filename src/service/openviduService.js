import { OpenVidu } from 'openvidu-browser';

export const initializeSession = (session) => {
    const OV = new OpenVidu();
    const mySession = OV.initSession();
    mySession.on('streamCreated', (event) => {
        const subscriber = mySession.subscribe(event.stream, undefined);
        session.addSubscriber(subscriber);
    });

    mySession.on('streamDestroyed', (event) => {
        session.deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
        console.warn(exception);
    });

    mySession.on('signal:chat', (event) => {
        const messageData = JSON.parse(event.data);
        session.addMessage({ user: messageData.user, text: messageData.text });
    });

    return { OV, mySession };
};
