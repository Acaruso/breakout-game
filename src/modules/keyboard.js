function getKeyboard() {
  return {
    right: false,
    left: false,
  };
}

function addKeyboardHandlers(messages) {
  const keyDownHandlersTable = {
    ArrowRight: () => messages.push({ type: "right down" }),
    ArrowLeft: () => messages.push({ type: "left down" }),
    Enter: () => messages.push({ type: "enter down" }),
    z: () => messages.push({ type: "z down" }),
  };

  const keyUpHandlersTable = {
    ArrowRight: () => messages.push({ type: "right up" }),
    ArrowLeft: () => messages.push({ type: "left up" }),
  };

  function keyDownHandler(e) {
    keyDownHandlersTable[e.key] && keyDownHandlersTable[e.key]();
  }

  function keyUpHandler(e) {
    keyUpHandlersTable[e.key] && keyUpHandlersTable[e.key]();
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
}

export { getKeyboard, addKeyboardHandlers };
