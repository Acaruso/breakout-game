import { drawRect } from "./util";

function getBlocks(canvas) {
  let blocks = [];
  for (let i = 0; i < 4; i++) {
    blocks.push(getBlock(i, canvas));
  }
  return blocks;
}

function getBlock(i, canvas) {
  // [  ] [  ] [  ] [  ]
  //123456
  // gapTotal = 2, gap = 1, outerWidth = 6, width = 4
  const gapTotal = 4;
  const gap = gapTotal / 2;
  const outerWidth = canvas.width / 4;
  const width = (canvas.width / 4) - gapTotal;
  const height = 10;
  const x = (i * outerWidth) + gap;
  const y = 0;
  return { width, height, x, y };
}

function drawBlocks(blocks, canvas) {
  blocks.forEach(block => {
    drawRect(block, canvas)
  });
}


export { getBlocks, drawBlocks };
