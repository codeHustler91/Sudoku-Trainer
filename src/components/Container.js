import Block from "./Block";

function Container (props) {
    const blocks = props.possMatrix.map((block, idx) => {
        return (
            <Block 
                key={idx} idx={idx} 
                enterNumber={props.enterNumber} 
                blockMatrix={block} 
                highlightNums={props.highlightNums}
                xoToolActive={props.xoToolActive} />
        );
    });

    return (
        <div className="container">
            {blocks}
        </div>
    );
}

export default Container;