import { boardList, rules, strategy } from "../utils/constants";

export default function SudokuInfo(props) {
  const puzzleButtons = boardList.map((board, idx) => {
    let style = "puzzle-btn"
    if (props.board === board[0]) {
      style += " puz-btn-selected"
    }
    return <div className={style} key={idx} onClick={() => props.setBoard(board[0])}>{board[1]}</div>;
  });

  let width = props.displayStrategy ? "wide" : "narrow";
  let rulesSign = props.displayRules ? "-" : "+";
  let strategySign = props.displayStrategy ? "-" : "+";

  return (
    <div className={`sudoku-info ${width}`}>
      <h2>Puzzles</h2>
      <div className="puzzle-container">
        {puzzleButtons}
      </div>
      <h2 
        className="heading-collapsible"
        onClick={props.toggleRules}>
          {`Sudoku Rules ${rulesSign}`}
      </h2>
      {props.displayRules ? rules : null}
      <h2
        className="heading-collapsible"
        onClick={props.toggleStrategy}>
          {`Strategy & Tools ${strategySign}`}
      </h2>
      {props.displayStrategy ? strategy : null}
    </div>
  );
}