// 이 코드는 서비스 워커를 등록하기 위한 선택적인 코드입니다.
// 기본적으로 register()가 호출되지 않습니다.

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1]은 IPv6 localhost 주소입니다.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8은 IPv4의 localhost로 간주됩니다.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}$/
    )
);

export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // 서비스 워커 URL을 구성합니다.
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            // PUBLIC_URL이 origin과 동일하지 않은 경우, 서비스 워커가 작동하지 않습니다.
            return;
        }

        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            if (isLocalhost) {
                // 이 로컬 호스트에서 실행 중인 경우 추가 확인을 수행합니다.
                checkValidServiceWorker(swUrl, config);

                // 일부 로컬 호스트 환경에서는 서비스 워커를 찾고 있습니다.
                navigator.serviceWorker.ready.then(() => {
                    console.log(
                        '이 로컬 환경에서 서비스 워커가 로드되었습니다.'
                    );
                });
            } else {
                // 로컬 호스트가 아닌 경우, 서비스 워커를 등록합니다.
                registerValidSW(swUrl, config);
            }
        });
    }
}

function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker == null) {
                    return;
                }
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            // 이전 컨텐츠가 백그라운드에서 캐시된 새 컨텐츠로 업데이트되었습니다.
                            console.log(
                                '새 컨텐츠가 사용 가능합니다. 모든 탭을 닫고 다시 열어야 합니다.'
                            );

                            // 콜백을 실행합니다.
                            if (config && config.onUpdate) {
                                config.onUpdate(registration);
                            }
                        } else {
                            // 모든 것이 캐시되었으며 오프라인 모드에서 사용 준비가 되었습니다.
                            console.log('콘텐츠가 오프라인 모드에서 사용 가능합니다.');

                            // 콜백을 실행합니다.
                            if (config && config.onSuccess) {
                                config.onSuccess(registration);
                            }
                        }
                    }
                };
            };
        })
        .catch((error) => {
            console.error('서비스 워커 등록에 실패했습니다.', error);
        });
}

function checkValidServiceWorker(swUrl, config) {
    // 서비스 워커를 찾을 수 있는지 확인합니다. 그렇지 않은 경우 페이지를 다시 로드합니다.
    fetch(swUrl, {
        headers: { 'Service-Worker': 'script' },
    })
        .then((response) => {
            // 서비스 워커를 찾았습니다. 정상적인 상황에서 페이지를 다시 로드합니다.
            const contentType = response.headers.get('content-type');
            if (
                response.status === 404 ||
                (contentType != null && contentType.indexOf('javascript') === -1)
            ) {
                // 서비스 워커를 찾지 못한 경우
                navigator.serviceWorker.ready.then((registration) => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // 서비스 워커를 찾았습니다.
                registerValidSW(swUrl, config);
            }
        })
        .catch(() => {
            console.log('인터넷 연결이 없습니다. 앱이 오프라인 모드에서 실행됩니다.');
        });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister();
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
}
