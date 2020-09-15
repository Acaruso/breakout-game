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

  // top of screen
  if (newBall.y + newBall.dy - newBall.radius < 0) {
    newBall.dy = -newBall.dy;
  // bottom of screen
  } else if (newBall.y + newBall.dy + newBall.radius > canvas.height) {
    if (newBall.x > paddle.x && newBall.x < paddle.x + paddle.width) {
      newBall.dy = -newBall.dy;
    } else {
      return { type: "game over" };
    }
  }

  // if (detectTopOfScreenCollision(newBall)) {
  //   newBall.dy = -newBall.dy;
  // } else if (detectPaddleCollision(newBall, paddle)) {
  //   newBall.dy = -newBall.dy;
  // } else if (detectBottomOfScreenCollision(newBall, paddle)) {
  //   return { type: "game over" };
  // }

  return { type: "update ball", data: { newBall } }
}

function detectTopOfScreenCollision(ball) {
  return (ball.y + ball.dy - ball.radius < 0)
}

function detectPaddleCollision(ball, paddle) {
  return (ball.y === 0 && ball.x >= paddle.x && ball.x <= paddle.x + paddle.width)
}

function detectBottomOfScreenCollision(ball, paddle) {
  return (ball.y === 0 && ball.x < paddle.x || ball.x > paddle.x + paddle.width)
}

export { getBall, drawBall, updateBall };
