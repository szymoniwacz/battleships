class GamesChannel < ApplicationCable::Channel
  def subscribed
    game = Game.find_by(slug: params[:slug])
    stream_for game
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
