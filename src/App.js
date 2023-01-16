import React from 'react';
import GameBoard from './components/GameBoard';
import SudokuInfo from './components/SudokuInfo';
import Footer from './components/Footer';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedBoard: "blank",
      displayRules: true,
      displayStrategy: true
    }
  }

  setBoard = (board) => {
    this.setState({
      selectedBoard: board
    });
  }
  toggleRules = () => {
    this.setState((state) => {
      return {displayRules: !state.displayRules};
    });
  }
  toggleStrategy = () => {
    this.setState((state) => {
      return {displayStrategy: !state.displayStrategy};
    });
  }
  
  render() {
    return (
      <div className='app'>
        <div className='game-stuff'>
          <SudokuInfo
            board={this.state.selectedBoard}
            setBoard={this.setBoard}
            displayRules={this.state.displayRules}
            toggleRules={this.toggleRules}
            displayStrategy={this.state.displayStrategy}
            toggleStrategy={this.toggleStrategy} />
          <GameBoard board={this.state.selectedBoard} />
        </div>
        <Footer />
      </div>
    );
  }
}