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
  };

  const keyUpHandlersTable = {
    ArrowRight: () => messages.push({ type: "right up" }),
    ArrowLeft: () => messages.push({ type: "left up" }),
  };

  document.addEventListener(
    "keydown", 
    e => keyDownHandlersTable[e.key](), 
    false
  );

  document.addEventListener(
    "keyup", 
    e => keyUpHandlersTable[e.key](), 
    false
  );
}

export { getKeyboard, addKeyboardHandlers };
