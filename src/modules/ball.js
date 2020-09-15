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

function updateBall(ball, paddle, canvas) {
  let newBall = { ...ball };

  newBall.x += newBall.dx;
  newBall.y += newBall.dy;

  if (
    newBall.x + newBall.dx + newBall.radius > canvas.width ||
    newBall.x + newBall.dx - newBall.radius < 0
  ) {
    newBall.dx = -newBall.dx;
  }

  if (detectTopOfScreenCollision(newBall)) {
    newBall.dy = -newBall.dy;
  } else if (detectPaddleCollision(newBall, paddle)) {
    newBall.dy = -newBall.dy;
  } else if (detectBottomOfScreenCollision(newBall, paddle, canvas.height)) {
    return { type: "game over" };
  }

  return { type: "update ball", data: { newBall } }
}

function detectTopOfScreenCollision(ball) {
  const nextY = ball.y + ball.dy;
  return (nextY - ball.radius < 0)
}

function detectPaddleCollision(ball, paddle) {
  const nextY = ball.y + ball.dy;
  return (nextY + ball.radius >= paddle.y && 
    (ball.x >= paddle.x && ball.x <= paddle.x + paddle.width)
  )
}

function detectBottomOfScreenCollision(ball, paddle, screenHeight) {
  const nextY = ball.y + ball.dy;
  return (nextY >= screenHeight && 
    (ball.x < paddle.x || ball.x > paddle.x + paddle.width)
  )
}

export { getBall, drawBall, updateBall };
