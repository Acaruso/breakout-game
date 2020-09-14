import { getBall, drawBall, updateBall } from "./modules/ball";
import { drawPaddle, updatePaddle, getPaddle } from "./modules/paddle";
import { getKeyboard, addKeyboardHandlers } from "./modules/keyboard";
import { MessageBus } from "./modules/messageBus";

let game = {};
game.canvas = document.getElementById("myCanvas");
game.ball = getBall(game.canvas);
game.paddle = getPaddle(game.canvas);
game.keyboard = getKeyboard();
game.interval = setInterval(draw, 10);

let messages = new MessageBus(game);

// keyboard stuff //////////////////////////////////////////////

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    messages.push({ type: "right down" });
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    messages.push({ type: "left down" });
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    messages.push({ type: "right up" });
  }
  else if (e.key == "Left" || e.key == "ArrowLeft") {
    messages.push({ type: "left up" });
  }
}

// main ////////////////////////////////////////////////////////

function draw() {
  messages.concat([
    { type: "clear screen" },
    { type: "draw ball" },
    { type: "draw paddle" },
    updateBall(game.ball, game.paddle, game.canvas),
    updatePaddle(game.paddle, game.keyboard, game.canvas),
  ]);

  messages.handleMessages();
}

/*
all state updates go thru messaging system
have queue of messages
functions that want to perform state update push message to queue
  message describes what state update the function wants
on every iteration of game loop:
  pop each message from queue, get message handler from messageTable,
  message handler performs state update
message handler functions are inherently stateful,
thus they are allowed to not be pure functions
everything else should be a pure function
also notice that message queue and game state (ball + paddle) are global
  is this bad?
*/
