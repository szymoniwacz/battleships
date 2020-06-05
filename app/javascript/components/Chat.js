import React, { Fragment } from "react"
import PropTypes from "prop-types"

const Chat = ({ playerName, opponentName }) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-12 text-center">
          <div id="chat_messages_box">
            <p><span><b>player1:</b> Message to opponent.</span></p>
            <p><span><b>player1:</b> Message to opponent.</span></p>
            <p><span><b>player1:</b> Message to opponent.</span></p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <input id="new_message" className="form-control" placeholder="write new message and press enter to send" />
        </div>
      </div>
    </Fragment>
  )
}

Chat.propTypes = {
  playerName: PropTypes.string.isRequired,
  opponentName: PropTypes.string.isRequired,
}

export default Chat
