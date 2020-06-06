import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { api } from "./api";
import consumer from "../channels/consumer";

class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      opponentName: this.props.opponentName,
      playerName: this.props.playerName,
      updatingPlayerName: false,
    }
  }

  componentDidMount() {
    const that = this
    const currentPlayerId = this.props.currentPlayerId
    consumer.subscriptions.create({ channel: "ChatsChannel", slug: this.props.gameSlug }, {
      connected() {
        console.log("connected to chat")
        // that.setState({ playerConnected: true })
      },

      disconnected() {
        console.log("disconnected from chat")
        // that.setState({ playerConnected: false })
      },

      received(data) {
        if (data["action"] === "opponentNameChange" && currentPlayerId !== data["currentPlayerId"]) {
          that.setState({ opponentName: data["newName"] })
        }
      }
    });
  }

  setPlayerName = (e) => {
    if (e.keyCode == 13 && !this.state.updatingPlayerName) {
      let newName = e.target.value
      console.log("new name", newName);

      const params = { newName: newName };
      this.setState({ updatingPlayerName: true }, () => (
        api().post(`/games/${this.props.gameSlug}/chat/update_player_name`, params)
          .then((response) => {
            this.setState({ playerName: newName })
          })
          .catch(error => console.log(error))
          .then(() => this.setState({ updatingPlayerName: false }))
      ))
    }
  }

  render() {
    const { playerName, opponentName } = this.state;

    return (
      <Fragment>
        <div className="row">
          <div className="col-12">
            <input
              id="player_name_setter"
              className="form-control"
              placeholder="write your name and press enter"
              onKeyDown={this.setPlayerName}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <div id="chat_messages_box">
              <p><span><b>{playerName}:</b> Message to opponent.</span></p>
              <p><span><b>{opponentName}:</b> Message to opponent.</span></p>
              <p><span><b>{playerName}:</b> Message to opponent.</span></p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <input
              id="new_message"
              className="form-control"
              placeholder="write new message and press enter to send"
            />
          </div>
        </div>
      </Fragment>
    )
  }
}

Chat.propTypes = {
  gameSlug: PropTypes.string.isRequired,
  opponentName: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
}

export default Chat
