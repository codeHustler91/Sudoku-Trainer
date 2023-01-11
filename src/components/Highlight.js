export default function Highlight(props) {
    const hiliteNums = [1,2,3,4,5,6,7,8,9].map((num, idx) => {
        if (props.highlightNums.includes(num)) {
            return (
                <div className='hilite-nums highlight' key={idx}
                    onClick={() => props.removeHighlight(num)}>{num}</div>
            );
        } else {
            return (
                <div className='hilite-nums' key={idx}
                    onClick={() => props.addHighlight(num)}>{num}</div>
            );
        }
    });

    return (
        <div className='hilite-box'>
            <p className="tools-text">Hightlight Numbers: </p>
            {hiliteNums}
        </div>
    );
}