const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// 초기 패들 및 공 설정
let paddleWidth = 20;
let paddleHeight = 100;
let ballRadius = 10;

let playerPaddleY = canvas.height / 2 - paddleHeight / 2;
let aiPaddleY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;

let gameOver = false;
let animationFrameId; // 현재 게임 루프를 추적하는 ID

// 반응형 처리: 모바일에서 세로 모드로 전환 및 PC 화면에서 비율 유지
function adjustForMobile() {
    const aspectRatio = window.innerHeight / window.innerWidth;

    if (aspectRatio > 1) { // 세로 모드 (모바일)
        canvas.width = window.innerHeight; // 세로를 기준으로 맞춤
        canvas.height = window.innerWidth;
    } else { // 가로 모드 (PC)
        canvas.width = 1280;
        canvas.height = 720;
        // PC에서 화면 비율에 맞춰 조정 (일반 16:9 비율)
        const scale = Math.min(window.innerWidth / canvas.width, window.innerHeight / canvas.height);
        canvas.style.width = canvas.width * scale + 'px';
        canvas.style.height = canvas.height * scale + 'px';
    }

    // 패들 높이를 화면 높이에 비례하여 조정
    paddleHeight = canvas.height * 0.15;
    ballRadius = canvas.width * 0.02;
    playerPaddleY = canvas.height / 2 - paddleHeight / 2;
    aiPaddleY = canvas.height / 2 - paddleHeight / 2;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

// PC 마우스 이벤트
canvas.addEventListener('mousemove', function(event) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    let mouseY = event.clientY - rect.top - root.scrollTop;
    playerPaddleY = mouseY - paddleHeight / 2;
});

// 모바일 터치 이벤트
canvas.addEventListener('touchmove', function(event) {
    const rect = canvas.getBoundingClientRect();
    let touchY = event.touches[0].clientY - rect.top;
    playerPaddleY = touchY - paddleHeight / 2;
}, { passive: false });

// 게임 재시작 함수
function restartGame() {
    cancelAnimationFrame(animationFrameId); // 기존 게임 루프를 중지
    playerPaddleY = canvas.height / 2 - paddleHeight / 2;
    aiPaddleY = canvas.height / 2 - paddleHeight / 2;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 5; // 공의 속도를 초기화
    ballSpeedY = 3;
    gameOver = false;
    gameLoop(); // 새로운 게임 루프 시작
}

// 게임 루프
function gameLoop() {
    if (!gameOver) {
        moveBall();
        drawEverything();
        animationFrameId = requestAnimationFrame(gameLoop); // ID 저장
    }
}

// 공의 이동
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // 플레이어 패들 충돌 체크
    if (ballX - ballRadius < paddleWidth) {
        if (ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            endGame();
        }
    }

    // AI 패들 충돌 체크
    if (ballX + ballRadius > canvas.width - paddleWidth) {
        if (ballY > aiPaddleY && ballY < aiPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            endGame();
        }
    }

    // AI 패들 간단한 이동
    aiPaddleY += (ballY - (aiPaddleY + paddleHeight / 2)) * 0.1;
}

// 게임 종료 함수
function endGame() {
    gameOver = true;
    cancelAnimationFrame(animationFrameId); // 게임 루프 중지
    const restart = confirm("Game Over! 게임을 재시작하시겠습니까?");
    if (restart) {
        restartGame();
    }
}

// 그리기 함수
function drawEverything() {
    // 캔버스 지우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 공 그리기
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();

    // 플레이어 패들 그리기
    ctx.fillRect(0, playerPaddleY, paddleWidth, paddleHeight);

    // AI 패들 그리기
    ctx.fillRect(canvas.width - paddleWidth, aiPaddleY, paddleWidth, paddleHeight);
}

// 창 크기 변경 시 반응형 처리
window.addEventListener('resize', adjustForMobile);

// 게임 시작
adjustForMobile();
gameLoop();
