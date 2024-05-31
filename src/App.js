import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import JoinPage from './pages/JoinPage';
import SessionPage from './pages/SessionPage';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
`;

function App() {
    return (
        <Router>
            <AppContainer>
                <Routes>
                    <Route path="/session/:roomNumber" element={<SessionPage />} />
                    <Route path="/" element={<JoinPage />} />
                </Routes>
            </AppContainer>
        </Router>
    );
}

export default App;
