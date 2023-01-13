export function eliminateOnSquares(matrix) {
  // for each block, if a number is not included, push to unused list
  const blockUnused = matrix.map(block => [1,2,3,4,5,6,7,8,9].filter(num => !block.includes(num)));
  
  const { rows , cols } = addAnswersToRowColList(matrix);
  // check each cell to its col and row and eliminate further num possiblilites
  const possMatrix = matrix.map((block, blockIdx) => {
    return block.map((cell, idx) => {
      if (Array.isArray(cell) || cell === 0) {
        const { row, col } = convertCellToRowCol(blockIdx, idx);
        return blockUnused[blockIdx].filter(possNum => (!rows[row].includes(possNum) && !cols[col].includes(possNum)));
      } else return cell;
    });
  });
  
  return possMatrix;
}
function addAnswersToRowColList(possMatrix) {
  // go through matrix/blocks, if the cell is a number/answer then add it to correspoding row/col
  const cols = [[],[],[],[],[],[],[],[],[]];
  const rows = [[],[],[],[],[],[],[],[],[]];
  possMatrix.forEach((block, blockIdx) => {
    block.forEach((cell, idx) => {
      if (!Array.isArray(cell) && cell !== 0) {
        // rows
        if ([0,1,2].includes(blockIdx)) {
          // top three blocks
          if ([0,1,2].includes(idx)) {
            rows[0].push(cell); // push into row 0
          } else if ([3,4,5].includes(idx)) {
            rows[1].push(cell); // push into row 1
          } else if ([6,7,8].includes(idx)) {
            rows[2].push(cell); // push into row 2
          }
        } else if ([3,4,5].includes(blockIdx)) {
          // middle three blocks (rows)
          if ([0,1,2].includes(idx)) {
            rows[3].push(cell); // push into row 3
          } else if ([3,4,5].includes(idx)) {
            rows[4].push(cell); // push into row 4
          } else if ([6,7,8].includes(idx)) {
            rows[5].push(cell); // push into row 5
          }
        } else if ([6,7,8].includes(blockIdx)) {
          // bottom three blocks
          if ([0,1,2].includes(idx)) {
            rows[6].push(cell); // push into row 6
          } else if ([3,4,5].includes(idx)) {
            rows[7].push(cell); // push into row 7
          } else if ([6,7,8].includes(idx)) {
            rows[8].push(cell); // push into row 8
          }
        }
        // columns
        if ([0,3,6].includes(blockIdx)) {
          // left three blocks
          if ([0,3,6].includes(idx)) {
            cols[0].push(cell); // push into column 0
          } else if ([1,4,7].includes(idx)) {
            cols[1].push(cell); // push into column 1
          } else if ([2,5,8].includes(idx)) {
            cols[2].push(cell); // push into column 2
          }
        } else if ([1,4,7].includes(blockIdx)) {
          // middle three blocks (columns)
          if ([0,3,6].includes(idx)) {
            cols[3].push(cell); // push into column 3
          } else if ([1,4,7].includes(idx)) {
            cols[4].push(cell); // push into column 4
          } else if ([2,5,8].includes(idx)) {
            cols[5].push(cell); // push into column 5
          }
        } else if ([2,5,8].includes(blockIdx)) {
          // right three blocks
          if ([0,3,6].includes(idx)) {
            cols[6].push(cell); // push into column 6
          } else if ([1,4,7].includes(idx)) {
            cols[7].push(cell); // push into column 7
          } else if ([2,5,8].includes(idx)) {
            cols[8].push(cell); // push into column 8
          }
        }
      }
    });
  });
  return { rows, cols };
}
function convertCellToRowCol(blockIdx, cellIdx) {
  let row, col;
  // rows
  if (blockIdx < 3) {
    if (cellIdx < 3) {
      row = 0;
    } else if (cellIdx < 6) {
      row = 1;
    } else row = 2;
  } else if (blockIdx < 6) {
    if (cellIdx < 3) {
      row = 3;
    } else if (cellIdx < 6) {
      row = 4;
    } else row = 5;
  } else {
    if (cellIdx < 3) {
      row = 6;
    } else if (cellIdx < 6) {
      row = 7;
    } else row = 8;
  }
  // columns
  const leftCol = [0,3,6]; // left 3 blocks of the matrix or left 3 cells in block
  const middleCol = [1,4,7]; // middle 3 blocks of the matrix or middle 3 cells in block
  if (leftCol.includes(blockIdx)) {
    if (leftCol.includes(cellIdx)) {
      col = 0;
    } else if (middleCol.includes(cellIdx)) {
      col = 1;
    } else col = 2;
  } else if (middleCol.includes(blockIdx)) {
    if (leftCol.includes(cellIdx)) {
      col = 3;
    } else if (middleCol.includes(cellIdx)) {
      col = 4;
    } else col = 5;
  } else {
    if (leftCol.includes(cellIdx)) {
      col = 6;
    } else if (middleCol.includes(cellIdx)) {
      col = 7;
    } else col = 8;
  }
  return { row, col };
}
export function removeKnownAnswers(possMatrix, xOutList = []) {
  // if a cell has a known answer, 'cross out' that num option from its block, row, and column (turns red, can't click)
  xOutList.forEach(xOut => {
    if (Array.isArray(possMatrix[xOut.blockIdx][xOut.cellIdx])) {
      const xOutIdx = possMatrix[xOut.blockIdx][xOut.cellIdx].indexOf(xOut.number)
      if (xOutIdx !== -1) {
        possMatrix[xOut.blockIdx][xOut.cellIdx][xOutIdx] = [xOut.number, "User"];
      }
    }
  });
  // JSON stringify and JSON parse is the only way i know of to deeply copy a nested array
  let newPossMatrix = JSON.parse(JSON.stringify(possMatrix));
  // convert possibilty matrix into rows and columns
  let rowColPossMatrix = [[],[],[],[],[],[],[],[],[]];
  newPossMatrix.forEach((block, blockIdx) => {
    block.forEach((cell, cellIdx) => {
      const { row, col } = convertCellToRowCol(blockIdx, cellIdx);
      rowColPossMatrix[row][col] = cell;
    });
  });

  let kar = {}; // known answer registry
  let prevLength = 0;

  do {
    kar = updateKnownAnswerRegistry(newPossMatrix, kar);
    prevLength = Object.keys(kar).length;

    for (const coordStr in kar) {
      const knownAnswer = kar[coordStr];
      const coords = coordStr.split("");
      const blockIdx = parseInt(coords[0]);
      const cellIdx = parseInt(coords[1]);
      // eslint-disable-next-line no-loop-func
      newPossMatrix[blockIdx].forEach((cell, idx) => {
        // block level, if a known answer is in another cell's list of possibilites
        if (Array.isArray(cell) && cell.length > 1 && cell.includes(knownAnswer) && cellIdx !== idx) {
          newPossMatrix[blockIdx][idx][cell.indexOf(knownAnswer)] = [knownAnswer, "Block"];
        }
      });
      const { row, col } = convertCellToRowCol(blockIdx, cellIdx);
      // eslint-disable-next-line no-loop-func
      rowColPossMatrix[row].forEach((cell, colIdx) => {
        if (Array.isArray(cell) && cell.length > 1 && cell.includes(knownAnswer) && colIdx !== col) {
          const { bloIdx, cIdx } = convertRowColToBlockCell(row, colIdx);
          newPossMatrix[bloIdx][cIdx][cell.indexOf(knownAnswer)] = [knownAnswer, "Row"];
        }
      });
      // eslint-disable-next-line no-loop-func
      rowColPossMatrix.forEach((rowMatrix, rowIdx) => {
        rowMatrix.forEach((cell, colIdx) => {
          if (colIdx === col  && rowIdx !== row) {
            if (Array.isArray(cell) && cell.length > 1 && cell.includes(knownAnswer)) {
              const { bloIdx, cIdx } = convertRowColToBlockCell(rowIdx, col);
              newPossMatrix[bloIdx][cIdx][cell.indexOf(knownAnswer)] = [knownAnswer, "Column"];
            }
          }
        });
      });
    }
  } while(Object.keys(updateKnownAnswerRegistry(newPossMatrix, kar)).length > prevLength);

  return newPossMatrix;
}
function updateKnownAnswerRegistry(matrix, kar) {
  // find all cells with only one possible solution, add to Known Answer Registry
  matrix.forEach((block, blockIdx) => {
    block.forEach((cell, idx) => {
      if (Array.isArray(cell)) {
        // check numbers within cell to see if they have been ruled out, and return index of solution
        const { hasOneSolution, solutionIdx } = checkCellNums(cell);
        if (hasOneSolution) {
          const coordStr = blockIdx.toString() + idx.toString();
          if (!Object.keys(kar).includes(coordStr)) {
            kar[coordStr] = cell[solutionIdx]; 
          }
        }
      }
    });
  });
  return kar;
}
function checkCellNums(cell) {
  let notPossibleCount = 0;
  let solutionIdx;
  let hasOneSolution = false;
  if (cell.length === 1) {
    return {hasOneSolution: true, solutionIdx: 0};
  }
  cell.forEach((possNum, idx) => {
    if (Array.isArray(possNum)) {
      notPossibleCount++;
    } else {
      solutionIdx = idx;
    }
  });
  if (notPossibleCount + 1 === cell.length) {
    hasOneSolution = true;
  }
  return {hasOneSolution, solutionIdx};
}
function convertRowColToBlockCell(row, col) {
  let bloIdx, cIdx;
  // niner index
  if (row < 3) {
    if (col < 3) {
      bloIdx = 0;
    } else if (col < 6) {
      bloIdx = 1;
    } else {
      bloIdx = 2;
    }
  } else if (row < 6) {
    if (col < 3) {
      bloIdx = 3;
    } else if (col < 6) {
      bloIdx = 4;
    } else {
      bloIdx = 5;
    }
  } else {
    if (col < 3) {
      bloIdx = 6;
    } else if (col < 6) {
      bloIdx = 7;
    } else {
      bloIdx = 8;
    }
  }
  // cell index
  const first = [0,3,6];
  const second = [1,4,7];
  if (first.includes(row)) {
    if (first.includes(col)) {
      cIdx = 0;
    } else if (second.includes(col)) {
      cIdx = 1;
    } else {
      cIdx = 2
    }
  } else if (second.includes(row)) {
    if (first.includes(col)) {
      cIdx = 3;
    } else if (second.includes(col)) {
      cIdx = 4;
    } else {
      cIdx = 5;
    }
  } else { // third row
    if (first.includes(col)) {
      cIdx = 6;
    } else if (second.includes(col)) {
      cIdx = 7;
    } else { // third column
      cIdx = 8;
    }
  }

  return {bloIdx, cIdx};
}