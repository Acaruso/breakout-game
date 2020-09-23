import { getBall } from "./ball";
import { getBlocks } from "./blocks";
import { getPaddle } from "./paddle";

function getKeyboard() {
  return {
    right: false,
    left: false,
    enter: false,
  };
}

function addKeyboardHandlers(messages) {
  function keyHandler(e) {
    messages.push({ type: `${e.key}:${e.type}` });
  }

  document.addEventListener("keydown", keyHandler, false);
  document.addEventListener("keyup", keyHandler, false);
}

function handleKeyboardEvents(state) {
  let { paddle, keyboard, canvas } = state;
  let messages = [];

  let newPaddle = { ...paddle };

  if (keyboard.enter) {
    let newBall = getBall(canvas);
    let newBlocks = getBlocks(canvas);
    newPaddle = getPaddle(canvas);

    messages.push({ type: "update ball", data: { ball: newBall } });
    messages.push({ type: "update blocks", data: { blocks: newBlocks } });
    messages.push({ type: "update game status", data: { status: "in progress" } });

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
  messages.push({ type: "update paddle", data: { paddle: newPaddle } });
  return messages;
}

export { getKeyboard, addKeyboardHandlers, handleKeyboardEvents };
