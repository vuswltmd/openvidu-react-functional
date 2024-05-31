import styled from 'styled-components';
import { COLORS } from '../styles/colors';
import chatIcon from '../assets/icons/chat_Icon.png';

export const Container = styled.div`
  position: absolute;   /* 화면 전체를 덮도록 설정 */
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  height: 100%;  /* height와 width를 100%로 설정하여 전체 영역을 덮음 */
  width: 100%;
  background-color: #121212;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;


export const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 35%);
  grid-template-rows: repeat(2, auto);
  gap: 10px;
  transition: all 0.3s ease;
  width: ${({ isOpen }) => (isOpen ? '65%' : '75%')}; /* 너비를 isOpen에 따라 변경 */
  justify-content: center;
  align-content: center;
  transition: transform 0.3s ease; /* 위치 변경에 대한 애니메이션 추가 */
  transform: ${({ isOpen }) => (isOpen ? 'translateX(-15%)' : 'translateX(0)')}; /* isOpen 상태에 따라 위치 변경 */
`;


export const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
`;

// const VideoBox = styled.div`
//   width: 100%;
//   background-color: #333;
//   position: relative;
//   padding-top: 56.25%;
//   height: 0;
//   border-radius: 20px;
// `;

export const VideoContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const ChatIcon = styled.div`
  position: fixed;
  bottom: 20px;
  right: 40px;
  width: 55px;
  height: 55px;
  background-color: black;
  background-image: url(${chatIcon});
  background-size: 55%;
  background-repeat: no-repeat;
  background-position: center;
  color: #fff;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 24px;
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

export const RoundButton = styled.button`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: ${COLORS.sky_blue};
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  border: none;
  outline: none;

  &:hover {
    background-color: rgba(118, 194, 233, 1);
  }
`;

export const ButtonContainer = styled.div`
  position: fixed;
  width: 300px;
  display: flex;
  justify-content: space-between;
  bottom: 20px;
`;

export const IconButton = styled(RoundButton)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconImage = styled.img`
  width: 60%;
`;