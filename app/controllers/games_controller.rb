class GamesController < ApplicationController
  before_action :check_game_existance, except: :new

  def new
    redirect_to game_url(Game.create!.slug)
  end

  def show
    unless current_player.present?
      if current_game.players.size >= 2
        render plain: 'Cannot join game, too many players.'
        return
      end

      @current_player = PlayerGenerator.new(game: current_game).player
      cookies[:game_slug] = current_game.slug
      session[:player_id] = current_player.id
    end
    @props = game_props
  end

  def statistics
    @players = current_game.players.map do
      { hits: _1.hits, miss: _1.miss, sunk: current_game.opponent_of(_1)&.sunk&.size || 0 }
    end
  end

  private

  def check_game_existance
    unless current_game.present?
      render plain: 'Game not found.'
      return
    end
  end

  def game_props
    {
      current_player_id: current_player.id,
      game_statistics_url: statistics_game_url(current_game.slug),
      move_available: MovesChecker.new(player: current_player).available?,
      my_hits: current_player.hits,
      my_moves: current_player.moves.map{ [_1.x, _1.y, _1.hit] },
      my_ships: current_player.ships.map{ _1.coordinates },
      my_sunk: current_player.sunk,
      my_won: current_player.ships.sum('size') == current_player.hits,
      new_game_url: new_game_url,
      opponent_connected: current_game.players.size == 2,
      ships_length: current_player.ships.sum('size'),
      slug: current_game.slug
    }.merge(opponent_props)
  end

  def opponent_props
    opponent = current_game.opponent_of(current_player)
    if opponent.present?
      {
        opponent_hits: opponent.hits,
        opponent_moves: opponent.moves.map{ [_1.x, _1.y, _1.hit] },
        opponent_sunk: opponent.sunk,
        opponent_won: opponent.ships.sum('size') == opponent.hits,
      }
    else
      {}
    end
  end
end
