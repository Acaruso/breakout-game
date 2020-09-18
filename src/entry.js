import { Game } from "./modules/game";

let game = new Game({ logging: true, replay: false, replayRecalc: false });

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
