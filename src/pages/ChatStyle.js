import styled, { keyframes } from 'styled-components';

export const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

export const ChatContainer = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  height: 95%;
  background-color: #2c2c2c;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 28%;
  z-index: 1000;
  animation: ${({ isOpen }) => (isOpen ? slideIn : slideOut)} 0.3s ease;
`;

export const UserList = styled.div`
  background-color: #3a3a3a;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #454545;
  border-radius: 10px;
  justify-content: space-between;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const UserName = styled.span`
  color: #fff;
  font-size: 16px;
`;

export const UserResumeButton = styled.button`
  background-color: rgba(255, 255, 255, 0.13);
  border: none;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
  }

  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

export const ChatBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #2c2c2c;
  border-radius: 10px;
  margin-top: 20px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ChatCloseButton = styled.button`
  align-self: flex-start;
  height: 40px;
  width: 40px;
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: white;

  img {
    height: 30px;
    width: 30px;
  }
`;

export const MessageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: #444;
  border-radius: 20px;
`;

export const MessageList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: #444;
  border-radius: 20px;
  overflow: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Message = styled.div`
  max-width: 60%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 10px;
  background-color: ${({ isUser }) => (isUser ? '#DCF8C6' : '#FFF')};
  align-self: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
  color: #000;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background: #333;
  border-radius: 20px;
`;

export const Input = styled.textarea`
  background: #333;
  font-size: 20px;
  line-height: 20px;
  border: none;
  outline: none;
  color: #fff;
  padding: 10px;
  width: 100%;
  height: 30px;
  resize: none;
  overflow: auto;
  min-height: 30px;
  max-height: 150px;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SendButton = styled.button`
  background-color: rgba(98, 174, 213, 0.47);
  border: none;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  margin-right: 5px;
  margin-bottom: 5px;
  justify-content: center;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
  }

  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(98, 174, 213, 0.6);
  }
`;