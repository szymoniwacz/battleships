class MovesChecker
  def initialize(player:)
    @player = player
    @game = player.game
    @last_move = @game.moves&.last
  end

  def available?
    if @last_move.present?
      @last_move.player_id == @player.id ? @last_move.hit? : !@last_move.hit?
    else
      @game.players.first == @player
    end
  end
end
