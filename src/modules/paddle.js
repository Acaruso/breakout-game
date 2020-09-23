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

export { getPaddle, drawPaddle };
