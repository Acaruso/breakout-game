import { drawRect } from "./util";

function getBlocks(canvas) {
  let blocks = [];
  const numRows = 1;
  const numCols = 4;

  for (let i = 0; i < numRows; i++) {
    for (let k = 0; k < numCols; k++) {
      blocks.push(getBlock(i, k, numCols, canvas.width));
    }
  }
  return blocks;
}

function getBlock(row, col, numCols, screenWidth) {
  // [  ] [  ] [  ] [  ]
  //123456
  // gapTotal = 2, gap = 1, outerWidth = 6, width = 4

  const gapTotal = 4;
  const gap = gapTotal / 2;
  const outerWidth = screenWidth / numCols;
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
    .filter(x => x.exists)
    .forEach(x => drawRect(x, canvas));
}

export { getBlocks, drawBlocks };
