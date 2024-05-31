import React from 'react';
import styled from 'styled-components';

const Video = styled.video`
  width: 100%;
  height: 100%;
  background-color: #333;
  border-radius: 20px;
`;

const UserVideoComponent = ({ streamManager }) => {
    const videoRef = React.useRef();

    React.useEffect(() => {
        if (streamManager && !!videoRef) {
            streamManager.addVideoElement(videoRef.current);
        }
    }, [streamManager]);

    return <Video autoPlay={true} ref={videoRef} />;
}

export default UserVideoComponent;
