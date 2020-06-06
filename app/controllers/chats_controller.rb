class ChatsController < ApplicationController
  before_action :set_current_game

  def send_message
  end

  def update_player_name
    if current_player.update(name: params[:newName])
      ChatsChannel.broadcast_to current_game.chat, {
        currentPlayerId: current_player.id,
        action: 'opponentNameChange',
        newName: params[:newName]
      }
      render json: { status: 200 }
    else
      render json: { status: 400 }
    end
  end

  private

  def set_current_game
    @current_game ||= Game.find_by(slug: params[:game_slug])
  end
end
