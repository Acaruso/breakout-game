import { drawBall } from "./ball";
import { drawPaddle } from "./paddle";
import { drawBlocks } from "./blocks";

class MessageBus {
  constructor(game) {
    this.game = game;
    this.messages = [];

    this.messageTable = {
      "clear screen": (message) => {
        let ctx = this.game.canvas.getContext("2d");
        ctx.clearRect(0, 0, this.game.canvas.width, this.game.canvas.height);
      },
      "update ball": (message) => {
        this.game.ball = message.data.newBall;
      },
      "update paddle": (message) => {
        this.game.paddle = message.data.newPaddle;
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
      "game over": (message) => {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(this.game.interval);
      },
    };
  }

  push(newMessage) {
    this.messages.push(newMessage);
  }

  concat(newMessages) {
    this.messages = this.messages.concat(newMessages);
  }

  handleMessages() {
    let message = null;
    while (message = this.messages.shift()) {
      this.messageTable[message.type](message);
    }
  }
}

export { MessageBus };