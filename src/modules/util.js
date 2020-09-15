function drawRect(rect, canvas) {
  let ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.fillStyle = "#FF5733";
  ctx.fill();
  ctx.closePath();
}

export { drawRect };
