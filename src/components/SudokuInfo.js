import { boardList } from "../utils/constants";

export default function SudokuInfo(props) {
  const puzzleButtons = boardList.map((board, idx) => {
    let style = "puzzle-btn"
    if (props.board === board[0]) {
      style += " puz-btn-selected"
    }
    return <div className={style} key={idx} onClick={() => props.setBoard(board[0])}>{board[1]}</div>;
  });

  return(
    <div className="sudoku-info">
      <h1 className="info-header">Puzzles</h1>
      <div className="diff-group-mob">
        {puzzleButtons}
      </div>
      <div className="strat-section">
        <h2>Sudoku Rules</h2>
        <p>
          Sudoku puzzles are solved by putting numbers 1 - 9 once in each row, column and block (3x3 grid). The numbers can be in any order. 
          You must use the surrounding numbers to eliminate possibilities for each cell. Usually people will write the number possibilities in pencil 
          for each cell and erase them as numbers are eliminated. This tool does most of that work for you.
        </p>
      </div>
      <h1 className="info-header">How to use Sudoku Trainer</h1>
      <div className="strat-section">
        <h3>Elimination on Squares</h3>
        <p>
          This app does the EoS method for you. It looks at each cell and if, for example, a 4 is in the same row as the empty cell, the app removes 4 from the number options. 
          It also does this for the columns and blocks. If there is only one option for a cell, the app will <span className="red-back">"cross out"</span> that option from cells in the 
          corresponding row, column, and block. This app basically solves all the easy/medium puzzles for you. 
        </p>
      </div>
      <div className="strat-section">
        <h3>Elimination on Numbers</h3>
        <p>
          Once all the number options for each cell has been found (Sudoku Trainer does this for you), there may only be one number option in a row, column, or block. For example, 
          in a column there could be only one cell that has a number 6 option. That cell may have other number possibilites but because there must be a 6 in each column,
          that cell must be 6. The <span className="highlight">"Highlight Numbers"</span> tool can help you with the EoN strategy. Highlight a number and if that number only appears as an option once 
          in a row, column, or block, then it must be an answer for that cell. 
        </p>
      </div>
      <div className="strat-section">
        <h3>Solving on Possibilities in Common</h3>
        <p>
          If there are two cells in a row, column, or block with only 2 number options, those numbers can be eliminated from the rest of the row, column, or block. For example, 
          if a block has 3 cells with number options [2, 7], [2, 7], and [2, 7, 9], we know the the first two are a 2 and 7 in some order. Which means 
          the third cell must be a 9 because the 2 and 7 are in the other two cells of the block. This works with 3 cells with the same 3 number options, as well as 4 cells 
          with the same 4 number options, and so forth. Use the <span className="red-back">"Manual Cross Out"</span> tool to mark options that have been eliminated. 
        </p>
      </div>
    </div>
  );
}