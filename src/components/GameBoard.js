import React from 'react';
import Container from './Container';
import Highlight from './Highlight';
import CrossOutTool from './CrossOutTool';
import { boards, answers } from '../utils/constants';
import { eliminateOnSquares, removeKnownAnswers } from '../utils/algos';

export default class GameBoard extends React.Component {
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

  eliminatePhase1 = (possMatrix) => {
    const newMatrix = removeKnownAnswers(eliminateOnSquares(possMatrix), this.userCrossOut);
    this.setState({
      possMatrix: newMatrix
    });
  }

  enterNumber = (blockIdx, cellIdx, value) => {
    // if the answer is correct, add number to matrix and eliminate further possibilites
    if (this.props.board === "blank" || answers[this.props.board][blockIdx][cellIdx] === parseInt(value)) {
      const newMatrix = [...this.state.possMatrix];
      newMatrix[blockIdx][cellIdx] = parseInt(value);
      this.eliminatePhase1(newMatrix);
    } else {
      alert("Wrong Number!");
    }
  }
  addUserCrossOut = (blockIdx, cellIdx, value) => {
    // function only given to number options when xoToolActive is true
    const newMatrix = [...this.state.possMatrix];
    this.userCrossOut.push({blockIdx, cellIdx, number: parseInt(value)});
    this.eliminatePhase1(newMatrix);
  }
  removeUserCrossOut = (blockIdx, cellIdx, value) => {
    // function only given to number options who've been crossed out by users and xoTool is active
    const newMatrix = [...this.state.possMatrix];
    this.userCrossOut = this.userCrossOut.filter(
      xoObj => !(xoObj.blockIdx === blockIdx && xoObj.cellIdx === cellIdx && xoObj.number === value[0])
    );
    this.eliminatePhase1(newMatrix);
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
          numOptionFuncs={this.numOptionFuncs}
          enterNumber={this.enterNumber}
          addUserCrossOut={this.addUserCrossOut}
          removeUserCrossOut={this.removeUserCrossOut}
          possMatrix={this.state.possMatrix}
          highlightNums={this.state.highlightNums}
          xoToolActive={this.state.xoToolActive} />
      </div>
    );
  }
}