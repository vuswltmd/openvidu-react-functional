// import { OpenVidu } from 'openvidu-browser';

// export const startScreenShare = async (session, OV) => {
//     const publisher = await OV.initPublisherAsync(undefined, {
//         videoSource: 'screen', // 'screen'으로 설정하여 화면 공유를 시작합니다.
//         publishAudio: true,
//         publishVideo: true,
//         mirror: false,
//     });

//     await session.publish(publisher);
//     return publisher;
// };

// export const stopScreenShare = async (session, screenSharePublisher, OV) => {
//     if (screenSharePublisher) {
//         screenSharePublisher.stream.getMediaStream().getTracks().forEach(track => track.stop());
//         session.unpublish(screenSharePublisher);
//     }
// };

// 아직 사용 X