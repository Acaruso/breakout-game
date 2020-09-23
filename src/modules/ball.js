import { detectRectCollision, getSquareFromCircle } from "./util";

function getBall(canvas) {
  return {
    x: canvas.width / 2,
    y: canvas.height - 30,
    dx: 2,
    dy: -2,
    radius: 10,
  };
}

function drawBall(ball, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function updateBall(state) {
  let { ball, paddle, blocks, status, canvas } = state;
  let messages = [];

  if (status !== "in progress") { // if game over
    return { type: "update ball", data: { ball: ball } };
  }

  let newBall = getNextBall(ball);
  let futureBall = getNextBall(newBall);

  if (detectSideOfScreenCollision(futureBall, canvas.width)) {
    newBall.dx = -newBall.dx;
  }

  const blockToRemove = detectBlockCollision(futureBall, blocks);
  if (blockToRemove !== -1) {
    newBall.dy = -newBall.dy;
    messages.push({ type: "remove block", data: { blockToRemove } });
  } else if (detectTopOfScreenCollision(futureBall)) {
    newBall.dy = -newBall.dy;
  } else if (detectPaddleCollision(futureBall, paddle)) {
    newBall.dy = Math.abs(newBall.dy) * -1;
  }

  messages.push({ type: "update ball", data: { ball: newBall } });
  return messages;
}

function detectBlockCollision(ball, blocks) {
  const square = getSquareFromCircle(ball);

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.exists && detectRectCollision(square, block)) {
      return i;
    }
  }
  return -1;
}

function detectSideOfScreenCollision(ball, screenWidth) {
  return (
    ball.x + ball.radius > screenWidth ||
    ball.x - ball.radius < 0
  );
}

function detectTopOfScreenCollision(ball) {
  return ball.y - ball.radius < 0;
}

function detectPaddleCollision(ball, paddle) {
  let square = getSquareFromCircle(ball);
  return detectRectCollision(square, paddle);
}

function detectBottomOfScreenCollision(ball, paddle, screenHeight) {
  return (ball.y >= screenHeight && !detectPaddleCollision(ball, paddle));
}

function getNextBall(ball) {
  let nextBall = { ...ball };
  nextBall.x += nextBall.dx;
  nextBall.y += nextBall.dy;
  return nextBall;
}

export { getBall, drawBall, updateBall, detectBottomOfScreenCollision };
