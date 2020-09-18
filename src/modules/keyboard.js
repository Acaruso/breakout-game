function getKeyboard() {
  return {
    right: false,
    left: false,
    enter: false,
  };
}

function addKeyboardHandlers(messages) {
  function keyHandler(e) {
    messages.push({ type: `${e.key}:${e.type}` });
  }

  document.addEventListener("keydown", keyHandler, false);
  document.addEventListener("keyup", keyHandler, false);
}

export { getKeyboard, addKeyboardHandlers };
