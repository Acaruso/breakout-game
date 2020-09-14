function getKeyboard() {
  return {
    right: false,
    left: false,
  };
}

function addKeyboardHandlers(messages) {
  function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      messages.push({ type: "right down" });
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
      messages.push({ type: "left down" });
    }
  }

  function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
      messages.push({ type: "right up" });
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
      messages.push({ type: "left up" });
    }
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);}

export { getKeyboard, addKeyboardHandlers };