import { getGame } from "./modules/game";
import { updateBall } from "./modules/ball";
import { updatePaddle } from "./modules/paddle";
import { addKeyboardHandlers } from "./modules/keyboard";
import { MessageBus } from "./modules/messageBus";
import { updateDebugText } from "./modules/dialog";

let game = getGame(draw);
// let messageBus = new MessageBus(game, { logging: true });
let messageBus = new MessageBus(game);
addKeyboardHandlers(messageBus);

// replay stuff ///////////////////////////////////////////

const replay = true;
const file = "logs/bug-log.txt";
const speed = 0.25;
const intervalTime = (1.0 / speed) * 10.0;

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
} else {
  game.interval = setInterval(draw, 10);
}

///////////////////////////////////////////////////////////

function draw() {
  const messages = [
    { type: "clear screen" },
    { type: "draw ball" },
    { type: "draw paddle" },
    { type: "draw blocks" },
    { type: "draw dialog" },
    updateBall(game.ball, game.paddle, game.blocks, game.status, game.canvas),
    updatePaddle(game.paddle, game.keyboard, game.status, game.canvas),
    { type: "update game status" },
    { type: "end of draw loop" },
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
*/
