// Grab a reference to the canvas to start.
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 110;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const brickRows = 3;
const brickColumns = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let c = 0; c < brickColumns; c++) {
	bricks[c] = [];
	for (let r = 0; r < brickRows; r++) {
		bricks[c][r] = { x:0, y:0, status: 1 };
	}
}

let score = 0;

function drawBricks() {
	for (let c = 0; c < brickColumns; c++) {
		for(let r = 0; r < brickRows; r++) {
			if (bricks[c][r].status === 1) {
				const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
				const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "black";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.closePath();
}

function checkEdges() {
	if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
		dx = -dx;
	}
	if (y + dy < ballRadius) {
		dy = -dy;
	} else if (y + dy > canvas.height - ballRadius) {
		if (x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
			// Make the ball go faster each time
			dy -= 0.2;
			if (dx < 0) {
				dx -= 0.15;
			} else {
				dx += 0.15;
			}
		} else {
			alert("GAME OVER");
			document.location.reload();
			clearInterval(interval); // Needed for Chrome to end game.
		}
	}
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	x += dx;
	y += dy;
	checkEdges();
	collisionDetection();

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

function collisionDetection() {
	for (let c = 0; c < brickColumns; c++) {
		for(let r = 0; r < brickRows; r++) {
			const b = bricks[c][r];
			if (b.status === 1) {
				if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;
					if (score === brickRows * brickColumns) {
						alert("YOU WIN BITCH");
						document.location.reload();
						clearInterval(interval);
					}
				}
			}
		}
	}
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "black";
	ctx.fillText(`Score: ${score}`, 8, 20);
}

// Call the draw function every 10 milliseconds
const interval = setInterval(draw, 10);
