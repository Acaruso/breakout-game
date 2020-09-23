function drawDialog(text, pixels, x, y, canvas) {
  let ctx = canvas.getContext('2d');
  ctx.font = `${pixels}px sans-serif`;
  ctx.fillText(text, x, y);
}

function drawWinLostDialog(status, canvas) {
  const pixels = 32;
  const x = canvas.width / 3;
  const y = canvas.height / 2;

  if (status === "win") {
    drawDialog("You win", pixels, x, y, canvas);
    const newY = y + pixels;
    drawDialog("press enter", pixels, x, newY, canvas);
  } else if (status === "lost") {
    drawDialog("You lost", pixels, x, y, canvas);
    const newY = y + pixels;
    drawDialog("press enter", pixels, x, newY, canvas);
  }
}

function drawDebugDialog(text, canvas) {
  const pixels = 32;
  const x = 0;
  const y = canvas.height / 2;
  drawDialog(text, pixels, x, y, canvas);
}

function updateDebugText(text) {
  return {
    type: "update debug text",
    data: {
      newDebugText: text,
    },
  };
}

export { drawWinLostDialog, drawDebugDialog, updateDebugText };
