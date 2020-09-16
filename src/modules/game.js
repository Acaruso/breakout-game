import { getBall } from "./ball";
import { getPaddle } from "./paddle";
import { getKeyboard } from "./keyboard";
import { getBlocks } from "./blocks";

function getGame(draw, options = {}) {
  const { replay, file } = options;
  let game = {};
  game.canvas = document.getElementById("myCanvas");
  game.ball = getBall(game.canvas);
  game.paddle = getPaddle(game.canvas);
  game.blocks = getBlocks(game.canvas);
  game.keyboard = getKeyboard();
  game.status = "in progress";
  game.debugText = "";
  return game;
}

function restartGame(game) {
  game.ball = getBall(game.canvas);
  game.paddle = getPaddle(game.canvas);
  game.blocks = getBlocks(game.canvas);
  game.status = "in progress";
}

function logGame(game) {
  console.log("ball");
  console.log(game.ball);
  console.log("paddle");
  console.log(game.paddle);
  console.log("blocks");
  console.log(game.blocks);
  console.log("status");
  console.log(game.status);
}

export { getGame, restartGame, logGame };
