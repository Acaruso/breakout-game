let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// ball stuff //////////////////////////////////////////////////

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

let ballRadius = 10;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// paddle stuff ////////////////////////////////////////////////

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// main ////////////////////////////////////////////////////////

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();

  x += dx;
  y += dy;

  if (x + dx + ballRadius > canvas.width || x + dx - ballRadius < 0) {
    dx = -dx;
  }

  if (y + dy + ballRadius > canvas.height || y + dy - ballRadius < 0) {
    dy = -dy;
  }
}

setInterval(draw, 10);
