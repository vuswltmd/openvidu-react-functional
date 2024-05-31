import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserVideoComponent from '../component/UserVideoComponent';
import { initializeSession } from '../service/openviduService';
import { getToken } from '../service/api';
import voiceIcon from '../assets/icons/voice_Icon.png';
import headphoneIcon from '../assets/icons/headphone_Icon.png';
import callEndIcon from '../assets/icons/call_end_Icon.png';
import Chat from './chat';
import { Container, Button, VideoContainer, ButtonContainer, IconButton, IconImage, ChatIcon } from './SessionPageStyle';

const MAX_PARTICIPANTS = 4;

function SessionPage() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleChat = () => setIsOpen(!isOpen);
    const handleCloseChat = () => setIsOpen(false);

    const { roomNumber } = useParams();
    const navigate = useNavigate();
    const [session, setSession] = useState(undefined);
    const [mainStreamManager, setMainStreamManager] = useState(undefined);
    const [publisher, setPublisher] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);
    const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
    const [messages, setMessages] = useState([]);  // 추가된 부분
    const [users, setUsers] = useState([]);        // 추가된 부분
    const OV = useRef(null);
    const hasJoined = useRef(false);

    const handleMainVideoStream = useCallback((stream) => {
        if (mainStreamManager !== stream) {
            setMainStreamManager(stream);
        }
    }, [mainStreamManager]);

    const updateUsers = useCallback(() => {
        if (session) {
            console.log('Session connection data:', session.connection.data);
            const userList = [
                { id: session.connection.connectionId, nickname: session.connection.data },
                ...session.remoteConnections.map((conn) => ({
                    id: conn.connectionId,
                    nickname: conn.data,
                })),
            ];
            setUsers(userList);
            console.log('Updated users:', userList);
        }
    }, [session]);

    const joinSession = useCallback(async () => {
        if (hasJoined.current) {
            console.log('Already joined the session.');
            return;
        }

        if (!roomNumber) {
            console.error('Room number is null or undefined');
            return;
        }

        const { OV: newOV, mySession } = initializeSession({
            addSubscriber: (subscriber) => setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]),
            deleteSubscriber: (streamManager) => setSubscribers((prevSubscribers) => {
                const index = prevSubscribers.indexOf(streamManager);
                if (index > -1) {
                    const newSubscribers = [...prevSubscribers];
                    newSubscribers.splice(index, 1);
                    return newSubscribers;
                } else {
                    return prevSubscribers;
                }
            }),
            addMessage: (message) => setMessages((prevMessages) => [...prevMessages, message]),
        });

        OV.current = newOV;

        const token = await getToken(roomNumber);

        try {
            await mySession.connect(token, { clientData: 'MyNickname' });
            const currentParticipants = mySession.remoteConnections.length + 1;

            if (currentParticipants > MAX_PARTICIPANTS) {
                alert('The room is full. Please try again later.');
                navigate('/');
                return;
            }

            let publisher = await OV.current.initPublisherAsync(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: true,
                publishVideo: true,
                resolution: '640x480',
                frameRate: 30,
                insertMode: 'APPEND',
                mirror: false,
            });

            mySession.publish(publisher);
            setPublisher(publisher);

            const devices = await OV.current.getDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
            const currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

            setMainStreamManager(publisher);
            setCurrentVideoDevice(currentVideoDevice);

            setSession(mySession);
            hasJoined.current = true;

            updateUsers();
            mySession.on('connectionCreated', updateUsers);
            mySession.on('connectionDestroyed', updateUsers);

        } catch (error) {
            console.log('There was an error connecting to the session:', error.code, error.message);
            if (error.code === 401) {
                alert('Authentication error. Please log in again.');
                navigate('/');
            }
        }
    }, [roomNumber, navigate, updateUsers]);

    const leaveSession = useCallback(() => {
        if (session) {
            if (publisher) {
                publisher.stream.getMediaStream().getTracks().forEach(track => track.stop());
                session.unpublish(publisher);
            }
            session.disconnect();
        }

        OV.current = null;
        setSession(undefined);
        setSubscribers([]);
        setMainStreamManager(undefined);
        setPublisher(undefined);
        setCurrentVideoDevice(null);

        hasJoined.current = false;
    }, [session, publisher]);

    const switchCamera = useCallback(async () => {
        try {
            const devices = await OV.current.getDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');

            if (videoDevices && videoDevices.length > 1) {
                const newVideoDevice = videoDevices.filter(device => device.deviceId !== currentVideoDevice.deviceId);

                if (newVideoDevice.length > 0) {
                    const newPublisher = OV.current.initPublisher(undefined, {
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: true,
                        publishVideo: true,
                        mirror: true,
                    });

                    await session.unpublish(mainStreamManager);
                    await session.publish(newPublisher);
                    setCurrentVideoDevice(newVideoDevice[0]);
                    setMainStreamManager(newPublisher);
                    setPublisher(newPublisher);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }, [currentVideoDevice, session, mainStreamManager]);

    useEffect(() => {
        joinSession();
        return () => {
            if (session) {
                session.disconnect();
            }
            OV.current = null;
            setSession(undefined);
            hasJoined.current = false;
        };
    }, [roomNumber]);

    return (
        <Container isOpen={isOpen}>
            <h1 style={{ color: 'red' }}>Room: {roomNumber}</h1>
            <Button onClick={switchCamera}>Switch Camera</Button>
            <VideoContainer isOpen={isOpen}>
                {mainStreamManager && (
                    <div onClick={() => handleMainVideoStream(mainStreamManager)}>
                        <UserVideoComponent streamManager={mainStreamManager} />
                    </div>
                )}
                {subscribers.map((sub, i) => (
                    <div key={i} onClick={() => handleMainVideoStream(sub)}>
                        <UserVideoComponent streamManager={sub} />
                    </div>
                ))}
            </VideoContainer>
            <ButtonContainer>
                <IconButton>
                    <IconImage src={voiceIcon} alt="Voice Icon" />
                </IconButton>
                <IconButton>
                    <IconImage src={headphoneIcon} alt="Headphone Icon" />
                </IconButton>
                <IconButton onClick={() => { leaveSession(); navigate('/'); }}>
                    <IconImage src={callEndIcon} alt="Call End Icon" />
                </IconButton>
            </ButtonContainer>
            {!isOpen && <ChatIcon onClick={toggleChat} />}
            <Chat
                isOpen={isOpen}
                handleClose={handleCloseChat}
                session={session}
                users={users}
            />
        </Container>
    );
}

export default SessionPage;
