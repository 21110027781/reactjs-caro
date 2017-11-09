import React, {Component} from 'react';

// import logo from './logo.svg';
import './App.css';

function Square(props) {
    return (
        <button className={"square " + ((props.whoWin && props.whoWin.squares.indexOf(props.idElement) > -1) ? 'line-win ' : ' ' ) + (props.iActive === (props.idElement+1) ? 'active' : '')} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {identity: squares[a], squares: [a, b, c]};
        }
    }
    return null;
}

class Board extends Component {
    renderSquare(i) {
        return <Square whoWin={this.props.whoWin} key={i} iActive={this.props.squares.iActive} idElement={i} value={this.props.squares.squares[i]} onClick={() => this.props.onClick(i)} />;
    }
    render() {
        const loopRow = [1,2,3];
        const loopCol = [1,2,3];
        let sttCount = 0;
        // console.log(this.props.whoWin);

        return (
            <div>
                {loopRow.map((row, i) =>
                    <div className="board-row" key={i}>
                        {loopCol.map((col, j) => (
                            this.renderSquare(sttCount++)
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            xReverse: false
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if(calculateWinner(squares) || squares[i]){
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        let col;
        let row;
        let iSqrt = Math.sqrt(squares.length);
        
        i++;

        if(i%iSqrt === 0){
            row = Math.floor(i/iSqrt);
            col = iSqrt;
        }else{
            row = Math.floor(i/iSqrt) + 1;
            col = i%iSqrt;
        }

        this.setState({
            history: history.concat([{
                squares: squares,
                localtion: '(Col: ' + col + ', Row: ' + row + ')',
                iActive: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleReverse(){
        this.setState({
            xReverse: !this.state.xReverse,
        })
    }

    


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move + ' ' + step.localtion : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        if(this.state.xReverse){
            moves.reverse();
        }

        let status;
        if (winner) {
            status = 'Winner: ' + winner.identity;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="game">
                    <div className="game-board">
                        <Board whoWin={winner} squares={current} onClick={(i) => this.handleClick(i)} />
                    </div>
                    <div className="game-info">
                        <div>{ status }</div>
                        <div>
                            <button onClick={() => this.handleReverse()}>Reverse</button>
                        </div>
                        <ol>{ moves }</ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;