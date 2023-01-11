import { boardList } from "../functions/constants";

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
            <h1 className="info-header">Strategy</h1>
            <div>Elimination on Squares</div>
            <div>Solving on Possibilities in Common</div>
            <div>Elimination on Numbers</div>
        </div>
    );
}