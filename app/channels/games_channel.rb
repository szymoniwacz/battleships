class GamesChannel < ApplicationCable::Channel
  before_subscribe :set_game
  before_unsubscribe :set_game

  def subscribed
    stream_for @game

    GamesChannel.broadcast_to @game, { action: "playerConnected", playerId: current_player.id }
  end

  def unsubscribed
    GamesChannel.broadcast_to @game, { action: "playerDisconnected", playerId: current_player.id }
  end

  private

  def set_game
    @game ||= Game.find_by(slug: params[:slug])
  end
end
