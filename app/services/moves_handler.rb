class MovesHandler
  def initialize(player:, move:)
    @ships = player.game.opponent_of(player).ships
    @player = player
    @move = move
  end

  def shoot
    raise 'Forbidden move' if @player.moves.map{[_1.x, _1.y]}.include?(@move)

    hit = 0
    ship = nil

    @ships.each do |s|
      next unless s.coordinates.include?(@move)
      s.increment!(:hits)
      hit = 1
      ship = s
      break
    end

    @player.moves.create(x: @move[0], y: @move[1], hit: hit)

    [hit, ship]
  end
end
