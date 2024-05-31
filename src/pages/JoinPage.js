import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createRoom, login, signup } from '../service/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 200px;
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
`;

function JoinPage() {
    const [roomNumber, setRoomNumber] = useState('');
    const [isJoining, setIsJoining] = useState(false);
    const navigate = useNavigate();

    const handleChangeRoomNumber = useCallback((e) => {
        setRoomNumber(e.target.value);
    }, []);

    const handleCreateRoom = useCallback(async () => {
        try {
            const newRoomNumber = await createRoom();
            setRoomNumber(newRoomNumber);
        } catch (error) {
            console.error('Error creating room:', error);
        }
    }, []);

    const handleJoinSession = useCallback((e) => {
        e.preventDefault();
        if (roomNumber) {
            setIsJoining(true);
            navigate(`/session/${roomNumber}`);
        } else {
            console.error('Room number is null or undefined');
        }
    }, [roomNumber, navigate]);

    return (
        <Container>
            <h1>Join a video session</h1>
            <Form onSubmit={handleJoinSession}>
                <label>Room Number:</label>
                <Input type="text" value={roomNumber} onChange={handleChangeRoomNumber} />
                <Button type="button" onClick={handleCreateRoom}>Create Room</Button>
                <Button type="submit" disabled={isJoining}>JOIN</Button>
                <Button type="button" onClick={login}>Login</Button>
                {/* <Button type="button" onClick={signup}>Sign Up</Button> */}
            </Form>
        </Container>
    );
}

export default JoinPage;
