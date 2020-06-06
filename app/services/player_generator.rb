class PlayerGenerator
  attr_reader :player

  def initialize(game:)
    @game = game
    create_player
  end

  def create_player
    @player = @game.players.create!
    @player.create_board!

    generate_ships
  end

  def generate_ships
    ShipsGenerator.new(player: @player).place_ships
  end
end
