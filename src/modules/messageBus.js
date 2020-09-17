import { drawBall, detectBottomOfScreenCollision } from "./ball";
import { drawPaddle } from "./paddle";
import { drawBlocks } from "./blocks";
import { drawWinDialog, drawLostDialog, drawDebugDialog } from "./dialog";
import { restartGame, logGame } from "./game";
import { Logger } from "./logger";

class MessageBus {
  constructor(game, options = {}) {
    this.game = game;
    this.options = options;
    this.messages = [];
    this.logger = this.options.logging ? new Logger("log.txt") : {};

    this.messageTable = {
      "clear screen": (message) => {
        let ctx = this.game.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
      },
      "update game status": (message) => {
        if (this.game.status === "restart") {
          restartGame(this.game);
          return;
        }
        const won = (!this.game.blocks.find(x => x.exists));
        const lost = detectBottomOfScreenCollision(
          this.game.ball, 
          this.game.paddle,
          this.game.canvas.height
        );
        
        if (won) {
          this.game.status = "win";
        } else if (lost) {
          this.game.status = "lost";
        }
      },
      "update ball": (message) => {
        this.game.ball = message.data.ball;
      },
      "update paddle": (message) => {
        this.game.paddle = message.data.paddle;
      },
      "update debug text": (message) => {
        this.game.debugText = message.data.newDebugText;
      },
      "remove block": (message) => {
        const i = message.data.blockToRemove;
        this.game.blocks[i].exists = false;
      },
      "draw ball": (message) => {
        drawBall(this.game.ball, this.game.canvas);
      },
      "draw paddle": (message) => {
        drawPaddle(this.game.paddle, this.game.canvas);
      },
      "draw blocks": (message) => {
        drawBlocks(this.game.blocks, this.game.canvas);
      },
      "draw dialog": (message) => {
        drawWinDialog(this.game.status, this.game.canvas);
        drawLostDialog(this.game.status, this.game.canvas);
      },
      "draw debug dialog" : (message) => {
        drawDebugDialog(this.game.debugText, this.game.canvas);
      },
      "right down": (message) => {
        this.game.keyboard.right = true;
      },
      "left down": (message) => {
        this.game.keyboard.left = true;
      },
      "right up": (message) => {
        this.game.keyboard.right = false;
      },
      "left up": (message) => {
        this.game.keyboard.left = false;
      },
      "enter down": (message) => {
        this.game.status = "restart";
        // restartGame(this.game);
      },
      "z down": (message) => {
        logGame(this.game);
      },
      "end of draw loop": (message) => { },
    };
  }

  push(newMessage) {
    if (Array.isArray(newMessage)) {
      this.messages = this.messages.concat(newMessage.flat());
    } else {
      this.messages.push(newMessage);    
    }
  }

  concat(newMessages) {
    this.messages = this.messages.concat(newMessages);
  }

  handleMessages() {
    let message = null;
    while (message = this.messages.shift()) {
      if (this.messageTable[message.type]) {
        this.messageTable[message.type](message);

        // console.log(message)

        if (this.options.logging) {
          this.logger.log(JSON.stringify(message));
        }
      }
    }
  }
}

export { MessageBus };
