import React from "react"
import PropTypes from "prop-types"

const Board = ({ moves, sendMove, ships, moveAvailable, sunkenShips }) => {
  const checkCellClassName = (x, y) => {
    let newClassName = "";
    moves.map((move) => {
      if (move[0] === x && move[1] === y) {
        switch(move[2]) {
          case 1: newClassName += "hit "; break;
          case 0: newClassName += "miss "; break;
        }
      }
    })

    sunkenShips.map((ship) => {
      ship.map((coords) => {
        if (coords[0] === x && coords[1] === y) { newClassName += "sunk " }
      })
    })

    ships.map((ship) => {
      ship.map((coords) => {
        if (coords[0] === x && coords[1] === y) {
          newClassName += "ship "
        }
      })
    })

    return newClassName;
  }

  return (
    <table className="board" data-move-available={moveAvailable}>
      <tbody>
        { [...Array(10)].map((e, x) =>
          <tr key={`row_${x}`}>
            { [...Array(10)].map((e, y) =>
              <td key={`column_${y}`}>
                <div
                  className={checkCellClassName(x, y)}
                  data-x={x}
                  data-y={y}
                  onClick={sendMove.bind(null, x, y)}
                />
              </td>
            ) }
          </tr>
        )}
      </tbody>
    </table>
  )
}

Board.defaultProps = {
  sendMove: () => {},
  ships: [],
};

Board.propTypes = {
  moveAvailable: PropTypes.bool,
  moves: PropTypes.array.isRequired,
  player: PropTypes.string,
  sendMove: PropTypes.func,
  ships: PropTypes.array,
  sunkenShips: PropTypes.array,
};

export default Board
