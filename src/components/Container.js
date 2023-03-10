import Block from "./Block";

export default function Container (props) {
    const blocks = props.possMatrix.map((block, idx) => {
        return (
            <Block 
                key={idx} idx={idx} 
                enterNumber={props.enterNumber}
                addUserCrossOut={props.addUserCrossOut}
                removeUserCrossOut={props.removeUserCrossOut}
                blockMatrix={block}
                highlightNums={props.highlightNums}
                xoToolActive={props.xoToolActive} />
        );
    });

    return <div className="container">{blocks}</div>;
}