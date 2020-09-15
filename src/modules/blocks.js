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

  let block = {};
  block.width = (canvas.width / 4) - gapTotal;
  block.height = 10;
  block.x = (i * outerWidth) + gap;
  block.y = 0;
  block.exists = true;
  return block;
}

function drawBlocks(blocks, canvas) {
  blocks.forEach(block => {
    if (block.exists) {
      drawRect(block, canvas)
    }
  });
}


export { getBlocks, drawBlocks };
