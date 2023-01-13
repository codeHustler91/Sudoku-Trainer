import EmptyCell from "./EmptyCell";

export default function Block(props) {
    // border styling
    let blockClasses = "block";
    if ([0,1,3,4,6,7].includes(props.idx)) {
        blockClasses += " block-bor-rt";
    }
    if ([0,1,2,3,4,5].includes(props.idx)) {
        blockClasses += " block-bor-btm";
    }
    const cells = props.blockMatrix.map((cell, idx) => {
        if (Array.isArray(cell)) {
            return <EmptyCell key={idx} idx={idx}
                cellOptions={cell}
                blockIdx={props.idx}
                enterNumber={props.enterNumber}
                addUserCrossOut={props.addUserCrossOut}
                removeUserCrossOut={props.removeUserCrossOut}
                highlightNums={props.highlightNums}
                xoToolActive={props.xoToolActive} />
        } else {
            if (props.highlightNums.includes(cell)) {
                return <div key={idx} className="cell highlight">{cell}</div>;
            } else {
                return <div key={idx} className="cell filled">{cell}</div>;
            }
        }
    });

    return <div className={blockClasses}>{cells}</div>;
}