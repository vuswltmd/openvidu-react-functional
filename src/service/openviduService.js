import { OpenVidu } from 'openvidu-browser';

export const initializeSession = (config) => {
    const OV = new OpenVidu(); //오픈비두 객체를 생성
    const mySession = OV.initSession(); // 세션을 초기화

    mySession.on('streamCreated', (event) => {
        const subscriber = mySession.subscribe(event.stream, undefined);
        config.addSubscriber(subscriber);
    });
    // streamCreated 이벤트 핸들러: 다른 참가자가 스트림을 생성할 때 발생하는 이벤트입니다.
    // 이벤트가 발생하면 mySession.subscribe 메서드를 호출하여 해당 스트림을 구독(subscribe)합니다.
    // 구독한 스트림을 session.addSubscriber 메서드를 통해 세션에 추가합니다.

    mySession.on('streamDestroyed', (event) => {
        config.deleteSubscriber(event.stream.streamManager);
    });
    // streamDestroyed 이벤트 핸들러: 스트림이 종료될 때 발생하는 이벤트입니다.
    // 이벤트가 발생하면 session.deleteSubscriber 메서드를 호출하여 해당 스트림을 세션에서 제거합니다.
    // javascript

    mySession.on('exception', (exception) => {
        console.warn(exception);
    });
    // exception 이벤트 핸들러: 세션에서 예외가 발생할 때 발생하는 이벤트입니다.
    // 예외가 발생하면 콘솔에 경고 메시지를 출력합니다.

    mySession.on('signal:chat', (event) => {
        const messageData = JSON.parse(event.data);
        config.addMessage({ user: messageData.user, text: messageData.text });
    });
    // signal:chat 이벤트 핸들러: 채팅 신호가 도착했을 때 발생하는 이벤트입니다.
    // 이벤트 데이터(event.data)를 파싱하여 메시지 데이터를 추출하고 이를 session.addMessage 메서드를 통해 세션에 추가합니다.

    return { OV, mySession };
};
