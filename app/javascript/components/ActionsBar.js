import React, { Fragment, useState } from "react"
import PropTypes from "prop-types"
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ActionsBar = (
  { newGameUrl, gameStatisticsUrl, myWon, opponentWon, playerConnected, opponentConnected, moveAvailable }
  ) => {
  const [copied, setCopied] = useState(false);

  const infoMessage = () => {
    if (myWon) return("You have won!")
    if (opponentWon) return("Opponent won!")
    if (playerConnected) {
      if (opponentConnected) {
        return(moveAvailable ? "Your move" : "Opponent's move")
      } else {
        return("Waiting for opponent")
      }
    } else {
      return("Player disconnected, please reload this page.")
    }
  }

  return (
    <Fragment>
      <div className="col-5">
        <div className="alert alert-info">{ infoMessage() }</div>
      </div>
      <div className="col-3">
        <div className="btn-group float-right" role="group">
          <CopyToClipboard text={window.location.href}
                           onCopy={() => setCopied(true)}>
            <button type="button" className="btn btn-sm btn-success">{ copied ? "Url copied" : "Copy url" }</button>
          </CopyToClipboard>
          <a className="btn btn-primary btn-sm btn-primary" href={newGameUrl} role="button">New game</a>
          <a className="btn btn-primary btn-sm btn-info" href={gameStatisticsUrl} role="button">Statistics</a>
        </div>
      </div>
    </Fragment>
  )
}

ActionsBar.propTypes = {
  newGameUrl: PropTypes.string.isRequired,
  gameStatisticsUrl: PropTypes.string.isRequired,
  myWon: PropTypes.bool.isRequired,
  opponentWon: PropTypes.bool.isRequired,
  playerConnected: PropTypes.bool.isRequired,
  opponentConnected: PropTypes.bool.isRequired,
  moveAvailable: PropTypes.bool.isRequired,
}

export default ActionsBar
