import { getBall, updateBall } from "./ball";
import { getPaddle, updatePaddle } from "./paddle";
import { getKeyboard, addKeyboardHandlers } from "./keyboard";
import { getBlocks } from "./blocks";
import { MessageBus } from "./messageBus";

class Game {
  constructor(options = {}) {
    let { logging, replay, replayRecalc } = options;
    logging = logging && !replay && !replayRecalc; // don't log if replaying

    this.state = {};
    this.state.canvas = document.getElementById("myCanvas");
    this.state.ball = getBall(this.state.canvas);
    this.state.paddle = getPaddle(this.state.canvas);
    this.state.blocks = getBlocks(this.state.canvas);
    this.state.keyboard = getKeyboard();
    this.state.status = "in progress";
    this.state.debugText = "";

    this.messageBus = new MessageBus(this.state, { logging: logging  });

    addKeyboardHandlers(this.messageBus);

    // replay stuff /////////////////////////////////////////////////
    /*
    if replay, read each line from log file and perform state update
    if replayRecalc, only apply state updates from user input, recalculate
      calculated values (this way you can test if a bug is fixed or not)
    otherwise, just start draw loop (regular gameplay)
    */
    const file = "bug-log2Copy.txt";
    const speed = 1;
    const intervalTime = (1.0 / speed) * 10.0;
    const messageBus = this.messageBus;

    if (replay) {
      const LineByLineReader = require("line-by-line");
      const lr = new LineByLineReader(file);

      let count = 0;

      lr.on("line", (line) => {
        const message = JSON.parse(line);
        messageBus.push(message);
        if (message.type === "end of draw loop") {
          messageBus.push(updateDebugText(count));
          messageBus.push({ type: "draw debug dialog" });
          messageBus.handleMessages();
          lr.pause();
        }
        count++;
      });

      setInterval(() => lr.resume(), intervalTime);
    } else if (replayRecalc) {
      const LineByLineReader = require("line-by-line");
      const lr = new LineByLineReader(file);

      let count = 0;

      lr.on("line", (line) => {
        const message = JSON.parse(line);

        if (message.type === "update ball") {
          const ballMess = updateBall(
            game.ball,
            game.paddle,
            game.blocks,
            game.status,
            game.canvas
          );
          messageBus.push(ballMess);
        } else if (message.type === "update paddle") {
          const paddleMess = updatePaddle(
            game.paddle,
            game.keyboard,
            game.status,
            game.canvas
          );
          messageBus.push(paddleMess);
        } else {
          messageBus.push(message);
        }

        if (message.type === "end of draw loop") {
          messageBus.push(updateDebugText(count));
          messageBus.push({ type: "draw debug dialog" });
          messageBus.handleMessages();
          lr.pause();
        }
        count++;
      });

      setInterval(() => lr.resume(), intervalTime);
    } else {
      this.state.interval = setInterval(
        () => this.draw(this.state, this.messageBus), 
        10
      );
    }
  }

  ///////////////////////////////////////////////////////////////////

  draw(state, messageBus) {
    const messages = [
      { type: "clear screen" },
      { type: "update game status" },

      { type: "draw ball" },
      { type: "draw paddle" },
      { type: "draw blocks" },
      { type: "draw dialog" },
      updateBall(
        state.ball,
        state.paddle,
        state.blocks,
        state.status,
        state.canvas
      ),
      updatePaddle(
        state.paddle,
        state.keyboard,
        state.status,
        state.canvas
      ),
      { type: "end of draw loop" },
    ];

    messageBus.push(messages);
    messageBus.handleMessages();
  }
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

export { restartGame, logGame, Game };
