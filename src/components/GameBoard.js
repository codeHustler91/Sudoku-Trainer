import React from 'react';
import Container from './Container';
import Highlight from './Highlight';
import CrossOutTool from './CrossOutTool';
import { boards, answers } from '../functions/constants';
import { eliminateOnSquares, removeKnownAnswers } from '../functions/algos';

class GameBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      possMatrix: [],
      highlightNums: [],
      xoToolActive: false
    }
  }

  componentDidMount() {
    this.userCrossOut = []
    this.eliminatePhase1(boards[this.props.board]);
  }
  componentDidUpdate(prevProps) {
    if (this.props.board !== prevProps.board) {
        this.userCrossOut = [];
        this.setState({
            highlightNums: [],
            xoToolActive: false
        },
        this.eliminatePhase1(boards[this.props.board]));
    }
  }

  enterNumber = (blockIdx, cellIdx, value) => {
    const newMatrix = [...this.state.possMatrix];
    if (this.state.xoToolActive) {
        if (answers[this.props.board][blockIdx][cellIdx] !== parseInt(value)) {
            // if cross out tool is selected and the number is not the answer for that cell
            this.userCrossOut.push({blockIdx, cellIdx, number: parseInt(value)});
            this.eliminatePhase1(newMatrix);
        } else {
            alert("Don't cross out that one! Exit Cross Out mode to pick answers.");
        }
    } else if (this.props.board === "blank" || answers[this.props.board][blockIdx][cellIdx] === parseInt(value)) {
        newMatrix[blockIdx][cellIdx] = parseInt(value);
        this.eliminatePhase1(newMatrix);
    } else {
        alert("Wrong Number!");
    }
  }
  addHighlight = (num) => {
    const highlightNums = [...this.state.highlightNums];
    if (!highlightNums.includes(num)) {
        highlightNums.push(num);
        this.setState({
            highlightNums
        });
    }
  }
  removeHighlight = (num) => {
    const highlightNums = [...this.state.highlightNums];
    highlightNums.splice(highlightNums.indexOf(num), 1);
    this.setState({
        highlightNums
    });
  }
  toggleXOToolStatus = () => {
    this.setState((state) => {
        return {xoToolActive: !state.xoToolActive};
    });
  }

  eliminatePhase1 = (possMatrix) => {
    const newMatrix = removeKnownAnswers(eliminateOnSquares(possMatrix), this.userCrossOut);
    this.setState({
      possMatrix: newMatrix
    });
  }

  render() {
    return (
      <div className='game-board'>
        <div className='game-header'>
            <h1>Sudoku Trainer</h1>
            <div className='tools'>
                <CrossOutTool 
                    xotToolActive={this.state.xoToolActive}
                    toggleXOToolStatus={this.toggleXOToolStatus} />
                <Highlight
                    highlightNums={this.state.highlightNums}
                    addHighlight={this.addHighlight}
                    removeHighlight={this.removeHighlight} />
            </div>
        </div>
        <Container 
          enterNumber={this.enterNumber} 
          possMatrix={this.state.possMatrix}
          highlightNums={this.state.highlightNums}
          xoToolActive={this.state.xoToolActive} />
      </div>
    );
  }
}

export default GameBoard;