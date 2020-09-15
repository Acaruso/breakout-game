import { drawRect } from "./util";

function getBlocks(canvas) {
  let blocks = [];
  for (let i = 0; i < 4; i++) {
    for (let k = 0; k < 4; k++) {
      blocks.push(getBlock(i, k, canvas.width));
    }
  }
  return blocks;
}

function getBlock(row, col, screenWidth) {
  // [  ] [  ] [  ] [  ]
  //123456
  // gapTotal = 2, gap = 1, outerWidth = 6, width = 4

  const gapTotal = 4;
  const gap = gapTotal / 2;
  const outerWidth = screenWidth / 4;
  const outerHeight = 14;

  let block = {};
  block.width = outerWidth - gapTotal;
  block.height = outerHeight - gapTotal;
  block.x = (col * outerWidth) + gap;
  block.y = (row * outerHeight) + gap ;
  block.exists = true;
  return block;
}

function drawBlocks(blocks, canvas) {
  blocks
    .filter((x) => x.exists)
    .forEach(x => drawRect(x, canvas));
}

export { getBlocks, drawBlocks };
