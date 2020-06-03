class MovesController < ApplicationController
  def create
    raise 'Not your move' unless MovesChecker.new(player: current_player).available?

    x = params[:x]
    y = params[:y]
    hit, ship = MovesHandler.new(player: current_player, move: [x, y]).shoot
    GamesChannel.broadcast_to current_game, {
      action: 'move',
      move: [x, y, hit],
      playerId: current_player.id,
      shipCoords: ship&.sunk? ? ship.coordinates : nil
    }

    render json: { status: :ok }
  end
end
