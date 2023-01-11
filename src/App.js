import React from 'react';
import GameBoard from './components/GameBoard';
import SudokuInfo from './components/SudokuInfo';
import Footer from './components/Footer';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedBoard: "blank"
    }
  }

  setBoard = (board) => {
    this.setState({
      selectedBoard: board
    });
  }
  
  render() {
    return (
      <div className='app'>
        <div className='game-stuff'>
          <SudokuInfo setBoard={this.setBoard} board={this.state.selectedBoard} />
          <GameBoard board={this.state.selectedBoard} />
        </div>
        <Footer />
      </div>
    )
  }
}