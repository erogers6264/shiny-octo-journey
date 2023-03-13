// Grab a reference to the canvas to start.
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();

}

function checkEdges() {
	if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
		dy = -dy;
	}
	if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
		dx = -dx;
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	x += dx;
	y += dy;
	checkEdges();

	if (rightPressed) {
		paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
	} else if (leftPressed) {
		paddleX = Math.max(paddleX - 7, 0);
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.key === "Right" || e.key === "ArrowRight") {
		rightPressed = true;
	} else if (e.key === "Left" || e.key === "ArrowLeft") {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.key === "Right" || e.key === "ArrowRight") {
		rightPressed = false;
	} else if (e.key === "Left" || e.key === "ArrowLeft") {
		leftPressed = false;
	}
}

// Call the draw function every 10 milliseconds
setInterval(draw, 10);
