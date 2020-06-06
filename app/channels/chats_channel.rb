class ChatsChannel < ApplicationCable::Channel
  def subscribed
    chat = Game.find_by(slug: params[:slug]).chat
    stream_for chat
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
