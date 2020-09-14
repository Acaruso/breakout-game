function getPaddle(canvas) {
  let paddle = {
    height: 10,
    width: 75,
    x: 0,
  };
  paddle.x = (canvas.width - paddle.width) / 2;
  return paddle;
}

function drawPaddle(paddle, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.rect(paddle.x, canvas.height - paddle.height, paddle.width, paddle.height);
  ctx.fillStyle = "#FF5733";
  ctx.fill();
  ctx.closePath();
}

function updatePaddle(paddle, keyboard, canvas) {
  let newPaddle = { ...paddle };

  if (keyboard.right) {
    newPaddle.x += 7;
    if (newPaddle.x + newPaddle.width > canvas.width) {
      newPaddle.x = canvas.width - newPaddle.width;
    }
  }
  else if (keyboard.left) {
    newPaddle.x -= 7;
    if (newPaddle.x < 0) {
      newPaddle.x = 0;
    }
  }

  return { type: "update paddle", data: { newPaddle } };
}

export { getPaddle, drawPaddle, updatePaddle };
