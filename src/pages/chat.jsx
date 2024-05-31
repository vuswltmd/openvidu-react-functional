import React, { useRef, useEffect } from 'react';
import send_Icon from '../assets/icons/send_Icon.png';
import article_Icon from '../assets/icons/article_Icon.png';
import keyboard_arrow_down_Icon from '../assets/icons/keyboard_arrow_down_Icon.png';
import { ChatContainer, ChatCloseButton, Input, SendButton, UserList, User, Avatar, UserName, UserResumeButton, ChatBox, MessageContainer, InputContainer, MessageList, Message } from './ChatStyle';

const Chat = ({ isOpen, messages, inputValue, setInputValue, handleSendMessage, handleClose, message, setMessage, sendMessage, users }) => {
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatContainer isOpen={isOpen}>
      <ChatCloseButton onClick={handleClose}>
        <img src={keyboard_arrow_down_Icon} alt="Close Chat" />
      </ChatCloseButton>
      <UserList>
        {users.map(user => (
          <User key={user.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Avatar src={article_Icon} alt="User Avatar" />
              <UserName>{user.nickname}</UserName>
            </div>
            <UserResumeButton>
              <img src={article_Icon} alt="User Resume" />
            </UserResumeButton>
          </User>
        ))}
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
      <div>
        {messages.map((msg, i) => (
          <div key={i}><strong>{msg.user}: </strong>{msg.text}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </ChatContainer>
  );
};

export default Chat;
