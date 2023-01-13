export default function EmptyCell(props) {
    let size;
    if (props.cellOptions.length === 1) {
        size = "opt-size-4";
    } else if (props.cellOptions.length === 2) {
        size = "opt-size-3";
    } else if (props.cellOptions.length <= 4) {
        size = "opt-size-2";
    } else {
        size = "opt-size-1";
    }

    const numButtons = props.cellOptions.map((num, idx) => {
        if (Array.isArray(num)) {
            // an array here means its been eliminated as a possibility for this cell
            let button;
            if (num[1] === "User" && props.xoToolActive) {
                // option has been crossed out by user and xoTool is active
                button = <button className={`num-btn not-poss pointer ${size}`} key={idx} value={num[0]}
                            onClick={() => props.removeUserCrossOut(props.blockIdx, props.idx, num)}>
                            {num[0]}
                        </button>
            } else {
                // crossed out by computer (should remain crossed out)
                button = <button className={`num-btn not-poss ${size}`} key={idx} value={num[0]}>{num[0]}</button>
            }
            return (<span key={idx}
                        className="tooltip"
                        data-text={"Eliminated by " + num[1]}>
                            {button}
                    </span>);
        } else {
            let background;
            if (props.highlightNums.includes(num)) {
                background = "highlight poss";
            } else if (props.xoToolActive) {
                background = "white-back red-back-hov";
                return (
                    <button className={`num-btn ${size} ${background}`} key={idx} value={num}
                        onClick={() => props.addUserCrossOut(props.blockIdx, props.idx, num)}>
                        {num}
                    </button>
                );
            } else {
                background = "white-back poss";
            }
            return (
                <button className={`num-btn ${size} ${background}`} key={idx} value={num}
                    onClick={() => props.enterNumber(props.blockIdx, props.idx, num)}>
                    {num}
                </button>
            );
        }
    });

    return <div className="cell">{numButtons}</div>;
}