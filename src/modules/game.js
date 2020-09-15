import { getBall } from "./ball";
import { getPaddle } from "./paddle";
import { getKeyboard } from "./keyboard";
import { getBlocks } from "./blocks";

function getGame(draw) {
  let game = {};
  game.canvas = document.getElementById("myCanvas");
  game.ball = getBall(game.canvas);
  game.paddle = getPaddle(game.canvas);
  game.blocks = getBlocks(game.canvas);
  game.keyboard = getKeyboard();
  game.interval = setInterval(draw, 10);
  game.status = "in progress";
  return game;
}

export { getGame };
