function drawDialog(text, canvas) {
  let ctx = canvas.getContext('2d');
  ctx.font = '48px serif';
  const x = canvas.width / 3;
  const y = canvas.height / 2;
  ctx.fillText(text, x, y);
}

function drawWinDialog(status, canvas) {
  if (status === "win") {
    drawDialog("You win", canvas);
  }
}

function drawLostDialog(status, canvas) {
  if (status === "lost") {
    drawDialog("You lost", canvas);
  }
}

export { drawDialog, drawWinDialog, drawLostDialog };
