import React, { Component } from "react"
import { api } from './api';
import consumer from "../channels/consumer"
import PropTypes from "prop-types"
import ActionsBar from "./ActionsBar"
import Board from "./Board"
import Statistics from "./Statistics"

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loadingMove: false,
      moveAvailable: this.props.moveAvailable,
      myHits: this.props.myHits,
      myMoves: this.props.myMoves,
      mySunk: this.props.mySunk,
      myWon: this.props.myWon,
      opponentConnected: this.props.opponentConnected || false,
      opponentHits: this.props.opponentHits || 0,
      opponentMoves: this.props.opponentMoves || [],
      opponentSunk: this.props.opponentSunk || [],
      opponentWon: this.props.opponentWon || false,
      playerConnected: false,
    }
  }

  processMove = (data) => {
    if (data["playerId"] === this.props.currentPlayerId) {
      this.setState(prevState => {
        let hits = prevState.myHits + data["move"][2];
        let won = hits == this.props.shipsLength;
        let moveAvailable = won ? false : data["move"][2] === 1;

        return {
          ...prevState,
          moveAvailable: moveAvailable,
          myHits: hits,
          myMoves: [...prevState.myMoves, data["move"]],
          myWon: won,
        }
      });
      if (data["shipCoords"]) {
        this.setState(prevState => ({ opponentSunk: [...prevState.opponentSunk, data["shipCoords"]] }))
      }
    } else {
      this.setState(prevState => {
        let hits = prevState.opponentHits + data["move"][2];
        let won = hits == this.props.shipsLength;
        let moveAvailable = won ? false : data["move"][2] === 0;

        return {
          ...prevState,
          moveAvailable: moveAvailable,
          opponentHits: hits,
          opponentMoves: [...prevState.opponentMoves, data["move"]],
          opponentWon: won,
        }
      });
      if (data["shipCoords"]) {
        this.setState(prevState => ({ mySunk: [...prevState.mySunk, data["shipCoords"]] }))
      }
    }
  }

  processReceivedData = (data) => {
    const currentPlayerId = this.props.currentPlayerId
    switch (data["action"]) {
      case "move":
        this.processMove(data)
        break;
      case "playerConnected":
        if (currentPlayerId === data["playerId"]) {
          this.setState({ playerConnected: true })
          console.log("player connected");
        } else {
          this.setState({ opponentConnected: true })
          console.log("opponent connected");
        }
        break;
      case 'playerDisconnected':
        if (currentPlayerId === data["playerId"]) {
          this.setState({ playerConnected: false })
          console.log("player disconnected");
        } else {
          this.setState({ opponentConnected: false })
          console.log("opponent disconnected");
        }
    }
  }

  componentDidMount() {
    const that = this
    this.subscription = consumer.subscriptions.create({ channel: "GamesChannel", slug: this.props.slug }, {
      connected() {},

      disconnected() {},

      received(data) {
        that.processReceivedData(data)
      }
    });
  }

  componentWillUnmount(){
    consumer.subscriptions.remove(this.subscription);
  }

  moveAlreadyDone = (x, y) => {
    for (let move of this.state.myMoves) {
      if (move[0] === x && move[1] === y) { return true }
    }
    return false;
  }

  moveUnavailable = (x, y) => {
    return (!this.state.opponentConnected ||
      !this.state.moveAvailable ||
      this.state.loadingMove ||
      this.moveAlreadyDone(x, y)
    ) === true
  }

  sendMove = (x, y) => {
    if (this.moveUnavailable(x, y)) { return null }

    const params = { slug: this.props.slug, currentPlayerId: this.props.currentPlayerId, x: x, y: y };
    this.setState({ loadingMove: true }, () => (
      api().post('/moves', params)
        .catch(error => console.log(error))
        .then(() => this.setState({ loadingMove: false }))
    ))
  }

  render() {
    const {
      gameStatisticsUrl,
      myShips,
      newGameUrl,
      shipsLength,
    } = this.props;

    const {
      moveAvailable,
      myHits,
      myMoves,
      mySunk,
      myWon,
      opponentConnected,
      opponentHits,
      opponentMoves,
      opponentSunk,
      opponentWon,
      playerConnected,
    } = this.state;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-8">
            <h1>Battleships</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <ActionsBar
            newGameUrl={newGameUrl}
            gameStatisticsUrl={gameStatisticsUrl}
            myWon={myWon}
            opponentWon={opponentWon}
            playerConnected={playerConnected}
            opponentConnected={opponentConnected}
            moveAvailable={moveAvailable}
          />
        </div>
        <div className="row justify-content-center">
          <div className="col-4 text-center">
            My board
            <Board
              moves={opponentMoves}
              ships={myShips}
              sunkenShips={mySunk}
            />
            <Statistics
              hits={opponentHits}
              left={shipsLength - opponentHits}
              misses={opponentMoves.length - opponentHits}
              sunk={mySunk.length}
            />
          </div>
          <div className="col-4 text-center">
            Opponents board
            <Board
              moveAvailable={playerConnected && moveAvailable && opponentConnected}
              moves={myMoves}
              sendMove={this.sendMove}
              sunkenShips={opponentSunk}
            />
            <Statistics
              hits={myHits}
              left={shipsLength - myHits}
              misses={myMoves.length - myHits}
              sunk={opponentSunk.length}
            />
          </div>
        </div>
      </div>
    )
  }
}

Game.propTypes = {
  currentPlayerId: PropTypes.number.isRequired,
  gameStatisticsUrl: PropTypes.string.isRequired,
  moveAvailable: PropTypes.bool,
  myHits: PropTypes.number,
  myMoves: PropTypes.array,
  myShips: PropTypes.array,
  mySunk: PropTypes.array,
  newGameUrl: PropTypes.string.isRequired,
  opponentConnected: PropTypes.bool,
  opponentHits: PropTypes.number,
  opponentMoves: PropTypes.array,
  opponentSunk: PropTypes.array,
  playerConnected: PropTypes.bool,
  shipsLength: PropTypes.number,
  slug: PropTypes.string.isRequired,
}

export default Game
