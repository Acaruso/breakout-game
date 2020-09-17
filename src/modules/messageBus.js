import { getBall, drawBall, detectBottomOfScreenCollision } from "./ball";
import { getPaddle, drawPaddle } from "./paddle";
import { getBlocks, drawBlocks } from "./blocks";
import { drawWinDialog, drawLostDialog, drawDebugDialog } from "./dialog";
import { restartGame, logGame } from "./game";
import { Logger } from "./logger";

class MessageBus {
  constructor(state, options = {}) {
    this.state = state;
    this.messages = [];

    this.logging = options.logging;
    this.logger = options.logger;

    this.messageTable = {
      "clear screen": (message) => {
        let ctx = this.state.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.state.canvas.width, this.state.canvas.height);
      },
      "update game status": (message) => {
        const won = (!this.state.blocks.find(x => x.exists));
        const lost = detectBottomOfScreenCollision(
          this.state.ball, 
          this.state.paddle,
          this.state.canvas.height
        );
        
        if (won) {
          this.state.status = "win";
        } else if (lost) {
          this.state.status = "lost";
        }
      },
      "update ball": (message) => {
        this.state.ball = message.data.ball;
      },
      "update paddle": (message) => {
        this.state.paddle = message.data.paddle;
      },
      "update debug text": (message) => {
        this.state.debugText = message.data.newDebugText;
      },
      "remove block": (message) => {
        const i = message.data.blockToRemove;
        this.state.blocks[i].exists = false;
      },
      "draw ball": (message) => {
        drawBall(this.state.ball, this.state.canvas);
      },
      "draw paddle": (message) => {
        drawPaddle(this.state.paddle, this.state.canvas);
      },
      "draw blocks": (message) => {
        drawBlocks(this.state.blocks, this.state.canvas);
      },
      "draw dialog": (message) => {
        drawWinDialog(this.state.status, this.state.canvas);
        drawLostDialog(this.state.status, this.state.canvas);
      },
      "draw debug dialog" : (message) => {
        drawDebugDialog(this.state.debugText, this.state.canvas);
      },
      "right down": (message) => {
        this.state.keyboard.right = true;
      },
      "left down": (message) => {
        this.state.keyboard.left = true;
      },
      "right up": (message) => {
        this.state.keyboard.right = false;
      },
      "left up": (message) => {
        this.state.keyboard.left = false;
      },
      "enter down": (message) => {
        // this.game.status = "restart";

        this.state.ball = getBall(state.canvas);
        this.state.paddle = getPaddle(state.canvas);
        this.state.blocks = getBlocks(state.canvas);
        this.state.status = "in progress";
      
        // restartGame(this.state);
      },
      "z down": (message) => {
        logGame(this.state);
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
        if (this.logging) {
          this.logger.log(JSON.stringify(message));
          this.logger.log(JSON.stringify(this.state.ball));
        }
      }
    }
  }
}

export { MessageBus };
