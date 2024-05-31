import React from 'react';
import ReactDOM from 'react-dom/client'; // 올바른 import 경로
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // 최신 방식의 서비스 워커 등록 파일

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <App />
);

serviceWorkerRegistration.register(); // 최신 방식으로 서비스 워커 등록