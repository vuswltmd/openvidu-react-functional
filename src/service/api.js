import axios from 'axios';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080/api/v1/';

//토큰 생성하여 반환
export const getToken = async (roomNumber) => {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken.startsWith('Bearer ')) {
        accessToken = accessToken.substring(7);
    }

    const result = await createToken(roomNumber, accessToken);
    return result.token;
};

//방 입장 토큰
const createToken = async (roomNumber, accessToken) => {
    const response = await axios.post(`${APPLICATION_SERVER_URL}rooms/${roomNumber}/connections`, {
        resumeId: 8 // 실제 resumeId 값을 여기에 입력해야 합니다.
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return response.data.data; // The token
};

//방 만들기
export const createRoom = async () => {
    let accessToken = localStorage.getItem('accessToken');
    if (accessToken && accessToken.startsWith('Bearer ')) {
        accessToken = accessToken.substring(7);
    }

    const roomData = {
        title: 'Sample Room Title',
        details: 'Sample Room Details',
        maxParticipants: 4,
        tagIds: [1, 2],
    };
    try {
        const response = await axios.post(APPLICATION_SERVER_URL + 'rooms', roomData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });
        return response.data.data.roomId;
    } catch (error) {
        console.error('Error creating room:', error);
    }
};

//로그인
export const login = async () => {
    const loginData = {
        email: 'test1@naver.com',
        password: 'asdasdasd'
    };

    try {
        const response = await axios.post(APPLICATION_SERVER_URL + 'auth/login', loginData, {
            headers: { 'Content-Type': 'application/json' }
        });

        const accessToken = response.headers['authorization'];
        localStorage.setItem('accessToken', accessToken);
    } catch (error) {
        console.error('Error logging in:', error);
    }
};

export const signup = async () => {
    const signupData = {
        email: 'test1@naver.com',
        password: 'asdasdasd',
        nickname: '처아미나'
    };

    try {
        const response = await axios.post(APPLICATION_SERVER_URL + 'members', signupData, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('Signup successful:', response.data);
    } catch (error) {
        console.error('Error signing up:', error);
    }
};
