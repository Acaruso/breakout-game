import { drawBall, detectBottomOfScreenCollision } from "./ball";
import { drawPaddle } from "./paddle";
import { drawBlocks } from "./blocks";
import { drawWinLostDialog, drawDebugDialog } from "./dialog";
import { logGame } from "./game";

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
      "check game status": (message) => {
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
      "update game status": (message) => {
        this.state.status = message.data.status;
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
      "update blocks": (message) => {
        this.state.blocks = message.data.blocks;
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
      "draw win lost dialog": (message) => {
        drawWinLostDialog(this.state.status, this.state.canvas);
      },
      "draw debug dialog" : (message) => {
        drawDebugDialog(this.state.debugText, this.state.canvas);
      },
      "ArrowRight:keydown": (message) => {
        this.state.keyboard.right = true;
      },
      "ArrowLeft:keydown": (message) => {
        this.state.keyboard.left = true;
      },
      "ArrowRight:keyup": (message) => {
        this.state.keyboard.right = false;
      },
      "ArrowLeft:keyup": (message) => {
        this.state.keyboard.left = false;
      },
      "Enter:keydown": (message) => {
        this.state.keyboard.enter = true;
      },
      "Enter:keyup": (message) => {
        this.state.keyboard.enter = false;
      },
      "z:keydown": (message) => {
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

  handleMessages() {
    let message = null;
    while (message = this.messages.shift()) {
      if (this.messageTable[message.type]) {
        this.messageTable[message.type](message);
        if (this.logging) {
          this.logger.log(JSON.stringify(message));
        }
      }
    }
  }
}

export { MessageBus };
