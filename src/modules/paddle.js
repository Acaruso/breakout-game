import { drawRect } from "./util";

function getPaddle(canvas) {
  let paddle = {
    height: 10,
    width: 75,
  };
  paddle.x = (canvas.width - paddle.width) / 2;
  paddle.y = canvas.height - paddle.height;
  return paddle;
}

function drawPaddle(paddle, canvas) {
  drawRect(paddle, canvas);
}

function updatePaddle(state) {
  let { paddle, keyboard, canvas } = state;

  let newPaddle = { ...paddle };

  if (keyboard.enter) {
    newPaddle = getPaddle(canvas);
    return { type: "update paddle", data: { paddle: newPaddle } };
  } else if (keyboard.right) {
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

  return { type: "update paddle", data: { paddle: newPaddle } };
}

export { getPaddle, drawPaddle, updatePaddle };
