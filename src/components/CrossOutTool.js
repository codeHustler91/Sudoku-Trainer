export default function CrossOutTool(props) {
    let styling = "cross-out-tool";
    if (props.xotToolActive) {
        styling += " red-back";
    }
    return (
        <div className={styling} onClick={props.toggleXOToolStatus}>
            Manual Cross Out
        </div>
    );
}