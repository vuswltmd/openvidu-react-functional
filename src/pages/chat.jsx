import React, { useRef, useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid'; // 고유 ID 생성을 위한 라이브러리
import send_Icon from '../assets/icons/send_Icon.png';
import article_Icon from '../assets/icons/article_Icon.png';
import userImageTest1 from '../assets/images/userImage/userImage1.png';
import keyboard_arrow_down_Icon from '../assets/icons/keyboard_arrow_down_Icon.png';
import { ChatContainer, ChatCloseButton, Input, SendButton, UserList, User, Avatar, UserName, UserResumeButton, ChatBox, MessageContainer, InputContainer, MessageList, Message } from './ChatStyle';

const Chat = ({ isOpen, handleClose, session, users }) => {

  console.log("user가 어떻게 넘어오지?: ", users);

  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);
  const messageIds = useRef(new Set()); // 이미 처리된 메시지 ID를 저장하는 Set

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = useCallback(() => {
    if (inputValue.trim() !== '') {
      const myUserName = "MyNickname"; // 닉네임 설정
      const messageId = uuidv4(); // 고유 ID 생성
      const messageData = {
        user: myUserName,
        text: inputValue,
        id: messageId, // 메시지에 ID 추가
      };

      // 세션을 통해 메시지 전송
      session.signal({
        data: JSON.stringify(messageData),
        to: [],
        type: 'chat',
      });

      // 로컬 상태 업데이트
      setMessages([...messages, { text: inputValue, isUser: true, user: myUserName, id: messageId }]);
      messageIds.current.add(messageId); // 전송된 메시지 ID 저장
      setInputValue('');
    }
  }, [inputValue, messages, session]);

  useEffect(() => {
    if (session) {
      session.on('signal:chat', (event) => {
        const messageData = JSON.parse(event.data);
        if (!messageIds.current.has(messageData.id)) {
          setMessages((prevMessages) => [...prevMessages, { text: messageData.text, isUser: false, user: messageData.user, id: messageData.id }]);
          messageIds.current.add(messageData.id); // 수신된 메시지 ID 저장
        }
      });
    }
  }, [session]);

  return (
    <ChatContainer isOpen={isOpen}>
      <ChatCloseButton onClick={handleClose}>
        <img src={keyboard_arrow_down_Icon} alt="Close Chat" />
      </ChatCloseButton>
      <UserList>
        {users.map(user => {
          let parsedData;
          try {
            const parts = user.data.split('%/%');
            parsedData = parts.map(part => JSON.parse(part));
          } catch (error) {
            console.error("JSON parsing error for user.data:", user.data, error);
            parsedData = [{ nickname: "Unknown User" }];
          }

          return (
            <User key={user.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Avatar src={userImageTest1} alt="User Avatar" />
                <UserName>{parsedData[1]?.nickname || "Unknown User"}</UserName>
              </div>
              <UserResumeButton>
                <img src={article_Icon} alt="User Resume" />
              </UserResumeButton>
            </User>
          );
        })}
      </UserList>
      <ChatBox>
        <MessageContainer>
          <MessageList ref={messageListRef}>
            {messages.map((message, index) => (
              <Message key={index} isUser={message.isUser}>
                {message.text}
              </Message>
            ))}
          </MessageList>
          <InputContainer>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <SendButton onClick={handleSendMessage}>
              <img src={send_Icon} alt="Send" />
            </SendButton>
          </InputContainer>
        </MessageContainer>
      </ChatBox>
    </ChatContainer>
  );
};

export default Chat;
