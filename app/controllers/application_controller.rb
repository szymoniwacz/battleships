class ApplicationController < ActionController::Base
  def current_player
    @current_player ||= current_game.players.find_by(id: cookies.encrypted[:player_id])
  end

  def current_game
    @current_game ||= Game.find_by(slug: params[:slug])
  end

  helper_method :current_player, :current_game
end
