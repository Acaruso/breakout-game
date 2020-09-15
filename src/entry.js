import { getGame } from "./modules/game";
import {  updateBall } from "./modules/ball";
import { updatePaddle, getPaddle } from "./modules/paddle";
import { addKeyboardHandlers } from "./modules/keyboard";
import { MessageBus } from "./modules/messageBus";

let game = getGame(draw);
let messageBus = new MessageBus(game);
addKeyboardHandlers(messageBus);

function draw() {
  const messages = [
    { type: "clear screen" },
    { type: "draw ball" },
    { type: "draw paddle" },
    { type: "draw blocks" },
    { type: "check for win" },
    updateBall(game.ball, game.paddle, game.blocks, game.canvas),
    updatePaddle(game.paddle, game.keyboard, game.canvas),
  ];

  // some updates can return array of messages, need to flatten
  messageBus.concat(messages.flat());

  messageBus.handleMessages();
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
