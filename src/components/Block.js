import EmptyCell from "./EmptyCell";

function Block(props) {
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
                blockIdx={props.idx} 
                enterNumber={props.enterNumber} 
                cellOptions={cell} 
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

    return (
        <div className={blockClasses}>
            {cells}
        </div>
    )
}
export default Block;